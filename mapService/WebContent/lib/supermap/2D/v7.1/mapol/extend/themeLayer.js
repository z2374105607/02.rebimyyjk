/*
 * @name 专题图功能、操作
 * @date 16/04/09
 * @支持 只支持rest地图服务
 */    
/**
 * 显示动态图例
 * @param service
 */
var themeStyle = {};//动态图例图片样式
function addThemeImg(url){
	        url = url;
    	    var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(url);
    	    getLayersInfoService.events.on({ "processCompleted": function(getLayersInfoEventArgs){
    	    	var subLayers = new Array();
    	    	var li = $("<li></li>");
    	        if (getLayersInfoEventArgs.result) {
    	            {
    	                if (getLayersInfoEventArgs.result.subLayers) {
                            var layers = getLayersInfoEventArgs.result.subLayers.layers;
							if(!layers)return;
    	                	//获取所有图层
    	                    for (var v = 0; v < layers.length; v++) {
    	                    	var layer = layers[v];
    	                        subLayers.push(layer);
    	                    }
                            var legendul = $("<ul class='legend'></ul>");
    	                	//获取有效图层
    	                    for (var k = 0; k <subLayers.length; k++) {
    	                    	var layer = subLayers[k];
    	                        if(layer&&layer.visible){
    	                			var resourcetype=layer.datasetInfo.type;//图层类型点线面
    	                        	//获取专题图图层图例
    	                        	if(layer.ugcLayerType=="THEME"){
    	                        		if(layer.theme.items){
    	                        			for( var m=0;m<layer.theme.items.length;m++){
    	                        				var item=layer.theme.items[m];
    	                        				if(item.visible){
    	                        					var style=item.style;
        	                        				//获取图例
        	                        				var imgsrc=getSymbolByStyle(url,style,resourcetype);
        	                                        var caption = item.caption;
        	                                    	var legendli = $("<li class='item'><img src='"+imgsrc+"' style='width:20px;height:20px;background:rgb("+style.fillForeColor.red+","+style.fillForeColor.green+","+style.fillForeColor.blue+")'></img><a>"+caption+"</a></li>");
        	                                    	themeStyle[caption] = imgsrc;
        	                                    	legendul.append(legendli);
    	                        				}
    	                        			}
    	                        		}
    	                        		//获取标签图例
    	                        		if(layer.theme.type=="LABEL"){
    	                        			var legendname = layer.name;
    		                                legendname = legendname.replace("#",".");
    		                                var imgsrc=url+"/layers/"+legendname+"@@"+getLayersInfoEventArgs.result.name+"/legend";
    		                                var caption = layer.caption;
    		                            	var legendli = $("<li class='item'><img src="+imgsrc+"></img><a>"+caption+"</a></li>");
    		                            	legendul.append(legendli);
    	                        		}
    	                        	}else{
    	                                var legendname = layer.name;
    	                                legendname = legendname.replace("#",".");
    	                              //获取图例
    	                				var imgsrc=getSymbolByStyle(url,layer.style,resourcetype);
    	                                var caption = layer.caption;
    	                            	var legendli = $("<li class='item'><img src="+imgsrc+"></img><a>"+caption+"</a></li>");
    	                            	legendul.append(legendli);
    	                        	}
    	                        }
    	                    }
    	                    $("#dynamicLegend").html("<ul class='cutlineList'>"+legendul[0].innerHTML+"</ul>");
    	                    
    	                    //$(".cutlineDiv").show();
    	                }else{
    	                	alert("没有获取到图层列表");
    	                }
    	            }
    	        }
    	    }});
    	    getLayersInfoService.processAsync();
}

