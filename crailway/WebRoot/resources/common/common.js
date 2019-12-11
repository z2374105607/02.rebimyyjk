var v=0,ready=false;
var flag=0;
var flagstr="";
var isrun=0;
$(function(){
	if(localStorage.getItem("skinOriginal2")==2){
		$("#bottom-area").hide();
		document.getElementById("smallsize").style.display="none";
		document.getElementById("maxsize").style.display="block";
	}else{
	    $("#bottom-area").show();
		document.getElementById("smallsize").style.display="block";
		document.getElementById("maxsize").style.display="none";	
	}	
	$("#smallsize").click(function (e) {
		hidediv();
		});
	$("#maxsize").click(function (e) {
		document.getElementById("bottom-area").style.display="block";
		document.getElementById("smallsize").style.display="block";
		document.getElementById("maxsize").style.display="none";
		localStorage.setItem("skinOriginal2",1);
		});

	$("body").on('click','[data-stopPropagation]',function (e) {
		 if(document.all){  //只有ie识别
		        e.cancelBubble=true;
		    }else{
		        e.stopPropagation();
		    }
	  });
	 //项目信息导航切换
	 $('.nav>li>a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});
	 //公司信息显示及隐藏
	 $("#left-area .l-icon").bind("click",function(){
			if($("#left-area .info-panel").is(":hidden")){
				$("#left-area .info-panel").show();
			}else{
				$("#left-area .info-panel").hide();
			}
		});
	//专题图切换
	 $("#right-area .special").bind("click",function(){
		 var type = $(this).attr("data-ref");
		 $("#right-area .special").css("textDecoration","none").removeAttr("data-state");
		 $(this).css("textDecoration","underline").attr("data-state","active");
		 switch(type){
		 case 1:
		 case '1':
			 $("#left-bottom").hide();
			 mapFrame.page.hideMarkersByExpression();
			 mapFrame.page.ClearMarkers(null,function(){
			 top.$(".legend-ul").hide();
			 top.$("#maplbhot").hide();
			 });
			//清除专题marker
			 mapFrame.page.clearThemeLayerMarkers();
			 mapFrame.page.clearMarkerLayerMarkers();
			 switch(flag){
			 case 0:
				 delayLoadClosureMarkers();
				 break;
			 case 1:
				 clickFatherCompany(flagstr);
				 break;
			 case 2:
				 clickSonCompany(flagstr);
				 break;
			 }
			 showGuoData();
			 break;
		 case 2:
		 case '2':
			 $("#left-bottom").show();
			 mapFrame.page.ClearMarkers(null,function(){
			   top.$("#maplbhot").hide(); 
			 });
			//清除专题marker
			 mapFrame.page.clearThemeLayerMarkers();
			 mapFrame.page.clearMarkerLayerMarkers();
			 switch(flag){
			 case 0:
				 delayLoadMarkers();
				 break;
			 case 1:
				 clickFatherCompany(flagstr);
				 break;
			 case 2:
				 clickSonCompany(flagstr);
				 break;
			 }
			 showGuoData();
			 break;
			 
		 case 3:
		 case '3':
			 $("#left-bottom").hide();
			 mapFrame.page.hideMarkersByExpression();
			 //初始化热力图
			 mapFrame.page.ClearMarkers(null,function(){
			 top.$(".legend-ul").hide();
			 });
			 //清除专题marker
			 mapFrame.page.clearThemeLayerMarkers();
			 mapFrame.page.clearMarkerLayerMarkers();
			 switch(flag){
			 case 0:
				
				 delayLoadHeatLayer();
				 break;
			 case 1:
				 
				 clickFatherCompany(flagstr);
				 break;
			 case 2:
				
				 clickSonCompany(flagstr);
				 break;
			 }
			 showGuoData();
			 break;
		 case 4:
		 case '4':
			 $("#left-bottom").show();
			 mapFrame.page.hideMarkersByExpression();
			 //初始化热力图
			 mapFrame.page.ClearMarkers(null,function(){
			 top.$(".legend-ul").hide();
			 });
			 mapFrame.page.clearThemeLayerMarkers();
			 $("#maplbhot").hide();
			 if(!config.other.dataListTheme){
				 updateLocalCityDataList(initThemeMarkers);
			 }else{
				 initThemeMarkers();
			 }
			 break;
		 default:
			 break;
		 }
	 });
	 //年份控制
	 $("#axisControl li").bind("click",function(){
		 var type = $(this).attr("handle");
		 if(!type)return;
		 switch(type.toUpperCase()){
		 case "LAST"://上一项
			 alert("上一项");
			 break;
		 case "NEXT"://下一项
			 alert("下一项");
				var text = $(this).text();
				var arrtext=[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018];
				for(i=0;i<arrtext.length;i++){
					if(arrtext[i]!=text){
						$("#"+Number(arrtext[i])).popover('hide');
					}
				}				
				var active = !!$(this).has("p").length;
				if(!active){
					$("#axisUl li p").remove();
					$(this).append("<p></p>");
					var year = this.innerText;
					selectYear = year;
					var theme = $("#right-area .special[data-state]").attr("data-ref");
					theme = theme ||"";
					switch(theme){
					case 1://聚合图
					case "1":
						var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.starttime.substring(0,4)<"+year,config.other.tempMarkers);
						mapFrame.page.addClusterLayer(markers,{pHtml:top.$("#marker-menu").prop("outerHTML")});
						break;
					case 2://麻点图
					case "2":
						mapFrame.page.hideMarkersByExpression();
						mapFrame.page.showMarkersByExpression("attr.starttime.substring(0,4)<"+year);
						break;
					case 3://热力图
					case "3":
						var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.starttime.substring(0,4)<"+year,config.other.tempMarkers);
						mapFrame.page.createHeatLayer({featureWeight:"state"},markers);
						break;
					case 4://等级图
					case "4":
						mapFrame.page.clearMarkerLayerMarkers();
						mapFrame.page.clearThemeLayerMarkers();
						
						updateLocalCityDataListDate(year,initThemeMarkers);
						
						break;
					
					}
				}
			 break;
		 case "PLAY"://切换
			 isrun=1;
			 $(this).attr("handle","pause").attr("data-original-title","暂停");
			 $(this).find("img").attr("src","resources/imgs/icon_pause.png");
			 config.other.pAnier = setInterval(progessAnimation,config.timer.carousel.interval);
			 break;
		 case "PAUSE"://暂停
			 isrun=2;
			 $(this).attr("handle","play").attr("data-original-title","自动切换");
			 $(this).find("img").attr("src","resources/imgs/icon_play.png");
			 try{window.clearInterval(config.other.pAnier);window.clearTimeout(config.other.delayer);}catch(e){};
			 break;
		 };
	 });
	 //主题开关
	 $("#right-area i.theme-on-off").bind("click",function(){
		 var statu = this.className.indexOf("toggle-on")!=-1;
		 if(statu){//切换到关闭状态
			 $("#right-area i.theme-on-off").removeClass("fa-toggle-off").addClass("fa-toggle-on");
			 $(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
		 }else{//切换到打开状态
			 $("#right-area i.theme-on-off").removeClass("fa-toggle-on").addClass("fa-toggle-off");
			 $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
		 }
	 });
	 //点击所有公司
	$("#left-area .panel-heading").bind("click",function(){

		showGuoData();

		flag=0;
		flagstr="";

		var theme = $("#right-area .special[data-state]").attr("data-ref");
		theme = theme ||"";
		switch(theme){
		case 1://聚合图
		case "1":
			var markers = mapFrame.page.getMarkersByExpFromMarkers("",config.other.tempMarkers);
			mapFrame.page.addClusterLayer(markers);
			break;
		case 2://麻点图
		case "2":
			mapFrame.page.hideMarkersByExpression();
			mapFrame.page.showMarkersByExpression("","");
			break;
		case 3://热力图
		case "3":
			var markers = mapFrame.page.getMarkersByExpFromMarkers("",config.other.tempMarkers);
			mapFrame.page.createHeatLayer({featureWeight:"state"},markers);
			break;
		}
	});
	 //延迟加载聚合专题图数据
	// delayLoadClosureMarkers();
	 //延迟加载麻点图
	 delayLoadMarkers();
	 //初始化自定义地图操作监听事件函数
	 initMyMapEvents();
	 //初始化集团列表
	 initCompanyList();
	 //初始化年份轮播控件事件
	 updateLocalDataList(showGuoData);//初始化统计数据
	 $('#input_search').bind('input propertychange', function() {  
		 updateLocalDataList(initSerach);
		});  
	 
});
function hidediv(){
	document.getElementById("bottom-area").style.display="none";	//改变div1的display属性
	document.getElementById("smallsize").style.display="none";
	document.getElementById("maxsize").style.display="block";
	localStorage.setItem("skinOriginal2",2);
	//alert(localStorage.getItem("skinOriginal2"));
}
console.log(window.screen.width); //当前屏幕分辨率
setTimeout(function(){
	//$("#left-area .panel").height(window.screen.height-(window.screen.height*0.1666+382)+"px");
	$("#left-area .badge").parent().css({
	"display": "block",
	"background-color": "#f9f9fb",
	"height": "5vh",
	"line-height": "5vh",
	"text-decoration": "none",
	"padding-left": "0.5vw",
	"color": "#0289e3",
	"font-size": "14px",
	"border-bottom": "1px solid #ddd",
	"border-top": "3px solid #0289e3",
	  "cursor"  :"pointer"
	});
	$("#left-area ul:first-child ul").first().addClass("kai");

},1000);
//初始化麻点图图例
function initLegend(){
	var legendDom = $("#accordion");
	if(legendDom&&legendDom.length){legendDom.show();return;}
	if(!style)return;
	var legendContent = $("#left-bottom");
	//legendContent.height(window.screen.height*0.1666+"px");
	var outHtml = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="false">{d}</div>';
	var tempHtml = '',k=1; var oImg="";
	for(var i in style){
		if(style[i].img!=""){
			oImg='<img src="'+style[i].img+'"/>';
		}else {
			oImg="";
		}
		//图例组标题
		tempHtml += '<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOne"><h4  class="panel-title"  onclick="switchMarkerStyle(\''+i+'\',this)"><i + class="fa '+(style[i].icon||"")+'" style="'+(style[i].css||"")+'"></i> '+oImg
        +'<a  role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+k+'" aria-expanded="'+(style[i].selected||"false")+'" aria-controls="collapse'+k+'" class="collapsed">';
		tempHtml += '';//添加标题图标挪到图例组标题下第一句的后面。
		tempHtml += (style[i].alias||i)+'</a><span style="float:right;"><i data-ref="style.'+i+'" style="color:#1b7fd8;" class="markerThemeBtn fa '+
		(style[i].selected&&style[i].selected=="true"?'fa-toggle-on':"fa-toggle-off")+'" title="图例开关..."></i></span></h4></div>';//标题结束
		tempHtml += '<div id="collapse'+k+'" class="panel-collapse collapse '
		+(style[i].selected&&style[i].selected=="true"?'in':"")
		+'" role="tabpanel" aria-labelledby="headingOne" ="'+(style[i].selected||"false")+'" '
		+(!style[i].selected||style[i].selected=="false"?'style="height:0px;"':"")+'>'
	          +'<div class="panel-body" id="usual_cutline">';//添加图例容器开头部分
		var options = style[i].options;
		tempHtml += '<ul data-ref="'+i+'">';
		for(var n=0;n<options.alias.length;n++){
			var exp = "";
			if(options.tran){
				for(var s in options.tran){
					var exs = s.replace(new RegExp("\&\&","gm"),"\&\&"+options.field);
					exs = exs.replace(new RegExp("\\|\\|","gm"),"\|\|"+options.field);
					if(options.tran[s]==n){exp = options.field+exs;break; };
				}
			}else{
				exp = options.field+"=="+n;
			};
			tempHtml += '<li field="'+options.field
			+'" exp="'+exp+'" onclick="legendSwitch(this)" title="'+options.alias[n]+'">'
			if(i=='进度预警'){
				if(n==0){
					tempHtml +='<i class="fa fa-warning" style="color:#eaf902;"></i>'
				}else if(n==1){
					tempHtml +='<i class="fa fa-warning" style="color:#02a9f9;"></i>'
				}else{
					tempHtml +='<i class="fa fa-warning" style="color:#f90202;"></i>'
				}
			}else{
				tempHtml +='<img src="'+options.styles[n]().bgImg+'">'
			}
			
			
			tempHtml +=options.alias[n]+'</li>';    //<span style="background:'+(options.styles[n]().legendBg+";"||"#6060f7;")+'"></span>
		}
		tempHtml += '</ul></div></div></div>';
		k++;
	}
	tempHtml += '</div>';
	outHtml = outHtml.replace("{d}",tempHtml);
	legendContent.append(outHtml).show();
	//switchMarkerStyle();
};
var x1,y1,name1;
function searchXY(x,y,name,projectid){
	x1=x;
	y1=y;
	name1=name;
	mapFrame.page.searchmarkerLayer.clearMarkers();
	if(!config.other.legendTheme)initThemeParams();
		var options = config.other.legendTheme.options;
		config.other. tempMarkers2 = [];
		try{style = options.styles[1]();}catch(e){style = {display:"none"};};
			var marker = mapFrame.page.addVectorMarkers2(x1,y1,{label:name1,style:style},null,{
			"click":function(){
				document.getElementById("marker-menu").innerHTML="<li>"+name+"</li><li onclick='javascript:parent.gotoMap(\""+projectid+"\")'><img src='../crailway/resources/imgs/scaner.png'/>进入项目场景</li>" +
				"<style>ul#marker-menu{list-style:none;padding:0;border:1px solid #c6d9fb;margin:0;}"+
"ul#marker-menu li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}"+
"ul#marker-menu li:last-child{border-bottom-width:0}"+
"ul#marker-menu li:hover{background-color:#f3f3f3;}"+
"ul#marker-menu li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>";
			top.mapFrame.openInfoWinNotCloseNotAnchor(this.lonlat.lon,this.lonlat.lat,top.$("#marker-menu").prop("outerHTML"),null,this);
			}
	});
	config.other.tempMarkers2.push(marker);
	mapFrame.page.setMapCenterAndLevel(x1,y1,5);
};
function search(){
	 updateLocalDataList(initSerach);
	mapFrame.page.searchmarkerLayer.clearMarkers();
	 if(!config.other.legendTheme)initThemeParams();
	 var options = config.other.legendTheme.options;
//	 var field = options.field;
//	 var tran = options.tran;
//	 var style = null;
//		var ids = "";
//		if(!!tran){
//			for(var k in tran){
//				var t = transform(list[i][field],k,tran[k]);
//				if(t!=null){ids = t;break;}
//			}
//		}else{
//			ids = bean[field];
//		}
	 config.other. tempMarkers2 = [];
	try{style = options.styles[1]();}catch(e){style = {display:"none"};};
	var name=name1;
	var marker = mapFrame.page.addVectorMarkers2(x1,y1,{label:name1,style:style},null,{
		"click":function(){
			document.getElementById("marker-menu").innerHTML="<li>"+this.attr.name+"</li><li onclick='javascript:parent.gotoMap(\""+this.attr.projectid+"\")'><img src='../crailway/resources/imgs/scaner.png'/>进入项目场景</li>" +
			"<style>ul#marker-menu{list-style:none;padding:0;border:1px solid #c6d9fb;margin:0;}"+
"ul#marker-menu li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}"+
"ul#marker-menu li:last-child{border-bottom-width:0}"+
"ul#marker-menu li:hover{background-color:#f3f3f3;}"+
"ul#marker-menu li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>";
			top.mapFrame.openInfoWinNotCloseNotAnchor(this.lonlat.lon,this.lonlat.lat,top.$("#marker-menu").prop("outerHTML"),null,this);
		}
	});
	config.other.tempMarkers2.push(marker);
}
//初始化搜索
function initSerach(dataList){
	$(".info-panel").hide();
	$(document).bind('click',function(){ 
			$('#gov_search_suggest').css('display','none'); 
	}); 
	var list = dataList||config.other.dataList;
	var suggestWrap = $('#gov_search_suggest');
	var listName=[];
	var realList=[];
	for(i=0;i<list.length;i++){
		listName.push(list[i]);
	}
	if(listName.length<=0){ 
	  suggestWrap.hide(); 
	  return; 
	 }
	//搜索过滤字符
	 var SEARCH_KEY = $('#input_search').val();
	 for(j=0;j<listName.length;j++){
		 if(listName[j].name.indexOf(SEARCH_KEY) != -1 ){
			 realList.push(listName[j]);
		 }
	 }
	 //往搜索框下拉建议显示栏中添加条目并显示 
	 var li; 
	 var tmpFrag = document.createDocumentFragment(); 
	 suggestWrap.find('ul').html(''); 
	 //var searchUl = $("#searchContent");
	 for(var i=0; i<realList.length; i++)
	 { 
	  li = document.createElement('LI'); 
	  li.innerHTML = realList[i]; 
	  var html = '<li onclick=\"searchXY('+realList[i].x+","+realList[i].y+",'"+realList[i].name+"\'"+",'"+realList[i].projectid+"\'"+')\">'+realList[i].name+'</li>';
	  $("#searchContent").append(html);
	  //tmpFrag.append(html);
	  //tmpFrag.appendChild(li); 
	 } 
	  suggestWrap.find('ul').append(tmpFrag); 
	  suggestWrap.show(); 
	  //为下拉选项绑定鼠标事件 
	  suggestWrap.find('li').hover(function(){ 
	   suggestWrap.find('li').removeClass('hover'); 
	   $(this).addClass('hover'); 
	  },function(){ 
	   $(this).removeClass('hover'); 
	  }).bind('click',function(){ 
	   $(this).find("span").remove(); 
	   $('#input_search').val(this.innerHTML); 
	   suggestWrap.hide(); 
	  }); 
};

//初始化热力图图例
function initHeatLegend(){
	var outHtml = "<div id='maplbhot' class='maplb-hot'>"
				  +"<p class='t'>高</p><p class='p'>"
				  +"<img src='resources/imgs/map_lb_a.png'></p>"
				  +"<p class='t'>低</p></div>";
	if(!$("#maplbhot").length){
		$("body").append(outHtml);
	}
	$("#maplbhot").show();
};
var optionStyle;
var themeMaker;
var djthtml="";
function initThemeMarkers(dataList){
	var list = dataList||config.other.dataListTheme;
	 var options = optionStyle||(optionStyle=window.eval("styleTheme.level.options"));
	 var field = options.field;
	 var tran = options.tran;
	 
	 	djthtml	= '<h5 class="text-left" style="margin-top:0;font-weight:bold;"></h5>';
	 	var companyArr = ["项目所属城市"];
		for(i = 0; i < companyArr.length; i++){
			if(i==0){
				djthtml += '<h6 class="text-left"><b><p>'+companyArr[i]+'<img src="resources/imgs/top-down-icon.png" alt="" style="margin-left: 5px;" class="inon-down inon-down2"></p></b><div class="actives block">';
			}else {
				djthtml += '<h6 class="text-left"><b><p>'+companyArr[i]+'<img src="resources/imgs/top-down-icon.png" alt="" style="margin-left: 5px;" class="inon-down"></p></b><div class="actives">';
			}
			for(j=0;j<list.length;j++){
				djthtml += '<div class="row font-size10" style="margin:10px 0;">'
					+ '<div class="col-lg-4 col-md-4 col-sm-4 R-Text-Style" title="'+list[j].name+'" style="padding-left:0; height: 3.4vh;line-height: 3.4vh;">'+list[j].name+''+':</div>'
					+ '<div class="col-lg-7 col-md-7 col-sm-7 A" style="padding-right:0;height: 3.4vh;line-height: 3.4vh;">';

				var data = [];
				for(p=0;p<config.other.dataList.length;p++){
					if(config.other.dataList[p].citycode==list[j].code){
						data.push(config.other.dataList[p]);	
					}
				}
				for(k = 0;k<data.length;k++){

					djthtml += '<span title="'+data[k].name+'" style="width:auto;padding: 0; color: #666;font-size: 14px;" onclick=\"searchXY('+data[k].x+","+data[k].y+",'"+data[k].name+"\'"+')\">'+data[k].name+'</span>  ';

				}
						djthtml += '</div></div>';
						if(j==list.length-1){
							djthtml +='</div></h6>';
						}
			}
		
		}
		$("#quanguo").html(djthtml);
		$(".text-left p").unbind('click').click(function(e){
			$(this).parent().next().toggle();
			$(this).children("img").toggleClass('inon-down2');
			e.stopPropagation();
			});
		$(".A").hover(function(){
			$(this).addClass("auto")
		},function(){
			$(this).removeClass("auto")
		})
	 for(var i=0;i<list.length;i++){
		 if(list[i].programNum == 0) continue;
		try{
			
			style = $.inArray(list[i].code,config.xianLevelCity) == -1?options.styles[0](5):options.styles[1](5);
			style.width = (list[i].programNum+10)+"px";
			style.height = (list[i].programNum+10)+"px";
			
		
		}catch(e){style = {display:"none"};};
		
		var tempXY =mapFrame.page.projectionTransformation(list[i].x,list[i].y,["EPSG:4326","EPSG:3857"]);
		
		var marker = mapFrame.page.addVectorMarkersTheme(tempXY.x,tempXY.y,{label:list[i].name+":"+list[i].programNum,style:style},list[i],{
			"click":function(){
				console.log(this);
				var that = this;
				
				console.log(selectYear);
				$.ajax({
					url:"manager/check/getZtitemsByCity",
					data:{"cityCode":this.attr.code,"date":selectYear||new Date().getFullYear()},
					success:function(data){
						if(themeMaker){
							mapFrame.page.clearMarkerLayerMarkers();
							themeMaker.setOpacity(1);
							
						}
						initMarkersNew(data);
						
						themeMaker = that;
						that.setOpacity(0);
						var tempXY1 =mapFrame.page.projectionTransformation(that.attr.x,that.attr.y,["EPSG:4326","EPSG:3857"]);
						mapFrame.page.setMapCenterAndLevel(tempXY1.x,tempXY1.y,9);
					
					},
					error:function(){
						alert("查询该地区项目出错");
					}
				});
			}
		});
		config.other.tempMarkers.push(marker);
	}
	initLegend();
}
function projectionTransformation(x,y,transformArag){
	if(!x||!y||!transformArag)return {x:x,y:y};
	var lonlat = new SuperMap.LonLat(parseFloat(x),parseFloat(y));
	if(transformArag instanceof Array&&transformArag.length==2){
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
//初始化麻点图
function initMarkers(dataList){
	 var list = dataList||config.other.dataList;
	 config.other.tempMarkers = [];
	 if(!config.other.legendTheme)initThemeParams();
	 var options = config.other.legendTheme.options;
	 var field = options.field;
	 var tran = options.tran;
	 var style = null;
	 for(var i=0;i<list.length;i++){
		var ids = "";
		if(!!tran){
			for(var k in tran){
				var t = transform(list[i][field],k,tran[k]);
				if(t!=null){ids = t;break;}
			}
		}else{
			ids = list[i][field];
		}
		try{style = options.styles[ids]();}catch(e){style = {display:"none"};};
		var marker = mapFrame.page.addVectorMarkers(list[i].x,list[i].y,{label:list[i].name,style:style},list[i],{
			"click":function(){
				document.getElementById("marker-menu").innerHTML="<li>"+this.attr.name+"</li><li onclick='javascript:parent.gotoMap(\""+this.attr.projectid+"\")'><img src='../crailway/resources/imgs/scaner.png'/>进入项目场景</li>" +
						"<style>ul#marker-menu{list-style:none;padding:0;border:1px solid #c6d9fb;margin:0;}"+
"ul#marker-menu li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}"+
"ul#marker-menu li:last-child{border-bottom-width:0}"+
"ul#marker-menu li:hover{background-color:#f3f3f3;}"+
"ul#marker-menu li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>";
				top.mapFrame.openInfoWinNotCloseNotAnchor(this.lonlat.lon,this.lonlat.lat,top.$("#marker-menu").prop("outerHTML"),null,this);
				
				
			}
		});
		config.other.tempMarkers.push(marker);
	}
	initLegend();
};

//初始化麻点图marker信息不隐藏
function initMarkersNew(dataList){
	 var list = dataList||config.other.dataList;
	 config.other.tempMarkers = [];
	 if(!config.other.legendTheme)initThemeParams();
	 var options = config.other.legendTheme.options;
	 var field = options.field;
	 var tran = options.tran;
	 var style = null;
	 for(var i=0;i<list.length;i++){
		var ids = "";
		if(!!tran){
			for(var k in tran){
				var t = transform(list[i][field],k,tran[k]);
				if(t!=null){ids = t;break;}
			}
		}else{
			ids = list[i][field];
		}
		try{style = options.styles[ids]();}catch(e){style = {display:"none"};};
		var name=list[i].name;
		var marker = mapFrame.page.addVectorMarkersNew(list[i].x,list[i].y,{label:list[i].name,style:style},list[i],{
			"click":function(){
				document.getElementById("marker-menu").innerHTML="<li>"+this.attr.name+"</li><li onclick='javascript:parent.gotoMap(\""+this.attr.projectid+"\")'><img src='../crailway/resources/imgs/scaner.png'/>进入项目场景</li>" +
				"<style>ul#marker-menu{list-style:none;padding:0;border:1px solid #c6d9fb;margin:0;}"+
"ul#marker-menu li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}"+
"ul#marker-menu li:last-child{border-bottom-width:0}"+
"ul#marker-menu li:hover{background-color:#f3f3f3;}"+
"ul#marker-menu li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>";
				top.mapFrame.openInfoWinNotCloseNotAnchor(this.lonlat.lon,this.lonlat.lat,top.$("#marker-menu").prop("outerHTML"),null,this);
			}
		});
		config.other.tempMarkers.push(marker);
	}
	initLegend();
};
//初始化聚散图
function initCluster(dataList){
	var datas = dataList||config.other.dataList;
	mapFrame.page.addClusterLayer(datas,{pHtml:top.$("#marker-menu").prop("outerHTML")});
};
//初始热力图
function initHeat(dataList){
	var datas = dataList||config.other.dataList;
	 mapFrame.page.createHeatLayer({featureWeight:"state"},datas);
	 initHeatLegend();
};
//延迟初始化marker

function delayLoadMarkers(){
	if(ready){
		updateLocalDataList(initMarkers);
	}else{
	  setTimeout(function(){
			try{ready=top.mapFrame.page.oMap?true:false;}catch(e){}
			delayLoadMarkers();
		},500);
	}
}
//延迟初始化聚散图
function delayLoadClosureMarkers(){
	if(ready){
		updateLocalDataList(initCluster);
	}else{
	  setTimeout(function(){
			try{ready=top.mapFrame.page.oMap?true:false;}catch(e){}
			delayLoadClosureMarkers();
		},500);
	}
};
//延迟初始化热力图
function delayLoadHeatLayer(){
	if(ready){
		updateLocalDataList(initHeat);
	}else{
	  setTimeout(function(){
			try{ready=top.mapFrame.page.oMap?true:false;}catch(e){}
			delayLoadHeatLayer();
		},500);
	}
};
//初始化集团公司列表
function initCompanyList(){
	updateLocalCompanies(function(data){
		updateLocalDataList(function(data2){
			var totalall=data2.length;
			var list = formatCompanyList(data);
			if(list&&typeof list=="object"&&list!={}){
				var pojTotal = 0;
				var outHtml = "<ul>";
				for(var k in list){
					pojTotal  += list[k].pojnum;
					var sublist = list[k].sublist;
					var subnum = list[k].subnum;
					var pojnum = list[k].pojnum;
					var newfatheritem=[];
					for(var m=0;m<data2.length;m++){
						if(data2[m].fcompany==k){
							newfatheritem.push(data2[m]);
						}
					}
					outHtml += "<li><a style='cursor: pointer;' onclick=clickFatherCompany('"+k+"',this)>"+k+"<span class='badge'>"+newfatheritem.length+"</span> <img src='resources/imgs/top-down-icon.png' class='inon-down' alt=''></a>";
					if(subnum){
						outHtml += "<ul style='display: none;'>";
						for(var i=0;i<sublist.length;i++){
							var newsonitem=[];
							for(var n=0;n<data2.length;n++){
								if(data2[n].scompany==sublist[i].scompany){
									newsonitem.push(data2[n]);
								}
							}
							var scompany = sublist[i].scompany||"";
							var lflag = scompany.length>7;
							scompany = lflag?scompany.substring(0,6)+"...":scompany;
							if(i==sublist.length-1&&i%2==0){
								outHtml += "<li style='width:100%;' title='"+sublist[i].scompany+"'><a"+" onclick=clickSonCompany('"+sublist[i].scompany+"')"+(lflag?" data-toggle='tooltip' title='"+sublist[i].scompany+"'":"")+">"+scompany+"</a><span>（"+(newsonitem.length||0)+"）</span></li>";
							}else{
								outHtml += "<li title='"+sublist[i].scompany+"'><a"+" onclick=clickSonCompany('"+sublist[i].scompany+"')"+(lflag?" data-toggle='tooltip' title='"+sublist[i].scompany+"'":"")+">"+scompany+"</a><span>（"+(newsonitem.length||0)+"）</span></li>";
							}
						};
						outHtml += "</ul></li>";
					}else{
						outHtml += "</li>";
					}
				}
				outHtml += "</ul>";
	            $("#info-panel-body").html(outHtml);
	            $("#pojtotal").text(totalall);
	            $("[data-toggle='tooltip']").tooltip();
			}
			});
		});	
};
function getGroupChartsData(company,state){
	var seriesName = company;
	var legendData = ["未开始","施工中","已竣工","已销售"];
	var setChartData = new Array();
	var chartDataValue = [0,0,0,0];
	var companyArr = new Array();//分公司信息
	var companyValue = new Array();
	//var companyNameArr = new Array();//分公司信息
	var departmentArr = new Array();//部门信息
	var departmentValue = new Array();//部门值
	var proArr = new Array();//项目信息
	var i = 0;
	var total = 0;
	$.each(config.other.dataList,function(index,obj){
			if(state != 0 && obj.state != state){
				return true;
			}
			total += 1;
			var typeName = "";
			if(obj.state == 1){
				typeName = "未开始";
			}else if(obj.state == 2){
				typeName = "施工中";
			}else if(obj.state == 3){
				typeName = "已竣工";
			}else if(obj.state == 4){
				typeName = "已销售";
			}
			if(companyArr.indexOf(obj.fcompany) == -1){
				companyArr[i] = obj.fcompany;
				companyValue[i] = 1;
				
				departmentArr[i] = [obj.scompany];
				departmentValue[i] = [1];
				proArr[i] = [[obj]];
				i++;
				
			}else{
				var fi = companyArr.indexOf(obj.fcompany);
				companyValue[fi] += 1;
				var sonArr = departmentArr[fi];
				
				if(sonArr.indexOf(obj.scompany) == -1){
					var sl = sonArr.length;
					sonArr[sl] = obj.scompany;
					departmentValue[fi][sl] = 1;
					proArr[fi][sl] = [obj];
				}else{
					var si = sonArr.indexOf(obj.scompany);
					departmentValue[fi][si] += 1;
					proArr[fi][si][proArr[fi][si].length] = obj;
				}
			}
			if(legendData.indexOf(typeName)>0){
				chartDataValue[legendData.indexOf(typeName)] = chartDataValue[legendData.indexOf(typeName)]+1;
			}
	});
	var html = '<h5 class="text-left" style="margin-top:0;font-weight:bold;">集团公司('+total+')</h5>';

	for(i = 0; i < companyArr.length; i++){
		html += '<h6 class="text-left"><b>'+companyArr[i]+'('+companyValue[i]+')</b></h6>';
		
		for(j=0;j<departmentArr[i].length;j++){
			html += '<div class="row font-size10 none" style="margin:10px 0;">'
				+ '<div class="col-lg-3 col-md-3 col-sm-3" style="padding-left:0;">'+departmentArr[i][j]+'('+departmentValue[i][j]+'):</div>'
				+ '<div class="col-lg-9 col-md-9 col-sm-9" style="padding-right:0;">';
			for(k = 0;k<proArr[i][j].length;k++){
				html += '<div class="col-lg-3 col-md-3 col-sm-3">'+proArr[i][j][k]+'</div>';
			}
			html += '</div></div>';
		}
	}
	if(state == 0){
		$("#quanguo").html(djthtml);
		for(j=0;j<legendData.length;j++){
			var obj = new Object();
			obj.name = legendData[j];
			obj.value = chartDataValue[j];
			setChartData[j] = obj;
		}
		setChartDataTest("echart",seriesName,legendData,setChartData);
	}else if(state == 1){
		$("#newProgram").html(html);
	}else if(state == 3){
		$("#finishProgram").html(html);
	}else if(state == 4){
		$("#saleProgram").html(html);
	}


	
}

function positionMarker(name){
	
	var o;
	$.each(config.other.dataList,function(index,obj){
		
		if(obj.name == name){
			
			top.mapFrame.page.addPositionMaker(obj.x,obj.y,5,{label:obj.name,style:config.other.legendTheme.options.styles[1]()},'http://localhost:8080/crailway/resources/imgs/zuobiao.jpg',25,25);
			
			/*leave = 6;
			pMarker = mapFrame.page.addVectorMarkers(obj.x,obj.y,{label:obj.name,style:style.常规项目.options.styles[0]()},obj,{
				"click":function(){
					top.mapFrame.openInfoWinNotCloseNotAnchor(obj.y,obj.x,top.$("#marker-menu").prop("outerHTML"),null,this);
				}
			});
			top.mapFrame.page.getMarkersByAttr("");
			o = obj;
			var marker = top.mapFrame.page.getMarkersByAttr("attr.name="+name);
			//alert(marker.getLonLat());
			leave = 6;
			alert("22222"+config.other.legendTheme.options.styles[0]().width);
			mapFrame.page.changeMarkersStyleByExp("attr.name=='"+name+"'",config.other.legendTheme.options.styles[0]());
			*/
			return true;
		}
	});
	
	
	
	
}
//获取分公司统计数据level  
function getCompanyChartsData(company,state,level){
	var seriesName = company;
	//var legendData = ["未开始","施工中","已竣工","已销售"];
	var legendData = ["未开始","施工中","已竣工"];
	var setChartData = new Array();
	var chartDataValue = [0,0,0];
	var chartColor = ['#53b3fc','#f7b455','#99cf6a'];
	var companyArr = new Array();//分公司信息
	var companyValue = new Array();
	//var companyNameArr = new Array();//分公司信息
	var departmentArr = new Array();//部门信息
	var departmentValue = new Array();//部门值
	var proArr = new Array();//项目信息
	var i = 0;
	var total = 0;
	$.each(config.other.dataList,function(index,obj){
			if(level == 2){//父级公司
				if(obj.fcompany != company) return true;
			}else if(level == 3){//子公司
				if(obj.scompany != company) return true;
			}/*else if(level == 0){//	全部
				
			}else
				return false;*/
			
			if(state != 0 && obj.state != state){
				return true;
			}
			
			total += 1;
			var typeName = "";
			if(obj.state == 1){
				typeName = "未开始";
			}else if(obj.state == 2){
				typeName = "施工中";
			}else if(obj.state == 3){
				typeName = "已竣工";
			}else if(obj.state == 4){
				typeName = "已销售";
			}
			if(companyArr.indexOf(obj.fcompany) == -1){
				companyArr[i] = obj.fcompany;
				companyValue[i] = 1;
				
				departmentArr[i] = [obj.scompany];
				departmentValue[i] = [1];
				proArr[i] = [[obj]];
				i++;
				
			}else{
				var fi = companyArr.indexOf(obj.fcompany);
				companyValue[fi] += 1;
				var sonArr = departmentArr[fi];
				
				if(sonArr.indexOf(obj.scompany) == -1){
					var sl = sonArr.length;
					sonArr[sl] = obj.scompany;
					departmentValue[fi][sl] = 1;
					proArr[fi][sl] = [obj];
				}else{
					var si = sonArr.indexOf(obj.scompany);
					departmentValue[fi][si] += 1;
					proArr[fi][si][proArr[fi][si].length] = obj;
				}
			}
			if(legendData.indexOf(typeName)>-1){
				chartDataValue[legendData.indexOf(typeName)] = chartDataValue[legendData.indexOf(typeName)]+1;
			}
	});
	var html = '<h5 class="text-left" style="margin-top:0;font-weight:bold;">集团公司('+config.other.dataList.length+')</h5>';
	for(i = 0; i < companyArr.length; i++){
		if(i==0){
			html += '<h6 class="text-left"><b><p>'+companyArr[i]+'('+companyValue[i]+')<img src="resources/imgs/top-down-icon.png" alt="" style="margin-left: 5px;" class="inon-down inon-down2"></p></b><div class="actives block">';
		}else {
			if(companyArr[i]!=null&&companyArr[i]!="null"){
				html += '<h6 class="text-left"><b><p>'+companyArr[i]+'('+companyValue[i]+')<img src="resources/imgs/top-down-icon.png" alt="" style="margin-left: 5px;" class="inon-down"></p></b><div class="actives">';
			}else{
				html += '<h6 class="text-left"><b><p>'+"新增项目"+'('+companyValue[i]+')<img src="resources/imgs/top-down-icon.png" alt="" style="margin-left: 5px;" class="inon-down"></p></b><div class="actives">';
			}
		}

		
		for(j=0;j<departmentArr[i].length;j++){
			html += '<div class="row font-size10" style="margin:10px 0;">'
				+ '<div class="col-lg-4 col-md-4 col-sm-4 R-Text-Style" title="'+departmentArr[i][j]+'('+departmentValue[i][j]+')" style="padding-left:0; height: 3.4vh;line-height: 3.4vh;">'+departmentArr[i][j]+'('+departmentValue[i][j]+'):</div>'
				+ '<div class="col-lg-7 col-md-7 col-sm-7 A" style="padding-right:0;height: 3.4vh;line-height: 3.4vh;">';
			for(k = 0;k<proArr[i][j].length;k++){

				html += '<span title="'+proArr[i][j][k].name+'" style="width:auto;padding: 0; color: #666;font-size: 14px;" onclick=\"searchXY('+proArr[i][j][k].x+","+proArr[i][j][k].y+",'"+proArr[i][j][k].name+"\'"+')\">'+proArr[i][j][k].name+'</span>  ';

			}
			html += '</div></div>';
			if(j==departmentArr[i].length-1){
				html +='</div></h6>';
			}

		}
	}
	var legendDataSon = new Array();
	var setChartDataSon = new Array();
	
	var chartDataSon = new Array();
	if(level == 2){//父级公司
		legendDataSon = departmentArr[0];
		chartDataSon = departmentValue[0];
	}else if(level == 3){//子公司
		//legendDataSon = departmentArr[0][0];
		//chartDataSon = departmentValue[0][0];
	}else if(level == 0){//集团
		legendDataSon = companyArr;
		chartDataSon = companyValue;
	}
	if(legendDataSon==null){
		legendDataSon= new Array();
	}
	for(m=0;m<legendDataSon.length;m++){
		var obj = new Object();
		obj.name = legendDataSon[m];
		obj.value = chartDataSon[m];
		//obj.color = chartColor[i];
		setChartDataSon[m] = obj;
 	}
		
	if(level == 3 ){
		$("#echartNew").show();
		$("#echartFinish").show();
		$("#echartWork").show();
	}else{
		$("#echartNew").show();
		$("#echartFinish").show();
		$("#echartWork").show();
	}


	if(state == 0){
		$("#quanguo").html(html);
		for(j=0;j<legendData.length;j++){
			var obj = new Object();
			obj.name = legendData[j];
			obj.value = chartDataValue[j];
			//obj.color = chartColor[i];
			setChartData[j] = obj;
		}
		setChartDataTest("echart",seriesName,legendData,setChartData,chartColor);
	}else if(state == 1){
		setChartDataColorAuto("echartNew",seriesName,legendDataSon,setChartDataSon);
		$("#newProgram").html(html);
		$("#echartNew div").css("box-shadow","none");
	}else if(state == 3){
		setChartDataColorAuto("echartFinish",seriesName,legendDataSon,setChartDataSon);
		$("#finishProgram").html(html);
		$("#echartFinish div").css("box-shadow","none");
	}else if(state == 2){
		setChartDataColorAuto("echartWork",seriesName,legendDataSon,setChartDataSon);
		$("#workProgram").html(html);
		$("#echartWork div").css("box-shadow","none");
	}
	$(".text-left p").unbind('click').click(function(e){
		$(this).parent().next().toggle();
		$(this).children("img").toggleClass('inon-down2');
		e.stopPropagation();
		//$(this).parent().next().addClass("block").parent().siblings().children("div").removeClass("block");
		//$(this).children("img").addClass("inon-down2").parent().parent().parent().siblings().children("b").children("p").children("img").removeClass("inon-down2");
	});
	$(".A").hover(function(){
		$(this).addClass("auto")
	},function(){
		$(this).removeClass("auto")
	})
}
function setChartDataTest(divId,seriesName,legendData,setChartData,colors){
	if(echarts!=null){
	var i = 0;
	var MyChart=echarts.init(document.getElementById(divId));
    option = {
    tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
    orient: 'vertical',
    show: false,
    x: 'left',
    data: legendData
    },
    series: [

    {
    name: seriesName,
    type: 'pie',
    minAngle:5,
    avoidLabelOverlap:true,
    radius: ['30%', '60%'],
    labelLine: {
    normal: {
    length: 20,
    length2: 15,
    lineStyle: {
    color: '#333'
    }
    }

    },
    label: {
    normal: {
    	formatter(v) {
            let text = Math.round(v.percent)+'%' + '' + v.name
            if(text.length <= 7)
            {
                return text;
            }else if(text.length > 7 && text.length <= 15){
                return text = `${text.slice(0,7)}\n${text.slice(7)}`
            }else if(text.length > 15 && text.length <= 23){
                return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15)}`
            }else if(text.length > 23 && text.length <= 29){
                return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15,23)}\n${text.slice(23)}`
            }else if(text.length > 29){
                return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15,23)}\n${text.slice(23,29)}\n${text.slice(29)}`
            }
        },
        textStyle : {
            fontSize : 13
        },
    borderWidth: 0,
    borderRadius: 4,
    // shadowBlur:3,
    // shadowOffsetX: 2,
    // shadowOffsetY: 2,
    // shadowColor: '#999',
    center : ['50%', '50%'],
    padding: [0, 0],
    rich: {
    a: {
    color: '#333',
    fontSize: 13,
    lineHeight: 20
    },
    // abg: {
    //     backgroundColor: '#333',
    //     width: '100%',
    //     align: 'right',
    //     height: 22,
    //     borderRadius: [4, 4, 0, 0]
    // },
    hr: {
    borderColor: '#333',
    width: '100%',
    borderWidth: 0.5,
    height: 0
    },
    b: {
    fontSize: 13,
    lineHeight: 20,
    color: '#333'
    }
    // per: {
    //     color: '#333',
    //     padding: [2, 4],
    //     borderRadius: 2
    // }
    }
    }
    },
    itemStyle : {  
        normal : {  
            color:function(){  
                return colors[i++];   
                },
                label : {  
                    show : true  
                },  
                labelLine : {  
                    show : true  
                }  
        }
    },
    textStyle : {
        fontSize : 11
    },
    data: setChartData
    }
    ]
    };
    MyChart.setOption(option);
	}
}
function setChartDataColorAuto(divId,seriesName,legendData,setChartData){
	if(echarts!=null){
	var i = 0;
	var MyChart=echarts.init(document.getElementById(divId));
    option = {
    tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
    orient: 'vertical',
    show: false,
    x: 'left',
    data: legendData
    },
    series: [

    {
    name: seriesName,
    type: 'pie',
    minAngle:5,
    avoidLabelOverlap:true,
    radius: ['30%', '60%'],
    labelLine: {
	    normal: {
		    length: 20,
		    length2: 15,
		    lineStyle: {
		    	color: '#333'
		    }
	    }

    },
    label: {
	    normal: {
	    	formatter(v) {
                let text = Math.round(v.percent)+'%' + '' + v.name
                if(text.length <= 7)
                {
                    return text;
                }else if(text.length > 7 && text.length <= 15){
                    return text = `${text.slice(0,7)}\n${text.slice(7)}`
                }else if(text.length > 15 && text.length <= 23){
                    return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15)}`
                }else if(text.length > 23 && text.length <= 29){
                    return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15,23)}\n${text.slice(23)}`
                }else if(text.length > 29){
                    return text = `${text.slice(0,7)}\n${text.slice(7,15)}\n${text.slice(15,23)}\n${text.slice(23,29)}\n${text.slice(29)}`
                }
            },
            textStyle : {
                fontSize : 11
            },
		    borderWidth: 0,
		    borderRadius: 4,
		    // shadowBlur:3,
		    // shadowOffsetX: 2,
		    // shadowOffsetY: 2,
		    // shadowColor: '#999',
		    center : ['50%', '50%'],
		    padding: [0, 0],
		    rich: {
		    a: {
		    color: '#333',
		    fontSize: 13,
		    lineHeight: 20
		    },
		    // abg: {
		    //     backgroundColor: '#333',
		    //     width: '100%',
		    //     align: 'right',
		    //     height: 22,
		    //     borderRadius: [4, 4, 0, 0]
		    // },
		    hr: {
		    borderColor: '#333',
		    width: '100%',
		    borderWidth: 0.5,
		    height: 0
		    },
		    b: {
		    fontSize: 13,
		    lineHeight: 20,
		    color: '#333'
		    }
		    // per: {
		    //     color: '#333',
		    //     padding: [2, 4],
		    //     borderRadius: 2
		    // }
		    }
	    }
    },
    textStyle : {
        fontSize : 13
    },
    data: setChartData
    }
    ]
    };
    MyChart.setOption(option);
	}
}
function showGuoData(){
	
	getCompanyChartsData("集团公司",0,0);
	getCompanyChartsData("集团公司",1,0);
	getCompanyChartsData("集团公司",3,0);
	getCompanyChartsData("集团公司",2,0);
}
//点击二级公司
function clickSonCompany(company){

	getCompanyChartsData(company,0,3);
	getCompanyChartsData(company,1,3);
	getCompanyChartsData(company,3,3);
	getCompanyChartsData(company,2,3);

	flag=2;
	flagstr=company;

	var theme = $("#right-area .special[data-state]").attr("data-ref");
	theme = theme ||"";
	switch(theme){
	case 1://聚合图
	case "1":
		var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.scompany=='"+company+"'",config.other.tempMarkers);
		mapFrame.page.addClusterLayer(markers);
		break;
	case 2://麻点图
	case "2":
		mapFrame.page.hideMarkersByExpression();
		mapFrame.page.showMarkersByExpression("attr.scompany=='"+company+"'");
		break;
	case 3://热力图
	case "3":
		var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.scompany=='"+company+"'",config.other.tempMarkers);
		mapFrame.page.createHeatLayer({featureWeight:"state"},markers);
		break;
	}
};
//点击一级公司
function clickFatherCompany(company,mySelf){
	flag=1;
	flagstr=company;
	var theme = $("#right-area .special[data-state]").attr("data-ref");
	theme = theme ||"";
	switch(theme){
	case 1://聚合图
	case "1":
		var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.fcompany=='"+company+"'",config.other.tempMarkers);
		mapFrame.page.addClusterLayer(markers);
		break;
	case 2://麻点图
	case "2":
		mapFrame.page.hideMarkersByExpression();
		mapFrame.page.showMarkersByExpression("attr.fcompany=='"+company+"'");
		break;
	case 3://热力图
	case "3":
		var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.fcompany=='"+company+"'",config.other.tempMarkers);
		mapFrame.page.createHeatLayer({featureWeight:"state"},markers);
		break;
	}
//		$(mySelf).next().addClass("kai").parent().siblings().children("ul").removeClass("kai");
//		$(mySelf).children("img").addClass("inon-down2").parent().parent().siblings().children("a").children("img").removeClass("inon-down2");
	//$(mySelf).next().toggle();
	$(mySelf).next().toggleClass("kai");
	//$(mySelf).children("img").toggleClass('inon-down2');
	getCompanyChartsData(company,0,2);
	getCompanyChartsData(company,1,2);
	getCompanyChartsData(company,3,2);
	getCompanyChartsData(company,2,2);
};
//格式化集团列表结果
function formatCompanyList(clist){
	var result = new Object();
	if(!clist||!clist.length)return {};
	for(var i=0;i<clist.length;i++){
		var name = clist[i].fcompany;
		var id = clist[i].fcomcode;
		var pojNum = clist[i].num;
		if(result[name]){
			result[name]["sublist"].push(clist[i]);
			result[name]["pojnum"] += (parseInt(pojNum)||0);
			result[name]["subnum"] += 1;
		}else{
			result[name] = new Object();
			result[name].id = id;
			result[name]["sublist"] = [clist[i]];
			result[name]["pojnum"] = parseInt(pojNum)||0;
			result[name]["subnum"] = 1;
		}
	}
	config.other.companyList = result;
	return result;
}
//初始化切换marker图例事件
function switchMarkerStyle(f,b){
	if(f=='常规项目'){
		$('#collapse1').collapse('show')
		$('#collapse2').collapse('hide')
		$('#collapse3').collapse('hide')
	}else if(f=='库存预警'){
		$('#collapse1').collapse('hide')
		$('#collapse2').collapse('show')
		$('#collapse3').collapse('hide')
	}else if(f=='进度预警'){
		$('#collapse1').collapse('hide')
		$('#collapse2').collapse('hide')
		$('#collapse3').collapse('show')
	}

	if(b.children.length==4){
		 var _this=$("#left-bottom i.markerThemeBtn")
		 var statu = b.children[3].children[0].className.indexOf("toggle-on")!=-1;
		 var ref ='style.'+f;
		 //if($(b).children("span").children("i").hasClass("toggle-on")){
			// console.log(123);
		 //}
		 if(statu){//切换到关闭状态
			 //$("#left-bottom i.markerThemeBtn").removeClass("fa-toggle-off").addClass("fa-toggle-on");
			 //$(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
		 }else{//切换到打开状态
			 $("#left-bottom i.markerThemeBtn").removeClass("fa-toggle-on").addClass("fa-toggle-off");
			 b.children[3].children[0].className="markerThemeBtn fa fa-toggle-on";
				if(f=='常规项目'){
					config.other.legendTheme = style2.常规项目||config.other.legendTheme;
				}else if(f=='库存预警'){
					config.other.legendTheme = style2.库存预警||config.other.legendTheme;
				}else if(f=='进度预警'){
					config.other.legendTheme = style2.进度预警||config.other.legendTheme;
				}
			 
			 var changedOptions = config.other.legendTheme.options;
			 if(changedOptions.tran){
				 for(var i in changedOptions.tran){
					 mapFrame.page.changeMarkersStyleByExp("attr."+changedOptions.field+i,changedOptions.styles[changedOptions.tran[i]](),"","attr."+changedOptions.field);
				 }
			 }else{
				 for(var i=0;i<changedOptions.styles.length;i++){
					 mapFrame.page.changeMarkersStyleByExp("attr."+changedOptions.field+"=="+i,changedOptions.styles[i]());
				 }
			 }
			 //mapFrame.page.changeMarkersStyleByExp("attr.state==1",config.other.legendTheme.options.styles[0]());
		 }
	}else{
		 var _this=$("#left-bottom i.markerThemeBtn")
		 var statu = b.children[2].children[0].className.indexOf("toggle-on")!=-1;
		 var ref ='style.'+f;
		 
		 if(statu){//切换到关闭状态
			 //$("#left-bottom i.markerThemeBtn").removeClass("fa-toggle-off").addClass("fa-toggle-on");
			 //$(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
		 }else{//切换到打开状态
			 $("#left-bottom i.markerThemeBtn").removeClass("fa-toggle-on").addClass("fa-toggle-off");
			 b.children[2].children[0].className="markerThemeBtn fa fa-toggle-on";
				if(f=='常规项目'){
					config.other.legendTheme = style2.常规项目||config.other.legendTheme;
				}else if(f=='库存预警'){
					config.other.legendTheme = style2.库存预警||config.other.legendTheme;
				}else if(f=='进度预警'){
					config.other.legendTheme = style2.进度预警||config.other.legendTheme;
				}
			 var changedOptions = config.other.legendTheme.options;
			 if(changedOptions.tran){
				 for(var i in changedOptions.tran){
					 mapFrame.page.changeMarkersStyleByExp("attr."+changedOptions.field+i,changedOptions.styles[changedOptions.tran[i]](),"","attr."+changedOptions.field);
				 }
			 }else{
				 for(var i=0;i<changedOptions.styles.length;i++){
					 mapFrame.page.changeMarkersStyleByExp("attr."+changedOptions.field+"=="+i,changedOptions.styles[i]());
				 }
			 }
			 //mapFrame.page.changeMarkersStyleByExp("attr.state==1",config.other.legendTheme.options.styles[0]());
		 }
	}
}
//格式化统计项
function formatStatisticOptions(zlist){
	var result = new Object();
	zlist = zlist || config.other.dataList || [];
	if(!zlist||!zlist.length)return {};
	for(var i=0;i<zlist.length;i++){
		
	}
	config.other.StatisticResult = result;
	return result;
};
//初始化主题参数
function initThemeParams(){
	for(var i in style){
		if(style[i].selected&&style[i].selected=="true"){
			 config.other.legendTheme = style[i];
			 break;
		}
	}
	
};
//刷新地图显示条件变量
function refreshFiltrate(){
	var demandEle = $("#left-bottom .panel-default>.panel-collapse>.panel-body li");
	config.other.markerShowDemand = "";
	config.other.markerHideDemand = "";
	var parentID = null;
	demandEle.each(function(i,n){
		var exp = n.getAttribute("exp");
		var state = n.className.indexOf("lose")!=-1;
		if(i==0||parentID==$(this).parent().attr("data-ref")){
			if(state){//隐藏marker的条件
				config.other.markerHideDemand += "\|\|"+exp;
			}else{//显示markers的条件
				config.other.markerShowDemand += "\|\|"+exp;
			}
		}else{
			if(state){//隐藏marker的条件
				config.other.markerHideDemand += "\&\&"+exp;
			}else{//显示markers的条件
				config.other.markerShowDemand += "\&\&"+exp;
			}
		};
		parentID = $(n).parent().attr("data-ref");
	});
};
//执行图例开关函数
function legendSwitch(legendEle){
	if(!legendEle)return;
	var leg = $(legendEle);
	var clazz = legendEle.className;
	var field = leg.attr("field")||"";
	var exp = leg.attr("exp");
	exp = exp.replace(new RegExp("\&\&","gm"),"\&\&attr.");
	exp = exp.replace(new RegExp("\\|\\|","gm"),"\|\|attr.");
	if(clazz&&clazz.indexOf("lose")!=-1){//显示图例markers
		leg.removeClass("lose");
		mapFrame.page.showMarkersByExpression("attr."+exp,"");
	}else{//隐藏图例markers
		leg.addClass("lose");
		mapFrame.page.hideMarkersByExpression("attr."+exp,"");
	}
	//refreshFiltrate();
}
//值转换
function transform(oval,exp,nval){
	if(!oval)return null;
	exp = exp ||"";
	exp = exp.replace(new RegExp("\&\&","gm"),"\&\&"+oval);
	exp = exp.replace(new RegExp("\\|\\|","gm"),"\|\|"+oval);
	try{
		if(eval(oval+exp))return nval;
	}catch(e){return null;}
}
//获取所有项目信息
var index ;
function updateLocalDataList(callback){
	var b=document.getElementById('inputsession').value;
	index= layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	$.ajax({
	 url:config.services.getAllZtitems,
	 dataType:"json",
	 success:function(data){
		 if(data)config.other.dataList = data;
		 layer.close(index); 
		 console.log(data);
	
//			$.ajax({
//				 url:"http://ppscs.crccre.cn/bi/REST/http-listUserAuthProjects.ac?userAccount=liyapeng",
//				 dataType:"json",
//				 success:function(data2){
//					 data2={"code":"0","data":["00a65a71-9e1a-4b9e-89b0-75738cd374ad","0282fda6-f038-48bb-89c1-f9e2df5ddae0","03a59fb1-0559-4ef6-9031-461509f569ee","0fda074a-717e-4c3a-9bae-0ac65487fdd4","0fdf41a9-3183-4751-bdac-cd00826dc5e7","10479b1c-9d08-42bd-b6f7-c2a9648cf8d4","153d34f5-410e-4bc3-ba50-0001c52388c3","185d5d34-9e0e-40c4-8702-8cefb2252fd3","1b57b312-7c9a-49af-8173-c6562491b5ca","1c8bc758-3d13-4c9a-834c-1123d6c4874f","23730850-ea5d-44de-b980-a3bb65ab0098","293be01c-db18-4d42-9c91-e12e94e4c508","29a8f34c-7736-4339-bc8f-9865c63e6119","2d26addd-6e6f-40d0-b182-1a09c1df6491","2d5b049f-a160-4f67-8fe6-a18c02c3f55e","2fac6ea9-dfca-4302-8583-79b8338c6d03","3128727f-a9bb-4bbf-b034-630f5322f07f","314f36fd-6cd6-42cc-81be-8bd8adbe2f39","3b66d1db-b192-419d-bf6f-7ecfea63546a","3dc1badf-632e-4b6e-b0b9-22d96bd8dc09","3fc32272-4195-48b2-894d-4d2bc80f2c6e","4226c13e-afbd-4855-a64d-e2ea2b014895","446d08f3-034e-4777-919f-f800124b1021","4dfb8408-f291-4439-8f4a-54e6cd2e9739","4f9bfec4-eb42-42af-9c80-c945bf57d5d3","50af8807-b767-4fc8-b7a1-d7fc1bce9384","50b7f994-a1fa-4f62-9039-dd8ebf79941d","55157f3c-67b2-4c6e-b0ad-bd9938c13947","5bcb3170-ed6e-410c-8d15-6cea40fb4038","5eb36f7a-f724-44af-ac09-004c2174ec13","60bcaed2-668c-4e9c-ad6b-1d1116d6fb8b","60f3158a-42d9-4679-b9c2-d73d49e696eb","6376e928-f023-4412-91a3-fcd3ff131928","63f5fb4e-8c37-4288-b9bc-c3a78932fe82","661260d3-56b7-484b-a585-bccad360e674","69b1ce61-00b6-476d-9fd2-6d1078e5e870","69f3ce3c-bf4b-4551-aacb-95b74b9c1c47","7080a713-9dbe-4a6b-96cc-c0e04fec0336","7090dd6a-9220-4442-839e-1ed34f3f1bd2","7329a0b4-e6eb-4c13-9199-ca03ec910f3c","76563157-a4a8-4127-a594-8392a870ed55","79507bae-1646-4cc8-85ac-c178cc2fe078","7bc47806-5a16-4e59-bee9-17cbe6ba14b1","7cc2938b-493f-4127-b26b-af0a6f8a6a9f","7d845c34-fcbf-4530-b4d6-d49ba94ac3f9","894e8218-f56a-4c35-91e1-c6e40b046eb4","8ab40f56-bd3c-41ec-a7c7-3be097856ce1","8c8ae76c-d74b-4a3f-959d-668092bf22f6","92d4a48f-1c4b-4c6a-a58f-f0b99ecbced9","947b093d-6cb3-4b80-a4bf-8f464cada323","9697804d-6d07-4a86-ae00-4a62650c6254","97c08b9a-3cce-4893-8c7b-2607b65f0270","97e0f04d-dc88-448b-900d-3332d8e76f7f","97e504e9-3a56-429a-9c77-215fb7234468","97e5ebfa-4c8b-47f2-99b6-b58f06a51b36","9dbc569e-9e38-4abf-aec8-d0848cdc90b9","9f00d92d-9ff9-4025-9757-cf5942961699","a3b6cfae-7988-4cf6-83f8-40fed2517383","a3c800a3-f634-4834-8705-17d113366796","a9f61169-9adf-4ef7-be3f-f1a681d66598","aa2f54c0-03a5-4a20-8eeb-980d93ee641f","ab2a0925-5072-40b4-83cb-179a0366412b","aca43c52-082b-47df-a494-84b7ea6b9f55","ad71a781-ad71-4959-9192-1ff6851e9d61","b01a268e-712c-4a1d-a54d-4dde77c91481","b025e14b-78f7-4910-81e9-562aa01cec25","b317ec6f-3577-4f99-9025-f1d967dcf268","b5caf5d3-79b6-4972-a896-b46f3a7da641","ba07e122-39cd-423f-8dbb-3ca84b889a8e","ba324993-0a98-4c10-8060-c5eecd114127","ba5051b8-b645-4af5-906c-c81f838ec8d8","bfbc9268-94a8-4920-8195-7c328e3955c8","c76b2510-17ea-4629-80e2-1194d8d766b5","cc9fefb1-6f36-4f8f-86da-6f3ace6fb5cc","ced8e2a9-e815-4a11-a590-33bcf009ab38","d0a56e3c-8ffc-43b3-a3f3-9e535ec106c9","d0a6c6c6-3be9-4d11-baa4-e0163f026cca","d180d410-afc4-4f92-98e9-637c973c0262","d30150ae-3e64-483b-94b5-d12e6c5b3c35","d368b81d-660a-476e-876f-aec16e5b9b94","d8e46dae-b383-4a5d-b5ab-90c66558af70","d96a4305-163f-42b1-806d-5667668c8491","e1b3e6ab-b881-4906-bb60-6905f3c005dd","e23294c3-e4e3-43f7-92d9-6e02cdcae952","e2db1d1a-d600-4317-a96a-97cc43511640","e3517b36-b1fe-4c59-ae17-490a06f69392","e42b4c79-9ecc-4c28-8f7c-e15431c6879a","e57982e7-d62b-4578-9779-571e626b5aa4","e98bc65a-9a1b-4f2a-bb84-a592f46be1e8","e9d9bb0c-6dbe-4740-a8bc-354b4925bc39","eb42f1a0-ac3d-4b90-8cb5-dc1720092d66","ec3d48cf-5e50-4091-8a56-0573ac516d35","ee8b3abc-84fc-40ca-91d7-94ae162af420","fa2e5ea3-8504-4eb2-9aa5-ec7602ee919d","fdd9f94f-5354-4393-8559-56b4f4178ac3"],"message":"success"}
//					 var data3=[];
//					 for(i=0;i<data.length;i++){
//						 for(j=0;j<(data2.data).length;j++){
//							if(data[i].projectid==data2.data[j]){
//								data3.push(data[i]);
//							}
//						 }
//					 }
//					 if(data3)config.other.dataList = data;
//					 console.log(data3);
//					 if(typeof callback == "function")callback(data3);
//				 }
//				});
		 if(typeof callback == "function")callback(data);
	 }
	});
};
//获取各省项目情况
function updateLocalProvinceDataList(callback){
	$.ajax({
	 url:config.services.getprovinces,
	 dataType:"json",
	 success:function(data){
		 if(data.data)config.other.dataListTheme = data.data;
		 console.log(data.data);
		 if(typeof callback == "function")callback(data.data);
	 }
	});
};
//获取各市项目情况
function updateLocalCityDataList(callback){
	$.ajax({
	 url:config.services.getCitys,
	 dataType:"json",
	 success:function(data){
		 if(data.data)config.other.dataListTheme = data.data;
		 console.log(data.data);
		 if(typeof callback == "function")callback(data.data);
	 }
	});
};
//获取各省项目情况
function updateLocalProvinceDataListDate(date,callback){
	$.ajax({
	 url:config.services.getprovinces,
	 data:{"date":date},
	 dataType:"json",
	 success:function(data){
		 if(data.data)config.other.dataListTheme = data.data;
		 console.log(data.data);
		 if(typeof callback == "function")callback(data.data);
	 }
	});
};
//获取各市项目情况
function updateLocalCityDataListDate(date,callback){
	$.ajax({
	 url:config.services.getCitys,
	 data:{"date":date},
	 dataType:"json",
	 success:function(data){
		 if(data.data)config.other.dataListTheme = data.data;
		 console.log(data.data);
		 if(typeof callback == "function")callback(data.data);
	 }
	});
};
//获取集团列表
function updateLocalCompanies(callback){
	$.ajax({
	 url:config.services.getAllCompanys,
	 dataType:"json",
	 success:function(data){
		 if(data)config.other.companyList = data;
		 if(typeof callback == "function")callback(data);
	 }
	});
};
//获取项目年份信息
function updateLocalZttiemYears(callback){
	$.ajax({
	 url:config.services.getAllCompanys,
	 dataType:"json",
	 success:function(data){
		 if(data)config.other.companyList = data;
		 if(typeof callback == "function")callback(data);
	 }
	});
};
//年份轮播动画执行函数
function progessAnimation(){
	var float = 0.00805024;
	var lis = 1/($("#year-items li").length)+float;
	if(v<100){
		v += 0.5;
		$("#bottom-area div.progress-bar").width(v+"%");
		var eth = $("#year-items li").eq(parseInt(v/lis/100));
		if(!eth.has("p").length){$(eth).trigger("click");}
		
	}else{
		 var eth = $("#year-items li").eq(($("#year-items li").length-1)); 
		 if(!eth.has("p").length){$(eth).trigger("click");}
		 v=-2;
		 try{window.clearInterval(config.other.pAnier);}catch(e){};
		 config.other.delayer = window.setTimeout(function(){
			 config.other.pAnier = setInterval(progessAnimation,config.timer.carousel.interval);
		 },config.timer.carousel.remain);
	};
}



