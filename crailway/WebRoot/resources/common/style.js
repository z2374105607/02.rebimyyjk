var style = {
		"常规项目":{
			"icon":"",//图标 （font-awesome图标）fa-circle-o
			"img":"resources/imgs/left-bottom-one.png",
			"css":"color:#594fd8;",//图标样式
			"selected":"true",//是否展开(默认打开图例风格，不能有多个为true的状态)
			"alias":"",//别名
			"options":{
				"field":"state",//样式控制字段
				"alias":["新开项目","竣工项目","已销售项目"],//各状态对应中文意思,与styles长度对应。
				"tran":{"==1":0,"==2":1,"==3":2},//转换 {value:alias中的索引值} 顺序对应的上可以省略不写 ，支持value是表达式
				"styles":[//第一组：新开项目样式
					function(leave){
						return {
						"bgImg":"resources/imgs/left-1-1.png",
						backgroundColor:"rgb(83, 115, 169)",
                    	legendBg:"rgb(83, 115, 169)",//图例背景颜色
						width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
						height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
						borderRadius:"50%",
						border:"1px solid #6cc3fe",
						boxShadow:"0 1px 2px rgba(0,0,0,.5)",
						backgroundImage:""
						/*webkitAnimationTimingFunction:"ease-in-out",
						webkitAnimationName:"breathe",
						webkitAnimationDuration:"1000ms",
						webkitAnimationIterationCount:"infinite",
						webkitAnimationDirection:"alternate"*/
						};
						
					},//第二组:竣工项目样式
					function(leave){
						return{
							"bgImg":"resources/imgs/left-1-2.png",
								legendBg:"rgb(247, 56, 2)",//图例背景颜色
								backgroundColor:"rgb(247, 56, 2)",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								borderRadius:"50%",
								border:"1px solid #CCCC33",
								boxShadow:"0 1px 2px rgba(0,0,0,.5)",
								/*webkitAnimationTimingFunction:"ease-in-out",
								webkitAnimationName:"breathe",
								webkitAnimationDuration:"1000ms",
								webkitAnimationIterationCount:"infinite",
								webkitAnimationDirection:"alternate"*/
						};
                    	
					 },//第三组：已销售项目样式
					 function(leave){
						 return {
							 "bgImg":"resources/imgs/left-1-3.png",
							    legendBg:"rgb(88, 249, 2)",//图例背景颜色
							    backgroundColor:"rgb(88, 249, 2)",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								borderRadius:"50%",
								border:"1px solid #CCFFCC",
								boxShadow:"0 1px 2px rgba(0,0,0,.5)",
								/*webkitAnimationTimingFunction:"ease-in-out",
								webkitAnimationName:"breathe",
								webkitAnimationDuration:"1000ms",
								webkitAnimationIterationCount:"infinite",
								webkitAnimationDirection:"alternate"*/ 
						 };
					 }]
			}
		},
		"库存预警":{
			"icon":"fa-bell",//图标 （font-awesome图标）
			"img":"",
			"css":"color:#e4c524;",//图标样式
			"selected":"false",//是否展开
			"alias":"",//别名
			"options":{
				"field":"restate",
				"alias":["库存>5万㎡或>5亿","库存>10万㎡或>10亿","库存>20万㎡或>20亿"],
				"tran":{"==20":2,"==10":1,"==5":0,"==0":3},
	            "styles":[ //库存>5万㎡或>5亿
						function(){
							return{
								"bgImg":"resources/imgs/bell1.png",
								legendBg:"#6060f7",//图例背景颜色
								legend:"\&#xf0f3",//"\&#xf0f3;",//图例（font-awesome）字体图
							    backgroundColor:"transparent",//"transparent",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								border:"0",
								boxShadow:"0",
								fontSize:"14px",
								color:"#02a9f9"
							};
						},
						function(){//库存>10万㎡或>10亿
							return{
								"bgImg":"resources/imgs/bell2.png",
								legendBg:"#3def3d",//图例背景颜色
								legend:"\&#xf0f3",//"\&#xf0f3;",//图例（font-awesome）字体图
							    backgroundColor:"transparent",//"transparent",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								border:"0",
								boxShadow:"0",
								fontSize:"14px",
								color:"#3def3d"	
							};
	                    	
						},
						function(){//库存>20万㎡或>20亿
							return{
								"bgImg":"resources/imgs/bell3.png",
								legendBg:"#f15e5e",//图例背景颜色
								legend:"\&#xf0f3",//"\&#xf0f3;",//图例（font-awesome）字体图
							    backgroundColor:"transparent",//"transparent",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								border:"0",
								boxShadow:"0",
								fontSize:"14px",
								color:"#f15e5e"	
							};
						},
						function(){//库存=
							return{
								legendBg:"#f15e5e",//图例背景颜色
								legend:"\&#xf0f3",//"\&#xf0f3;",//图例（font-awesome）字体图
							    backgroundColor:"#f15e5e",//"transparent",
								width:"0px",
								height:"0px",
								border:"0",
								boxShadow:"0",
								fontSize:"0px",
								color:"#f90202"	
							};
						}]
			}
		},
		"进度预警":{
			"icon":"fa-warning",//图标 （font-awesome图标）
			"img":"",
			"css":"color:red;",//图标样式
			"selected":"false",//是否展开
			"alias":"",//别名
			"options":{
				"field":"progress",
				"alias":["没有滞后","滞后项目","滞后停工"],
				"content":"",
	            "styles":[
	                      function(){
	                    	  return{
								  "bgImg":"resources/imgs/left-1-1.png",
	                    		legendBg:"#eaf902",//图例背景颜色
								legend:"\&#xf071;",//图例（font-awesome）字体图
	  						    backgroundColor:"transparent",//marker图标背景色
	  						    width:["0px","3px","6px","9px","11px","13px","18px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","18px"][(leave||2)],
	  							border:"0",
	  							boxShadow:0,
	  							backgroundImage:"none",
	  							fontSize:["12px","16px","18px","20px"][leave],
	  							color:"#eaf902"  
	                    	  };
						},
						function(){
							return{
								"bgImg":"resources/imgs/left-1-2.png",
								legendBg:"#02a9f9",//图例背景颜色
								legend:"\&#xf071;",//图例（font-awesome）字体图
							    backgroundColor:"transparent",
								width:"3px",
								height:"3px",
								border:"0",
	  							boxShadow:"0",
	  							backgroundImage:"none",
								fontSize:["12px","16px","18px","20px"][leave],
								color:"#02a9f9"
							};
						},
						function(){
							return{
								"bgImg":"resources/imgs/left-1-3.png",
								legendBg:"#f90202",//图例背景颜色
								legend:"\&#xf071;",//图例（font-awesome）字体图
							    backgroundColor:"transparent",
								width:"3px",
								height:"3px",
								border:"0",
	  							boxShadow:0,
	  							backgroundImage:"none",
								fontSize:["12px","16px","18px","20px"][leave],
								color:"#f90202"
							};
						}]
			}
		}
		
};
var styleTheme = {
		"level":{
			"icon":"fa-circle-o",//图标 （font-awesome图标）
			"css":"color:#594fd8;",//图标样式
			"selected":"false",//是否展开(默认打开图例风格，不能有多个为true的状态)
			"alias":"",//别名
			"options":{
				"field":"state",//样式控制字段
				"alias":["新开项目","竣工项目","已销售项目"],//各状态对应中文意思,与styles长度对应。
				"tran":{"==1":0,"==2":1,"==3":2},//转换 {value:alias中的索引值} 顺序对应的上可以省略不写 ，支持value是表达式
	            "styles":[//第一组：新开项目样式
					function(leave){
						return {
						backgroundColor:"rgba(204, 204, 51,0.8)",
                    	legendBg:"rgb(83, 115, 169)",//图例背景颜色
						width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
						height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
						borderRadius:"50%",
						border:"1px solid #6cc3fe",
						boxShadow:"0 1px 2px rgba(0,0,0,.5)"
						//backgroundImage:"-webkit-gradient(linear,left top,left bottom,from(#6cc3fe),to(#6633FF))",
						/*webkitAnimationTimingFunction:"ease-in-out",
						webkitAnimationName:"breathe",
						webkitAnimationDuration:"1000ms",
						webkitAnimationIterationCount:"infinite",
						webkitAnimationDirection:"alternate"*/
						};
						
					},//第二组:竣工项目样式
					function(leave){
						return{
							backgroundColor:"rgba(255, 99, 71,0.8)",
	                    	legendBg:"rgb(255, 99, 71)",//图例背景颜色
							width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
							height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
							borderRadius:"50%",
							border:"1px solid #6cc3fe",
							boxShadow:"0 1px 2px rgba(0,0,0,.5)"
							//backgroundImage:"-webkit-gradient(linear,left top,left bottom,from(#6cc3fe),to(#6633FF))",
							/*webkitAnimationTimingFunction:"ease-in-out",
							webkitAnimationName:"breathe",
							webkitAnimationDuration:"1000ms",
							webkitAnimationIterationCount:"infinite",
							webkitAnimationDirection:"alternate"*/
							
						};
                    	
					 },//第三组：已销售项目样式
					 function(leave){
						 return {
							    legendBg:"rgb(88, 249, 2)",//图例背景颜色
							    backgroundColor:"rgb(88, 249, 2)",
								width:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								height:["0px","3px","6px","9px","11px","13px","15px"][(leave||2)],
								borderRadius:"50%",
								border:"1px solid #CCFFCC",
								boxShadow:"0 1px 2px rgba(0,0,0,.5)",
								backgroundImage:"-webkit-gradient(linear,left top,left bottom,from(#CCFFCC),to(#669900))",
								/*webkitAnimationTimingFunction:"ease-in-out",
								webkitAnimationName:"breathe",
								webkitAnimationDuration:"1000ms",
								webkitAnimationIterationCount:"infinite",
								webkitAnimationDirection:"alternate"*/ 
						 };
					 }]
			}
		}
};