/**
     * 根据样式返回图片
     * @param style
     * @param resourcetype
     * @returns {String}
     */
    function getSymbolByStyle(url,style,resourcetype) {
    	var imageUrl="";
    	if(resourcetype=="REGION"){
    		resourcetype="SYMBOLFILL";
    	}else if(resourcetype=="POINT"){
    		resourcetype="SYMBOLMARKER";
    	}else if(resourcetype=="LINE"){
    		resourcetype="SYMBOLLINE";
    	}
    	var styleParams=JSON.stringify(style);
    	var params={
    		resourceType:resourcetype,
    		style:styleParams,
    		picWidth:30,
    		picHeight:20,
    	};
    	var ImgUrl= url + "/symbol.json?";
    	$.ajax({
    		url:_ProxyUrl+"?url="+ImgUrl,  
    		data:params,
    		type:"post",
			dataType:"json",
    		async:false,
    		success:function(data){
    			if(data!=null){
    				imageUrl=data.resourceImageUrl;
    			}
    			else{
    				imageUrl= "";
    			}
    		}
    	});
    	return imageUrl;
    }
    var themeFlag = true;
    //切换图例显示隐藏
    function switchThemeShowOrHide(callback){
        if(!$("#clCentent").html())addThemeImg();
    	if(themeFlag){//隐藏图例
    		hideThemeDiv(callback);
    	}else{//显示图例
    		showThemeDiv(callback);
    	}
    	themeFlag = !themeFlag;
    }
    //显示图例区域
    function showThemeDiv(callback){
    	callback = callback || function(){};
    	 $(".cutlineDiv").animate({"bottom":"0px","display":"block"},"slow",callback) ;
    };
    //隐藏图例区域
    function hideThemeDiv(callback){
     callback = callback || function(){};
     var offHeight = $(".cutlineDiv").height()+20;
   	 $(".cutlineDiv").animate({"bottom":-offHeight,"display":"none"},"slow",callback);
    };
    /******************十六进制转rgb色值******************/
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    String.prototype.colorRgb = function(){
       var sColor = this.toLowerCase();
       if(sColor && reg.test(sColor)){
           if(sColor.length === 4){
               var sColorNew = "#";
                   for(var i=1; i<4; i+=1){
                       sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));        
                   }
                   sColor = sColorNew;
           }
           //处理六位的颜色值
           var sColorChange = [];
           for(var i=1; i<7; i+=2){
               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));        
           }
           return sColorChange.join(",");
       }else{
           return sColor;        
       }};
 /**********根据参数请求服务端生成动态专题********/
 var themeLayer;
 /*
 function requestTheme(url,datasetNames,dataSourceNames,params){
	     if(!url)return;
	     if(!params)return;
	     var defaultStyle = new SuperMap.REST.ServerStyle({
	    	 fillForeColor: new SuperMap.REST.ServerColor(248, 203, 249),
	    	 lineColor: new SuperMap.REST.ServerColor(0, 0, 0),
	    	 lineWidth: 0.1
	    	 });
	     var themeUniqueItemes=[];
	     //SuperMap.Request.DEFAULT_CONFIG.method = "POST";
		 var themeService = new SuperMap.REST.ThemeService(
				url, 
				 {  
					 eventListeners:{"processCompleted": function(themeRequest){
						 if(themeRequest.result.resourceInfo.id) {
						 themeRequest.id = themeRequest.result.resourceInfo.id;
						 themeRequest.name = datasetNames[0]+"_专题图";
						 themeRequest.url = url;
						 themeCompleted(themeRequest);
						 };
						 }, "processFailed": themeFailed}
				 });
		 for(var i=0;i<params.length;i++){
			 var RGB = params[i].color.colorRgb().split(",");
			 var style = new SuperMap.REST.ServerStyle({
				 fillForeColor: new SuperMap.REST.ServerColor(RGB[0], RGB[1], RGB[2]),
				 lineColor: new SuperMap.REST.ServerColor(0, 0, 0),
				 lineWidth: 0.1
				 });
			 var themeUniqueIteme = new SuperMap.REST.ThemeUniqueItem({
				 unique: params[i].unique,
				 style: style
				 });
			 themeUniqueItemes.push(themeUniqueIteme);
		 }
		 var themeUnique = new SuperMap.REST.ThemeUnique({
			 uniqueExpression: params[0].field,
			 items: themeUniqueItemes,
			 defaultStyle: defaultStyle
			 });
		 var themeParameters = new SuperMap.REST.ThemeParameters({
		 datasetNames: datasetNames,
		 dataSourceNames: dataSourceNames,
		 themes: [themeUnique]
		 });
		 themeService.processAsync(themeParameters);
 }
 function themeCompleted(themeEventArgs) {
	 if(themeEventArgs.result.resourceInfo.id) {
	 themeLayer = new SuperMap.Layer.TiledDynamicRESTLayer(themeEventArgs.name, themeEventArgs.url, {cacheEnabled:false,transparent: true,layersID: themeEventArgs.result.resourceInfo.id}, {"maxResolution": "auto"});
	 themeLayer.events.on({"layerInitialized": addThemeLayer});
	 }
}
 function themeFailed(serviceFailedEventArgs) {
	try{top.layer.msg(serviceFailedEventArgs.error.errorMsg);}catch(e){alert(serviceFailedEventArgs.error.errorMsg);};
	}
 function addThemeLayer() {
	 map.addLayer(themeLayer);
 }
*/
    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 var url5 = "http://127.0.0.1:8090/iserver/services/map-SGS/rest/maps/XianZhuangTu";
 
 var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
 String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));        
                }
                sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));        
        }
        return sColorChange.join(",");
    }else{
        return sColor;        
    }};
	 /******************************生成随机色*******************/
 function randomColor(){
	 return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
 }
