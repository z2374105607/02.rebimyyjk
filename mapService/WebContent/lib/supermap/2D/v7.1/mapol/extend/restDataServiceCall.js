var infowin,restLayer,utfgrid,control,
serviceName = "JiQiDiLeiTuBan",url=_restMapUrl+serviceName,layerName="JQDLTB_2@sgs_gcgt_data#1";
var seachLayers=new Array();
var seachlayerNum=1;seachlayerCursor=0;
var seachSierviceType=null;
var rangeQueryLayer,drawPolygon,drawRectangle;
//默认样式
var style = {
  		  fontWeight:"bolder",
  		  fontSize:"14px",
  		  fill: true,
  		  fillColor: "#7B68EE",
  		  fillOpacity:0.4,
  		  stroke: true,
  		  strokeColor:"#8B7B8B",
		  fontColor:"#fefefe"
  		};
//结果面图层样式
var resultFaceLayerStyle = {
		  fontWeight:"bolder",
		  fontSize:"13px",
		  fill: true,
		  fillColor: "#CD853F",
		  fillOpacity:0.3,
		  stroke: true,
		  strokeColor:"#FFFACD",
		  strokeOpacity:0.8,
		  fontColor:"#fefefe"
};
var landLocatStyle={
		strokeColor: "yellow",
		strokeWidth: 5,
		pointerEvents: "visiblePainted",
		fillColor: "yellow",
		fillOpacity: 0
};
function initUTFGrid(){
//注意：pixcell与utfgridResolution两个属性有对应关系，在使用的时候也要注意场景；
//1.其中pixcell为发送给服务端请求utfgrid瓦片的精度，数值越小，精度越高，相应的瓦片大小也就越大；
//2.utfgridResolution为客户端解析瓦片使用的精度，应该与pixcell的值相等，否则会产生位置与属性对应不上的问题；
//3.通常如果UTFGrid图层为面图层，对应的数据量会比较大，为了不影响页面的正常浏览，可以将这两个属性设的大一些；
//4.isUseCache设置是否使用缓存，使用缓存能够提高性能；
utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer", url,
{
layerName: layerName,
utfTileSize: 256,
pixcell: 4,//2
isUseCache: true
},
{
utfgridResolution: 4//2
});
utfgrid.projection = map.getProjection();
control = new SuperMap.Control.UTFGrid({
layers: [utfgrid],
callback: callback,
handlerMode: "move"
});
map.addControl(control);
map.addLayer(utfgrid);
};

var callback = function (infoLookup, loc, pixel) {
closeinfoLookupDiv();
if (infoLookup) {
var info,infoLookupDiv;
for (var idx in infoLookup) {
info = infoLookup[idx];
if (info && info.data) {
	var dom="";
	for(var n in info.data){
		
		dom += "<a style='font-size: 12px; display:inline-block;float:left;margin-right:20px; color: #000000;'><span style='display:inline-block;color:#00868B;padding-right:5px;'>" + n +":</span><span style='display:inline-block;min-width:20px;'>"+ info.data[n] + "</span></a>";
	};
   infoLookupDiv = document.getElementById("infoLookupDiv");
if(infoLookupDiv){
	infoLookupDiv.style.display = "block";
	infoLookupDiv.style.top = (pixel.y-(infoLookupDiv.offsetHeight))+"px";
	infoLookupDiv.style.left = (pixel.x+10)+"px";
	infoLookupDiv.innerHTML = dom;
}else{
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.display = "block";
	div.style.top = (pixel.y-(div.offsetHeight))+"px";
	div.style.left = (pixel.x+10)+"px";
	div.style.zIndex = 80;
	div.id="infoLookupDiv";
	div.innerHTML = dom;
	document.body.appendChild(div);
}
}else{
	try{infoLookupDiv.style.display = "none";infoLookupDiv.innerHTML = "";}catch(e){};
}
}
}
};
function closeinfoLookupDiv() {
	var infoLookupDiv = document.getElementById("infoLookupDiv");
if (infoLookupDiv) {
try {
	infoLookupDiv.innerHTML = "";
	infoLookupDiv.style.display = "none";
}
catch (e) {
}
}
};
//禁用utfgritd
function deactivateUTFgritd(){
	if(control){
		try{
			control.deactivate();
		}catch(e){}
	}
};//激活utfgritd
function activateUTFgritd(){
	if(control){
		try{
			control.activate();
		}catch(e){}
	}
};
//切换UTFgritd图层
function switchUTFgritd(url,layername){
	if(utfgrid){
		utfgrid.url =  url;
		utfgrid.name = layername;
		utfgrid.redraw();
		}
}
function TrimStr(str)
{ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}


