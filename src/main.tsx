import "./styles.css";
import React from "react";
import {Match} from "./view/match";
import {tagTheme} from "./utils/theme";
import {invoke} from "@tauri-apps/api";
import ReactDOM from "react-dom/client";
import {appWindow} from "@tauri-apps/api/window";

import { ChakraProvider,extendTheme, Grid, GridItem } from '@chakra-ui/react'
import { Zoom } from "@material-ui/core";
import { g_cfg } from "./view/match/RHeader";
import { lcuSummonerInfo } from "./interface/SummonerInfo";
import { DefaultErrorPage } from "./DefaultErrorPage";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { emit } from "@tauri-apps/api/event";
let res:string = await invoke("read_file",{strPath:'./config.txt'});
if(res.indexOf("{")!==-1){
  let cfg = JSON.parse(res);
  g_cfg.inital_zoom=cfg.inital_zoom;
}

function sleep(time:number){
  return new Promise(function (resolve:any){
    setTimeout(resolve,time);
  });
}
var inital_zoom = g_cfg.inital_zoom;
var use_dev =false;
var init_over = false;
var start_without_lol = false;
let root = document.getElementById("root") as HTMLElement;
let root_ele =  ReactDOM.createRoot(root);

document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key === "F12") {
    use_dev =! use_dev;
    console.log("use_dev",use_dev);
    invoke('use_devtools',{useDev:use_dev});
    
  }
});
document.addEventListener("keyup",function(event){
  if(event.key==="`"){
    //emit("my_alt_key_event",{argument:"`"});
    if (!event.altKey){
      invoke('key_code_callback',{iskey:false,code:0xC0,param:0x0500});
    }else{
      invoke('key_code_callback',{iskey:true,code:0xC0,param:0x0500});
    }
    
  }
})
root_ele.render(
  <HashRouter>
    <Routes>
    <Route path="/" Component={DefaultErrorPage} />
    <Route path="/Match" Component={Match} />
    </Routes>
  </HashRouter>

)
while(!init_over){
  let isTrue = await invoke('is_lcu_success');
  if(isTrue&&start_without_lol){
    isTrue=false;
    try{
      const summonerInfo: lcuSummonerInfo = await invoke('get_cur_sum');
      if(typeof(summonerInfo.puuid)=='string')isTrue=true;
      else isTrue =false;
    }catch(e){
      console.log(e);
    }
    
  }
  if (isTrue){
    
   

   
    document.addEventListener('wheel', function(event) {
      if (event.ctrlKey) {
          // Prevent the default zoom behavior
          event.preventDefault();
    
          if (event.deltaY < 0) {
            inital_zoom -= 1;
              //console.log('Scrolling up with Ctrl pressed',inital_zoom);
          } else {
            inital_zoom += 1;
              //console.log('Scrolling down with Ctrl pressed',inital_zoom);
          }
          if(inital_zoom<20) inital_zoom = 20;
          else if(inital_zoom>500) inital_zoom = 500;
          root.style.zoom = `${inital_zoom}%`;
          g_cfg.inital_zoom = inital_zoom;
      }
      }, { passive: false }); // passive: false to allow preventDefault
    if(inital_zoom<20) inital_zoom = 20;
    else if(inital_zoom>500) inital_zoom = 500;
    root.style.zoom = `${inital_zoom}%`;

    init_over = true;

    // 使用 useNavigate 钩子来获取 navigate 函数
    // const navigate = useNavigate();
    // navigate("/Match");
    window.location.hash = '#/Match';

  }else{
    start_without_lol = true;

    // 使用 useNavigate 钩子来获取 navigate 函数
    window.location.hash = '#/';
  }
  await sleep(1000);
  
}
// invoke('is_lcu_success').then((isTrue) => {

// })


