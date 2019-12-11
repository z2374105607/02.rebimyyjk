/*-----------------------通用Ajax请求处理类-----------------*/
/*-----------------------版本：V1.0------------------*/
/*-----------------------作者:songxw-----------------*/
var net = new Object();
net.Ready_Uninitialized=0;
net.Ready_Loading=1;
net.Ready_Loaded=2;
net.Ready_Intractive=3;
net.Ready_Complete=4;
var _blIsIE = true;
try{
	new ActiveXObject("MicroSoft.XMLHTTP");
}catch(err){
	_blIsIE = false;
}
//构造对象
net.ContentLoader=function(url,onLoadHandle,onErrorHandle,params,postString,isProxy)
{
    this.url=url;
    this.onloadHandle  =onLoadHandle ;
    this.onerrorHandle=(onErrorHandle)?onErrorHandle:this .defaultError; 
    this.ajaxObj=null;
    this.params=params;
    this.postString=postString;
    //默认启用代理,进行请求
    this.isProxyEnabled=false;
    
    var sourceDomain=this.getDomain(window.location.href);
    var targetDomain=this.getDomain(url);
	
    //代理地址
    this.httpProxy="http://"+sourceDomain.server+sourceDomain.port+"/"+sourceDomain.sitename+"/proxy/httpproxy.jsp";
   
    if(isProxy==true){ this.isProxyEnabled=true; }
    else{ this.isProxyEnabled=false; }
    
    if(sourceDomain.server==targetDomain.server && sourceDomain.port==targetDomain.port){
    	this.isProxyEnabled=false;
    }
    //需要在url后加一个随机数，避免由于IE设置问题导致新的请求没能正常发送
    if(url.indexOf("?")!=-1){ 
    	url=url.LTrim().RTrim();
    	url=url+"&random="+Math.random(); 
    }else if(url.indexOf("?") == -1){
    	url=url.LTrim().RTrim();
    	url=url+"?random="+Math.random(); 
    }
    this.loadXmlDoc(url);
};
//加载xml文档
net .ContentLoader.prototype.loadXmlDoc=function(url)
{
	//启用代理
     if(this.isProxyEnabled==true)
     {
     	this.loadXmlDoc_proxy(url);
     }
     //未启用代理
     else
     {
     	this.loadXmlDoc_noProxy(url);
     }
}
//加载xml文档
net .ContentLoader.prototype.loadXmlDoc_noProxy=function(url)
{
      if (_blIsIE)
      {
        this.ajaxObj= new ActiveXObject("Microsoft.XMLHTTP");
      }  
      else if (window.XMLHttpRequest)      
      {
       	 this .ajaxObj = new XMLHttpRequest();     
      }
      if (this .ajaxObj)
      {
        try 
        {
            var loader=this ;
            this .ajaxObj.onreadystatechange=function()
            {
                loader.onReadyState.call(loader);
            }
            if(this.postString==null || this.postString==undefined)
            {
				this .ajaxObj.open('GET',url,true);
				this .ajaxObj.send(null);
            }
            else
            {
           	 	/////////////-------------修改时间2010-1-25 (宋新伟)-----------////////////
				this .ajaxObj.open('POST',url,true);
				this .ajaxObj.setrequestheader("Content-Type","application/x-www-form-urlencoded");
				if(this.postString!=null && this.postString!=undefined)
				{
				    this .ajaxObj.send(this.postString);
				}
				else
				{
				    this .ajaxObj.send(null);
				}
			}
        }
        catch(error)
        {
            this.onerrorHandle.call(this,error.description);
        }
      }
};
//加载成功时的回调函数
net .ContentLoader.prototype.onReadyState=function()
{
    var ajaxObj=this .ajaxObj ;  
    var Ready =ajaxObj.readyState;
  
    if(Ready == net.Ready_Complete )
    {
        var HttpStatus=ajaxObj.status;        
        if (HttpStatus == 200 || HttpStatus==0)
        {
            if(this.params!=null && this.params!=undefined)
            {
				this.onloadHandle.call(this,this.params);
            }
            else
            {
				this.onloadHandle.call(this);
            }
        }
        else
        {
            this .onerrorHandle.call(this);
        }
    }
}
//加载xml文档--通过代理获取异步请求串
net .ContentLoader.prototype.loadXmlDoc_proxy=function(url)
{
	  if (_blIsIE)
      {
        this.ajaxObj= new ActiveXObject("Microsoft.XMLHTTP");
      }  
      else if (window.XMLHttpRequest)      
      {
       	 this .ajaxObj = new XMLHttpRequest();     
      }
      if (this .ajaxObj)
      {
        try 
        {
        	var reg=/&/gi;
        	var requestUrl=this.httpProxy; 
            var loader=this ;
            this .ajaxObj.onreadystatechange=function()
            {
                loader.onReadyState.call(loader);
            }
            if(this.postString==null || this.postString==undefined)
            {
            	requestUrl=requestUrl+"?requestmethod=get&url="+url.replace(reg,":::");
				this .ajaxObj.open('GET',requestUrl,true);
				this .ajaxObj.send(null);
            }
            else
            {
            	requestUrl=requestUrl+"?requestmethod=post&url="+url.replace(reg,":::");
				this .ajaxObj.open('POST',requestUrl,true);
				this .ajaxObj.setrequestheader("Content-Type","application/x-www-form-urlencoded");
            	if(this.postString!=null && this.postString!=undefined)
				{
				    this .ajaxObj.send(this.postString);
				}
				else
				{
				    this .ajaxObj.send(null);
				}
			}
        }
        catch(error)
        {
            this.onerrorHandle.call(this,error.description);
        }
      }
}
//出错回调函数
net.ContentLoader.prototype.defaultError=function()
{
    //alert("Error! fatch data failed!"
   // +"\n\nReadyState:"+this.ajaxObj.readyState
    //+"\nStatus:"+this.ajaxObj.status
    //+"\nheads:"+this.ajaxObj.getAllResponseHeaders());
}
net.ContentLoader.prototype.getDomain=function(service)
{
	var url=service;
	var reg=/http:\/\/([^\/:]+)(:[0-9]+)?\/([^\/]+)/gi;
	reg.test(url);
	return {server:RegExp.$1,port:RegExp.$2,sitename:RegExp.$3}
};
//屏蔽前后空格
String.prototype.Trim=function()
{
    return this.replace(/(^\s*)|(\s*$) /g,"");
};
//屏蔽之前的空格
String.prototype.LTrim=function()
{   
    return this.replace(/(^\s*)/g,"");
};
//屏蔽之后的空格
String.prototype.RTrim=function()
{
    return this.replace(/(\s*$)/g,"");
};