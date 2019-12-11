package com.webul.base.vo;

public class MessageVo {
	//操作是否成功 
	private boolean success;
	//提示消息
	private String msg;
	//如果操作以后需要跳转url则设置此值
	private String url;
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