function addThemeUnique() {
removeTheme();
var themeService = new SuperMap.REST.ThemeService(url5, {eventListeners:{"processCompleted": themeCompleted, "processFailed": themeFailed},method:"POST"});
var defaultStyle = new SuperMap.REST.ServerStyle({
    fillForeColor: new SuperMap.REST.ServerColor(232,234,243),
    lineColor: new SuperMap.REST.ServerColor(0, 0, 0),
    lineWidth: 0.1
    });
var themeUniqueItemes = [];
var uniques = ["其他草地","城市","裸地","农村道路","旱地","水田","果园","建制镇","铁路用地","公里用地","有林地","其他林地","采矿用地","内陆滩涂","坑塘水面","村庄","沙地","设施农用地","其他园地","沟渠","水工建筑用地","河流水面","盐碱地","灌木林地","水浇地"];
for(var i=0;i<uniques.length;i++){
   var color = randomColor().colorRgb().split(",");
   var style = new SuperMap.REST.ServerStyle({
    fillForeColor: new SuperMap.REST.ServerColor(color[0],color[1],color[2]),
    lineColor: new SuperMap.REST.ServerColor(0, 0, 0),
    lineWidth: 0.1
    });
	var themeUniqueIteme = new SuperMap.REST.ThemeUniqueItem({
     unique: uniques[i],
     style: style
     });
    themeUniqueItemes.push(themeUniqueIteme);
}
var themeUnique = new SuperMap.REST.ThemeUnique({
uniqueExpression: "地类名称",
items: themeUniqueItemes,
defaultStyle: defaultStyle
});
themeParameters = new SuperMap.REST.ThemeParameters({
datasetNames: ["规划图"],
dataSourceNames: ["sgs_qazw_data"],
themes: [themeUnique]
});

themeService.processAsync(themeParameters);
}

function themeCompleted(themeEventArgs) {
	console.log(themeEventArgs);
if(themeEventArgs.result.resourceInfo.id) {
themeLayer = new SuperMap.Layer.TiledDynamicRESTLayer("行政区划_专题图", url5, {cacheEnabled:false,transparent: true,layersID: themeEventArgs.result.resourceInfo.id}, {"maxResolution": "auto"});
themeLayer.events.on({"layerInitialized": addThemeLayer});
}
}
function addThemeLayer() {
map.addLayer(themeLayer);
}

function themeFailed(serviceFailedEventArgs) {
//doMapAlert("",serviceFailedEventArgs.error.errorMsg,true);
alert(serviceFailedEventArgs.error.errorMsg);
}

function removeTheme() {
if (map.layers.length > 1) {
  try{map.removeLayer(themeLayer, true);}catch(e){};
}
}
    
    
    
    
    
    
    
    
    
    
    