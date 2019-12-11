<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<style>
#bottom-area_blank {
    position: absolute;
    z-index: 1888;
    bottom: 10px;
    left: 80px;
    right: 50px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
}
</style>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>中国铁建房地产集团有限公司</title>
<link href="resources/css/asset/font-awesome-4.4.0/css/font-awesome.min.css" rel="stylesheet">
<link href="resources/css/asset/bootstrap.min.css" rel="stylesheet">
<script type="text/javascript" src='resources/lib/jQuery/jquery.1.9.10.min.js'></script>
<script type="text/javascript" src='resources/layer/layer.js'></script>
<script type="text/javascript" src='resources/lib/jQuery/jquery.slimscroll.min.js'></script>
<script type="text/javascript" src='resources/css/asset/bootstrap.min.js'></script>
<script type="text/javascript" src='resources/common/config.js'></script>
<!-- <script type="text/javascript" src='resources/common/markerStyle.js'></script> -->
<script type="text/javascript" src='resources/common/myMapEvents.js'></script>
<script type="text/javascript" src='resources/common/style.js'></script>
<script type="text/javascript" src='resources/common/style2.js'></script>
<script type="text/javascript" src='resources/common/common.js'></script>
<script src="resources/3Dmap/examples/js/3d_map.js"></script>
<!-- 测试数据及脚本 -->
<script type="text/javascript" src='resources/test/test-data.js'></script> 
<script type="text/javascript" src='resources/test/test.js'></script> 
<script>
function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}
function gotoMap(id){
		var listproject=[];
		for(i=0;i<mapData.length;i++){
			listproject.push(mapData[i].PROJECT.ID);
		}
		if(!contains(listproject,id)){
			alert("暂无数据");
			return;
		}
		$("#loadDiv").show();
		$("#mapFrame2").attr('src',"/crailway/manager/check/BuildPage/?projectId="+id); 
		window.setTimeout("showandhide()", 3000);  
}
function gotoHtml(url){
	layer.open({
	      type: 2,
	      title: '标题',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['893px', '600px'],
	      content: 'https://www.baidu.com'
	    });
}
function showandhide(){
	$("#sreach").hide();	
	$("#left-area").hide();		
	$("#right-area").hide();		
	$("#bottom-area").hide();
	document.getElementById("maxsize").style.display="none";
	//$("#bottom-area_blank").hide();
	$("#mapdiv1").hide();
	$("#mapdiv2").show();
	$("#mapdiv3").hide();
	$("#left-bottom").hide();
	$("#loadDiv").hide();
}
function gotoMain(){
    	$("#sreach").show();	
    	$("#left-area").show();		
    	$("#right-area").show();	
    	//alert(localStorage.getItem("skinOriginal2"));
    	if(localStorage.getItem("skinOriginal2")==2){
    		$("#bottom-area").hide();
    		document.getElementById("smallsize").style.display="none";
    		document.getElementById("maxsize").style.display="block";
    	}else{
    	    $("#bottom-area").show();
    		document.getElementById("smallsize").style.display="block";
    		document.getElementById("maxsize").style.display="none";	
    	}	
	//$("#bottom-area_blank").show();
    	$("#mapdiv1").show();	
    	$("#mapdiv2").hide();
    	$("#mapdiv3").hide();
	$("#left-bottom").show();
}
function gotoQJ(id){
	$("#sreach").hide();	
	$("#left-area").hide();		
	$("#right-area").hide();	
	$("#bottom-area").hide();
	document.getElementById("maxsize").style.display="none";
	//$("#bottom-area_blank").hide();
	$("#mapdiv1").hide();	
	$("#mapdiv2").hide();
	$("#mapdiv3").show();
	$("#left-bottom").hide();
	$("#mapFrame3").attr('src',"resources/qxsy/msc-yxsy/examples/qingxsy.html?code="+id); 
}

function hidesearchdiv(){
	$('#gov_search_suggest').css('display','none'); 
}

</script>
<!-- 测试END -->

<%--echart引用--%>
	<script src="resources/lib/echart/asset/js/echarts.min.js"></script>

<link href="resources/css/index.css" rel="stylesheet">
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body>
    <input id="inputsession" type="hidden" value="${sessionScope.username}"></input>
	<div id="headdiv" class="container-fluid header" style="display:block">
	<!-- logo部分 -->
		<div class="navbar-header">
			<!-- <img class="icon-bar" src="resources/imgs/logo.jpg" /> <a
				class="navbar-brand logo-name" href=""> <strong>中国铁建房地产集团有限公司</strong>
				<span class="logo-en">CHINA RAJLWAY CONSTRUCTION REAL ESTATE
					GROUP CO.LTD</span>
			</a> -->
		</div>
		<!-- 导航 -->
		<jsp:include page="resources/parts/nav.jsp"></jsp:include>
		<!--/.nav-collapse -->
	</div>
	<div id="loadDiv" style="text-align: center; overflow-y: hidden; position: absolute; width: 103%; height: 100%; left: 0px; top: 0px; z-index: 3000; display: none; background:;">
		<div style="text-align: center; overflow-y: hidden; opacity:0.3; position: absolute; width: 103%; height: 100%; left: 0px; top: 0px; background: #B2B2B2;"></div>
		<div style="position: relative; text-align: center; top: 50%">
			<table align="center" width="100%" height="100%">
				<tr>
					<td align="center" valign="middle"><b>请稍等,数据处理中</b> <br> <img align="absMiddle" src="resources/3Dmap/examples/images/progressbar_green.gif"></td>
				</tr>
			</table>
		</div>
	</div>
	<!-- 搜索框 -->
	<div id="sreach">
		<jsp:include page="resources/parts/sreach-tool.jsp"></jsp:include>
	</div>
    <!-- 左侧内容 -->
    <div id="left-area">
		<jsp:include page="resources/parts/left-area.jsp"></jsp:include>
    </div>
    <div id="left-bottom">
         </div>
    <!-- 右侧内容 -->
    <div id="right-area">
		<jsp:include page="resources/parts/right-area.jsp"></jsp:include>
    </div>
    <!-- 下方内容 -->
    <div id="bottom-area" style="display:block;z-index:10000; position: absolute;">
    <jsp:include page="resources/parts/data-axis.jsp"></jsp:include>
    </div>
    <!-- 下方内容 -->
	<img id="maxsize" style="position:absolute;z-index: 100000;right:0px;bottom:0px;width:25px;display:none;cursor: pointer;" src="./resources/imgs/maxsize.png"></img>　　
	<!-- 浮动容器 -->
	<div id="mapdiv1"  class="container-main">
		<iframe id="mapFrame" name="mapFrame" src="/mapol"style="overflow: visible;"scrolling="yes" frameborder="no" width="100%" height="100%"></iframe>
	</div>
	<div id="mapdiv2" style="display: none" class="container-main">
		<iframe id="mapFrame2" name="mapFrame" src="" style="overflow: visible;"scrolling="yes" frameborder="no" width="100%" height="100%"></iframe>
	</div>
	<div id="mapdiv3" style="display: none" class="container-main">
		<iframe id="mapFrame3" name="mapFrame" src="" style="overflow: visible;"scrolling="yes" frameborder="no" width="100%" height="100%"></iframe>
	</div>
	<!-- 引入菜单部分 -->
    <jsp:include page="resources/parts/menu.jsp"></jsp:include>

</body>
</html>