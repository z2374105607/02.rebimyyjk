// JScript 文件
function getBrowser()
{
    //IE7.0
    if(navigator.userAgent.indexOf("MSIE 7.0")>0) { 
        return {isIE:true,version:7.0}; 
    } 
    //IE6.0
    if(navigator.userAgent.indexOf("MSIE 6.0")>0)
    {
        return {isIE:true,version:6.0}; 
    }
    //IE8.0
    if(navigator.userAgent.indexOf("MSIE 8.0")>0) { 
        return {isIE:true,version:8.0}; 
    } 
    //Firefox
    if(navigator.userAgent.indexOf("Firefox")>0){ 
        return {isIE:false,version:5.0}; 
    } 
    //Safari
    if(navigator.userAgent.indexOf("Safari")>0) { 
        return {isIE:false,version:5.0}; 
    } 
    //Camino
    if(navigator.userAgent.indexOf("Camino")>0){ 
        return {isIE:false,version:5.0};  
    } 
    //Mozilla
    if(navigator.userAgent.indexOf("Gecko/")>0){ 
        return {isIE:false,version:5.0};  
    } 
    //Mozilla
    if(navigator.userAgent.indexOf("Mozilla/")>0){ 
        return {isIE:false,version:5.0};  
    } 
     return {isIE:true,version:7.0}; 
}
//获取当前浏览器有效宽度
function getDocumentPixel()
{
   if(navigator.userAgent.indexOf("MSIE")>0) { 
       	return {width:window.document.documentElement.offsetWidth,height:window.document.documentElement.offsetHeight};
   	}
   	else{
   		return {width:window.innerWidth,height:window.innerHeight};
   	}
};
 //获取当前屏幕有效宽度
function getScreenPixel()
{
    return {width:window.screen .availWidth,height:window.screen .availHeight};
};
//获取各浏览器窗体及页面实际尺寸
function getPageSize(){  
  var xScroll, yScroll;  
  if (window.innerHeight && window.scrollMaxY) {  
    xScroll = document.body.scrollWidth;
    yScroll = window.innerHeight + window.scrollMaxY;
  } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
    xScroll = document.body.scrollWidth;
    yScroll = document.body.scrollHeight;
  } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
    xScroll = document.body.offsetWidth;
    yScroll = document.body.offsetHeight;
  }

  var windowWidth, windowHeight;
  if (self.innerHeight) {  // all except Explorer
    windowWidth = self.innerWidth;
    windowHeight = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  } else if (document.body) { // other Explorers
    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;
  }  
  
  // for small pages with total height less then height of the viewport
  if(yScroll < windowHeight){
    pageHeight = windowHeight;
  } else {
    pageHeight = yScroll;
  }

  if(xScroll < windowWidth){  
    pageWidth = windowWidth;
  } else {
    pageWidth = xScroll;
  }

  arrayPageSize = {pageWidth:pageWidth,pageHeight:pageHeight,windowWidth:windowWidth,windowHeight:windowHeight};
  return arrayPageSize;
}
//获取event对象--兼容firefox
function getEvent(event) {
    var ev = event || window.event;
    if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                    ev = c.arguments[0];
        if (ev && (Event == ev.constructor || MouseEvent  == ev.constructor)) {
            break;
        }
        c = c.caller;
            }
    }
    return ev;
}
//获取元素的位置信息
function findPosition( oElement )    
{   
  var x2 = 0;   
  var y2 = 0;   
  var width = oElement.offsetWidth;   
  var height = oElement.offsetHeight;   
  if( typeof( oElement.offsetParent ) != 'undefined' )    
  {   
    for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent )    
    {   
      posX += oElement.offsetLeft;   
      posY += oElement.offsetTop;         
    }   
    x2 = posX + width;   
    y2 = posY + height;   
    return {left: posX,top: posY ,right:x2,bottom: y2};   
       
    } else{   
      x2 = oElement.x + width;   
      y2 = oElement.y + height;   
      return {left:oElement.x, top:oElement.y, right:x2, bottom:y2};   
  }   
}

