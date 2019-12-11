var map,_selcetedFeature,style,page,vectorLayer,selectH,selectLayerArray=[],themeLayer;
var baseLayers,rightMenuPosition,defaultRound = 1000;
var lonlatTemp;
var _infowin = null,_infoMarker;
var _infowinNotAnchor = null;
var positionMarkers;
/***********初始样式**********/
var styleCenterPoint = {
		strokeColor : "yellow",
		strokeOpacity : 1,
		fillColor : "red",
		fillOpacity : 0.3,
		strokeWidth : 2,
		pointRadius : 5
	};
//周边范围面样式
var styleRound = {
		strokeColor : "#fff",
		strokeWidth : 2,
		fillColor : "#6666ff",
		fillOpacity : 0.2
	};
//半径线
var roundLine = {
		strokeColor : "#FFFF00",
		strokeDashstyle:"dash",
		strokeOpacity : 1,
		fillOpacity : 0.3,
		strokeWidth : 2,
		pointRadius : 6	
};
var defaultStyle = {
		"point" : {
			fillColor: "black",
			strokeColor: "yellow",
			strokeOpacity:1,
			strokeWidth:"6px",
			fontFamily:"微软雅黑",
			fontSize:"12px",
			fontWeight:"bold",
			fontColor:"blue",
			pointRadius:4,
			fillOpacity : 1
			},
		"line" : {
			strokeColor : "blue",
			strokeWidth : 6,
			strokeOpacity : 0.3,
			fontFamily:"微软雅黑",
			fontSize:"12px",
			fontWeight:"bold",
			fontColor:"blue",
			pointerEvents : "visiblePainted",
			fillColor : "red",
			fillOpacity : 0.5
		},
		"surface" :  {
			strokeColor : "#000",
			strokeWidth : 1,
			strokeStyle : "dashed",
			strokeOpacity : 0.9,
			fontFamily:"微软雅黑",
			fontSize:"12px",
			fontWeight:"bold",
			fontColor:"blue",
			pointerEvents : "visiblePainted",
			fillColor : "red",
			fillOpacity : 0.5
		}
	};
var selectStyle = {
		"point" : {
	fillColor: "blue",
	strokeColor: "yellow",
	pointRadius:5,
	fillOpacity : 1
	},
"line" : {
	strokeColor : "blue",
	strokeWidth : 6,
	strokeOpacity : 0.4,
	pointerEvents : "visiblePainted",
	fillColor : "red",
	fillOpacity : 0.5
},
"surface" : {
	strokeColor : "blue",
	strokeWidth : 3,
	pointerEvents : "visiblePainted",
	fillColor : "red",
	fillOpacity : 0.4
}
};
var landLocatStyle={
		strokeColor: "yellow",
		strokeWidth: 5,
		pointerEvents: "visiblePainted",
		fillColor: "yellow",
		fillOpacity: 0
};

var defaultIcon = _baseurl+"images/markers/marker-gold.png",iconTxtBg = _baseurl+"images/heads/bgciew.png";
/**************************/
SGS.App.Index = function(){
	this.drawLine;
	this.oMap = null;
	this.oMapContainer = null;
	this.toolMarkerLayer=null;
	this.defaultMouseMove = function(e){
		page.infowinPosition = e.xy.clone();
		page.infowinPosition.x += 40;
		page.infowinPosition.y -= 25;
		if(page.displayPickupLonLat){
			page.mapPosition = page.util.position(page.oMap.div.parentNode);
			var event = e || window.event;
			var pixcel = new SuperMap.Pixel(event.clientX, event.clientY);
			var lonLatPixcel = new SuperMap.Pixel(event.clientX - page.mapPosition.left+3,
					event.clientY - page.mapPosition.top+3);
			var lonlatTemp = page.oMap.getLonLatFromPixel(pixcel);
			lonlatTemp = page.util.projectionTransformation(lonlatTemp.lon,lonlatTemp.lat,["EPSG:3857","EPSG:4326"]);
			var lonlatTemp2 = page.oMap.getLonLatFromPixel(lonLatPixcel);
			if (page.tempBubble)
				try {
					page.oMap.removePopup(page.tempBubble);
				} catch (e) {
				};
				
			var contentHTML = "<div style='font-family:微软雅黑;font-size:12px;border:1px solid #ccc;padding:3px;'>"
					+ "<div style='line-height:24px;background-color:#DFEBF5;font-size:14px;'><b>坐标</b><span style='display:inline-block;float:right;color:red;margin-right:5px;font-size:12px;'>右键取消</span></div>"
					+ "<span>经度：</span>"
					+ lonlatTemp.x.toFixed(12)
					+ "<br><span>纬度：</span>"
					+ lonlatTemp.y.toFixed(12) + "</div>";
			var psize = new SuperMap.Size(162, 66);
			page.tempBubble = new SuperMap.Popup("popWin", lonlatTemp2,
					psize, contentHTML, null, true, null, true);
			page.oMap.addPopup(page.tempBubble);
		}else{
			if(page.tempBubble){
				page.oMap.removePopup(page.tempBubble);
				page.tempBubble = null;
			}
		}
	};
};
SGS.App.Index.prototype = new SGS.App();
SGS.App.Index.prototype.Initialize = function(mapDIv){
	 var myOptions = { 
			 controls:[
	             new SuperMap.Control.ScaleLine(),
				 new SuperMap.Control.OverviewMap({maximized:false}),
	             new SuperMap.Control.Navigation({
	                 dragPanOptions:{
	                     enableKinetic:true
	                 }
	             })
                 ],
	             eventListeners:{changebaselayer:function(){},contextmenu:function(e){
//	            	 try{showRightMenu(e);}catch(ex){try{parent.showRightMenu(e);;}catch(es){};}
	            	 parent.hidesearchdiv();
	             },click:function(){
	            	 parent.hidesearchdiv();
	            	 try{closeRightMenu();closeInfowinNotAnchor();parent.clickMapCallBack();}catch(e){}
	             },"mousemove" : page.defaultMouseMove}
	         };
	map = new SuperMap.Map(mapDIv,myOptions),baseLayers = [];
	var tempLayers = [];
	/*var zoom =new SuperMap.Control.Zoom();
	map.addControl(zoom, new SuperMap.Pixel(5,65));*/
	map.allOverlays = true;
	var MapConfig = getMapConfig();
	//limitLevel();//限制缩放级别
	  if(config.content.layerList.layers instanceof Array){//初始化多地图图层
		  for(var i=0;i<config.content.layerList.layers.length;i++){
			  var baseLayer = initBaseLayers(config.content.layerList.layers[i]);
			  if(baseLayer){
				  tempLayers.push(baseLayer);
				  if(baseLayer.isBaseLayer)baseLayers.push(baseLayer);
			  }
		  }
	  }else{//初始化单底图图层
		  var baseLayer = initBaseLayers(config.content.layerList.layers);
		  if(baseLayer){
			  tempLayers.push(baseLayer);
			  if(baseLayer.isBaseLayer)baseLayers.push(baseLayer);
		  }
	  }
	//if(tempLayers instanceof Array&&tempLayers.length>0)map.addLayers(tempLayers);
	map.events.register("move",map,function(obj){		
		_lastMapCenter=map.getCenter();
	});	
	//map.events.register("zoomend",map,limitLevel);
	map.measureURL = MapConfig.measureURL||measureURL;
	if(!!MapConfig.maxExtent)map.maxExtent = new SuperMap.Bounds(MapConfig.maxExtent[0],MapConfig.maxExtent[1],MapConfig.maxExtent[2],MapConfig.maxExtent[3]);
	this.oMap = map;
	this.oMapContainer = map.controls;
	this.TrackingLayerStyle = {
			strokeColor : "#8194a5",
			strokeWidth : 2,
			strokeOpacity : 0.8,
			pointerEvents : "visiblePainted",
			fillColor : "#ccc",
			fillOpacity : 0.3,
			strokeDashstyle : "dash"
	};
};
//获得MapConfig
function getMapConfig(){
	var MapConfig;
	 if(!!MapConfigs&&MapConfigs instanceof Array){//存在多地图
		  MapConfig =MapConfigs[_mapIndex-1];
	 }else{//只有一个地图
		 MapConfig = MapConfigs;
	 }
	 return MapConfig;
}
function addLayer(layer){
	try{
		map.addLayer(layer);
		var MapConfig = getMapConfig();
		var center=new SuperMap.LonLat(parseFloat(MapConfig.centerPoint.split(",")[0]),parseFloat(MapConfig.centerPoint.split(",")[1]));
		map.setCenter(center,MapConfig.initLevel||initLevel);
		_lastMapCenter = center;
	}catch(e){};
}
//初始化地图底图
function initBaseLayers(layer){
	var baseLayer=null,result=null,tempOpacity,zIndex;
	try{tempOpacity=parseFloat(layer.opacity)||1;}catch(e){};
	try{zIndex=parseFloat(layer.zIndex)||0;}catch(e){};
	switch(layer.type.toUpperCase()){
	case "REST":
		try{
			baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer(layer.name, 
					layer.url, 
					{
				      transparent:true,
				      isBaseLayer:layer.isBaseLayer
					  },{});
		}catch(e){
			baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer(layer.name, 
					"http://172.16.1.102:8090/iserver/services/map-china400/rest/maps/China", 
					{
				      transparent:true,
				      isBaseLayer:layer.isBaseLayer
					  },{});
		}
		baseLayer.baseLayer = layer.isBaseLayer;
		result =  baseLayer;
		break;
	case "WMTS":
		//新建图层
		baseLayer = new SuperMap.Layer.WMTS({
			baseLayer:layer.isBaseLayer,//支持地图切换功能
			name: layer.name,
			url: layer.url ,
			layer: layer.layer,
			style:layer.style,
			matrixSet: layer.matrixSet,
			format: layer.format,
			resolutions: layer.resolutions,
			matrixIds: layer.matrixIds,
			opacity: 1,
			maxExtent:new SuperMap.Bounds(-180,-90,180,90),
			requestEncoding: layer.requestEncoding,
			isBaseLayer:layer.isBaseLayer
		});
		//图层添加并显示指定级别
		
		result =  baseLayer;
		break;
	}
	baseLayer.setOpacity(tempOpacity);
	baseLayer.setVisibility(layer.visibility);
	baseLayer.events.on({ "layerInitialized": addLayer});
	return result;
}

function limitLevel(){
			var MapConfig = getMapConfig();
			mapLevel = map.getZoom();
			var flag = false;
			if(mapLevel<MapConfig.leverScope[0]){
				mapLevel = MapConfig.leverScope[0];
				flag = true;
			}else if(mapLevel>MapConfig.leverScope[1]){
				mapLevel = MapConfig.leverScope[1];
				flag = true;
			}
			if(flag){
				var _browser=SuperMap.Util.getBrowser();
				if(_browser.name=="msie"){
					map.setCenter(_lastMapCenter, mapLevel);
				}else{
					//此处谷歌必须延迟下才有效果，否则空白
					setTimeout(function(){
						map.setCenter(_lastMapCenter,mapLevel);
					},10);
				}
			}
			for(var s=0;s<MapConfig.layers.length;s++){
				try{
				var tempLayers = map.getLayersBy("name",MapConfig.layers[s].name);
				for(var k=0;k<tempLayers.length;k++){
					var tempLayer = tempLayers[k];
				if(MapConfig.layers[s].startLeave&&MapConfig.layers[s].endLeave){
			      if(mapLevel>=parseInt(MapConfig.layers[s].startLeave)&&mapLevel<parseInt(MapConfig.layers[s].endLeave)){
							 tempLayer.setVisibility(_mapIndex==MapConfig.layers[s].targer);
					}else{
						tempLayer.setVisibility(false);
					}
				}else if(MapConfig.layers[s].endLeave){
					if(mapLevel<parseInt(MapConfig.layers[s].endLeave)){
						tempLayer.setVisibility(_mapIndex==MapConfig.layers[s].targer);
					}else{
						tempLayer.setVisibility(false);
					}
				}else if(MapConfig.layers[s].startLeave){
					if(mapLevel>=parseInt(MapConfig.layers[s].startLeave)){
						tempLayer.setVisibility(_mapIndex==MapConfig.layers[s].targer);
					}else{
						tempLayer.setVisibility(false);
					}
				}
				}
			  }catch(e){}
			 }
}
/**
 * 地图切换
 * @param MapConfig
 */
SGS.App.Index.prototype.SwitchMap = function(MapConfig,index,cBack){
	var baseLayers=[],temp = [];//临时变量数组
	if(!MapConfig){
		if(_mapIndex==index)return;
		_mapIndex = index;
		MapConfig = MapConfigs[_mapIndex-1];
	}
	//去除前一地图地图图层
	for(var n=0;n<this.oMap.layers.length;n++){
		if(this.oMap.layers[n].baseLayer){
			for(var k=0;k<MapConfig.layers.length;k++){
				if(MapConfig.layers[k].name==this.oMap.layers[n].name){
					this.oMap.layers[n].setVisibility(true);
					break;
				}else{
					if(k==MapConfig.layers.length-1){
						this.oMap.layers[n].setVisibility(false);
					}
				}
			}
		}
	}
	if(MapConfig.layers instanceof Array){
		for(var i=0;i<MapConfig.layers.length;i++){
			var baseLayer = MapConfig.layers[i];
			try{
				if(!map.getLayersByName(MapConfig.layers[i].name)[0]){
					baseLayer = initBaseLayers(baseLayer);
					if(baseLayer){
						baseLayer.setVisibility(true);
						map.addLayer(baseLayer);
					}
				}else{
					map.getLayersByName(baseLayer.name)[0].setVisibility(true);
				}
			}catch(e){//未给图层添加name属性
				console.log("地图切换错误！原因："+e);
			}
		}
	}else{
		var baseLayer = null;
		try{
			if(!map.getLayersByName(baseLayer.name)[0]){
				baseLayer = initBaseLayers(MapConfig.layers);
				baseLayer.setVisibility(true);
				map.addLayer(baseLayer);
			}else{
				map.getLayersByName(baseLayer.name)[0].setVisibility(true);
			}
		}catch(e){
			
		}
	}
	if(!!MapConfig.maxExtent)map.maxExtent = new SuperMap.Bounds(MapConfig.maxExtent[0],MapConfig.maxExtent[1],MapConfig.maxExtent[2],MapConfig.maxExtent[3]);
	if(!!cBack)cBack();
};
/**
 * 加载地图切换工具栏
 */
