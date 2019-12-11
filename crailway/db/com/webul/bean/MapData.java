package com.webul.bean;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MAPDATA")
public class MapData {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	private String SMID;
	private String FLOOR;
	private String BUINDINGID;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}
	public String getSMID() {
		return SMID;
	}
	public void setSMID(String sMID) {
		SMID = sMID;
	}
	public String getFLOOR() {
		return FLOOR;
	}
	public void setFLOOR(String fLOOR) {
		FLOOR = fLOOR;
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