//对象拖拽
function DragObj(obj)
{
    this.obj=obj;
    this.isLimit=true;
    this.offX=0;
    this.offY=0;
    
     var pObj=this;
     var op=pObj.obj.parentNode;
     var pos=null;
     //拖拽
     this.dragging=function(e)
     {
            if(!e) e=window.event; 
            var x=(isNaN(parseInt(op.style.left))?op.offsetLeft:parseInt(op.style.left)); 
            var y=(isNaN(parseInt(op.style.top))?op.offsetTop:parseInt(op.style.top)); 
            pObj.offX=e.clientX-x; 
            pObj.offY=e.clientY-y; 
            pos=findPosition(op);
            
            if(document.addEventListener){ 
                document.addEventListener('mousemove', pObj.onmousemove, true); 
                document.addEventListener('mouseup', pObj.onmouseup, true); 
            } else if(document.attachEvent){ 
                document.attachEvent('onmousemove', pObj.onmousemove); 
                document.attachEvent('onmouseup', pObj.onmouseup); 
            } 
            
            pObj.stop(e);     
            pObj.abort(e);
    };
    this.onmouseup=function(e)
    {
        if(!e)e=window.event; 
                 
        if(document.removeEventListener)
        { 
            document.removeEventListener('mousemove', pObj.onmousemove, true); 
            document.removeEventListener('mouseup', pObj.onmouseup, true); 
        } else if(document.detachEvent)
        { 
            document.detachEvent('onmousemove', pObj.onmousemove); 
            document.detachEvent('onmouseup', pObj.onmouseup); 
        } 
         
        pObj.stop(e); 
    };
    this.onmousemove=function(e)
    {
        if(!e)e=window.event; 
         
        if(pObj.isLimit)
        {  
            var opW=pos.right-pos.left; 
            var opH=pos.bottom-pos.top; 
             
            if((e.clientX-pObj.offX)<0 || (e.clientY-pObj.offY)<0) return false; 
            if((e.clientX-pObj.offX+opW)>document.documentElement.offsetWidth || (e.clientY-pObj.offY+opH)>document.documentElement.offsetHeight) return false;
            //if((e.clientX-pObj.offX)<0) return false; 
            //else if((e.clientX-pObj.offX+obj.offsetWidth+opX)>(opX+(pos.right-pos.left))) return false; 
             
            //if(e.clientY-pObj.offY<0) return false; 
            //else if((e.clientY-pObj.offY+obj.offsetHeight+opY)>(opY+(pos.bottom-pos.top))) return false; 
        } 
         
        op.style.left=e.clientX-pObj.offX+'px'; 
        op.style.top=e.clientY-pObj.offY+'px'; 
        
        pObj.stop(e); 
   };
   this.stop=function(e)
   {
        if(e.stopPropagation) return e.stopPropagation(); 
        else return e.cancelBubble=true; 
   };
   this.abort=function(e)
   {
         if(e.preventDefault) return e.preventDefault(); 
         else return e.returnValue=false; 
   };
   this.obj.onmousedown=this.dragging;
}  
//取消窗体默认右键菜单
function abortDefaultMenuContext()
{
    this.nocontextmenu=function() 
    { 
        event.cancelBubble = true 
        event.returnValue = false; 

        return false; 
    };
    this.norightclick=function(e) 
    { 
		if(!e)e=window.event;
        if (window.Event) 
        { 
            if (e.which == 2 || e.which == 3) 
            return false; 
        } 
        else 
        if (event.button == 2 || event.button == 3) 
        { 
            event.cancelBubble = true 
            event.returnValue = false; 
            return false; 
        } 
    } 
    document.oncontextmenu =this.nocontextmenu; 
    document.onmousedown = this.norightclick;
}
//屏蔽前后空格
String.prototype.Trim=function()
{
    return this.replace(/(^\s*)|(\s*$) /g,"").replace(/[\r\n]/g, "").replace(/[ ]/g, "");
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
//去除特殊字符。对象命名非法字符
String.prototype.replaceIlegalityChar =function(){
	return this.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\$]/g,"");
};
//扩展format函数
String.prototype.Format=function(strSource,args)
{   
    var strTarget=strSource;
    for(var i=0;i<args.length;i++)
    {
    	var patten="\\{"+i.toString()+"\\}";
    	var reg=new RegExp(patten,"gi");
    	strTarget=strTarget.replace(reg,args[i]);
    }
    return strTarget;
};
//定义字符转为bool类型 ”true“ 为 bool型true 默认false
String.prototype.toBoolean =function(){
	return this.toUpperCase()!="FALSE";
};
//扩展format函数
String.prototype.toBoolean=function()
{   
    return this.toUpperCase()!="FALSE"?true:false;
};
String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	} ;
	 
	String.prototype.endWith=function(str){     
	  var reg=new RegExp(str+"$");     
	  return reg.test(this);        
	} ;