SGS.App.Index.prototype.InitMapSwitchBar = function(keepLayer){
	var oSwitchBar = document.createElement("div");
	oSwitchBar.id = "divmapswitchbar";
	oSwitchBar.style.zIndex=4999;
	if(MapConfigs  instanceof Array){
		for(var i=0;MapConfigs.length>1&&i<MapConfigs.length;i++){
			var mapConfig = MapConfigs[i];
			var divMapButton = document.createElement("div");
			divMapButton.className= "mapButton";
			var imgMap = document.createElement("img");
			imgMap.className ="radian";
			imgMap.id = "map" + mapConfig.icon;
			imgMap.title = !!mapConfig.name? mapConfig.name : mapConfig.layers[0].layer;
			imgMap.src = imgPath + mapConfig.icon + "." + imgType; 
				if(isIE){
					imgMap.setAttribute("onclick","page.SwitchMap(null,"+(i+1)+","+keepLayer+")");
				}else{
					imgMap.click = function(){
							page.SwitchMap(null,i+1,keepLayer);
					};
				}
			divMapButton.appendChild(imgMap);
			oSwitchBar.appendChild(divMapButton);
		}
		document.body.appendChild(oSwitchBar);
	}
};



/**
 * 打印地图，支持ie9及以上，chrome，firefox等. 请注意相关css,js文件是否存在. Parameters: id <String> id
 * 为map div的id
 */
SGS.App.Index.prototype.printMap=function (id) {
	var site = window.location.origin+window.location.pathname;
	var broz = SuperMap.Browser.name;
	if (broz == 'msie' && parseInt(SuperMap.Browser.version) < 9) {
		alert("ie9版本以下部分打印功能不支持");
		return;
	}
	var printWindow = window.open("");
	var strInnerHTML = document.getElementById(id).innerHTML;
	console.log(strInnerHTML);
	/****格式化文本***************
	 * 描述：将查找出文本中特定字符后是否还紧跟另一指定字符，在没有紧跟的位置插入新的字符，完成文本的格式化
	 * @text 所要格式化的文本文字
	 * @Qstr 匹配内容字符
	 * @Nstr 匹配文本后头不得包含的字符
	 * @Rstr 在符合条件的位置插入的字符
	 */
	var forMatText = function(text,Qstr,Nstr,Rstr){
		if(!text || typeof text !="string")return;
		var result = "";
		var txtArray = text.Trim().split(Qstr);
		if(txtArray instanceof Array&&txtArray.length>0){
			for(var i=0;i<txtArray.length;i++){
				//debugger;
				if(i!=0){
					var tis = txtArray[i].indexOf(Nstr);
					if(tis!=0){txtArray[i] = " "+Rstr+txtArray[i];}
				}
				result += txtArray[i];
			}
		}else{
			console.log("没有找到你所需要匹配的字符，格式后结果将不会发生变化...");
			result = text;
		}
		return result;
	}
	
	//strInnerHTML = forMatText(strInnerHTML,'src="',"http://",'src="'+site);
	//strInnerHTML = forMatText(strInnerHTML,'href="',"http://",'href="'+site);
	var pathRoot = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl;
	var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
	var strCSS = "<link href='"+pathRoot+"../theme/default/style.css' rel='stylesheet'><link href='"+pathRoot+"../theme/default/sm-doc.css' rel='stylesheet' />";
	var style = '<style type="text/css">'+
					'.easyui-draggable{display:none;}'+
					'.superD{height:40px;}'+
				'</style>';
	var strScript = "<script src='"+pathRoot+"jquery.js'><\/script><script type = 'text/javascript'>"+
			"\n"+
			" $(document).ready(function(){" +
			"var _width=opener.$('#divmap').width();"+
			"var _height=opener.$('#divmap').height();"+
			"$('.print-header').css({width:_width+'px'});"+
			"$('.print-header').css({height:_height+'px'});"+
			"$('#"+id+"').css({height:_height+'px'});"+
			"});"+
			 "function printDiv(){$('.superD').css({'display':'none'});$('.smControlOverviewMap').css({'display':'none'});$('.smControlPanZoomBar').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}" +
					"<\/script>";
	var strBody = "</head>" +
			"<body style='overflow:hidden;'>" +
				"<div class='superD'>" +
					"<h3>地图</h3>" +
					"<div id='superf'><div class='printClose'><span class='newuiPrint' onclick = 'printDiv()'></span></div></div>"+
				"</div>" +
				"<div class='print-header'>" +
					"<div id='"+id+"'>"
						+ strInnerHTML+
					"</div>" +
				"</div>" +
			"</body></html>";
	var strHTML = strHeader + strCSS + style + strScript + strBody;
	printWindow.document.write(strHTML);
	printWindow.document.close();
	//初始化打印预览区域
	var pasteCanvas = function(sCanvas,dCanvas){
		var w=sCanvas.width,
		h=sCanvas.height;
		dCanvas.width=w;
		dCanvas.height=h;
		var viewerImageSrc=sCanvas.toDataURL("image/png");
		var viewerImage=new Image();
		viewerImage.src=viewerImageSrc;
		viewerImage.crossOrigin = "Anonymous" ;
		var dContext=dCanvas.getContext("2d");
		dContext.drawImage(viewerImage,0,0,w,h);
		}
	//载入html
	var onloadHTML = function(){
		var strDOM = printWindow.document.getElementById(id).children[0].children;
		for ( var i = 0, length = strDOM.length; i < length; i++) {
			var idStr = strDOM[i].id;
			if (idStr.indexOf("SuperMap.Control.ScaleLine") == -1
					&& idStr.indexOf("SuperMap.Map") == -1) {
				strCss = strDOM[i].style.cssText;
				strCss = strCss + "display: none;";
				strDOM[i].style.cssText = strCss;
			}
		}
		var canvasPrint = printWindow.document.getElementsByTagName("canvas");
		var canvasMap = document.getElementsByTagName("canvas");
		for ( var i = 0, length = canvasPrint.length; i < length; i++) {
			pasteCanvas(canvasMap[i], canvasPrint[i]);
		}
	}
	if (broz == 'firefox') {
		printWindow.onload = onloadHTML;
	} else if (broz == 'safari' || broz == 'chrome' || broz == 'msie') {
		window.setTimeout(onloadHTML, 50);
	}
}


/**
 * 打印地图，支持ie9及以上，chrome，firefox等. 请注意相关css,js文件是否存在. Parameters: id <String> id
 * 为map div的id
 */
SGS.App.Index.prototype.printMapNew=function (id) {
	var site = window.location.origin+window.location.pathname;
	var broz = SuperMap.Browser.name;
	if (broz == 'msie' && parseInt(SuperMap.Browser.version) < 9) {
		alert("ie9版本以下部分打印功能不支持");
		return;
	}
	var _printPasteCanvas = function(sCanvas, dCanvas) {
		var w = sCanvas.width, h = sCanvas.height;
		dCanvas.width = w;
		dCanvas.height = h;
		var viewerImageSrc = sCanvas.toDataURL("image/png");
		var viewerImage = new Image();
		viewerImage.src = viewerImageSrc;
		viewerImage.crossOrigin = "Anonymous";
		var dContext = dCanvas.getContext("2d");
		dContext.drawImage(viewerImage, 0, 0, w, h);
	};
	var printWindow = window.open("");
	var strInnerHTML = document.getElementById(id).innerHTML;
	console.log(strInnerHTML);
	/****格式化文本***************
	 * 描述：将查找出文本中特定字符后是否还紧跟另一指定字符，在没有紧跟的位置插入新的字符，完成文本的格式化
	 * @text 所要格式化的文本文字
	 * @Qstr 匹配内容字符
	 * @Nstr 匹配文本后头不得包含的字符
	 * @Rstr 在符合条件的位置插入的字符
	 */
	var forMatText = function(text,Qstr,Nstr,Rstr){
		if(!text || typeof text !="string")return;
		var result = "";
		var txtArray = text.Trim().split(Qstr);
		if(txtArray instanceof Array&&txtArray.length>0){
			for(var i=0;i<txtArray.length;i++){
				//debugger;
				if(i!=0){
					var tis = txtArray[i].indexOf(Nstr);
					if(tis!=0){txtArray[i] = " "+Rstr+txtArray[i];}
				}
				result += txtArray[i];
			}
		}else{
			console.log("没有找到你所需要匹配的字符，格式后结果将不会发生变化...");
			result = text;
		}
		return result;
	}
	
	//strInnerHTML = forMatText(strInnerHTML,'src="',"http://",'src="'+site);
	//strInnerHTML = forMatText(strInnerHTML,'href="',"http://",'href="'+site);
	var pathRoot = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl;
	var pathBase = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname;
	var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
	var strCSS = "<link href='"+pathRoot+"../theme/default/style.css' rel='stylesheet'><link href='"+pathRoot+"../theme/default/sm-doc.css' rel='stylesheet' />"
				+ '<link rel="stylesheet" href="'+pathBase+'lib/plug-in/font-awesome-4.4.0/css/font-awesome.min.css"/>';
	var style = '<style type="text/css">'+
					'.easyui-draggable{display:none;}'+
					'.superD{height:40px;}'+
				'</style>';
	var strScript = "<script src='"+pathRoot+"jquery.js'><\/script>"
				 /* + '<script type="text/javascript" src="'+pathBase+'global.jsp"></script>'
				  + '<script type="text/javascript" src="'+pathBase+'common/global.js"></script>'
				  + '<script type="text/javascript" src="'+pathBase+'lib/supermap/2D/v7.1/libs/SuperMap.Include.js"></script>'
				  + '<script type="text/javascript" src="'+pathBase+'common/include.js"></script> '*/
				  + '<script type = "text/javascript">'
			+ "\n"+
			" $(document).ready(function(){" +
			"var _width=opener.$('#divmap').width();"+
			"var _height=opener.$('#divmap').height();"+
			"$('.print-header').css({width:_width+'px'});"+
			"$('.print-header').css({height:_height+'px'});"+
			"$('#"+id+"').css({height:_height+'px'});"+
			"});"+
			 "function printDiv(){$('.superD').css({'display':'none'});$('.smControlOverviewMap').css({'display':'none'});$('.smControlPanZoomBar').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}" +
					"<\/script>";
	var strBody = "</head>" +
			"<body style='overflow:hidden;'>" +
				"<div class='superD'>" +
					"<h3>地图</h3>" +
					"<div id='superf'><div class='printClose'><span class='newuiPrint' onclick = 'printDiv()'></span></div></div>"+
				"</div>" +
				"<div class='print-header'>" +
					"<div id='"+id+"'>"
						+ strInnerHTML+
					"</div>" +
				"</div>" +
			"</body></html>";
	var strHTML = strHeader + strCSS + style + strScript + strBody;
	printWindow.document.write(strHTML);
	printWindow.document.close();
	//初始化打印预览区域
	var pasteCanvas = function(sCanvas,dCanvas){
		var w=sCanvas.width,
		h=sCanvas.height;
		dCanvas.width=w;
		dCanvas.height=h;
		var viewerImageSrc=sCanvas.toDataURL("image/png");
		var viewerImage=new Image();
		viewerImage.src=viewerImageSrc;
		viewerImage.crossOrigin = "Anonymous" ;
		var dContext=dCanvas.getContext("2d");
		dContext.drawImage(viewerImage,0,0,w,h);
		}
	//载入html
	var onloadHTML = function(){
		var strDOM = printWindow.document.getElementById(id).children[0].children;
		for ( var i = 0, length = strDOM.length; i < length; i++) {
			var idStr = strDOM[i].id;
			if (idStr.indexOf("SuperMap.Control.ScaleLine") == -1
					&& idStr.indexOf("SuperMap.Map") == -1) {
				strCss = strDOM[i].style.cssText;
				strCss = strCss + "display: none;";
				strDOM[i].style.cssText = strCss;
			}
		}
		var canvasPrint = printWindow.document.getElementsByTagName("canvas");
		var canvasMap = document.getElementsByTagName("canvas");
		for ( var i = 0, length = canvasPrint.length; i < length; i++) {
			_printPasteCanvas(canvasMap[i], canvasPrint[i]);
		}
	}
	if (broz == 'firefox') {
		printWindow.onload = onloadHTML;
	} else if (broz == 'safari' || broz == 'chrome' || broz == 'msie') {
		window.setTimeout(onloadHTML, 50);
	}
}
SGS.App.Index.prototype.projectionTransformation = function(x,y,transformArag){
	if(!x||!y||!transformArag)return {x:x,y:y};
	var lonlat = new SuperMap.LonLat(parseFloat(x),parseFloat(y));
	
	if(transformArag.length==2){
		
		try{
			lonlat.transform(transformArag[0],transformArag[1]);
		}catch(e){};
	}else if(typeof transformArag =="string"){
		
		try{
			lonlat.transform(this.map.projection,transformArag);	
		}catch(e){};
	}
	return {x:lonlat.lon,y:lonlat.lat};
}
/**
 * 清除专题图层的marker
 * @param marker
 */
SGS.App.Index.prototype.clearThemeLayerMarker = function(marker){
	//console.log(marker);
	if(page.themeLayer){
		page.themeLayer.removeMarker(marker);
		
	}
	
}
/**
 * 清除专题图层的marker
 * @param marker
 */
SGS.App.Index.prototype.clearMarkerLayerMarkers = function(){
	//console.log(marker);
	if(page.markerLayer){
		page.markerLayer.clearMarkers();
		
	}
	
}
/**
 * 清除专题图层的marker
 * @param marker
 */
SGS.App.Index.prototype.clearThemeLayerMarkers = function(){
	//console.log(marker);
	if(page.themeLayer){
		
		page.themeLayer.clearMarkers();
		
	}
	
}
/**
 * 设置地图中心点和缩放级别
 * @param x
 * @param y
 * @param level
 */
SGS.App.Index.prototype.setMapCenterAndLevel = function (x,y,level){
	page.oMap.setCenter(new SuperMap.LonLat(x,y),level);
	//page.oMap.zoomTo(level);
}
/**
 * 放大地图
 */
