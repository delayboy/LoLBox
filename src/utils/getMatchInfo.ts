import { invoke } from '@tauri-apps/api';
import {LcuMatchList,MatchList,Game, Participant, Stat,MyGameScoreInfo} from "../interface/MatchInfo";
import {queryGameType} from "./tool";
import { GameDetailedInfo } from '../interface/MatchDetail';

// 根据召唤师ID查询战绩
const getMatchList = async (puuid: string, begIndex: string, endIndex: string): Promise<LcuMatchList|null> => {
  try {
    const res:LcuMatchList = await invoke('get_match_list',{puuid:puuid,begIndex:begIndex,endIndex:endIndex})
    return res
  }catch (e){
    return null
  }
}

const timestampToDate = (timestamp: number) => {
  var date = new Date(timestamp)
  const year = String(date.getFullYear()).slice(-2) 
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}


// 获取简单的对局数据
const getSimpleMatch = (match: Game,gameModel:string):MatchList => {
  return {
    gameId: String(match.gameId),
    champId: String(match.participants[0].championId),
    // 是否取得胜利
    isWin: match.participants[0].stats.win === true ? true : false,
    // 击杀数目
    kills: match.participants[0].stats.kills,
    // 死亡数目
    deaths: match.participants[0].stats.deaths,
    // 助攻数目
    assists: match.participants[0].stats.assists,
    // 游戏时间
    matchTime: timestampToDate(match.gameCreation),
    // 游戏模式
    gameModel:gameModel
  }
}

// 处理战绩数据
export const queryMatchList = async (puuid: string, begIndex: string, endIndex: string):Promise<MatchList[] | []>  => {
  const matchList = await getMatchList(puuid, begIndex, endIndex)

  if (matchList === null) {return []}

  if (matchList?.games?.games?.length === 0 || matchList?.games?.games === undefined ) {return []}

  const simpleMatchList:MatchList[] = []
  for (const matchListElement of isRevGames(matchList.games.games)) {
    const gameModel = queryGameType(matchListElement.queueId)
    simpleMatchList.push(getSimpleMatch(matchListElement,gameModel))
  }

  return simpleMatchList
}

const isRevGames = (games:Game[]):Game[]  =>  {
  const len = games.length
  if (games[0].gameCreation > games[len-1].gameCreation) {
    return games
  }else {
    return games.reverse()
  }
}

// 获取召唤师游戏评分分数
export const getGameScore = async (puuid:string):Promise<MyGameScoreInfo> => {
  let page = 1;
  const playWithSet = new Map<number,number>();

  let matchCount = 0;
  let easyMatchCount = 0;
  const maxMatchCount = 20;
  let gameLen = 999;
  let classicModeGames = [];
  while(matchCount<maxMatchCount&&gameLen>40 && page<20){
    let start  = String((page-1)*50);
    let endIndex= String(page*50-1);
    let matchList:LcuMatchList|null = null;
    for(let n=0;n<5;n++){
      matchList = await getMatchList(puuid,start,endIndex);
      if(matchList==null||matchList.httpStatus==400) {
        continue;
      }else{
        break;
      }
    }
    if(matchList==null||matchList.httpStatus==400){
      if(matchCount>0) break;
      else {
        playWithSet.set(0,10);
        return {score:-1,horse:'神秘人',winRate:0,matchList:[],playWithSet:playWithSet};
      }
    }
    gameLen = matchList.games.gameCount;
    for (const matchListElement of matchList.games.games) {
      if(matchListElement.queueId==420||matchListElement.queueId==440||matchListElement.queueId==430){
        if (matchCount < maxMatchCount&&matchListElement.gameDuration>600){//对局大于10分钟
          matchCount +=1
          if(matchListElement.queueId==430) easyMatchCount+=1;
          classicModeGames.push(matchListElement)
        }
      }
      
    }
    page += 1;
  }

  let gameScore = 0;
  let gameCount = classicModeGames.length;
  let kdaHistory = '';
  let kda = 0;
  if(gameCount<1)  return {score:0,horse:'乱斗玩家',winRate:0,matchList:[],playWithSet:playWithSet};
  let easyPlayer = '排位';
  const simpleMatchList:MatchList[] = [];
  if(easyMatchCount/matchCount>=0.5) easyPlayer ='匹配';
  let roleMap:Map<string,number> = new Map<string,number>();
  let winRate = 0;
  for (const modeGame of classicModeGames) {
    const gamedetail:GameDetailedInfo = await invoke('get_match_detail',{gameId:String(modeGame.gameId)});
    let role =  modeGame.participants[0].timeline.lane+'-'+modeGame.participants[0].timeline.role;
    let beforeValue = roleMap.get(role);
    beforeValue = beforeValue==undefined?0:beforeValue;
    roleMap.set(role,beforeValue+1);
    let nowScore= analyseSingleMatch(playWithSet,gamedetail,modeGame.participants[0],modeGame.gameDuration,role)
    gameScore +=nowScore;
    let tempKad = `${modeGame.participants[0].stats.kills}/${modeGame.participants[0].stats.deaths}/${modeGame.participants[0].stats.assists}  `
    let dead = modeGame.participants[0].stats.deaths;
    if(dead<1) dead = 1;
    kda += 2*(modeGame.participants[0].stats.kills+modeGame.participants[0].stats.assists)/dead
    kdaHistory +=tempKad
    
    const gameModel = `${queryGameType(modeGame.queueId)}[${nowScore.toFixed(1)}]`;
    const simple_match = getSimpleMatch(modeGame,gameModel);
    if(simple_match.isWin) winRate += 1;
    simpleMatchList.push(simple_match)
  }

  gameScore = gameScore/gameCount;
  kda = Math.round(kda/gameCount);
  const horse = easyPlayer+jundgeHorse(gameScore,roleMap)+` K:${kda}`;
  return {score:Math.round(gameScore),horse:horse,winRate:winRate,matchList:simpleMatchList,playWithSet:playWithSet};//四舍五入为整数
}

