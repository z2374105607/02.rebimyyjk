package com.webul.util.file;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
/**
 * 操作属性文件工具类
 * @author kongzhong
 *
 */
public class PropertiesUtils {
	String paths="";
	private Properties props;
	public PropertiesUtils(String path){
		try {
			paths = path;
			InputStream in = new BufferedInputStream(new FileInputStream(path));
			props=new Properties();
			props.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public String getValue(String key){
		return props.getProperty(key);
	}
	public void setValue(String key,String value){
		props.setProperty(key, value);
		try {
			props.store(new FileOutputStream(new File(paths)), "");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
