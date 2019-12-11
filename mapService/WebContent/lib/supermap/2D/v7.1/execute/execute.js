var _startLonlat,_endLonlat,_approach=[];//起始点/终点/途径点
var maekerRoot = "images/markers/";
var markerIcon=["end_1.png","start_1.png","approach_1.png"];
var pathAnalyzeMsg = {
	1:{
	    "unsetting":"未设定起点位置...",
	    "unaffirm":"不能精确定位起点位置..."
	},
	0:{
		"unsetting":"未设定终点位置...",
	    "unaffirm":"不能精确定位终点位置..."
	},
	2:{
		"unsetting":"未设定途径点位置...",
	    "unaffirm":""
	}
};
//周边查询,
function roundSreach(sql,marker,callback){
	rightMenuPosition=marker || rightMenuPosition;
	 var linearRings =  drawCircle(rightMenuPosition.lon, rightMenuPosition.lat,defaultRound);
	 page.bufferSreach(linearRings.coords,null,encodeURI(sql),null,function(data){
		 if(callback){
				if(typeof callback == 'function'){
					callback(data);
				}else{
					console.log(callback+'必须为fuction类型！');
				}
			}
	 });
 }
  //地名地址智能提示
  function addressAutoHint(ele,module,ps,selCallBack){
	  if(top._ele&&top._ele!=ele){closeInfowinNotAnchor();}
	  top._ele=ele;
	  top._win = top.mapFrame || this;
	  var mod = module||"map";
	  var keyWord = inputKeyDownEvent(ele);
	  if(!keyWord)return;
	  var result=page.addressFuzzyQuery(keyWord);
	  var resultJson = toJson(result);
	  var addressList = addrFilter(resultJson);
	  if(!addressList.length){closeInfowinNotAnchor();return;};
	  var position=ps||findPosition(ele) ;
	  var content="",eleWidth = ele.offsetWidth,len=0,text="";
		  content='<div onmouseover="$(top._ele)[0].blur();" class="addressHintDiv" style="width:'+eleWidth+'px;">';
			  for(var i=0;i<addressList.length;i++){
				  var address = addressList[i].Name.split(config.content.splitChara);
				  var title = "";
				  len = (address[1]||address[0]).length;
				  text = len*13>eleWidth?(address[1]||address[0]).substring(0,(eleWidth/13)-1)+"...":(address[1]||address[0]) ;
				  if(config.content.addressHint.toBoolean()){title = address[0];};
				  content+='<p><a class="addressList" onclick="top._win.selectAddress(\''+(address[1]||address[0])+'\','+selCallBack+');" title="'+title+'">'+text+'</a></p>';
			  }
		  content+='</div>';
		  switch(mod){
		  case "map"://在地图上显示
			  if(!_infowinNotAnchor){
				  var pixcel = new SuperMap.Pixel((position.left-5),(position.top+28));
				  var lonlat = page.oMap.getLonLatFromPixel(pixcel);
				  openInfoWinNotCloseNotAnchor(lonlat.lon,lonlat.lat,content);
			  }else{
				  _infowinNotAnchor.contentHTML =  content;
				  _infowinNotAnchor.contentDiv.style.overflow = "hidden";
				  _infowinNotAnchor.contentDiv.innerHTML = content;
				  _infowinNotAnchor.updateSize();
			  }
			  break;
		  case "dom"://在普通窗口上显示
			  var capacityAddressList = top.document.getElementById("capacityAddressList");
			  if(!capacityAddressList){
				  var tDiv = top.document.createElement("div");
				  tDiv.id="capacityAddressList";
				  tDiv.style.position = "absolute";
				  tDiv.style.width = eleWidth+"px";
				  tDiv.style.zIndex = 999999;
				  if(position.top&&!isNaN(position.top))tDiv.style.top = (parseFloat(position.top)+ele.offsetHeight) + "px";
				  if(position.right&&!isNaN(position.right))tDiv.style.right = parseFloat(position).right + "px";
				  if(position.left&&!isNaN(position.left))tDiv.style.left = parseFloat(position.left) + "px";
				  tDiv.innerHTML = content;
				  top.document.body.appendChild(tDiv);
			  }else{
				  if(position.top&&!isNaN(position.top))capacityAddressList.style.top = (parseFloat(position.top)+ele.offsetHeight) +"px";
				  if(position.left&&!isNaN(position.left))capacityAddressList.style.left = parseFloat(position.left)+"px";
				  if(position.right&&!isNaN(position.right))capacityAddressList.style.right = parseFloat(position.right)+"px";
				  capacityAddressList.innerHTML = content;
				  capacityAddressList.style.width = eleWidth+"px";
				  capacityAddressList.style.display = "block";
				  
			  }
			  break;
		  }
  }
  function selectAddress(name,selCallBack){
	  top._ele.value=name;
	  top._ele.text=name;
	  if(selCallBack&&typeof selCallBack=="function")selCallBack();
	  closeInfowinNotAnchor();
  }
  /*
   * 手绘路径分析
   * 
   */
  var pathIcon;//起始点、终止点图标
  function pathAnalyzeCourse(i){
	  	closeInfoWin();
	  	hiddenRightMenu();
	    var markImg = maekerRoot+markerIcon[parseInt(i)];
		var addressName = getNearAddress();
		fillContent(null,"");
	  	var popupHTML = document.getElementById("userPopup").innerHTML;
	  	openUserNoClosedPopup(rightMenuPosition.lon,rightMenuPosition.lat,popupHTML);
	  	if(addressName){fillTitle(addressName+"附近");}else{fillTitle("周边查询...");}
	  	fillContent(null,"");
		switchTool(i);
 switch(i){
	  case "1"://起点
		  _startLonlat = rightMenuPosition;
		  break;
	  case"0"://终点
		  _endLonlat = rightMenuPosition;
		  break;
	  case "2"://途径点
		  if(_endLonlat||_startLonlat)closeInfoWin();
		  closeInfoWin();
		  _approach.push(rightMenuPosition);
		  break;
 }
 try{if(i!="2"){
	 page.clearAssignFactor(getResouceLayer("marker"),{id:"pathPoint"+i},"0");
	 
 }
 }catch(e){};
 
 _infoMarker = page.AddMarkers({
  		map:page.oMap,
  		layer:getResouceLayer("marker"),
  		type:"marker",
  		attr:{name:addressName,type:"pathPoint",toolIns:i},
  		id:"pathPoint"+i,
  		group:"pathPoint",//分组(用来确定分组)
  		size:"30,30",
  		icon:markImg,
  		smx:rightMenuPosition.lon,
  		smy:rightMenuPosition.lat
  	},{
  		click:function(){closeInfoWin();fillContent(null,"");openInfoWinNotClosed(this);switchTool(this.attr.toolIns);fillContent(null,"");fillTitle(this.attr.name+"附近");}
  	});  
	if(_startLonlat&&_endLonlat){
  	  	closeInfoWin();
  	  	try{page.clearAssignFactor(getResouceLayer("marker"),{id:"unid"},"0");}catch(e){};
  	    pathAnylsFn();
  	  }
  };
  
  /*****
   * 
   * 
   * 路径分析函数
   * 
   * 
   * ****/
  function pathAnylsFn(){
		if(getResouceLayer("line")){
	  		getResouceLayer("line").removeAllFeatures();
	  	}
	 	page.pathAnalyze(_startLonlat,_endLonlat,_approach,function(result){
  	  		var pathResult = $(result);
  				var exception = pathResult.find("message").text();
  				if(exception){
  					alert("没有找到合适的路线");
  					return;
  				}
  				//在地图上绘制查询到的路径
  				 var pros = pathResult.find("PathAnalystCoords").find("DCPoint2D");
  			   var items  = [];
  			   pros.each(function(i){
  				   var xPoint = $(this).find("x").text();
  				   var yPoint = $(this).find("y").text();
  				   items.push(xPoint+","+yPoint);
  				   
  			   },null,null);
  			   page.DrawFeature({
  				   map:map,
  				   layer:getResouceLayer("line"),
  				   type:"line",
  				   arrCoords:items
  			   });
  			 _infoMarker = null;
  			  //展示路径分析结果
  			   try{parent.subpage.location.href=getRootPath_web(top)+"/subpages/result/showResult.jsp?k=pathAnaly&s="+Math.random();}catch(e){}
  	  	});
  }
  /******地址过滤器**********/
  function addrFilter(addressList){
	  var sum = parseInt(addressList.STDics.sum);
	  var result = [];
	  if(sum>1){
		  for(var s in addressList.STDics.STDic){
			  if(addressList.STDics.STDic[s].Type ==config.content.matchType){
				  result.push(addressList.STDics.STDic[s]);
				  if(result.length==addressListShowCount)break;
			  };
		  }
	  }else if(sum==1){
		  if(addressList.STDics.STDic.Type ==config.content.matchType){
			  if(result.length==addressListShowCount)return result;
			  result.push(addressList.STDics.STDic);
		  };
	  }
	  return result;
  }
  
  /*
   *i 分析点模式 1 起点     0 终点    2 途径点 
   *value 查询参数
   * archetype  查询数据原型  默认poi (指定单击后弹气泡中的显示内容)
   * 气泡中地名地址的定位查询
   */
  function interestPointQuery(i,value,archetype){
	  if(!value)return;
	  sql = config.content.poiURLFilter+"="+"'"+value+"'";
	  archetype = archetype || "poi";
	  var ins="";
	  if(i!="2"){
		  if(i=="0"){
			  ins=1;
		  }else if(i=="1"){
			  ins=0;
		  }
		 try{
			 page.clearAssignFactor(getResouceLayer("marker"),{id:"pathPoint"+i},"0");
		 }catch(e){};
	  }
	  switch(i){
	  case "1"://起始点
		  _startLonlat = "";
		  _approach=[];
		  break;
	  case"0"://终点
		  _endLonlat = "";
		  _approach=[];
		  break;
	  case "2"://途径点
		  break;
	  }
	  page.interestPointSeach(encodeURI(sql),function(data){
		  if(!data.rows.length){top.layer.msg(pathAnalyzeMsg[i].unsetting,{icon: 2});return;}
		  if(data.rows.length>1){top.layer.msg(pathAnalyzeMsg[i].unaffirm,{icon: 2});return;}
		  closeInfoWin();
		  try{if(i!="2")page.clearAssignFactor(getResouceLayer("marker"),{id:"pathPoint"+i},"0");}catch(e){};
		  data.rows[0].toolIns = i;
		  data.rows[0].dataType="marker";
		  data.rows[0].archetype=_infoMarker?_infoMarker.attr.archetype:archetype;
		  var markImg = maekerRoot+markerIcon[parseInt(i)];
		   page.AddMarkers({
			  map:page.oMap,
			  layer:getResouceLayer("marker"),
			  type:"marker",
			  icon:markImg,
			  attr:data.rows[0],
			  id:"pathPoint"+i,
			  size:"32,32",
			  smx:data.rows[0].SMX,
			  smy:data.rows[0].SMY
		  },{
			  click:function(){
				  closeInfoWin();
				  fillTitle(this.attr[config.content.poiURLFilter]);
			      fillContent(this,null,this.archetype);
				  openInfoWinNotClosed(this);
				  switchTool(this.attr.toolIns);
				  }
		  });
		  
		  markImg = maekerRoot+markerIcon[parseInt(ins)];
		  //_infoMarker.attr.toolIns = ins;
		 /* page.AddMarkers({
			  map:page.oMap,
			  layer:getResouceLayer("marker"),
			  type:"marker",
			  icon:markImg,
			  attr:_infoMarker.attr,
			  id:"pathPoint"+ins,
			  size:"32,32",
			  smx:_infoMarker.lonlat.lon,
			  smy:_infoMarker.lonlat.lat
		  },{
			  click:function(){
				  closeInfoWin();
				  var titleFiled = "",ttype=this.attr.archetype;
				  var tconfig = config.content.element;
				  for(var k=0;k<tconfig.length;k++){
					  if(tconfig[k].attributes.type==ttype){
						  titleFiled = tconfig[k].titleFiled.text;
					  }
				  }
				  fillTitle(this.attr[titleFiled]||this.attr["name"]);
			      fillContent(this,null,ttype);
				  openInfoWinNotClosed(this);
				  switchTool(this.attr.toolIns);
				  
				  }
		  });*/
			  map.panTo(getResouceLayer("marker").markers[0].getLonLat());
				var lonlat = new SuperMap.LonLat(data.rows[0].SMX,data.rows[0].SMY);
				 switch(i){
				  case "0"://起始点
					  _endLonlat = lonlat;
					  break;
				  case"1"://终点
					  _startLonlat = lonlat;
					  break;
				  case "2"://途径点
					  _approach.push(lonlat);
					  break;
				  }
				 pathAnylsFn();
	  });
  }
  
  function initpageIndexAndclearMaker(){
	  pageIndex=1;
	  _startLonlat=null;
	  _endLonlat=null;
	  _approach=[];
	  rightMenuPosition=null;
	  try{parent.subpage.fanhui();}catch(e){
		  closeInfoWin(); 
	  }
  }