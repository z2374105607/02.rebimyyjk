package com.webul.web;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthenToken implements Serializable{
	private static final long serialVersionUID = 1L; 
	 
    /** Session缓存key */
    public static final String BEAN_ID="com.webul.web.AuthenToken"; ;

	private String userName;
	private HttpServletRequest httpRequest; 
	private HttpServletResponse httpResponse ; 
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public HttpServletRequest getHttpRequest() {
		return httpRequest;
	}
	public void setHttpRequest(HttpServletRequest httpRequest) {
		this.httpRequest = httpRequest;
	}
	public HttpServletResponse getHttpResponse() {
		return httpResponse;
	}
	public void setHttpResponse(HttpServletResponse httpResponse) {
		this.httpResponse = httpResponse;
	}
}
