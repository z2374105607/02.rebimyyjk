var SGS = new Object();
SGS.App = function() {
	this.name = "";
};
var _DPI = 96;
SGS.App.config = function() {
	this.type = "";
	this.content = "";
};
// 獲得全局配置文件內容
SGS.App.config.prototype.getConfigs = function() {
	var content = this.content;
	if (!content)
		if ($) {
			$.ajax( {
				url : _resourceFile,
				type : "POST",
				async : false,
				dataType : "xml",
				success : function(data) {
					var dataJson = xmlToJson(data);
					if (dataJson){
						content = dataJson;
						for(var m in content){
							  if(content[m].text){
								  content[m] = content[m].text;
							  }
						 }
						//添加默认参数
						content.mapIndex = content.mapIndex?content.mapIndex:1;
						content.layerList = content.layerList&&content.layerList.layers?content.layerList:{layers:[]};
					}
					else {
						$.messager.alert("错误","获取全局配置文件失败！");
						return;
					}
					if(dataJson.file instanceof Array){
						for ( var i = 0; i < dataJson.file.length; i++) {
							$.ajax( {
								url : dataJson.file[i].attributes.path,
								async : false,
								dataType : 'xml',
								type : "POST",
								success : function(data2) {
									var tempData = xmlToJson(data2);
									content[dataJson.file[i].attributes.node] = tempData[dataJson.file[i].attributes.node];
								}
							});
						};
					}else{
						$.ajax( {
							url : dataJson.file.attributes.path,
							async : false,
							dataType : 'xml',
							type : "POST",
							success : function(data2) {
								var tempData = xmlToJson(data2);
								content[dataJson.file.attributes.node] = tempData[dataJson.file.attributes.node];
							}
						});
					}
					
				}
			});
		}
	return (this.content = content);
};
// 完成配置文件轉換和初始化
SGS.App.config.prototype.initConfig = function() {
	var MapConfigs=null;
	if (!this.content)this.getConfigs();
	if (this.content.map){
		if (this.content.map instanceof Array) {
			MapConfigs = [];
	      for(var i=0;i<this.content.map.length;i++ ){
			var thisMap = this.content.map[i];
			var parserMap = this.parserService(thisMap);
			if(i!=this.content.mapIndex-1){
				for(var s in parserMap.layers){
					parserMap.layers[s].visibility = false;
				}
			}
			MapConfigs.push(parserMap);
		   }
	    }else {
	    	MapConfigs = this.parserService(this.content.map);
				for(var s in MapConfigs.layers){
					MapConfigs.layers[s].visibility = false;
				}
	    }
		_mapIndex = this.content.mapIndex;
     }
	return MapConfigs;
  };
  //解析service xml 到mapConfig
  SGS.App.config.prototype.parserService=function(mapConfig){
	  /***********去除二级目录项************/
	  for(var m in mapConfig){
		  if(mapConfig[m].text){
			  mapConfig[m] = mapConfig[m].text;
		  }
	  }
	  if(mapConfig.attributes){
		  for(var n in mapConfig.attributes){
			  mapConfig[n] = mapConfig.attributes[n];
		  }
	  }
	  var resolutions = (mapConfig.resolutions||this.content.resolutions);
	  try{ window._matrixIdStart = (mapConfig.matrixIdStart||this.content.matrixIdStart);}catch(e){window.matrixIdStart = 1;};
	  try{window._arrResolutions = resolutions.split(",");}catch(e){window._arrResolutions = [];}
	  mapConfig.leverScope = mapConfig.leverScope?mapConfig.leverScope.split("-"):undefined;
	  mapConfig.layers = mapConfig.layers.layer;
	  mapConfig.maxExtent = mapConfig.maxExtent?mapConfig.maxExtent.split(" "):"";
	     if(mapConfig.layers instanceof Array){//多重底图
	    	 for(var i=0;i<mapConfig.layers.length;i++){
	    		 var layer = mapConfig.layers[i];
	    		 layer.url = layer.url.text;
	   		  if(layer.attributes){
	   			  for(var attr in layer.attributes){
	   				  layer[attr] = layer.attributes[attr];
	   			  }
	   			  layer.visibility = !layer.visibility||layer.visibility==="true"||layer.visibility==="TRUE";
	   			  layer.isBaseLayer = !!layer.isBaseLayer||layer.isBaseLayer==="true"||layer.isBaseLayer==="TRUE";
	   		  }
	    		 this.content.layerList.layers.push(doConfigParse(layer));
	    	 }
	     }else{//单层底图
	    	 var layer = mapConfig.layers;
    		 layer.url = layer.url.text;
   		  if(layer.attributes){
   			  for(var attr in layer.attributes){
   				  layer[attr] = layer.attributes[attr];
   			  }
   			  layer.visibility = !layer.visibility||layer.visibility==="true"||layer.visibility==="TRUE";
   			  layer.isBaseLayer = !!layer.isBaseLayer||layer.isBaseLayer==="true"||layer.isBaseLayer==="TRUE";
   		  }
	    	 this.content.layerList.layers.push(doConfigParse(layer));
	     }
		return mapConfig;
  };
