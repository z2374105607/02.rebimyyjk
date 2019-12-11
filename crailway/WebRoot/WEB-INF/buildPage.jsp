<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"> -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>三维场景</title>
    <script src="../../../resources/3Dmap/examples/js/jquery.min.js"></script>
    	<script type="text/javascript" src='../../../resources/layer/layer.js'></script>
    <link href="../../../resources/3Dmap/examples/css/widgets.css" rel="stylesheet">
    <link href="../../../resources/3Dmap/examples/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../resources/3Dmap/examples/css/pretty.css" rel="stylesheet">
    <script src="../../../resources/3Dmap/examples/js/jquery.min.js"></script>
    <script src="../../../resources/3Dmap/examples/js/bootstrap.min.js"></script>
    <script src="../../../resources/3Dmap/examples/js/bootstrap-select.min.js"></script>
    <script src="../../../resources/3Dmap/examples/js/jquery.colorpicker.js"></script>
    <script src="../../../resources/3Dmap/examples/js/slider.js"></script>
    <link href="../../../resources/3Dmap/examples/css/pgwslideshow.min.css" rel="stylesheet">
    <script src="../../../resources/3Dmap/examples/js/pgwslideshow.min.js"></script>
    <script type="text/javascript" src="../../../resources/3Dmap/examples/js/require.min.js" data-main="../../../resources/3Dmap/examples/js/main"></script>
	<script src="../../../resources/3Dmap/examples/js/3d_config.js"></script>
	<script src="../../../resources/3Dmap/examples/js/3d_map.js"></script>
	<link href="../../../resources/3Dmap/examples/css/font-awesome.min.css" rel="stylesheet">
	<link href="../../../resources/3Dmap/examples/css/index.css" rel="stylesheet" >
	<script type="text/javascript" src='../../../resources/common/config.js'></script>
<style>
   		.map-change{position:absolute;right:10px;top:10px;background:#fff;box-shadow:1px 2px 1px rgba(0,0,0,.15);width:82px;height:62px;overflow:hidden;z-index:99999;}
		.map-change ul.c-type{float:left;width:234px;height:56px;padding:3px;}
		.map-change ul.c-type li{float:left;width:70px;height:50px;margin:3px;}
	    .map-change ul.c-type li a{display:block;width:70px;height:50px;position:relative;}
	    .map-change ul.c-type li a.sa{background:url(../../../resources/3Dmap/examples/images/map_thumb_btn1.png) 0 0 no-repeat;}
	    .map-change ul.c-type li a.sb{background:url(../../../resources/3Dmap/examples/images/map_thumb_btn2.png) 0 0 no-repeat;}
	    .map-change ul.c-type li a.sc{background:url(../../../resources/3Dmap/examples/images/map_thumb_btn3.png) 0 0 no-repeat;}
	    .map-change ul.c-type li span{position:absolute;right:0;bottom:0;width:40px;height:18px;font-size:12px;line-height:18px;text-align:center;color:#fff;}
	    .map-change ul.c-type li.active a{border:1px solid #2586ff;width:68px;height:48px;border-radius:2px;}
	    .map-change ul.c-type li.active span{width:40px;height:17px;background:#2586ff;}
#bottom-area_blank {
    position: absolute;
    z-index: 1888;
    bottom: 10px;
    left:80px;
    right: 50px;
    	bottom: 50px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
}
#bottom-area {
	bottom: 50px;
    left:80px;
    right: 50px;
	padding-right: 50px;
}
    .btn-primary2{
        backgrund-color:#0289e3;
    }
        .zhanKs{
        height:auto!important;
        }
		.uls{
            width: 100%;
            background-color: rgba(255,255,255,0.4);
            position: absolute;
            bottom: 0;
            left: 0;
            z-index:1000;
        }
        .uls li{
            margin:0 15px;
        }
         .uls li:nth-child(1):before{
            content: "●";
            color: #999999;
            margin-right: 5px;
            font-size: 25px;
            vertical-align: sub;
        }
        .uls li:nth-child(2):before{
            content: "●";
            color: #00A757;
            margin-right: 5px;
            font-size: 25px;
            vertical-align: sub;
        }
        .uls li:nth-child(3):before{
            content: "●";
            color: #F2B145;
            margin-right: 5px;
            font-size: 25px;
            vertical-align: sub;
        }
        .uls li:nth-child(4):before{
            content: "●";
            color: #EB5945;
            margin-right: 5px;
            font-size: 25px;
            vertical-align: sub;
        }
        .uls li:nth-child(5):before{
            content: "●";
            color: #2A91D8;
            margin-right: 5px;
            font-size: 25px;
            vertical-align: sub;
        }

.cesium-viewer-bottom{
	display:none;
}
.ps-list ul{
width:100%!important;
}
.ps-current img{
            width: 100%;
            height: 150px;
        }
.pgwSlideshow img{
	max-width:100%;
}
    	.progress-bar {
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #428bca;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    -webkit-transition: width .6s ease;
    transition: width .6s ease;
}
    .btn-group-vertical > .btn, .btn-group > .btn {
    position: initial;
    float: left;
}
     body{
            overflow-x: hidden;
                font-family: Microsoft YaHei;
        }
        .margin-left1000{
            position: absolute;
            left: -100000000px;
        }
        header {
            overflow: hidden;
            background-color: #f7f7f9;
            position: fixed;
    			top: 65px;
        left:10px;
        right:10px;
   			z-index: 9;
   			<%--width: 97%;--%>
   			    border-left: 1px solid #dfe0e2;
    border-bottom: 1px solid #dfe0e2;
    border-right: 1px solid #dfe0e2;
    border-top: 3px solid #0289e3;
        }

        header ul li {
            cursor: pointer;
            margin: 0 !important;
        }

        .color {
            background-color: #5BC05D;
            color: #ffffff;
        }

        .border-r {
            border-right: 1px solid #ffffff;
        }

        .color2 {
            background-color: #1F87DF;
            color: #ffffff;
        }



        .lists li {
            margin-top: 5px !important;
            padding: 5px 15px;
            position: relative;
            font-size:12px;
        }
.lists li:nth-child(1){
margin-left:10px!important;
}
        .s-wrap, .s-wrap2 {
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            border-right-color: #ffffff;
        }

        .s-wrap {
            position: absolute;
            right: -6px;
            top: 9px;
            border-right: 1px solid #fff;
            border-top: 1px solid #fff;
            background-color: #5BC05D;
            z-index:1000;
        }

        .s-wrap2 {
            position: absolute;
            right: -6px;
            top: 9px;
            border-right: 1px solid #fff;
            border-top: 1px solid #fff;
            background-color: #1F87DF;
            z-index:1000;
        }

        .list2 li {
            padding: 8px;
        }

        .actives {
            color: #ffffff;
            background-color: #1F87DF;
        }

        .titles {
                padding: 7px 18px;
    border-bottom: 1px solid #e2e2e2;
    background-color:#fbfbfb;
    <%--font-weight: bold;--%>
    color:#666666;
        }
.border-all .table > tbody > tr > td{
border-top: 1px solid transparent;
    border-bottom: 1px solid #ddd;
}
.border-all .table > tbody tr td:first-child{
    border-right:1px solid #ddd;
}
        .border-all {
            border: 1px solid #e2e2e2;
            margin: 6px 4px 10px 0!important;
        }
        .ps-caption{
            display: none!important;
        }
        /*项目施工进度样式*/
        .spanStyle span:nth-child(3){
            margin-left: 10px;
            color: red;
        }
        .col-lg-7 ul li, .col-md-7  ul li,.col-sm-7 ul li{
            margin: 0;
            padding: 5px;
        }
        .col-lg-7 ul li:nth-child(1), .col-md-7 ul li:nth-child(1),.col-sm-7 ul li:nth-child(1){
            background-color: #FDF8E3;
            cursor: pointer;
        }
        .col-lg-7 ul li:nth-child(2), .col-md-7 ul li:nth-child(2),.col-sm-7 ul li:nth-child(2){
            background-color: #D8EEF6;
            cursor: pointer;
        }
        .col-lg-7 ul li:nth-child(3), .col-md-7 ul li:nth-child(3),.col-sm-7 ul li:nth-child(3){
             background-color:#F3DDE0 ;
            cursor: pointer;
         }
        .col-lg-7 ul li:nth-child(4), .col-md-7 ul li:nth-child(4),.col-sm-7 ul li:nth-child(4){
            background-color:#DEF0D6 ;
            cursor: pointer;
        }
        th{
            text-align: center;
        }
        .bgTable{

        }
      body{
        overflow-y: auto!important;
        font-family: Microsoft YaHei;
      }
        ul li{
        font-family: Microsoft YaHei;
        }

  .div3_map2{
  width:56%;

  vertical-align: top;
  margin: 0 0.6%;
  }
  .div3_map{
  width:77.37%;

  vertical-align: top;
  margin: 0 0.6%;
  }
 .grayGrid{
   width:30px;
   height:10px;
   display:inline-block;
   background-color:#999999;
  }
  .greenGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#5CC15E;
  }
    .yellowGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#ffff00;
  }
    .redGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#ff0000;
  }
    .blueGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#2A91D8;
  }
    .ziGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#2A91D8;
  }
    .whiteGrid{
   width:30px;
   height:10px;
    display:inline-block;
   background-color:#ffffff;
  }
  .table-striped > tbody > tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}
.table-striped > tbody > tr:nth-of-type(even) {
    background-color: #fff;
}
.rTable th{
	background-color:#fff;
}
.table > tbody > tr > td, .table > tbody > tr > th{
 <%--font-weight: bold;--%>
 color:#666666;
    font-size:12px;
}
.table-bordered > thead > tr > th{
color:#666666;
    font-weight: normal;
}
.small-img img{
	   width: 20%;
    height: 75%;
    margin-top: 4%;
}
.small-img img:first-child{
    margin-left: 17px;
}

.small-img{
	background-color:#dddddd;
	height:65px;
}
.tab-left{
    width: 14px;
    height: 59px;
    position: absolute;
    bottom: 3px;
    left: 0;
    z-index: 100;
    background-color: #0289e3;
    cursor: pointer;
}
.tab-left-icon{
    width: 10px;
    height: 10px;
    background-color: transparent;
    position: absolute;
    bottom: 27.5px;
    left: 5px;
    z-index: 101;
    transform: rotate(45deg);
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
}
.tab-right-icon{
    width: 10px;
    height: 10px;
    background-color: transparent;
    position: absolute;
    bottom: 27.5px;
    right: 5px;
    z-index: 101;
    transform: rotate(45deg);
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
}
.tab-right{
    width: 14px;
    height: 59px;
    position: absolute;
    bottom: 3px;
    right: 0;
    z-index: 100;
    background-color: #0289e3;
    cursor: pointer;
}
 .openfullimg{
    	float:right;
    	margin-right:3px;
    	margin-bottom:3px;
    }
    
.border-w{
	    border: 2px solid #fff;
}
        #dv1 .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
        padding: 7.5px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
        }
    #table > tbody > tr > td,#table > tbody > tr > th{
    white-space: nowrap!important;
    font-weight: normal;
    }
#expander{ width:100%; height:6px; background-color:#999;}
#expander:hover{ cursor:s-resize;}

.smallShowHideBtn {
    width:11px;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    top: 50%;
    position: absolute;
    border: 1px solid rgb(32, 108, 141);
}

.leftbtnsh {
    float: left;
    left: 221px;
}

