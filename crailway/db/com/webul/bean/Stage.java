package com.webul.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "STAGE")
public class Stage {
	@Id
	@Column(name = "id")
	private Long id;
	@Column(name = "projectId")
	private String projectId;
	@Column(name = "procedureName")
	private String procedureName;
	@Column(name = "stageName")
	private String stageName;
	
	@Column(name = "planStartDate")
	private String planStartDate;
	@Column(name = "planEndDate")
	private String planEndDate;
	@Column(name = "cusStartDate")
	private String cusStartDate;
	@Column(name = "cusEndDate")
	private String cusEndDate;
	@Column(name = "state")
	private String state;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getProcedureName() {
		return procedureName;
	}
	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	public String getStageName() {
		return stageName;
	}
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}
	public String getPlanStartDate() {
		return planStartDate;
	}
	public void setPlanStartDate(String planStartDate) {
		this.planStartDate = planStartDate;
	}
	public String getPlanEndDate() {
		return planEndDate;
	}
	public void setPlanEndDate(String planEndDate) {
		this.planEndDate = planEndDate;
	}
	public String getCusStartDate() {
		return cusStartDate;
	}
	public void setCusStartDate(String cusStartDate) {
		this.cusStartDate = cusStartDate;
	}
	public String getCusEndDate() {
		return cusEndDate;
	}
	public void setCusEndDate(String cusEndDate) {
		this.cusEndDate = cusEndDate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
}
