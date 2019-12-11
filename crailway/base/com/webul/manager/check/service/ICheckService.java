package com.webul.manager.check.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.webul.app.common.DateTools;
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

public interface ICheckService {
	/****获取所有公司所有信息******/
	public List<Company> getAllCompany();
	/****根据公司名称获取下子公司信息******/
	public List<Company> getCompaniesByCompanyName(String cName);
	/****根据公司名称模糊匹配公司信息******/
	public List<Company> getCompaniesLikeCompanyName(String cName);
	/****根据公司编码获取公司信息******/
	public List<Company> getCompaniesByComcode(String cCode);
	

	
	/****获取所有项目信息******/
	public List<Ztitem> getAllZtitem();
	/****根据项目编码获取项目信息******/
	public List<Ztitem> getZtitemsByenginerId(String enginerId);
	/****根据公司名称获取项信息******/
	public List<Ztitem> getZtitemsByFcompany(String fcompany);
	/****根据子公司名称获取项信息******/
	public List<Ztitem> getZtitemsByScompany(String scompany);
	/****根据项目名称模糊匹配项目信息******/
	public List<Ztitem> getZtitemsLikeName(String name);
	/****根据项目年份获取项目信息******/
	public List<Ztitem> getZtitemsByYear(String year);
	/****根据项目区域获取项目信息******/
	public List<Ztitem> getZtitemsBySSQX(String SSQX);
	
	
	/****根据项目id获取楼栋信息******/
	public List<Building> getBuildingByProgectId(String progectId);
	/****根据项目id获取楼栋信息******/
	public List<Building> getBuildingByHql(String hql,Object...objects);
	/****根据楼栋id获取房间信息******/
	public List<RoomBean> getRoomByBuildingID(String buildingID);
	/****根据楼栋id获取单元信息******/
	public List<Units> getUnitsByBuildingID(String buildingID);
	/****根据楼栋id获取单元信息******/
	public List<Floor> getFloorByBuildingID(String buildingID);
	/****根据高度获取地图数据******/
	public List<MapData> getMapdata();
	/****根据项目id获取项目信息******/
	public List<Project> getProjectsgByHql(String hql,Object...objects);
	/****根据项目id获取施工信息******/
	public List<Stage> getStageByHql(String hql,Object...objects);
	/**
	 * 根据省code和时间 获取项目列表
	 * @param provinceCode
	 * @param date 
	 * @return
	 */
	public List<Ztitem> getZtitemsByProvinceCode(String provinceCode,String date);
	/**
	 * 根据citycode和时间 获取项目列表
	 * @param cityCode
	 * @param date 
	 * @return
	 */
	public List<Ztitem> getZtitemsByCityCode(String cityCode,String date);
	public int updataroom_status(int id,String bid);
	

	public void saveOrUpdateDydTb(User dydtb,MultipartFile[] files)throws IllegalStateException, IOException;
	
	public int updateSql(String id,String name,String address);
	public int updateSql2(Company c);
	public int upDateprojecthxurl(int id, String hxurl);
	public int insertSql(int ID,String NAME,String STATE,String ENGINEERID,String ENGINEER,String ITEMCODE,String STARTTIME,String ITEMADDRESS,String PROGRESS
			,String REAREA,String RESTATE,String FCOMPANY,String SCOMPANY,String X,String Y,String SSQX,String PROVINCENAME,String PROVINCECODE,String CITYCODE,String PROJECTID);
	public int upDateproject(int id, String x,String y);
	public int upDateproject2(int id,String proid);
	public int updateSqlbuilding(int id,String projectid,String buindingid,String saleinfo,String BUINDINGNAME,String BUINDINGKSAREA,String BUINDINGZKSAREA,String STATE,String SALESTATE);
	public int updateSqlproject(int id,String projectname,String projectimage,String proid,String STAGEGROUNDAREA,String STAGENAME,String STAGEUNDERGROUNDAREA,String STAGESTATE,String STAGENODE
			,String STAGEZJZMJ,String HXURL,String KGMJAREA,String JGMJAREA,String SSQX,String SSSQ,String LPDZ,String XSZT,String XMTS,String KFS,String KPSJ,
			String RZSJ,String JGXQ,String SLDZ,String SLXKZ,String LPJS);
	public int insertSqlproject(int id,String projectname,String projectimage,String proid,String STAGEGROUNDAREA,String STAGENAME,String STAGEUNDERGROUNDAREA,String STAGESTATE,String STAGENODE
			,String STAGEZJZMJ,String HXURL,String KGMJAREA,String JGMJAREA,String SSQX,String SSSQ,String LPDZ,String XSZT,String XMTS,String KFS,String KPSJ,
			String RZSJ,String JGXQ,String SLDZ,String SLXKZ,String LPJS);
	public int insertStateSql(int ID, String PROJECTID, String PROCEDURENAME, String STAGENAME, String PLANSTARTDATE,
			String PLANENDDATE, String CUSSTARTDATE, String CUSENDDATE, String STATE) ;
}
