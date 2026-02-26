import "./css/sumInfo.css"
import {SumReslut} from "../../interface/SummonerInfo";
import {Image, Tag,Table, Tbody, Tr, Td, TableContainer} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getGameScore } from "../../utils/getMatchInfo";

export default function ({sumInfo,rankPoint}:{sumInfo:SumReslut,rankPoint:string[]}) {
  const lv:string = sumInfo!==undefined ? `${parseInt(String((sumInfo.xpSL/sumInfo.xpNL)*100))}%` : '0%'
  const [score,setScore] = useState<number>(-2);
  const [rate,setRate] = useState<string>('加载中');
  const [horse,setHorse] = useState<string>('加载中');
  useEffect(()=>{
    getGameScore(sumInfo.puuid).then((scoreInfo:any) => {
      
      const [score,horse,matchList] = [scoreInfo.score,scoreInfo.horse,scoreInfo.matchList]; 
      let winRate = matchList.length>0 ? (scoreInfo.winRate/matchList.length*100).toFixed(1):'0';
      setRate(winRate);
      setScore(score);
      setHorse(horse);
    });

  },[sumInfo])
  return (
    <div className="p-3 bg-white h-full w-full boxShadow" style={{height:'246px'}}>
      <div className="flex gap-x-4">
        <Image className="imgFull" borderRadius='full'
               boxSize='60px' src={sumInfo.imgUrl}
               fallbackSrc='https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/5430.png'/>
        <div className="flex flex-col grow gap-y-2">
            <Tag
              size={'md'}
              borderRadius='full'
              variant='NInfo'
              style={{height:'28px',justifyContent:'center',
                }}
            >
              {sumInfo.name}
            </Tag>
          <div className="progressDiv">
            <div className="progressLineBcg">
              <div className="progressBgc">
                <div className="progressLine" style={{width:lv}}>
                </div>
              </div>
            </div>
            <p className="pText">{`Lv ${sumInfo.lv}`}</p>
          </div>
        </div>
      </div>

      {/*排位数据*/}
      <TableContainer style={{overflow:'auto',height:'146px'}} className="mt-4">
        <Table variant='simple' size='sm'>
          <Tbody>
            <Tr>
              <td>
                <div style={{paddingTop:'8px'}} className="flex justify-between">

                  <Tag
                    size={'lg'}
                    style={{width:'100%'}}
                    className="rankTag"
                    variant='NSuccess'>
                    {` ${rate}% ${score}分 ${horse}`}
                  </Tag>
                </div>
              </td>
            </Tr>
            <Tr>
              <Td style={{padding:'8px 0px'}}>
                <div className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    单双排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    style={{width:'125px'}}
                    className="rankTag"
                    variant='NSuccess'>
                    {`${rankPoint[0]}`}
                  </Tag>
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td style={{padding:'8px 0px'}}>
                <div className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    灵活排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    style={{width:'125px'}}
                    className="rankTag"
                    variant='NSuccess'>
                    {rankPoint[1]}
                  </Tag>
                </div>
              </Td>
            </Tr>
            <Tr>
              <td>
                <div style={{paddingTop:'8px'}} className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    云顶排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    style={{width:'125px'}}
                    className="rankTag"
                    variant='NSuccess'>
                    {rankPoint[2]}
                  </Tag>
                </div>
              </td>
            </Tr>
            <Tr>
              <td>
                <div style={{paddingTop:'8px'}} className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    曾用名
                  </Tag>
                  <Tag
                    size={'lg'}
                    style={{width:'125px'}}
                    className="rankTag"
                    variant='NSuccess'>
                    {sumInfo.displayName}
                  </Tag>
                </div>
              </td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