// 通过分析单场数据得出单场得分情况
export const analyseSingleMatch = (playWithSet:Map<number,number>,gamedetail:GameDetailedInfo,now:Participant,duration:number,role:string) => {
  let totalDamage=0.1;
  let totalKill = 0.1;//防止除0
  let totalVision =0.1;

  for(let i=0;i< gamedetail.participants.length;i++){
    let par = gamedetail.participants[i];
    let parIdentity = gamedetail.participantIdentities[i];
    if(par.teamId==now.teamId){
      if(now.participantId!==par.participantId)//记录队友信息
      {
        let old_num = playWithSet.get(parIdentity.player.summonerId)
        if(old_num==undefined) old_num=0;
        playWithSet.set(parIdentity.player.summonerId,old_num+1);
      }

      totalDamage+=par.stats.totalDamageDealtToChampions;
      totalKill+=par.stats.kills;
      totalVision+=par.stats.visionScore;

    }
    
  }
  let match:Stat = now.stats;
  let score = 0
  if (match.firstBloodKill){score+=10} // 一血 加10分
  if (match.firstBloodAssist){score+=5}// 一血助攻 加5分
  if (match.causedEarlySurrender){score-=10} // 15投发起者 扣10分
  if (match.win){score+=5} else {score-=5}// 游戏胜利 加5分
  score += match.doubleKills * 2 // 一次双杀加2分
  score += match.tripleKills * 5 // 一次三杀加5分
  score += match.quadraKills * 10 // 一次四杀加10分
  score += match.pentaKills * 15 // 一次五杀加15分
  score += (match.kills - match.deaths) //人头贡献净值
  score += match.totalDamageDealtToChampions/duration //每秒出伤
  
  score += match.totalMinionsKilled/duration*60//每分钟补刀
  score += match.goldEarned/duration //每秒经济
  if(match.totalMinionsKilled>10){//补刀和出伤比（拿经济是好的，补刀占用地图资源，不一定是正面作用）
    score += match.totalDamageDealtToChampions/match.totalMinionsKilled/60 
  }
  let kill = match.kills>0?match.kills:1;
  score += match.totalDamageDealtToChampions/kill/60/20 //人头出伤比例
  score += match.visionScore/duration * 60//每分钟视野得分
  score += (match.kills+match.assists)/totalKill*10 //参团率 辅助看助攻禁止k头
  score += (match.totalDamageDealtToChampions)/totalDamage*10 //参团率 c位看出伤
  if(role.indexOf("SUPPORT")!==-1) {
    score += match['assists']*0.55;
    //score += match.visionScore/totalVision * 10//视野得分占比
    
  }
  else {
    
    score += match['assists']*0.5;
  }

  return score
}
// 判断是否为 上等马或者下等马
const jundgeHorse = (score:number,roleMap:Map<string,number>) => {
  let maxRole = 0;
  let totalRole = 0;
  let maxRoleStr = 'SUPPORT';
  for(let key of roleMap.keys()){
    let value = roleMap.get(key);
    value = value==undefined?0:value;
    totalRole = totalRole+value;
    if(value>maxRole) {
      maxRole=value;
      maxRoleStr = key;
    }
  }
  totalRole = totalRole<1?1:totalRole;
  if(maxRole/totalRole>=0.4){//我灭你啊哈哈#69813
    if(maxRoleStr=='BOTTOM-SUPPORT') maxRoleStr="辅助";
    else if(maxRoleStr=='NONE-SUPPORT') maxRoleStr="辅助";
    else if(maxRoleStr=='BOTTOM-CARRY') maxRoleStr="AD";
    else if(maxRoleStr=='TOP-SOLO') maxRoleStr="上单";
    else if(maxRoleStr=='MIDDLE-SOLO')maxRoleStr="中单";
    else if(maxRoleStr=='JUNGLE-NONE') maxRoleStr="打野";
  }else{
    maxRoleStr = "玩家";
  }
 
  if (score>=65){
    return '通天代'+ maxRoleStr
  }
  else if (score>=50){
    return '小代'+ maxRoleStr
  }else if (score>=40){
    return '本地'+ maxRoleStr
  }else if(score>=30){
    return '混子'+ maxRoleStr
  }else{
    return '摆子'+ maxRoleStr
  }
}
const post_example = ()=> {
    let a = {
      "playerMuteUpdate":true,
      "isMuted": true,
      "puuids": ["f6f93a37-76e4-5f1c-b293-8f510a7a0981"]
    
  }
  const body = JSON.stringify(a)
  invoke('post_json_res', { url: '/lol-chat/v1/player-mutes',body:body })
}