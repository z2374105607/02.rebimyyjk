<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>
.popover-title {
    margin: 0;
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-shadow:0 2px 2px rgba(0,0,0,.2);
    color: #009ff1;
    background-color: #ffffff;
    border-radius: 5px 5px 0 0;
}
.popover-content {
   font-size: 14px;
   color: #666;
}
.popover{
	z-index:99999;
}
</style>
<div style="position:relative;width:100%;height:100%;">
　　 <img id="smallsize" style="position:absolute;z-index: 100000;right:5px;top:0px;width:15px;    cursor: pointer;" src="./resources/imgs/smallsize.png"></img>
<ul id="axisControl" style="width:10%;">
<!-- <li handle="last" data-toggle="tooltip" title="" data-original-title="上一项" style="margin-left:8%;">
<img src="resources/imgs/icon_prev.png" style="max-width:80%;"/>
</li> -->
<li handle="play"  data-toggle="tooltip" title="" data-original-title="自动切换" style="margin:0 10%;">
	<img src="resources/imgs/icon_play.png" style="max-width:90%;"/>
</li>
<!-- <li handle="next"  data-toggle="tooltip" title="" data-original-title="下一项">
	<img src="resources/imgs/icon_next.png" style="max-width:80%;"/>
</li> -->
</ul>
<div class="progress" style="left: 5%;">
  <div class="progress-bar year-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%;"></div>
</div>
<div id="year-items" class="year-items" style="left: 5%;"></div>
</div>
<script>
$(function () { $("[data-toggle='popover']").popover(); });
$(function(){
	initAxisControl(years_data);
});
var selectYear;
//初始化年份切换控件
function initAxisControl(year_data){
   	var year_container = document.getElementById("year-items");
   	year_container.innerHTML = "";
	if(!year_data||!year_data instanceof Array){
		year_container.innerHTML = "<center style='color:red;font-size:14px;background-color:#fff;'>数据错误....</center>";
		return;
	}
	var aNum = year_data.length;
	var ul = document.createElement("ul");
	for(var i=0;i<year_data.length;i++){
	ul.id = "axisUl";
		var li = document.createElement("li");
		li.setAttribute("id",year_data[i].year); 
		li.setAttribute("data-toggle","popover");
		li.setAttribute("title",year_data[i].title); 
		li.setAttribute("trigger",'focus'); 
		li.setAttribute("data-container","body"); 
		li.setAttribute("data-content",year_data[i].total); 
		li.setAttribute("data-placement","top");
		var span = document.createElement("span");
		var div = document.createElement("div");
		div.style.position = "raletive";
		span.innerHTML = year_data[i].year;
		div.appendChild(span);
		if(i!=year_data.length-1){
			if(i!=aNum-1)li.style.left = 1/(aNum-1)*100*i+"%";
		}else{
			var p = document.createElement("p");
			li.appendChild(p);
		}
		li.appendChild(div);
		ul.appendChild(li);
		//年份手选切换
		$(li).bind("click",function(){
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
		 });
	}
   	year_container.appendChild(ul);
	$("[data-toggle='popover']").popover();
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
</script>