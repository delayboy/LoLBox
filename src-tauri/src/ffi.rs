use std::os::raw::c_char;
use std::ffi::CString;
use std::ptr;
use encoding::{Encoding, EncoderTrap};
use encoding::all::GBK;
use std::os::raw::{c_int, c_void};
use std::thread;
use std::time::Duration;
use std::sync::{Mutex, Condvar};
use lazy_static::lazy_static;

use clipboard::{ClipboardContext, ClipboardProvider};

use crate::set_window_always_on_top;

pub fn copy_to_clipboard(text_content: &str) {
    let mut ctx: ClipboardContext = ClipboardProvider::new().expect("Failed to create clipboard context");
    ctx.set_contents(text_content.to_owned()).expect("Failed to set clipboard contents");
}

pub fn get_from_clipboard() -> String {
    let mut ctx: ClipboardContext = ClipboardProvider::new().expect("Failed to create clipboard context");
    ctx.get_contents().expect("Failed to get clipboard contents")
}
#[repr(C)]
pub struct HookPackage {
    pub key_event_type: bool,
    pub code: u32,
    pub w_param: i64,
}

// 使用 lazy_static 创建一个全局可变变量
lazy_static! {
    static ref GLOBAL_C_KEY: Mutex<Option<CString>> = Mutex::new(None);
    static ref GLOBAL_BOOL_FLAG: Mutex<bool> = Mutex::new(false);
    static ref GLOBAL_BOOL_FLAG2: Mutex<bool> = Mutex::new(false);
    static ref HOOK_PACKAGE: Mutex<HookPackage> = Mutex::new(HookPackage {
        key_event_type: false,
        code: 0,
        w_param: 0,
    });
    static ref SIGNAL: (Mutex<bool>, Condvar) = (Mutex::new(false), Condvar::new());
}


pub type PyHookProc = extern "C" fn(*mut HookPackage) -> c_int;

#[link(name = "MyRecordDll")] // 不需要.dll后缀
extern "C" {
    pub fn setPyHookProc(pyHookFunc: PyHookProc);
}

#[link(name = "MyRecordDll")] // 不需要.dll后缀
extern "C" {
    fn SendKeyDown(down:bool,key_code: c_char);
}

#[link(name = "MyRecordDll")] // 不需要.dll后缀
extern "C" {
    pub fn MessageLoop()->c_int;
}

#[link(name = "MyRecordDll")] // 不需要.dll后缀
extern "C" {
    fn SendKey(keystr: *const c_char);
}

#[link(name = "MyRecordDll")] // 不需要.dll后缀
extern "C" {
    pub fn registerEventHook(keyHook: c_int, doRegister: bool) -> c_int;
}
#[tauri::command]
fn trigger_signal() {
    let (lock, cvar) = &*SIGNAL;
    let mut should_print = lock.lock().unwrap();
    *should_print = true; // 设置信号量
    cvar.notify_one(); // 通知等待线程
}

#[tauri::command]
pub fn start_key_code_hook(iskey:bool){
    // 设置钩子函数
    // 监听窗口事件
    thread::spawn(move || {
        loop {
            // 每秒循环
            thread::sleep(std::time::Duration::from_millis(500));

            // 检查信号量
            let (lock, cvar) = &*SIGNAL;
            let mut should_print = lock.lock().unwrap();
            
            // 等待信号
            while !*should_print {
                should_print = cvar.wait(should_print).unwrap();
            }
            let g_hook_package = HOOK_PACKAGE.lock().unwrap();
            if g_hook_package.code==0x70{
                send_keys(get_from_clipboard().as_str());
                *should_print = false; // 重置信号量
                continue;
            }
           
            // 收到信号，打印 hello
            //println!("Hello");
            let mut flag = GLOBAL_BOOL_FLAG.lock().unwrap();
            let mut flag2 = GLOBAL_BOOL_FLAG2.lock().unwrap();
            let flagNow = g_hook_package.w_param==0x100||g_hook_package.w_param==0x104;
            let flagNow2 = g_hook_package.key_event_type;
            if g_hook_package.code==0xC0 && (*flag != flagNow||*flag2 !=flagNow2) {              
                set_window_always_on_top(flagNow,flagNow2);
               
                //*flag = !*flag; // 取反
                *flag = flagNow;
                *flag2 = flagNow2;
            }
            
            *should_print = false; // 重置信号量
        }
    });
    unsafe {
        setPyHookProc(rust_hook_proc);
        registerEventHook(1,true);
    }
}
pub fn send_keys(keys: &str) {
    // 将输入字符串按回车符号分割
    let key_list: Vec<&str> = keys.split('\n').collect();

    // 逐个发送分割后的字符串
    for key in key_list {
        unsafe {
            SendKeyDown(true,13);
            thread::sleep(Duration::from_millis(100));
            SendKeyDown(false,13);
            thread::sleep(Duration::from_millis(10));
            send_key(key);
            SendKeyDown(true,13);
            thread::sleep(Duration::from_millis(100));//0.1秒
            SendKeyDown(false,13);
            thread::sleep(Duration::from_millis(10));
        } 
    }
}