.rightbtnsh {
    float: right;
    right: 360px;
}
.triangle_border_left {
    width: 0;
    height: 0;
    border-width: 10px 5px 10px 0;
    border-style: solid;
    border-color: transparent rgb(32, 108, 141) transparent transparent;
    margin: 15px auto;
    position: relative;
    cursor: pointer;
}

.triangle_border_right {
    width: 0;
    height: 0;
    border-width: 10px 0px 10px 5px;
    border-style: solid;
    border-color: transparent transparent transparent rgb(32, 108, 141);
    margin: 15px auto;
    position: relative;
    cursor: pointer;
}  
    </style>
</head>
<body onload="javascript:initmap()">
	<!-- 底部进度条 -->
<div id="bottom-area" style="display:block;z-index:10000; position: fixed;rigth:50px;left:80px">
<img id="smallsize" style="position:absolute;z-index: 100000;right:5px;top:0px;width:15px;    cursor: pointer;" src="../../../resources/imgs/smallsize.png"></img>
	<div style="position:relative;width:100%;height:100%;">
	 
	<ul id="axisControl">
	<!-- 	<li handle="last" data-toggle="tooltip" title="" data-original-title="上一项">
			<span class="fa fa-angle-left"></span>
		</li> -->
		<li handle="play"  data-toggle="tooltip" title="" data-original-title="自动切换">
			<span class="fa fa-play " style="font-size:16px;top:-2px;left:0px;position:relative"></span>
		</li>
<!-- 		<li handle="next"  data-toggle="tooltip" title="" data-original-title="下一项">
			<span class="fa fa-angle-right"></span>
		</li> -->
	</ul>
	<div class="progress">
  	<div class="progress-bar year-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%;"></div>
	</div>
	<div id="year-items" class="year-items"></div>
	</div>
</div>
　
<!--头部面包屑导航-->
<header>
    <ul class="nav nav-pills pull-left lists">
        <li onclick="javascript:parent.gotoMain()" class="color border-r">系统首页
        <div class="s-wrap"></div>
        </li>
        <li class="color2 border-r">${projects.projectName }
        <div class="s-wrap2"></div>
        </li>
        <li id="l1_text" class="color2">项目销售进度
        </li>

    </ul>
    <ul class=" nav nav-pills pull-right list2">
        <li id="l1_shigong" class="">项目施工进度</li>
        <li id="l1_xiaoshou" class="actives">项目销售进度</li>

    </ul>
</header>
<!--项目施工-->
<div style="margin-top: 105px;" class="block">
    <!--分类2块-->
    <div id="dv_w" style="height:82%;width:210px;    position: absolute;z-index: 9999;">
    <div id="dv_hideshowbt" class="smallShowHideBtn leftbtnsh" style="display:none">
        <div onclick="showLeftDiv(this);" class="triangle_border_left"></div>
    </div>
    <div id="dv1" style="    background: white;width:100%;display:inline-block;margin-left: 10px;vertical-align: top;overflow-y: auto;">

        <!--轮播图-->
        <%-- <ul class="pgwSlideshow" style="margin: 0 4%; width:92%;">
            <li><img src="${projects.hxurl }"  alt="..." data-description="..."></li>
            <li><img src="../../../resources/3Dmap/examples/img/honk-kong.jpg" alt="" data-large-src="../../../resources/3Dmap/examples/img/honk-kong.jpg"></li>
            <li>
                 <a href="#" target="_blank">
                    <img src="../../../resources/3Dmap/examples/img/rio.jpg" alt="...">
                </a> 
            </li>

        </ul> --%>
        <img id="img_vr" alt="" src="../../../resources/imgs/img_vr.png" style=" width: 25px;height: 25px;     display: none;position: absolute;">
        <div style="border:1px solid #e2e2e2;padding:2px;">

        	<img id="tabImg" alt="" src="${defortlianjie}" style="width: 19vw;height:25vh;">
			
        	<div style="position:relative;">
	        	<div id="layer-photos-demo" class="small-img lunbo">
							<c:forEach items="${lianjie}" var="lianjie">
								<img alt="户型" layer-src="${lianjie}" src="${lianjie}"
									class="border-w">

							</c:forEach>
						</div>
	        	<div class="tab-left"></div>
	        	<div class="tab-right"></div>
	        	<div class="tab-left-icon"></div>
	        	<div class="tab-right-icon"></div>
        	</div>

        </div>
        <!--轮播图完毕-->
        <div style='padding:0; border-right: 6px solid #ebebeb;position:relative;'>
        <div style="width:6px;height:76px;background-color:#319de5;position:absolute;top:0;right:-6px;z-index:10;"></div>
         <ul class="nav border-all" style="margin:6px 4px 10px 10px;; border: 1px solid #e2e2e2;">
            <li class="titles">楼盘介绍</li>
            <li style="text-indent: 24px;position:relative;padding:10px;height:180px;color:#666666;line-height:20px;overflow: hidden;">
            ${projects.lpjs }
            </li>
        </ul>
        <!--楼盘基本信息-->
        <ul class="nav border-all">
            <li class="titles">基本信息</li>
            <li>
                <table class="table table-condensed">
                    <tr>
                        <td style="width:88px;text-align:center;">所属区县</td>
                        <td style="padding-left:15px;">${projects.ssqx }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">所属商圈</td>
                        <td style="padding-left:15px;">${projects.sssq }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">楼盘地址</td>
                        <td style="padding-left:15px;">${projects.lpdz }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">销售状态</td>
                        <td style="padding-left:15px;">${projects.xszt }</td>
                    </tr>
            			<tr>
                        <td style="width:88px;text-align:center;">项目特色</td>
                        <td style="padding-left:15px;">${projects.xmts }</td>
                    </tr>
                     <tr>
                        <td style="width:88px;text-align:center;">开发商</td>
                        <td style="padding-left:15px;">${projects.kfs }</td>
                    </tr>
                </table>
            </li>
           </ul>

           <ul  class="nav border-all">
            <li class="titles">销售信息</li>
            <li>
                <table class="table">
                    <tr>
                        <td style="width:88px;text-align:center;">开盘时间</td>
                        <td style="padding-left:15px;">${projects.kpsj }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">入住时间</td>
                        <td style="padding-left:15px;">${projects.rzsj }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">价格详情</td>
                        <td style="padding-left:15px;">${projects.jgxq }</td>
                    </tr>
                    <tr>
                        <td style="width:88px;text-align:center;">售楼地址</td>
                        <td style="padding-left:15px;">${projects.sldz }</td>
                    </tr>
           			<tr>
                        <td style="width:88px;text-align:center;">售楼许可证</td>
                        <td style="padding-left:15px;">${projects.slxkz }</td>
                    </tr>
                </table>
            </li>
        </ul>
    </div>

    </div>
    </div>
    <!--地图展示和数据展示-->
    </ul>
    <div id="div3_map" class="div3_map" style="overflow: hidden;height: 50%;display:inline-block;">
    <div id ="top" style="position:relative">
    <button id="bt_xq" style="left: 10px;position: absolute;top: 10px;background: #fff;width: 82px;height: 32px;overflow: hidden;z-index: 99999;">详情</button>
    <button id="bt_sgjd" style="left: 100px;position: absolute;top: 10px;background: #fff;width: 82px;height: 32px;overflow: hidden;z-index: 99999;">施工进度</button>
    <button id="bt_hide" style="display:none;left: 190px;position: absolute;top: 10px;background: #fff;width: 82px;height: 32px;overflow: hidden;z-index: 99999;">关闭</button>
    <button id="bt_xsjd" style="left: 10px;position: absolute;top: 10px;background: #fff;width: 82px;height: 32px;overflow: hidden;z-index: 999;">销售进度</button>
    <button id="bt_hide2" style="display:none;left: 100px;position: absolute;top: 10px;background: #fff;width: 82px;height: 32px;overflow: hidden;z-index: 999;">关闭</button>
    <ul id="ul_tuli2" class="nav nav-pills uls">
                <li>未开始</li>
                <li>正常或按期完成</li>
                <li>延期未开始，延期进行中</li>
                <li>延期未完成</li>
                <li>延期完成</li>
                <li id="maxsize" onclick="javascript:showprogress();" style=" display:none; margin:5px 0;" ><img style="width:22px;height:22px" src="./../../../resources/imgs/maxsize.png" /></li>
                <li onclick="javascript:openfull();"  style="display:none;float:right;margin:5px 0;" ><img src="./../../../resources/imgs/openfull.png" /></li>
    </ul>
    <ul id="ul_tuli" class="nav nav-pills" style=" width: 100%;background-color:rgba(225,225,225,0.5);padding: 5px 0 0 0;position: absolute;bottom: 0;color: #fff;z-index: 1000;">
        <li style="margin: 0 10px;">
            <span style="display:inline-block;width:25px; height: 25px;background-color: #ffffff;"></span>
        </li>
        <li style="line-height: 25px;margin: 0 10px 0 0;">待售</li>
        <li style="margin: 0 10px 0 20px;">
            <span style="display:inline-block;width: 25px;height: 25px;background-color: #ff0000;"></span>
        </li>
        <li style="line-height: 25px;margin: 0 10px 0 0;">认购</li>
        <li style="margin: 0 10px 0 20px;">
            <span style="display:inline-block;width: 25px;height: 25px;background-color: #ffff00;"></span>
        </li>
        <li style="line-height: 25px;margin: 0 10px 0 0;">预留</li>
        <li style="margin: 0 10px 0 20px;">
            <span style="display:inline-block;width: 25px;height: 25px;background-color: #cc00ff;"></span>
        </li>
        <li style="line-height: 25px;margin: 0 10px 0 0;">签约</li>
        <li onclick="javascript:openfull2();" style="display:none;float:right;"><img src="./../../../resources/imgs/openfull.png" /></li>
    </ul>

        <div id="cesiumContainer" alt="" style="width: 100% ;height:100%">
        
        <div id="dv3" style="width:19.79%;display:inline-block;margin-left: 10px;vertical-align: top;z-index:999999;  background-color:#fff;    position: absolute;">
        <div style="border:1px solid #e2e2e2;margin:2px;">
        
        	<div style="position:relative;">
        	</div>
        </div>
        <!--轮播图完毕-->
        <div style='padding:0; border-right: 0px solid #ebebeb;position:relative;'>
      
         <ul class="nav border-all" style=" border: 0px solid #e2e2e2;">
            <li class="titles" style="font-size: 12px;" >房间介绍<span onclick="hidediv3()" style="float:right;cursor:pointer" ></span></li>
    		<table class="table table-bordered table-condensed">
            <tr>
                <td>房间号：</td>
                <td id="td1"></td>
            </tr>
            <tr>
                <td>户型：</td>
                <td id="td2"></td>
            </tr>
            <tr>
                <td>建筑面积：</td>
                <td id="td3"></td>
            </tr>
            <tr>
                <td>使用面积：</td>
                <td id="td4"></td>
            </tr>
            <tr>
                <td>价格：</td>
                <td id="td5"></td>
            </tr>
        </table>
        </ul>
    </div>

    </div>
        		<div class="map-change">
		        <ul class="c-type">
		        	<li style="list-style-type:none; " class="active"><a class="sa" href="javascript:changgemaptype(1);"><span>地图</span></a></li>
		        	<li style="list-style-type:none; " ><a class="sb" href="javascript:changgemaptype(2);"><span>影像</span></a></li>
		        	<li style="list-style-type:none; "><a class="sc" href="javascript:changgemaptype(3);"><span>地形</span></a></li>
		        </ul>
		    </div>

        </div>
          </div>
		
        <div id="div4" class="col-lg-5 col-md-5 col-sm-5 table-responsive" style="    /* bottom: 35px; */
  
    /* height: 185px; */
    margin-top: 10px;
    display: block;
    right: 15px;
    background: white;
    position: absolute;
    z-index: 999;">
    <span onclick="hidediv4()" style="float:right;cursor:pointer;    padding: 2px;" ></span>
             <table id="building_table" class="table table-bordered table-condensed" style="margin-top:20px;">
           
        	</table>

    	</div>
        <div id="dv2" class="col-lg-7 col-md-7 col-sm-7 table-responsive" style="padding-left:0;margin-top: 10px;
            padding-left: 0px;
    /* margin-top: 10px; */
    display: block;
    position: absolute;
    z-index: 999;
    right: 0;
    bottom:5px;
    overflow: hidden;">
            <!--小区详情-->

        <div id="btn_four" style="display:none;" class="btn-group"  role="group" aria-label="...">
            <button type="button" class="btn btn-primary2 btn-default" onclick="saleInfo(1)">待售</button>
            <button type="button" class="btn btn-default"  onclick="saleInfo(2)">认购</button>
            <button type="button" class="btn btn-default"  onclick="saleInfo(3)">预留</button>
            <button type="button" class="btn btn-default"  onclick="saleInfo(4)">签约</button>

        </div>
        <!--楼层表格信息-->
        <div id="dv6" class="table-responsive" style="height:380px">
        <table id="table" class="table table-bordered table-striped text-center table-condensed">

        </table>
        </div>
        </div>
		    <div id="expander" style="display: none"></div>
    <!--项目施工地图下面表格  -->
    <div id="div_sg" style="top: 178px;left: 15px;     height: 494px; overflow-y: auto;   position: absolute;display:none;">
    <!--房屋购买情况-->
    <div >
        <ul class="nav nav-pills">

        </ul>
        <table class="table table-bordered text-center table-striped table-condensed" style="    background-color: #fff;">
         <thead>
          <tr>
        <th rowspan="2" style="vertical-align: middle;">序号</th>
        <th rowspan="2" style="vertical-align: middle;">指标名称</th>
        <th colspan="2">一期可研计划</th>
        <th colspan="2">一期实际计划</th>
        <th colspan="2">二期可研计划</th>
        <th colspan="2">二期实际计划</th>
    		</tr>
    <tr>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>开始时间</th>
        <th>结束时间</th>
                <th>开始时间</th>
        <th>结束时间</th>
                <th>开始时间</th>
        <th>结束时间</th>
    </tr>
         </thead>


