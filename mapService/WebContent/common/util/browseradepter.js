/*-----------------------通用浏览器适配器类-------------*/
/*-----------------------版本：V1.0------------------*/
/*-----------------------作者:songxw-----------------*/
///<sumary>
/// 该对象对Dom元素做了很多的扩展，注意如何页面里需要引用pototype.js 则要将当前这个js包先于prototype.js引用
///</sumary>
//浏览器适配器
var _blIsIE = true;
try{
	new ActiveXObject("Microsoft.XMLDOM");
}catch(err){
	_blIsIE = false;
}
BrowserAdepter=new function()
{
    //获取dom对象
    this.getDomDocument=function()
    {
        //IE
        var xmlDom=null;
        if(_blIsIE)
        {
            xmlDom=new ActiveXObject("Microsoft.XMLDOM");
        }
        //非IE
        else
        {
            xmlDom=document.implementation.createDocument("","",null);
        }
        return xmlDom;
    };
    //加载xml到dom
    this.loadXML=function(strXml)
    {
        var domObj=null;
        //IE
        if(_blIsIE)
        {
            domObj=BrowserAdepter.getDomDocument();
            domObj.loadXML(strXml);
        }
        //非IE
        else
        {
            var parser=new DOMParser();
            strXml = strXml.replace(/\r\n\r\n/gi,"");
            domObj=parser.parseFromString(strXml,"text/xml");
        }
        return domObj;
    };
    //加载xml file到dom
    this.load=function(strFile)
    {
        var domObj=null;
        //IE
        if(_blIsIE)
        {
            domObj=BrowserAdepter.getDomDocument();
            domObj.async = false;
            domObj.load(strFile);
        }
        //非IE
        else
        {  
            domObj=document.implementation.createDocument("","",null);
            if(domObj.load){
            	domObj.load(strFile);
            }
            	//针对google浏览器
            else{
            	var http=this.getXMLHttpRequest();
            	http.open("GET",strFile,false);
            	http.send(null);
            	domObj=this.loadXML(http.responseText);
            }
        }
        return domObj;
    };
    //获取Http请求对象
    this.getXMLHttpRequest=function()
    {
        var http=null;
        //适用于IE浏览器
        if(_blIsIE)
        {
        	http=new ActiveXObject("Microsoft.XMLHTTP");
            if(http==null)
            {
                http=new ActiveXObject("MSXML2.XMLHTTP");
            }
        }
        //适用于IE以外的浏览器
        else if(window.XMLHttpRequest)
        {
            http=new XMLHttpRequest();
        }
        return http;
    };
    
    //扩展XmlDocument
    this.extentsXmlDocument=function()
    {
        //非IE上LoadXML扩展
        if(document.implementation && document.implementation.createDocument)
        {
            XMLDocument.prototype.loadXML = function(xmlString)
            {
                var childNodes = this.childNodes;
                for (var i = childNodes.length - 1; i >= 0; i--)
                    this.removeChild(childNodes[i]);

                var dp = new DOMParser();
                var newDOM = dp.parseFromString(xmlString, "text/xml");
                var newElt = this.importNode(newDOM.documentElement, true);
                this.appendChild(newElt);
            };

            //非IE上XPath扩展 ----selectNodes
            if( document.implementation.hasFeature("XPath", "3.0") )
            {
               XMLDocument.prototype.selectNodes = function(cXPathString, xNode)
               {
                  if( !xNode ) { xNode = this; } 
                  var oNSResolver = this.createNSResolver(this.documentElement)
                  var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                  var aResult = [];
                  for( var i = 0; i < aItems.snapshotLength; i++)
                  {
                     aResult[i] =  aItems.snapshotItem(i);
                  }
                  return aResult;
               }

               //扩展xmldom node上selectNodes方法
               Element.prototype.selectNodes = function(cXPathString)
               {
                  if(this.ownerDocument.selectNodes)
                  {
                     return this.ownerDocument.selectNodes(cXPathString, this);
                  }
                  else{throw "For XML Elements Only";}
               }
            }
			 //非IE上XPath扩展 ----selectSingleNode
            if( document.implementation.hasFeature("XPath", "3.0") )
            {
               XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode)
               {
                  if( !xNode ) { xNode = this; } 
                  var xItems = this.selectNodes(cXPathString, xNode);
                  if( xItems.length > 0 )
                  {
                     return xItems[0];
                  }
                  else
                  {
                     return null;
                  }
               }
               //扩展xmldom node上selectSingleNodes方法
               Element.prototype.selectSingleNode = function(cXPathString)
               {
                  if(this.ownerDocument.selectSingleNode)
                  {
                  		try
                  		{
                      		return this.ownerDocument.selectSingleNode(cXPathString, this);
                    	}
                    	catch(ex)
                    	{
                    		return null;
                    	}
                  }
                  else
				  {
				  	  return null;
				  }
               }
               //扩展element上text属性
               window.Element.prototype.__defineGetter__("text",function(){ return this.textContent; });
               window.Element.prototype.__defineGetter__("xml",function(){ return BrowserAdepter.getXml(this); });
            	//扩展element上text属性
               XMLDocument.prototype.__defineGetter__("text",function(){ return BrowserAdepter.getText(this); });
               //扩展element上xml属性
               XMLDocument.prototype.__defineGetter__("xml",function(){ return BrowserAdepter.getXml(this); });
            }
        }
    };
    this.setText=function(oNode,text)
    {
    	//适用于IE浏览器
        if(_blIsIE)
        {
            oNode.innerHTML=text;
        }
        //适用于firefox
        else
        {
        	oNode.textContent=text;
        }
    };
    //对于firefox下的扩展
    this.getText=function(oNode)
    {
    	var sText = ""; 
    	//适用于IE浏览器
        if(_blIsIE)
        {
        	if(oNode){
            	return oNode.text;
            }else{
            	return "";
            }
        }
        //适用于firefox
        else
        {
	     	for (var i = 0; i < oNode.childNodes.length; i++) 
	     	{ 
		        if (oNode.childNodes[i].hasChildNodes()) 
		        { 
		            sText += this.getText(oNode.childNodes[i]); 
		        } 
		        else 
		        { 
		            sText += oNode.childNodes[i].textContent; 
	       		} 
	    	} 
	     	return sText;   
     	}	
    };
     //对于firefox下的扩展
    this.getXml=function(oNode)
    {
		// 兼容IE9,Edited by xiangqin
		if (window.DOMParser) {
			return oNode.xml;
		} else {
		}
    	//适用于IE浏览器
        if(!window.XMLSerializer)
        {
            return oNode.xml;
        }
        else
        {
	     	var oSerializer = new XMLSerializer(); 
	     	try
	     	{
	     	return oSerializer.serializeToString(oNode); 
	     	}
	     	catch(err)
	     	{
	     	 return oNode.xml;
	     	}
	    }
    };
    //对于firefox下的扩展
    this.getFirstChild=function(oNode)
    {
    	//适用于IE浏览器
        if(!window.XMLHttpRequest)
        {
            return oNode.firstChild;
        }
        else
        {
	     	for(var i=0;i<oNode.childNodes.length;i++)
	     	{
	     		if(oNode.childNodes[i].nodeType==1)
	     		{
	     			return oNode.childNodes[i];
	     		}
	     	}
	    }
    };
    //对于firefox下的扩展
    this.getLastChild=function(oNode)
    {
    	//适用于IE浏览器
        if(!window.XMLHttpRequest)
        {
            return oNode.lastChild;
        }
        else
        {
        	var node=null;
	     	for(var i=0;i<oNode.childNodes.length;i++)
	     	{
	     		if(oNode.childNodes[i].nodeType==1)
	     		{
	     			node= oNode.childNodes[i];
	     		}
	     	}
	     	return node;
	    }
    };
    //对于firefox下的扩展
    this.getChildNodes=function(oNode)
    {
    	//适用于IE浏览器
        if(!window.XMLHttpRequest)
        {
            return oNode.childNodes;
        }
        else
        {
        	var nodes=new Array();
	     	for(var i=0;i<oNode.childNodes.length;i++)
	     	{
	     		if(oNode.childNodes[i].nodeType==1)
	     		{
	     			nodes.push(oNode.childNodes[i]);
	     		}
	     	}
	     	return nodes;
	    }
    };
    this.getSingleNode=function(xpath,pNode,domDocument)
    {
    	 //适用于IE浏览器
        if(_blIsIE)
        {
        	return pNode.selectSingleNode(xpath);
        }
        //非IE
        else
        {
        	return domDocument.selectSingleNode(xpath,pNode);
        }
    };
    this.nextNode=function(pNode)
    {
    	 //适用于IE浏览器
        if(_blIsIE)
        {
        	return pNode.nextSibling;
        }
        //非IE
        else
        {
        	return pNode.nextSibling;
        }
    };
    this.getNodes=function(xpath,pNode,domDocument)
    {
    	 //适用于IE浏览器
        if(_blIsIE)
        {
        	return pNode.selectNodes(xpath);
        }
        //非IE
        else
        {
        	return domDocument.selectNodes(xpath,pNode);
        }
    };
    //创建线程安全的Dom对象用于执行xsl转换--需要引用prototype框架
    this.createFreeThreadedDocument=function() {
	    return Try.these(
	        function () {
	            return new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
	        },
	        function () {
	            return new ActiveXObject("Msxml2.FreeThreadedDOMDocument.5.0");
	        },
	        function () {
	            return new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
	        },
	        function () {
	            return new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0");
	        },
	        function () {
	            return new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
	        },
	        //适用于firefox
	        function(){
	        	return BrowserAdepter.getDomDocument();
	        }
	    ) || false;
	};
	//创建线程安全的XSL对象用于执行xsl转换--需要引用prototype框架
	this.createXSLTemplate=function() {
	    return Try.these(
	        function () {return new ActiveXObject("Msxml2.XSLTemplate.6.0");},
	        function () {return new ActiveXObject("Msxml2.XSLTemplate.5.0");},
	        function () {return new ActiveXObject("Msxml2.XSLTemplate.4.0");},
	        function () {return new ActiveXObject("Msxml2.XSLTemplate.3.0");},
	        function () {return new ActiveXObject("Msxml2.XSLTemplate");},
	        //适用于firefox
	        function () { return new XSLTProcessor();  }
	    ) || false;
	};
	//注释by xudajian at 2012-09-10(放在最后边自动执行)
	//this.extentsXmlDocument();
};
//放在最后边，自动运行 by xudajian at 2012-09-10 不是IE再运行
if (!document.all) {
	BrowserAdepter.extentsXmlDocument();
}
var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};
