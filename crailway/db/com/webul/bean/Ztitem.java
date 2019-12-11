package com.webul.bean;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ZTITEM")
public class Ztitem {
	/**
	 * 
	 */
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	private String NAME;
	private String STATE;
	private String RESTATE;
	private String ENGINEERID;
	private String ENGINEER;
	private String ITEMCODE;
	private String STARTTIME;
	private String ITEMADDRESS;
	private String PROGRESS;
	private String REAREA;
	private String FCOMPANY;
	private String SCOMPANY;
	private String X;
	private String Y;
	private String SSQX;
	private String PROVINCENAME;
	private String PROVINCECODE;
	private String CITYCODE;
	private String PROJECTID;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}
	public String getNAME() {
		return NAME;
	}
	public void setNAME(String nAME) {
		NAME = nAME;
	}
	public String getSTATE() {
		return STATE;
	}
	public void setSTATE(String sTATE) {
		STATE = sTATE;
	}
	public String getENGINEERID() {
		return ENGINEERID;
	}
	public void setENGINEERID(String eNGINEERID) {
		ENGINEERID = eNGINEERID;
	}
	public String getENGINEER() {
		return ENGINEER;
	}
	public void setENGINEER(String eNGINEER) {
		ENGINEER = eNGINEER;
	}

	public String getITEMCODE() {
		return ITEMCODE;
	}
	public void setITEMCODE(String iTEMCODE) {
		ITEMCODE = iTEMCODE;
	}
	public String getSTARTTIME() {
		return STARTTIME;
	}
	public void setSTARTTIME(String sTARTTIME) {
		STARTTIME = sTARTTIME;
	}
	public String getITEMADDRESS() {
		return ITEMADDRESS;
	}
	public void setITEMADDRESS(String iTEMADDRESS) {
		ITEMADDRESS = iTEMADDRESS;
	}
	public String getPROGRESS() {
		return PROGRESS;
	}
	public void setPROGRESS(String pROGRESS) {
		PROGRESS = pROGRESS;
	}
	public String getREAREA() {
		return REAREA;
	}
	public void setREAREA(String rEAREA) {
		REAREA = rEAREA;
	}
	public String getFCOMPANY() {
		return FCOMPANY;
	}
	public void setFCOMPANY(String fCOMPANY) {
		FCOMPANY = fCOMPANY;
	}
	public String getSCOMPANY() {
		return SCOMPANY;
	}
	public void setSCOMPANY(String sCOMPANY) {
		SCOMPANY = sCOMPANY;
	}
	public String getX() {
		return X;
	}
	public void setX(String x) {
		X = x;
	}
	public String getY() {
		return Y;
	}
	public void setY(String y) {
		Y = y;
	}
	public String getRESTATE() {
		return RESTATE;
	}
	public void setRESTATE(String rESTATE) {
		RESTATE = rESTATE;
	}
	public String getSSQX() {
		return SSQX;
	}
	public void setSSQX(String sSQX) {
		SSQX = sSQX;
	}
	public String getPROVINCENAME() {
		return PROVINCENAME;
	}
	public void setPROVINCENAME(String pROVINCENAME) {
		PROVINCENAME = pROVINCENAME;
	}
	public String getPROVINCECODE() {
		return PROVINCECODE;
	}
	public void setPROVINCECODE(String pROVINCECODE) {
		PROVINCECODE = pROVINCECODE;
	}
	public String getCITYCODE() {
		return CITYCODE;
	}
	public void setCITYCODE(String cITYCODE) {
		CITYCODE = cITYCODE;
	}
	public String getPROJECTID() {
		return PROJECTID;
	}
	public void setPROJECTID(String pROJECTID) {
		PROJECTID = pROJECTID;
	}
}
