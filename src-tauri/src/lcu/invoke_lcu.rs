use crate::lcu::{process_info, query_match::MatchStruct, request::build_reqwest_client};

pub struct RESTClient {
    port: String,
    reqwest_client: reqwest::Client,
}

type Error = Box<dyn std::error::Error>;

impl RESTClient {
    pub fn new() -> Result<Self, Error> {
        let (auth_token, port) = process_info::get_auth_info()?;
        println!("hello world!{} {}",port,auth_token);
        let reqwest_client = build_reqwest_client(Some(auth_token));
        Ok(Self {
            port,
            reqwest_client,
        })
    }
    pub async fn get_binary(&self, endpoint: String)->  Result<Vec<u8>, reqwest::Error> {
        
        let response: reqwest::Response = self
            .reqwest_client
            .get(format!("https://127.0.0.1:{}{}", self.port, endpoint))
            .send()
            .await?;

       
        // 假设响应是二进制数据（例如图片）
        let bytes = response.bytes().await?;
        //let mut file = File::create("output_image.png")?;
        //copy(&mut bytes.as_ref(), &mut file)?;
        Ok(bytes.to_vec())
       
    }
    // body: Vec<u8> 可用来传递二进制数组
    pub async fn post(&self, endpoint: String,body:String) -> Result<Vec<u8>, reqwest::Error> {
        
        let response: reqwest::Response = self
            .reqwest_client
            .post(format!("https://127.0.0.1:{}{}", self.port, endpoint))
            .body(body)
            .send()
            .await?;
        // 假设响应是二进制数据（例如图片）
        let bytes = response.bytes().await?;
        //let mut file = File::create("output_image.png")?;
        //copy(&mut bytes.as_ref(), &mut file)?
        println!("{}",format!("https://127.0.0.1:{}{}", self.port, endpoint));
        Ok(bytes.to_vec())   
       
    }

    pub async fn get(&self, endpoint: String) -> Result<serde_json::Value, reqwest::Error> {
        
        let req: serde_json::Value = self
            .reqwest_client
            .get(format!("https://127.0.0.1:{}{}", self.port, endpoint))
            .send()
            .await?
            .json()
            .await?;
        println!("{}",format!("https://127.0.0.1:{}{}", self.port, endpoint));
        Ok(req)
       
    }

    pub async fn get_match_list(&self, endpoint: String) -> Result<MatchStruct, reqwest::Error> {
        let req:MatchStruct = self
            .reqwest_client
            .get(format!("https://127.0.0.1:{}{}", self.port, endpoint))
            .send()
            .await?
            .json()
            .await?;
        Ok(req)
    }
}
