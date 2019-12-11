package com.webul.util.string;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

public class StringUtils {
	
	public static final String ACCOUNT_SIGN="dts#+ps+d5a+PS_DF";
	public static final String PASSWORD_SIGN="#+ps+d5a";
	public static void main(String[] args) {
		for (int i = 0; i < 2000; i++) {
			String vcode=StringUtils.getRandomString(12);
			System.out.println(vcode);
		}
		
	}
	private static String[] random = { "A", "B", "B", "C", "D", "E", "F", "G", "H",
			"I", "J", "K", "L", "M", "N", "B", "P", "Q", "R", "B", "T", "U",
			"V", "W", "X", "Y", "Z", "1", "3", "5", "7", "9", "2", "4", "6",
			"8" };
	private static String[] random1 = { "A", "B", "B", "C", "D", "E", "F", "G", "H",
		"I", "J", "K", "L", "M", "N", "B", "P", "Q", "R", "B", "T", "U",
		"V", "W", "X", "Y", "Z"};
	private static String[] random2 = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"};
	/**
	 * 返回随机字符串
	 * @param count 返回随机字符串的位数
	 * @return
	 */
	public static String getRandomString(int count){
		String str="";
		Random rd=new Random();
		for (int i = 0; i < count; i++) {
			str+=random[rd.nextInt(random.length)];
		}
		return str;
	}
	/**
	 * 返回随机字符串
	 * @param count 返回随机字符串的位数
	 * @return
	 */
	public static String getRandomStringNoNum(int count){
		String str="";
		Random rd=new Random();
		for (int i = 0; i < count; i++) {
			str+=random1[rd.nextInt(random1.length)];
		}
		return str;
	}
	/**
	 * 返回随机字符串
	 * @param count 返回随机字符串的位数
	 * @return
	 */
	public static String getRandomStringNoStr(int count){
		String str="";
		Random rd=new Random();
		for (int i = 0; i < count; i++) {
			str+=random2[rd.nextInt(random2.length)];
		}
		return str;
	}
	/**
	 * 把对象转换成string 
	 * @param obj 要转换成string的对象
	 * @return 如果对象为空 则返回空字符串 "" 否则调用此对象的toString方法
	 */
	public static String toString(Object obj){
		if(obj==null){
			return "";
		}else{
			return obj.toString();
		}
	}
	public static Integer parseInt(String str){
		Integer a=0;
		try {
			if(str!=null){
				a=Integer.parseInt(str);
			}
		} catch (Exception e) {
		}
		return a;
	}
	public static double parseDouble(String str){
		double a=0l;
		try {
			if(str!=null){
				a=Double.parseDouble(str);
			}
		} catch (Exception e) {
		}
		return a;
	}
	/**
	 * 给String去除左右去空格 
	 * @param 
	 * @return 如果对象为空 则返回空字符串 "" 否则调用string.trim()方法
	 */
	public static String trim(String str){
		if(str!=null){
			str=str.trim();
		}else{
			str="";
		}
		return str;
	}
	/**
	 * 获取当前年月的字符串 如201409
	 * @return
	 */
	public static String getYearMonthStr(){
		String format="yyyyMM";
		Date date=new Date();
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	/**
	 * 获取文件名称
	 * @return
	 */
	public static String getFileName(){
		return new Date().getTime()+StringUtils.getRandomString(5).toLowerCase();
	}
	public static String getRemoteHost(HttpServletRequest request){
	    String ip = request.getHeader("x-forwarded-for");
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getRemoteAddr();
	    }
	    return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
	}
}