SGS.App.Index.prototype.zoomIn = function (){
	page.oMap.zoomIn();
	//page.oMap.zoomTo(level);
}
/**
 * 放大地图
 */
SGS.App.Index.prototype.zoomOut = function (){
	page.oMap.zoomOut();
	//page.oMap.zoomTo(level);
}


/**
 * 扩展的添加矢量效果markers函数专题
 * 
 **/
SGS.App.Index.prototype.addVectorMarkersTheme = function(x,y,options,attrs,events){
	x = parseFloat(x);
	y=parseFloat(y);
	if(!x||!y)return;
	options = options||{style:markerStyle.defaultStyle.city[0].style(this.areaType)};
	attrs = attrs||{};
	options.label = options.label||"";
	events = events||{};
	var _blank = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl + "../theme/images/blank.png";
	var size = new SuperMap.Size(0, 0);
	var offset = new SuperMap.Pixel(-(size.w / 2)-5, -size.h-6);
	var icon = new SuperMap.Icon(_blank, size, offset);
	var lonlat = new SuperMap.LonLat(x, y);
	var marker = new SuperMap.Marker(lonlat,icon);
	marker.attr = attrs;
	marker.type = "vectormarker";
	marker.icon.imageDiv.className = "iconImageDiv";
	var div = document.createElement("div");
	div.id = marker.icon.imageDiv.id+"_div";
	div.className = options["class"]||" fa";
	div.defaultStyle = options.style;
	div.eventList = events;
	div.marker = marker;
	for(var i in options.style){
		if(i=="legend"){div.innerHTML =options.style[i];}
		div.style[i] = options.style[i];
	}
 	marker.icon.imageDiv.appendChild(div);
 	if(options.label){
		var div2 = document.createElement("span");
		div2.className = " fa";
		div2.id = marker.icon.imageDiv.id+"MarkerLabe";
		div2.style.fontSize = "12px";
		div2.style.display = "block !important";
		div2.style.border = "1px solid #ccc";
		div2.style.borderRadius = "2px";
		div2.style.backgroundColor = "rgb(118, 169, 210)";
		div2.style.color = "#fff";
		div2.style.position = "relative";
		div2.style.width = options.label.length*parseFloat((div2.style.fontSize||12))+"px";
		div2.style.padding = "0px 2px";
		div2.style.top = "-"+((parseFloat(options.style.height.replace("px",""))||12)+22)+"px";
		div2.style.left = "-"+((parseFloat(div2.style.width)||12)/2)+"px";
		div2.innerHTML = options.label;
		marker.icon.imageDiv.appendChild(div2);
	};
	if(!page.themeLayer){
		page.themeLayer = new SuperMap.Layer.Markers("userMarkers");
		page.themeLayer.id = "userThemeMarkerLayer";
		page.oMap.addLayer(page.themeLayer);
	}
	if(events){
		if(typeof(events)=="object"){
			events.scope = marker;
			marker.events.on(events);
		}
	}
 	page.themeLayer.addMarker(marker);
 	
 	//if(typeof options.callback == "function")options.callback(attrs);
		return marker;
};




/**
 * 扩展的添加矢量效果markers函数
 * 
 **/
SGS.App.Index.prototype.addVectorMarkers = function(x,y,options,attrs,events){
	x = parseFloat(x);
	y=parseFloat(y);
	if(!x||!y)return;
	options = options||{style:markerStyle.defaultStyle.city[0].style(this.areaType)};
	attrs = attrs||{};
	options.label = options.label||"";
	events = events||{};
	var _blank = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl + "../theme/images/blank.png";
	var size = new SuperMap.Size(0, 0);
	var offset = new SuperMap.Pixel(-(size.w / 2)-5, -size.h-6);
	var icon = new SuperMap.Icon(_blank, size, offset);
	var lonlat = new SuperMap.LonLat(x, y);
	var marker = new SuperMap.Marker(lonlat,icon);
	marker.attr = attrs;
	marker.type = "vectormarker";
	marker.icon.imageDiv.className = "iconImageDiv";
	var div = document.createElement("div");
	div.id = marker.icon.imageDiv.id+"_div";
	div.className = options["class"]||"vector_marker fa";
	div.defaultStyle = options.style;
	div.eventList = events;
	div.marker = marker;
	for(var i in options.style){
		if(i=="legend"){div.innerHTML =options.style[i];}
		div.style[i] = options.style[i];
	}
 	marker.icon.imageDiv.appendChild(div);
 	if(options.label){
		var div2 = document.createElement("span");
		div2.className = "vectorMarkerLabel fa";
		div2.id = marker.icon.imageDiv.id+"MarkerLabe";
		div2.style.fontSize = "12px";
		div2.style.display = "block";
		div2.style.border = "1px solid #ccc";
		div2.style.borderRadius = "2px";
		div2.style.backgroundColor = "rgb(118, 169, 210)";
		div2.style.color = "#fff";
		div2.style.position = "relative";
		div2.style.width = options.label.length*parseFloat((div2.style.fontSize||12))+"px";
		div2.style.padding = "0px 2px";
		div2.style.top = "-28px";
		div2.style.left = "-"+((parseFloat(div2.style.width)||12)/2)+"px";
		div2.innerHTML = options.label;
		marker.icon.imageDiv.appendChild(div2);
	};
	if(!page.markerLayer){
		page.markerLayer = new SuperMap.Layer.Markers("userMarkers");
		page.searchmarkerLayer = new SuperMap.Layer.Markers("searchuserMarkers");
		page.markerLayer.id = "userMarkerLayer";
		page.searchmarkerLayer.id = "searchuserMarkers";
		page.oMap.addLayer(page.markerLayer);
		page.oMap.addLayer(page.searchmarkerLayer);
	}
	if(events){
		if(typeof(events)=="object"){
			events.scope = marker;
			marker.events.on(events);
		}
	}
 	page.markerLayer.addMarker(marker);
 	if(options.hoverStyle&&typeof options.hoverStyle=="object"){
 		div.hoverStyle = options.hoverStyle;
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseover",function(){
 			if(this.eventList.mouseover&&typeof this.eventList.mouseover=="function")this.eventList.mouseover(this.marker);
 			if(this.selected)return;
 				var styles = this.hoverStyle;
 				for(var i in styles){
 					div.style[i] = styles[i];
 				}
 			},true);	
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseout",function(){
 			if(this.eventList.mouseout&&typeof this.eventList.mouseout=="function")this.eventList.mouseout(this.marker);
 			if(this.selected)return;
 			var styles = this.defaultStyle;
 			div.style = {};
				for(var i in styles){
					div.style[i] = styles[i];
				}
 		},true);
		};
		if(options.clickStyle&&typeof options.clickStyle=="object"){
			div.clickStyle = options.clickStyle;
			this.util.addEvent.addHandler(document.getElementById(div.id),"click",function(){
				if(this.eventList.click&&typeof this.eventList.click=="function")this.eventList.click(this.marker);
				   $("."+div.className).attr("selected",false).each(function(){
					   var styles = this.defaultStyle;
			 			this.style = {};
							for(var i in styles){
								this.style[i] = styles[i];
							}
				   });
				   page.oMap.div.onmousedown = function(e) {
					e = e || window.event;
					if (e.button == "2") {
						page.oMap.removeAllPopup();
					}
				};
						var styles = this.clickStyle;
					this.selected = true;
					for(var i in styles){
						div.style[i] = styles[i];
					};
				},true);
		}
		if(typeof options.callback == "function")options.callback(attrs);
		return marker;
};
/**
 * 扩展的添加矢量效果markers函数,marker信息不隐藏
 * 
 **/
SGS.App.Index.prototype.addVectorMarkersNew = function(x,y,options,attrs,events){
	x = parseFloat(x);
	y=parseFloat(y);
	if(!x||!y)return;
	options = options||{style:markerStyle.defaultStyle.city[0].style(this.areaType)};
	attrs = attrs||{};
	options.label = options.label||"";
	events = events||{};
	var _blank = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl + "../theme/images/blank.png";
	var size = new SuperMap.Size(0, 0);
	var offset = new SuperMap.Pixel(-(size.w / 2)-5, -size.h-6);
	var icon = new SuperMap.Icon(_blank, size, offset);
	var lonlat = new SuperMap.LonLat(x, y);
	var marker = new SuperMap.Marker(lonlat,icon);
	marker.attr = attrs;
	marker.type = "";
	marker.icon.imageDiv.className = "iconImageDiv";
	var div = document.createElement("div");
	div.id = marker.icon.imageDiv.id+"_div";
	div.className = options["class"]||"vector_marker fa";
	div.defaultStyle = options.style;
	div.eventList = events;
	div.marker = marker;
	for(var i in options.style){
		if(i=="legend"){div.innerHTML =options.style[i];}
		div.style[i] = options.style[i];
	}
 	marker.icon.imageDiv.appendChild(div);
 	if(options.label){
		var div2 = document.createElement("span");
		div2.className = " fa";
		div2.id = marker.icon.imageDiv.id+"MarkerLabe";
		div2.style.fontSize = "12px";
		div2.style.display = "block";
		div2.style.border = "1px solid #ccc";
		div2.style.borderRadius = "2px";
		div2.style.backgroundColor = "rgb(118, 169, 210)";
		div2.style.color = "#fff";
		div2.style.position = "relative";
		div2.style.width = options.label.length*parseFloat((div2.style.fontSize||12))+"px";
		div2.style.padding = "0px 2px";
		div2.style.top = "-28px";
		div2.style.left = "-"+((parseFloat(div2.style.width)||12)/2)+"px";
		div2.innerHTML = options.label;
		marker.icon.imageDiv.appendChild(div2);
	};
	if(!page.markerLayer){
		page.markerLayer = new SuperMap.Layer.Markers("userMarkers");
		page.searchmarkerLayer = new SuperMap.Layer.Markers("searchuserMarkers");
		page.markerLayer.id = "userMarkerLayer";
		page.searchmarkerLayer.id = "searchuserMarkers";
		page.oMap.addLayer(page.markerLayer);
		page.oMap.addLayer(page.searchmarkerLayer);
	}
	if(events){
		if(typeof(events)=="object"){
			events.scope = marker;
			marker.events.on(events);
		}
	}
 	page.markerLayer.addMarker(marker);
 	if(options.hoverStyle&&typeof options.hoverStyle=="object"){
 		div.hoverStyle = options.hoverStyle;
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseover",function(){
 			if(this.eventList.mouseover&&typeof this.eventList.mouseover=="function")this.eventList.mouseover(this.marker);
 			if(this.selected)return;
 				var styles = this.hoverStyle;
 				for(var i in styles){
 					div.style[i] = styles[i];
 				}
 			},true);	
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseout",function(){
 			if(this.eventList.mouseout&&typeof this.eventList.mouseout=="function")this.eventList.mouseout(this.marker);
 			if(this.selected)return;
 			var styles = this.defaultStyle;
 			div.style = {};
				for(var i in styles){
					div.style[i] = styles[i];
				}
 		},true);
		};
		if(options.clickStyle&&typeof options.clickStyle=="object"){
			div.clickStyle = options.clickStyle;
			this.util.addEvent.addHandler(document.getElementById(div.id),"click",function(){
				if(this.eventList.click&&typeof this.eventList.click=="function")this.eventList.click(this.marker);
				   $("."+div.className).attr("selected",false).each(function(){
					   var styles = this.defaultStyle;
			 			this.style = {};
							for(var i in styles){
								this.style[i] = styles[i];
							}
				   });
				   page.oMap.div.onmousedown = function(e) {
					e = e || window.event;
					if (e.button == "2") {
						page.oMap.removeAllPopup();
					}
				};
						var styles = this.clickStyle;
					this.selected = true;
					for(var i in styles){
						div.style[i] = styles[i];
					};
				},true);
		}
		if(typeof options.callback == "function")options.callback(attrs);
		return marker;
};
SGS.App.Index.prototype.addVectorMarkers2 = function(x,y,options,attrs,events){
	x = parseFloat(x);
	y=parseFloat(y);
	if(!x||!y)return;
	options = options||{style:markerStyle.defaultStyle.city[0].style(this.areaType)};
	attrs = attrs||{};
	options.label = options.label||"";
	events = events||{};
	var _blank = window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl + "../theme/images/city2.gif";
	var size = new SuperMap.Size(30, 30);
	var offset = new SuperMap.Pixel(-(size.w / 2)-5, -size.h-6+30);
	var icon = new SuperMap.Icon(_blank, size, offset);
	var lonlat = new SuperMap.LonLat(x, y);
	var marker = new SuperMap.Marker(lonlat,icon);
	marker.attr = attrs;
	marker.type = "vectormarker";
	marker.icon.imageDiv.className = "iconImageDiv";
	var div = document.createElement("div");
	div.id = marker.icon.imageDiv.id+"_div";
	//div.className = options["class"]||"vector_marker fa";
	div.defaultStyle = options.style;
	div.eventList = events;
	div.marker = marker;
	for(var i in options.style){
		if(i=="legend"){div.innerHTML =options.style[i];}
		div.style[i] = options.style[i];
	}
 	marker.icon.imageDiv.appendChild(div);
 	if(options.label){
		var div2 = document.createElement("span");
		//div2.className = "vectorMarkerLabel fa";
		div2.id = marker.icon.imageDiv.id+"MarkerLabe";
		div2.style.fontSize = "12px";
		div2.style.display = "block";
		div2.style.border = "1px solid #ccc";
		div2.style.borderRadius = "2px";
		div2.style.backgroundColor = "rgb(118, 169, 210)";
		div2.style.color = "#fff";
		div2.style.position = "relative";
		div2.style.width = options.label.length*parseFloat((div2.style.fontSize||12))+"px";
		div2.style.padding = "0px 2px";
		div2.style.top = "-28px";
		div2.style.left = "-"+((parseFloat(div2.style.width)||12)/2)+"px";
		div2.innerHTML = options.label;
		marker.icon.imageDiv.appendChild(div2);
	};
	if(!page.markerLayer){
		page.markerLayer = new SuperMap.Layer.Markers("userMarkers");
		page.markerLayer.id = "userMarkerLayer";
		page.oMap.addLayer(page.markerLayer);
	}
	if(events){
		if(typeof(events)=="object"){
			events.scope = marker;
			marker.events.on(events);
		}
	}
 	page.searchmarkerLayer.addMarker(marker);
 	if(options.hoverStyle&&typeof options.hoverStyle=="object"){
 		div.hoverStyle = options.hoverStyle;
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseover",function(){
 			if(this.eventList.mouseover&&typeof this.eventList.mouseover=="function")this.eventList.mouseover(this.marker);
 			if(this.selected)return;
 				var styles = this.hoverStyle;
 				for(var i in styles){
 					div.style[i] = styles[i];
 				}
 			},true);	
 		this.util.addEvent.addHandler(document.getElementById(div.id),"mouseout",function(){
 			if(this.eventList.mouseout&&typeof this.eventList.mouseout=="function")this.eventList.mouseout(this.marker);
 			if(this.selected)return;
 			var styles = this.defaultStyle;
 			div.style = {};
				for(var i in styles){
					div.style[i] = styles[i];
				}
 		},true);
		};
		if(options.clickStyle&&typeof options.clickStyle=="object"){
			div.clickStyle = options.clickStyle;
			this.util.addEvent.addHandler(document.getElementById(div.id),"click",function(){
				if(this.eventList.click&&typeof this.eventList.click=="function")this.eventList.click(this.marker);
				   $("."+div.className).attr("selected",false).each(function(){
					   var styles = this.defaultStyle;
			 			this.style = {};
							for(var i in styles){
								this.style[i] = styles[i];
							}
				   });
				   page.oMap.div.onmousedown = function(e) {
					e = e || window.event;
					if (e.button == "2") {
						page.oMap.removeAllPopup();
					}
				};
						var styles = this.clickStyle;
					this.selected = true;
					for(var i in styles){
						div.style[i] = styles[i];
					};
				},true);
		}
		if(typeof options.callback == "function")options.callback(attrs);
		return marker;
};
/**
 * 清除自定义标签的标签名称
 * @filter object{key:value,key1:value1} 过滤条件 过滤要求，markerlayer必须有attr属性，filter会从中匹配项 多个key是或者关系
 * @layer markerLayer 目标marker图层 可以不写，默认page.markerlayer
 */
