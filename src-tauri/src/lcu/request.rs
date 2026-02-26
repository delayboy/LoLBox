use std::time::Duration;
use reqwest::{header, Certificate};
use reqwest::Proxy;
pub(crate) fn build_reqwest_client(auth_token: Option<String>) -> reqwest::Client {
    let cert = match Certificate::from_pem(include_bytes!("riotgames.pem")) {
        Ok(c) => c,
        Err(e) => {
            //eprintln!("Error loading certificate: {}", e);
            eprintln!("Error loading certificate: {}", e);
            panic!("Failed to load certificate");
        }
    };//.unwrap();
    let mut headers = header::HeaderMap::new();

    if let Some(token) = auth_token {
        let auth_header =
            header::HeaderValue::from_str(format!("Basic {}", token).as_str()).unwrap();
        headers.insert("Authorization", auth_header);
    }

    reqwest::ClientBuilder::new()
        .add_root_certificate(cert)
        .default_headers(headers)
        .timeout(Duration::from_millis(3000))
        .danger_accept_invalid_certs(true)
        //.proxy(Proxy::all("http://127.0.0.1:8888").expect("Invalid proxy URL"))
        .no_proxy() // 禁用代理
        .build()
        .unwrap()
}