pub fn send_key(key: &str) {
    let gbk_encoded = GBK.encode(key, EncoderTrap::Strict).expect("GBK encoding failed");
    let c_key = CString::new(gbk_encoded).expect("CString::new failed");
    // 将 c_key 保存到全局变量中
    {
        let mut global_c_key = GLOBAL_C_KEY.lock().expect("Failed to lock GLOBAL_C_KEY");
        *global_c_key = Some(c_key.clone());
    }

    /*let global_c_key = GLOBAL_C_KEY.lock().expect("Failed to lock GLOBAL_C_KEY");
    if let Some(c_string) = global_c_key.clone() {
        println!("CString found");
        // 在这里可以使用 c_string
    } else {
        println!("No CString found");
    }*/

    unsafe {
        SendKey(c_key.as_ptr());
    }
}


pub extern "C" fn rust_hook_proc(hook_package: *mut HookPackage) -> c_int {
    unsafe {
        if !hook_package.is_null() {
            let package = &*hook_package;

            if package.w_param==0x0100 {//不带alt按下
                if  package.code==0x70{
                    println!(
                        "keyEventType: {}, code: {}, wParam: {}",
                        package.key_event_type, package.code, package.w_param
                    );
                    let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                    g_hook_package.code = package.code; 
                    trigger_signal();
                   

                }
                if package.code==0xC0{//不带alt按下，把窗口调到前台，并设置窗口永久置顶
                    // 修改全局变量
                    /*
                    true true : 窗口放到前台+永久置顶
                    true false :窗口放到前台+不永久置顶
                    false true: 取消永久置顶+但不会主动最小化窗口
                    false false:取消永久置顶+主动将窗口最小化
                     */
                    
                    let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                    g_hook_package.key_event_type = package.key_event_type;//设置将其永久置顶
                    g_hook_package.code = package.code; 
                    g_hook_package.w_param = package.w_param;  //设置窗口放到前台
                    let mut flag = GLOBAL_BOOL_FLAG.lock().unwrap();
                    let mut flag2 = GLOBAL_BOOL_FLAG2.lock().unwrap();
                    let flagNow = g_hook_package.w_param==0x100||g_hook_package.w_param==0x104;
                    let flagNow2 = g_hook_package.key_event_type;
                    if (*flag != flagNow||*flag2 !=flagNow2){//由于会反复触发C0键，所以需要额外做一次校验，防止高频调用
                        trigger_signal();
                    }
                   
                   
                }              
            }
            if package.w_param==0x0104 && package.code==0xC0 {//带alt按下，把窗口调到前台，但不永久置顶
                // 修改全局变量
                let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                g_hook_package.key_event_type = false;//设置不永久置顶
                g_hook_package.code = package.code; 
                g_hook_package.w_param = 0x0104;   //设置窗口调到前台
                trigger_signal();
            }
            if package.w_param==0x0105 && package.code==0xC0 {//带alt按下时抬起，不最小化窗口，取消永久置顶
                // 修改全局变量
                let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                g_hook_package.key_event_type = true;//设置不最小化窗口
                g_hook_package.code = package.code; 
                g_hook_package.w_param = package.w_param;   //取消永久置顶
                trigger_signal();
            }
            if package.w_param==0x0101 && package.code==0xC0 {//不带alt抬起
                // 修改全局变量
             
                let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                g_hook_package.key_event_type = false; //将窗口最小化到后台
                g_hook_package.code = package.code; 
                g_hook_package.w_param = package.w_param; //取消窗口永久置顶
                trigger_signal();
            }
            if package.w_param==0x0500 {//如是来自JS的调用（抬起按键）
              
                let mut g_hook_package = HOOK_PACKAGE.lock().unwrap();
                g_hook_package.key_event_type = package.key_event_type;//设置窗口是否最小化，按alt不最小化，不按alt最小化 
                g_hook_package.code = package.code; 
                if  g_hook_package.w_param==0x0104{ //之前是使用alt+`来触发了窗口放大
                    g_hook_package.key_event_type=true;//则无论如何都不最小化窗口
                }
                g_hook_package.w_param = package.w_param; //取消窗口的永久置顶
                trigger_signal();
            }
            

           
           
        }
    }
    0 // 返回值根据你的需求进行修改
}