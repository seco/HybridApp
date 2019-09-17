var co = require('co'); 
var OSS = require('ali-oss') //阿里云oss模块
var fs = require("fs"); //文件模块
var path = require("path");

//---------------------------使用说明----------------------------
//获取命令行传入参数(第0个参数是node 第1个参数是js文件 第2个文件是本地文件夹路径 第3个是oss相对目录)
//命令格式举例： node  oss/upload_oss.js  ../../static/  /static/

var localPath = process.argv[2]
var remotePath = process.argv[3]
if(localPath == null || remotePath == null){
  throw new Error("缺少目录参数！");
  return
}

localPath = path.resolve(localPath); //本地目录
remotePath = path.resolve(remotePath); //OSS相对目录

if(!fs.existsSync(localPath)){
  throw new Error("本地目录"+ localPath + "不存在！")
  return
}


//上传列表
var fileDic = new Array();

//阿里云OSS配置
var client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAIbnauvaelratv',
  accessKeySecret: 'DgvgV0BRJBANeLzP21HPgjs0g6UUbX',
  bucket: 'uc-hub'
});



console.log('---------上传OSS---------');
console.log('Step1 Analysis');

readDir(localPath)  

function readDir(filePath){  
  filePath = path.resolve(filePath);
  //遍历文件目录
  var pa = fs.readdirSync(filePath);
  pa.forEach(function(filename,index){  
    var file = path.join(filePath,filename)
    var info = fs.statSync(file)   
    //目录   
    if(info.isDirectory()){  
      readDir(file);  
    }
    //文件
    else {  
      //添加到上传列表
      var localDir = path.join(filePath,filename);
      var remoteDir = path.join(remotePath, localDir.replace(localPath,""));
      fileDic[localDir] = remoteDir; 
      console.log("add file：" + localDir)
    }     
  })  
}  

console.log('Step2 Upload');

co(function* () {
    for(var localDir in fileDic)
    {
      var result = yield client.put(fileDic[localDir], localDir);
      console.log("upload from '" + localDir + "' to '" + fileDic[localDir] + "'");
    }
    console.log('Step3 Finish');
  }
).catch(function (err) {
     throw new Error(err);
  }
);