<c:forEach var="dto" items="${stages}" varStatus="mess">

             <c:choose>

   <c:when test="${dto.stageName=='一期'}">

               <tr  <c:if test="${dto.procedureName==projects.stageNode }">style="background:#98FB98"</c:if>> <td>${Integer.valueOf((mess.count/2)+1-0.5).intValue()}</td>
                <td class="bgTable">${dto.procedureName }</td>
                <td class="bgTable">${dto.planStartDate }</td>
                <td class="bgTable">${dto.planEndDate }</td>
                <td class="bgTable">${dto.cusStartDate }</td>
                <td class="bgTable">${dto.cusEndDate }</td>
                
   </c:when>
   <c:otherwise>
                <td class="bgTable">${dto.planStartDate }</td>
                <td class="bgTable">${dto.planEndDate }</td>
                <td class="bgTable">${dto.cusStartDate }</td>
                <td class="bgTable">${dto.cusEndDate }</td> </tr>

   </c:otherwise>

			</c:choose>
</c:forEach>

        </table>
    </div>
</div>

    </div>
	<div id="1right" style="position: absolute;top: 178px;left: 15px;width:19.79%;display:inline-block;vertical-align: top;background-color: #f9f9fb;border-top:3px solid #55b256;border: 1px solid #dfe0e2';">
	  <h5 style="color:#666666;padding: 11px 10px;background-color: #f7f7f9;margin: 0;border-bottom: 1px solid #dfe0e2;">项目施工进度</h5>
	  <table id="table_sg" class="table  table-bordered table-striped rTable table-condensed" style="margin: 0 2% 20px;width: 96%;">
	  </table>
	</div>
	<div id="2right" style="position: absolute;top: 178px;left: 15px;width:22.79%;display:inline-block;vertical-align: top;background-color: #f9f9fb;border-top:3px solid #55b256;border: 1px solid #dfe0e2">
	  <h5 style="color:#666666;padding: 11px 10px;background-color: #f7f7f9;margin: 0;border-bottom: 1px solid #dfe0e2;">项目销售进度</h5>
	  <table id="table_sg2" class="table  table-bordered table-striped rTable table-condensed" style="margin: 0 2% 20px;width: 96%;">
	  </table>
	  <table class="table table-bordered table-condensed">
        		<tr><th colspan="3">项目销售进度表</th></tr>
            <tr>
                <td>销售面积：总计<b>${projects.kgmjArea }</b>m²</td>
                <td>住宅：<b>【0】</b>m²</td>
                <td>商业：<b>【0】</b>m²</td>
            </tr>
            <tr>
                <td>均价：<b>约12500</b>元/m²</td>
                <td>住宅：<b>【0】</b>元/m²</td>
                <td>商业：<b>【0】</b>元/m²</td>
            </tr>
            <tr>
                <td>销售金额：<b>【18927】</b>万元</td>
                <td>住宅：<b>【0】</b>万元</td>
                <td>商业：<b>【0】</b>万元</td>
            </tr>
            <tr>
                <td>房源面积：<b>${projects.jgmjArea }</b>元m²</td>
                <td>住宅：<b>【0】</b>m²</td>
                <td>商业：<b>【0】</b>m²</td>
            </tr>
        </table>
	</div>
</div>
<!--项目销售进度-->


<script>
var onsmall = 'big';
 function openfull(){
	var winheight = window.innerHeight;
	//var style = $("#dv1").css("display");
	//alert(style);
	//alert(winheight+"-"+$("#nav-wrap",parent.document).height()+"-"+$("header").height());
	if(onsmall == 'big'){
		$("#1right").show();
		$("#2right").hide();
		$("#div3_map").css({width:'77.37%'});
		$("#cesiumContainer").css({height:303});
		$("#expander").show();
		onsmall = 'small';
	}else{
		$("#expander").hide();
		$("#1right").hide();
		$("#2right").hide();
		$("#div3_map").css({width:'99%'});
		$("#cesiumContainer").css({height:(winheight-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
		onsmall = 'big';
	}
}
function openfull2(){
	var winheight = window.innerHeight;
	if(onsmall == 'big'){
		$("#dv1").show();
		$("#div3_map").css({width:'56%'});
		$("#cesiumContainer").css({height:303});
		onsmall = 'small';
		$("#1right").hide();
		$("#2right").show();
		$("#expander").show();
	}else{
		$("#1right").hide();
		$("#2right").hide();
		$("#dv1").hide();
		$("#div3_map").css({width:'99%'});
		$("#cesiumContainer").css({height:(winheight-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
		onsmall = 'big';
	}
} 
/* $("#div_sg").mousedown(function(myEvent){
	myEvent = event || window.event;
	var fy = myEvent.clientY;
	var fx = myEvent.clientX;
	var selfx=$(this).offset().left;  
var selfy=$(this).offset().top;  
var wx=fx-selfx;//得到鼠标位置和元素当前位置之间的差，方便下面mousemove事件里使用clientX(Y)换算对应的top(left)值。  
var wy=fy-selfy;
$(this).bind("mousemove",function(moveEvent){
	var movex = moveEvent.clientX;
	var movey = moveEvent.clientY;
	var divwidth = $("#div").width()+(movex-fx);
	var divheight = $("#div").height()+(movey-fy);
	$(this).css({width:divwidth<0?0:divwidth,height:divheight<0?0:divheight});
	fy = movey;
	fx = movex;
	});
//;  
});
$("#div_sg").mouseup(function(myEvent){
		$(this).unbind("mousemove");
		
	}); */
function showMarker(){
	sgColor();
	$.ajax({
		 url:"../getBuild",
		 data:{"projectId":"${projectId}"},
		 dataType:"json",
		 success:function(data){
			 viewer.entities.removeAll();
			 for(i=0;i<mainData.BUILDING.length;i++){
		 			var layer1 = scene.layers.find(mainData.BUILDING[i].LAYER);
		 			viewer.entities.add(new Cesium.Entity({
		      			  position : new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z+0.15),
		      				label :{
		           		 	text : mainData.BUILDING[i].NAME,
							font:'10px sans-serif',
		        			},
		       		  name : mainData.BUILDING[i].NUMBER
		    		}));
				 viewer.entities.add(new Cesium.Entity({
		       			  position :new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z),
		        			 billboard :{
		            		 image : imgSg [data[parseInt( mainData.BUILDING[i].NUMBER)-1].state],
		            		 width: 25,
		            		 height:30,
		
		         			},
		        		  name : mainData.BUILDING[i].NUMBER
		     		}));
			 }
			
		 }
		});
}
function showMarker2(){
	$.ajax({
		 url:"../getBuild",
		 data:{"projectId":"${projectId}"},
		 dataType:"json",
		 success:function(data){
		
			 //viewer.entities.removeAll();
			 for(i=0;i<mainData.BUILDING.length;i++){
				 var layer1 = scene.layers.find(mainData.BUILDING[i].LAYER);
				 viewer.entities.add(new Cesium.Entity({
		      			  position : new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z+0.15),
		      				label :{
		           		 	text : mainData.BUILDING[i].NAME,
							font:'10px sans-serif',
		        			},
		       		  name : mainData.BUILDING[i].NUMBER
		    		}));
		 		 viewer.entities.add(new Cesium.Entity({
	        			  position : new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z),
	         			 billboard :{
	             		 image : imgSale [data[parseInt(mainData.BUILDING[i].NUMBER)-1].salestate],
	             		 width:20,
	            		     height:30,
	          			},
	         		  name : mainData.BUILDING[i].NUMBER
	      		})); 
			 }
		 }
		});
}
function showMarker3(){
	$.ajax({
		 url:"../getBuild",
		 data:{"projectId":"${projectId}"},
		 dataType:"json",
		 success:function(data){
		
			 viewer.entities.removeAll();
			 for(i=0;i<mainData.BUILDING.length;i++){
				 var layer1 = scene.layers.find(mainData.BUILDING[i].LAYER);
				 viewer.entities.add(new Cesium.Entity({
		      			  position : new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z+0.15),
		      				label :{
		           		 	text : mainData.BUILDING[i].NAME,
							font:'10px sans-serif',
		        			},
		       		  name : mainData.BUILDING[i].NUMBER
		    		}));
		 		 viewer.entities.add(new Cesium.Entity({
	        			  position : new Cesium.Cartesian3.fromDegrees(mainData.BUILDING[i].BULIDINGMARKER_X,mainData.BUILDING[i].BULIDINGMARKER_Y,mainData.BUILDING[i].BULIDINGMARKER_Z),
	         			 billboard :{
	             		 image : imgSale [data[parseInt(mainData.BUILDING[i].NUMBER)-1].salestate],
	             		 width:20,
	            		     height:30,
	          			},
	         		  name : mainData.BUILDING[i].NUMBER
	      		})); 
			 }
		 }
		});
}
var winheight2 = 0;
var destHeight = 303;
var flagType=0;
layer.photos({
  photos: '#layer-photos-demo'
  ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
}); 
var scrollFunc = function (e) {  
                e = e || window.event;  
                if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                        console.log("滑轮向上滚动");  
                        var t = document.documentElement.scrollTop || document.body.scrollTop; 
                        console.log(t);
                        if(t<30){
                        	//$("#dv6").height(window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-destHeight+"px");
                        }
                    }  
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                        console.log("滑轮向下滚动"); 
                  		console.log(e.wheelDelta);
                  		//$("#dv6").height($("#dv1").height()-$("#cesiumContainer").height()-$("#btn_four").height()-20+"px");
                    }  
                } else if (e.detail) {  //Firefox滑轮事件  
                    if (e.detail> 0) { //当滑轮向上滚动时  
                        console.log("滑轮向上滚动");  
                    }  
                    if (e.detail< 0) { //当滑轮向下滚动时  
                        console.log("滑轮向下滚动");  
                    }  
                }  
            }
            //给页面绑定滑轮滚动事件  
         /*    if (document.addEventListener) {//firefox  
                document.addEventListener('DOMMouseScroll', scrollFunc, false);  
            }  
            //滚动滑轮触发scrollFunc方法  //ie 谷歌  
            window.onmousewheel = document.onmousewheel = scrollFunc; */
