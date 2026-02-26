import "./css/header.css"
import {
  Tooltip, Tag, Input, Button, useToast, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalBody, Select,
  Drawer,
  DrawerContent,
  Box,
  Checkbox,} from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {lcuSummonerInfo,NoticeTypes,HeaderTypes} from "../../interface/SummonerInfo";
import {AlterToSumId} from "./index";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import RNotification from "./RNotification";
import {open} from "@tauri-apps/api/shell";
import { Slide, Zoom } from "@material-ui/core";

interface SenKeyConfig {
  auto:boolean;
  muted:boolean;
  party:boolean;
  inital_zoom:number;
  excludeChampDic:{[key:string]:string};

}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& button': {
        fontFamily: "DingTalk"
      },
    },
  }),
)
export var g_cfg: SenKeyConfig ={auto :false,muted :false,party :false,inital_zoom:100,excludeChampDic:{'皎月女神':'黛安娜'}}
var lastGameFlow ='';

function sleep(time:number){
  return new Promise(function (resolve:any){
    setTimeout(resolve,time);
  });
}
async function StartThread(run:any, ...args:any) {
  while(await run(...args)){
    await sleep(1000);
  }
}
async function saveCfgChange(){
  await sleep(1000);
  console.log("cfg",g_cfg);
  await invoke("write_file",{strPath:'./config.txt',content:JSON.stringify(g_cfg)});
}
export default function ({page,handleChange,localSumId,sumId,matchMode,handleSelect}:HeaderTypes) {
  const classes = useStyles()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const alterToSumId = useContext(AlterToSumId)

  const [inputValue, setInputValue] = useState('')
  const [sendConfig, setSendConfig] = useState(g_cfg)
  const [isDisable , setIsDisable] = useState(false)
  const [notice,setNotice] = useState({} as NoticeTypes)
  const toast = useToast()
  const targetRef = useRef<any>(null);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const fetchNotice = async () => {
      //const notice:NoticeTypes = await invoke("get_notice")
      const notice:NoticeTypes = {
        gameflow: '',
        is_party: false,
        is_muted: true,
        sumId: '',
      }
      setNotice(notice);
      if (targetRef.current){
        const rect = targetRef.current.getBoundingClientRect();
        console.log("button loc",rect)
        setMenuPosition({
          left: (rect.left+rect.right)/2,
          top: rect.bottom // 下拉菜单的顶部位置设为目标元素的底部位置
        });
      }
      let res:string = await invoke("read_file",{strPath:'./config.txt'});
      if(res.indexOf("{")!==-1){
        let cfg = JSON.parse(res);
        g_cfg=cfg;
        setSendConfig(g_cfg);
        innerAutoChange(g_cfg.auto);

      }
    }
    fetchNotice();

  }, [])
  const autoAccecpt = async () =>{
    let res:any =[];
    try{
      res = await invoke('get_binary_res',{url:'/lol-gameflow/v1/gameflow-phase'});
    }catch(e){
      location.reload();
      console.error(e);
      return false;
    }

    const binaryData = new Uint8Array(res);
    const binaryString = binaryData.reduce((data, byte) => data + String.fromCharCode(byte), '');
    console.log("game_flow",binaryString,g_cfg);
    if(binaryString=='"ReadyCheck"'){
      await sleep(5000);
      const res: any = await invoke('get_json_res', { url: '/lol-matchmaking/v1/ready-check' });
      if (res?.playerResponse !== 'Declined') {
        await invoke('post_json_res', { url: '/lol-matchmaking/v1/ready-check/accept',body:'' })
      }
    }
    else if(binaryString=='"InProgress"'){
      await sleep(5000);
      if(binaryString!==lastGameFlow)myOnOpen();
    }
    else if(binaryString=='"ChampSelect"'){
      await sleep(2000);
      if(binaryString!==lastGameFlow)myOnOpen();
    }
    else if(binaryString=='"Lobby"'){
      if(binaryString!==lastGameFlow)onClose();
    }
    lastGameFlow = binaryString;
    return g_cfg.auto;
  }

  const innerAutoChange = async (auto:boolean) =>{
    g_cfg.auto = auto;
    setSendConfig({...g_cfg});
    if(g_cfg.auto){
      StartThread(autoAccecpt);
    }
  }
  const autoChange = async (event: React.ChangeEvent<HTMLInputElement>) =>{
      await innerAutoChange(event.target.checked);
  }
  const muteChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    g_cfg.muted=event.target.checked;
    setSendConfig({...g_cfg});
    notice.gameflow = "clipboard";
    notice.is_muted =g_cfg.muted;
    notice.is_party = g_cfg.party;
    setNotice({...notice});
    onOpen();

  }
  const partyChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    g_cfg.party=event.target.checked;
    setSendConfig({...g_cfg});
    notice.gameflow = "clipboard";
    notice.is_muted =g_cfg.muted;
    notice.is_party = g_cfg.party;
    setNotice({...notice});
    onOpen();
  }
  const myOnOpen = async () =>{

    const binaryData = new Uint8Array(await invoke('get_binary_res',{url:'/lol-gameflow/v1/gameflow-phase'}));
    const binaryString = binaryData.reduce((data, byte) => data + String.fromCharCode(byte), '');

    notice.gameflow = binaryString;
    notice.sumId = String(sumId);
    notice.is_muted =g_cfg.muted;
    notice.is_party = g_cfg.party;
    setNotice({...notice});
    onOpen();
  }
 
  const searchSum = async (value=undefined) => {
    setIsDisable(false)
    let summoner_name = inputValue;
    if(value!==undefined){
      summoner_name = value;
      setInputValue(value);
    }
    if (summoner_name === ''){
      toast({
        description: "当前召唤师昵称为空",
        status: 'error',
        duration: 2000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
      return
    }

    const sumInfo:lcuSummonerInfo = await invoke('get_other_sum_by_name',{name:summoner_name})
    if (sumInfo?.httpStatus===404){
      toast({
        description: "当前召唤师不存在",
        status: 'error',
        duration: 2000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
      setInputValue('')
      return
    }
    alterToSumId(sumInfo.summonerId)
    setInputValue('')
  }

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      searchSum()
    }
  }

  // 监听 input 的 onChange 事件
  const handleInputChange = (event:any) =>  {
    event.target.value === '' ? setIsDisable(false) : setIsDisable(true)
    setInputValue(event.target.value)
  }

  const handleMatchSelect =(event:any) => {
    handleChange(null,1)
    handleSelect(event.target.value)
  }


  const noticeEle = localSumId !== sumId
      ? <Button ref={targetRef} size={'sm'} onClick={() => {alterToSumId(localSumId)}}
                colorScheme='twitter' className='headerButton' style={{marginLeft:'9px'}}>查看自己</Button>
      : <div style={{display:'flex',gap:'12px'}}><p><input type="checkbox" onClick={saveCfgChange} checked={sendConfig.muted} onChange={muteChange}/>
      静音</p> <p><input type="checkbox" onClick={saveCfgChange} checked={sendConfig.party} onChange={partyChange}/>
          小队</p></div>


  return (

    <div className='relative'>
      <div data-tauri-drag-region className='dragDiv'></div>
      <div className="flex justify-between">
        <div className="flex h-10  items-center justify-between" style={{width:'252px'}}>
          <div className='flex justify-between items-center' style={{width:'250px',height:'40px'}}>
            <img className='w-10' srcSet={icon}/>
            <p className="text-3xl font-bold text-zinc-600">HisBox</p>
            <div className='webSiteDiv'onClick={() => {myOnOpen()}}>召唤师开盒</div>
          </div>
        </div>
        {/*搜索*/}
        <div className='inputDiv'>
          <Input size={'sm'} width={'172px'} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress}
                 style={{borderRadius:'0.375rem',fontSize:'13px'}} placeholder='仅支持查询 当前大区玩家' />
          <Button size={'sm'} onClick={()=>{searchSum()}}
                  colorScheme='telegram' className='headerButton'>搜索</Button>
          <Select value={matchMode} isDisabled={isDisable}  onChange={handleMatchSelect}
                  variant='outline' size='sm' width='100px'>
            <option value='0'>全部模式</option>
            <option value='420'>单双排位</option>
            <option value='440'>灵活排位</option>
            <option value='450'>极地乱斗</option>
            <option value='430'>匹配模式</option>
            <option value='1234'>排位模式</option>
            <option value='4321'>经典模式</option>
          </Select>

          <p><input type="checkbox" onClick={saveCfgChange} checked={sendConfig.auto} onChange={autoChange}/>
          自动</p>

       
          {noticeEle}


          <div className={classes.root} >
            <Pagination size={'small'} count={20} page={page} shape="rounded" onChange={handleChange} />
          </div>
          <div className='flex gap-3'>
            <div className="rounded-full flex roundMDiv roundFont" onClick={() => appWindow.minimize()}>-</div>
            <div className="rounded-full flex roundODiv roundFont" onClick={() => appWindow.minimize()}>o</div>
            <Tooltip label='下次见~' placement='left' bg='#ff6666'>
              <div className="rounded-full flex roundCDiv roundFont" onClick={() => appWindow.hide()}>x</div>
            </Tooltip>
          </div>
        </div>


        <Slide  direction="up" in={isOpen} style={{ textAlign:'center',zIndex: 1400,opacity:0.99,padding:'5px' }}>

          {/*left={menuPosition.left-125} top={`${menuPosition.top+25}px`}*/}
          <Box  position="fixed"  borderRadius={"12px"}  left={`0.75rem`} bottom={`0.75rem`} w="250px" h="160px" bg="white" boxShadow="md">
          <RNotification onCloseInput={onClose} notice={notice}/>
  
          </Box>
        </Slide>
      </div>
    </div>

  )
}

