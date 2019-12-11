package com.webul.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PROJECT")
public class Project {
	@Id
	@Column(name = "id")
	private Long id;
	@Column(name = "projectName")
	private String projectName;
	
	@Column(name = "projectImage")
	private String projectImage;
	@Column(name = "projectId")
	private String projectId;
	@Column(name = "stageGroundArea")
	private String stageGroundArea;
	@Column(name = "stageName")
	private String stageName;
	@Column(name = "stageUndergroundArea")
	private String stageUndergroundArea;
	@Column(name = "stageState")
	private String stageState;
	@Column(name = "stageNode")
	private String stageNode;
	@Column(name = "stageZjzmj")
	private String stageZjzmj;
	@Column(name = "hxurl")
	private String hxurl;
	@Column(name = "kgmjArea")
	private String kgmjArea;
	@Column(name = "jgmjArea")
	private String jgmjArea;
	
	@Column(name = "ssqx")
	private String ssqx;
	@Column(name = "sssq")
	private String sssq;
	@Column(name = "lpdz")
	private String lpdz;
	@Column(name = "xszt")
	private String xszt;
	@Column(name = "xmts")
	private String xmts;
	@Column(name = "kfs")
	private String kfs;
	@Column(name = "kpsj")
	private String kpsj;
	@Column(name = "rzsj")
	private String rzsj;
	@Column(name = "jgxq")
	private String jgxq;
	@Column(name = "sldz")
	private String sldz;
	@Column(name = "slxkz")
	private String slxkz;
	@Column(name = "lpjs")
	private String lpjs;
	public String getLpjs() {
		return lpjs;
	}
	public void setLpjs(String lpjs) {
		this.lpjs = lpjs;
	}
	public String getSsqx() {
		return ssqx;
	}
	public void setSsqx(String ssqx) {
		this.ssqx = ssqx;
	}
	public String getSssq() {
		return sssq;
	}
	public void setSssq(String sssq) {
		this.sssq = sssq;
	}
	public String getLpdz() {
		return lpdz;
	}
	public void setLpdz(String lpdz) {
		this.lpdz = lpdz;
	}
	public String getXszt() {
		return xszt;
	}
	public void setXszt(String xszt) {
		this.xszt = xszt;
	}
	public String getXmts() {
		return xmts;
	}
	public void setXmts(String xmts) {
		this.xmts = xmts;
	}
	public String getKfs() {
		return kfs;
	}
	public void setKfs(String kfs) {
		this.kfs = kfs;
	}
	public String getKpsj() {
		return kpsj;
	}
	public void setKpsj(String kpsj) {
		this.kpsj = kpsj;
	}
	public String getRzsj() {
		return rzsj;
	}
	public void setRzsj(String rzsj) {
		this.rzsj = rzsj;
	}
	public String getJgxq() {
		return jgxq;
	}
	public void setJgxq(String jgxq) {
		this.jgxq = jgxq;
	}
	public String getSldz() {
		return sldz;
	}
	public void setSldz(String sldz) {
		this.sldz = sldz;
	}
	public String getSlxkz() {
		return slxkz;
	}
	public void setSlxkz(String slxkz) {
		this.slxkz = slxkz;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectImage() {
		return projectImage;
	}
	public void setProjectImage(String projectImage) {
		this.projectImage = projectImage;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getStageGroundArea() {
		return stageGroundArea;
	}
	public void setStageGroundArea(String stageGroundArea) {
		this.stageGroundArea = stageGroundArea;
	}
	public String getStageName() {
		return stageName;
	}
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}
	public String getStageUndergroundArea() {
		return stageUndergroundArea;
	}
	public void setStageUndergroundArea(String stageUndergroundArea) {
		this.stageUndergroundArea = stageUndergroundArea;
	}
	public String getStageState() {
		return stageState;
	}
	public void setStageState(String stageState) {
		this.stageState = stageState;
	}
	public String getStageNode() {
		return stageNode;
	}
	public void setStageNode(String stageNode) {
		this.stageNode = stageNode;
	}
	public String getStageZjzmj() {
		return stageZjzmj;
	}
	public void setStageZjzmj(String stageZjzmj) {
		this.stageZjzmj = stageZjzmj;
	}
	public String getHxurl() {
		return hxurl;
	}
	public void setHxurl(String hxurl) {
		this.hxurl = hxurl;
	}
	public String getKgmjArea() {
		return kgmjArea;
	}
	public void setKgmjArea(String kgmjArea) {
		this.kgmjArea = kgmjArea;
	}
	public String getJgmjArea() {
		return jgmjArea;
	}
	public void setJgmjArea(String jgmjArea) {
		this.jgmjArea = jgmjArea;
	}
	
	
}
