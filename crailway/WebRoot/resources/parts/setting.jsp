<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <div id="themeSet" style="left:-100px;right:0;top:40px;overflow: hidden;width:286px;font-size: 14px;" data-stopPropagation="true" class="dropdown-menu">
         <h4 style="text-align: left;padding-left: 11px;border-bottom: 1px solid #ddd;border-top: 3px solid #0289e3;padding-top: 10px;padding-bottom: 10px;margin: 0;">专题设置</h4>
         <div style="height:204px;width: 100%;overflow: hidden;position: relative;padding:10px;">
         <!-- <div style="position: absolute;top: 0;bottom: 0;left: 0;box-shadow: none;border-left: 158px solid rgba(250, 255, 1, 0.95);border-top: 100px solid transparent;border-bottom: 12000px solid transparent;"></div>
         <div style="position: absolute;top: 0;bottom: 0;right: 0;box-shadow: none;border-right: 161px solid rgba(247, 52, 0, 0.95);border-top: 100px solid transparent;border-bottom: 12000px solid transparent;"></div>
         -->
         <img src="resources/imgs/sp4.png" style="width: 100%;display:block; opacity: 0.6;" onerror='javascript:this.src=""'>
         <span class="special" data-ref="1" style="position: absolute;color: #3ead1b;top: 40%;font-size: 24px;left: 13%;">聚合图</span>
         <span class="special" data-ref="3" style="position: absolute;color: #a01414;top: 40%;font-size: 24px;right: 13%;">热力图</span>
         <span class="special" data-ref="4" style="position: absolute;color: #a01414;bottom: 20%;font-size: 24px;left: 40%;">等级图</span>
         <span class="special" data-ref="2" data-state="active" style="position: absolute;color: #0f21a9;top: 17%;font-size: 24px;right: 0;left:0;text-decoration:underline;">麻点图</span>
        </div>
         <%--<h4 style="text-align: left;padding-left: 11px;"><b>主题设置</b></h4>--%>
         <%--<span style="display:inline-block;width:50%;float:left;">项目分析<i  class="fa fa-toggle-on theme-on-off" style="color:blue;margin:0px 5px;vertical-align: bottom;font-size:23px;vertical-align: bottom;"></i></span><span style="display:inline-block;width:50%;float:right;">招标分析<i class="fa fa-toggle-off theme-on-off" style="color:blue;margin:0px 5px;font-size:23px;"></i></span>--%>
         <%--<hr/>--%>
         <%--<h4 style="text-align: left;padding-left: 11px;"><b>时间设置</b></h4>--%>
         <%--<div style="text-align:left;padding: 0px 0px 15px 35px;">最近：--%>
         <%--<ul id="timer"></ul>
         </div>--%>
 </div>
 <script>
 $(function(){
	var  timeList = config.timer.enum;
	var n=0;
	for(var i in timeList){
		var outHtml = "<li data-ref='"+timeList[i]+"'><a "+(n==0?"class='active'":"")+">"+i+"</a></li>";
		$("#timer").append(outHtml);
		n++;
	};
	$("#timer").append("<li data-ref='-1'><a>其他</a></li>");
 });
 </script>
