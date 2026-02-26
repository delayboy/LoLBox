// https://github.com/tauri-apps/tauri/discussions/4201#discussioncomment-3279531
extern crate embed_resource;

fn main() {
  println!("cargo:rustc-link-search=native=src-tauri");
  println!("cargo:rustc-link-lib=dylib=MyRecordDll");
  tauri_build::build();

  #[cfg(target_os = "windows")]
  embed_resource::compile("record-manifest.rc", embed_resource::NONE);
}
