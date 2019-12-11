package com.webul.bean;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "DEMO")
public class User  implements Serializable{

	
	
	private static final long serialVersionUID = 1L;
	@Id
	private String ID;
	private String USERNAME;
	private java.math.BigDecimal X;
	private java.math.BigDecimal Y;
	private String PASSWORD;
	private String TEXT;
	private String IMGURL;
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getUSERNAME() {
		return USERNAME;
	}
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}
	public java.math.BigDecimal getX() {
		return X;
	}
	public void setX(java.math.BigDecimal x) {
		X = x;
	}
	public java.math.BigDecimal getY() {
		return Y;
	}
	public void setY(java.math.BigDecimal y) {
		Y = y;
	}
	public String getPASSWORD() {
		return PASSWORD;
	}
	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}
	public String getIMGURL() {
		return IMGURL;
	}
	public void setIMGURL(String iMGURL) {
		IMGURL = iMGURL;
	}
	public String getTEXT() {
		return TEXT;
	}
	public void setTEXT(String tEXT) {
		TEXT = tEXT;
	}
	



}