function fieldSeach(paramList,isSetresult){
	var sFilter = "";
	var seachList=new Array();
	seachList=paramList.split(",");
	for(var i=0;i<seachList.length;i++){
		if(i==seachList.length-1){
			if(seachList[i].split(":")[1]){
				sFilter +=seachList[i].split(":")[0]+" = '"+TrimStr(seachList[i].split(":")[1])+"'";
			}else{
				sFilter +="SmID >0";
			}
		}else{
			if(seachList[i].split(":")[1]){
				sFilter +=seachList[i].split(":")[0]+" = '"+TrimStr(seachList[i].split(":")[1])+"' and ";
			}else{
				sFilter +="SmID >0 and ";
			}
		}
	}
	var queryParam,queryBySQLParams, queryBySQLService;
	queryParam = new SuperMap.REST.FilterParameter({
		name : layerName,//config.content.layerName[index].text
		attributeFilter : sFilter
	});
	queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
		queryParams : [queryParam]
	});
	queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
        eventListeners: {
        	"processCompleted": function(getFeaturesEventArgs){
        		var i, len, features, feature,CenterLonLat, result = getFeaturesEventArgs.result,id="";_resultPointList="";
        		var count = result.totalCount;
        		maxPage = Math.ceil(count/pageSize);
        		page.clearAssignFactor(_surfaceLayer,{id:"userfeature2"});
				if (result &&result.recordsets.length>0) {
					for(var m=0;m<result.recordsets.length;m++){
						features = result.recordsets[m].features;
						for (i = 0, len = features.length; i < len; i++) {
							feature = features[i];
							if(feature.data.SMID){
								if(isSetresult){
									feature.style = style;
									feature.id="userfeature1";
								}else{
									feature.style = landLocatStyle;
									feature.id="userfeature2";
								}
							}
						}
						if(!_surfaceLayer){
							_surfaceLayer = new SuperMap.Layer.Vector("vectorLayer1");
							map.addLayers([_surfaceLayer]);
						}
						_surfaceLayer.addFeatures(features);
					}
					if(isSetresult){
						_resultPointList=result.recordsets;
						parent.leftPage.showUserResult(result,"gyLayer");
					}
					}
				},
				"processFailed" : function(e){
					alert(e.error.errorMsg);
				}
        }
	});
	queryBySQLService.processAsync(queryBySQLParams);
}

/***************统计范围*************************/
function statistics(coords,params,callBack,model){
	scopeSreachParams.COORDS = scopeSreachParams.COORDS.Format(scopeSreachParams.COORDS,[coords]);
	var bFn = !!model?leftPage.waitting:null;
	//遍历类型
	if(!!params.statisticsTypes&&!!params.statisticsTypes.length){
		for(var i=0;i<params.statisticsTypes.length;i++){
			getConditionSreachResult(_sfsServers[params.statisticsTypes[i]].url,params.statisticsTypes[i],callBack,true,true,bFn,pageIndex,scopPageSize);
		}
	}
}
/*****************************************/
/************rest 范围查询***********/

//矩形查询函数
function drawCompletedCall(obj,filter,callback){
 if(!seachSierviceType){
		seachSierviceType="draw";
 }
 if(rangeQueryLayer==undefined){
	rangeQueryLayer = new SuperMap.Layer.Vector("rangeQuery");
	var isadd = map.addLayer(rangeQueryLayer);
 }
 filter = filter||"1=1";
var feature = obj.feature;
feature.style = style;
rangeQueryLayer.addFeatures(feature);
var queryBounds = feature.geometry.bounds;
var queryParam, queryByBoundsParams, queryService;
queryParam = new SuperMap.REST.FilterParameter({name: layerName,attributeFilter:filter});//FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({queryParams: [queryParam], bounds: queryBounds});//queryParams查询过滤条件参数数组。bounds查询范围
queryService = new SuperMap.REST.QueryByBoundsService(url, {
eventListeners: {
"processCompleted": function(args){processCompleted(args,callback);},
"processFailed": processFailed
}
});
queryService.processAsync(queryByBoundsParams);//向服务端传递参数，然后服务端返回对象
}
//多边形，圆形查询函数
function drawGeometryCompleted(drawGeometryArgs,filter,callback) {
	if(!seachSierviceType){
		seachSierviceType="draw";
	}
	filter = filter||"1=1";
	callback = callback||function(){};
	if(rangeQueryLayer==undefined){
		rangeQueryLayer = new SuperMap.Layer.Vector("rangeQuery");
		var isadd = map.addLayer(rangeQueryLayer);
	}
	var feature = drawGeometryArgs.feature||drawGeometryArgs.features[0];
	feature.style = style;
	rangeQueryLayer.addFeatures(feature);
	var queryParam, queryByGeometryParameters, queryService;
	queryParam = new SuperMap.REST.FilterParameter({name:layerName,attributeFilter:filter});
	queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
	queryParams: [queryParam],
	geometry: feature.geometry,//drawGeometryArgs.
	spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
	});
	queryService = new SuperMap.REST.QueryByGeometryService(url, {
	eventListeners: {
	"processCompleted": function(args){processCompleted(args,callback);},
	"processFailed": processFailed
	}
	});
	queryService.processAsync(queryByGeometryParameters);
	}
