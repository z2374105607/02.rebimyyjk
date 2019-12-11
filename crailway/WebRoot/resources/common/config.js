var config = {
    //服务配置
		/*services:{
			"getAllCompanys":"http://120.1.192.243:8088/crailway/manager/check/companys",
			"getCompanysByName":"http://120.1.192.243:8088/crailway/manager/check/company/name",
			"getAllZtitems":"http://120.1.192.243:8088/crailway/manager/check/ztitems"
		},*/
		services:{
			"getAllCompanys":"manager/check/companys",
			"getCompanysByName":"manager/check/company/name",
			"getAllZtitems":"manager/check/ztitems",
			"getAllRooms":"manager/check/getRoom",
			"getprovinces":"program/findProvinceList",
			"getCitys":"program/findCitysList",
			"getpro":"manager/check/getpro"
		},
	//分页配置
	page:{
	  indexPage:1,//首页码
	  pageSize:20//每页容限
	},
	/**********时间配置**********/
	timer:{
		//时间枚举，配置时间设置
		enum:{
			"一个月":"1",
			"三个月":"3",
			"半年":"6"
		},
		//年份数据轮播时间配置
		carousel:{
			interval:200,//进度条刷新间隙，单位：ms
			step:0.5,//每次增进数值
			remain:1800//切换到最后时停留时间，单位：ms
		},
		dtime:0,//延迟加载器执行计数变量
		wtime:0,//等待加载器执行计数变量
		ready:false//就绪标志
		/*延迟加载器*/
		/*delayer:new function(delayerTime,count,execute){
		},
		*/
		/***********等待加载器（尚未实现）************
		 * 注释：等待某个条件符合要求时才执行函数，否则会根据设置项继续监测条件满足来激活函数
		 * @param condition 执行条件 true：执行  false:不执行 也可以是某个函数执行后的返回值 ，有值为真，否则为假
		 * @param execute 执行函数，条件满足时的执行函数
		 * @param options 等待加载器设置项 值：（waitTime：等待有效时间，exenum:执行次数），默认没有等待时间，只执行一次
		 */
		/*
		wait:new function(condition,execute,options){
			if(typeof callback != "functon")return;
			this.ready = false;//停止标志
			this.interval = 500;//执行间隔，单位：ms
			this.maxTime = -1;//最大循环次数（-1：无限制）
			//this.timer=window.setInterval(callback,this.interval);//时间标识
		}*/
	},
	xianLevelCity:["110100","120100","310100","500100"],//县级市【北京  天津   上海  重庆】
	//其他
	other:new Object()
};