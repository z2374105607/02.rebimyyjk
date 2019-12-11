package com.webul.manager.program.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webul.base.dao.IBaseDAO;
import com.webul.bean.Citys;
import com.webul.bean.Province;
@Service
public class ProgramService {
	@Resource(name="baseDAO")
    private IBaseDAO<Province> provivnceDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Citys> cityDao;
	
	public List<Province> findProvinceList(String date){
		List<Object> param = new ArrayList<Object>();
		String str = "";
		if(date != null && !date.equals("")){
			str = " and STARTTIME <= ?";
			param.add(date);
		}
		String sql = "select id \"id\" ,code \"code\",name \"name\",x \"x\",y \"y\",(select count(1) from ztitem t where t.provincecode=p.code "+str+") \"programNum\" from province p  ";
		
		return this.provivnceDao.executeSqlQueryT(Province.class, sql,param.toArray());
	}
	
	public List<Citys> findCityList(String date){
		List<Object> param = new ArrayList<Object>();
		String str = "";
		if(date != null && !date.equals("")){
			str = " and STARTTIME <= ?";
			param.add(date);
		}
		//String sql = "select id \"id\" ,code \"code\",name \"name\",x \"x\",y \"y\",provincename \"provinceName\",provincecode \"provinceCode\",(select count(1) from ztitem t where t.citycode=c.code "+str+") \"programNum\" from citys c where  ";
		String sql = 
				"select t.id \"id\", t.code \"code\",t.name \"name\",t.x \"x\",t.y \"y\",t.provincename \"provinceName\",t.provincecode \"provinceCode\",count(1) \"programNum\" from (select c.id, c.code,c.name,c.x,c.y,c.provincecode,c.provincename from citys c join ztitem z on c.code=z.citycode "+ str +") t group by t.id,t.code,t.name,t.x,t.y,t.provincename,t.provincecode";
		return this.cityDao.executeSqlQueryT(Citys.class, sql, param.toArray());
	}

}
