/*-----------------------通用xsl转换类(静态类)-----------------*/
/*-----------------------版本：V1.0------------------*/
/*-----------------------作者:songxw-----------------*/
///<sumary>
/// xsl转换类--用于适应firefox以及IE各版本
///</sumary>
TransFormUtil=new function()
{
	/// <summary>
	/// 转换过程
	/// </summary>
	///<params name="xml">要转换的xml源</params>
	///<params name="xsl">执行转换的式xsl模板</params>
	///<params name="params">转换参数:json格式</params>
	///<params name="resouceType">数据源类型：0表示xml为string/xsl为string,1表示xml为string/xsl为file,2表示xml为string/xsl为file,3表示xml为file/xsl为file</params>
	/// <returns>执行转换后的html结果</returns>
	this.transForm=function(xml,xsl,params,resouceType)
	{
		//获取浏览器版本信息
	    var browser=getBrowser();
	    var formatHtml="";
		var xmlDom=BrowserAdepter.getDomDocument();
		xmlDom.async = false;
		switch(resouceType)
		{
				//从string中加载数据源
			case 0:
			case 1:
				xmlDom=BrowserAdepter.loadXML(xml);
				break;
				//从file中加载数据源
			case 2:
			case 3:
				xmlDom=BrowserAdepter.load(xml);
				break;
		}
		//必须使用线程安全的Dom对象
		var xslDom =BrowserAdepter.createFreeThreadedDocument();
	    xslDom.async = false;
	    switch(resouceType)
		{
				//从string中加载数据源
			case 0:
			case 2:
				xslDom=BrowserAdepter.loadXML(xsl);
				break;
				//从file中加载数据源
			case 1:
			case 3:
				if(typeof xslDom.load !='undefined'){
					xslDom.load(xsl);
				}
				else{
					xslDom=BrowserAdepter.load(xsl);
				}
				break;
		}
		//if(BrowserAdepter.getXml(xmlDom)=="") return "";
	    var xslTemplate =BrowserAdepter.createXSLTemplate();
		
		//适用于IE
	    if(browser.isIE)
	    {
			xslTemplate.stylesheet =xslDom;
			// 创建XslProcessor对象
			var xslProcessor = xslTemplate.createProcessor();
			xslProcessor.input = xmlDom;
			//转换参数
			if(params!=null && params!=undefined)
			{
				for(var key in params)
				{
					xslProcessor.addParameter(key,eval("params."+key));
				}
			}
			// 执行XSLT转换
			xslProcessor.transform();
	    	formatHtml=xslProcessor.output; 
	   	}
	   	//适用于firefox
	   	else
	   	{
		     xslTemplate.importStylesheet(xslDom); 
		     //转换参数
			if(params!=null && params!=undefined)
			{
				var value="";
				for(var key in params)
				{
					value=eval("params."+key);
					xslTemplate.setParameter(null,key,value);
				}
			}
		     var result = xslTemplate.transformToFragment(xmlDom,document); 
		     var xmls = new XMLSerializer(); 
		     formatHtml=xmls.serializeToString(result); 
	   	}
		formatHtml=formatHtml;
	    xmlDom=null;
	    xslDom=null;
	    xslTemplate=null;
	    return formatHtml.replace("<?xml version=\"1.0\"?>","");
	};
}