package com.webul.bean;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "UNITS")
public class Units {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private 	BigDecimal ID;
	private String UNITNAME;
	private String UNITGUID;
	private String ORDER;
	private String DOORNUM;
	private String BUINDINGID;
	
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}
	public String getUNITNAME() {
		return UNITNAME;
	}
	public void setUNITNAME(String uNITNAME) {
		UNITNAME = uNITNAME;
	}
	public String getUNITGUID() {
		return UNITGUID;
	}
	public void setUNITGUID(String uNITGUID) {
		UNITGUID = uNITGUID;
	}
	public String getORDER() {
		return ORDER;
	}
	public void setORDER(String oRDERX) {
		ORDER = oRDERX;
	}
	public String getDOORNUM() {
		return DOORNUM;
	}
	public void setDOORNUM(String dOORNUM) {
		DOORNUM = dOORNUM;
	}
	public String getBUINDINGID() {
		return BUINDINGID;
	}
	public void setBUINDINGID(String bUINDINGID) {
		BUINDINGID = bUINDINGID;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
