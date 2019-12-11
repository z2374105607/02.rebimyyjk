package com.webul.bean;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FLOOR")
public class Floor {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private BigDecimal ID;
	private String BUINDINGID;
	private String FLOORGUID;
	private String FLOORNAME;
	public BigDecimal getID() {
		return ID;
	}
	public void setID(BigDecimal iD) {
		ID = iD;
	}

	public String getFLOORGUID() {
		return FLOORGUID;
	}
	public void setFLOORGUID(String fLOORGUID) {
		FLOORGUID = fLOORGUID;
	}
	public String getFLOORNAME() {
		return FLOORNAME;
	}
	public void setFLOORNAME(String fLOORNAME) {
		FLOORNAME = fLOORNAME;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getBUINDINGID() {
		return BUINDINGID;
	}
	public void setBUINDINGID(String bUINDINGID) {
		BUINDINGID = bUINDINGID;
	}

}
