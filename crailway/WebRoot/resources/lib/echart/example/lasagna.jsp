<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%! 
//echar初始参数，可通过param属性进行修改
String width = "365px"; //默认宽度
String height="380px"; //默认高度
String options=""; //配置
String theme=""; //主题
String data=""; //数据
String title="";//标题
 %>
<!DOCTYPE html>
<html lang="en" style="overflow:hidden;">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ECharts">
    <meta name="author" content="kener.linfeng@gmail.com">
    <title>ECharts · Example</title>
    <link href="../asset/css/carousel.css" rel="stylesheet">
    <link href="../asset/css/echartsHome.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="./www/js/echarts.js"></script>
    <script src="../asset/js/codemirror.js"></script>
    <link href="../asset/css/codemirror.css" rel="stylesheet">
    <link href="../asset/css/monokai.css" rel="stylesheet">
</head>

<body>
    <!-- Fixed navbar -->
    <div class="container-fluid" style="padding: 0;">
        <div class="row-fluid example" style="padding: 0;">
            <div id="sidebar-code" class="col-md-1" style="width:0;height:0;overflow:hidden;">
                <div class="well sidebar-nav">
                    <div class="nav-header"><a href="#" onclick="autoResize()" class="glyphicon glyphicon-resize-full" id ="icon-resize" ></a>option</div>
                    <textarea id="code" name="code">
option = {
    title : {
        text: '浏览器占比变化',
        subtext: '纯属虚构',
        x:'right',
        y:'bottom'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        y:'bottom',
        data:['Chrome','Firefox','Safari','IE9+','IE8-']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : false,
    series : (function (){
        var series = [];
        for (var i = 0; i < 30; i++) {
            series.push({
                name:'浏览器（数据纯属虚构）',
                type:'pie',
                itemStyle : {normal : {
                    label : {show : i > 28},
                    labelLine : {show : i > 28, length:20}
                }},
                radius : [i * 4 + 40, i * 4 + 43],
                data:[
                    {value: i * 128 + 80,  name:'Chrome'},
                    {value: i * 64  + 160,  name:'Firefox'},
                    {value: i * 32  + 320,  name:'Safari'},
                    {value: i * 16  + 640,  name:'IE9+'},
                    {value: i * 8  + 1280, name:'IE8-'}
                ]
            })
        }
        series[0].markPoint = {
            symbol:'emptyCircle',
            symbolSize:series[0].radius[0],
            effect:{show:true,scaleSize:12,color:'rgba(250,225,50,0.8)',shadowBlur:10,period:30},
            data:[{x:'50%',y:'50%'}]
        };
        return series;
    })()
};
setTimeout(function (){
    var _ZR = myChart.getZrender();
    var TextShape = require('zrender/shape/Text');
    // 补充千层饼
    _ZR.addShape(new TextShape({
        style : {
            x : _ZR.getWidth() / 2,
            y : _ZR.getHeight() / 2,
            color: '#666',
            text : '恶梦的过去',
            textAlign : 'center'
        }
    }));
    _ZR.addShape(new TextShape({
        style : {
            x : _ZR.getWidth() / 2 + 200,
            y : _ZR.getHeight() / 2,
            brushType:'fill',
            color: 'orange',
            text : '美好的未来',
            textAlign : 'left',
            textFont:'normal 20px 微软雅黑'
        }
    }));
    _ZR.refresh();
}, 2000);
                    </textarea>
              </div><!--/.well -->
            </div><!--/span-->
            <div id="graphic" class="col-md-12" style="padding: 0px 5px;">
                <div id="main" class="main" style="width:<%=width%>;height:<%=height%>;"></div>
                <div>
                    <button type="button" class="btn btn-sm btn-success" onclick="refresh(true)">刷 新</button>
                    <span class="text-primary">切换主题</span>
                    <select id="theme-select"></select>
                    <span id='wrong-message' style="color:red"></span>
                </div>
            </div><!--/span-->
        </div><!--/row-->
        </div><!--/.fluid-container-->
    <footer id="footer"></footer>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../asset/js/jquery.min.js"></script>
    <script src="../asset/js/bootstrap.min.js"></script>
    <script src="../asset/js/echartsExample.js"></script>
</body>
</html>
