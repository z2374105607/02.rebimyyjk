<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
    <script src="../asset/js/javascript.js"></script>

    <link href="../asset/css/codemirror.css" rel="stylesheet">
    <link href="../asset/css/monokai.css" rel="stylesheet">
</head>

<body>
    <div class="container-fluid" style="padding: 0;">
        <div class="row-fluid example"  style="padding: 0;">
            <div id="sidebar-code" class="col-md-1" style="width:0;height:0;overflow:hidden;">
                <div class="well sidebar-nav">
                    <div class="nav-header"><a href="#" onclick="autoResize()" class="glyphicon glyphicon-resize-full" id ="icon-resize" ></a>option</div>
                    <textarea id="code" name="code">
option = {
    tooltip : {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        show:true,
       // orient : 'vertical',
        x : 'center',
        y:'bottom',
        data:['直达','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
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
    calculable : true,
    series : [
        {
            name:'项目完成情况',
            type:'pie',
           // center : ['35%', 200],
            radius : 80,
            itemStyle : {
                normal : {
                    label : {
                        position : 'inner',
                        formatter : function (params) {  
                          return params.name+'\n'+(params.percent - 0).toFixed(0) + '%'
                        }
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        formatter : "{b}\n{d}%"
                    }
                }
            },
            data:[
                {value:335, name:'新开'},
                {value:679, name:'已竣工'},
                {value:1548, name:'已销售'}
            ]
        },
        {
            name:'访问来源',
            type:'pie',
           // center : ['35%', 200],
            radius : [110, 140],
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {
                    value:1048,
                    name:'百度',
                    itemStyle : {
                        normal : {
                            color : (function (){
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getRadialGradient(
                                    300, 200, 110, 300, 200, 140,
                                    [[0, 'rgba(255,255,0,1)'],[1, 'rgba(30,144,250,1)']]
                                )
                            })(),
                            label : {
                                textStyle : {
                                    color : 'rgba(30,144,255,0.8)',
                                    align : 'center',
                                    baseline : 'middle',
                                    fontFamily : '微软雅黑',
                                    fontSize : 30,
                                    fontWeight : 'bolder'
                                }
                            },
                            labelLine : {
                                length : 40,
                                lineStyle : {
                                    color : '#f0f',
                                    width : 3,
                                    type : 'dotted'
                                }
                            }
                        }
                    }
                },
                {value:251, name:'谷歌'},
                {
                    value:102,
                    name:'必应',
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true,
                                length : 50
                            }
                        }
                    }
                },
                {value:147, name:'其他'}
            ]
        }
    ]
};
                    </textarea>
              </div><!--/.well -->
            </div><!--/span-->
            <div id="graphic" class="col-md-12" style="padding: 0px 5px;">
                <div id="main" class="main" style="width:365px;height:380px;"></div>
                <div>
                    <button type="button" class="btn btn-sm btn-success" onclick="refresh(true)">刷 新</button>
                    <span class="text-primary">切换主题</span>
                    <select id="theme-select"></select>

                    <span id='wrong-message' style="color:red"></span>
                </div>
            </div><!--/span-->
        </div><!--/row-->
        
        </div>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../asset/js/jquery.min.js"></script>
    <script src="../asset/js/bootstrap.min.js"></script>
    <script src="../asset/js/echartsExample.js"></script>
</body>
</html>
