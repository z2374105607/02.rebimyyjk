package com.webul.bean;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ROOM")
public class RoomBean {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}
	public String getBUINDINGID() {
		return BUINDINGID;
	}
	public void setBUINDINGID(String bUINDINGID) {
		BUINDINGID = bUINDINGID;
	}
	public String getROOMGUID() {
		return ROOMGUID;
	}
	public void setROOMGUID(String rOOMGUID) {
		ROOMGUID = rOOMGUID;
	}
	public String getROOMSTRU() {
		return ROOMSTRU;
	}
	public void setROOMSTRU(String rOOMSTRU) {
		ROOMSTRU = rOOMSTRU;
	}
	public String getHXNAME() {
		return HXNAME;
	}
	public void setHXNAME(String hXNAME) {
		HXNAME = hXNAME;
	}
	public String getPRICE() {
		return PRICE;
	}
	public void setPRICE(String pRICE) {
		PRICE = pRICE;
	}
	public String getTNAREA() {
		return TNAREA;
	}
	public void setTNAREA(String tNAREA) {
		TNAREA = tNAREA;
	}
	public String getSALESTATUS() {
		return SALESTATUS;
	}
	public void setSALESTATUS(String sALESTATUS) {
		SALESTATUS = sALESTATUS;
	}
	public String getBLDAREA() {
		return BLDAREA;
	}
	public void setBLDAREA(String bLDAREA) {
		BLDAREA = bLDAREA;
	}
	public String getROOMCOE() {
		return ROOMCOE;
	}
	public void setROOMCOE(String rOOMCOE) {
		ROOMCOE = rOOMCOE;
	}
	public String getUNITGUID() {
		return UNITGUID;
	}
	public void setUNITGUID(String uNITGUID) {
		UNITGUID = uNITGUID;
	}
	public String getSTATUS() {
		return STATUS;
	}
	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}
	public String getROOMNO() {
		return ROOMNO;
	}
	public void setROOMNO(String rOOMNO) {
		ROOMNO = rOOMNO;
	}
	public String getFLOORGUID() {
		return FLOORGUID;
	}
	public void setFLOORGUID(String fLOORGUID) {
		FLOORGUID = fLOORGUID;
	}
	public String getROOMNAME() {
		return ROOMNAME;
	}
	public void setROOMNAME(String rOOMNAME) {
		ROOMNAME = rOOMNAME;
	}
	public String getBPRODUCTTYPECODE() {
		return BPRODUCTTYPECODE;
	}
	public void setBPRODUCTTYPECODE(String bPRODUCTTYPECODE) {
		BPRODUCTTYPECODE = bPRODUCTTYPECODE;
	}
	public String getSALETYPE() {
		return SALETYPE;
	}
	public void setSALETYPE(String sALETYPE) {
		SALETYPE = sALETYPE;
	}
	public String getTNPRICE() {
		return TNPRICE;
	}
	public void setTNPRICE(String tNPRICE) {
		TNPRICE = tNPRICE;
	}
	public String getFLOORNAME() {
		return FLOORNAME;
	}
	public void setFLOORNAME(String fLOORNAME) {
		FLOORNAME = fLOORNAME;
	}
	public String getXSZT_RENGOU() {
		return XSZT_RENGOU;
	}
	public void setXSZT_RENGOU(String xSZT_RENGOU) {
		XSZT_RENGOU = xSZT_RENGOU;
	}
	public String getXSZT_QIANYUE() {
		return XSZT_QIANYUE;
	}
	public void setXSZT_QIANYUE(String xSZT_QIANYUE) {
		XSZT_QIANYUE = xSZT_QIANYUE;
	}
	public String getXSZT_DAISHOU() {
		return XSZT_DAISHOU;
	}
	public void setXSZT_DAISHOU(String xSZT_DAISHOU) {
		XSZT_DAISHOU = xSZT_DAISHOU;
	}
	public String getXSMJ_TOTAL() {
		return XSMJ_TOTAL;
	}
	public void setXSMJ_TOTAL(String xSMJ_TOTAL) {
		XSMJ_TOTAL = xSMJ_TOTAL;
	}
	public String getFYMJ_TOTAL() {
		return FYMJ_TOTAL;
	}
	public void setFYMJ_TOTAL(String fYMJ_TOTAL) {
		FYMJ_TOTAL = fYMJ_TOTAL;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private String BUINDINGID;
	private String ROOMGUID;
	private String ROOMSTRU;
	private String HXNAME;
	private String PRICE;
	private String TNAREA;
	private String SALESTATUS;
	private String BLDAREA;
	private String ROOMCOE;
	private String UNITGUID;
	private String STATUS;
	private String ROOMNO;
	private String FLOORGUID;
	private String ROOMNAME;
	private String BPRODUCTTYPECODE;
	private String SALETYPE;
	private String TNPRICE;	
	private String FLOORNAME;
	private String XSZT_RENGOU;
	private String XSZT_QIANYUE;
	private String XSZT_DAISHOU;
	private String XSMJ_TOTAL;
	private String FYMJ_TOTAL;
	
}