var index ;
function initmap() {
    
	if(localStorage.getItem("skinOriginal")==2){
		hidediv();
	}else{
		showprogress();
	}
	if( typeof(Cesium) == 'undefind'){
		setTimeout(function(){
			initmap();
		},500);
		return;
	}
		$("#tabImg").click(function(e){
     			 layer.photos({ photos: {"data": [{"src": e.target.src}]} });
     	});
     	$("#bt_xq").click(function(e){
     			console.log(viewer.camera.heading+"++++"+viewer.camera.pitch+"+++"+viewer.camera.roll+"+++"+viewer.camera.position.x+"+++"+viewer.camera.position.y+"+++"+viewer.camera.position.z);
     		
     			$("#bt_xq").css("background","#428bca");
     			$("#bt_sgjd").css("background","#ffffff");
     			$("#1right").show();
     			$("#div_sg").hide();
     			$("#bt_hide").show();
     			
     	});
     	$("#bt_sgjd").click(function(e){
     			$("#bt_sgjd").css("background","#428bca");
     			$("#bt_xq").css("background","#ffffff");
     			$("#1right").hide();
     			$("#div_sg").show();
     			$("#bt_hide").show();
     	});
     	$("#bt_hide").click(function(e){
     			$("#1right").hide();
     			$("#div_sg").hide();
     			$("#bt_hide").hide();
     			$("#bt_sgjd").css("background","#ffffff");
     			$("#bt_xq").css("background","#ffffff");
     	});
     	$("#bt_xsjd").click(function(e){
     			$("#2right").show();
     			$("#bt_hide2").show();
     			
     			
     	});
     	$("#bt_hide2").click(function(e){
     			$("#2right").hide();
     			$("#bt_hide2").hide();
     	});
	try{
        if(Cesium){
       	   // viewer = new Cesium.Viewer('cesiumContainer');
       	    viewer = new Cesium.Viewer('cesiumContainer',{
        		   	   infoBox : false
            });
        /* viewer.imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
            credit : new Cesium.Credit('天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'),
            token: '4a00a1dc5387b8ed8adba3374bd87e5e'
        }));
        var imageryLayers = viewer.imageryLayers;
        //初始化天地图全球中文注记服务，并添加至影像图层
        var labelImagery = new Cesium.TiandituImageryProvider({
            mapStyle : Cesium.TiandituMapsStyle.CIA_C, //天地图全球中文注记服务（经纬度投影）
            token: '4a00a1dc5387b8ed8adba3374bd87e5e'
        });
        imageryLayers.addImageryProvider(labelImagery); */
        	 scene = viewer.scene;
             
             var widget = viewer.cesiumWidget;

     		var promise = scene.open(mainData.URL);
 
         promise.then(function(layers){
     		 mapLayer.forEach(function (value, key, mapLL) {
     				var layer = scene.layers.find(value);
     				layer.cullEnabled = false;
     		 });
             viewer.camera.setView({
             	destination : new Cesium.Cartesian3(mainData.X, mainData.Y, mainData.Z),
                 orientation: {
                   heading : mainData.HEADING, 
                   pitch : mainData.PITCH,  
                   roll : mainData.ROLL                  
                 }
             });
     		showMarker();
     		
     	  document.getElementById("1right").click=function(){//当鼠标滑出
     	  
     	}    
     		 
             /*  var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

             //设置鼠标左键单击回调事件
             handler.setInputAction(function(e) {
            //首先移除之前添加的点
            viewer.entities.removeAll();
            //获取点击位置笛卡尔坐标
            var position = scene.pickPosition(e.position);
     	   //将笛卡尔坐标转化为经纬度坐标
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            if(height < 0) {
                height = 0;
            }
            alert(longitude+"+++"+latitude+"+++"+height);
                    viewer.entities.add({
                        position : Cesium.Cartesian3.fromDegrees(longitude,latitude,height+5),
                        billboard :{
                            image : imgSg[0],
                            width:30,
                            height:40,
                            
                        }
                        // name : selectedFeatures[i].fieldValues["11"],
                        // description: "121212121212"
                    });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);  */

      	viewer.selectedEntityChanged.addEventListener(function(entity){
		index= layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
			
     		    if(!entity){
                   layer.close(index); 
                     return ;
                 }
                 if($("#dv1").is(":hidden")){
            
                 showMarker3();
                 }else{
                 showMarker2();
                 }
                 
     		/* 	var mylayer = scene.layers.find("T4@白模");
     					mylayer.removeAllObjsColor();
     					var arry5 = new Array();
     					var arry2 = new Array();
     					var arry3 = new Array();
     					for(i=0;i<1000;i++){
     					if( i%3==0){
     					arry5.push(i);
     					}else if(i%7==0){
     					arry2.push(i);
     					}else{
     					arry3.push(i);
     					}
     						
     						
     						
     					} */
     					/* layer.setObjsColor(arry,Cesium.Color.RED);
	}else if(type==3){
		layer.setObjsColor(arry,Cesium.Color.YELLOW);
	}else if(type==4){
		layer.setObjsColor(arry,Cesium.Color.MAGENTA); 
     					/* mylayer.setObjsColor(arry5,Cesium.Color.YELLOW);
     					mylayer.setObjsColor(arry2,Cesium.Color.RED);
     					mylayer.setObjsColor(arry3,Cesium.Color.MAGENTA); */
     			/*  mapLayer.forEach(function (value, key, mapLL) {
     					var layer = scene.layers.find(value);
     					layer.removeAllObjsColor();
     			 });
     			  */
     			//huifuStyle();
     			$("#l1_xiaoshou").addClass("actives");
     			$("#l1_shigong").removeClass("actives");
     			$("#l1_text").text("项目销售进度");
     		/* 	$("#div3_map").removeClass("div3_map").addClass("div3_map2");
     			$("#div3_map").css({width:'56%'}); */
         		$("#div_sg").hide();
          		$("#bottom-area").hide();
          		document.getElementById("maxsize").style.display="none";
          		$("#1right").hide();
          		$("#2right").hide();
     			//$("#div4").show();
     		 	//$("#dv2").show();
     		
     		 	$("#bt_xq").hide();
     	        		$("#bt_sgjd").hide();
     	        		$("#bt_hide").hide();
             			$("#dv_hideshowbt").show();
     	        		var height2=$("#cesiumContainer").height();
     	        		        		
     	        		$("#dv1").css({height:height2});
     	        		$("#dv1").show();
     		/* 	if(onsmall == "small"){
     				$("#dv1").show();
     			}else{
     				$("#2right").hide();
     				$("#div3_map").removeClass("div3_map2").addClass("div3_map");
     				$("#div3_map").css({width:'99%'});
     			} */
         		
     		 	$("#ul_tuli").show();
     			$("#ul_tuli2").hide();
  			/* 	if((window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-destHeight)<0){
           			if(($("#dv1").height()-$("#cesiumContainer").height()-$("#btn_four").height()-20)<0){
           				$("#dv6").height("600px");
           			}else{
           				$("#dv6").height($("#dv1").height()-$("#cesiumContainer").height()-$("#btn_four").height()-20+"px");
           			}
          		 }else{
           			$("#dv6").height(window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-destHeight+"px");
          		 } */
     			entityName=entity._name;
				
     			var lianjiearr="${lianjie}";
     			var sub=lianjiearr.substring(1,lianjiearr.length-1);
     			var spl=sub.split(",");
     		
  				$("#tabImg").attr("src",spl[mainData.BUILDING[entityName-1].HXT]);
  			
     		 	var html="";
     		 	var buildhtml="";
     		 	$("#table").empty();
     		 	$("#building_table").empty();
     			$.ajax({
     	    		 url:"../getRoom",
     	    		 data:{"buildingID":mapbuilding.get(entity.name)},
     	    		 dataType:"json",
     	    		 success:function(data){

     	    			 roomdata=data.RoomBean;
     	    			 $("#btn_four").hide();
     	    			 if(roomdata!=null&&roomdata.length!=0){
     	    				 buildhtml+="<tr><th colspan='2'>"+entity.name+"#楼销售进度表</th></tr><tr><td>待售合计（户）：</td><td>"+roomdata[0].xszt_DAISHOU+"</td></tr><tr><td>认购合计（户）：</td><td>"+roomdata[0].xszt_RENGOU+"</td></tr><tr><td>签约合计（户）：</td><td>"+roomdata[0].xszt_QIANYUE+"</td></tr><tr><td>销售面积（平方米）：</td><td>"+roomdata[0].xsmj_TOTAL+"</td></tr><tr><td>剩余面积（平方米）：</td><td>"+roomdata[0].fymj_TOTAL+"</td></tr>"; 
     	    			 }
     	    			 $("#building_table").append(buildhtml);
     	    			 if(data)roomlist = data;
     	    			 if(typeof callback == "function")callback(data);
     	    			 myMap.set("${dto.BUINDINGID}",data);
     	    			 var units = data.Units;
     	    			 html += '<tr><th>楼层列表</th>';
     /* 	    			 if(mapbuilding.get(entity.name)=="3a412e01d15945f7b386718fb9363dc5"){
     	    				 html += '<th colspan="2"></th>';
     	    			 } */
     	    			 var rooms = [];
     	    			 var unitsA = [];
     	    			 var unitsB = [];
     	    			 var roomsA = [];
     	    			 var p=1;
     	    			 for(i=0;i<units.length;i++){
     	    				 var num = Number(units[i].doornum.replace("\"",""));
     	    				 for(j=0;j<num;j++){
     	    					 if(units[i].unitname!='0'){
     	    						 html += '<th>'+units[i].unitname+'单元-'+(j+1)+'</th>'; 
     	    						 unitsB.push(units[i].unitname);
     	    					 }else{
     	    						 unitsA.push(units[i].unitname); 
     	    					 }
     	    					 
     	    					
     	    					 roomsA.push(p<10?"0"+(p++):(p++));

     	    				 }
     	    				 unitMap.set(units[i].unitguid,units[i].unitname);

     	    			 }
     	    			 html += '</tr>';
     	    			 var floor = data.Floor;
     	    			 for(i=0;i<floor.length;i++){
     	    				 if(i==floor.length-1){
     	    					 html += '<tr><td>'+floor[i].floorname+'</td>';
     	    					 for(j=0;j<unitsA.length;j++){
     	    					 	 
     	    						 
     	    						 html += "<td id=\""+unitsA[j]+"-"+floor[i].floorname+""+roomsA[j]+"\">"+unitsA[j]+"-"+floor[i].floorname+""+roomsA[j]+"</td>"; 
     	    						 
     	    					 
     	    						 	
     	    						 
     	    				 }
     	    					 html += '</tr>';
     	    			 }else{
     	    				 html += '<tr><td>'+floor[i].floorname+'</td>';
     		 /*    			 if(mapbuilding.get(entity.name)=="3a412e01d15945f7b386718fb9363dc5"){
     		    				 html += '<th colspan="2"></th>';
     		    			 } */
     	    				 for(j=0;j<unitsB.length;j++){
     	    					 
         						 
         						 html += "<td style='cursor:pointer' onclick=\'test("+entity.name+","+floor[i].floorname+','+(j+1)+")\' onmouseout=\'hideRoom("+entity.name+")\' onmouseover=\'showRoom("+entity.name+","+floor[i].floorname+','+(j+1)+")\' id=\""+unitsB[j]+"-"+floor[i].floorname+""+roomsA[j]+"\">"+unitsB[j]+"-"+floor[i].floorname+""+roomsA[j]+"</td>"; 
         						 
         					 
         					 
         				 }
     	    				 html += '</tr>';
     	    			 }
     	    			 }

     	    			 $("#table").append(html);
     	    			
     	    			 var rooms = data.RoomBean;
     	    			 config.other.room=data.RoomBean;
     	    			 var colorarry = new Array();
     	    			  var colorarry2 = new Array();
     	    			 var colorarry3 = new Array();
     	    			 var colorarry4 = new Array();
     	    			 for(i=0;i<rooms.length;i++){
     	    				 var un = unitMap.get(rooms[i].unitguid);
     	    				 if(rooms[i].status==1){
     	    					 $("#"+un+"-"+rooms[i].roomcoe).css({background:"#ffffff"});
     	    					 colorarry.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==2){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ff0000"});
     	    					 colorarry2.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==3){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ffff00"});
     	    					 colorarry3.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==4){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#cc00ff"});
     	    					 colorarry4.push(rooms[i].roomcoe);
     	    				 }
     	    			 }
     	    			 
     	    				showBuildcolor2(entity.name,colorarry2,2);
     	    				showBuildcolor2(entity.name,colorarry3,3);
     	    				showBuildcolor2(entity.name,colorarry4,4);
							layer.close(index); 
							 layer.closeAll();
     		 layer.open({
        			type: 1
        			,zIndex :999999999999
        			,offset: "rb" //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        			,content: $("#div4").html()+$("#dv2").html()
        			 ,resize:true,
        			 min: function(){
						
					},
					full: function() {
						$(".layui-layer.layui-layer-page").css("top","65px");
					},
					restore: function() {
						
					} 
        			,area: ['250px', '70%']
        			,maxmin: true
        			,shade: 0 //不显示遮罩
        			,yes: function(){
          			layer.closeAll();
        			}
      			});
     	    				//showBuildcolor(entityName,colorarry,1);
     	    		 }
     	    		});
     		}) 

     });
         $(".lunbo img").click(function(){
     		$(this).addClass("border-w").siblings().removeClass("border-w");
     		$("#tabImg").attr("src",$(this).attr("src"));
     	});
     	$(".tab-left").click(function(){
     		var oArrayNum = [];
     		$(".lunbo img").each(function(a,b){
     			if($(b).hasClass("border-w")){
     				if($(b).prev().length>0){
     					$(b).removeClass("border-w").prev().addClass("border-w");
     					$("#tabImg").attr("src",$(b).prev().attr("src"));
     					return false;
     				}else{
     					$(b).removeClass("border-w");
     					$($(".lunbo img")[$(".lunbo img").length-1]).addClass("border-w");
                         $("#tabImg").attr("src",$(".lunbo img")[$(".lunbo img").length-1].src);
     					return false;
     				}
     			}
     		});
             $("#zhanK").click(function(){
                     $(this).parent().toggleClass("zhanKs");
             })
     	});
     	$(".tab-right").click(function(){
     		var oArrayNum = [];
     		$(".lunbo img").each(function(a,b){
     			if($(b).hasClass("border-w")){
     				oArrayNum.push(a);
     				if($(b).next().length>0){
     					$(b).removeClass("border-w").next().addClass("border-w");
     					$("#tabImg").attr("src",$(b).next().attr("src"));
     					return false;
     				}else{
     					$(b).removeClass("border-w");
     					$(".lunbo").children("img:first-child").addClass("border-w");
                         $("#tabImg").attr("src",$(".lunbo").children("img:first-child").attr("src"));
     					return false;
     				}
     			}
     		});
     	});
     	var time=null;
     	$("#smallsize").click(function (e) {
			hidediv();
		});
     	/* document.getElementById("bottom-area").onmouseout=function(){//当鼠标滑出
     		if(time!=null){
     			clearTimeout(time);
     		}
     		
     			time=setTimeout(hidediv,500);
     		} */
    /*  	document.getElementById("bottom-area_blank").onmouseover=function(){ //当鼠标经过

     		
     		document.getElementById("bottom-area").style.display="block";	//改变div1的display属性
     	} */
     	var years_data = mainData.YEARS_DATA;
     		initAxisControl(years_data);
         	$("#dv1").hide();
         	$("#dv2").hide();
         	$("#dv3").hide();
     		$("#ul_tuli").hide();
     		$("#ul_tuli2").show();
     		$("#div4").hide();
     		$("#1right").hide();
     		$("#2right").hide();
     		$("#div3_map").css({width:'99%'});
     		$("#l1_shigong").addClass("actives");
     		$("#l1_xiaoshou").removeClass("actives");
             $(".btn-default").click(function () {
             ///$(this).addClass("btn-primary2").siblings().removeClass("btn-primary2");
     		});
     		$(".list2 li").click(function(){
             $(this).addClass("actives").siblings().removeClass("actives");
             $(".lists li:nth-child(3)").text($(this).text());
             if($(this).text()=="项目施工进度"){
             			
             			showallroom2();
             			flagType=0;
                 		//huifuStyle();注意！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                 		//$("#1right").show();
                 		$("#2right").hide();
                 		$("#dv_hideshowbt").hide();
                 		$("#dv1").hide();
     				    //$("#div_sg").show();
                        $("#div3_map").removeClass("div3_map2").addClass("div3_map");
     	    			$("#dv2").hide();
     	        		$("#dv3").hide();
     	    			$("#div4").hide();
     	    			$("#ul_tuli").hide();
     	    			$("#ul_tuli2").show();
     	        		//$("#dv1").hide();
     	        		$("#bt_xq").show();
     	        		$("#bt_sgjd").show();
     	        		$("#bt_hide").hide();
     	        		$("#dv_hideshowbt").hide();
     	        		var winheight = window.innerHeight;
     	    			showMarker();
     	    			//sgColor();
     	    	/* 		if(onsmall=='small'){
     	    				$("#1right").show();
     	    				$("#2right").hide();
     	    				$("#div3_map").css({width:'77.37%'});
     	    				$("#cesiumContainer").css({height:destHeight});	    				
     	    			}else{
     	    				$("#1right").hide();
     	    				$("#2right").hide();
     	    				$("#div3_map").css({width:'99%'});
     	    				$("#cesiumContainer").css({height:(winheight-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
     	    			} */
     	    			if(localStorage.getItem("skinOriginal")==2){
							hidediv();
						}else{
							showprogress();
						}
                 }else{
                    	$("#bt_xq").hide();
     	        		$("#bt_sgjd").hide();
     	        		$("#bt_hide").hide();
             			$("#dv_hideshowbt").show();
     	        		var height2=$("#cesiumContainer").height();
     	        		        		
     	        		$("#dv1").css({height:height2});
     	        		$("#dv1").show();
     	
                 showallroom();
                 flagType=1;
 	        		var winheight = window.innerHeight;
                 		showMarker3();
                 		//huifuStyle();注意！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                 		$("#1right").hide();
                 		$("#2right").hide();
                 		$("#div3_map").removeClass("div3_map").addClass("div3_map2");
         				$("#div3_map").css("height","50%");
                 		$("#div_sg").hide();
                  	$("#bottom-area").hide();
                  	document.getElementById("maxsize").style.display="none";
        		 		$("#dv2").hide();
     	    			$("#div4").hide();
     	    			$("#ul_tuli").show();
     	    			$("#ul_tuli2").hide();
     	    		/* 	if(onsmall=='small'){
     	    				$("#1right").hide();
                 			$("#2right").show();
     	    				$("#dv1").show();
     	    				$("#div3_map").css({width:'56%'});
     	    				$("#cesiumContainer").css({height:destHeight});
     	    			}else{
     	    				$("#1right").hide();
                 			$("#2right").hide();
     	    				$("#dv1").hide();
     	    				$("#div3_map").css({width:'99%'});
     	    				$("#cesiumContainer").css({height:(winheight-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});

     	    			}  */
						//$("#dv6").height(window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-$("#cesiumContainer").height()+"px");
						$("#cesiumContainer").css({height:(winheight-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
                 }
             });
             $('.pgwSlideshow').pgwSlideshow();
             $(".ps-current ul").css("marginLeft","-40px");
             setMapChange();
        	
        }else{
        		return;
        }
	}catch(e){
		
	}
	 $("#img_vr").bind("click",function(){
		layer.open({
  			type: 2,
 			title: 'VR效果展示',
  			shadeClose: true,
 			shade: 0.5,
  			area: ['90%', '83%'],
  			content: 'http://www.51wofang.com/web-vr/webvr30/cd/artbj/zgtjyjsycgcchx/main.html?from=groupmessage&isappinstalled=0' 
			}); 
	 });
}

</script>
</body>
<script>
	var arrceng;
	var mainData;
	for(i=0;i<mapData.length;i++){
		if(mapData[i].PROJECT.ID=="${projectId}"){
			mainData=mapData[i].PROJECT;
		}	
	}
	var roomdata;
	var unitMap = new Map();
	var v = 0;
	var p=0;
	var ii=0;
	var myMap=new Map();
    var mapLayer=new Map();
    var mapbuilding=new Map();
    for(i=0;i<mainData.BUILDING.length;i++){
   	 	mapLayer.set(mainData.BUILDING[i].NUMBER,mainData.BUILDING[i].LAYER);
   	 	mapbuilding.set(mainData.BUILDING[i].NUMBER,mainData.BUILDING[i].BUILDINGID);
    }
    	var s;
    	var layer2;
    	var scene; 
    	var viewer;
    	var progressflag=0;
	var table_sg_html="";
	$("#table_sg").empty();
	table_sg_html+=" <thead><tr><th>序号</th><th>名称</th><th>进度状态</th><th style='cursor:pointer;' onclick='flytofirst()'>恢复视角</th></tr></thead>";
	for(i=0;i<mainData.BUILDING.length;i++){
		table_sg_html+="	<tr class='text-center'><td>0"+(i+1)+"</td><td>"+mainData.BUILDING[i].NAME+"楼</td><td><span class="+mainData.BUILDING[i].SGSTATE+"></span></td><td><img style='cursor:pointer;width: 20px;height: 20px;' onclick='fly("+i+")'  src='../../../resources/imgs/bz2.png'></td></tr>";
		
	}
	$("#table_sg").append(table_sg_html);
    var table_sg_html2="";
	$("#table_sg2").empty();
	table_sg_html2+=" <thead><tr><th>序号</th><th>名称</th><th>进度状态</th><th style='cursor:pointer;' onclick='flytofirst()'>恢复视角</th></tr></thead>";
	for(i=0;i<mainData.BUILDING.length;i++){
		table_sg_html2+="	<tr class='text-center'><td>0"+(i+1)+"</td><td>"+mainData.BUILDING[i].NAME+"楼</td><td><span class="+mainData.BUILDING[i].SGSTATE2+"></span></td><td><img style='cursor:pointer;width: 20px;height: 20px;' onclick='fly("+i+")'  src='../../../resources/imgs/bz2.png'></td></tr>";
		
	}
	$("#table_sg2").append(table_sg_html2);
    var imgSale=["../../../resources/3Dmap/examples/images/img_sale1.png","../../../resources/3Dmap/examples/images/img_sale2.png","../../../resources/3Dmap/examples/images/img_sale3.png"
    		,"../../../resources/3Dmap/examples/images/img_sale4.png"];
    var imgSg=["../../../resources/3Dmap/examples/images/img_sg1.png","../../../resources/3Dmap/examples/images/img_sg2.png","../../../resources/3Dmap/examples/images/img_sg3.png",
    		"../../../resources/3Dmap/examples/images/img_sg4.png","../../../resources/3Dmap/examples/images/img_sg5.png"];
function initAxisControl(year_data){
   	var year_container = document.getElementById("year-items");
   	year_container.innerHTML = "";
	if(!year_data||!year_data instanceof Array){
		year_container.innerHTML = "<center style='color:red;font-size:14px;background-color:#fff;'>数据错误....</center>";
		return;
	}
	var aNum = year_data.length;
	var ul = document.createElement("ul");
	ul.id = "axisUl";
	for(var i=0;i<year_data.length;i++){
		var li = document.createElement("li");
		li.setAttribute("data-toggle","tooltip");
		li.setAttribute("data-original-title","");
		li.setAttribute("data-placement","top");
		li.setAttribute("data-stopPropagation","true");
		li.setAttribute("index",i);
		var span = document.createElement("span");
		var div = document.createElement("div");
		div.style.position = "raletive";
		span.innerHTML = year_data[i].year;
		span.style.width="50px";
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
			var text = $(this).attr("index");
			changeStyle(text);
				var active = !!$(this).has("p").length;
				if(!active){
					$("#axisUl li p").remove();
					$(this).append("<p></p>");
					var year = this.innerText;
					var theme = $("#right-area .special[data-state]").attr("data-ref");
					theme = theme ||"";
					switch(theme){
					case 1:
					case "1":
						var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.starttime.substring(0,4)<"+year,config.other.tempMarkers);
						mapFrame.page.addClusterLayer(markers,{pHtml:top.$("#marker-menu").prop("outerHTML")});
						break;
					case 2:
					case "2":
						mapFrame.page.hideMarkersByExpression();
						mapFrame.page.showMarkersByExpression("attr.starttime.substring(0,4)<"+year);
						break;
					case 3:
					case "3":
						var markers = mapFrame.page.getMarkersByExpFromMarkers("attr.starttime.substring(0,4)<"+year,config.other.tempMarkers);
						mapFrame.page.createHeatLayer({featureWeight:"state"},markers);
						break;
					}
				}
		 });
	}
   	year_container.appendChild(ul);
   	 ////年份控制
	 $("#axisControl li").bind("click",function(){
		 var type = $(this).attr("handle");
		 if(!type)return;
		 switch(type.toUpperCase()){
		 case "LAST"://上一项
			 alert("上一项");
			 break;
		 case "NEXT"://下一项
			 alert("下一项");
			 break;
		 case "PLAY"://开始
			 progressflag=1;
			 changeColor2();
			 $(this).attr("handle","pause").attr("data-original-title","开始");
			 $(this).find("span").removeClass("fa-play").addClass("fa-pause");
			 config.other.pAnier2 = setInterval(progessAnimation,config.timer.carousel.interval);
			 break;
		 case "PAUSE"://暂停
			 progressflag=2;
			 $(this).attr("handle","play").attr("data-original-title","暂停");
			 $(this).find("span").removeClass("fa-pause").addClass("fa-play");
			 try{window.clearInterval(config.other.pAnier2);window.clearTimeout(config.other.pAnier2);}catch(e){};
			 break;
		 };
	 });
};
//年份轮播动画执行函数
function progessAnimation(){
	var floats = 0.00805024;
	var lis = 1/($("#year-items li").length)+floats;
	if(v<100){
		v += 0.5;
		$("#bottom-area div.progress-bar").width(v+"%");
		var eth = $("#year-items li").eq(parseInt((v/lis)/100));
		if(!eth.has("p").length){$(eth).trigger("click");}

	}
	else{
		/*  var eth = $("#year-items li").eq(($("#year-items li").length-1));
		 if(!eth.has("p").length){$(eth).trigger("click");}
		 v=-2;
		 try{window.clearInterval(config.other.pAnier2);}catch(e){};
		 config.other.delayer = window.setTimeout(function(){
			 config.other.pAnier2 = setInterval(progessAnimation,config.timer.carousel.interval);
		 },config.timer.carousel.remain); */
		var eth = $("#year-items li").eq(($("#year-items li").length-1));
		 if(!eth.has("p").length){$(eth).trigger("click");}
		 v=-2;
			 progressflag=2;
				 $("#axisControl li").attr("handle","play").attr("data-original-title","暂停");
				 $("#axisControl li").find("span").removeClass("fa-pause").addClass("fa-play");
			try{window.clearInterval(config.other.pAnier2);window.clearTimeout(config.other.pAnier2);}catch(e){};
	};
}
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

function hidediv(){
	document.getElementById("bottom-area").style.display="none";	//改变div1的display属性
	document.getElementById("smallsize").style.display="none";
	document.getElementById("maxsize").style.display="block";
	localStorage.setItem("skinOriginal",2);
}
function showprogress(){
		document.getElementById("bottom-area").style.display="block";
			document.getElementById("smallsize").style.display="block";
			document.getElementById("maxsize").style.display="none";
			localStorage.setItem("skinOriginal",1);
}
function changeStyle(i){
	/* if(n==0){
		 arrceng=[-1,-1,-1,-1,-1,-1,-1];
	} */
	
	var layer5 = scene.layers.find("T4@白模");
	layer5.removeAllObjsColor();
				  var style3D=layer5.style3D;
				  var color3D=style3D.fillForeColor;
			    	  var style3D = new Cesium.Style3D();
			      var color1 = new Cesium.Color(color3D.red, color3D.green, color3D.blue,0.2);
  var   arry = new Array();
				  for(j=0;j<1000;j++){
						arry.push(j);	

				  }
				 layer5.setObjsColor(arry,color1);
	
	/* for(i=0;i<mainData.YEARS_DATA[n].CHANGE.length;i++){
		var layer5 = scene.layers.find(mapLayer.get((i+1)+"")); */
		var style3D=layer5.style3D;
			var color3D=style3D.fillForeColor;
			var color = new Cesium.Color(color3D.red, color3D.green, color3D.blue,1);
		var arry5 = new Array();
		/* for(j=0;j<xipaifujson.length;j++){
			if((xipaifujson[j].FLOOR<mainData.YEARS_DATA[n].CHANGE[i]&&xipaifujson[j].FLOOR>arrceng[i])&&(xipaifujson[j].BUINDINGID==mapbuilding.get((i+1)+""))){
				arry5.push(parseInt(xipaifujson[j].SMID));	
  	
			}
		} */

			if(i==0){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
			}
			if(i==1){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
			}
			//5,224,167,168,225,6
			if(i==2){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
			}
			//8,228,170,169,226,7
			if(i==3){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
			}
			//9,227,171,191,229,30
			if(i==4){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
			}
			//31,257,192,173,233,11
			if(i==5){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
			}
			//31,257,192,173,233,11
			if(i==6){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
			}
			if(i==7){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
				arry5.push(479);
				arry5.push(596);	
				arry5.push(630);	
				arry5.push(652);	
				arry5.push(595);	
				arry5.push(674);		
  				arry5.push(480);
				arry5.push(606);	
				arry5.push(631);	
				arry5.push(653);	
				arry5.push(602);	
				arry5.push(675);
			}
			if(i==8){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
				arry5.push(479);
				arry5.push(596);	
				arry5.push(630);	
				arry5.push(652);	
				arry5.push(595);	
				arry5.push(674);		
  				arry5.push(480);
				arry5.push(606);	
				arry5.push(631);	
				arry5.push(653);	
				arry5.push(602);	
				arry5.push(675);
				arry5.push(481);
				arry5.push(601);	
				arry5.push(632);	
				arry5.push(654);	
				arry5.push(603);	
				arry5.push(676);		
  				arry5.push(482);
				arry5.push(605);	
				arry5.push(633);	
				arry5.push(655);	
				arry5.push(604);	
				arry5.push(677);
			}
			if(i==9){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
				arry5.push(479);
				arry5.push(596);	
				arry5.push(630);	
				arry5.push(652);	
				arry5.push(595);	
				arry5.push(674);		
  				arry5.push(480);
				arry5.push(606);	
				arry5.push(631);	
				arry5.push(653);	
				arry5.push(602);	
				arry5.push(675);
				arry5.push(481);
				arry5.push(601);	
				arry5.push(632);	
				arry5.push(654);	
				arry5.push(603);	
				arry5.push(676);		
  				arry5.push(482);
				arry5.push(605);	
				arry5.push(633);	
				arry5.push(655);	
				arry5.push(604);	
				arry5.push(677);
				arry5.push(483);
				arry5.push(607);	
				arry5.push(634);	
				arry5.push(656);	
				arry5.push(609);	
				arry5.push(678);		
  				arry5.push(484);
				arry5.push(608);	
				arry5.push(635);	
				arry5.push(657);	
				arry5.push(610);	
				arry5.push(679);
			}
			if(i==10){
				arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
				arry5.push(479);
				arry5.push(596);	
				arry5.push(630);	
				arry5.push(652);	
				arry5.push(595);	
				arry5.push(674);		
  				arry5.push(480);
				arry5.push(606);	
				arry5.push(631);	
				arry5.push(653);	
				arry5.push(602);	
				arry5.push(675);
				arry5.push(481);
				arry5.push(601);	
				arry5.push(632);	
				arry5.push(654);	
				arry5.push(603);	
				arry5.push(676);		
  				arry5.push(482);
				arry5.push(605);	
				arry5.push(633);	
				arry5.push(655);	
				arry5.push(604);	
				arry5.push(677);
				arry5.push(483);
				arry5.push(607);	
				arry5.push(634);	
				arry5.push(656);	
				arry5.push(609);	
				arry5.push(678);		
  				arry5.push(484);
				arry5.push(608);	
				arry5.push(635);	
				arry5.push(657);	
				arry5.push(610);	
				arry5.push(679);
				arry5.push(485);
				arry5.push(612);	
				arry5.push(636);	
				arry5.push(658);	
				arry5.push(611);	
				arry5.push(680);		
  				arry5.push(486);
				arry5.push(614);	
				arry5.push(637);	
				arry5.push(659);	
				arry5.push(616);	
				arry5.push(681);
			}
			if(i==11){
			arry5.push(418);
				arry5.push(462);	
				arry5.push(422);	
				arry5.push(443);	
				arry5.push(496);	
				arry5.push(444);		
  				arry5.push(417);
				arry5.push(461);	
				arry5.push(433);	
				arry5.push(452);	
				arry5.push(498);	
				arry5.push(454);
				arry5.push(416);	
				arry5.push(460);	
				arry5.push(430);	
				arry5.push(450);	
				arry5.push(493);		
  				arry5.push(440);
				arry5.push(415);	
				arry5.push(459);	
				arry5.push(428);	
				arry5.push(438);	
				arry5.push(492);
  				arry5.push(456);
				arry5.push(469);
				arry5.push(463);	
				arry5.push(620);	
				arry5.push(642);	
				arry5.push(494);	
				arry5.push(664);		
  				arry5.push(470);
				arry5.push(464);	
				arry5.push(621);	
				arry5.push(643);	
				arry5.push(495);	
				arry5.push(665);
				arry5.push(471);
				arry5.push(588);	
				arry5.push(622);	
				arry5.push(644);	
				arry5.push(586);	
				arry5.push(666);		
  				arry5.push(472);
				arry5.push(587);	
				arry5.push(623);	
				arry5.push(645);	
				arry5.push(585);	
				arry5.push(667);
				arry5.push(473);
				arry5.push(583);	
				arry5.push(624);	
				arry5.push(646);	
				arry5.push(584);	
				arry5.push(668);		
  				arry5.push(474);
				arry5.push(594);	
				arry5.push(625);	
				arry5.push(647);	
				arry5.push(592);	
				arry5.push(669);
				arry5.push(475);
				arry5.push(593);	
				arry5.push(626);	
				arry5.push(648);	
				arry5.push(591);	
				arry5.push(670);		
  				arry5.push(476);
				arry5.push(589);	
				arry5.push(627);	
				arry5.push(649);	
				arry5.push(590);	
				arry5.push(671);
				arry5.push(477);
				arry5.push(598);	
				arry5.push(628);	
				arry5.push(650);	
				arry5.push(599);	
				arry5.push(672);		
  				arry5.push(478);
				arry5.push(600);	
				arry5.push(629);	
				arry5.push(651);	
				arry5.push(597);	
				arry5.push(673);
				arry5.push(479);
				arry5.push(596);	
				arry5.push(630);	
				arry5.push(652);	
				arry5.push(595);	
				arry5.push(674);		
  				arry5.push(480);
				arry5.push(606);	
				arry5.push(631);	
				arry5.push(653);	
				arry5.push(602);	
				arry5.push(675);
				arry5.push(481);
				arry5.push(601);	
				arry5.push(632);	
				arry5.push(654);	
				arry5.push(603);	
				arry5.push(676);		
  				arry5.push(482);
				arry5.push(605);	
				arry5.push(633);	
				arry5.push(655);	
				arry5.push(604);	
				arry5.push(677);
				arry5.push(483);
				arry5.push(607);	
				arry5.push(634);	
				arry5.push(656);	
				arry5.push(609);	
				arry5.push(678);		
  				arry5.push(484);
				arry5.push(608);	
				arry5.push(635);	
				arry5.push(657);	
				arry5.push(610);	
				arry5.push(679);
				arry5.push(485);
				arry5.push(612);	
				arry5.push(636);	
				arry5.push(658);	
				arry5.push(611);	
				arry5.push(680);		
  				arry5.push(486);
				arry5.push(614);	
				arry5.push(637);	
				arry5.push(659);	
				arry5.push(616);	
				arry5.push(681);
				arry5.push(487);
				arry5.push(613);	
				arry5.push(638);	
				arry5.push(660);	
				arry5.push(617);	
				arry5.push(682);		
  				arry5.push(488);
				arry5.push(615);	
				arry5.push(639);	
				arry5.push(661);	
				arry5.push(618);	
				arry5.push(683);
				
				
				arry5.push(489);
				arry5.push(467);	
				arry5.push(640);	
				arry5.push(662);	
				arry5.push(490);	
				arry5.push(684);		
  				arry5.push(468);
				arry5.push(466);	
				arry5.push(619);	
				arry5.push(641);	
				arry5.push(497);	
				arry5.push(663);
				arry5.push(419);
				arry5.push(465);	
				arry5.push(426);	
				arry5.push(448);	
				arry5.push(491);	
				arry5.push(449);
			}
			
		layer5.setObjsColor(arry5,color);
		/* arrceng[i]=mainData.YEARS_DATA[n].CHANGE[i]; */
	//}
/* 	if(n==mainData.YEARS_DATA.length-1){
			huifuStyle();
	} */
 	if(i==11){
	layer5.removeAllObjsColor();
		var style3D=layer5.style3D;
			var color3D=style3D.fillForeColor;
			var color = new Cesium.Color(color3D.red, color3D.green, color3D.blue,1);
				  var   arry = new Array();
				  for(j=0;j<1000;j++){
						arry.push(j);	

				  }
				 layer5.setObjsColor(arry,color);
	} 
}
function huifuStyle(){
	 mapLayer.forEach(function (value, key, mapLL) {
	  		var layer1 = scene.layers.find(value);
	  		layer1.removeAllObjsColor();
		 	var style3D=layer1.style3D;
			var color3D=style3D.fillForeColor;
	     	var style3D = new Cesium.Style3D();
	      	var color = new Cesium.Color(color3D.red, color3D.green, color3D.blue,1);
	      	style3D.fillForeColor = color;
	      	layer1.style3D = style3D;
	 });
	 if(flagType==0){
	 	sgColor();
	 }
	 	
}
	var entityName="";
var typeflag=1;	
function saleInfo(type){
	typeflag=type;
	$("#dv3").hide();
	var colorarry = new Array();
	for(i=0;i<roomdata.length;i++){
		 var un = unitMap.get(roomdata[i].unitguid);
		 $("#"+un+"-"+roomdata[i].roomcoe).css({color:"#666666"});
	}
	var index1=0,index2=0,index3=0,index4=0;
	for(i=0;i<roomdata.length;i++){
		 var un = unitMap.get(roomdata[i].unitguid);
		 if(roomdata[i].status==1&&type==1){
			 $("#"+un+"-"+roomdata[i].roomcoe).css({color:"#ffffff"});
			 colorarry.push(roomdata[i].roomcoe);
		 }else if(roomdata[i].status==2&&type==2){
			 $("#"+un+"-"+roomdata[i].roomcoe).css({color:"#ff0000"});
			 colorarry.push(roomdata[i].roomcoe);
		 }else if(roomdata[i].status==3&&type==3){
			 $("#"+un+"-"+roomdata[i].roomcoe).css({color:"#ffff00"});
			 colorarry.push(roomdata[i].roomcoe);
		 }else if(roomdata[i].status==4&&type==4){
			 $("#"+un+"-"+roomdata[i].roomcoe).css({color:"#cc00ff"});
			 colorarry.push(roomdata[i].roomcoe);
		 }
		 if(roomdata[i].status==1&&type==1){
		 	index1++;
		 }else if(roomdata[i].status==2&&type==2){
			index2++;
		 }else if(roomdata[i].status==3&&type==3){
			index3++;
		 }else if(roomdata[i].status==4&&type==4){
			index4++;
		 }
		 
	}
		 if(type==1&&index1==0){
		 		layer.msg('暂无待售数据');
		 }else if(type==2&&index2==0){
				layer.msg('暂无认购数据');
		 }else if(type==3&&index3==0){
				layer.msg('暂无预留数据');
		 }else if(type==4&&index4==0){
				layer.msg('暂无签约数据');
		 }
	showBuildcolor(entityName,colorarry,type);
}
function changeColor2(){
var layer = scene.layers.find("T4@白模");
			layer.removeAllObjsColor();
				  var style3D=layer.style3D;
				  var color3D=style3D.fillForeColor;
			    	  var style3D = new Cesium.Style3D();
			      var color1 = new Cesium.Color(color3D.red, color3D.green, color3D.blue,0.2);
				  var   arry = new Array();
				  for(j=0;j<1000;j++){
						arry.push(j);	

				  }
				 layer.setObjsColor(arry,color1);
}
function changeColor(){
	 mapLayer.forEach(function (value, key, mapLL) {
			var layer = scene.layers.find(value);
			layer.removeAllObjsColor();
	 });
		for(i=0;i<mainData.BUILDING.length;i++){

				 var layer = scene.layers.find(mapLayer.get(mainData.BUILDING[i].NUMBER+""));
				  var style3D=layer.style3D;
				  var color3D=style3D.fillForeColor;
			    	  var style3D = new Cesium.Style3D();
			      var color1 = new Cesium.Color(color3D.red, color3D.green, color3D.blue,0.2);
				  var   arry = new Array();
				  for(j=0;j<xipaifujson.length;j++){
						if(xipaifujson[j].BUINDINGID==mapbuilding.get(mainData.BUILDING[i].NUMBER+"")){
							arry.push(parseInt(xipaifujson[j].SMID));	
						}

				  }
				 layer.setObjsColor(arry,color1);
			
		 }
}
function sgColor(){
	for(i=0;i<mainData.BUILDING.length;i++){
		 if(mainData.BUILDING[i].SG_KEY){
			 var layer = scene.layers.find(mapLayer.get(mainData.BUILDING[i].NUMBER+""));
			  var style3D=layer.style3D;
			  var color3D=style3D.fillForeColor;
		    	  var style3D = new Cesium.Style3D();
		      var color1 = new Cesium.Color(color3D.red, color3D.green, color3D.blue,0.15);
			  var   arry = new Array();
			  for(j=0;j<xipaifujson.length;j++){
					if(parseInt(xipaifujson[j].FLOOR)>mainData.BUILDING[i].SG_CENG&&xipaifujson[j].BUINDINGID==mapbuilding.get(mainData.BUILDING[i].NUMBER+"")){
						arry.push(parseInt(xipaifujson[j].SMID));	
					}

			  }
			 layer.setObjsColor(arry,color1);
		 }
	 }
}

function flytofirst(){
    viewer.camera.flyTo({
    	destination : new Cesium.Cartesian3(mainData.X, mainData.Y, mainData.Z),
        orientation: {
          heading : mainData.HEADING, 
          pitch : mainData.PITCH,  
          roll : mainData.ROLL                  
        }
    }); 
}
function fly(i){
	viewer.camera.flyTo({
    		destination : new Cesium.Cartesian3(mainData.BUILDING[i].FLY_X, mainData.BUILDING[i].FLY_Y,mainData.BUILDING[i].FLY_Z),
   		orientation : {
       		heading : mainData.BUILDING[i].FLY_HEADING,
        		pitch : mainData.BUILDING[i].FLY_PICTH,
        		roll :  mainData.BUILDING[i].FLY_ROLL
	}
	});

}
function setMapChange(){
	var src_posi_Y = 0, dest_posi_Y = 0, move_Y = 0, is_mouse_down = false;
    $("#expander")
    .mousedown(function(e){
        src_posi_Y = e.pageY;
        is_mouse_down = true;
    });
    $(document).bind("click mouseup",function(e){
        if(is_mouse_down){
          is_mouse_down = false;
        }
    })
    .mousemove(function(e){
        dest_posi_Y = e.pageY;
        move_Y = dest_posi_Y-src_posi_Y ;
        src_posi_Y = dest_posi_Y;
        destHeight = $("#cesiumContainer").height() + move_Y;
        if(is_mouse_down){
        	localStorage.setItem("destHeight",destHeight);
            $("#cesiumContainer").css("height", destHeight > 303 ? destHeight : 303);
           if((window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-destHeight)<0){
           		if(($("#dv1").height()-$("#cesiumContainer").height()-$("#btn_four").height()-20)<0){
           			//$("#dv6").height("600px");
           		}else{
           			//$("#dv6").height($("#dv1").height()-$("#cesiumContainer").height()-$("#btn_four").height()-20+"px");
           		}
           }else{
           		//$("#dv6").height(window.innerHeight-$("#nav-wrap",parent.document).height()-$("header").height()-65-destHeight+"px");
           }
        }
    });
	
	
	winheight2 = window.innerHeight;
	if(winheight2==0){
		setTimeout(function(){
			setMapChange();
		},50);
		return;
	}else{
/* 		if(localStorage.getItem("destHeight")>303){
					$("#div3_map").css({width:'77.37%'});
					$("#cesiumContainer").css("height", localStorage.getItem("destHeight"));
					$("#div_sg").show();
					$("#1right").show();
					$("#2right").hide();
					$("#expander").show();
					onsmall = 'small';
		}else{
				$("#cesiumContainer").css({height:(winheight2-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
				$("#div_sg").show();
		} */
	$("#cesiumContainer").css({height:(winheight2-$("#nav-wrap",parent.document).height()-$("header").height()-30)+"px"});
	}
 
	var num=0;
    $('.map-change').hover(function(){
        if(num==0){
            $(this).stop().animate({
                'width':'234px',
                'height':'62px'
                //'height':'430px'
            });             
        }else{            
            $(this).stop().animate({
                'width':'234px',
                'height':'62px'
                //'height':'480px'
            }); 
        }

        
    },function(){
        $(this).stop().animate({
            'width':'82px',
            'height':'62px'
            //'height':'62px'
        });        
    });
}
function changgemaptype(i){
	switch(i){
	case 1:
		break;
	case 2:
		if("${projectId}"=="32dfa580-5a47-4b27-b6e9-fc9bf656872f"){
			parent.gotoQJ("huzhou");
		}else{
			parent.gotoQJ("tunxi");
		}

		break;
	case 3:
		layer.open({
			  type: 2,
			  title: false,
			  area: ['630px', '360px'],
			  shade: 0.8,
			  closeBtn: 0,
			  shadeClose: true,
			  content: '../../../resources/video/video.mp4'
			}); 
		layer.msg('点击任意处关闭');
		break;
	}
}

function hidediv3(){
	$("#dv3").hide();
}
function hidediv4(){
	$("#div4").hide();
	$("#dv2").hide();
}
var arrychoosesmid=[0];
var colortemp;
var layeremp = null;
function hideRoom(c){
	$("#dv3").hide();
	if(config.other.room!=null&&config.other.room.length!=0){
	var rooms=config.other.room;
		 var colorarry = new Array();
     	    			  var colorarry2 = new Array();
     	    			 var colorarry3 = new Array();
     	    			 var colorarry4 = new Array();
     	    			 for(i=0;i<rooms.length;i++){
     	    				 var un = unitMap.get(rooms[i].unitguid);
     	    				 if(rooms[i].status==1){
     	    					 $("#"+un+"-"+rooms[i].roomcoe).css({background:"#ffffff"});
     	    					 colorarry.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==2){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ff0000"});
     	    					 colorarry2.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==3){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ffff00"});
     	    					 colorarry3.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==4){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#cc00ff"});
     	    					 colorarry4.push(rooms[i].roomcoe);
     	    				 }
     	    			 }
     	    				showBuildcolor2(c,colorarry,1);
     	    				showBuildcolor2(c,colorarry2,2);
     	    				showBuildcolor2(c,colorarry3,3);
     	    				showBuildcolor2(c,colorarry4,4);
	}
}

function test(c,a,b){
     layeremp = scene.layers.find(mapLayer.get(c+""));
	//layer.removeAllObjsColor();
	//saleInfo(typeflag);
	
    var   arry = new Array();
	for(i=0;i<lixiangjiajson.length;i++){
			if(lixiangjiajson[i].FLOOR==a&&lixiangjiajson[i].DOOR==b&&lixiangjiajson[i].BUINDINGID==mapbuilding.get(c+"")){
				arry.push(parseInt(lixiangjiajson[i].SMID));
				colortemp = layeremp.getObjsColor(parseInt(lixiangjiajson[i].SMID)); 
				console.log(colortemp)	
			}
	}
	arrychoosesmid=arry;
	 layeremp.setObjsColor(arry,Cesium.Color.BLUE); 
}
function showRoom(c,a,b){
     var layer = scene.layers.find(mapLayer.get(c+""));
	//layer.removeAllObjsColor();
	//saleInfo(typeflag);
/* 
    var   arry = new Array();
	for(i=0;i<lixiangjiajson.length;i++){
			if(lixiangjiajson[i].FLOOR==a&&lixiangjiajson[i].DOOR==b&&lixiangjiajson[i].BUINDINGID==mapbuilding.get(c+"")){
				arry.push(parseInt(lixiangjiajson[i].SMID));	
			}
	}
	 layer.setObjsColor(arry,Cesium.Color.BLUE);  */
	 if(roomdata!=null&&roomdata.length!=0){
		 for(j=0;j<roomdata.length;j++){
			 if(roomdata[j].roomcoe==a+"0"+b){
		  		$("#dv3").show();
		  		$("#td1").html(roomdata[j].roomcoe);
		  		$("#td2").html(roomdata[j].roomstru);
		  		$("#td3").html(roomdata[j].bldarea+"m²");
		  		$("#td4").html(roomdata[j].tnarea+"m²");
		  		
		  		$("#td5").html(roomdata[j].price+"元/m²");
			 }
		 }
	 }
}
function showallroom(){
	//showallroom2();
	mapLayer.forEach(function (value, key, mapLL) {
	
			if(key!="4"){
			return;
			}
     		var layer = scene.layers.find(value);
     		//layer.removeAllObjsColor();
     		  $.ajax({
     	    		 url:"../getRoom",
     	    		 data:{"buildingID":mapbuilding.get(key)},
     	    		 dataType:"json",
     	    		 success:function(data){
     	    			 roomdata=data.RoomBean;
     	    			 if(data)roomlist = data;
     	    			 if(typeof callback == "function")callback(data);
     	    			 var units = data.Units;
     	    			 var rooms = [];
     	    			 var unitsA = [];
     	    			 var unitsB = [];
     	    			 var roomsA = [];
     	    			 var p=1;
     	    			 var floor = data.Floor;
     	    			 for(i=0;i<floor.length;i++){
     	    				 if(i==floor.length-1){
     	    		 
     	    				
     	    			 }else{
     	    			
     	    				// for(j=0;j<unitsB.length;j++){
     	    					 
         						 
         						// html += "<td style='cursor:pointer' onmouseover=\'showRoom("+entity.name+","+floor[i].floorname+','+(j+1)+")\' id=\""+unitsB[j]+"-"+floor[i].floorname+""+roomsA[j]+"\">"+unitsB[j]+"-"+floor[i].floorname+""+roomsA[j]+"</td>"; 
         						 
         					 
         					 
         				// }
 
     	    			 }
     	    			 }
     	    			 var rooms = data.RoomBean;
     	    			 var colorarry = new Array();
     	    			 var colorarry3 = new Array();
     	    			 var colorarry4 = new Array();
     	    			 for(i=0;i<rooms.length;i++){
     	    				 var un = unitMap.get(rooms[i].unitguid);
     	    				 if(rooms[i].status==2){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ff0000"});
     	    					 colorarry.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==3){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#ffff00"});
     	    					 colorarry3.push(rooms[i].roomcoe);
     	    				 }else if(rooms[i].status==4){
     	    				 	$("#"+un+"-"+rooms[i].roomcoe).css({background:"#cc00ff"});
     	    					 colorarry4.push(rooms[i].roomcoe);
     	    				 }
     	    				 
     	    			 }
     	    				showBuildcolor2(key,colorarry,2);
     	    				showBuildcolor2(key,colorarry3,3);
     	    				showBuildcolor2(key,colorarry4,4);
     	    		 }
     	    		});
     });
/* 	 var layer = scene.layers.find(mapLayer.get(c+""));
	layer.removeAllObjsColor(); */
	//saleInfo(typeflag);
  /*   var   arry = new Array();
	for(i=0;i<xipaifujson.length;i++){
			if(xipaifujson[i].FLOOR==a&&xipaifujson[i].DOOR==b&&xipaifujson[i].BUINDINGID==mapbuilding.get(c+"")){
				arry.push(parseInt(xipaifujson[i].SMID));	
			}
	}
	 layer.setObjsColor(arry,Cesium.Color.FUCHSIA); */ 
}
function showallroom2(){
	mapLayer.forEach(function (value, key, mapLL) {
     		var layer = scene.layers.find(value);
     		layer.removeAllObjsColor();
     		
     });
}

function showBuildcolor(c,showBuildcolor,type){
	var layer = scene.layers.find(mapLayer.get(c+""));
	layer.removeAllObjsColor();
    var   arry = new Array();
	for(i=0;i<xipaifujson.length;i++){
		for(j=0;j<showBuildcolor.length;j++){
			if((xipaifujson[i].FLOOR+"0"+xipaifujson[i].DOOR)==showBuildcolor[j]&&xipaifujson[i].BUINDINGID==mapbuilding.get(c+"")){
				arry.push(parseInt(xipaifujson[i].SMID));	
			}
		}
	}
	if(type==1){
		layer.setObjsColor(arry,Cesium.Color.WHITE );
	}else if(type==2){
		layer.setObjsColor(arry,Cesium.Color.RED);
	}else if(type==3){
		layer.setObjsColor(arry,Cesium.Color.YELLOW);
	}else if(type==4){
		layer.setObjsColor(arry,Cesium.Color.MAGENTA);
	}
	
}
function showBuildcolor2(c,showBuildcolor,type){
	var layer = scene.layers.find(mapLayer.get(c+""));
	console.log(layer)
	
	//layer.removeAllObjsColor();
    var   arry = new Array();
    if(c=="4"){
    
    	for(i=0;i<lixiangjiajson.length;i++){
			for(j=0;j<showBuildcolor.length;j++){
				if((lixiangjiajson[i].FLOOR+"0"+lixiangjiajson[i].DOOR)==showBuildcolor[j]&&lixiangjiajson[i].BUINDINGID==mapbuilding.get(c+"")){
					arry.push(parseInt(lixiangjiajson[i].SMID));	
				}
			}
		}
    }else{
    	for(i=0;i<xipaifujson.length;i++){
		for(j=0;j<showBuildcolor.length;j++){
			if((xipaifujson[i].FLOOR+"0"+xipaifujson[i].DOOR)==showBuildcolor[j]&&xipaifujson[i].BUINDINGID==mapbuilding.get(c+"")){
				arry.push(parseInt(xipaifujson[i].SMID));	
			}
		}
	}
    }
console.log(arry);
	if(type==1){
		layer.setObjsColor(arry,Cesium.Color.WHITE );
	}else if(type==2){
		layer.setObjsColor(arry,Cesium.Color.RED);
	}else if(type==3){
		layer.setObjsColor(arry,Cesium.Color.YELLOW);
	}else if(type==4){
		layer.setObjsColor(arry,Cesium.Color.MAGENTA);
	}
	
}
function showLeftDiv(thisObj){
	if($(thisObj).attr("class") == 'triangle_border_left'){
		$("#dv_w").css("left","-221px");
		$(thisObj).attr("class","triangle_border_right");
	}else{
		$("#dv_w").css("left","0px");
		$(thisObj).attr("class","triangle_border_left");
		$("#2right").hide();
     	$("#bt_hide2").hide();
	}
}
</script>
</html>

