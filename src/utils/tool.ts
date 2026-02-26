import { get_item_img, get_spell_img } from "../assets/champList";

// 英文段位昵称转中文
export const englishToChinese = (tier:string) => {
  switch (tier) {
    case 'CHALLENGER' :return '王者';
    case 'GRANDMASTER' :return '宗师';
    case 'MASTER' :return '大师';
    case 'DIAMOND' :return '钻石';
    case 'EMERALD' :return '翡翠';
    case 'PLATINUM' :return '铂金';
    case 'GOLD' :return '黄金';
    case 'SILVER' :return '白银';
    case 'BRONZE' :return '青铜';
    case 'IRON' :return '黑铁';
  }
}

// 处理段位数据
export const dealDivsion = (divsion:string) => {
  return divsion === 'NA'?'':divsion
}

// 根据游戏模式ID判断 游戏模式
export const queryGameType = (queueId:number) => {
  switch (queueId) {
    case 420 : return '单双排位';
    case 430 : return '匹配模式';
    case 440 : return '灵活排位';
    case 450 : return '极地乱斗';
    case 1700 : return '斗魂竞技场';
  }
  return '其它模式'
}

// 通过召唤师id获取召唤师图片地址
export const getspellImgUrl = (spellId:number) => {
  return get_spell_img(spellId);
  //return 'https://game.gtimg.cn/images/lol/act/img/spell/SummonerMana.png'
}

// 通过物品id获取图片地址
export const getItemImgUrl = (item:number) => {
  return get_item_img(item);
}

export const iconDict:{ [key: string]: string } = {
  'assists':'助攻最多, 从不K头',
  'firstBlood':'第一滴血, 这局我Carry',
  'fiveKills':'五杀! Superexcellent',
  'fourKills':'四杀! Excellent',
  'god':'超神! So Easy',
  'goldEarned':'获得最多金币 So Rich',
  'kills':'击杀最多 是在下无敌啦',
  'mvp':'Most Valuable Player',
  'svp':'Super Valuable Player',
  'threeKills':'三杀! Good Job',
  'totalDamageDealtToChampions':'输出最高伤害 人称小代',
  'totalDamageTaken':'承伤最多的坦克爸爸',
  'totalMinionsKilled':'补刀最多 随便玩玩啦',
  'turretKills':'拆塔最多, 人在塔拆',
  'visionScore':'视野得分最高'
}
