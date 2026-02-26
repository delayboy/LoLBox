import recordImg from "../../assets/img/record.png"
import { Tag, Button, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Image, useToast } from "@chakra-ui/react"
import { open } from '@tauri-apps/api/shell'
import { lcuSummonerInfo, NoticeTypes } from "../../interface/SummonerInfo";
import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { getGameScore } from "../../utils/getMatchInfo";
import { champDict, get_profile_img } from "../../assets/champList";
import { MatchList } from "../../interface/MatchInfo";
import { AlterToSumId } from ".";
import { g_cfg } from "./RHeader";
import { getRankPoint } from "../../utils/getSumInfo";
import { listen } from "@tauri-apps/api/event";



const getImgUrl = (champId:string) => {
  let img_url = champDict['-1'].img_path;
    if (champDict[champId]!==undefined){
      img_url = champDict[champId].img_path;

    }else{
      console.log("不存在英雄",champId)
    }

  return img_url
}
export default function ({ notice, onCloseInput }: { notice: NoticeTypes, onCloseInput: any }) {
  const gameflow = notice.gameflow;
  const [teamList, setTeamList] = useState<lcuSummonerInfo[]>([]);
  const [matchListList, setMatchListList] = useState<MatchList[][]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentId,setCurrentId] = useState<number>(0);
  const [precentShow,setPercentShow] = useState<number>(0);
  const alterToSumId = useContext(AlterToSumId);
  const [sortedIndex,setSortedIndex] = useState<number[]>([]);
  const [avarageScore,setAvarageScore] = useState<string[]>(['未激活','未激活']);
  const toast = useToast();

  const teamListToStr = async (teamList:lcuSummonerInfo[])=>{
    
    let resBlue:string = "";
    let resBlueSum:number = 0;
    let resRed:string = "";
    let resRedSum:number = 0;
    let redBelong:string='敌方';
    let blueBelong:string = '敌方';
    let unmuteFriend:string = '';



    // 按 score 降序排序（如果需要升序排序，请将 b.score - a.score 改为 a.score - b.score）
    let teamListCopy:lcuSummonerInfo[] = JSON.parse(JSON.stringify(teamList));
    const sortedIndex = teamListCopy.map((a, index) => [a.score-a.inWitchTeam*100, index]) // 创建一个包含值和原始索引的数组
    .sort(([a], [b]) => b - a) // 按值排序
    .map(([, index]) => index); // 提取排序后的索引
    setSortedIndex(sortedIndex);
    /*teamListCopy.sort((a, b) => {
      let aScore = a.score+a.inWitchTeam*100;//红队额外加100分进行排序
      let bScore = b.score+b.inWitchTeam*100;
      return bScore - aScore
    });*/
    
    for(const i of sortedIndex){
      let summ = teamListCopy[i];
      if(summ.summonerId==currentId){
        if(summ.summonerLevel>=0&&summ.summonerLevel<teamList.length){
          unmuteFriend = "/mute "+ teamList[summ.summonerLevel].gameName+"#"+teamList[summ.summonerLevel].tagLine+"\n";

        }
      }
      if(summ.inWitchTeam==2){
        if(summ.summonerId==currentId) redBelong = '我方';

        resRedSum+=summ.score;
        resRed +=  `${summ.displayName}:${summ.score}  `
      }else{
        if(summ.summonerId==currentId) blueBelong = '我方';
        resBlueSum+=summ.score;
        resBlue +=  `${summ.displayName}:${summ.score}  `
      }
    }
    resBlue = `${blueBelong}-蓝队战力(均分:${Math.round(resBlueSum/5)}) `+resBlue;
    resRed = `${redBelong}-红队战力(均分:${Math.round(resRedSum/5)}) `+resRed;
    setAvarageScore([resBlue,resRed]);
    let res = "";
    const clipboard:string = await invoke("read_file",{strPath:'./clipboard.txt'});
    if(notice.is_muted){ 
      res = "/mute all\n/pingmute all\n";
      //res = res + unmuteFriend+unmuteFriend;
    }
    

    if(notice.is_party){
      for(const line of clipboard.split("\n")){
        res = res+"/pt " + line +"\n";
      }
      res = res +"/pt "+resBlue+'\n'+"/pt "+resRed ;
    }else{
      res = res + clipboard +"\n";
      res = res +resBlue+'\n' +resRed ;
    }
    
    await invoke('send_key',{key:res});
    toast({
      description: "已复制到剪贴板",
      status: 'success',
      duration: 1000,
      containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
    })
  }
  const hasBlackListTeam = (nowIndex:number,teamList:any[],playWithSet:Map<number,number>)=>{
    let nowTeam = teamList[nowIndex];
    if(nowTeam.teamParticipantId===undefined||nowTeam.teamParticipantId===null){
      for(let i=0;i<teamList.length;i++){
        let team = teamList[i];
        let num = playWithSet.get(team.summonerId);
        if(num!==undefined&&num>=3){
            return i;
        }
      }
      
    }else{
      let nowId = nowTeam.teamParticipantId;
      for(let i=0;i<teamList.length;i++){
        let team = teamList[i];
        if(i!==nowIndex&&team.teamParticipantId===nowId){
            return i;
        }
      }
    }
    return -1;
    
  }

  useEffect(() => {
    // 注册事件监听器
    const unlisten =    listen("my_alt_key_event",(argument)=>{
        console.log("my_alt_key_event",argument);
        document.getElementById("showDetailButton")?.click();
    
      })

    // 在组件卸载时，移除监听器
    return () => {
      unlisten.then((fn) => fn()); // 调用返回的取消注册函数
    };
  }, []); // 空依赖数组确保 effect 只在组件挂载时运行一次
  useEffect(() => {
    (async () => {
      setSortedIndex([]);
      setAvarageScore(['蓝队加载中','红队加载中'])
      const excludeChampDic:{[key:string]:string} = g_cfg.excludeChampDic;
      if(precentShow>0) return;
      setPercentShow(0);
      if(currentId==0){
        const templateSumInfo: lcuSummonerInfo = await invoke('get_cur_sum');
        templateSumInfo.horse = '未执行检测';
        templateSumInfo.score = 0;
        setCurrentId(templateSumInfo.summonerId);
      }
  
      if (notice?.gameflow == '"ChampSelect"') {

        const res: any = await invoke('get_json_res', { url: '/lol-champ-select/v1/session' });
        const myTeam: any[] = res.myTeam;
        console.log('team', myTeam);
        let teamList = [];
        let matchListList:MatchList[][] = [];
        for (let i = 0; i < myTeam.length; i++) {
          let sumId = myTeam[i].summonerId;
          const summonerInfo: lcuSummonerInfo =await invoke('get_other_sum',{summonerId:String(sumId)});
          summonerInfo.inWitchTeam = 1;//默认在第一队
          let display = myTeam[i].assignedPosition;
          if(display==undefined ||display==''){
            display = summonerInfo.gameName;
          }
          summonerInfo.displayName = display;
          summonerInfo.internalName = await get_profile_img(summonerInfo.profileIconId);
          let matchList:MatchList[] = [];
          let scoreInfo = await getGameScore(summonerInfo.puuid);//获取召唤师评分
          [summonerInfo.score,summonerInfo.horse,matchList]=[scoreInfo.score,scoreInfo.horse,scoreInfo.matchList];
          
          let rateBase = matchList.length>0 ? (scoreInfo.winRate/matchList.length*100).toFixed(1):'0';
          let [rank_solo]=summonerInfo.puuid===undefined?['不可查']:await getRankPoint(summonerInfo.puuid)
          summonerInfo.winRate = rank_solo.split(' ')[0] +' '+ rateBase;
          summonerInfo.summonerLevel = hasBlackListTeam(i,myTeam,scoreInfo.playWithSet);
          summonerInfo.httpStatus = undefined;
          teamList.push(summonerInfo);
          matchListList.push(matchList);
          setPercentShow(i);//同步显示进度条
         
        }
        setTeamList(teamList);
        setMatchListList(matchListList);
        teamListToStr(teamList);

      }
      else if(notice.gameflow == '"InProgress"'){
        const mactchSession:any = await invoke('get_json_res', { url: '/lol-gameflow/v1/session' });
        const teamOne:any[] = mactchSession.gameData.teamOne;
        const teamTwo:any[] = mactchSession.gameData.teamTwo;
        let teamList = [];
        let matchListList:MatchList[][] = [];
        console.log('mactchSession', mactchSession);
        for (let i = 0; i < teamOne.length; i++) {
          let sumId = teamOne[i].summonerId;
          const summonerInfo: lcuSummonerInfo =await invoke('get_other_sum',{summonerId:String(sumId)});
          summonerInfo.inWitchTeam = 1;//第一队
          let display = champDict[teamOne[i].championId].label;
          if(excludeChampDic[display]!==undefined) display = excludeChampDic[display];
          summonerInfo.displayName = display;
          summonerInfo.internalName = champDict[teamOne[i].championId].img_path;
          let matchList:MatchList[] = [];
          let scoreInfo = await getGameScore(summonerInfo.puuid);//获取召唤师评分
          [summonerInfo.score,summonerInfo.horse,matchList]=[scoreInfo.score,scoreInfo.horse,scoreInfo.matchList];
          let rateBase = matchList.length>0 ? (scoreInfo.winRate/matchList.length*100).toFixed(1):'0';
          let [rank_solo]=summonerInfo.puuid===undefined?['不可查']:await getRankPoint(summonerInfo.puuid)
          summonerInfo.winRate = rank_solo.split(' ')[0] +' '+ rateBase;
          summonerInfo.summonerLevel = hasBlackListTeam(i,teamOne,scoreInfo.playWithSet);
          summonerInfo.httpStatus = teamOne[i].teamParticipantId;
          teamList.push(summonerInfo);
          matchListList.push(matchList);
          setPercentShow(i);//同步显示进度条
        }
        for (let i = 0; i < teamTwo.length; i++) {
          let sumId = teamTwo[i].summonerId;
          const summonerInfo: lcuSummonerInfo =await invoke('get_other_sum',{summonerId:String(sumId)});
          summonerInfo.inWitchTeam = 2;//第二队
          let display = champDict[teamTwo[i].championId].label;
          if(excludeChampDic[display]!==undefined) display = excludeChampDic[display];
          summonerInfo.displayName = display;
          summonerInfo.internalName = champDict[teamTwo[i].championId].img_path;
          let matchList:MatchList[] = [];
          let scoreInfo = await getGameScore(summonerInfo.puuid);//获取召唤师评分
          [summonerInfo.score,summonerInfo.horse,matchList]=[scoreInfo.score,scoreInfo.horse,scoreInfo.matchList];
          let rateBase = matchList.length>0 ? (scoreInfo.winRate/matchList.length*100).toFixed(1):'0';
          let [rank_solo]=summonerInfo.puuid===undefined?['不可查']:await getRankPoint(summonerInfo.puuid)
          summonerInfo.winRate = rank_solo.split(' ')[0] +' '+ rateBase;
          summonerInfo.summonerLevel = hasBlackListTeam(i,teamTwo,scoreInfo.playWithSet);
          summonerInfo.httpStatus = teamTwo[i].teamParticipantId;
          if(summonerInfo.summonerLevel>=0) summonerInfo.summonerLevel = summonerInfo.summonerLevel+teamOne.length;
          teamList.push(summonerInfo);
          matchListList.push(matchList);
          setPercentShow(i);//同步显示进度条
          
        }
        setTeamList(teamList);
        setMatchListList(matchListList);
        teamListToStr(teamList);

      }else if(notice.gameflow == 'clipboard'){
        teamListToStr(teamList);
      }
      else{
        toast({
          description: "未进入游戏显示好友列表",
          status: 'info',
          duration: 1000,
          containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
        })
        let teamList = [];
        let conv:any[] = await invoke('get_json_res', { url: '/lol-chat/v1/conversations' });
        const conv2:any[] = await invoke('get_json_res', { url: '/lol-chat/v1/friends' });
        conv = conv.concat(conv2);
        let num = 0;
        for (const chat of conv) {
          if(chat.type=="chat"||chat.type==undefined){
            const sumInfo:lcuSummonerInfo = chat;

            sumInfo.gameName =chat.gameName;
            sumInfo.tagLine = chat.gameTag;
            sumInfo.displayName = chat.gameName+"#"+chat.gameTag;
            if(chat.summonerId==undefined){
              const tempSum:lcuSummonerInfo = await invoke('get_other_sum_by_name',{name:chat.gameName+"#"+chat.gameTag});
              sumInfo.summonerId = tempSum.summonerId;
            }

            sumInfo.inWitchTeam= chat.type=="chat"? 2:1;
            sumInfo.score = 0;
            sumInfo.summonerLevel = -1;
            sumInfo.horse = chat.type=="chat"?'chat':chat.note;
            teamList.push(sumInfo);
          }
          setPercentShow(num++);//同步显示进度条
        }
        
        if(notice.sumId!=='0'&&notice.sumId!==''&&notice.sumId!==undefined){
          const summonerInfo: lcuSummonerInfo = await invoke('get_other_sum',{summonerId:String(notice.sumId)});
          teamList=[summonerInfo].concat(teamList);
          summonerInfo.internalName = await get_profile_img(summonerInfo.profileIconId);//champDict['-1'].img_path;
          let scoreInfo = await getGameScore(summonerInfo.puuid);//获取召唤师评分
          const [score,horse,matchList]=[scoreInfo.score,scoreInfo.horse,scoreInfo.matchList];
          summonerInfo.score = score;
          summonerInfo.horse = horse;
          summonerInfo.inWitchTeam = 1;
          let rateBase = matchList.length>0 ? (scoreInfo.winRate/matchList.length*100).toFixed(1):'0';
          let [rank_solo]=summonerInfo.puuid===undefined?['不可查']:await getRankPoint(summonerInfo.puuid)
          summonerInfo.winRate = rank_solo.split(' ')[0] +' '+ rateBase;
          setTeamList(teamList);
          setMatchListList([matchList]);
          setPercentShow(num++);//同步显示进度条
        }
        else{
          setTeamList(teamList);
        }
        
      }
      setPercentShow(-1);
    })();

  }, [notice])

  const buttonEle =  <Button id="showDetailButton" onClick={() => { !isOpen&&teamList.length>0?onOpen():console.log("fail open",teamList);setPercentShow(-2); }}
  size={'sm'} colorScheme='twitter' style={{ fontWeight: '400', height: '30px' }}>详情</Button>
  const mapMatch = (index:number) =>{
     //console.log("m",index)
     let matchList = matchListList[index];
     let backgroundColor = 'rgba(61,61,61,0.16)';
     let color = '#1a202c';
     let value = teamList[index];
     let inBlackList ='单';
     if(value.summonerLevel>=0&&value.summonerLevel<teamList.length){
       inBlackList=`${value.httpStatus===undefined||value.httpStatus===null?'黑':`黑${value.httpStatus}队`}:`+teamList[value.summonerLevel].displayName+'#'+teamList[value.summonerLevel].gameName;
     }
     if(value.inWitchTeam==2) {
       backgroundColor = 'rgb(253, 234, 234)';//'rgba(255, 102, 102, 0.12)';//如果是红队
       color = '#830000';
     }else if(value.inWitchTeam==1){//如果是蓝队
       backgroundColor = 'rgb(214, 235, 255)';//'rgba(0,128,255,0.16)';
       color = '#005383';
     }
     if(currentId==value.summonerId)  color = '#188300';
     return (
     <div key={index} className='flex-col flex'style={{paddingRight:'1px',paddingLeft:'1px'}}>
       <div className='flex-row flex' style={{backgroundColor:backgroundColor,width:'98px'}}>
         <Image className='rounded' boxSize='45px' src={value.internalName} onClick={()=>{onClose();alterToSumId(value.summonerId);}}/>
         <span className="id-container"style={{height:'50px'}}><p style={{width:'45px',fontSize:value.displayName!==undefined&&value.displayName.length>4?'15px':'17px',fontWeight:'bold',color:color,backgroundColor:backgroundColor}} > {`${value.displayName} `} </p></span>
        </div>
        <span style={{width:'98px',fontSize:'10px',color:color,backgroundColor:backgroundColor}}>{` ${value.score}分 ${value.winRate}%`}</span>
        <span style={{width:'98px',fontSize:'10px',color:color,backgroundColor:backgroundColor}}>{` ${value.horse}`}</span>
        <span style={{width:'98px',fontSize:'10px',color:color,backgroundColor:backgroundColor}}>{` id:${value.gameName}`}</span>
        <span style={{width:'98px',fontSize:'10px',color:color,backgroundColor:backgroundColor}}>{` (${inBlackList})`}</span>
         {matchList.map((match,i)=>{
           return (
           <div  onClick={()=>{onClose();alterToSumId(value.summonerId);handleMatchList(matchList,i)}}  key={index*20+i} className='flex-row flex' style={{paddingBottom:'1px',paddingTop:'1px'}}>
            <Image className='rounded' boxSize='30px' src={getImgUrl(match.champId)}/>
            <Tag
             size={'sm'}
             variant={match.isWin?'NInfo':'NError'}
             style={{height:'30px',width:'68px',
               justifyContent:'center',fontSize:'12px',flexDirection:'column'}}>

             <p>{match.gameModel[0]}-{match.kills}-{match.deaths}-{match.assists}</p>
             <p style={{fontSize:'9px',width:'100%',textAlign:'right'}}>{match.matchTime}</p>
           </Tag>
           
           </div>
          
           )
         })}

     </div>)
  } 
  const handleMatchList = (matchList:MatchList[],matchIndex=0) =>{
    
    // 创建一个自定义事件
    let event = new CustomEvent('myCustomEvent', {
      detail: {matchList,matchIndex}
      
    });
    // 触发事件
    document.dispatchEvent(event);
  }
  return (
    <div className='flex-col flex' style={{alignItems:'center'}}>
      <div className='flex px-1.5 justify-between' style={{width:'100%'}}>
        <div className='flex gap-5' style={{zoom:'80%',width:'100%',justifyContent:'space-between'}}>
        <Button onClick={() => { onCloseInput();setPercentShow(-2); }}   size={'sm'}  colorScheme='twitter' style={{ fontWeight: '400', height: '30px',background:'#ff5959' }}>关闭</Button>
          <Button size={'sm'} style={{ fontWeight: '400', height: '30px'}} onClick={() => { teamListToStr(teamList);setPercentShow(-2); }} >{"["+precentShow+"]"+"GF:"+ gameflow}</Button>

          {buttonEle}
        </div>

      </div>
      <div style={{ overflow:'scroll',display:'flow', paddingLeft: '5px',paddingRight:'5px',marginBottom:'5px',marginTop:'5px', zoom: '80%', width: '300px', height: '173px' }}>
        {/* <img src={recordImg}/> */
          teamList.map((value, index) => {
            let inBlackList = value.summonerLevel>=0?`黑`:'单';
            let backgroundColor = 'rgba(61,61,61,0.16)';
            let color = '#1a202c';
            if(value.inWitchTeam==2) {
              backgroundColor = 'rgba(255, 102, 102, 0.12)';//如果是红队
              color = '#830000';
            }else if(value.inWitchTeam==1){//如果是蓝队
              backgroundColor = 'rgba(0,128,255,0.16)';
              color = '#005383';
            }
            if(currentId==value.summonerId)  color = '#188300';
            return (<div style={{zoom:'80%',width:'100%',fontSize:'20px',padding:'5px', backgroundColor:backgroundColor,color:color}} key={index} onClick={() => { alterToSumId(value.summonerId); if(index<matchListList.length)handleMatchList(matchListList[index]) }}>{`[${value.winRate}% ${value.score}分${value.horse}](${inBlackList})${value.displayName}#${value.gameName}`}</div>)
          })
        }

      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'} autoFocus={false}>
        <ModalOverlay />
        <ModalContent style={{marginTop:'5px',width:'1000px',height:'640px',minHeight:'500px'}}>
          <ModalBody>
           <div>
            {avarageScore.map((value,index)=>{
              return (<p key={index}>
                {value}
              </p>)
            })}
            </div>
            <div className='flex-row flex' style={{overflow:'auto',height:'572px'}}>
              {
                sortedIndex.length>0&&sortedIndex.length<=matchListList.length?sortedIndex.map((index)=>{
                 return mapMatch(index);
                }):matchListList.map((unuse,index)=>{
                  return mapMatch(index);
                 })
              }
            </div>
           
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}
