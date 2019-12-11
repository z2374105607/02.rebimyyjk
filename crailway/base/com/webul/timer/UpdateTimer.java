package com.webul.timer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.Resource;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.webul.bean.Ztitem;
import com.webul.manager.check.service.CheckService;
import com.webul.util.UrlConfig;
import com.webul.util.http.HttpUtil;
import com.webul.util.log.LogUtil;

public class UpdateTimer {
	@Resource
	private CheckService checker;

	public void init() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, 1); // 凌晨1点
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		Date date = calendar.getTime(); // 第一次执行定时任务的时间
		// 如果第一次执行定时任务的时间 小于当前的时间
		// 此时要在 第一次执行定时任务的时间加一天，以便此任务在下个时间点执行。如果不加一天，任务会立即执行。
		if (date.before(new Date())) {
			date = this.addDay(date, 1);
		}
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
//				for(int i=0;i<1050;i++) {
//					checker.updataroom_status(i,"014b5cc4706343d8bf27f4794f288557");
//					checker.updataroom_status(i,"3a412e01d15945f7b386718fb9363dc5");
//					checker.updataroom_status(i,"d9343a2a2d294401ac92efccf798e0aa");
//				}
				
//				checker.upDateprojecthxurl(1,"http://10.22.2.54/img/xpf1.jpg,http://10.22.2.54/img/xpf2.jpg,http://10.22.2.54/img/xpf3.jpg");
//				checker.upDateprojecthxurl(2,"http://10.22.2.54/img/xpf1.jpg,http://10.22.2.54/img/xpf2.jpg,http://10.22.2.54/img/xpf3.jpg");
//				checker.upDateprojecthxurl(4,"http://10.22.2.54/img/lxj1.png,http://10.22.2.54/img/lxj2.png,http://10.22.2.54/img/lxj3.png,http://10.22.2.54/img/lxj4.png,http://10.22.2.54/img/lxj5.png,http://10.22.2.54/img/lxj6.png");
				// checker.updateSqlbuilding(11, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "1#楼", "", "", "0", "0");
				// checker.updateSqlbuilding(12, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "2#楼", "", "", "1", "0");
				// checker.updateSqlbuilding(13, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "3#楼", "", "", "2", "0");
				// checker.updateSqlbuilding(14, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "4#楼", "", "", "0", "0");
				// checker.updateSqlbuilding(15, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "5#楼", "", "", "1", "0");
				// checker.updateSqlbuilding(16, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "6#楼", "", "", "0", "2");
				// checker.updateSqlbuilding(17, "32dfa580-5a47-4b27-b6e9-fc9bf656872f",
				// "dd9137c8f2574a079ea3f56a0442e690", "在售", "7#楼", "", "", "2", "2");
				// checker.updateSqlproject(4, "北京理想家",
				// "http://10.22.2.25/REST/http-loadProjectIcon.ac?projectId=32dfa580-5a47-4b27-b6e9-fc9bf656872f&apikey=5334163f-5afa-48fe-8114-5d31729e9068"
				// , "32dfa580-5a47-4b27-b6e9-fc9bf656872f", "", "", "0", "", "到预售点", "",
				// "http://10.22.2.25/REST/http-loadProjectIcon.ac?projectId=32dfa580-5a47-4b27-b6e9-fc9bf656872f&apikey=5334163f-5afa-48fe-8114-5d31729e9068"
				// , "0", "0", "大兴", "--", "北京市大兴黄村镇新华大街", "--", "--", "北京欣达置业有限公司", "--", "--",
				// "--", "--", "--", "北京理想家");
				//
				// String json="[\n" +
				// " {\n" +
				// " \"竣工备案\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-12-01\",\n" +
				// " \"planEndDate\": \"2019-08-25\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2020-07-01\",\n" +
				// " \"planEndDate\": \"2020-11-01\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"结构封顶\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-06-30\",\n" +
				// " \"planEndDate\": \"2019-06-30\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-06-25\",\n" +
				// " \"planEndDate\": \"2018-07-25\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"园林\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-10-15\",\n" +
				// " \"planEndDate\": \"2019-07-15\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2019-10-01\",\n" +
				// " \"planEndDate\": \"2020-08-01\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"土方施工\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2017-09-01\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2017-08-01\",\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2017-08-01\",\n" +
				// " \"planEndDate\": \"2017-09-01\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-04-01\",\n" +
				// " \"planEndDate\": \"2018-05-30\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"获取土地\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2016-07-15\",\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": \"2016-07-15\",\n" +
				// " \"state\": \"2\",\n" +
				// " \"planStartDate\": \"2016-07-15\",\n" +
				// " \"planEndDate\": \"2016-07-15\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2016-07-15\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2016-07-15\",\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2016-07-15\",\n" +
				// " \"planEndDate\": \"2016-07-15\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"外立面亮相\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2020-06-10\",\n" +
				// " \"planEndDate\": \"2020-06-10\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2019-06-01\",\n" +
				// " \"planEndDate\": \"2019-07-01\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"到预售点\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-07-01\",\n" +
				// " \"planEndDate\": \"2018-07-15\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2017-10-10\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2017-09-25\",\n" +
				// " \"state\": \"2\",\n" +
				// " \"planStartDate\": \"2017-09-25\",\n" +
				// " \"planEndDate\": \"2017-10-10\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"施工许可\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-04-01\",\n" +
				// " \"planEndDate\": \"2018-04-01\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2017-08-15\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2017-07-15\",\n" +
				// " \"state\": \"2\",\n" +
				// " \"planStartDate\": \"2017-07-15\",\n" +
				// " \"planEndDate\": \"2017-08-15\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"主体结构\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2017-07-25\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2017-09-05\",\n" +
				// " \"state\": \"2\",\n" +
				// " \"planStartDate\": \"2017-09-05\",\n" +
				// " \"planEndDate\": \"2018-07-25\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-06-01\",\n" +
				// " \"planEndDate\": \"2018-06-30\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"四方验收\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2019-08-01\",\n" +
				// " \"planEndDate\": \"2019-08-10\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-09-20\",\n" +
				// " \"planEndDate\": \"2018-10-04\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"上房\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2019-08-26\",\n" +
				// " \"planEndDate\": \"2019-08-31\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2020-11-01\",\n" +
				// " \"planEndDate\": \"2020-11-07\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"二次结构\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-04-07\",\n" +
				// " \"planEndDate\": \"2018-08-15\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-08-16\",\n" +
				// " \"planEndDate\": \"2019-06-25\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"规划许可证\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"3\",\n" +
				// " \"planStartDate\": \"2017-01-19\",\n" +
				// " \"planEndDate\": \"2017-01-19\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": \"2017-01-19\",\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2016-12-19\",\n" +
				// " \"state\": \"2\",\n" +
				// " \"planStartDate\": \"2016-12-19\",\n" +
				// " \"planEndDate\": \"2017-01-19\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"装修施工\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-09-01\",\n" +
				// " \"planEndDate\": \"2020-06-10\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-07-01\",\n" +
				// " \"planEndDate\": \"2019-05-31\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"基础施工\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": \"2017-08-15\",\n" +
				// " \"state\": \"5\",\n" +
				// " \"planStartDate\": \"2017-08-15\",\n" +
				// " \"planEndDate\": \"2017-09-10\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2018-05-10\",\n" +
				// " \"planEndDate\": \"2018-06-10\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " },\n" +
				// " {\n" +
				// " \"小市政\": [\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"一期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"1\",\n" +
				// " \"planStartDate\": \"2018-09-01\",\n" +
				// " \"planEndDate\": \"2019-05-15\",\n" +
				// " \"stageId\": \"80059ec7-925b-4d63-b061-9bd9c1e22a75\"\n" +
				// " },\n" +
				// " {\n" +
				// " \"cusEndDate\": null,\n" +
				// " \"stageName\": \"二期\",\n" +
				// " \"cusStartDate\": null,\n" +
				// " \"state\": \"0\",\n" +
				// " \"planStartDate\": \"2019-09-01\",\n" +
				// " \"planEndDate\": \"2020-06-01\",\n" +
				// " \"stageId\": \"e1c77fa2-34f2-4a61-819a-8cf2b1ac3565\"\n" +
				// " }\n" +
				// " ]\n" +
				// " }\n" +
				// "]";
				// JSONArray arr=new JSONArray(json);
				// int p=65; int n=66;
				// for(int i=0;i<arr.length();i++) {
				//
				// Iterator<String> it = arr.getJSONObject(i).keySet().iterator();
				// while (it.hasNext()) {
				// String key = it.next();
				// JSONArray arr2=arr.getJSONObject(i).getJSONArray(key);
				// for(int j=0;j<arr2.length();j++) {
				// JSONObject obj=arr2.getJSONObject(j);
				// if("二期".equals(obj.optString("stageName"))) {
				// checker.insertStateSql(n,"32dfa580-5a47-4b27-b6e9-fc9bf656872f",key,obj.optString("stageName"),obj.optString("planStartDate"),
				// obj.optString("planEndDate"),obj.optString("cusStartDate"),obj.optString("cusEndDate"),obj.optString("state"));
				// n=n+2;
				// }else {
				// checker.insertStateSql(p,"32dfa580-5a47-4b27-b6e9-fc9bf656872f",key,obj.optString("stageName"),obj.optString("planStartDate"),
				// obj.optString("planEndDate"),obj.optString("cusStartDate"),obj.optString("cusEndDate"),obj.optString("state"));
				// p=p+2;
				// }
				//
				// }
				//
				//
				// }
				//
				//
				// }

				// checker.upDateproject(59, "12964474.37762","4825465.42999294");
				// checker.upDateproject(2, "1c1167a3-0637-45bf-96e7-5ca69eeb26a4");
				// checker.upDateproject(3, "b317ec6f-3577-4f99-9025-f1d967dcf268");
				// checker.upDateproject(4, "153d34f5-410e-4bc3-ba50-0001c52388c3");
				// checker.upDateproject(5, "ba324993-0a98-4c10-8060-c5eecd114127");
				// checker.upDateproject(6, "bfbc9268-94a8-4920-8195-7c328e3955c8");
				// checker.upDateproject(7, "ec3d48cf-5e50-4091-8a56-0573ac516d35");
				// checker.upDateproject(8, "60f3158a-42d9-4679-b9c2-d73d49e696eb");
				// checker.upDateproject(9, "3aafd313-a985-46ae-98ee-385de6d8b9e2");
				// checker.upDateproject(10, "5eb36f7a-f724-44af-ac09-004c2174ec13");
				// checker.upDateproject(11, "e23294c3-e4e3-43f7-92d9-6e02cdcae952");
				// checker.upDateproject(12, "7090dd6a-9220-4442-839e-1ed34f3f1bd2");
				// checker.upDateproject(13, "8ab40f56-bd3c-41ec-a7c7-3be097856ce1");
				// checker.upDateproject(14, "0fda074a-717e-4c3a-9bae-0ac65487fdd4");
				// checker.upDateproject(15, "3d44a12d-6aef-40e1-9a5d-92e54d223878");
				// checker.upDateproject(16, "b025e14b-78f7-4910-81e9-562aa01cec25");
				// checker.upDateproject(17, "2e65a4a9-80c8-4082-8a12-73207027d7e5");
				// checker.upDateproject(18, "11a02f5b-b437-4f93-8a37-e40929c98bc9");
				// checker.upDateproject(19, "1daee593-2fa9-4e43-9aa6-ee820f488f0d");
				// checker.upDateproject(20, "3e7507a3-b76a-48c5-bd81-2820958ed919");
				// checker.upDateproject(21, "55157f3c-67b2-4c6e-b0ad-bd9938c13947");
				// checker.upDateproject(22, "2d5b049f-a160-4f67-8fe6-a18c02c3f55e");
				// checker.upDateproject(23, "d30150ae-3e64-483b-94b5-d12e6c5b3c35");
				// checker.upDateproject(24, "5bcb3170-ed6e-410c-8d15-6cea40fb4038");
				// checker.upDateproject(25, "b6e1b1e6-ed3d-421f-a301-905bd9326642");
				// checker.upDateproject(26, "185d5d34-9e0e-40c4-8702-8cefb2252fd3");
				// checker.upDateproject(27, "10479b1c-9d08-42bd-b6f7-c2a9648cf8d4");
				// checker.upDateproject(28, "e57982e7-d62b-4578-9779-571e626b5aa4");
				// checker.upDateproject(29, "659a1404-a66e-410e-b450-0a4d0a8e1d65");
				// checker.upDateproject(30, "297852d8-9457-444e-bbae-e93a610b2889");
				// checker.upDateproject(31, "a4d674f1-ad4d-424a-93bd-de63db9ef715");
				// checker.upDateproject(32, "97c08b9a-3cce-4893-8c7b-2607b65f0270");
				// checker.upDateproject(33, "83f02335-f4eb-4af0-927b-87bb564dd430");
				// checker.upDateproject(34, "947b093d-6cb3-4b80-a4bf-8f464cada323");
				// checker.upDateproject(35, "446d08f3-034e-4777-919f-f800124b1021");
				// checker.upDateproject(36, "aca43c52-082b-47df-a494-84b7ea6b9f55");
				// checker.upDateproject(37, "97e5ebfa-4c8b-47f2-99b6-b58f06a51b36");
				// checker.upDateproject(38, "1c8bc758-3d13-4c9a-834c-1123d6c4874f");
				// checker.upDateproject(39, "e7e8a64b-ffb3-4fb9-a876-28dbdd850aae");
				// checker.upDateproject(40, "d368b81d-660a-476e-876f-aec16e5b9b94");
				// checker.upDateproject(41, "7329a0b4-e6eb-4c13-9199-ca03ec910f3c");
				// checker.upDateproject(42, "ab2a0925-5072-40b4-83cb-179a0366412b");
				// checker.upDateproject(43, "6376e928-f023-4412-91a3-fcd3ff131928");
				// checker.upDateproject(44, "9f00d92d-9ff9-4025-9757-cf5942961699");
				// checker.upDateproject(45, "cc9fefb1-6f36-4f8f-86da-6f3ace6fb5cc");
				// checker.upDateproject(46, "00a65a71-9e1a-4b9e-89b0-75738cd374ad");
				// checker.upDateproject(47, "d180d410-afc4-4f92-98e9-637c973c0262");
				// checker.upDateproject(48, "323459c0-5300-454a-b8de-a349c80de782");
				// checker.upDateproject(49, "6507b6c9-eddd-4e64-bbe0-4eb237d6669b");
				// checker.upDateproject(50, "e98bc65a-9a1b-4f2a-bb84-a592f46be1e8");
				// checker.upDateproject(51, "2d26addd-6e6f-40d0-b182-1a09c1df6491");
				// checker.upDateproject(52, "2c44c10d-2198-4007-8340-f53f4858f97f");
				// checker.upDateproject(53, "2c44c10d-2198-4007-8340-f53f4858f97f");
				// checker.upDateproject(54, "03a59fb1-0559-4ef6-9031-461509f569ee");
				// checker.upDateproject(55, "e87c908f-ec37-422c-8cbb-88a8bd43a550");
				// checker.upDateproject(56, "8ea8ec4d-b368-4294-8107-ca66943dc451");
				// checker.upDateproject(57, "76563157-a4a8-4127-a594-8392a870ed55");
				// checker.upDateproject(58, "7632538e-03c9-41e3-ad2b-843618af2fdd");
				// checker.upDateproject(59, "32dfa580-5a47-4b27-b6e9-fc9bf656872f");
				// checker.upDateproject(60, "fdd9f94f-5354-4393-8559-56b4f4178ac3");
				// checker.upDateproject(61, "4226c13e-afbd-4855-a64d-e2ea2b014895");
				// checker.upDateproject(62, "ced8e2a9-e815-4a11-a590-33bcf009ab38");
				// checker.upDateproject(63, "23730850-ea5d-44de-b980-a3bb65ab0098");
				// checker.upDateproject(64, "ad71a781-ad71-4959-9192-1ff6851e9d61");
				// checker.upDateproject(65, "9697804d-6d07-4a86-ae00-4a62650c6254");
				// checker.upDateproject(66, "314f36fd-6cd6-42cc-81be-8bd8adbe2f39");
				// checker.upDateproject(67, "50af8807-b767-4fc8-b7a1-d7fc1bce9384");
				// checker.upDateproject(68, "74678201-8f21-4c5b-98b8-265bd0d45d24");
				// checker.upDateproject(69, "1b57b312-7c9a-49af-8173-c6562491b5ca");
				// checker.upDateproject(70, "3b66d1db-b192-419d-bf6f-7ecfea63546a");
				// checker.upDateproject(71, "7080a713-9dbe-4a6b-96cc-c0e04fec0336");
				// checker.upDateproject(72, "e1b3e6ab-b881-4906-bb60-6905f3c005dd");
				// checker.upDateproject(73, "e9d9bb0c-6dbe-4740-a8bc-354b4925bc39");
				// checker.upDateproject(74, "2fac6ea9-dfca-4302-8583-79b8338c6d03");
				// checker.upDateproject(75, "5915a7dd-59f3-45d5-ab6b-0249a943aaa0");
				// checker.upDateproject(76, "d0a56e3c-8ffc-43b3-a3f3-9e535ec106c9");
				// checker.upDateproject(77, "7cf92f38-baa0-4a46-9b00-8a1b39e78e5e");
				// checker.upDateproject(78, "eb42f1a0-ac3d-4b90-8cb5-dc1720092d66");
				// checker.upDateproject(79, "c76b2510-17ea-4629-80e2-1194d8d766b5");
				// checker.upDateproject(80, "308e8a52-bbc2-4a60-bdcf-6d84a7000e8b");
				// checker.upDateproject(81, "63f5fb4e-8c37-4288-b9bc-c3a78932fe82");
				// checker.upDateproject(82, "179e3f6c-26c0-46e3-8791-b535b3bb8be0");
				// checker.upDateproject(83, "58edb2b6-8095-44ff-a562-c14822774231");
				// checker.upDateproject(84, "a9f61169-9adf-4ef7-be3f-f1a681d66598");
				// checker.upDateproject(85, "a4693f31-f241-4b6e-98ca-fd956b4aaf12");
				// checker.upDateproject(86, "dfa9f58d-0253-426b-a385-c04eecf96dd8");
				// checker.upDateproject(87, "7cc2938b-493f-4127-b26b-af0a6f8a6a9f");
				// checker.upDateproject(88, "b5caf5d3-79b6-4972-a896-b46f3a7da641");
				// checker.upDateproject(89, "a3b6cfae-7988-4cf6-83f8-40fed2517383");
				// checker.upDateproject(90, "69b1ce61-00b6-476d-9fd2-6d1078e5e870");
				// checker.upDateproject(91, "e42b4c79-9ecc-4c28-8f7c-e15431c6879a");
				// checker.upDateproject(92, "9dbc569e-9e38-4abf-aec8-d0848cdc90b9");
				// checker.upDateproject(93, "79507bae-1646-4cc8-85ac-c178cc2fe078");
				// checker.upDateproject(94, "0282fda6-f038-48bb-89c1-f9e2df5ddae0");
				// checker.upDateproject(95, "97e504e9-3a56-429a-9c77-215fb7234468");
				// checker.upDateproject(96, "92d4a48f-1c4b-4c6a-a58f-f0b99ecbced9");
				// checker.upDateproject(97, "0fdf41a9-3183-4751-bdac-cd00826dc5e7");
				// checker.upDateproject(98, "50b7f994-a1fa-4f62-9039-dd8ebf79941d");
				// checker.upDateproject(99, "8c8ae76c-d74b-4a3f-959d-668092bf22f6");
				// checker.upDateproject(100, "cdae9079-c2a5-4b28-8187-3a9e13bebd4f");
				// checker.upDateproject(101, "29a8f34c-7736-4339-bc8f-9865c63e6119");
				// checker.upDateproject(102, "ee8b3abc-84fc-40ca-91d7-94ae162af420");
				// checker.upDateproject(103, "69f3ce3c-bf4b-4551-aacb-95b74b9c1c47");
				// checker.upDateproject(104, "894e8218-f56a-4c35-91e1-c6e40b046eb4");
				// checker.upDateproject(105, "aa2f54c0-03a5-4a20-8eeb-980d93ee641f");
				// checker.upDateproject(106, "4f9bfec4-eb42-42af-9c80-c945bf57d5d3");
				// checker.upDateproject(107, "3fc32272-4195-48b2-894d-4d2bc80f2c6e");
				// checker.upDateproject(108, "ee7ddeb5-b2f8-4d35-a0f7-3aae421ce50b");
				// checker.upDateproject(109, "661260d3-56b7-484b-a585-bccad360e674");
				// checker.upDateproject(110, "60bcaed2-668c-4e9c-ad6b-1d1116d6fb8b");
				// checker.upDateproject(111, "3128727f-a9bb-4bbf-b034-630f5322f07f");
				// checker.upDateproject(112, "97e0f04d-dc88-448b-900d-3332d8e76f7f");
				// checker.upDateproject(113, "32dfa580-5a47-4b27-b6e9-fc9bf656872z");
				// checker.upDateproject2(8, "32dfa580-5a47-4b27-b6e9-fc9bf656872z");
				// checker.upDateproject2(9, "32dfa580-5a47-4b27-b6e9-fc9bf656872z");
				// checker.upDateproject2(10, "32dfa580-5a47-4b27-b6e9-fc9bf656872z");
				// System.out.println("yesyesyes--------");
				String ztimestr = HttpUtil.httpGet(
						"http://10.22.2.25/REST/http-loadListProject.ac?apikey=5334163f-5afa-48fe-8114-5d31729e9068");
				JSONArray jsonArray = new JSONArray(ztimestr);
				List<Ztitem> list=checker.getAllZtitem();
				List<String> listID=new ArrayList<>();
				for(int j=0;j<list.size();j++) {
					listID.add(list.get(j).getPROJECTID());
				}
				BigDecimal id2=list.get(list.size()-1).getID();
				int id=id2.intValue();
				for (int i = 0; i < jsonArray.length(); i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					checker.updateSql(jsonObject.optString("id"), jsonObject.optString("name"),
							jsonObject.optString("address"));
					if(!listID.contains(jsonObject.optString("id"))) {
						id=id+1;
						String state="3";
						if("01".equals(jsonObject.optString("state"))) {
							state="1";
						}else if("02".equals(jsonObject.optString("state"))) {
							state="2";
						}
						String newstr="";
						if(jsonObject.optString("unitName").length()>10) {
							newstr=jsonObject.optString("unitName").substring(0,10);
						}else {
							newstr=jsonObject.optString("unitName");
						}
						checker.insertSql(id, jsonObject.optString("name"),state , jsonObject.optString("vicePmId"), jsonObject.optString("vicePmName"), jsonObject.optString("code"), jsonObject.optString("takeDate"), jsonObject.optString("address"), "1", "", "", "",newstr , "","", jsonObject.optString("cityName"), "", "", "", jsonObject.optString("id"));
					}
				}
			}
		}, 1000, 1000 * 60 * 60 * 23);

	}

	// 增加或减少天数
	public Date addDay(Date date, int num) {
		Calendar startDT = Calendar.getInstance();
		startDT.setTime(date);
		startDT.add(Calendar.DAY_OF_MONTH, num);
		return startDT.getTime();
	}
}
