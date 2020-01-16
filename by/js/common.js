//获取用户名密码
function getRequest(){
    let url=location.search;
    //let url="?userId=16a4d554b26113b&token=1c1f823eb64aed5429f54af20ed2849b1&chapterId=16ea07ca04d18mc&appVersion=3.3.0"
    let theRequest={};
    if(url.indexOf('?')!==-1){
        let strs=url.substr(1);
        let str=strs.split('&');
        for(let i=0;i<str.length;i++){
            theRequest[str[i].split('=')[0]]=str[i].split('=')[1];
        }
    }
    return theRequest
}
let userId,token,appVersion,chapterId,id;
let request=getRequest();
userId = request['userId'];
token = request['token'];
appVersion=request['appVersion'];
chapterId=request['chapterId'];

userId='164895dfc571115';
token='135d75dc788b8de729c539f5892c276ae';
chapterId='16ea07ca04d18mc';
appVersion='3.3.0';

//id=request['id'];
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
//let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端
let client=isAndroid?"Android":"IOS";

let IP='http://39.105.11.4';
