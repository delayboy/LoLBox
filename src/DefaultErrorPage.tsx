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
import {useState, useEffect, createContext, useRef} from "react";


export const DefaultErrorPage = () =>  {


  const btnRef = useRef(null)

  const theme = extendTheme({
    components: {
      Tag: tagTheme
    }
  })
  return (
    <ChakraProvider theme={theme}>
         
    <div className='relative'>
    <div data-tauri-drag-region className='dragDiv'style={{height:'24px'}}></div>
    <div className="flex justify-center">
      <div className="flex h-10  items-center justify-center" style={{width:'252px'}}>
        <div className='flex justify-center items-center' style={{width:'250px',height:'40px'}}>

          <p className="text-3xl font-bold text-zinc-600">HisBox</p>
       
        </div>
        <div className='flex gap-3'>
          <div className="rounded-full flex roundMDiv roundFont" onClick={() => appWindow.minimize()}>-</div>
          <div className="rounded-full flex roundODiv roundFont" onClick={()=>appWindow.hide()}>o</div>

            <div className="rounded-full flex roundCDiv roundFont" onClick={() => appWindow.close()}>x</div>
      
        </div>
      </div>
      </div>
      </div>
      
    <div className='p-3 bg-white h-full boxShadow' style={{height:'650px'}}>
      <div className='flex gap-5 flex-col items-center h-full justify-center'>
        <h1>┗|｀O′|┛ 啊嗷~~  数据获取异常~~~</h1>
        <h2>请在英雄联盟客户端启动后 打开此软件
          <span className='cursor-pointer text-red-500'
                onClick={() => appWindow.close()}> [ 关闭软件 {new Date().toLocaleString()}] </span> </h2>
        <h2>如果英雄联盟已经运行, 请关注官网 lolfrank.cn 是否存在软件更新 当前版本 1.1.5</h2>
      </div>
    </div>

    </ChakraProvider>
  )
}
