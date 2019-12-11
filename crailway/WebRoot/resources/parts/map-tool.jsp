<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
.glyphicon{padding:0px 6px;color: #464b6f;}
.map-tool{-moz-box-shadow: 2px 2px 2px #ded8d8;box-shadow: 2px 2px 2px #ded8d8;}
</style>
	<li  onclick="viewEntire()">
		<span class="fa fa-globe" aria-hidden="true"></span>全国
	</li>
	<li  onclick="javascript:zoomIn();">
		<span class="fa fa-search-plus" aria-hidden="true"></span>放大
	</li>
	<li  onclick="zoomOut()">
		<span class="fa fa-search-minus" aria-hidden="true"></span>缩小
	</li>
	<li  onclick="measureDistance()">
		<span class="fa fa-eraser" aria-hidden="true"></span>测距
	</li>
	<li  onclick="measureArea()">
		<span class="fa fa-credit-card" aria-hidden="true"></span>测面
	</li>
	<li  onclick="pickupLonLat()">
		<span class="fa fa-dot-circle-o" aria-hidden="true"></span>测点
	</li>
	<li  onclick="print()">
		<span class="fa fa-print" aria-hidden="true"></span>打印
	</li>
	<li  onclick="clearDraw()">
		<span class="fa fa-trash-o" aria-hidden="true"></span>清除
	</li>
	<li  onclick="pan()">
		<span class="fa fa-arrows" aria-hidden="true"></span>平移
	</li>
<script>
//全国
function viewEntire(){
	mapFrame.page.ViewEntire();
}
//放大地图
function zoomIn(){
	mapFrame.page.zoomIn();
}
//缩小地图地图
function zoomOut(){
	mapFrame.page.zoomOut();
}
//测距离
function measureDistance(){
	mapFrame.page.MeasureDistance()
}
//测面
function measureArea(){
	mapFrame.page.MeasureArea()
}
//测点
function pickupLonLat(){
	mapFrame.page.pickupLonLat()
}
//打印
function print(){
	mapFrame.page.printMap("divmap")
}
//清除
function clearMarkers(){
	mapFrame.page.ClearMarkers()
}
//平移
function pan(){
	mapFrame.page.Pan()
}
//	清除
function clearDraw(){
	mapFrame.page.clearDraw()
}
</script>