(function(){
	var toolDiv = document.getElementById("popupTools");
	var tools = toolDiv.getElementsByTagName("li");
	for(var i=0;i<tools.length;i++){
		tools[i].setAttribute("onclick","switchTool("+i+")");
	}
})();
//切换功能菜单
function switchTool(i){
	closeInfowinNotAnchor();
	top._popupToolIndex = i;
	var toolDiv = document.getElementById("popupTools");
	var tools = toolDiv.getElementsByTagName("li");
	var popupInput= document.getElementsByName("popupInput");
	for(var k=0;k<popupInput.length;k++){
		popupInput[k].value="";
	}
	for(var s=0;s<tools.length;s++){
			try{
				tools[s].removeAttribute("class");
				document.getElementById("tool"+(parseInt(s)+1)).style.display = "none";
			}catch(e){
				
			};
		}
	tools[i].className = "active";
	var active = document.getElementById("tool"+(parseInt(i)+1));
	active.style.display = "block";
	var markIcon = "images/markers/";
	switch(parseInt(i)){
	case 1://设置起点位置
		_startLonlat = _infowin.lonlat;
		markIcon += "start_1.png";
		break;
	case 0://设置终点位置
		_endLonlat = _infowin.lonlat;
		markIcon += "end_1.png";
		break;
	case 2://设置途径点位置
		_approach.push(_infowin.lonlat);
		markIcon += "approach_1.png";
		break;
	case 3://设置中心点位置
		break;
	}
}
//查找类型
function seachType(sql){
	parent.mapFrame.urlParam=new Array();
	parent.mapFrame.urlParam.push(sql);
	parent.mapFrame.urlParam.push(null);
	parent.mapFrame.urlParam.push("../health/subpages/result/showResult.jsp?k=bufferResult&s=");
	parent.mapFrame.functionName="parent.mapFrame.roundSreach";
	parent.mapFrame.pageIndex=1;
	$('body').showLoading();
	roundSreach(sql,null,function(){
		$('body').hideLoading();
		parent.$('#subpage').attr("src","subpages/result/showResult.jsp?k=bufferResult");
	});
}
function seachVague(){
	   var  text=$("#buffer").val().Trim();
	    var fields = $('#buffer').attr("field").split(",");
		var sql="";
		if(fields.length>1){
			for(var o=0;o<fields.length;o++){
				if(o<fields.length-1){
						sql+=fields[o]+" like "+"'%"+text+"%' or ";
				}else{
					sql+=fields[o]+" like "+"'%"+text+"%'";
				}
			}
		}else{
			sql+=fields[0]+" like "+"'%"+text+"%'";
		}
	 parent.mapFrame.urlParam=new Array();
	 parent.mapFrame.urlParam.push(sql);
	 parent.mapFrame.urlParam.push(null);
	 parent.mapFrame.urlParam.push("../health/subpages/result/showResult.jsp?k=bufferResult&s=");
	 parent.mapFrame.functionName="parent.mapFrame.roundSreach";
	 parent.mapFrame.pageIndex=1;
	 $('body').showLoading();
	 roundSreach(sql,null,function(){
		 $('body').hideLoading();
		 parent.$('#subpage').attr("src","subpages/result/showResult.jsp?k=bufferResult");
	 });
}
//填充标题
function fillTitle(title){
	document.getElementById("popupTitle").innerHTML = title;
}
//填充正文

function fillContent(attr,centent,type){
		  var con="",suffix=".jpg";
		  type = type||"poi";
		  var fillContent = document.getElementById("popupText");
		  fillContent.innerHTML= "";
		  var tempContentConfig =[];
		  if(config.content.element&&config.content.element.length){
			  for(var o=0;o<config.content.element.length;o++){
				  if(config.content.element[o].attributes.type==type){
					  var item = config.content.element[o].item;
					  for(var m=0;m<item.length;m++){
						 var tKey = item[m].attributes.key;
						 var kName = item[m].text;
						 var obj = new Object();
						 obj[kName]=tKey;
						 tempContentConfig.push(obj);
					  }
				  }
			  }
		  }
		  if(attr){
			  var img = attr.attr["PHOTO"]||attr.attr["IMG"]||attr.attr["IMGURL"]||attr.attr["图片"]||attr.attr["照片"]||attr.attr["IMAGES"]||attr.attr["照片文件"]||attr.attr["图片文件"]||attr.attr["PICTURE"];
			  if(img){
				  img =  img.replace(img.substring(img.indexOf(".")),"");
				  con+="<div id='popupImgDiv' style='height:100px;width:400px;margin:auto;'><img src='"+_defaultImgRoot+img+suffix+"' onclick=\"top.layer.open({type: 2,title: \'照片预览\',shift: 1,area: [\'640px\', \'515px\'],content:[this.src,\'no\']})\" onerror='this.src=\"images/decorate/default.jpg\"' style='width:100%;height:100%;'></div>";
			  }
			  for(var i=0;i<tempContentConfig.length;i++){
				  for(var o in tempContentConfig[i]){
					  con+="<div style='line-height:25px;max-width:400px;'>"+o+":"+(attr.attr[tempContentConfig[i][o]]||"暂无")+"</div>";
				  }
			  }  
		  }
		  fillContent.innerHTML= centent||con;
}
//搜索验证
function conditionVerify(){
	var buttons = document.getElementsByName("popupButton");
}
//搜索框键盘按下触发事件函数
function inputKeyDownEvent(ele){
	var event = window.event || top.event ||top.subpage.event;
	if(event.keyCode==8){
		if(!ele.value.Trim()){
			closeInfowinNotAnchor();
			return ele.value.Trim();
		}else{
			var val = ele.value.Trim();
			var re = new RegExp("^[a-z]*|[A-Z]*$");
			if (re.test(val)){//纯英文
				ele.valeu = ele.value.replace(/\s{1,}/g,",");
				}
			return ele.valeu.Trim();	
		}
	}else{
		var val = ele.value.Trim();
		var re = new RegExp("^[a-z]*|[A-Z]*$");
		if (val && re.test(val)){//纯英文
			ele.valeu = ele.value.replace(/\s{1,}/g,",");
			}
		return ele.value.Trim();	
	}
}