<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="lib/plug-in/font-awesome-4.4.0/css/font-awesome.min.css"/>
<script type="text/javascript" src='global.jsp'></script>
<script type="text/javascript" src='common/global.js'></script>
<script type="text/javascript" src='lib/supermap/2D/v7.1/libs/SuperMap.Include.js'></script>
<script type="text/javascript" src='common/include.js'></script> 
<style>
#leftBottom{
    width:30%;
    min-width:400px;
    background: rgba(255, 255, 255, 0.69);
    position: absolute;
    border-radius: 5px;
    z-index: 90;
    left: 90px;
    bottom: 10px;
}
</style>
<title>电子地图</title>
</head>
<body  oncontextmenu="return false">
 <div id="divmap"></div>
 <!-- 右击菜单 -->
 <div id="rightMenu">
 <jsp:include page="main/parts/contextMenu.jsp"></jsp:include>
 </div>
 <!-- 悬浮气泡 -->
 <div id="userPopup">
 <jsp:include page="main/parts/popup.jsp"></jsp:include>
 </div>
 <!-- 左下菜单 -->
 <div id="leftBottom">
  <jsp:include page="main/parts/dynamicLegend.jsp"></jsp:include>
 </div>
</body>
<!--[if gt IE 7]>
<script>document.getElementById("popWin_contentDiv").style.width = "406px"</style>
<![endif]-->
</html>