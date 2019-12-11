package com.webul.util.time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TFun {
	private static String defaultFormater="yyyy-MM-dd HH:mm:ss";
	
	/**
	 * @desc 获取时间差 单位毫秒 如果传入空会出现异常
	 * @param before 
	 * @param after 
	 * @throws Exception 
	 */
	public static long getTimeIntervalMS(Date before,Date after) throws Exception{
		if(before==null){
			throw new Exception();
		}
		if(after==null){
			throw new Exception();
		}
		return after.getTime()-before.getTime();
	}
	
	public static String getNowTimeStr(){
		return TFun.getFormatTime(new Date());
	}
	
	
	/**
	 * 把date转化成yyyy-MM-dd HH:mm:ss形式的字符串
	 * @param date
	 * @return
	 */
	public static String getFormatTime(Date date){
		if(date==null){
			return null;
		}
		SimpleDateFormat time=new SimpleDateFormat(defaultFormater); 
		return time.format(date);
	}
	/**
	 * 把yyyy-MM-dd HH:mm:ss形式的字符串转化成date类型
	 * @param date
	 * @return
	 */
	public static Date stringToDate(String date){
		if(date==null){
			return null;
		}
		SimpleDateFormat sdf=null;
		Date dt=null;
		try {
			sdf=new SimpleDateFormat(defaultFormater);
			dt=sdf.parse(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dt;
	}
	public static String getFormatDateYMD(Date value) {
		// TODO Auto-generated method stub
		String formater="yyyy-MM-dd";
		SimpleDateFormat time=new SimpleDateFormat(formater); 
		return time.format(value);
	}
	public static String getFormatDateYMDHS(Date value) {
		// TODO Auto-generated method stub
		String formater="yyyyMMddHHmmss";
		SimpleDateFormat time=new SimpleDateFormat(formater); 
		return time.format(value);
	}
public static int compare_date(String DATE1, String DATE2) {
        
        
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        try {
            Date dt1 = df.parse(DATE1);
            Date dt2 = df.parse(DATE2);
            if (dt1.getTime() > dt2.getTime()) {
                return 1;
            } else if (dt1.getTime() < dt2.getTime()) {
                return -1;
            } else {
                return 0;
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return 0;
    }
}