SGS.App.Index.prototype.clearVectorMarkerLabel = function(filter,labelOptions,layer){
	layer = layer||this.markerlayer;
	filter = filter||{};
	labelOptions = labelOptions||{};
	labelOptions.className = labelOptions.className||"vectorMarkerLabel";
	if(!layer)return;
	if(layer.id.indexOf("SuperMap.Layer.Markers")==-1){console.error("layer必须是SuperMap.Layer.Markers类型...");return;};
	if(!layer.markers.length)return;
	var removeElementByClass = function(parentElement,className){
		var nodes = parentElement.childNodes;
		for(var k=0;k<nodes.length;k++){
	          if(nodes[k].className == className){
	        	  parentElement.removeChild(nodes[k]);
	          }
		}
	};
	for(var i=0;i<layer.markers.length;i++){
		if(!layer.markers[i].attr)continue;
		var labelDiv = layer.markers[i].icon.imageDiv;
		if(filter == {}){
			for(var s in filter){
				if(layer.markers[i].attr[s] == filter[s]){
					removeElementByClass(labelDiv,"vectorMarkerLabel");
				};
			};
		}else{
			removeElementByClass(labelDiv,"vectorMarkerLabel");
		}
	};
};
/**
 * 显示自定义标签的标签名称
 * @filter object{key:value,key1:value1} 过滤条件 过滤要求，markerlayer必须有attr属性，filter会从中匹配项 多个key是或者关系
 * @labelOptions  label选项 className，定义layerDiv的className属性，field 指定显示属性名（默认NAME)
 * @layer markerLayer 目标marker图层 可以不写，默认page.markerlayer
 */
SGS.App.Index.prototype.showVectorMarkerLabel = function(filter,labelOptions,layer){
	layer = layer||this.markerlayer;
	filter = filter||{};
	labelOptions = labelOptions||{};
	labelOptions.className = labelOptions.className||"vectorMarkerLabel";
	labelOptions.field = labelOptions.field||"NAME";
	if(!layer)return;
	if(layer.id.indexOf("SuperMap.Layer.Markers")==-1){console.error("layer必须是SuperMap.Layer.Markers类型...");return;};
	if(!layer.markers.length)return;
	var createOrUpdateText = function(parentElement,className,text){
		text = text ||"";
		var nodes = parentElement.childNodes;
		var flag = false;var labelDiv=null;
		for(var k=0;k<nodes.length;k++){
	          if(nodes[k].className == className){
	        	  flag = true;
	        	  labelDiv = nodes[k];
	        	  break;
	          }
		}
		if(flag){
			labelDiv.style.display = "block";
			labelDiv.style.width = text.length*12+"px";
			labelDiv.style.left = "-"+text.length*12/2;
			labelDiv.innerText = text;
		}else if(text){
				var div2 = document.createElement("div");
				div2.className = "vectorMarkerLabel";
				div2.name = "MarkerLabe";
				div2.style.width = text.length*12+"px";
				div2.style.left = "-"+text.length*12/2;
				div2.innerText = text;
				parentElement.appendChild(div2);
		}
	};
	for(var i=0;i<layer.markers.length;i++){
		if(!layer.markers[i].attr)continue;
		var labelDiv = layer.markers[i].icon.imageDiv;
		if(filter == {}){
			for(var s in filter){
				if(layer.markers[i].attr[s] == filter[s]){
					createOrUpdateText(labelDiv,"vectorMarkerLabel",layer.markers[i].attr[labelOptions.field]);
				};
			};
		}else{
			createOrUpdateText(labelDiv,"vectorMarkerLabel",layer.markers[i].attr[labelOptions.field]);
		};
	};
};















/****隐藏地图切换工具********/
SGS.App.Index.prototype.hideMapSwitchBar = function(){
	try{document.getElementById("divmapswitchbar").style.display = "none";}catch(e){};
};
var zb = null;
var panel = null;
/**
 * 缩小
 */
SGS.App.Index.prototype.ZoomIn = function(){
	this.Pan();
    zb = new SuperMap.Control.ZoomBox(
                    {
                        out: true
                    });
    panel = new SuperMap.Control.Panel({ defaultControl: zb });
    panel.addControls([
                zb
            ]);
    this.oMap.addControl(panel); 
    this.oMap.div.style.cursor = "url("+window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/cursors/zoom_out.png), default";
};
/**
 * 放大
 */
SGS.App.Index.prototype.ZoomOut = function(){
	this.Pan();
    zb = new SuperMap.Control.ZoomBox(
                    {
                        out: false
                    });
    panel = new SuperMap.Control.Panel({ defaultControl: zb });
    panel.addControls([
                zb
            ]);
    this.oMap.addControl(panel);
    this.oMap.div.style.cursor = "url("+window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/cursors/zoom.png), default";
};
//平移地图
SGS.App.Index.prototype.Pan = function(){
	this.displayPickupLonLat = false;
	this.stopDraw();
    this.ClearZb();
	this.ClearMeasureP();
	this.ClearMeasureL();
	this.oMap.div.style.cursor = "url("+window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/cursors/Pan.cur), default";
};
SGS.App.Index.prototype.panTo = function(x,y){
	if(!x||!y)return;
	if(isNaN(x)||isNaN(y))return;
	var lonlat = new SuperMap.LonLat(x,y);
	this.oMap.panTo(lonlat);
};
//移到指定图层指定中心点
SGS.App.Index.prototype.PanTo = function(center,layerL){
	var position,layer = layerL || 11;
	if(typeof(center)=="object")
		if(center.x!=undefined&&center.y!=undefined){
		position = new SuperMap.LonLat(center.x,center.y);
    	}else if(center.lon!=undefined&&center.lat!=undefined){
		position = center;
	   }
	this.oMap.zoomTo(layer);
	if(position)this.oMap.panTo(position);
};
/**
 * 将特定图层移至最上层
 */
SGS.App.Index.prototype.upTop = function(layer){
	this.oMap.setLayerIndex(layer,this.oMap.layers.length-1);
};
/**
 * Markers
 */
SGS.App.Index.prototype.ClearMarkers = function(layers,cback){
	var arrLayers = this.oMap.layers;
	this.stopDraw();
	this.ClearZb();
	this.ClearMeasureP();
	this.ClearMeasureL();
	this.clearClusterLayer();
	this.clearHeatLayer();
	this.displayPickupLonLat = false;
	this.oMap.div.style.cursor = "url("+window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/cursors/Pan.cur), default";
	
	if(layers&&layers.length>0){
		for(var i=0;i<layers.length;i++){
			 if (layers[i].CLASS_NAME.indexOf("Vector") > -1) {
				layers[i].removeAllFeatures();
               } else if (layers[i].CLASS_NAME.indexOf("Markers") > -1) {
            	   layers[i].clearMarkers();
              }else if (layers[i].CLASS_NAME.indexOf("Marker") > -1) {
            	   layers[i].clearMarkers();
              }
		}
	}
    for (var i = 0; i < arrLayers.length; i++) {
        var layer = arrLayers[i];
        if(!layer.clear){
        	   if (layer.CLASS_NAME.indexOf("Vector") > -1) {
        			   layer.removeAllFeatures();
                } else if (layer.CLASS_NAME.indexOf("Markers") > -1) {
                      //layer.clearMarkers();
               }else {
            	   
               }
        }
    }
    closeInfoWin();
    _infoMarker = null;
    if(!!cback)cback();
};
/**
 * 清除矢量要素、Markers
 */
SGS.App.Index.prototype.ClearAll = function(layers,cback){
	var arrLayers = this.oMap.layers;
	this.ClearZb();
	this.ClearMeasureP();
	this.ClearMeasureL();
	closeInfoWin();
	if(layers&&layers.length>0){
		for(var i=0;i<layers.length;i++){
			 if (layers[i].CLASS_NAME.indexOf("Vector") > -1) {
				 layers[i].removeAllFeatures();
               } else if (layers[i].CLASS_NAME.indexOf("Markers") > -1) {
            	   layers[i].clearMarkers();
              }
		}
		return;
	}
    for (var i = 0; i < arrLayers.length; i++) {
        var layer = arrLayers[i];
        if(!layer.clear){
        	   if (layer.CLASS_NAME.indexOf("Vector") > -1) {
        	      layer.removeAllFeatures();
                } else if (layer.CLASS_NAME.indexOf("Markers") > -1) {
                  layer.clearMarkers();
               }
        }
    }
    if(!!cback)cback();
};
//全图
SGS.App.Index.prototype.ViewEntire = function(){
	var MapConfig = getMapConfig();
	this.oMap.setCenter(new SuperMap.LonLat(parseFloat(MapConfig.centerPoint.split(","[0])),parseFloat(MapConfig.centerPoint.split(",")[1])),MapConfig.initLevel||initLevel);
};