//服务xml处理
  function doConfigParse(layer){
		var type = layer.type;
		if(!!config.content.ungainServiceArguments)return layer;
		switch(type.toUpperCase()){
		case "WMTS":
			wmtsParams.url = layer.url;
			wmtsParams.r = Math.random();
			 $.ajax({
			   url:_ProxyUrl,
			   type:"POST",
			   dataType:"xml",
			   data:wmtsParams,
			   async:false,
			   success:function(data){
				  var wmtsOGC = toJson(data);//从xml中获取数据到wmtsOGC对象中
				  var layerId = wmtsOGC.Capabilities.Contents.Layer['ows:Identifier'];//string
				  var name = layer.layer||layerId||mapConfig.name;//map name
				  var style = wmtsOGC.Capabilities.Contents.Layer.Style["ows:Identifier"]||"default";//string
				  var format = layer.format||wmtsOGC.Capabilities.Contents.Layer.Format;//string
				  var nTileMatrixSet = wmtsOGC.Capabilities.Contents.TileMatrixSet;//object
				  var TileMatrix = nTileMatrixSet.TileMatrix;//array
				  var projection = "EPSG"+nTileMatrixSet["ows:SupportedCRS"].substring(nTileMatrixSet["ows:SupportedCRS"].indexOf("::")+1,nTileMatrixSet["ows:SupportedCRS"].length);
				  var BoundingBoxName = projection.substring(projection.indexOf(":")+1, projection.length);
				  var matrixSet = layer.matrixSet||wmtsOGC.Capabilities.Contents.Layer.TileMatrixSetLink.TileMatrixSet||"c";//string
				  var boundingBox = wmtsOGC.Capabilities.Contents.Layer["ows:BoundingBox"]||wmtsOGC.Capabilities.Contents.Layer["ows:WGS"+BoundingBoxName+"BoundingBox"];//object
				  var nLeftBottom = boundingBox["ows:LowerCorner"].split(" ");//array 
				  var nRightTop = boundingBox["ows:UpperCorner"].split(" ");//array
				  var requestEncoding = "KVP";
				  var matrixIds = new Array();
				  var resolutions = new Array();
				  var mapBounds = new Object();
				  mapBounds.leftBottom ={x:nLeftBottom[0],y:nLeftBottom[1]};
				  mapBounds.rightTop = {x:nRightTop[0],y:nRightTop[1]};
				  var idStart = parseInt(_matrixIdStart);
				  if(_arrResolutions&&_arrResolutions.length>0){
	    				for(var i=0;i<_arrResolutions.length-idStart;i++){
	    					resolutions.push(parseFloat(_arrResolutions[idStart+i]));
	    				}
					//从wmts服务xml中计算出比例尺
	    			}else if(TileMatrix&&TileMatrix.length>0){
			    		for(var j=0;j<TileMatrix.length;j++){
			    			//从wmts服务xml中提取比例尺
			    			if(TileMatrix[j].Resolution){
			    				resolutions.push(parseFloat(TileMatrix[j].Resolution));
			    			//从变量中获取比例尺	
			    			}else{
			    				var scale = TileMatrix[j].ScaleDenominator;
			    				if(scale){
			    					var resolution = 0.0254 * parseFloat(scale) / _DPI;
			    					resolutions.push(resolution);
			    				}
			    			}
			    		}
			    	}
		    		for(var i=0;i<resolutions.length;i++){
		    			matrixIds[i]={identifier: i+idStart};
		    		}
					layer.layer = layerId;
					layer.name = name;
					layer.style = style;
					layer.matrixSet = matrixSet;
					layer.format = format;
					layer.resolutions = resolutions;
					layer.matrixIds = matrixIds;
					layer.mapBounds = mapBounds;
					layer.requestEncoding = requestEncoding;
					layer.projection = projection;
					layer.type = type;
			   },
			   error:function(e){
					console.log("获取服务元数据失败！原因：");
					console.log(e);
			   }
			 });
			break;
		case "REST":
			break;
		case "WMS":
			break;
			default:
			break;
		}    
		return layer;
  }