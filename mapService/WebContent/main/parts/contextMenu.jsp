<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="lib/plug-in/font-awesome-4.4.0/css/font-awesome.min.css"/>
<title>右击菜单</title>
<style>
.menuDiv{
 width:97px;
 cursor:pointer;
 line-height: 23px;
}
.menuDiv .glyph-icon{
  display:inline-block;
  width:20px;
}
.menuDiv .ban{
  color:#ccc;
  cursor:default;
}
.menuDiv hr{height:1px;border:none;margin:2px;border-top:1px dashed #b4bbc1;}
.menuDiv a{display:inline-block;line-height:19px;font-size:14px;color:##655858;}
.menuDiv i{
    font-size: 15px;
    color: #999;
    margin-left: 5px;
    width: 14px;
    text-align: center;}
</style>
</head>
<body>
    <div  class="menuDiv">
    <i class="fa fa-hand-paper-o"></i> 
    <a  onclick="page.Pan();closeRightMenu();">切回平移</a><br/>
    <hr class="splitline"/>
    <i class="fa fa-map-pin"></i>
    <a  onclick="pathAnalyzeCourse('1');closeRightMenu();">此为起点</a><br/>
    <i class="fa  fa-map-marker"></i>
    <a onclick="pathAnalyzeCourse('2');closeRightMenu();">此为途径点</a>
    <i class="fa fa-flag-checkered"></i>
    <a  onclick="pathAnalyzeCourse('0');closeRightMenu();">此为终点</a>
    <hr class="splitline"/>
    <i class="fa fa-rss-square"></i> 
    <a  onclick="page.circumSreach();closeRightMenu();">在附近找...</a>
    <!-- 
    <hr class="splitline"/>
    <i class="fa"></i> 
    <a  onclick="page.bufferSreach();closeRightMenu();">绘制查找...</a><br/>
    <i class="fa"></i> 
    <a  onclick="page.Pan();closeRightMenu();">添加新地点</a><br/>
    -->
    </div>
</body>
</html>