//向地图添加markers
SGS.App.Index.prototype.AddMarkers=function(param,evts){
	if (param.layer===undefined||param.layer === null) {
		if(!page.markerLayer){
			page.markerLayer = new SuperMap.Layer.Markers("userMarkers");
			page.markerLayer.id = "userMarkerLayer";
		}
		param.layer = page.markerLayer;
	}
	var defaultIocnImg = defaultIcon;
	var size = param.size&&typeof(param.icon)=="object"?param.size:typeof(param.size)=="string"?new SuperMap.Size(parseFloat(param.size.split(",")[0]),parseFloat(param.size.split(",")[1])):new SuperMap.Size(20,20);
	var offset = param.offset!=undefined&&typeof(param.offset)=="object"?param.offset:typeof(param.offset)=="string"?new SuperMap.Pixel(parseFloat(param.offset.split(",")[0]),parseFloat(param.offset.split(",")[1])):new SuperMap.Pixel(-(size.w / 2), -size.h);
	var icon = param.icon!=undefined&&typeof(param.icon)=="object"?param.icon:!!param.icon&&typeof(param.icon)=="string"?new SuperMap.Icon(param.icon, size, offset):new SuperMap.Icon(defaultIocnImg, size, offset);
	if(param.label){
		if(typeof(param.label)=="string"){
		 	var div = document.createElement("div");
		 	div.style.fontSize = "12px";
		 	div.style.padding = "0px 5px";
		 	div.style.border = "1px solid #ccc";
		 	div.style.color = "red";
		 	div.style.top = "-25px";
		 	div.style.fontFamily = "微软雅黑";
		 	div.style.fontWeight = "bold";
		 	div.style.position = "absolute";
		 	div.style.width=(parseInt(div.style.fontSize)*param.label.length)+"px";
		 	div.style.left = "-"+(parseInt(div.style.width)/2-20)+"px";
		 	div.style.backgroundColor= "rgba(252, 252, 252, 0.8)";
		 	div.innerHTML = param.label;
		 	icon.imageDiv.appendChild(div);
		}else{
			icon.imageDiv.appendChild(param.label);
		}
	}
	var marker = new SuperMap.Marker(new SuperMap.LonLat(parseFloat(param.smx), parseFloat(param.smy)), icon);
	marker.attr = param.attr != undefined?param.attr:"";
	marker.id =   param.id||"unid";
	marker.group = param.group||"defaultGroup";
	marker.contentHTML =  param.context != undefined?param.context:"";
	page.markerLayer.addMarker(marker);
	param.map.addLayers([page.markerLayer]);
	if(evts){
		if(typeof(evts)=="object"){
			evts.scope = marker;
			marker.events.on(evts);
		}
	}
	return marker;
};
//获取指定属性值的markers
SGS.App.Index.prototype.getMarkersByAttr = function(attrName,value,layer){
	layer = layer || this.markerLayer;
	attrName = attrName ||"";
	if(!layer&&!layer.markers)return;
	var resultmarkers = [];
	var markers = layer.markers;
	var aNameSplit = attrName.split(".");
	var flag = aNameSplit.length>1;
	for(var i=0;i<markers.length;i++){
		if(!flag){
			if(markers[i][(aNameSplit[0])]==value)resultmarkers.push(markers[i]);
		}else{
			if(markers[i][(aNameSplit[0])][(aNameSplit[1])]==value)resultmarkers.push(markers[i]);
		}
	}
	return resultmarkers;
};
//通过表达式获取指定属性值的markers
SGS.App.Index.prototype.getMarkersByExp = function(exp,layer,ex){
	layer = layer || this.markerLayer;
	exp = exp.Trim() ||"";
	layer = layer || this.markerLayer;
	var resultmarkers = [];
	var markers = layer.markers;
	if(!exp)return markers;
	exp = exp.replace(new RegExp("\&\&","gm"),"\&\&markers[i]."+ex+"");
	exp = exp.replace(new RegExp("\\|\\|","gm"),"\|\|markers[i].");
	for(var i=0;i<markers.length;i++){
		try{
			var flag = eval(("markers[i]."+exp));
			if(flag)resultmarkers.push(markers[i]);
		}catch(e){};
	}
	return resultmarkers;
};
//通过表达式从marker数组里获取指定属性值的markers
SGS.App.Index.prototype.getMarkersByExpFromMarkers = function(exp,markers){
	markers = markers || [];
	exp = exp.Trim() ||"";
	var resultmarkers = [];
	if(!exp)return markers;
	for(var i=0;i<markers.length;i++){
		try{
			var flag = eval(("markers[i]."+exp));
			if(flag)resultmarkers.push(markers[i]);
		}catch(e){};
	}
	return resultmarkers;
};
//根据表达式刷新marker的样式
SGS.App.Index.prototype.changeMarkersStyleByExp = function(exp,newStyle,markerlayer,ex){
	
	markerlayer = markerlayer || this.markerLayer;
	exp = exp ||"";
	newStyle = newStyle||{};
	var markers = this.getMarkersByExp(exp,markerlayer,ex);
	var fontLable = newStyle["legend"];
	for(var i=0;i<markers.length;i++){
		var dom = markers[i].icon.imageDiv.childNodes[1];
		for(var k in newStyle){
			try{
				dom.style[k] = newStyle[k];
			}catch(e){
				
			}
		};
		if(fontLable){
			dom.style.boxShadow = "";
			dom.style.backgroundImage = "";
			dom.innerHTML = fontLable;
			}else{
			 dom.innerHTML = "";
			};
	}
};
//删除指定属性值的markers
SGS.App.Index.prototype.clearMarkersByExpression = function(exp,markerlayer){
	markerlayer = markerlayer || this.markerLayer;
	exp = exp ||"";
	var markers;
	if(exp.indexOf("=")!=-1){
		var attr = exp.split("=")[0];
		var val = exp.split("=")[1];
		markers = this.getMarkersByAttr(attr,val,markerlayer);
	}else{
		markers = markerlayer.markers;
	}
	for(var i=0;i<markers.length;i++){
		markerlayer.removeMarker(markers[i]);
	};
};
//隐藏指定的markers
SGS.App.Index.prototype.hideMarkersByExpression = function(exp,ex,markerLayer){
	exp = exp || "";
	markerLayer = markerLayer||this.markerLayer;
	var markers = [];
	markers = this.getMarkersByExp(exp,markerLayer,ex);
	for(var i=0;i<markers.length;i++){
		try{markers[i].icon.imageDiv.style.display = "none";}catch(e){};
	}
	
}
//显示指定的markers
SGS.App.Index.prototype.showMarkersByExpression = function(exp,ex,markerLayer){
	exp = exp || "";
	markerLayer = markerLayer||this.markerLayer;
	var markers = [];
	markers = this.getMarkersByExp(exp,markerLayer,ex);
	for(var i=0;i<markers.length;i++){
		try{markers[i].icon.imageDiv.style.display = "block";}catch(e){}
	}
	
}
/**
 * 清除指定图层指定属性的要素
 * layer@图层
 * attr@属性条件{属性名：属性值}
 * model@筛选模式“1”只保留有指定属性的要素 “0” 只删除有指定属性的元素 默认 删除有指定属性的要素
 * */
SGS.App.Index.prototype.clearAssignFactor=function(layer,attr,model,cback){
	model = model||"0";
	var factors = null,temp=[];
	var propertyName = "";
	if(!attr)return;
	for(var o in attr){
		propertyName = o;
		break;
	};
	var fn = function (mdl){
		   if (layer.CLASS_NAME.indexOf("Vector") > -1) {
			   if(mdl=="1"){//保留
				   if(layer.features&&layer.features.length){
					   for(var k=0;k<layer.features.length;k++){
						   if(layer.features[k][propertyName]&&layer.features[k][propertyName]!=attr[propertyName]){
							   factors = layer.features[k];
						   };
					   }
				   }
			   }else if(mdl=="0"){//删除
				   factors = layer.getFeaturesByAttribute(attr);  
			   }
	         } else if (layer.CLASS_NAME.indexOf("Markers") > -1) {
	      	   if(layer.markers&&layer.markers.length){
	      		 for(var k=0;k<layer.markers.length;k++){
	      			if(mdl=="1"){//保留
	      				 if(layer.markers[k][propertyName]&&layer.markers[k][propertyName]!=attr[propertyName]){
		      				 temp.push(layer.markers[k]);
		      			   }
		      		   }else if(mdl=="0"){//删除
		      			 if(layer.markers[k][propertyName]&&layer.markers[k][propertyName]==attr[propertyName]){
		      				 temp.push(layer.markers[k]);
		      			   };
		      		   };
	      		   }
	      		 factors =  temp;
	      		   
	      	   };
	        }
		   return factors;
	 };
    try{
    	layer.removeFeatures(fn(model));
    }catch(e){
    	if(fn(model)&&fn(model).length){
    		for(var s=0;s<fn(model).length;s++){
    			layer.removeMarker(fn(model)[s]);
    		}
    	};
    };
    if(!!cback)cback();
};
/**向地图中添加点，线，面要素
 * params.type :point line surface
 * params.arrCoords : ["smx,smy"](point) [["smx,smy"],["smx,smy"]...](line/suface)
 * params.style:Object
 * params.map:SuperMap
 * params.layer:Layer
 * */
SGS.App.Index.prototype.DrawFeature=function(params){
	/**
	 * 绘制缓冲面
	 */
	var drawType =(params.type || "point");
	var arrSmPoints = [];
	for ( var i = 0; i < params.arrCoords.length; i++) {
		arrSmPoints.push(new SuperMap.Geometry.Point(
				parseFloat(params.arrCoords[i].split(",")[0]), parseFloat(params.arrCoords[i]
						.split(",")[1])));
	}
	var drawShape;
	switch(drawType){
	case "point":
		drawShape = arrSmPoints[0];
		break;
	case "line":
		drawShape = new SuperMap.Geometry.LineString(arrSmPoints);
		break;
	case "surface":
	  drawShape = new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(arrSmPoints)]);
		break;
		default:
		drawShape = new SuperMap.Geometry.Point(arrSmPoints[0]);
		break;
	case "marker":
		this.AddMarkers(params,params.evts);
		return;
	}
	params.map = params.map||this.oMap;
	var fStyle = params.style || defaultStyle[drawType];
	fStyle = SuperMap.Util.cloneObject(fStyle);
	fStyle.label = params.label||"";
	var feature = new SuperMap.Feature.Vector();
	if(!!params.attr)feature.attr = params.attr;
	//feature.attr.fid = params.fid;
	feature.geometry = drawShape;feature.style = fStyle;
	if (typeof params.layer == "undefined" || params.layer == null) {
		params.layer = new SuperMap.Layer.Vector(drawType+" Layer");
		params.layer.id = "userGeometry"+drawType+"Layer";
		setResouceLayer(params.layer,drawType);
		params.map.addLayers([params.layer]);
	}
	if(selectLayerArray.indexOf(params.layer)==-1)selectLayerArray.push(params.layer);
	if(!!params.selectH&&!!params.selectH instanceof Object){
		params.selectH.setLayer(params.layer);
		params.selectH.activate();
	}else if(!!params.selectH&&params.selectH===true){
		params.selectH = new SuperMap.Control.SelectFeature(selectLayerArray,
		  {onSelect:onFeatureSelect,onUnselect:onUnFeatureSelect});
		  map.addControl(params.selectH);
		  params.selectH.activate();
	}
	params.layer.addFeatures(feature);
	params.layer.redraw();
	return params.layer;
};

//测距
SGS.App.Index.prototype.MeasureDistance = function(){
	this.Pan();
	if (!this.measureLine) {
		this.drawLineFeatureLayer = new SuperMap.Layer.Vector("drawLineLayer");
		this.drawLineFeatureLayer.style = this.TrackingLayerStyle;
		this.measureLine = new SuperMap.Control.DrawFeature(
				this.drawLineFeatureLayer, SuperMap.Handler.Path, {
					multi : true
				});
		this.oMap.addControl(this.measureLine);
		this.oMap.addLayers([ this.drawLineFeatureLayer ]);
	}
    this.measureLine.events.on({ "featureadded": this.measuredrawCompleted});
    this.measureLine.activate();
    //this.oMap.div.style.cursor = "url(javascript/core/map/theme/images/cursors/length_measure.png), default";
};
/*
 * 绘制拾取坐标 @return SuperMap Lonlat 当前绘制的Lonlat位置
 */
SGS.App.Index.prototype.pickupLonLat = function() {
	this.Pan();
	var lonlatTemp = "";
	this.oMap.div.style.cursor = "crosshair";
	this.displayPickupLonLat = true;
	this.oMap.div.onmousedown = function(e) {
		e = e || window.event;
		if (e.button == "2") {
			page.Pan();
		}
	};
	return lonlatTemp;
};
/**
 * 清除
 */
SGS.App.Index.prototype.clearDraw = function() {
	if (this.measureLine != null) {
		this.measureLine.deactivate();
		
	}
	if (this.measurePolygon != null) {
		this.measurePolygon.deactivate();
	}
	if(this.drawLineFeatureLayer){
		this.drawLineFeatureLayer.removeAllFeatures();
	}
	if(this.drawPolygonFeatureLayer){
		this.drawPolygonFeatureLayer.removeAllFeatures();
	}
	if(this.toolMarkerLayer){
		this.toolMarkerLayer.clearMarkers();
	}
	if(this.measureLabelLayer){
		this.measureLabelLayer.removeAllFeatures();
	}
	//this.ClearZb();
};
/**
 * 停止绘制
 */
SGS.App.Index.prototype.stopDraw = function() {
	if (this.measureLine != null) {
		this.measureLine.deactivate();
	}
	if (this.measurePolygon != null) {
		this.measurePolygon.deactivate();
	}
};
/****************地图面积测量****************/
SGS.App.Index.prototype.MeasureArea = function(){
	this.Pan();
	if (!this.measurePolygon) {
		this.drawPolygonFeatureLayer = new SuperMap.Layer.Vector(
				"drawPolygonLayer");
		this.drawPolygonFeatureLayer.style = this.TrackingLayerStyle;
		this.measurePolygon = new SuperMap.Control.DrawFeature(
				this.drawPolygonFeatureLayer, SuperMap.Handler.Polygon, {
					multi : true
				});
		this.oMap.addControl(this.measurePolygon);
		this.oMap.addLayers([ this.drawPolygonFeatureLayer ]);
	}
    this.measurePolygon.events.on({ "featureadded": this.measuredrawCompleted });
	this.measurePolygon.activate();
    //this.oMap.div.style.cursor = "url(javascript/core/map/theme/images/cursors/zoom.png), default";
};
//绘制几何体
SGS.App.Index.prototype.drawGeometry = function(type,drawEnd,options){
	if(this.drawControl){this.drawControl.deactivate();this.oMap.removeControl(this.drawControl);this.drawControl=null;}
	if(!vectorLayer){
		vectorLayer =  new SuperMap.Layer.Vector("polygon");
		this.oMap.addLayers([vectorLayer]);
	}
	type = type||SuperMap.Handler.Polygon ,options = options||{},drawEnd=drawEnd||function(){};
	this.drawControl = new SuperMap.Control.DrawFeature(vectorLayer,type,options);
	this.drawControl.events.on({ "featureadded":drawEnd});
	this.oMap.addControl(this.drawControl);
	this.drawControl.activate();
};


SGS.App.Index.prototype.ClearZb=function(){
    if (zb != null) {
        zb.destroy();
        panel.destroy();
        zb = null;
        panel = null;
    }
};

SGS.App.Index.prototype.ClearMeasureL=function(){
	if(this.measureLine!=null)
		this.measureLine.deactivate(); 
};
SGS.App.Index.prototype.ClearMeasureP=function(){
	if(this.measurePolygon!=null)
		this.measurePolygon.deactivate();
};

/***********测距，测面绘制结束回调函数*************/
SGS.App.Index.prototype.measuredrawCompleted = function(drawGeometryArgs) {
	page.Pan();
	// 获得图层几何对象
	var geometry = drawGeometryArgs.feature.geometry, measureParam, myMeasuerService, glist = geometry.components[0].components;
	glist = glist[0].components || glist;
	var labelX, labelY, toolX, toolY, temposition = {};
	var gLength = glist.length, temp = "";
	for (var k = 0; k < gLength; k++) {
		if (k != gLength - 1) {
			temp += glist[k].x + " " + glist[k].y + ",";
		} else {
			temp += glist[k].x + " " + glist[k].y;
		}
	}
	measureParam = new SuperMap.REST.MeasureParameters(geometry), 
	/*
	 * MeasureParameters：量算参数类。
	 * 客户端要量算的地物间的距离或某个区域的面积
	 */
	myMeasuerService = new SuperMap.REST.MeasureService(config.content.measureURL); // 量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
	// 对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
	if (geometry.CLASS_NAME.indexOf("LineString") > -1) {
		var pLength = geometry.components[0].components.length;
		var i = parseInt(pLength / 2);
		labelX = geometry.components[0].components[i].x;
		labelY = geometry.components[0].components[i].y;
		toolY = geometry.components[0].components[pLength - 1].y;
		toolX = geometry.components[0].components[pLength - 1].x;
		myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
	} else {
		var tlength = geometry.components[0].components[0].components.length;
		labelX = geometry.bounds.left
				+ (geometry.bounds.right - geometry.bounds.left) / 2;
		labelY = geometry.bounds.bottom
				+ (geometry.bounds.top - geometry.bounds.bottom) / 2;
		toolX = geometry.components[0].components[0].components[tlength - 1].x;
		toolY = geometry.components[0].components[0].components[tlength - 1].y;
		myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;
	}
	temposition.labelPosition = {
		x : labelX,
		y : labelY
	};
	temposition.toolPosition = {
		x : toolX,
		y : toolY
	};
	myMeasuerService.events.on({
		"processCompleted" : function(measureEventArgs) {
			measureEventArgs.tPosition = temposition;
			measureEventArgs.drawGeometryArgs = drawGeometryArgs;
			page.measureCompleted(measureEventArgs, function() {
				//page.oMap.events.triggerEvent("addlayer");
			});
		}
	});
	myMeasuerService.processAsync(measureParam); // processAsync负责将客户端的量算参数传递到服务端。
};

