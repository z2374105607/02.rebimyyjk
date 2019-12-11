<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<div class="btn-group btn-group" role="group"
	aria-label="Large button group">
	<button type="button" onclick="$('#height-right').show()" class="btn btn-default cheight">
	<span class="fa fa-file-text micon" aria-hidden="true" style="color:#ea6464;padding-left: 16px;padding-right: 5px;"></span>
	<span class="dropdown-toggle" data-toggle="dropdown" style="padding-right: 16px;">
	项目详情
	<%--<span class="fa fa-file-text" aria-hidden="true" ></span>--%>
	</span>
	<jsp:include page="pojInfo.jsp"></jsp:include>
	</button>
	<button type="button" onclick="$('#height-right').hide()" class="btn btn-default cheight" style="margin:0 10px;">
	<span class="fa fa-cog micon green" aria-hidden="true"  style="color:#1cd07a;padding-left: 16px;padding-right: 5px;"></span>
	<span class="dropdown-toggle" data-toggle="dropdown" style="padding-right: 16px;">
	设置
	<%--<span class="" aria-hidden="true"></span>--%>
	</span>
	<jsp:include page="setting.jsp"></jsp:include>
	</button>
	<button onclick="$('#height-right').hide()" type="button" class="btn btn-default cheight">
	<span class="fa fa-briefcase" style="color:#0289e3;padding-left: 16px;padding-right: 5px;"></span>
	<span class="dropdown-toggle" data-toggle="dropdown" style="padding-right: 16px;">工具
	<%--<span class="" ></span>--%>
	</span>
	<ul class="dropdown-menu" id="map-tool">
	<jsp:include page="map-tool.jsp"></jsp:include>
	</ul>
	</button>
	</div>