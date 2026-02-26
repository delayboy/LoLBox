#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "console" // 更改为 "console" 以确保显示控制台窗口，否则使用"windows"隐层控制台窗口
)]

use crate::{
    win_utils::{set_window_shadow},
};
use std::sync::{Arc, Mutex};
use std::fs;
use std::path::Path;
use std::io::prelude::*;
use ffi::HookPackage;
use lazy_static::lazy_static;
use tauri::Manager;
use tauri::Window;
mod ffi;
mod win_utils;
mod lcu;
mod by_lcu;
lazy_static! {
    static ref WINDOW: Mutex<Option<Window>> = Mutex::new(None);
}

#[tauri::command]
fn use_devtools(use_dev:bool) {
    let win = WINDOW.lock().unwrap();
    if let Some(ref temp_win) = *win {
        if use_dev {
            temp_win.open_devtools();
            println!("open devtools");
        }else{
            temp_win.close_devtools();
           
            println!("close devtools");
        }
       
    }
}
fn set_window_always_on_top(always_on_top: bool,default_top:bool) {
    let win = WINDOW.lock().unwrap();
    //println!("set window always on top: {} {}", always_on_top,default_top);
    /*
    true true : 窗口放到前台+永久置顶
    true false :窗口放到前台+不永久置顶
    false true: 取消永久置顶+但不会主动最小化窗口
    false false:取消永久置顶+主动将窗口最小化
        */
    if let Some(ref temp_win) = *win {
         // 先确保窗口是可见的
         if always_on_top {
            // 如果最小化，恢复窗口
           temp_win.unminimize().unwrap();
           temp_win.show().unwrap(); // 确保窗口在置顶时可见
           // 先将窗口激活到前台
           temp_win.set_focus().unwrap();
           if default_top{
            temp_win.emit("my_alt_key_event", "payload").unwrap();
           }
           temp_win.set_always_on_top(default_top).unwrap();

        }
        else{
            temp_win.set_always_on_top(false).unwrap();
            if !default_top{
                temp_win.minimize().unwrap();
            }
           
            //temp_win.hide().unwrap();
        }
        
       
    }
}

#[tauri::command]
fn write_file(str_path: &str, content: &str) -> Result<(), String> {
    let path = Path::new(str_path);
    let mut file = match fs::File::create(&path) {
        Ok(file) => file,
        Err(e) => return Err(format!("Unable to create file: {}", e)),
    };
    match file.write_all(content.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Unable to write to file: {}", e)),
    }
}

#[tauri::command]
fn read_file(str_path:&str)->String {
    // 定义文件路径
    let path = Path::new(str_path);
    // 尝试读取文件内容
    let mut file_content = String::new();
    if path.exists() {
        if let Ok(mut file) = fs::File::open(path) {
            file.read_to_string(&mut file_content).expect("Unable to read file");
        }
        format!("{}", file_content)
    } else {
        println!("{}",format!("File not found: {}",str_path));
        format!("{}", "")
    }
   
}
#[tauri::command]
fn send_key(key:&str) {
    // 复制到剪贴板
    ffi::copy_to_clipboard(&key);
    println!("send");

}
#[tauri::command]
fn key_code_callback(iskey:bool,code:u32,param:i64) {
    let mut hook_package: HookPackage = HookPackage {
        key_event_type: iskey, // 设置 keyEventType
        code: code,             // 设置 code（例如代表 'A' 键）
        w_param: param,          // 设置 wParam
    };
     // 获取 hook_package 的可变引用
    let hook_package_ref: &mut HookPackage = &mut hook_package;

    // 转换为 *mut HookPackage 指针
    let hook_package_ptr: *mut HookPackage = hook_package_ref;
    ffi::rust_hook_proc(hook_package_ptr); // 伪代码，实际实现请根据你的需求
}

fn main() {
    ffi::start_key_code_hook(true);
    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app);
            let temp_win = app.get_window("Record").unwrap();
            {
                let mut win = WINDOW.lock().unwrap();
                *win = Some(temp_win.clone());
            }

              // 复制 DLL 文件到输出目录
            // let resource_dir = app.path_resolver().resource_dir().unwrap();
            // let dll_path = resource_dir.join("src-tauri").join("MyRecordDll.dll");
            // let out_dir = resource_dir.join("resources");
            // fs::create_dir_all(&out_dir).expect("Failed to create resources directory");
            // fs::copy(dll_path, out_dir.join("MyRecordDll.dll")).expect("Failed to copy DLL");
             
            

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            send_key,
            read_file,
            write_file,
            by_lcu::get_binary_res,
            by_lcu::get_json_res,
            by_lcu::post_json_res,
            by_lcu::get_notice,
            by_lcu::is_lcu_success,
            by_lcu::get_cur_sum,
            by_lcu::get_other_sum,
            by_lcu::get_other_sum_by_name,
            by_lcu::get_cur_rank_point,
            by_lcu::get_excel_champ,
            by_lcu::get_match_list,
            by_lcu::get_match_detail,
            by_lcu::get_special_match,
            key_code_callback,
            use_devtools,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
