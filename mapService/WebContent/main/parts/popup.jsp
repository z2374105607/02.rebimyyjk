<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<base href=""/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>普通气泡弹框</title>
<!-- <link rel="stylesheet" href="main/parts/css/popupStyle.css" type="text/css" media="screen" /> -->
</head>
<body>
  <div class="popupDiv" >
    <img class="closeImg" src="images/parts/close.png" onclick="closeInfoWin()" title="关闭"/>
    <div class="popupTitle" id="popupTitle">...附近
    </div>
    <div class="popupCentent">
    <div class="popupText" id="popupText"></div>
    <ul class="popupUl" id="popupTools">
    <li class="active">到这里去</li>
    <li>从这里出发</li>
    <li style="display:none;">经过这里</li>
    <li>在附近找...</li>
    </ul>
    <div class="toolItem" id="tool1">
      <input class="longInput sreach" placeholder="起点位置..." id="startInput" name="popupInput" onchange="addressAutoHint(this);" onkeyup="addressAutoHint(this);"/>
      <input class="shortInput button" type="button" value="查找" name="popupButton"  onclick="interestPointQuery('1',$('#startInput').val())" />
    </div>
    <div class="toolItem hidden" id="tool2">
      <input class="longInput sreach" placeholder="终点位置..."  id="endInput" name="popupInput" onchange="addressAutoHint(this);" onkeyup="addressAutoHint(this);"/>
      <input class="shortInput button" type="button" value="查找" name="popupButton"  onclick="interestPointQuery('0',$('#endInput').val())"/>
    </div>
    <div class="toolItem hidden" id="tool3">
      <input class="middleInput sreach" placeholder="起点位置..." name="popupInput" onchange="addressAutoHint(this);"  onkeyup="addressAutoHint(this);"/>
      <img src="" id="switchImg" title="切换"/>
      <input class="middleInput sreach" placeholder="终点位置..." name="popupInput" onchange="addressAutoHint(this);" onkeyup="addressAutoHint(this);"/>
      <input class="shortInput button" type="button" value="查找" name="popupButton" onclick="interestPointQuery('2')"/>
    </div>
    <div class="toolItem hidden" id="tool4">
      <div class="sreachType floatL">
      <ul class="popupUl" id="seachType">
      <li onclick="seachType('NAME LIKE \'%酒店%\'')"  class="active">酒店</li>
      <li onclick="seachType('NAME LIKE \'%宾馆%\'')" >宾馆</li>
      <li onclick="seachType('NAME LIKE \'%医院%\'')" >医院</li>
      <li onclick="seachType('NAME LIKE \'%学校%\'')" >学校</li>
      <li onclick="seachType('NAME LIKE \'%超市%\'')" >超市</li>
      </ul>
      </div>
      <input class="middleInput sreach" id="buffer" field="名称" placeholder="搜索周边信息" name="popupInput"  />
      <input class="shortInput button" type="button" value="查找"  onclick="seachVague()" name="popupButton"/>
    </div>
    </div>
  </div>
</body>
<style>
.popupDiv{
	overflow:hidden;
	position:relative;
	width:100%;
	min-width:370px;
	font-family:微软雅黑;
	font-size:12px;
	font-weight:normal;
	color:#999;
}
.popupDiv .popupTitle{
	width:100%;
	position:relative;
	height:20px;
	font-weight:bolder;
	font-size:14px;
	padding:5px 10px;
	background:url() #3b6c82;
	color:#ebebf9;
}
.popupDiv .closeImg{
	position:absolute;
	cursor:pointer;
	z-index:99;
	width:20px;
	height:20px;
	right:6px;
	top:5px;
}
.popupDiv .popupCentent{
	width:100%;
	position:relative;
}
.popupDiv .popupCentent  .popupText{
	width:100%;
	position:relative;
	display:block;
	clear:both;
	min-height:50px;
}
.popupDiv .popupCentent .popupUl{
	width:100%;
	list-style:none;
	position:relative;
	margin:0;
	padding:0;
}
#popupTools li{
	/* width:25%; */
	width:33%;
	float:left;
	text-align:center;
	padding:3px 0px;
	border:1px solid #ccc;
	border-right-width:0px;
	margin-right:-1px;
	cursor:pointer;
}
#popupTools .active{
	background:url() #EFE8E8;
	color:#2335AF;
	border-left-width:0px;
	border-right-width:0px;
}
.popupDiv .popupCentent .toolItem{
	width:100%;
	overflow:hidden;
	padding:15px 5px;
}
.popupDiv .popupCentent .toolItem .sreachType{
	width:41%;
	padding:5px 0px;
}
.popupDiv .popupCentent .toolItem .sreachType li{
	float:left;
	color:#57A3F1;
	cursor:pointer;
	padding:0px 3px;
}
.longInput{
	width:80%;
	vertical-align: middle;
}
.middleInput{
	width:35%;
	vertical-align: middle;
}
.shortInput{
	width:16%;
	vertical-align: middle;
}
.popupDiv .popupCentent .sreach{
	height:24px;
	color:#C9C9E6;
	border:1px solid #ccc;
	line-height:30px;
}
.hidden{
	display:none;
}
.floatL{
	float:left;
}
.floatR{
	float:right;
}
#switchImg{
	width:29px;
	height:30px;
	margin:0px;
	vertical-align: top;
	cursor:pointer;
}
.popupDiv .popupCentent .button{
	border-style:solid;
	background:url() #98B7D8;
	padding:7px 0px;
	border-width:0px;
	color:#F7F7F9;
	cursor:pointer;
}
</style>
<script type="text/javascript" src="main/parts/js/popup.js"></script>
</html>