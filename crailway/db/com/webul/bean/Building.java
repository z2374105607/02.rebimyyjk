package com.webul.bean;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BUINDING")
public class Building {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	private String PROJECTID;
	private String BUINDINGID;
	private String SALEINFO;
	private String BUINDINGNAME;
	private String BUINDINGKSAREA;
	private String BUINDINGZKSAREA;
	private BigDecimal STATE;
	private BigDecimal SALESTATE;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}
	public String getPROJECTID() {
		return PROJECTID;
	}
	public void setPROJECTID(String pROJECTID) {
		PROJECTID = pROJECTID;
	}
	public String getBUINDINGID() {
		return BUINDINGID;
	}
	public void setBUINDINGID(String bUINDINGID) {
		BUINDINGID = bUINDINGID;
	}
	public String getSALEINFO() {
		return SALEINFO;
	}
	public void setSALEINFO(String sALEINFO) {
		SALEINFO = sALEINFO;
	}
	public String getBUINDINGNAME() {
		return BUINDINGNAME;
	}
	public void setBUINDINGNAME(String bUINDINGNAME) {
		BUINDINGNAME = bUINDINGNAME;
	}
	public String getBUINDINGKSAREA() {
		return BUINDINGKSAREA;
	}
	public void setBUINDINGKSAREA(String bUINDINGKSAREA) {
		BUINDINGKSAREA = bUINDINGKSAREA;
	}
	public String getBUINDINGZKSAREA() {
		return BUINDINGZKSAREA;
	}
	public void setBUINDINGZKSAREA(String bUINDINGZKSAREA) {
		BUINDINGZKSAREA = bUINDINGZKSAREA;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public BigDecimal getSTATE() {
		return STATE;
	}
	public void setSTATE(BigDecimal sTATE) {
		STATE = sTATE;
	}
	public BigDecimal getSALESTATE() {
		return SALESTATE;
	}
	public void setSALESTATE(BigDecimal sALESTATE) {
		SALESTATE = sALESTATE;
	}
	
	
}