/***************测距，测面请求完成数据显示函数***************/
SGS.App.Index.prototype.measureCompleted = function(measureEventArgs, callback) {
	var distance = measureEventArgs.result.distance
			|| measureEventArgs.distance, area = measureEventArgs.result.area
			|| measureEventArgs.area, result = "";
	if (distance && distance != -1) {
		var d = page.util.formatFloat(distance, 2);
		if (d < 1000)
			result = d + '米';
		else
			result = page.util.formatFloat(d / 1000, 2) + "公里";
	} else if (area != -1) {
		if (area < 1.0E+6)
			result = page.util.formatFloat(area, 2) + "平方米";
		else
			result = page.util.formatFloat(area / 1.0E+6, 2) + "平方公里";
	}
	;
	var geoText = new SuperMap.Geometry.GeoText(
			measureEventArgs.tPosition.labelPosition.x,
			measureEventArgs.tPosition.labelPosition.y, result);
	var geotextFeature = new SuperMap.Feature.Vector(geoText);
	// 新建一个策略并使用在矢量要素图层(vector)上。
	var strategy = new SuperMap.Strategy.GeoText();
	strategy.style = {
		fontColor : "#333",
		fontWeight : "normal",
		fontFamily : "微软雅黑",
		fontSize : "12px",
		fontSize : "12px",
		fill : true,
		fillColor : "#FFFFFF",
		fillOpacity : 1,
		stroke : true,
		strokeColor : "#8B7B8B"
	};
	if (!page.measureLabelLayer)
		page.measureLabelLayer = new SuperMap.Layer.Vector(
				"measureLabel", {
					strategies : [ strategy ]
				});
	if (!page.toolMarkerLayer)
		page.toolMarkerLayer = new SuperMap.Layer.Markers("toolMarkerLayer");
	page.oMap.addLayers([ page.measureLabelLayer,page.toolMarkerLayer]);
	page.measureLabelLayer.addFeatures([ geotextFeature ]);
	var size = new SuperMap.Size(41, 18);
	var offset = new SuperMap.Pixel(5, -(size.h));
	var icon = new SuperMap.Icon(window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl
			+ "../theme/images/deltool.jpg", size, offset);
	icon.imageDiv.style.zIndex = 999999999999;
	var marker = new SuperMap.Marker(new SuperMap.LonLat(
			measureEventArgs.tPosition.toolPosition.x,
			measureEventArgs.tPosition.toolPosition.y), icon);
	marker.pinless = new Object();
	marker.pinless.type = distance && distance != -1 ? "distance" : "area";
	marker.pinless.graphId = measureEventArgs.drawGeometryArgs.feature.id;
	marker.pinless.geoTextId = geotextFeature.id;
	page.toolMarkerLayer.addMarker(marker);
	marker.events.on({
		scope : marker,
		"click" : function() {
			if (this.pinless.type && this.pinless.type == "distance") {
				var lineFeature = page.drawLineFeatureLayer
						.getFeatureById(this.pinless.graphId);
				page.drawLineFeatureLayer.removeFeatures(lineFeature);
			} else if (this.pinless.type && this.pinless.type == "area") {
				var polygonFeature = page.drawPolygonFeatureLayer
						.getFeatureById(this.pinless.graphId);
				page.drawPolygonFeatureLayer
						.removeFeatures(polygonFeature);
			}
			var measureFeatureLabel = page.measureLabelLayer
					.getFeatureById(this.pinless.geoTextId);
			page.measureLabelLayer.removeFeatures(measureFeatureLabel);
			page.toolMarkerLayer.removeMarker(this);
		}
	});
	if (callback && typeof callback == "function")
		callback(measureEventArgs);
};
/***************扩展的工具类***********/
SGS.App.Index.prototype.util = {};
/**
 * 自定义工具
 */
SGS.App.Index.prototype.util.formatFloat = function(src, pos) {
	return Math.round(parseFloat(src) * Math.pow(10, pos)) / Math.pow(10, pos);
};
/**
 * 将特定图层移至最上层
 */
SGS.App.Index.prototype.util.upTop = function(layer) {
	this.oMap.setLayerIndex(layer, page.oMap.layers.length - 1);
};
//获取元素的位置信息
SGS.App.Index.prototype.util.position = function( oElement ){   
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
  }; 
};
//元素事件注册工具
SGS.App.Index.prototype.util.addEvent = {
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}
		},
		getEvent:function(event){
			return event?event:window.event;
		},
		//取消事件的默认行为
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue= false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
		}
	};
/**
 * 投影坐标转换
 * @x x坐标 必要
 * @y y坐标 必要
 * @transformArag 坐标转换参数 字符数组/字符 格式[转换前投影,目标投影] / "目标投影"(将当前地图使用投影转换成目标投影)
 * @return  {x:x,y:y}
 */
SGS.App.Index.prototype.util.projectionTransformation = function(x,y,transformArag){
	if(!x||!y||!transformArag)return {x:x,y:y};
	var lonlat = new SuperMap.LonLat(parseFloat(x),parseFloat(y));
	if(transformArag instanceof Array&&transformArag.length==2){
		try{
			lonlat.transform(transformArag[0],transformArag[1]);
		}catch(e){};
	}else if(typeof transformArag =="string"){
		try{
			lonlat.transform(this.oMap.projection,transformArag);	
		}catch(e){};
	}
	return {x:lonlat.lon,y:lonlat.lat};
}

SGS.App.Index.prototype.clearHelperLayers = function(){
	var arrLayers = map.layers;
	for(var i=1; i<arrLayers.length; i++){
		//if(arrLayers[i].)
		map.removeLayer(arrLayers[i]);
		i--;
	}
}

