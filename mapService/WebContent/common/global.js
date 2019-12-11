/***********page**************/
var config,_page,_mapIndex,initPage=1,thisPage=initPage,pageIndex =1,pageSize=10;
var resultList={};
var urlParam=new Array();
var functionName='';
/************map*************/
//wmts server parameter
var _lastMapCenter;
//wmts参数
var wmtsParams = {
 requesttype:"GET",
 service:"wmts",
 request:"getcapabilities",
 version:"1.0.0"
};
//兴趣fittle点查询参数
var fittleParams = {
		REQUEST:"GETFEATURE",
		VERSION:"1.0.0",
		page: "{0}",
		rp: pageSize,
		filter:"{0}"
};
//兴趣buffer点查询参数
var bufferParams = {
		REQUEST:"GETFEATURE",
		VERSION:"1.0.0",
		page:"{0}",
		rp: pageSize,
		BOUNDS :"{0}"
};
//地名地址匹配参数
var addressMatchParams = {
		address:"{0}",
		top:"{0}"
};
//地名地址逆向匹配参数
var reverseMatchingParams = {
	x:"{0}",
	y:"{0}",
	top:10
};
//地名地址模糊查询参数
var addressListShowCount = 6;
var addressSreach = {
	dicname:"{0}",
	pageindex:"{0}",
    pagesize:pageSize,
    sortfield:"DCPY",
    isasc:true
};
//路径分析
var roadAnalyse={
		points:"{0}",
		weightname:"Length"
};

           
		
