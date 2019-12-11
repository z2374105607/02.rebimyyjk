<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
    String siteURL = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div id="menus" style="display:none;">
<ul id="marker-menu">
<li><img src="<%=basePath %>resources/imgs/poj.png"/>基本项目情况</li>
<%-- <li><img src="<%=basePath %>resources/imgs/years.png"/>年度指标控制</li>
<li><img src="<%=basePath %>resources/imgs/case.png"/>项目全案指标</li> --%>
<li><img src="<%=basePath %>resources/imgs/sell.png"/>项目销售情况</li>
<li><img src="<%=basePath %>resources/imgs/poj_p.png"/>项目进度情况</li>
<li onclick="javascript:parent.gotoMap()"><img src="<%=basePath %>resources/imgs/scaner.png"/>进入项目场景</li>
<style>ul#marker-menu{list-style:none;padding:0;border:1px solid #c6d9fb;margin:0;}
ul#marker-menu li{text-align:center;font-size:12px;border-bottom:1px dashed  #efe0e0;padding:7px;color: #39179c;cursor:pointer;font-family:微软雅黑}
ul#marker-menu li:last-child{border-bottom-width:0}
ul#marker-menu li:hover{background-color:#f3f3f3;}
ul#marker-menu li img{width: 15px;vertical-align: text-bottom;height: 15px;margin: 0px 5px;}</style>
</ul>
</div>
