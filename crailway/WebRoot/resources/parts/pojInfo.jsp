<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="height-right" class="bs-example dropdown-menu"
	style="left: -65px; width:342.5%;height:78vh;overflow:auto;padding:0;display:block;margin-top:1.3vh;">
	<!-- data-stopPropagation="true" -->
	<ul class="nav nav-tabs navs">
		<li role="presentation" class="active" ><a
			href="#survey" role="tab" data-toggle="tab" aria-controls="survey" data-stopPropagation="true"
			aria-expanded="true"  class="border-b-r">概况</a></li>
		<li role="presentation" ><a href="#np"
			role="tab" data-toggle="tab" aria-controls="np"
			data-stopPropagation="true" class="border-b-r">新开项目</a></li>
		<li role="presentation" ><a href="#fp"
			role="tab" data-toggle="tab" aria-controls="fp"
			data-stopPropagation="true" class="border-b-r">施工项目</a></li>
		<li role="presentation" ><a href="#sp"
			role="tab" data-toggle="tab" aria-controls="sp" data-stopPropagation="true"  class="border-b">竣工项目</a></li>
	</ul>
	<div class="tab-content">
		<div role="tabpanel" class="tab-pane fade in active" id="survey">
			<!-- <iframe id="echartFrame" name="echart"
				src="resources/lib/echart/example/lasagna.html"
				style="overflow: visible; min-height: 450px;" scrolling="yes"
				frameborder="no" width="100%" height="100%"></iframe>
		     <img src="resources/imgs/demo.jpg" style="display:block;" /> -->
		     <div class="row" style="margin:10px 0;">
			<div id="tu" class="col-lg-12 col-md-12 col-sm-12" style="box-shadow:none; padding-left: 0px;
    padding-right: 0px;" >
				<div id="echart" style="height:240px;width:345px;margin: 0 auto;"></div>
			</div>
			<%--<div class="col-lg-2 col-md-2 col-sm-2">--%>
	        	<%--<img src="resources/imgs/logo.jpg" style="max-width:100%;">--%>
	        <%--</div>--%>
			<div id="quanguo"  class="col-lg-12 col-md-12 col-sm-12" style="padding:0;margin-bottom: 1vh;">

			</div>
		</div>
		</div>
		<div role="tabpanel" class="tab-pane fade " id="np">

		<div class="col-lg-12 col-md-12 col-sm-12" style="box-shadow:none;  padding-left: 0px;
    padding-right: 0px;  margin: 0;">
				<div id="echartNew" style="height:240px;width:345px;box-shadow:none;margin: 0 auto;"></div>

		</div>
        <%--一个公司开始--%>
        <div id="newProgram"  class="col-lg-12 col-md-12 col-sm-12" style="padding:0;margin-bottom: 1vh;">

        </div>

		</div>
        <%--一个公司结束--%>
		<div role="tabpanel" class="tab-pane fade " id="fp">

			<div class="col-lg-12 col-md-12 col-sm-12" style="box-shadow:none;  padding-left: 0px;
    padding-right: 0px;  margin: 0;">
				<div id="echartWork" style="height:240px;width:345px;box-shadow:none;margin: 0 auto;"></div>

			</div>
	        <div id="workProgram"  class="col-lg-12 col-md-12 col-sm-12" style="padding:0;margin-bottom: 1vh;">
	        </div>
		</div>
		<div role="tabpanel" class="tab-pane fade " id="sp">

			<div class="col-lg-12 col-md-12 col-sm-12" style="box-shadow:none;  padding-left: 0px;
    padding-right: 0px;  margin: 0;">
				<div id="echartFinish" style="height:240px;width:345px;box-shadow:none;margin: 0 auto;" ></div>

			</div>
	        <div id="finishProgram"  class="col-lg-12 col-md-12 col-sm-12" style="padding:0;margin-bottom: 1vh;">
	        </div>
	</div>
</div>
	<script>
	$(function(){
        $(".text-left p").click(function(){
        $(this).nextAll().show.parent().siblings().children("p").nextAll().hide();
    });
		//getGroupChartsData("");
	});
	/* $(function(){
        //右侧框高度
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        $("#height-right").height(parseFloat(h)-180);
        //图标配置
        var MyChart=echarts.init(document.getElementById("echart"));
        option = {
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
        orient: 'vertical',
        show: false,
        x: 'left',
        data: ['海外公司', '济南公司', '华南公司', '华南公司', '商业公司']
        },
        series: [

        {
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '55%'],
        labelLine: {
        normal: {
        length: 20,
        length2: 50,
        lineStyle: {
        color: '#333'
        }
        }

        },
        label: {
        normal: {
        formatter: '{a|{d}%}\n{b|{b}}',
        borderWidth: 0,
        borderRadius: 4,
        // shadowBlur:3,
        // shadowOffsetX: 2,
        // shadowOffsetY: 2,
        // shadowColor: '#999',
        center : ['50%', '50%'],
        padding: [0, -50],
        rich: {
        a: {
        color: '#333',
        fontSize: 16,
        lineHeight: 20
        },
        // abg: {
        //     backgroundColor: '#333',
        //     width: '100%',
        //     align: 'right',
        //     height: 22,
        //     borderRadius: [4, 4, 0, 0]
        // },
        hr: {
        borderColor: '#333',
        width: '100%',
        borderWidth: 0.5,
        height: 0
        },
        b: {
        fontSize: 16,
        lineHeight: 20,
        color: '#333'
        }
        // per: {
        //     color: '#333',
        //     padding: [2, 4],
        //     borderRadius: 2
        // }
        }
        }
        },
        data: [{
        value: 25,
        name: '海外公司'
        }, {
        value: 25,
        name: '济南公司'
        }, {
        value: 25,
        name: '华南公司'
        }, {
        value: 25,
        name: '华南公司'
        },{
        value: 25,
        name: '商业公司'
        }]
        }
        ]
        };
        MyChart.setOption(option);
        }
        ) */
	</script>
