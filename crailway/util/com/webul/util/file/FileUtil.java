package com.webul.util.file;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * 文件操作工具类
 * @author kongzhong
 *
 */
public class FileUtil {
	
	private static int BUFFER_SIZE = 8096;// 缓冲区大小
	/**
	 * 返回 classpath的绝对路径 %TOMCAT_HOME%/webapps/webul/WEB-INF/classes/
	 * @return
	 */
	public static String getClassPathAbsolutePath() {
		String path=FileUtil.class.getResource("/").getPath();
		return path;
	}
	/**
	 * 返回项目路径 %TOMCAT_HOME%/webapps/webul/
	 * @return
	 */
	public static String getContextAbsolutePath() {
		String path=FileUtil.class.getResource("/").getPath().replace("WEB-INF/classes/","");
		return path;
	}
	
	public static String getStringByInputStream(InputStream is){
		BufferedInputStream bis= new BufferedInputStream(is);
		byte[] buf = new byte[BUFFER_SIZE];
		int size = 0;
		StringBuffer sb = new StringBuffer();
		String tempStr = "";
		try {
			while ((size = bis.read(buf)) != -1) {
				tempStr = new String(buf, 0, size);
				sb.append(tempStr);
			}
			bis.close();
			return sb.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
