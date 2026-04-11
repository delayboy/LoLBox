import "../css/matchContain.css";
import {Image,Tooltip} from "@chakra-ui/react";
import {MatchItem,SumDetail} from "../../../interface/MatchDetail";
import {querySumRank} from "../../../utils/getSumInfo";
import {iconDict} from "../../../utils/tool";

export default function ({isLeft,detailInfo,showTypeKey,showTypeIndex,querySumDetail}:MatchItem) {
  const queryDetail = (index:number) => {
    const personalGameDetails = detailInfo[index]

    const listItemData = [
      ['输出伤害',personalGameDetails.totalDamageDealtToChampions],
      ['物理伤害',personalGameDetails.physicalDamageDealtToChampions],
      ['魔法伤害',personalGameDetails.magicDamageDealtToChampions],
      ['真实伤害',personalGameDetails.trueDamageDealtToChampions],
      ['承受伤害',personalGameDetails.totalDamageTaken],
      ['击杀野怪',personalGameDetails.neutralMinionsKilled],
      ['击杀小兵',personalGameDetails.totalMinionsKilled],
      ['获得金钱',personalGameDetails.goldEarned],
      ['视野得分',personalGameDetails.visionScore],
      ['放置守卫',personalGameDetails.wardsPlaced],
      ['综合评分',personalGameDetails.score],
    ]
    const kda = personalGameDetails.kills+'-'+personalGameDetails.deaths +'-'+personalGameDetails.assists
    querySumRank(String(personalGameDetails.accountId)).then((rankData) => {
      const personalDetails:SumDetail =  {
        name:personalGameDetails.name,champImgUrl:personalGameDetails.champImgUrl,
        champLevel:personalGameDetails.champLevel,kda:kda,spell1Id:personalGameDetails.spell1Id,
        spell2Id:personalGameDetails.spell2Id,runesList:personalGameDetails.runesList,
        listItemData:listItemData,
        rankData:rankData,
        summonerId:personalGameDetails.accountId,
      }
      querySumDetail(personalDetails)
    })
  }

  const itemDiv = detailInfo.map((summoner,index) => {
    const iconImgEle = summoner.iconList.map((icon:string,index:number) => {
      return getIconEle(index+2,icon)
    })
    if (summoner.isMvp && summoner.isWin){
      iconImgEle.unshift(getIconEle(1,'mvp'))
    }else if (summoner.isMvp && !summoner.isWin){
      iconImgEle.unshift(getIconEle(1,'svp'))
    }
    iconImgEle.unshift(getIconEle(0,summoner.banChampImgUrl))
    return (
      <div key={index} onClick={() => {queryDetail(index)}}>
        <div className='summonerItem'>
          {/*头像*/}
          <div className={(summoner.isCurSum?'slideSum':'') +' champAvatar'}>
            <Image className='rounded'
                   boxSize='50px' src={summoner.champImgUrl}/>
            <div className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' champLevel'}>
              {summoner.champLevel}
            </div>
          </div>
          <div className='grow flex flex-col justify-between'>
            {/*装备*/}
            <div className='flex justify-between pr-0.5'>
              <img className="itemClass"  src={summoner.item0}/>
              <img className="itemClass"  src={summoner.item1}/>
              <img className="itemClass"  src={summoner.item2}/>
              <img className="itemClass"  src={summoner.item3}/>
              <img className="itemClass"  src={summoner.item4}/>
              <img className="itemClass"  src={summoner.item5}/>
              <img className="itemClass"  src={summoner.item6}/>
            </div>
            {/*召唤师技能等*/}
            <div className='skillDiv relative'>
              <img className="itemClassSecond" src={summoner.spell1Id}/>
              <img className="itemClassSecond" src={summoner.spell2Id}/>
              {/*召唤师昵称*/}
              <div className={(summoner.isCurSum?'currentSumColor':'') +' summonerName'}>{summoner.name}</div>
              {/*kda*/}
              <div className="kdaDiv">{summoner.kills}-{summoner.deaths}-{summoner.assists}</div>
            </div>
          </div>
        </div>
        <div className='progressDivP'>
          <p className='progressValue' >
            {summoner[showTypeKey]}
          </p>
          <div style={{width:'205px',}}>
            <p key={showTypeIndex}  style={{width:summoner.showDataDict[showTypeKey]}}
               className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' progressP scale-in-hor-left'}/>
          </div>
          <div className='matchIconImgDiv'>
            {iconImgEle}
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='matchItemMain'>
      {itemDiv}
    </div>
  )
}

// 获取icon元素
const getIconEle = (index:number,key:string) => {
  let imgUrl = new URL(`/src/assets/matchImage/${key}.png`, import.meta.url).href
  let otherStyle={};
  if(index==0) {
    otherStyle={
      height:'20px',
      marginLeft:'-1px',
      marginTop:'-4px',
      background: 'linear-gradient(135deg, transparent 45%, rgba(255,0,0,0.7) 45%, rgba(255,0,0,0.7) 55%, transparent 55%)',
      pointerEvents: 'none', // 让斜杠不干扰点击
      borderRadius: '3px', // 如果头像有圆角
    };
    imgUrl = key;//如果是首个图标则显示ban位
  }
  return(
      <Tooltip key={index} label={iconDict[key]} placement='top-start' fontSize={13}
               offset={[-1,6]} bg='#edf2f7' color='#a1a1aa'>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={imgUrl} style={otherStyle} className='matchIconImg'/>
          {index==0 && (  // 是否禁用的条件
            <div style={{
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, transparent 45%, rgb(187 187 187 / 70%) 45%, rgb(141 141 141 / 70%) 55%, transparent 55%)',
              pointerEvents: 'none', // 让斜杠不干扰点击
              borderRadius: '3px', // 如果头像有圆角
            }} />
          )}
        </div>
      </Tooltip>
    )
}
