REM 使用 where 命令找到 cargo 的路径
for /f "delims=" %%i in ('where cargo') do set "cargoPath=%%i"

REM 获取 cargo 路径的文件夹部分
for %%i in ("%cargoPath%") do set "cargoDir=%%~dpi"

REM 将文件夹路径写入到环境变量
setx CARGO_HOME "C:\Users\Benson\.cargo"

REM 显示结果
echo cargo 路径是: %cargoPath%
echo cargo 文件夹路径是: %cargoDir%
echo 环境变量 CARGO_HOME 已设置为: %cargoDir%

set path=C:\Users\Benson\.cargo\bin;Z:\Program Files (Portable)\node-v18.16.1-win-x64\;%cd%;%cargoDir%;

set /p userInput=是否使用构建模式: 
if "%userInput%"=="1" (
    npm run tauri %1
) else (
    npm run tauri dev
)
