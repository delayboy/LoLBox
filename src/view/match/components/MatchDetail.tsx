import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";
import {useRef, useState} from "react";
import {ParticipantsInfo, ShowTypeKeyListType} from "../../../interface/MatchDetail";

export default function ({participantsInfo,openDrawer,typeIndex,typeIndexChange}:{participantsInfo:ParticipantsInfo,openDrawer:Function,typeIndex:number,typeIndexChange:any}) {
  const arr:[ShowTypeKeyListType,string][] = [['totalDamageDealtToChampions','输出伤害'],['totalDamageTaken','承受伤害'],['goldEarned','商店存款'],['visionScore','视野得分'],['totalMinionsKilled','击杀小兵'],['score','综合评分']]
  const [showTypeKey,setShowTypeKey] = useState(arr[typeIndex][0] as ShowTypeKeyListType)
  const showTypeIndex= useRef(typeIndex)

  const switchShowType = (index:number) => {
    //const rotatedIndex = (showTypeIndex.current += 1) % arr.length
    showTypeIndex.current = index;
    typeIndexChange(index);
    setShowTypeKey(arr[index][0])
  }

  if (participantsInfo?.headerInfo?.length === 1){
    return (<div></div>)
  }
  if (participantsInfo?.headerInfo === undefined){
    return (
      <div className='divContentCenter'>
        获取当前战绩数据异常, 404 Not Found<br/>请在左侧切换其它战绩, 尝试再次获取数据...
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full gap-y-10 slide-in-right'>
      <MatchDetailHeader defaultIndex={typeIndex} title={participantsInfo.headerInfo} showTypeValue={arr} switchFun={switchShowType} />
      <div className='grow'>
        <div className='matchContain'>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={true} showTypeKey={showTypeKey}
                           detailInfo={participantsInfo.teamOne} querySumDetail={openDrawer}/>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={false} showTypeKey={showTypeKey}
                           detailInfo={participantsInfo.teamTwo} querySumDetail={openDrawer}/>
        </div>
      </div>
    </div>
  )
}