//点查询
	function drawPointCompleted(drawGeometryArgs,filter,callback) {
	if(!vectorLayer){
			vectorLayer = new SuperMap.Layer.Vector("drawvectorLayerectorLayer");
			var isadd = map.addLayer(vectorLayer);
	}
	filter = filter||"1=1";
	var feature = drawGeometryArgs.feature;
	feature.style = style;
	var queryParam, queryByGeometryParameters, queryService;
	queryParam = new SuperMap.REST.FilterParameter({name: layerName,attributeFilter:filter});
	queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
	queryParams: [queryParam],
	geometry: drawGeometryArgs.feature.geometry,
	spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
	});
	queryService = new SuperMap.REST.QueryByGeometryService(url, {
	eventListeners: {
	"processCompleted": function(args){processCompleted(args,callback);},
	"processFailed": processFailed
	}
	});
	queryService.processAsync(queryByGeometryParameters);
	}
//查询回调
function processCompleted(queryEventArgs,callback) {
	var i, j, result = queryEventArgs.result,marker;//queryEventArgs服务端返回的对象
	if (result && result.recordsets) {
		if(seachlayerCursor==0){
			_resultList=new Array();
		}
		var recordsets=result.recordsets;
		_resultList.push(recordsets);
		seachlayerCursor++;
		if(seachlayerNum==seachlayerCursor&&seachSierviceType=="draw"){
			seachSierviceType=null;
		}else if(seachSierviceType=="click"&&recordsets[0].features.length>0){
				_resultPointList=recordsets;
				seachSierviceType=null;
		}
		if(!window._surfaceLayer){
			_surfaceLayer = new SuperMap.Layer.Vector("surfaceLayer");
			_surfaceLayer.style = resultFaceLayerStyle;
			var isadd = map.addLayer(_surfaceLayer);
		}
		_surfaceLayer.addFeatures(recordsets[0].features);
		try{callback(recordsets);}catch(e){alert(e);};
	}
}
function processFailed(e) {
	try{
		top.layer.msg(e.error.errorMsg,{icon:2,time:4000});
		}catch(e2){
			if(e.error.errorMsg){
				alert(e.error.errorMsg);
			}else{
				alert("操作失误，请重试!");
			}
		}
}
/***************绘制*********************/
//绘制多边形
function drawMapPolygon(filter,callback) {
	page.ClearMarkers();
	var tempLayer = new SuperMap.Layer.Vector("tempLayer");
	drawPolygon = new SuperMap.Control.DrawFeature(tempLayer,
			SuperMap.Handler.Polygon);
	drawPolygon.events.on({
		"featureadded" : function drawCompleted(eventArgs) {
			drawPolygon.deactivate();
			seachlayerCursor=0;seachlayerNum=seachLayers.length;
			for(var i=0;i<seachLayers.length;i++){
				var serviceAndLayer=new Array();
				serviceAndLayer=seachLayers[i].split(',');
				if(serviceAndLayer.length>0){
					serviceName=serviceAndLayer[0];
					layerName=serviceAndLayer[1];
					url=_restMapUrl+serviceName;
				}
				drawGeometryCompleted(eventArgs,filter,callback);
			}
		}
	});
	map.addControl(drawPolygon);
	drawPolygon.activate();
}
//绘制圆形
function drawMapCircle(filter,callback) {
	page.ClearMarkers();
	var tempLayer = new SuperMap.Layer.Vector("tempLayer");
	drawPolygon = new SuperMap.Control.DrawFeature(tempLayer,
			SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:50}});
	drawPolygon.events.on({
		"featureadded" : function drawCompleted(eventArgs) {
			drawPolygon.deactivate();
			seachlayerCursor=0;seachlayerNum=seachLayers.length;
			for(var i=0;i<seachLayers.length;i++){
				var serviceAndLayer=new Array();
				serviceAndLayer=seachLayers[i].split(',');
				if(serviceAndLayer.length>0){
					serviceName=serviceAndLayer[0];
					layerName=serviceAndLayer[1];
					url=_restMapUrl+serviceName;
				}
				drawGeometryCompleted(eventArgs,filter,callback);
			}
		}
	});
	map.addControl(drawPolygon);
	drawPolygon.activate();
}
//绘制矩形
function drawMapRectangle(filter,callback) {
	page.ClearMarkers();
	var tempLayer = new SuperMap.Layer.Vector("tempLayer");
	drawRectangle = new SuperMap.Control.DrawFeature(tempLayer,
			SuperMap.Handler.Box);
	drawRectangle.events.on({
		"featureadded" : function drawCompleted(eventArgs) {
			drawRectangle.deactivate();
			seachlayerCursor=0;seachlayerNum=seachLayers.length;
			for(var i=0;i<seachLayers.length;i++){
				var serviceAndLayer=new Array();
				serviceAndLayer=seachLayers[i].split(',');
				if(serviceAndLayer.length>0){
					serviceName=serviceAndLayer[0];
					layerName=serviceAndLayer[1];
					url=_restMapUrl+serviceName;
				}
				drawCompletedCall(eventArgs,filter,callback);
			}
		}
	});
	
	map.addControl(drawRectangle);
	drawRectangle.activate();
}
/**
 * 编辑
 */
