package com.webul.manager.check.service;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.smapp.dbenginebase.OracleQueryHelper;
import com.webul.app.common.DateTools;
import com.webul.base.dao.IBaseDAO;
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

@Service
public class CheckService implements ICheckService {
	@Resource(name="baseDAO")
    private IBaseDAO<Company> companyDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Ztitem> ztitemDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Building> buildingDao;
	@Resource(name="baseDAO")
    private IBaseDAO<RoomBean> roomDao;
	@Resource(name="baseDAO")
    private IBaseDAO<MapData> mapdataDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Units> unitsDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Floor> floorDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Project> projectDao;
	@Resource(name="baseDAO")
    private IBaseDAO<Stage> stageDao;
	@Resource(name="baseDAO")
    private IBaseDAO<User> userDao;
	@Resource
	private OracleQueryHelper Qherper;
	@Override
	public List<com.webul.bean.Company> getAllCompany() {
		String sql = this.Qherper.getSql("db.company.checkAll.sql");
		return this.companyDao.executeSqlQueryT(com.webul.bean.Company.class,sql);
	}
	@Override
	public List<com.webul.bean.Company> getCompaniesByCompanyName(String cName) {

		String sql = this.Qherper.getSql("db.company.checkSubsidiaryByCompany.sql");
		return this.companyDao.executeSqlQueryT(com.webul.bean.Company.class,sql,cName);
	}
	@Override
	public List<com.webul.bean.Company> getCompaniesLikeCompanyName(String cName) {

		String sql = this.Qherper.getSql("db.company.checkSubsidiaryLikeCompany.sql");
		return this.companyDao.executeSqlQueryT(com.webul.bean.Company.class,sql,cName);
	}
	@Override
	public List<com.webul.bean.Company> getCompaniesByComcode(String cCode) {

		String sql = this.Qherper.getSql("db.company.checkByCode.sql");
		return this.companyDao.executeSqlQueryT(com.webul.bean.Company.class,sql,cCode);
	}
	@Override
	public List<Ztitem> getAllZtitem() {

		String sql = this.Qherper.getSql("db.ztitem.checkAll.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql);
	}
	@Override
	public List<Ztitem> getZtitemsByenginerId(String enginerId) {

		String sql = this.Qherper.getSql("db.ztitem.checkByCode.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,enginerId);
	}
	@Override
	public List<Ztitem> getZtitemsByFcompany(String fcompany) {

		String sql = this.Qherper.getSql("db.ztitem.checkByFcompany.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,fcompany);
	}
	@Override
	public List<Ztitem> getZtitemsByScompany(String scompany) {

		String sql = this.Qherper.getSql("db.ztitem.checkByScompany.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,scompany);
	}
	@Override
	public List<Ztitem> getZtitemsLikeName(String name) {

		String sql = this.Qherper.getSql("db.ztitem.checkLikeName.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,name);
	}
	@Override
	public List<Ztitem> getZtitemsByYear(String year) {


		String sql = this.Qherper.getSql("db.ztitem.checkByYear.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,year);
	}
	@Override
	public List<Ztitem> getZtitemsBySSQX(String SSQX) {

		String sql = this.Qherper.getSql("db.ztitem.checkBySSQX.sql");
		return this.ztitemDao.executeSqlQueryT(com.webul.bean.Ztitem.class,sql,SSQX);
	}
	@Override
	public List<Building> getBuildingByProgectId(String progectId) {
		String sql = this.Qherper.getSql("db.buinding.getBuildingByProgectId");
		return this.buildingDao.executeSqlQueryT(com.webul.bean.Building.class,sql,progectId);
	}
	@Override
	public List<RoomBean> getRoomByBuildingID(String buildingID) {
		String sql = this.Qherper.getSql("db.room.getRoomByBuildingId");
		return this.roomDao.executeSqlQueryT(com.webul.bean.RoomBean.class,sql,buildingID);
	}
	@Override
	public List<Units> getUnitsByBuildingID(String buildingID) {
		String sql = this.Qherper.getSql("db.mapdata.getUnitsByBuildingId");
		return this.unitsDao.executeSqlQueryT(Units.class,sql,buildingID);
	}
	@Override
	public List<Floor> getFloorByBuildingID(String buildingID) {
		String sql = this.Qherper.getSql("db.mapdata.getFloorByBuildingId");
		return this.floorDao.executeSqlQueryT(Floor.class,sql,buildingID);
	}
	@Override
	public List<Building> getBuildingByHql(String hql, Object... objects) {
		return null;
	}
	@Override
	public List<Project> getProjectsgByHql(String hql, Object... objects) {
		return this.projectDao.findByHql(hql, objects);
	}
	@Override
	public List<Stage> getStageByHql(String hql, Object... objects) {
		return this.stageDao.findByHql(hql, objects);
	}

	@Override
	public List<Ztitem> getZtitemsByProvinceCode(String provinceCode,String date) {
		String sql = this.Qherper.getSql("db.ztitem.province.sql");
		return this.ztitemDao.executeSqlQueryT(Ztitem.class,sql,provinceCode,date);
	}

	@Override
	public List<MapData> getMapdata() {
		String sql = this.Qherper.getSql("db.mapdata.getMapdataByFloor");
		return this.mapdataDao.executeSqlQueryT(com.webul.bean.MapData.class,sql);
	}
	@Override
	public List<Ztitem> getZtitemsByCityCode(String cityCode, String date) {
		String sql = this.Qherper.getSql("db.ztitem.city.sql");
		return this.ztitemDao.executeSqlQueryT(Ztitem.class,sql,cityCode,date);
	}
	public List<User> findID(String id) {
		String sql = this.Qherper.getSql("db.user.sql");
		return this.userDao.executeSqlQueryT(User.class,sql,id);
	}
	@Override
	public void saveOrUpdateDydTb(User dydtb, MultipartFile[] files) throws IllegalStateException, IOException {
		if(files != null){
			String fold="";
			 String imagename="";
			for(MultipartFile file : files){
			    fold = DateTools.getSystemDateYYYYMMDD();
	 		    imagename = "dyd_"+UUID.randomUUID().toString().replace("-", "")+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	 		   //path=tomcatPat+"/assets/app/images/"+fileName;
	 		   String path = "/Library/Tomcat/webapps/images/imageapp"+"/appimages/"+fold;
	 		   File fi = new File(path+"/"+imagename);
	 		   File f = new File(path);
	 		   if(!f.exists()){
	 			   f.mkdirs();
	 		   }
	 		   if(!fi.exists()){
	 			   fi.createNewFile();
	 		   }
				file.transferTo(fi);
				
			}
			dydtb.setIMGURL("/images/imageapp/appimages/"+fold+"/"+imagename);
		}
		if((findID(dydtb.getID())).size()>0) {
			this.userDao.saveOrUpdate(dydtb);
		}else {
			this.userDao.save(dydtb);;
		}
	}
	@Override
	public int updateSql(String id,String name,String address) {
		this.ztitemDao.executeSqlQuery2("UPDATE ZTITEM set NAME='"+name+"',ITEMADDRESS='"+address+"' where PROJECTID='"+id+"'");
		return 1;
	}
	@Override
	public int insertSql(int ID,String NAME,String STATE,String ENGINEERID,String ENGINEER,String ITEMCODE,String STARTTIME,String ITEMADDRESS,String PROGRESS
			,String REAREA,String RESTATE,String FCOMPANY,String SCOMPANY,String X,String Y,String SSQX,String PROVINCENAME,String PROVINCECODE,String CITYCODE,String PROJECTID) {
		this.ztitemDao.executeSqlQuery2("insert into ZTITEM values("+ID+",'"+NAME+"','"+STATE+"','"+ENGINEERID+"','"+ENGINEER+"','"+ITEMCODE+"','"+STARTTIME+"','"+ITEMADDRESS+"','"+PROGRESS+"','"+REAREA
				+"','"+RESTATE+"','"+FCOMPANY+"','"+SCOMPANY+"','"+X+"','"+Y+"','"+SSQX+"','"+PROVINCENAME+"','"+PROVINCECODE+"','"+CITYCODE+"','"+PROJECTID+"')");
		return 1;
	}
	@Override
	public int updateSql2(Company c) {
		this.companyDao.executeSqlQuery2("insert into COMPANY values("+c.getID()+",'"+c.getFCOMPANY()+"','"+c.getSCOMPANY()+"','"+c.getFCOMCODE()+"','"+c.getSCOMCODE()+"','"+c.getPARENTID()+"','"+c.getYEAR()+"','"+c.getNUM()+"')");
		return 1;
	}
	public void delete1() {
		this.ztitemDao.executeSqlQuery2("delete from COMPANY where 1=1");
	}
	public void delete2() {
		this.ztitemDao.executeSqlQuery2("delete from ZTITEM where 1=1");
	}
	@Override
	public int upDateproject(int id, String x,String y) {
		this.ztitemDao.executeSqlQuery2("UPDATE ZTITEM SET X = '"+x+"' WHERE ID = "+id);
		this.ztitemDao.executeSqlQuery2("UPDATE ZTITEM SET Y = '"+y+"' WHERE ID = "+id);
		return 1;
	}
	@Override
	public int upDateproject2(int id, String proid) {
		this.buildingDao.executeSqlQuery2("UPDATE STAGE SET PROJECTID = '"+proid+"' WHERE PROJECTID = '32dfa580-5a47-4b27-b6e9-fc9bf656872f'");
		
		return 1;
	}
	@Override
	public int upDateprojecthxurl(int id, String hxurl) {
		this.buildingDao.executeSqlQuery2("UPDATE PROJECT SET HXURL = '"+hxurl+"' WHERE ID = "+id);
		
		return 1;
	}
	@Override
	public int updateSqlbuilding(int id, String projectid, String buindingid, String saleinfo, String BUINDINGNAME,
			String BUINDINGKSAREA, String BUINDINGZKSAREA, String STATE, String SALESTATE) {
		this.buildingDao.executeSqlQuery2("insert into BUINDING values("+id+",'"+projectid+"','"+buindingid+"','"+saleinfo+"','"+BUINDINGNAME+"','"+BUINDINGKSAREA+"','"+BUINDINGZKSAREA+"','"+STATE+"','"+SALESTATE+"')");
		return 0;
	}
	@Override
	public int insertSqlproject(int id, String projectname, String projectimage, String proid, String STAGEGROUNDAREA,
			String STAGENAME, String STAGEUNDERGROUNDAREA, String STAGESTATE, String STAGENODE, String STAGEZJZMJ,
			String HXURL, String KGMJAREA, String JGMJAREA, String SSQX, String SSSQ, String LPDZ, String XSZT,
			String XMTS, String KFS, String KPSJ, String RZSJ, String JGXQ, String SLDZ, String SLXKZ, String LPJS) {
		this.projectDao.executeSqlQuery2("insert into PROJECT values("+id+",'"+projectname+"','"+projectimage+"','"+proid+"','"+STAGEGROUNDAREA+"','"+STAGENAME+"','"+STAGEUNDERGROUNDAREA+"','"+STAGESTATE+"','"+
				STAGENODE+"','"+STAGEZJZMJ+"','"+HXURL+"','"+KGMJAREA+"','"+JGMJAREA+"','"+SSQX+"','"+SSSQ+"','"+LPDZ+"','"+XSZT+"','"+XMTS+"','"+KFS+"','"
				+KPSJ+"','"+RZSJ+"','"+JGXQ+"','"+SLDZ+"','"+SLXKZ+"','"+LPJS+"')");
		return 0;
	}
	@Override
	public int updateSqlproject(int id, String projectname, String projectimage, String proid, String STAGEGROUNDAREA,
			String STAGENAME, String STAGEUNDERGROUNDAREA, String STAGESTATE, String STAGENODE, String STAGEZJZMJ,
			String HXURL, String KGMJAREA, String JGMJAREA, String SSQX, String SSSQ, String LPDZ, String XSZT,
			String XMTS, String KFS, String KPSJ, String RZSJ, String JGXQ, String SLDZ, String SLXKZ, String LPJS) {
		this.projectDao.executeSqlQuery2("delete from PROJECT where id=4");
		this.projectDao.executeSqlQuery2("insert into PROJECT values("+id+",'"+projectname+"','"+projectimage+"','"+proid+"','"+STAGEGROUNDAREA+"','"+STAGENAME+"','"+STAGEUNDERGROUNDAREA+"','"+STAGESTATE+"','"+
				STAGENODE+"','"+STAGEZJZMJ+"','"+HXURL+"','"+KGMJAREA+"','"+JGMJAREA+"','"+SSQX+"','"+SSSQ+"','"+LPDZ+"','"+XSZT+"','"+XMTS+"','"+KFS+"','"
				+KPSJ+"','"+RZSJ+"','"+JGXQ+"','"+SLDZ+"','"+SLXKZ+"','"+LPJS+"')");
		return 0;
	}
	@Override
	public int insertStateSql(int ID, String PROJECTID, String PROCEDURENAME, String STAGENAME, String PLANSTARTDATE,
			String PLANENDDATE, String CUSSTARTDATE, String CUSENDDATE, String STATE) {
		//this.projectDao.executeSqlQuery2("delete from STAGE where id=65");
		this.projectDao.executeSqlQuery2("insert into STAGE values("+ID+",'"+PROJECTID+"','"+PROCEDURENAME+"','"+STAGENAME+"','"+PLANSTARTDATE+"','"+PLANENDDATE+"','"+CUSSTARTDATE+"','"+CUSENDDATE+"','"+STATE+"')");
		return 0;
	}
	@Override
	public int updataroom_status(int id,String bid) {
		this.roomDao.executeSqlQuery2("update ROOM set STATUS= (select trunc(dbms_random.value(1,5)) from dual) WHERE ROOM.ID="+id+"and BUINDINGID="+"'"+bid+"'");
		return 0;
	}
	
}
