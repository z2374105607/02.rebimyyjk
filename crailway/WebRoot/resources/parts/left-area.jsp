<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="l-icon">
	<img src="resources/imgs/icon_menu.png" style="max-width:100%;vertical-align: inherit;"/>
     <%--<i class="fa fa-sitemap"></i>--%>
</div>
<div class="info-panel">
	<div class="panel panel-default">
	  <div class="panel-heading">集团公司<%-- <img class="icon-small" src="resources/imgs/logo.jpg">--%>
	   <span class="badge2" style="float: right;background-color:#fff;color:#0289e3;" id="pojtotal"></span></div>
	  <div class="panel-body" id="info-panel-body">
	  </div>
	</div>
</div>
<script>
$(function(){
	window.infoHeight = $("#info-panel-body").height();
	slimScroll();
});
function slimScroll(){
	var byheight = $("body").height();
	var thisTop = parseFloat($("#left-area").css("top"))+parseFloat($("#left-area .l-icon").height())+10;
	var botOffset = parseFloat(($("#bottom-area").height()||0))+(parseFloat($("#bottom-area").css("bottom"))||0)+20;
	var tiHeight = $("#left-area div.info-panel .panel .panel-heading").height();
	$("#left-area div.info-panel .panel").height(byheight-thisTop-botOffset+"px");
	var panelHeight = $("#left-area div.info-panel .panel").height();
	if(infoHeight>panelHeight){
	    $("#info-panel-body").slimScroll({height:(panelHeight-tiHeight-20)+"px",alwaysVisible: false });
	}else{
		$("#info-panel-body").slimScroll({height:(panelHeight)+"px"});
	}
}
</script>