function editFeature(callback) {
  if(modifyFeature==undefined||modifyFeature==null){
	  modifyFeature = new SuperMap.Control.ModifyFeature(rangeQueryLayer);
	  map.addControl(modifyFeature);
	  rangeQueryLayer.events.on({
			"afterfeaturemodified" : function editFeatureCompleted(event) {
				var geometry = event.feature.geometry;
				var attributes = event.feature.attributes;
				var points = geometry.components[0].components;
				var coords = "";
				for ( var i = 0; i < points.length; i++) {
					if (i != points.length - 1) {
						coords = coords + points[i].x + "," + points[i].y + ";";
					} else {
						coords = coords + points[i].x + "," + points[i].y;
					}
				}
				callback(attributes,coords);
			}
		});
	}
  modifyFeature.activate();
}
//清除多边形图层
function cleardrawPolygon(){
	if(drawPolygon){
		drawPolygon.deactivate();
	}
}
//清除历史任务图层
function clearrangeQueryLayer(){
	if (rangeQueryLayer){
		map.removeLayer(rangeQueryLayer);
		rangeQueryLayer=undefined;
	}
}
//清除编辑控件
function clearModifyFeature(){
	if(modifyFeature){
		map.removeControl(modifyFeature);
		modifyFeature = undefined;
	}
}
//清除绘图控件
function clearDrawRectangle(){
	if (drawRectangle){
		map.removeControl(drawRectangle);
		drawRectangle=undefined;
	}
}
//拓扑分析功能
//拓扑检查执行
function topoSurfaceChecked(){
	var exefun=function(){
		var hide=setTimeout(function(){try{top.layer.msg("可能由于网络原因，检查超时，请重新检查！");return;}catch(e){alert("可能由于网络原因，检查超时，请重新检查！");return;};},s*1000);//等待s秒后无结果，隐藏遮盖层
		postString = "operation=contained&regions="+regions+"&points="+points;
	new net.ContentLoader(topoCheckService,function(){
		var result=this.ajaxObj.responseText.Trim();
		var xmlDom=BrowserAdepter.getDomDocument();
		xmlDom.async = false;
		xmlDom.loadXML(result);
		var records=xmlDom.selectNodes("service");
		if(records!=null&&records.length>0){
			var okp=getTopoPointChecked(xmlDom);
			var oks=getTopoSurfaceChecked(xmlDom);
			if(okp&&oks){
				if(parent.topoResultlayer)
				parent.topoResultlayer.clearMarkers();//清除历史检查记录
				alert("该任务没有任何遗漏或重复的部分...");
			}
			resultAdjust=0;
			$(".waitpage").hide();
			if(hide)clearTimeout(hide);
		}
	},null,null,postString,true);
	};
	setTimeout(exefun,200);//延迟200ms让regions数据更新
}
//添加数据集到restData服务
//执行添加地物
/*
function addFeatureCompleted(feature) {
var targets = document.getElementsByName("fileldValues");
var fieldNames = [],fieldValues = [];
 for(var k=0;k<targets.length;k++){
   fieldNames.push(targets[k].id);
   fieldValues.push(document.getElementById(targets[k].id).value);
 };
var geometry =  new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat),
feature = new SuperMap.Feature.Vector();
feature.geometry = geometry;
feature.style = style;
geometry.id = "addFeatrue_"+Math.random();
var editFeatureParameter,editFeatureService,
features = {
fieldNames:fieldNames,
fieldValues:fieldValues,
geometry:geometry
};
editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
features: [features],
editType: SuperMap.REST.EditType.ADD,
returnContent:true
});
editFeatureService = new SuperMap.REST.EditFeaturesService(url4, {
eventListeners: {
"processCompleted": addFeaturesProcessCompleted,
"processFailed": processFailed
}
});
editFeatureService.processAsync(editFeatureParameter);
}
//添加地物成功
function addFeaturesProcessCompleted(editFeaturesEventArgs){
var addResultIds = editFeaturesEventArgs.result.IDs,
resourceInfo = editFeaturesEventArgs.result.resourceInfo;
if(addResultIds === null && resourceInfo === null) return;

if((addResultIds && addResultIds.length > 0) || (resourceInfo && resourceInfo.succeed)) {
alert("新增地物成功");
id_iframe.src="http://172.16.100.90:8081/geoesb/proxy/d98efb6daf3749068d24a13fcbd2be8d/886e60bb7e014f22a707de23e6f6505d?REQUEST=GetFeature&VERSION=1.0.0&FID=2221&page=1&rp=1000&BOUNDS=-180,-90;180,-90;180,90;-180,90;-180,-90&q="+Math.random();
vectorLayer.removeAllFeatures();
//重新加载图层
layer.redraw();
}else {
alert("新增地物失败");
}
}
function processFailed(e) {
alert(e.error.errorMsg);
}
*/
//叠加分析结果处理函数_段益德
function overlayAnalystCompleted1(args) {
var feature, features = [];
var recordsets=args.result.recordset;
if(!window._surfaceLayer){
	_surfaceLayer = new SuperMap.Layer.Vector("surfaceLayer");
	var isadd = map.addLayer(_surfaceLayer);
}
var landStyle= new Object();
for (var j=0; j<recordsets.features.length; j++) {
	feature = recordsets.features[j];
	
	if(!landStyle[feature.data['地类名称']]){
		landStyle[feature.data['地类名称']]={"features":[feature],"totalArea":parseFloat(feature.data["SMAREA"])};
	}else{
		landStyle[feature.data['地类名称']]["features"].push(feature);
		landStyle[feature.data['地类名称']]["totalArea"]+=parseFloat(feature.data["SMAREA"]);
	}
	
}
for(var k in landStyle){
	var styleColor=randomColor();
	landStyle[k].total = landStyle[k].features.length;
	for(var s=0;s<landStyle[k].features.length;s++){
		landStyle[k].features[s].style={
				  label:""+landStyle[k].features[s].data["地类名称"],
				  fontWeight:"bolder",
				  fontSize:"12px",
				  fill: true,
				  fillColor: styleColor,
				  fillOpacity:0.7,
				  strokeColor:"#000",
				  strokeOpacity:0.5,	
				  fontColor:"#fefefe"
				};
			_surfaceLayer.addFeatures([landStyle[k].features[s]]);
	}
}
overResult(landStyle);
/*console.log(landStyle);*/
if(_surfaceLayer.features.length){
	var bounds = _surfaceLayer.getDataExtent();
	map.zoomToExtent(bounds);
	map.setLayerIndex(_surfaceLayer,map.layers.length-1);
}else{
	try{top.layer.msg("未找到任何匹配结果...",{icon:7,time:2000});}catch(e){alert("未找到任何匹配结果...");};
}
if(selectLayerArray.indexOf(_surfaceLayer)==-1){
	selectLayerArray.push(_surfaceLayer);
	  selectH = new SuperMap.Control.SelectFeature(selectLayerArray,
	  {onSelect:onFeatureSelect,onUnselect:onUnFeatureSelect,repeat:true});
	  selectH.selectStyle=selectStyle;
	  map.addControl(selectH);
	  selectH.activate();
}

}
//叠加分析结果处理函数
	function overlayAnalystCompleted(args) {
		/*console.log(args);*/
	var feature, features = [];
	if(!window._surfaceLayer){
		_surfaceLayer = new SuperMap.Layer.Vector("surfaceLayer");
		_surfaceLayer.style = resultFaceLayerStyle;
		var isadd = map.addLayer(_surfaceLayer);
	}
	for(var i=0;i<args.result.recordset.features.length;i++){
	feature = args.result.recordset.features[i];
	feature.style = resultTobolStyle;
	/*features.push(feature);*/
	}
	_surfaceLayer.addFeatures(features);
	}
	function overlayAnalystFailed(args) {
	try{top.layer.msg(e.error.errorMsg,{icon:2,time:4000});}catch(e){alert(args.error.errorMsg);};
	}