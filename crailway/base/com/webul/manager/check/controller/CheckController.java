package com.webul.manager.check.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.webul.bean.Building;
import com.webul.bean.Company;
import com.webul.bean.Floor;
import com.webul.bean.MapData;
import com.webul.bean.Project;
import com.webul.bean.RoomBean;
import com.webul.bean.Stage;
import com.webul.bean.Units;
import com.webul.bean.User;
import com.webul.bean.Ztitem;
import com.webul.manager.check.service.CheckService;



@Controller
@RequestMapping("/manager/check")
public class CheckController {
@Resource
private CheckService checker;
@ResponseBody
@RequestMapping("/companys")
public Object checkCompanys(HttpServletRequest request,Model model,String name){
	List<Company> objs = this.checker.getAllCompany();//this.checker.getCompaniesLikeCompanyName(name);
	System.out.println(objs.size());
	return objs;
}
@ResponseBody
@RequestMapping("/ztitems")
public Object checkZtitems(HttpServletRequest request,Model model){
	List<Ztitem> objs = this.checker.getAllZtitem();
	return objs;
}
@ResponseBody
@RequestMapping("/getBuild")
public Object getBuild(HttpServletRequest request,Model model,String projectId){
	List<Building> objs = this.checker.getBuildingByProgectId(projectId);
	return objs;
}
@ResponseBody
@RequestMapping("/getZtitemsByProvince")
public Object getZtitemsByProvince(HttpServletRequest request,String provinceCode,String date){
	List<Ztitem> objs = this.checker.getZtitemsByProvinceCode(provinceCode,date);
	return objs;
}
@ResponseBody
@RequestMapping("/getZtitemsByCity")
public Object getZtitemsByCity(HttpServletRequest request,String cityCode,String date){
	List<Ztitem> objs = this.checker.getZtitemsByCityCode(cityCode,date);
	return objs;
}
@RequestMapping("/BuildPage")
public String BuildPage(HttpServletRequest request,Model model,String projectId){
	String hql = "from Project ";
	String hql2 = "from Stage ";
	List<Object> param = new ArrayList<Object>();
	List<Object> param2 = new ArrayList<Object>();
	if(projectId != null && projectId.length()>0){
		hql += "where projectId =?ORDER BY id";
		hql2 += "where projectId =?ORDER BY id";
		param.add(projectId);
		param2.add(projectId);
	}
	List<Project> projects= this.checker.getProjectsgByHql(hql,param.toArray());
	List<Stage> stages= this.checker.getStageByHql(hql2,param2.toArray());
	List<Building> build = this.checker.getBuildingByProgectId(projectId);
	List<String> lianjie = Arrays.asList(projects.get(0).getHxurl().split(","));
	model.addAttribute("projects", projects.size()>0?projects.get(0):null);
	model.addAttribute("stages", stages);
	model.addAttribute("build", build);
	model.addAttribute("projectId",projectId);
	model.addAttribute("lianjie",lianjie);
	model.addAttribute("defortlianjie",lianjie.get(0));
	return "WEB-INF/buildPage";
}
@ResponseBody
@RequestMapping("/getRoom")
public Object getRoom(HttpServletRequest request,Model model,String buildingID){
	Map<String,Object> map =new HashMap<String,Object>();
	List<RoomBean> objs = this.checker.getRoomByBuildingID(buildingID);
	List<Units> objs2 = this.checker.getUnitsByBuildingID(buildingID);
	List<Floor> objs3 = this.checker.getFloorByBuildingID(buildingID);
	map.put("RoomBean", objs);
	map.put("Units", objs2);
	map.put("Floor", objs3);
	return map;
}
@ResponseBody
@RequestMapping("/getMapdata")
public Object getMapdata(HttpServletRequest request,Model model){
	List<MapData> objs = this.checker.getMapdata();
	return objs;
}
@ResponseBody
@RequestMapping("/saveOrUpdateDydTbApp")
public Object saveOrUpdateDydTbApp(HttpServletRequest request,User dydtb,@RequestParam(value = "pic",required = false) MultipartFile[] pic){
	Map<String,Object> map = new HashMap<String,Object>();
	try {
		this.checker.saveOrUpdateDydTb(dydtb,pic);
		map.put("code", 200);
		map.put("msg", "保存成功");
	}catch(Exception e) {
		map.put("code", 403);
		map.put("msg", "保存失败，请重试");
		e.printStackTrace();
	}

	return map;
}
}