SGS.App.Index.prototype.AddWMS = function(wmsURL, layers){
	var xmlHttp = null;
	if(_blIsIE)
        xmlHttp = new ActiveXObject("MicroSoft.XMLHTTP");
    else if(window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET",_ProxyUrl+"?url="+wmsURL+"&requesttype=POST",false);
    xmlHttp.send(null);
	if(xmlHttp.responseText.indexOf("WMT_MS_Capabilities ")<0){
		alert("无法获取WMS服务信息！");
		return;
	}
	var strXml = xmlHttp.responseText;
	strXml = strXml.substring(0,strXml.indexOf("?>") + 2) + strXml.substring(strXml.indexOf("<WMT_MS_Capabilities "));
	var xmlDom = BrowserAdepter.loadXML(strXml);
	var nSRSs = xmlDom.selectNodes("WMT_MS_Capabilities/Capability/Layer/SRS");
	var strEPSG = nSRSs[1].text;
	var nBBoxs = xmlDom.selectNodes("WMT_MS_Capabilities/Capability/Layer/BoundingBox");
	var fBBox = [];
	for(var i=0;i<nBBoxs.length;i++){
		if(nBBoxs[i].getAttribute("SRS") == strEPSG){
			fBBox = [parseFloat(nBBoxs[i].getAttribute("minx")), parseFloat(nBBoxs[i].getAttribute("miny")), parseFloat(nBBoxs[i].getAttribute("maxx")), parseFloat(nBBoxs[i].getAttribute("maxy"))];
			break;
		}
	}
	if(typeof(layers) == "undefined" ||  layers == "")
		layers = "0";
	var wmsLayer = new SuperMap.Layer.WMS("wms_" + Math.random(), wmsURL, { layers: layers, transparent: true }, { opacity: 0.9, isBaseLayer: false });
    var bounds = new SuperMap.Bounds(fBBox[0], fBBox[1], fBBox[2], fBBox[3]); 
    bounds.toBBOX();
    wmsLayer.maxExtent = bounds;
    wmsLayer.projection = new SuperMap.Projection(strEPSG);
    //wmsLayer.params.SRS="EPSG:4326";
    this.oMap.addLayer(wmsLayer);
	return wmsLayer;
};
//添加wmts图层
SGS.App.Index.prototype.AddWMTS = function(layerurl){
	var layer = doConfigParse({type:"wmts",url:layerurl});
	delete layer.mapBounds;
	var wmtsLayer = new SuperMap.Layer.WMTS(layer);
	this.oMap.addLayer(wmtsLayer);
	return wmtsLayer;
};
//添加wfs图层
SGS.App.Index.prototype.AddWFS = function(wfsURL, layer){
	var layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", wfsURL, {transparent: true, cacheEnabled: true}, {maxResolution: "auto"});

	var vector_style = new SuperMap.Style({
		fillColor: '#669933',
		fillOpacity: 0.8,
		pointRadius: 8,
		strokeColor: '#aaee77',
		strokeWidth: 3
	});

	vector_style_select = new SuperMap.Style({
		fillColor: '#000',
		fillOpacity: 0.9,
		fontColor: '#232323',
		strokeColor: '#ffffff'
	});

	myFilter = new SuperMap.Filter.Comparison({
		type: SuperMap.Filter.Comparison.EQUAL_TO,
		property: "NAME",
		value: "克拉玛依市"
	});

	vectorLayer = new SuperMap.Layer.Vector("World Capitals", {
		strategies: [new SuperMap.Strategy.BBOX()],
		protocol: new SuperMap.Protocol.WFS({
			version: "1.0.0",
			url: wfsURL,
			featureType: "SGS:POINT_1682",
			featureNS: "http://www.supermap.com.cn/SGS",
			featurePrefix: "SGS",
			geometryName: "the_geom"
		}),
		filter: myFilter,
		styleMap: new SuperMap.StyleMap({
			'default': vector_style,
			'select': vector_style_select
		})
	});

	var select_feature_control = new SuperMap.Control.SelectFeature(vectorLayer);
	this.oMap.addControl(select_feature_control);
	select_feature_control.activate();
	layer.events.on({"layerInitialized": function(){this.oMap.addLayers([layer]);}});
};
/*
 * 地名逆向匹配（通过dfc逆向匹配接口来实现）
 * 
 */
SGS.App.Index.prototype.reverseMatching = function(x,y){
	var url = config.content.addresSreverseMatchingURL;
	try{
		reverseMatchingParams.x = x;
		reverseMatchingParams.y = y;
		var requestUrl = "",requestParams = reverseMatchingParams;
		if(isCrossDomain(url)){
			requestUrl = _ProxyUrl;
			requestParams.url = url;
			requestParams.requesttype = "get";
		}else{
			requestUrl = url;
		};
		var result = $.ajax({
			url:requestUrl,
			data:requestParams,
			async:false,
			dataType:"text",
			success:function(data){
				return data;
			},
			error:function(){
				console.log("地址逆向匹配失败！");
				}
				});
		return result.responseXML;
	}catch(e){
		console.log("地址逆向匹配失败！原因：获取匹配参数失败!");
		return null;
	}
};
SGS.App.Index.prototype.switchMenu = function(obj, index){
	var arrMenus = document.getElementsByTagName("li");
	var arrFunctions = document.getElementById("divfunction").childNodes;
	var j=0;
	var arrDivIndex = [];
	for(var i=0; i<arrMenus.length; i++){
		arrMenus[i].style.backgroundImage = "";
	}
	obj.style.background= "url(images/heads/menubtn.png)  top center no-repeat";
	for(var i=0; i<arrFunctions.length; i++){
		if(arrFunctions[i].tagName=="DIV"){
			arrFunctions[i].style.display = "none";
			arrDivIndex.push(i);
		}
	}
	for(var i=0; i<arrDivIndex.length; i++){
		if(i==index-1)
			arrFunctions[arrDivIndex[i]].style.display = "block";
	}
	tabAccidentAndInitList(obj.getAttribute("code"));
	 page.ClearMarkers();
	$('#divDialog').window('close');
};
/*
 * 绘制拾取坐标
 * @return SuperMap Lonlat  当前绘制的Lonlat位置
 */
SGS.App.Index.prototype.drawCoordinate = function(){
	var lonlatTemp="";
	this.oMap.div.style.cursor = "crosshair";
	page.oMap.div.onmousemove = function(e){
		var event = e ||window.event;
		var pixcel = new SuperMap.Pixel(event.clientX,event.clientY);
		var lonLatPixcel = new SuperMap.Pixel(event.clientX+5,event.clientY+5);
		lonlatTemp = page.oMap.getLonLatFromPixel(pixcel);
		lonlatTemp = page.util.projectionTransformation(lonlatTemp.lon,lonlatTemp.lat,["EPSG:3857","EPSG:4326"]);
		var lonlatTemp2 = page.oMap.getLonLatFromPixel(lonLatPixcel);
		if(this.tempBubble)try{page.oMap.removePopup(this.tempBubble);}catch(e){};
		var contentHTML = "<div style='font-family:微软雅黑;font-size:12px;'>"+
		"<div style='line-height:24px;background-color:#DFEBF5;font-size:14px;'><b>坐标</b></div>"
		+"<span>经度：</span>"+lonlatTemp.x+"<br><span>纬度：</span>"+lonlatTemp.y+"</div>";
		var psize = new SuperMap.Size(156,60);
		this.tempBubble = openInfoWinNotCloseNotAnchor(lonlatTemp2.lon,lonlatTemp2.lat,contentHTML,psize);
	};
	page.oMap.div.onclick = function(e){
		try{
			top.addResFram.document.getElementById("longitude").value = lonlatTemp.lon;
			top.addResFram.document.getElementById("latitude").value = lonlatTemp.lat;
			page.ClearMarkers(getResouceLayer("point"));
			}catch(e){};
		page.oMap.div.onmousemove = null;
		page.oMap.div.onclick = null;
		page.DrawFeature({arrCoords:[(lonlatTemp.lon+","+lonlatTemp.lat)]});
		page.Pan();
	};
	return lonlatTemp;
};
/*
 * 周边查询
 * @param center 中心点 
 * @param round 半径 米 
 * @param type 兴趣类型 
 * 
 */
SGS.App.Index.prototype.circumSreach = function(center,round,type){
	var addressName = getNearAddress();
	var popupHTML = document.getElementById("userPopup").innerHTML;
	this.ClearMarkers(getResouceLayer("marker"), function(){
		try{parent.subpage.fanhui();}catch(e){}
		openUserNoClosedPopup(rightMenuPosition.lon,rightMenuPosition.lat,popupHTML);
		if(addressName){fillTitle(addressName+"附近");}else{fillTitle("周边查询...");}
		switchTool(3);
	});
	
	this.AddMarkers({
		map:this.oMap,
		layer:getResouceLayer("marker"),
		type:"marker",
		size:"32,32",
		attr:{name:addressName},
		smx:rightMenuPosition.lon,
		smy:rightMenuPosition.lat
	},{
		click:function(){closeInfoWin();fillContent(null,"");openInfoWinNotClosed(this);fillTitle(this.attr.name+"附近");}
	});
	hiddenRightMenu();
};
/*
 * 范围查询
 * @param bufferCode 范围点串
 * @param type 兴趣类型 
 * 
 */
SGS.App.Index.prototype.bufferSreach = function(bufferCode,fid,sql,service,callback){
	if(!!bufferCode.Trim()){
		var serverUrl = service || config.content.poiURL+_key;
		fid = fid || this.seachForFID(serverUrl);
		try{
			if(fid)bufferParams.FID = fid;
			if(sql)bufferParams.filter=sql;
			bufferParams.page=pageIndex;
			bufferParams.BOUNDS = bufferCode;
			var requestUrl = "",requestParams = bufferParams;
			if(isCrossDomain(serverUrl)){
				requestUrl = _ProxyUrl;
				requestParams.url = serverUrl;
				requestParams.requesttype = "get";
			}else{
				requestUrl = serverUrl;
			};
			var result = $.ajax({
				url:requestUrl,
				data:requestParams,
				dataType:"json",
				success:function(data){
					if(callback){
						if(typeof callback == 'function'){
							callback(data);
						}else{
							console.log(callback+'必须为fuction类型！');
						}
					}
					top._resultSet=top._resultSet?top._resultSet:{};
					top._resultSet.bufferResult = data;
					return data;
				},
				error:function(e){
					console.log("地址模糊查询失败！"+e);
				}
			});
			return result.responseXML;
		}catch(e){
			console.log("地址模糊查询失败！！原因：获取匹配参数失败!");
			return null;
		};
	}
	return null;
};

/*
 * 地名地址模糊查询（智能提示）
 * 
 * @param key 关键字 
 * 
 */
SGS.App.Index.prototype.addressFuzzyQuery = function(key,page){
	if(!!key.Trim()){
		var url = config.content.addressURL;
		//var url = config.content.addressMatchURL;
		try{
			addressSreach.dicname = encodeURI(key);
			addressSreach.pageindex=pageIndex;
			var requestUrl = "",requestParams = addressSreach;
			if(isCrossDomain(url)){
				requestUrl = _ProxyUrl;
				requestParams.url = url;
				requestParams.requesttype = "get";
			}else{
				requestUrl = url;
			};
			var result = $.ajax({
				url:requestUrl,
				data:requestParams,
				async:false,
				dataType:"text",
				success:function(data){
					return data;
				},
				error:function(e){
					console.log("地址模糊查询失败！"+e);
				}
			});
			return result.responseXML;
		}catch(e){
			console.log("地址模糊查询失败！！原因：获取匹配参数失败!");
			return null;
		};
	}
	return null;
};
/*
 * 兴趣点查询
 * 
 * @param key 关键字 
 * 
 */
SGS.App.Index.prototype.interestPointSeach=function(sql,callback,serviceUrl){
	var url = serviceUrl||config.content.poiURL+_key;
	try{
		var requestUrl = "",requestParams={};
		if(isCrossDomain(url)){
			requestUrl = _ProxyUrl;
			requestParams.url = url;
			requestParams.requesttype = "get";
		}else{
			requestUrl = url;
		};
		var result = $.ajax({
			url:requestUrl,
			data:requestParams,
			dataType:"json",
			success:function(data){
				if(data){
					fittleParams.FID=data.datasetid;
					fittleParams.filter=sql;
					fittleParams.page=pageIndex;
					requestParams = fittleParams;
					if(isCrossDomain(url)){
						requestUrl = _ProxyUrl;
						requestParams.url = url;
						requestParams.requesttype = "get";
					}else{
						requestUrl = url;
					};
					var result1=$.ajax({
						url:requestUrl,
						data:requestParams,
						/*async:false,*/
						dataType:"json",
						success:function(data){
							top._resultSet=top._resultSet?top._resultSet:{};
							top._resultSet.poiResult = data;
							if(callback){
								if(typeof callback == 'function'){
									callback(data);
								}else{
									console.log(callback+'必须为fuction类型！');
								}
							}
							
							return data;
						},
						error:function(e){
							console.log("兴趣点查询失败！"+e);
						}
					});
					return result1;
				}else{
					console.log("兴趣点查询失败！！原因：获取匹配参数失败!");
				}
			},
			error:function(e){
				console.log("兴趣点查询失败！错误:"+e);
			}
		});
	}catch(e){
		console.log("兴趣点查询失败！！原因：获取匹配参数失败!");
		return null;
	}
	return null;
};

/**
 * 添加聚散图层到当前地图
 */
SGS.App.Index.prototype.addClusterLayer = function(datalist,options,callback){
	//内部函数
	options = options||{};
	var _getFeatures = function(data){
		var features = [];
		for (var i = 0, len = data.length; i < len; i++) {
			var provinceInfo = data[i].attr||data[i];
			var x = provinceInfo.X||provinceInfo.x;
			var y = provinceInfo.Y||provinceInfo.y;
			var geo = new SuperMap.Geometry.Point(x,y);
			if (x&&y) {
				var fea = new SuperMap.Feature.Vector(geo,provinceInfo);
				fea.info = options;
				fea.style = defaultClusterStyle(this.famousType,true);
				features.push(fea);
			};
		}
		return features;
	};
	var features = _getFeatures(datalist);
	if(!features&&!features.length)return;
	if(this.clusterLayer){
		this.oMap.removeLayer(this.clusterLayer);
	}
		this.clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster",{"clusterStyles":(options.style||clusterStyles.city),"isDiffused":false});
		this.clusterLayer.info = options;
		this.oMap.addLayers([this.clusterLayer]);
	//创建聚散选择控件。该控件实现了聚散图层的鼠标事件。
	if(this.selectCluster){
		this.oMap.removeControl(this.selectCluster);
	}
		this.selectCluster = new SuperMap.Control.SelectCluster(this.clusterLayer,{
				callbacks:{
				click:function(f){ //点击兴趣点弹出信息窗口
//					if(!f.isCluster){ //当点击聚散点的时候不弹出信息窗口
//						console.log(f);
//		               //this.openInfoWinDetails(f);
//						try{
//							var x = f.geometry.x;
//							var y = f.geometry.y;
//							openInfoWinNotCloseNotAnchor(x,y,(f.info.pHtml||null),null,f);
//						}catch(e){}
//					}
					//alert(f.children[0].attributes.name);
					var html="";
					for(i=0;i<f.children.length;i++){
						html+="<li>"+f.children[i].attributes.name+"</li>";
					}
					document.getElementById("userPopup").innerHTML="<div style='max-height:300px'>"+html+"</div>" +
					"<style>#popWin_contentDiv div{list-style:none;padding:0;}"+
"#popWin_contentDiv div li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}"+
"#popWin_contentDiv div li:last-child{border-bottom-width:0}"+
"#popWin_contentDiv div li:hover{background-color:#f3f3f3;}"+
"#popWin_contentDiv div li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>";
					openInfoWinNotCloseNotAnchor(f.geometry.x,f.geometry.y,document.getElementById("userPopup").innerHTML,null,this);
					document.getElementById("popWin").style.height="0px";
				},
				 clickout:function(){ //点击空白处关闭信息窗口
					
				 }
				}
	});
	this.oMap.addControl(this.selectCluster);
	
	this.clusterLayer.events.on({"mouseover": function(e){//注册moveend事件，当缩放的时候关闭信息窗口
		//if(e&& e.zoomChanged){
			//if(e.element){$(e.element).find("image").css({"zIndex":99999999,"position":"absolute"});};
			//this.map.events.triggerEvent("addlayer");
		//}
			
		}
	});
		this.clusterLayer.events.on({"clusterend":function(e){
		//e包含了聚散完成所需要的信息，其结构如下e={clusterPoints:[],displayedPoints:[],element:null,object:null,type:"clusterEnd"}
		//其中，clusterMaps是包含了聚散点映射关系集合，clusterPoints[i]则表示第i个聚散点映射关系，其类型为{SuperMap.Feature.Vector}，其内的children属性包含有对应的实际点坐标
		//而displayedPoints则是用户所设定的某一范围内不需要被聚散的点集合
		//if(e.element){$(e.element).find("image").css({"zIndex":680});};
		//this.map.events.triggerEvent("addlayer");
		}});
		//激活控件。
		this.selectCluster.activate();
		//往聚散图层中添加兴趣点
		this.clusterLayer.addFeatures(features);
		if(callback&&typeof callback == "function")callback(features);
		return this.clusterLayer;
};
/**
 * 清除聚散图
 */
SGS.App.Index.prototype.clearClusterLayer = function(){
	if(this.clusterLayer){
		this.oMap.removeLayer(this.clusterLayer);
		this.clusterLayer = null;
	}
	if(this.selectCluster){
		this.oMap.removeControl(this.selectCluster);
		this.selectCluster = null;
	}
};

/**
 * 初始化热力图层
 */
SGS.App.Index.prototype.createHeatLayer =function(options,datalist,layer){
	if(!options||typeof options != "object"){ console.error("缺少必要参数options...");return ;}
	if(!datalist){console.error("缺少必要参数datalist...");return ;};
	if(!datalist instanceof Array){console.error("参数datalist必须为数组类型...");return ;};
	var heatMapLayer = new SuperMap.Layer.HeatMapFastLayer(
            "heatMap",
            {
                "radius": 30,
                "featureWeight": "value",
                "featureRadius": "geoRadius"
            }
    );
	if(!this.heatLayer){
		this.heatLayer = layer||heatMapLayer;
	}else if(layer&&layer.id&&layer.id.indexOf("SuperMap.Layer.HeatMapFastLayer")!=-1){
		this.heatLayer = layer;
	}
	for(var i in options){
		this.heatLayer[i] = options[i];
	}
	var heatPoints = [];
	var key = options.featureWeight||"value";
	for(var i=0; i < datalist.length; i++){
		if(datalist[i].id&&(datalist[i].id+"").indexOf("SuperMap.Feature.Vector")!=-1){
			heatPoints = datalist;
			break;
		}else if(datalist[i].attr){
			heatPoints[i] = new SuperMap.Feature.Vector(
					new SuperMap.Geometry.Point((datalist[i].attr.X||datalist[i].attr.x) ,(datalist[i].attr.Y||datalist[i].attr.y)),
					{
		                                "radius":'10px',
		                                "maxWeight":0.1,
		                                "value": Math.random() * 9,
		                                "geoRadius": null
		                                
		            });
		}else{
			heatPoints[i] = new SuperMap.Feature.Vector(
			new SuperMap.Geometry.Point((datalist[i].X||datalist[i].x) ,(datalist[i].Y||datalist[i].y)),
			{
                                "radius":'10px',
                                "maxWeight":0.1,
                                
                                "value": Math.random() * 9,
                                "geoRadius": null
                              
            });
		}
		};
	try{
	 this.heatLayer.removeAllFeatures();
	}catch(e){};
	this.heatLayer.addFeatures(heatPoints);
	this.oMap.addLayers([this.heatLayer]);
	return this.heatLayer;
};
/**
 * 清除热力图
 */
SGS.App.Index.prototype.clearHeatLayer = function(){
	if(this.heatLayer){
		this.oMap.removeLayer(this.heatLayer);
		this.heatLayer = null;
	}
};

/*
 * 查询FID
 * 
 * @param key 关键字 
 * 
 */
SGS.App.Index.prototype.seachForFID=function(url,callback){
	var url = config.content.poiURL+_key;
	try{
		var requestUrl = "",requestParams={};
		if(isCrossDomain(url)){
			requestUrl = _ProxyUrl;
			requestParams.url = url;
			requestParams.requesttype = "get";
		}else{
			requestUrl = url;
		};
		var result = $.ajax({
			url:requestUrl,
			data:requestParams,
			dataType:"json",
			success:function(data){
				if(data){
					if(callback){
						if(typeof callback == 'function'){
							callback(data.datasetid);
						}else{
							console.log(callback+'必须为fuction类型！');
						}
					}
					return data.datasetid;
				}else{
					console.log("FID查询失败！！原因：获取匹配参数失败!");
				}
			},
			error:function(e){
				console.log("FID查询失败！错误:"+e);
			}
		});
	}catch(e){
		console.log("FID查询失败！！原因：获取匹配参数失败!");
		return null;
	}
};

/*
 * 路径分析
 * @param startPint 起始点
 * @param endPiont 终点
 * @param waies 途经点数组
 * 
 */
SGS.App.Index.prototype.pathAnalyze = function(startPiont,endPiont,waies,callback){
	
	if(endPiont == undefined || startPiont == undefined){
  		return;
  	}
  	if(startPiont.lon == null && endPiont.lat == null){
  		return;
  	}
  	var requestUrl = "",requestParams=roadAnalyse;
  	if(waies&&waies.length){
  		var barrierpoints="";
  		for(var k=0;k<waies.length;k++){
  				barrierpoints += waies[k].lon+","+waies[k].lat+";";
  		}
  		requestParams.points = startPiont.lon+","+startPiont.lat+";"+barrierpoints+endPiont.lon+","+endPiont.lat;
	}else{
		requestParams.points = startPiont.lon+","+startPiont.lat+";"+endPiont.lon+","+endPiont.lat;
	}
  	var url =  config.content.analysisPathURL.Format(config.content.analysisPathURL,[_key]);
  	if(isCrossDomain(url)){
		requestUrl = _ProxyUrl;
		requestParams.url = url;
		requestParams.requesttype = "get";
	}else{
		requestUrl = url;
	};
  	$.ajax({
  		type: "GET",
  		url:requestUrl,
  		data:requestParams,
  		success:function(result){
  			if(top._resultSet&&typeof top._resultSet =="object"){
  				top._resultSet.pathAnaly = result;
  			}else{
  				top._resultSet = {pathAnaly:result};	
  			}
  			if(callback){
  				if(typeof callback == "function"){
  					callback(result);
  				}else{
  					console.log(callback+'必须为fuction类型！');
  				}
  			}
  			return result;
  		}
  	});
};

/*
 * 视窗内搜索
 * @param type 兴趣点类型
 * @param isTrack 改变视窗位置是否重新搜索
 */
SGS.App.Index.prototype.veiwSreach = function(fid,sql,autoRefresh,service,viewExtent,callback){
	var url = service || config.content.poiURL+_key;
	var extent =viewExtent || this.oMap.getExtent();
	var bufferCode  = extent.left+","+extent.top+";"+extent.left+","+extent.bottom+";"+extent.right+","+extent.bottom+";"+extent.right+","+extent.top+";"+extent.left+","+extent.top;
	var result = this.bufferSreach(bufferCode,fid,sql,url,function(data){
		if(callback){
				if(typeof callback == "function"){
					callback(data);
				}else{
					console.log(callback+'必须为fuction类型！');
				}
			}
	});
};
SGS.App.Index.prototype.addPositionMaker = function(x,y,level,options,markerimg,sizex,sizey,attrs){
	if(!positionMarkers){
		positionMarkers = new SuperMap.Layer.Markers( "PositionMarkers" );
		this.oMap.addLayer(positionMarkers);
	}else{
		positionMarkers.clearMarkers();
	}
	var size = new SuperMap.Size(sizex,sizey);
	var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
	var icon = new SuperMap.Icon(markerimg, size, offset);
	var marker = new SuperMap.Marker(new SuperMap.LonLat(x,y),icon);
 	marker.name = options.label;
		var div2 = document.createElement("div");
		div2.className = "vectorMarkerLabel fa";
		div2.id = marker.icon.imageDiv.id+"MarkerLabe";
		div2.style.fontSize = "12px";
		div2.style.display = "none";
		div2.style.border = "1px solid #ccc";
		div2.style.borderRadius = "2px";
		div2.style.backgroundColor = "rgb(118, 169, 210)";
		div2.style.color = "#fff";
		div2.style.position = "relative";
		div2.style.width = options.label.length*parseFloat((div2.style.fontSize||12))+"px";
		div2.style.padding = "0px 2px";
		div2.style.top = "-28px";
		div2.style.left = "-"+((parseFloat(div2.style.width)||12)/2)+"px";
		div2.innerHTML = options.label;
		marker.icon.imageDiv.appendChild(div2);
	marker.events.on({
		"click":positioinMakerPopup,
		"mouseover":positioinMakerMoveOver,
		"mouseout":positioinMakerMoveOut,
		"scope": marker
	});
	positionMarkers.addMarker(marker,icon);
	map.setCenter(	new SuperMap.LonLat(x,y),level||7	)
}
function positioinMakerMoveOver(){
	var marker = this;
	$("#"+marker.icon.imageDiv.id+"MarkerLabe").show();
}
function positioinMakerMoveOut(){
	var marker = this;
	$("#"+marker.icon.imageDiv.id+"MarkerLabe").hide();
}
function positioinMakerPopup(){
	var marker = this;
	var lonlat = marker.getLonLat();
	closeInfowinNotAnchor();
	//alert(top.$("#marker-menu").prop("outerHTML"));
	var content=top.$("#marker-menu").prop("outerHTML");
	
	var popup = new SuperMap.Popup("popWin", new SuperMap.LonLat(lonlat.lon,lonlat.lat), null,content, null,true,null,true);
	_infowinNotAnchor = popup;
	try{_infoMarker=marker.lonlat||marker.geometry?marker:_infoMarker;}catch(e){};
	popup.autoSize=true;
	map.addPopup(popup);
	document.getElementById("popWin_contentDiv").style.height = "auto";
}
function initMapConfigs(){
	config=new SGS.App.config;
	MapConfigs=config.initConfig();
}
function formatFloat(src, pos){
    return Math.round(parseFloat(src) * Math.pow(10, pos)) / Math.pow(10, pos);
}
//打开普通气泡弹框
function openInfoWin() {
	closeInfoWin();
	var popup = new SuperMap.Popup.FramedCloud("popWin", new SuperMap.LonLat(this.lonlat.lon, this.lonlat.lat),null,this.contentHTML, null,true, null,true);
	_infowin = popup;
	popup.autoSize=true;
	map.addPopup(popup);
	return popup;
}
//打开不带关闭按钮的气泡弹框
function openInfoWinNotClosed(marker,callback) {
	var mark;
	if(marker&&!!marker.lonlat)mark = marker;
	else
	mark = this;
	closeInfoWin();
	var popupHTML = document.getElementById("userPopup").innerHTML;
	var popup = new SuperMap.Popup.FramedCloud("popWin", mark.getLonLat(),null,(mark.contentHTML||popupHTML), null,false, null,true);
	popup.autoSize=true;
	_infowin = popup;
	_infoMarker = marker;
	rightMenuPosition = mark.getLonLat();
	map.addPopup(popup);
	if(callback)callback(marker);
	return popup;
}
//打开不带关闭按钮的普通弹框（不带锚点）
function openInfoWinNotCloseNotAnchor(x,y,content,size,marker) {
	
	closeInfowinNotAnchor();
	content=content||document.getElementById("userPopup").innerHTML;
	var lonlat;
		 if((isNaN(y)||isNaN(x))){
			 if(this.lonlat)lonlat = this.lonlat;
			 else return;
		 }else{
			 lonlat = new SuperMap.LonLat(x, y);
		 }
	var popup = new SuperMap.Popup("popWin", lonlat, (size||null),content, null,true,null,true);
	_infowinNotAnchor = popup;
	try{_infoMarker=marker.lonlat||marker.geometry?marker:_infoMarker;}catch(e){};
	if(!size)popup.autoSize=true;
	map.addPopup(popup);
	document.getElementById("popWin_contentDiv").style.height = "auto";
	
	return popup;
}
//打开自定义气泡弹框
function openUserPopup(x,y,content){
	closeInfoWin();
	content=content||document.getElementById("userPopup").innerHTML;
	var popup = new SuperMap.Popup.FramedCloud("popWin", new SuperMap.LonLat(x, y), null,content, null,true,null,true);
	popup.autoSize=true;
	_infowin = popup;
	map.addPopup(popup);
	try{$("#popupImgDiv").width("100%");}catch(e){};
	return popup;
}
//打开不带按钮的自定义气泡弹框
function openUserNoClosedPopup(x,y,content){
	closeInfoWin();
	content=content||document.getElementById("userPopup").innerHTML;
	var popup = new SuperMap.Popup.FramedCloud("popWin", new SuperMap.LonLat(x, y),null,content, null,false, null);
	popup.autoSize=true;
	_infowin = popup;
	map.addPopup(popup);
	try{$("#popupImgDiv").width("100%");}catch(e){};
	return popup;
}
function closeInfoWin() {
    if (_infowin) {
        try {
            _infowin.hide();
            _infowin.destroy();
        }
        catch (e) { }
    }
    _infowin=null;
    closeInfowinNotAnchor();
}
function closeInfowinNotAnchor(){
	if(_infowinNotAnchor){
    	try {
    		_infowinNotAnchor.hide();
    		_infowinNotAnchor.destroy();
        }
        catch (e) { }
       _infowinNotAnchor = null;
    }
	try{
		top.document.getElementById("capacityAddressList").innerHTML = "";
		top.document.getElementById("capacityAddressList").style.display = "none";
	}catch(e){}
}
function initRightMenuPosition(marker){
	/*rightMenuPosition.lon
	rightMenuPosition.lat*/
}
function showRightMenu(e){
	try{layer.close(rightMenu);}catch(ex){};
	var evt=e||window.event;
	evt.Target=evt.target || evt.srcElement || evt.currentTarget;
	var rightMenuDom = document.getElementById("rightMenu");
	rightMenuDom.style.display = "block";
	rightMenuDom.style.top = e.clientY+"px";
	rightMenuDom.style.left = e.clientX+"px";
	var pixel =  new SuperMap.Pixel(e.clientX,e.clientY);
	rightMenuPosition = map.getLonLatFromPixel(pixel);
	
  };
  function hiddenRightMenu(){
	  try{layer.close(rightMenu);}catch(ex){};
	  var rightMenuDom = document.getElementById("rightMenu");
	  rightMenuDom.style.display = "none"; 
  }
  function closeRightMenu(){
	  try{layer.close(rightMenu);}catch(ex){};
	  var rightMenuDom = document.getElementById("rightMenu");
	  rightMenuDom.style.display = "none";
  }
  function getNearAddress(){
	  var result = page.reverseMatching(rightMenuPosition.lon,rightMenuPosition.lat);
		var resultJson = toJson(result);
		var addressName = resultJson.MatchAddresses.MatchAddress[0].Name;
		return addressName;
  }
  
  /************绘制圆**************/
//周边查询画圆
  function drawCircle(centerPointx, centerPointy, radius) {
  	 var strategy = new SuperMap.Strategy.GeoText();
  	    strategy.style = {
  	    		  fontColor:"#333",
  	    		  fontWeight:"bolder",
  	    		  fontSize:"12px",
  	    		  fill: true,
  	    		  fillColor: "#FFFFFF",
  	    		  fillOpacity: 1,
  	    		  stroke: true,
  	    		  strokeColor:"#8B7B8B"
  	    		};
  	if (!vectorRoundLayer) {
  		vectorRoundLayer = new SuperMap.Layer.Vector("round",{strategies:[strategy]});
  		map.addLayer(vectorRoundLayer);
  	} else {
  		vectorRoundLayer.removeAllFeatures();
  	}
  	var centerPoint = new SuperMap.Geometry.Point(parseFloat(centerPointx),parseFloat(centerPointy));//中心点
  	//范围面
  	var linearRings = createCircle(centerPointx, centerPointy, radius);
  	var centerFeature = new SuperMap.Feature.Vector(centerPoint, null,styleCenterPoint);//中心点
  	sliderP = new SuperMap.Geometry.Point(linearRings.tip.x,linearRings.tip.y);
  	var points = [centerPoint,sliderP];
  	var roadLine = new SuperMap.Geometry.LineString(points);//半径线
  	//圆
  	var region = new SuperMap.Geometry.Polygon([linearRings]);
  	var roundFeature = new SuperMap.Feature.Vector(region, null, styleRound);
  	roundFeature.id = "roundFeature";
  	//半径线要素
  	var roadLineFeature = new SuperMap.Feature.Vector(roadLine, null, roundLine);
  	//文本要素
  	var geotextFeature = new SuperMap.Feature.Vector(linearRings.tip);
  	vectorRoundLayer.addFeatures([ roundFeature,centerFeature,geotextFeature,roadLineFeature]);
  	var dataExtent = region.getBounds();
  	map.zoomToExtent(dataExtent);
  	return linearRings;
  }
  // 画圆算法
  function createCircle(centerPointx, centerPointy, radius) {
  	var point2Ds = [];
  	var countPoints = 40;
  	var earthRadius = 5192038.0;
  	var geoText=null;
  	var returnCoords = '',step=0,sx="",sy="";
  	var mapRadius = Angle(radius / earthRadius);
  	for ( var i = 0; i < 360; i+=(360/countPoints)) {
  		var radians = (i + 1) * Math.PI / 180;
  		var mapX = centerPointx + mapRadius * Math.cos(radians);
  		var mapY = centerPointy + mapRadius * Math.sin(radians);
  		var circlePoint = new SuperMap.Geometry.Point(mapX, mapY);
  		sx =step==0?mapX:sx;
  		sy =step==0?mapY:sy;
  		if(step==countPoints-1){
  			returnCoords += mapX+","+mapY+";"+sx+","+sy;
  		}else{
  			returnCoords += mapX+","+mapY+";";
  		}
  		if(i==0){
  			var textHtml = "<div style='background:url(images/slider.png) no-repeat;width:80px;text-algin:center;'>{0}</div>";
  			var text = radius>1000?(radius/1000)+"km":radius+"m";
  			textHtml = textHtml.Format(textHtml,[text]);
  		    geoText = new SuperMap.Geometry.GeoText(mapX, mapY,text);
  		};
  		step++;
  		point2Ds.push(circlePoint);
  	}
  	var linearRing = new SuperMap.Geometry.LinearRing(point2Ds);
  	linearRing.tip = geoText;
  	linearRing.coords = returnCoords;
  	return linearRing;
  }
  function Angle(d) {
  	return Math.abs(d * 180.0 / Math.PI);
  };
//周边查询圆上显示半径
  function queryTip(x,y,queryTip){
      var contentHTML =queryTip;
      var QList = document.getElementById("queryTipPop");
      if(!QList){
      	QList = document.createElement("div");
      	QList.id = "queryTipPop";
      	document.body.appendChild(QList);
      }
      QList.style.top = y+"px";
      QList.style.left = x+"px";
      QList.innerHTML = queryTip;
      showTip();
  }
 
  /*************要素选中事件*********/
  function onFeatureSelect(selected){
  	var attr = selected.attributes,enabled=false;
  	if(!attr)return;
  	var reHtml = "<ul style='list-style:none;padding:5px;'>";
  	var reg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  	for(var a in attr){
  		if(reg.test(a))
  			reHtml += "<li style='float:left;width:50%;margin:3px 0px'><b style='color:#123456;display:inline-block;padding-right:3px;'>"+a+":</b><span style='display:inline-block;min-width:40px;'>"+attr[a].substring(0,11)+"</span></li>";
  	     }
  	reHtml += "</ul>";
  	try{
  		top.layer.close(top.propertyWin);
  	    top.propertyWin = top.layer.open({"title":"查看属性","content":reHtml,"type":1,"shade":0,'offset':['160px','1097px'],area:"auto"});
  	    }catch(e){alert("获取layer插件失败...");};
  }
  /*************取消要素选择*********/
  function onUnFeatureSelect(d,s){
  	
  }