//获取文件名--从相对路径中获取文件名
function getFullFileName(filePath)
{
	var strs=filePath.split("\/");
	return strs[strs.length-1];
	
};
//扩展数组，添加isContain，判定子项存在否
Array.prototype.isContain=function(elem)
{
    for(var i=0;i<this.length;i++)
    {
        if(this[i]==elem)
        { return true; }
    } 
    return false;
};
//去除数组中重复的值
Array.prototype.unique=function() {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = this[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};
//生成指定位数的GUID值
function newGUID(l)
{
	var x="0123456789";
	var tmp="";
	for(var i=0;i<l;i++)   
	{
		tmp+= x.charAt(Math.ceil(Math.random()*100000000)%x.length);
	}
	return tmp;
};
function newRowID(l)
{
	var x="";
	var selectChar = new Array(1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的
	for(var i=0;i<l;i++){
		var charIndex = Math.floor(Math.random()*34);
		x +=selectChar[charIndex];
	}
	return x;
};
//注册js到页面
function _includeScript(script,encode)
{
	if(encode==null || encode==undefined){
    	document.writeln ("<script type='text/javascript' src='"+script+"'><\/script>");
    }
    else{
    	document.writeln ("<script type='text/javascript' src='"+script+"' charset='"+encode+"'><\/script>");
    }
}

//注册CSS到页面
function _includeCss(css) {
	document.writeln("<link href=" + css + "  rel='Stylesheet' type='text/css' />");
}

//取消冒泡
function cancleBuble(e)
{
    if(e.stopPropagation) return e.stopPropagation(); 
    else return e.cancelBubble=true; 
    
    if(e.preventDefault) return e.preventDefault(); 
    else return e.returnValue=false;
}
//将json转换为string
function jsonToString(json)
{
	var arrStr=new Array();
	for(var k in json)
	{
		arrStr.push(k+":'"+eval("json."+k)+"'");
	}
	return "{"+arrStr.join(",")+"}"
}
 //转义html字符串
 //空格  &nbsp; &#160; 
//< 小于 &lt; &#60; 
//> 大于  &gt; &#62; 
//& &符号 &amp; &#38; 
//" 双引号  &quot; &#34; 
function encodeUrl(url)
 {
	var str=url;
	//转义< 至&lt;
	var reg=/\</g;
	str=str.replace(reg,"&lt;");
	//转义>至&gt;
	reg=/\>/g;
	str=str.replace(reg,"&gt;");
	//转义&至&amp;
	reg=/&/g;
	str=str.replace(reg,"&amp;");
	//转义"至&quot;
	reg=/"/g;
	//转义*
	str=str.replace(reg,"&quot;");
	return str;
};
 //对url解码
 this.decodeUrl=function(url)
 {
	var str=url;
	//转义< 至&lt;
	var reg=/&lt;/g;
	str=str.replace(reg,"<");
	//转义>至&gt;
	reg=/&gt;/g;
	str=str.replace(reg,">");
	//转义&至&amp;
	reg=/&amp;/g;
	str=str.replace(reg,"&");
	//转义"至&quot;
	reg=/&quot;/g;
	//转义*
	str=str.replace(reg,'"');
	return str;
 };
 //获取文件名
 function getFileName(file)
 {
 	var indexOfDot=file.lastIndexOf(".");
 	if(indexOfDot!=-1)
 	{
 		return file.substring(0,indexOfDot);
 	}
 	else
 	{
 		return file;
 	}
 };
 //获取文件的后缀
  function getFileExtends(file)
 {
 	var indexOfDot=file.lastIndexOf(".");
 	if(indexOfDot!=-1)
 	{
 		return file.substring(indexOfDot,file.length);
 	}
 	else
 	{
 		return file;
 	}
 };
//获取url后的搜索串
function Request(key,url)
{
	var seachUrl=url||window.location.search.replace("?","");
	var ss=seachUrl.split("&");
	var keyStr="";
	var keyIndex=-1;
	for(var i=0;i<ss.length;i++)
	{
		keyIndex=ss[i].indexOf("=");
		keyStr=ss[i].substring(0,keyIndex);
		if(keyStr==key)
		{
			return ss[i].substring(keyIndex+1,ss[i].length);
		}
	}
	return null;
}
//获取url后的出key以外的所有参赛 返回对象
function RequestEveryOne(keys,url)
{
	var result = {};
	var seachUrl=url||window.location.search.replace("?","");
	var ss=seachUrl.split("&");
	var keyStr="",falg;
	var keyIndex=-1;
	for(var i=0;i<ss.length;i++)
	{   
		falg = false;
		keyIndex=ss[i].indexOf("=");
		keyStr=ss[i].substring(0,keyIndex);
		for(var n=0;n<keys.length;n++){
			if(keyStr==keys[n]){
				falg = true;
				break;
			}
		}
		if(!falg)
			result[keyStr] = ss[i].substring(keyIndex+1,ss[i].length);
	}
	return result;
}
//判断URL是否跨域 true 跨域 false 不跨越
function isCrossDomain(url){
    var regex = getDomain(url);
	return (window.location.host!=regex.server || window.location.port != regex.port);
}
/// <summary>
/// 获取系统时间
/// </summary>
/// <returns>无</returns>
function getSysDate(format,expireYear,expireMonth,expireDay)
{
	var dt=new Date();
	var y,m,d,w;
	var strDate="当前时间：{0}年{1}月{2}日  星期{3}";
	if(format!=undefined){
		strDate=format;
	}
	
	y=dt.getFullYear();
	m=dt.getMonth()+1;
	d=dt.getDate();
	w=dt.getDay();
	h=dt.getHours();
	ms=dt.getMinutes();
	s=dt.getSeconds();
	switch(w)
	{
		case 0:w="日";break;
		case 1:w="一";break;
		case 2:w="二";break;
		case 3:w="三";break;
		case 4:w="四";break;
		case 5:w="五";break;
		case 6:w="六";break;
	}
	if(expireYear!=undefined){ y+=expireYear; }
	if(expireMonth!=undefined){ m+=expireMonth; }
	if(expireDay!=undefined){ d+=expireDay; }
	strDate=strDate.Format(strDate,[y,m,d,w,h,ms,s]);
	return strDate;
};
//获取当前url中的域信息
function getDomain(Url)
{
	var url=Url||window.location.href;
   	var reg=/http:\/\/([^\/:]+)(:[0-9]+)?\/([^\/]+)/gi;
   	reg.test(url);
   	return {server:RegExp.$1,port:RegExp.$2,sitename:RegExp.$3};
};

var Validate = function()
{//是否是合法的url
	this.isUrl = function(str)
	{
		var strRegex="^((https|http|ftp|rtsp|mms)?://)"
	        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
	        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	        + "|" // 允许IP和DOMAIN（域名）
	        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	        + "[a-z]{2,6})" // first level domain- .com or .museum
	        + "(:[0-9]{1,4})?" // 端口- :80
	        + "((/?)|" // a slash isn't required if there is no file name
	        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
		var reg=new RegExp(strRegex);
		return reg.test(str);
	}
	//中否为空,或为空字符
	this.isNull = function(str)
	{
		return (str==null || str==undefined || str=="");
	}
	//数字是否在指定的范围内
	this.isNumber = function(str,minLen,maxLen)
	{
		if(isNaN(parseInt(str))) return false;
		else return true;
		
		if(parseInt(str) >= minLen && parseInt(str)<maxLen) return true;
		else return false;
	}
	//是否在指定的字符范围内
	this.isString = function(str,minLen,maxLen)
	{
		
	}
	//是否含有中文
	this.hasChinese = function(str)
	{
		var reg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		return reg.test(str);
	}
	//是否是复合密三:复合密码包含_/数字/字符
	this.isComplexString = function(str)
	{
		var reg=/[_a-zA-Z0-9]+/gi;
		return reg.test(str);
	};	
	//是否有特殊字符 有字母，数字，中文。无标点符号
	this.hasSpecialString = function(str){
		var reg =/^[a-zA-z0-9\u4E00-\u9FA5]*$/gi;
		return reg.test(str);
	};
}
/**
 * xml操作扩展
 * 
 */
/*
//var xmlUtil=new function(xpath){
//this.selectSingleNode=function(){
//	if (!window.ActiveXObject) 
//{ 
XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) 
{ 
var x = this.selectNodes(xpath) ;
if ( ! x || x.length < 1 ) return null ; 
return x[ 0 ]; 
} ;
XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) 
{ 
var xpe = new XPathEvaluator(); 
var nsResolver = xpe.createNSResolver( this.ownerDocument == null?this.documentElement : this.ownerDocument.documentElement); 
var result = xpe.evaluate(xpath, this , nsResolver, 0 , null ); 
var found = []; 
var res; 
while (res = result.iterateNext()) 
found.push(res); 
return found; 
} ;
//} 
//}
//};
*/
/***********克隆**********/
function clone(obj){
    var result={};
    for(key in obj){
        result[key]=obj[key];
    }
    return result;
}
function selectSingleNodeXml(record, objNode, objvalue) {
	try {
		// IE
		if (isIE()) {
			if (objvalue == "getAttribute") {
				return record.getAttribute(objNode);
			} else {
				return record.selectSingleNode(objNode).text;
			}
		}// 非IE
		else {
  		  var result="";
  		  if(!!record.getElementsByTagName(objNode)[0])
  			  result = record.getElementsByTagName(objNode)[0].firstChild.nodeValue;
  		  else
  			  result = record.childNodes[0].text; 
  			  return result;
		}
	} catch (error) {
		return "";
	}
}
function isIE(){
	var blIE = true;
	try{
		new ActiveXObject("MicroSoft.XMLHTTP");
	}catch(err){
		blIE = false;
	}
	return blIE;
}
//获取指定窗口根目录
function getRootPath_web(win) {
	var win = win||this;
    var curWwwPath = win.document.location.href;
    var pathName = win.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}