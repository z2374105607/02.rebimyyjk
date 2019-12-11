package com.webul.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class DateUtil {
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";
	public static final String YYYYMMDD_HHMMSS = "yyyyMMdd-HHmmss";
	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String MM_DD = "MM-dd";
	public static final String HH_MM_SS = "HH:mm:ss";
	public static final String YYYY_MM = "yyyy-MM";
	public static final String ORA_FORMAT = "yyyy-mm-dd HH24:MI:SS";
	public static final int SUB_YEAR = 1;
	public static final int SUB_MONTH = 2;
	public static final int SUB_DAY = 5;
	public static final int SUB_HOUR = 10;
	public static final int SUB_MINUTE = 12;
	public static final int SUB_SECOND = 13;
	static final String[] week = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };

	/**
	 * 
	 * stringtoDate(字符串格式的时间按照给定的格式转换为Date类型) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @param paramString1
	 * @param paramString2
	 * @return Date
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static Date stringtoDate(String strTime, String paramString) {
		Date localDate = null;
		SimpleDateFormat localSimpleDateFormat = new SimpleDateFormat(paramString);
		localSimpleDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		try {
			localSimpleDateFormat.setLenient(false);
			localDate = localSimpleDateFormat.parse(strTime);
		} catch (Exception localException) {
			localDate = null;
		}
		return localDate;
	}

	/**
	 * 
	 * dateToString(Date类型时间转换为字符串类型) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @param paramDate
	 * @param paramString
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String dateToString(Date paramDate, String paramString) {
		String str = "";
		SimpleDateFormat localSimpleDateFormat = new SimpleDateFormat(paramString);
		localSimpleDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		try {
			str = localSimpleDateFormat.format(paramDate);
		} catch (Exception localException) {
		}
		return str;
	}

	/**
	 * 
	 * getCurrDate(获取当前时间，可以按照给定的字符串进行格式化) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @param paramString
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String getCurrDate(String paramString) {
		return dateToString(new Date(), paramString);
	}

	/**
	 * 
	 * getDaysOfMonth(获取月份的天数) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @param yearString
	 * @param monthString
	 * @return int
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static int getDaysOfMonth(String yearString, String monthString) {
		int i = 0;
		if ((monthString.equals("1")) || (monthString.equals("3")) || (monthString.equals("5"))
				|| (monthString.equals("7")) || (monthString.equals("8")) || (monthString.equals("10"))
				|| (monthString.equals("12")))
			i = 31;
		else if ((monthString.equals("4")) || (monthString.equals("6")) || (monthString.equals("9"))
				|| (monthString.equals("11"))) {
			i = 30;
		} else if (((Integer.parseInt(yearString) % 4 == 0) && (Integer.parseInt(yearString) % 100 != 0))
				|| (Integer.parseInt(yearString) % 400 == 0))
			i = 29;
		else {
			i = 28;
		}

		return i;
	}

	/**
	 * 
	 * getCurrDateTime(获取当前时间，格式为yyyy-MM-dd HH:mm:ss) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String getCurrDateTime() {
		Calendar localCalendar = Calendar.getInstance();
		return dateToString(localCalendar.getTime(), "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 
	 * getDateTime(获取当前时间，格式为yyyy-MM-dd) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String getDateTime() {
		Calendar localCalendar = Calendar.getInstance();
		return dateToString(localCalendar.getTime(), "yyyy-MM-dd");
	}
	/**
	 * 指定日期类型返回日期字符串
	 * 
	 * @param datePattern
	 * @return
	 */
	public static String getNowDateString(String datePattern) {
		SimpleDateFormat sdf = new SimpleDateFormat(datePattern);
		return sdf.format(new Date());
	}
	/**
	 * 
	 * getDateTime(获取当前时间，格式为yyyy-MM-dd) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String getMonTime() {
		Calendar localCalendar = Calendar.getInstance();
		return dateToString(localCalendar.getTime(), "yyyy-MM");
	}

	/**
	 * 
	 * isDate(判断一个字符串是否符合时间格式) (这里描述这个方法适用条件 – 可选)
	 * 
	 * @param paramString
	 * @return boolean
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static boolean isDate(String strTime) {
		StringBuffer localStringBuffer = new StringBuffer("^((\\d{2}(([02468][048])|([13579][26]))-?((((0?");
		localStringBuffer.append("[13578])|(1[02]))-?((0?[1-9])|([1-2][0-9])|(3[01])))");
		localStringBuffer.append("|(((0?[469])|(11))-?((0?[1-9])|([1-2][0-9])|(30)))|");
		localStringBuffer.append("(0?2-?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][12");
		localStringBuffer.append("35679])|([13579][01345789]))-?((((0?[13578])|(1[02]))");
		localStringBuffer.append("-?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))");
		localStringBuffer.append("-?((0?[1-9])|([1-2][0-9])|(30)))|(0?2-?((0?[");
		localStringBuffer.append("1-9])|(1[0-9])|(2[0-8]))))))");
		Pattern localPattern = Pattern.compile(localStringBuffer.toString());
		return localPattern.matcher(strTime).matches();
	}

	/**
	 * 
	 * formatForOra(格式化时间) (适用于oracle的2014-05-08 17:50:23.0格式)
	 * 
	 * @param strTime
	 * @return String
	 * @author WangFei
	 * @since 1.0.0
	 */
	public static String formatForOra(String strTime) {
		if (StringUtils.isBlank(strTime)) {
			return "";
		}
		return strTime.substring(0, 19);
	}
	/*时间差
	 * 
	 * @param paramString1
	 * @param paramString2
	 * @return long
	 * @author WangFei
	 */
	public static long timeSub(String paramString1, String paramString2) {
		long l1 = stringtoDate(paramString1, "yyyy-MM-dd HH:mm:ss").getTime();
		long l2 = stringtoDate(paramString2, "yyyy-MM-dd HH:mm:ss").getTime();
		return (l2 - l1) / (1000L * 60);
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
			sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			dt=sdf.parse(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dt;
	}
	public static String getFormatDateYMD(Date value) {
		// TODO Auto-generated method stub
		String formater="HHmmss";
		SimpleDateFormat time=new SimpleDateFormat(formater); 
		return time.format(value);
	}
	public static String getFormatDateyear(Date value) {
		// TODO Auto-generated method stub
		String formater="yyyy-MM-dd";
		SimpleDateFormat time=new SimpleDateFormat(formater); 
		return time.format(value);
	}
	 public static int compare_date(String DATE1, String DATE2) {
	        
	        
	        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	        try {
	            Date dt1 = df.parse(DATE1);
	            Date dt2 = df.parse(DATE2);
	            if (dt1.getTime() > dt2.getTime()) {
	                System.out.println("dt1 在dt2前");
	                return 1;
	            } else if (dt1.getTime() < dt2.getTime()) {
	                System.out.println("dt1在dt2后");
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
