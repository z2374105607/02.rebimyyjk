var imgPath = _liburl+"../mapol/mapTool/mapToolImgs/default/",imgType="png";
var layout = {
  position:{top:"80px",right:"35px"},
  direction:"lengthway"//lengthway/landscape//纵向排序、横向排序
};
var mapToolCfg={
  "zoomout":{
	  sequence:1,
	  show:true,
	  title:"放大",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.ZoomOut"
  },//放大
  "zoomin":{
	  sequence:2,
	  show:true,
	  title:"缩小",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.ZoomIn"
  },//缩小
  "pan":{
	  sequence:3,
	  show:true,
	  title:"平移",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.Pan"
  },//平移
  "clear":{
	  sequence:8,
	  show:true,
	  title:"清除",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.ClearMarkers"
  },//清除
  "full":{
	  sequence:0,
	  show:true,
	  title:"全图",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.ViewEntire"
  },//全图
  "scner":{
	  sequence:6,
	  show:false,
	  title:"全屏",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:""
  },//全屏
  "measuredistance":{
	  sequence:4,
	  show:true,
	  title:"测距",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.MeasureDistance"
  },//测距
  "measurearea":{
	  sequence:7,
	  show:true,
	  title:"测面",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:"page.MeasureArea"
  },//侧面
  "drawpoin":{
	  sequence:9,
	  show:false,
	  title:"绘点",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:""
  },//绘点
  "drawline":{
	  sequence:10,
	  show:false,
	  title:"绘线",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:""
  },//绘线
  "drawsurface":{
	  sequence:11,
	  show:false,
	  title:"绘面",
	  icon_n:"",
	  icon_h:"",
	  clickHandle:""
  }
  }//绘面