package com.webul.bean;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "COMPANY")
public class Company implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	private String FCOMPANY;
	private String SCOMPANY;
	private String FCOMCODE;
	private String SCOMCODE;
	private String PARENTID;
	private String YEAR;
	private String NUM;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
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
	public String getFCOMCODE() {
		return FCOMCODE;
	}
	public void setFCOMCODE(String fCOMCODE) {
		FCOMCODE = fCOMCODE;
	}
	public String getSCOMCODE() {
		return SCOMCODE;
	}
	public void setSCOMCODE(String sCOMCODE) {
		SCOMCODE = sCOMCODE;
	}
	public String getPARENTID() {
		return PARENTID;
	}
	public void setPARENTID(String pARENTID) {
		PARENTID = pARENTID;
	}
	public String getYEAR() {
		return YEAR;
	}
	public void setYEAR(String yEAR) {
		YEAR = yEAR;
	}
	public String getNUM() {
		return NUM;
	}
	public void setNUM(String nUM) {
		NUM = nUM;
	}

	
}
