var styleMap = {
		city:{
			"opacity":"0.7",
			fill:"r(0.3,0.3)#fff-#71fb98:30-#20be8c",//#fff-#94bbf0:30-#418cf0
			"cursor":"pointer",
			"fill-opacity":0.7,
			"font-family":"微软雅黑",
			"font":"#fff",
			"font-size":"12px",
			"stroke-width":0.8,
			"stroke-opacity":0.8,
			"stroke":"#cecece"
		},town:{
			"opacity":"0.7",
			fill:"r(0.3,0.3)#fff-#f08066:30-#ff9900",
			"cursor":"pointer",
			"fill-opacity":0.7,
			"font-family":"微软雅黑",
			"font":"#fff",
			"font-size":"12px",
			"stroke-width":0.8,
			"stroke-opacity":0.8,
			"stroke":"#cecece"
		},vill:{
			"opacity":"0.7",
			fill:"r(0.3,0.3)#fff-#71fb98:30-#20be8c",
			"cursor":"pointer",
			"fill-opacity":0.7,
			"font-family":"微软雅黑",
			"font":"#fff",
			"font-size":"12px",
			"stroke-width":0.8,
			"stroke-opacity":0.8,
			"stroke":"#cecece"
		}
	};
var titleMap = {
		province:"全国",
		city:"全省",
		area:"全市"
};
//聚散点样式表
var clusterStyles = {
		all:[
              {
                  "count":9,//子节点小于等于15的聚散点
                  "style":{
                      fontColor:"#FEFEFE",
                      graphic:true,
                      externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                      graphicWidth:38,
                      graphicHeight:38
                  }
              },
        {
            "count":20,//子节点小于等于20大于9的聚散点
            "style":{
            	fontColor:"#FEFEFE",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                graphicWidth:46,
                graphicHeight:46
            }
        },
        {
            "count":"moreThanMax",// 子节点大于50的聚散点
            "style":{
            	fontColor:"#404040",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                graphicWidth:58,
                graphicHeight:58
            }
        }
],
		city:[
              {
                  "count":9,//子节点小于等于15的聚散点
                  "style":{
                      fontColor:"#FEFEFE",
                      graphic:true,
                      externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                      graphicWidth:38,
                      graphicHeight:38
                  }
              },
        {
            "count":20,//子节点小于等于50大于15的聚散点
            "style":{
            	fontColor:"#FEFEFE",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                graphicWidth:46,
                graphicHeight:46
            }
        },
        {
            "count":"moreThanMax",// 子节点大于50的聚散点
            "style":{
            	fontColor:"#FEFEFE",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_b.png",
                graphicWidth:58,
                graphicHeight:58
            }
        }
],town:[
        
        {
            "count":9,//子节点小于等于15的聚散点
            "style":{
                fontColor:"#FEFEFE",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_r.png",
                graphicWidth:38,
                graphicHeight:38
            }
        },
  {
      "count":20,//子节点小于等于50大于15的聚散点
      "style":{
    	  fontColor:"#FEFEFE",
          graphic:true,
          externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_r.png",
          graphicWidth:46,
          graphicHeight:46
      }
  },
  {
      "count":"moreThanMax",// 子节点大于50的聚散点
      "style":{
    	  fontColor:"#FEFEFE",
          graphic:true,
          externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_r.png",
          graphicWidth:58,
          graphicHeight:58
      }
  }
],vill:[
        {
            "count":9,//子节点小于等于15的聚散点
            "style":{
                fontColor:"#FEFEFE",
                graphic:true,
                externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_g.png",
                graphicWidth:38,
                graphicHeight:38
            }
        },
  {
      "count":20,//子节点小于等于50大于15的聚散点
      "style":{
    	  fontColor:"#FEFEFE",
          graphic:true,
          externalGraphic:window.location.protocol +"//"+window.location.hostname+":"+window.location.port+window.location.pathname+_liburl+"../theme/images/mashup_g.png",
          graphicWidth:46,
          graphicHeight:46
      }
  },
  {
      "count":"moreThanMax",// 子节点大于50的聚散点
      "style":{
    	  fontColor:"#FEFEFE",
          graphic:true,
          externalGraphic:window.location.origin+window.location.pathname+_liburl+"../theme/images/mashup_g.png",
          graphicWidth:58,
          graphicHeight:55
      }
  }
]
};
//聚散点默认样式
var defaultClusterStyle = function(type,status){
	type = type||"city";
	status = status||false;
	var style = {};
	if(status){
		style = {
				pointRadius: 4,
				fillColor:{city:"#418cf0",town:"#dc3912",vill:"#ff9900"}[type],
				strokeColor:"#ccc"
		};
	}else{
		style = {
				pointRadius: 4,
				fillColor:"#ccc",
				strokeColor:"#ccc"
		};
	};
	return style;
};
//专题图例样式
var cutlineStyleMap = {
		city:{
		  "1":"#f7fbff",
		  "<3":"#c6dbef",
		  "<4":"#9ecae1",
		  "<6":"#6baed6",
		  "<8":"#4292c6",
		  "<11":"#2171b5",
		  ">11":"#1862a0"
		},
		town:{
			"1":"#99000d",
			  "<7":"#fcbba1",
			  "<14":"#fc9272",
			  "<15":"#fb6a4a",
			  "<20":"#ef3b2c",
			  "<25":"#cb181d",
			  ">25":"#99000d"
		},
		vill:{
			"1":"#005a32",
			  "<5":"#c7e9c0",
			  "<12":"#a1d99b",
			  "<21":"#74c476",
			  "<27":"#41ab5d",
			  "<33":"#238b45",
			  ">33":"#005a32"
		}
};
//marker  样式
var markerStyle = {
		defaultStyle:{
			city:[{
				style:function(level){
					return {
					"width":{"province":"6px","city":"9px","area":"9px","vill":"9px"}[level]||"9px",
					"height":{"province":"6px","city":"9px","area":"9px","vill":"9px"}[level]||"9px",
					"opacity":1,
					"backgroundColor":"#ff0000",
					"borderRadius":"50%",
					"border":"0px solid #aaa"
					};
				}
			}],town:[{
				style:function(level){
					return {
					"width":{"province":"5px","city":"7px","area":"7px","vill":"7px"}[level]||"7px",
					"height":{"province":"5px","city":"7px","area":"7px","vill":"7px"}[level]||"7px",
					"opacity":1,
					"backgroundColor":"#f98d03",
					"borderRadius":"50%",
					"border":"0px solid #aaa"
				    };
				}
			}],vill:[{
				style:function(level){
					return {
					"width":{"province":"5px","city":"7px","area":"7px","vill":"7px"}[level]||"7px",
					"height":{"province":"5px","city":"7px","area":"7px","vill":"7px"}[level]||"7px",
					"opacity":1,
					"backgroundColor":"#269600",
					"borderRadius":"50%",
					"border":"0px solid #aaa"
					};
				}
			}]	
		},
		hoverStyle:{
			city:[{
				style:function(level){
					return {
					"width":{"province":"11px","city":"12px","area":"12px","vill":"22px"}[level]||"11px",
					"height":{"province":"11px","city":"12px","area":"12px","vill":"22px"}[level]||"11px",
					"backgroundColor":"#ff0000",
					"opacity":0.7,
					"borderRadius":"50%",
					"boxShadow":"0 1px 10px rgba(59,233,233,1)",
					"border":"0px solid #ff0000"
					};
				}
			}],town:[{
				style:function(level){
					return {
					"width":{"province":"9px","city":"10px","area":"10px","vill":"10px"}[level]||"9px",
					"height":{"province":"9px","city":"10px","area":"10px","vill":"10px"}[level]||"9px",
					"backgroundColor":"#f98d03",
					"borderRadius":"50%",
					"boxShadow":"0 1px 10px rgba(59,233,233,1)",
					"border":"0px solid #333"
					};
				}
			}],vill:[{
				style:function(level){
					return {
					"width":{"province":"9px","city":"10px","area":"10px","vill":"10px"}[level],
					"height":{"province":"9px","city":"10px","area":"10px","vill":"10px"}[level],
					"backgroundColor":"#269600",
					"borderRadius":"50%",
					"boxShadow":"0 1px 10px rgba(59,233,233,1)",
					"border":"0px solid #333"
					};
				}
			}]	
		},
		clickStyle:{
			city:[{
				style:function(level){
					return {
					"width":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[level]||"7px",
					"height":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[level]||"7px",
					"backgroundColor":"#ff0000",
					"borderRadius":"50%",
					//"msTransform":"translate(0px,-10px) scale(1) translateZ(0px)",
					"animationTimingFunction":"ease-in-out",
					"animation-name":"breathe",
					"animationDuration":"700ms",
					"animationIterationCount":"infinite",
					"animationDirection":"alternate"
					};
				}
			}],town:[{
				style:function(level){
					return {
					"width":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[areaType]||"7px",
					"height":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[areaType]||"7px",
					"backgroundColor":"#f98d03",
					"borderRadius":"50%",
					"animationTimingFunction":"ease-in-out",
					"animation-name":"breathe",
					"animationDuration":"700ms",
					//"msTransform":"translate(0px,-10px) scale(1) translateZ(0px)",
					 "animationIterationCount":"infinite",
					 "animationDirection":"alternate"
					};
				}
			}],vill:[{
				style:function(level){
					return {
					"width":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[areaType]||"7px",
					"height":{"province":"7px","city":"14px","area":"14px","vill":"14px"}[areaType]||"7px",
					"backgroundColor":"#269600",
					"borderRadius":"50%",
					"animationTimingFunction":"ease-in-out",
					"animation-name":"breathe",
					"animationDuration":"700ms",
					//"msTransform":"translate(0px,-10px) scale(1) translateZ(0px)",
					 "animationIterationCount":"infinite",
					 "animationDirection":"alternate"
					};
				}
			}]	
		}
};
var themeLayerLineStyle = {
		zdtl:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#402432"
		},sczl:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#8100ff"
		},dyh:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#ff01ff"
		},cmgd:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#fdbe01"
		},mcc:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#fe0000"
		},cjyh:{
			shadowBlur: 0,
            strokeWidth:2,
            fillColor: "#00ffb3"
		},dnyh:{
			shadowBlur: 0,
            strokeWidth: 2,
            fillColor: "#0069b7"
		},hsscl:{
			shadowBlur: 0,
            strokeWidth: 2,
            fillColor: "#040949"
		}
	};
/*****************图层查询结果风格配置*************/
var resultStyleMap = {
	rootStyle:{//基础样式，所有要素默认公用样式
		"POINT":{},
		"LINE":{},
		"REGION":{}
	},
	"湖州_城区文保单位_2013":{//湖州_城区文保单位_2013风格配置
		defaultStyle:{},
		exceptionStyle:[//特例配置
		   {
			innerExpression:"SMID>20",//内部表达式
			outerExpression:"privateMap.map.zoom>8&&privateMap.map.zoom<15",//外部表达式
			style:{}
		   },
		   {
			   expression:"SMID>20",//表达式
			   style:{}
		   }
		]
	}
	
}
