# Rust + Tauri + React + Typescript

##    Error failed to bundle project: `https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip: Network Error: Network Error: Error encountered in the status line: unexpected end of file`

类似如下这种错误，可以直接根据提示的链接下载对应的包

然后解压在C:\Users\${User}\AppData\Local\tauri\WixTools 这个目录下，然后就可以继续执行[npm](https://edu.csdn.net/cloud/sd_summit?utm_source=glcblog&spm=1001.2101.3001.7020) run tauri build编译，最终文件目录如下





The application uses Rust, Tauri, React and Typescript in Vite development.

> ❤️ [软件下载](https://lolfrank.cn)

![Alt text](https://cdn.syjun.vip/frank/re.png)

# bug修复

## 编译错误

> error: failed to run custom build command for `webview2-com-sys v0.19.0`
>
> Caused by:
>   process didn't exit successfully: `Z:\Computer\Program\Program_maker\JavaScript\Record-main\src-tauri\target\debug\build\webview2-com-sys-03157d85d8e17911\build-script-build` (exit code: 1)
>   --- stdout
>   cargo:rustc-link-search=native=Z:\Computer\Program\Program_maker\JavaScript\Record-main\src-tauri\target\debug\build\webview2-com-sys-8b4af366fafd91bc\out\x64
>
>   --- stderr
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\arm64\\WebView2Loader.dll" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\arm64\\WebView2Loader.dll"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\arm64\\WebView2Loader.dll.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\arm64\\WebView2Loader.dll.lib"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\arm64\\WebView2LoaderStatic.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\arm64\\WebView2LoaderStatic.lib"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x64\\WebView2Loader.dll" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x64\\WebView2Loader.dll"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x64\\WebView2Loader.dll.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x64\\WebView2Loader.dll.lib"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x64\\WebView2LoaderStatic.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x64\\WebView2LoaderStatic.lib"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x86\\WebView2Loader.dll" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x86\\WebView2Loader.dll"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x86\\WebView2Loader.dll.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x86\\WebView2Loader.dll.lib"
>   Copy from "C:\\Users\\Benson\\.cargo\\registry\\src\\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\\webview2-com-sys-0.19.0\\x86\\WebView2LoaderStatic.lib" -> "Z:\\Computer\\Program\\Program_maker\\JavaScript\\Record-main\\src-tauri\\target\\debug\\build\\webview2-com-sys-8b4af366fafd91bc\\out\\x86\\WebView2LoaderStatic.lib"
>   Error: Io(Error { kind: NotFound, message: "program not found" })
> warning: build failed, waiting for other jobs to finish...
>  ELIFECYCLE  Command failed with exit code 4294967295.

原因是没有安装rustfmt ， 代码位置  [webview2-rs/crates/bindings/build.rs](https://github.com/wravery/webview2-rs/blob/f19a9f4101b58308b42e3d5ba70345631291f0ef/crates/bindings/build.rs#L388) 执行 `cargo install rustfmt`进行安装并将cargo缓存目录添加到环境变量 `set path=C:\Users\Benson\.cargo\bin;%path%`

```rust
fn format_bindings(source_path: &Path) -> super::Result<()> {
    let mut cmd = ::std::process::Command::new("rustfmt");
    cmd.arg(&source_path);
    cmd.output()?;
    Ok(())
}

```

> Please tell me the build does not hard-fail because generated code could not be formatted, i.e. `rustfmt` could not be found.
> Please excuse my rant. I just spent an entire day trying to debug the GitLab pipeline (which is extremely frustrating as it is), assuming I was missing a core dependency like webview-runtime or whatever...
>
> Anyway... `rustfmt` should definitely not be a hard dependency at build time, it should be optional at worst (and not used at all, at best -- who cares about formatting on generated files?)

## VSCODE rust unresolved-proc-macro显示错误

setting.json中添加如下代码

```json
{
    "workbench.colorTheme": "opmono odarkp",
    "editor.accessibilityPageSize": 18,
    "editor.fontSize": 20,
    "editor.fontFamily": "Source Code Pro",
    "terminal.integrated.fontFamily": "monospace",
    "editor.mouseWheelZoom": true,
    "cmake.pinnedCommands": [
        "workbench.action.tasks.configureTaskRunner",
        "workbench.action.tasks.runTask"
    ],
    "terminal.integrated.defaultProfile.windows": "Command Prompt",
    "rust-analyzer.diagnostics.disabled": ["proc macro not expanded","unresolved-proc-macro"],

}
```



# 参考链接

https://github.com/Java-S12138/frank

https://github.com/Java-S12138/Record

- 获取当前对局召唤师ID

```vue
// 查询敌方召唤师ID和昵称
export const queryEnemySummonerIdAndSummonerName = async ():Promise<[SumListDetail[], SumListDetail[], number]> => {
  const currentId = await queryLoaclSummoner()
  const mactchSession = await invokeLcu('get','/lol-gameflow/v1/session')
  // const mactchSession = (await request({
  //   'url': 'https://cdn.syjun.vip/frank/session.json',
  //   method: 'GET',
  // })).data
  const gameType = mactchSession?.gameData?.queue?.id
  const playerChampionSelections = getSelectChamp(mactchSession.gameData.playerChampionSelections)

  if (mactchSession.gameData.teamOne.find((i: any) => i.summonerId === currentId)) {
    var [enemyInfo,friendInfo] = [mactchSession.gameData.teamTwo,mactchSession.gameData.teamOne]
  } else {
    var [friendInfo,enemyInfo] = [mactchSession.gameData.teamTwo,mactchSession.gameData.teamOne]
  }

  return [
    getDetailedInfo(friendInfo,playerChampionSelections,gameType),
    getDetailedInfo(enemyInfo,playerChampionSelections,gameType),
    mactchSession.gameData.gameId as number
  ]
}
export const queryAllSummonerId = async () => {
  const mactchSession = await invokeLcu('get','/lol-champ-select/v1/session')
  const myTeam:MyTeamObject[] = mactchSession?.myTeam
  let summonerIdList:number[] = []
  if (myTeam){
    for (const summoner of myTeam){
      summonerIdList.push(summoner.summonerId)
    }
    return summonerIdList
  }
  return null
}
    
    // 获取我方召唤师ID和昵称
export const querySummonerIdAndSummonerName = async ():Promise<[]| SummonerInfoList[]> => {
  console.log('获取我方召唤师ID和昵称')
  const summonerInfoList:SummonerInfoList[] = []
  const allSummonerId = await queryAllSummonerId()
  if (allSummonerId === null) {
    return []
  }

  for (const summonerId of allSummonerId) {
    const currentSummonerInfo = await querySummonerInfo(summonerId)
    const [rankHandler,champImgs] = await Promise.all([
      querySummonerRank(currentSummonerInfo.puuid),
      querySuperChampList(currentSummonerInfo.puuid)
    ])
    summonerInfoList.push({
      name: currentSummonerInfo.displayName,
      summonerId: `${summonerId}`,
      puuid:currentSummonerInfo.puuid,
      profileIconId:currentSummonerInfo.profileIconId,
      match:{
        rank: `${rankHandler[0]} • ${rankHandler[1]}`,
        champImgs:champImgs
      }
    })
  }
  return summonerInfoList
}
```

- 游戏流识别，和第二种获取队伍列表的方式

```javascript
    # Get Current Gameflow--Phase
    $Script:GameFlowPhase = Invoke-RestMethod -Uri "https://127.0.0.1:$ClientPort/lol-gameflow/v1/gameflow-phase" -Headers $ClientHeaders
    
/lol-chat/v1/conversations
/lol-chat/v1/conversations/${covId}/participants
```

- 召唤师牛马分类

```javascript

export const getSummonerNickName = async (credentials) => {
  console.log('[info] 获取召唤师昵称和等级和头像...')
  const allSummonerId = await queryAllSummonerId(credentials)
  if (allSummonerId == null){
    return null
  }

  let allSummonerNickName = []
  for (const summonerId of allSummonerId) {
    const summonerInfo = await querySummonerInfo(credentials,summonerId)
    let name = summonerInfo.displayName
    let iconId = summonerInfo.profileIconId
    let level = summonerInfo.summonerLevel
    // 通过召唤师ID查询最近十场排位进行分数分析 得出匹马信息
    let gameSocreInfo = await getGameScore(credentials,summonerId)

    allSummonerNickName.push({name:name,iconId:iconId,
      level:level,score:gameSocreInfo['score'],
      horse:gameSocreInfo['horse'],kdaHistory:gameSocreInfo['kdaHistory'],summonerId:summonerId})
  }
  return allSummonerNickName
}

// 查询比赛记录 (最近10场排位)
export const queryMatchHistory = async (credentials,summonerId) => {
  let classicMode = []
  let matchCount = 0
  const matchList = (await createHttp1Request({
    method: "GET",
    url: `/lol-match-history/v3/matchlist/account/${summonerId}`,
  }, credentials)).json()['games']['games'].reverse()
  for (const matchListElement of matchList) {
    if (matchListElement.gameMode == 'CLASSIC' && matchCount < 10){
      matchCount +=1
      classicMode.push(matchListElement)
    }
  }
  return classicMode
}


// 获取召唤师游戏评分分数
export const getGameScore = async (credentials,summonerId) => {
    let classicModeGames = await queryMatchHistory(credentials,summonerId)
    let gameScore = 0
    let gameCount = classicModeGames.length
    let kdaHistory = ''
    for (const modeGame of classicModeGames) {
      gameScore += analyseSingleMatch(modeGame.participants[0].stats)
      let tempKad = `${modeGame.participants[0].stats.kills}/${modeGame.participants[0].stats.deaths}/${modeGame.participants[0].stats.assists}  `
      kdaHistory +=tempKad
    }
    gameScore = parseInt(gameScore/gameCount)
    return {score:gameScore,horse:jundgeHorse(gameScore),kdaHistory:kdaHistory}
}
// 通过分析单场数据得出单场得分情况
const analyseSingleMatch = (match) => {
  let score = 100
  if (match['firstBloodKill']){score+=10} // 一血 加10分
  if (match['firstBloodAssist']){score+=5}// 一血助攻 加5分
  if (match['causedEarlySurrender']){score-=10} // 15投发起者 扣10分
  if (match['win']){score+=5} else {score-=5}// 游戏胜利 加5分
  score += match['doubleKills'] * 2 // 一次双杀加2分
  score += match['tripleKills'] * 5 // 一次三杀加5分
  score += match['quadraKills'] * 10 // 一次四杀加10分
  score += match['pentaKills'] * 15 // 一次五杀加15分
  score += (match['kills'] - match['deaths'])
  score += match['assists'] * 0.5
  return score
}
// 判断是否为 上等马或者下等马
const jundgeHorse = (score) => {
  if (score>=120){
    return '上等马'
  }else if (score>=110){
    return '中等马'
  }else if(score>=100){
    return '下等马'
  }else if (score<100){
    return '小牛马'
  }
}

```

- 原版的queryMatch已经用不了，改用最新版

```javascript
// 根据召唤师ID查询战绩
const queryMatchHistory = async (summonerId: string, begIndex: number, endIndex: number): Promise<LcuMatchList|null> => {
  const res = await invokeLcu(
    'get',
    `/lol-match-history/v1/products/lol/${summonerId}/matches`,
    [begIndex, endIndex])
  if (res?.success === false){
    return null
  }
  return res
}

#[command]
pub async fn get_match_list(puuid:String,beg_index:String,end_index:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-match-history/v1/products/lol/{}/matches?begIndex={}&endIndex={}", puuid,beg_index,end_index).to_string();
    let res = match client.get(url).await {
        Ok(result) => result,
        Err(err) => return Err(err.to_string()),
    };
    Ok(res)
}
```



# 编译和调试

```shell
# 加载node.js环境
init_env.bat

# 前端测试
npm run dev
npm run build

# 启动前端和桌面后端
npm run tauri dev
# release发布
npm run tauri build
```



# 再release版本中使用控制台

- 修改`src-tauri\Cargo.toml`文件，在其中中添加devtools即可（按ctrl+F12打开控制台，这是我自己写代码设计的规则)

```json
[build-dependencies]
tauri-build = { version = "=1.0", features = [] }
embed-resource = "2.1"

[dependencies]
tauri = { version = "1.2", features = [ "api-all", "devtools"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
window-shadows = "0.2.1"
reqwest = { version = "0.11.14", features = ["blocking", "json"] }
tokio = { version = "1", features = ["full"] }
sysinfo = "0.28.0"
base64 = "0.21.0"
lazy_static = "1.4.0"
chrono = "0.4.24"

```

- 仅在调试模式下开启命令行，可使用如下代码，用宏 `#[cfg(debug_assertions)]` 进行控制

```rust
fn use_devtools(use_dev:bool) {
    let win = WINDOW.lock().unwrap();
    if let Some(ref temp_win) = *win {
        if use_dev {
            #[cfg(debug_assertions)]{
                temp_win.open_devtools();
            }
            
            println!("open devtools");
        }else{
            temp_win.close_devtools();
           
            println!("close devtools");
        }
       
    }
}
```

