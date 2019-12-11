package com.webul.manager.program.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webul.bean.Citys;
import com.webul.bean.Province;
import com.webul.manager.program.service.ProgramService;

@Controller
@RequestMapping(value="/program")
public class ProgramController {
	@Resource
	private ProgramService programService;
	@ResponseBody
	@RequestMapping("/findProvinceList")
	public Object findProvinceList(String date){
		Map<String,Object> map = new HashMap<String,Object>();
		List<Province> pros =  this.programService.findProvinceList(date);
		map.put("data", pros);
		return map;
	}
	@ResponseBody
	@RequestMapping("/findCitysList")
	public Object findCityList(String date){
		Map<String,Object> map = new HashMap<String,Object>();
		List<Citys> pros =  this.programService.findCityList(date);
		map.put("data", pros);
		return map;
	}
	
}
