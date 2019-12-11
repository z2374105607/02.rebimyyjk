package com.webul.util.string;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

/**
 * Description: 对象转换成json的工具类
 */
public class JSONService {
	
	public JSONService(){
		
	}
	public static String listToJsonString(List<?> list){
		return JSON.toJSONString(list);
	}
	public static String beanToJSONString(Object bean){
		return JSON.toJSONString(bean);
	}
	//将转换好的json数据放入HttpServletResponse内
	public static void writeJsonIntoResponse(HttpServletResponse response, String json) {
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("text/json; charset=UTF-8");
		PrintWriter out = null;
        try {
            out = response.getWriter();
    		out.print(json);
    		out.flush();
        } catch (Exception e) {
            out.write("error");
            e.printStackTrace();
        } finally {
            out.flush();
            out.close();
        }
	}
	//将转换好的json数据放入HttpServletResponse内  按照指定编码
	private static void writeJsonIntoResponse(HttpServletResponse response, String json, String charset) {
	    response.setHeader("Cache-Control", "no-cache");
	    response.setContentType("text/json; charset=" + charset);
	    PrintWriter out = null;
	    try {
	        out = response.getWriter();
	        out.print(json);
	        out.flush();
	    } catch (Exception e) {
	        out.write("error");
	        e.printStackTrace();
	    } finally {
	        out.flush();
	        out.close();
	    }
	}
	//将未转换的bean(map,普通类)放入HttpServletResponse内
	public static void writeBeanIntoResponse(HttpServletResponse response,Object bean) {
	    writeJsonIntoResponse(response,beanToJSONString(bean));
	}
	//将未转换的list放入HttpServletResponse内
	public static void  writeListIntoResponse(HttpServletResponse response,List<?> list) {
	    writeJsonIntoResponse(response,listToJsonString(list));
	}
    public static void writeStringIntoResponse(HttpServletResponse response, String string) {
        response.setHeader("Cache-Control", "no-cache");
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.print(string);
            out.flush();
        } catch (Exception e) {
            out.write("error");
            e.printStackTrace();
        } finally {
            out.flush();
            out.close();
        }
    }
    public static void writeStringIntoResponse(HttpServletResponse response, String string, String charset) {
        response.setHeader("Cache-Control", "no-cache");
        response.setContentType("text/html; charset=" + charset);
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.print(string);
            out.flush();
        } catch (Exception e) {
            out.write("error");
            e.printStackTrace();
        } finally {
            out.flush();
            out.close();
        }
    }
	//将未转换的bean(map,普通类)放入HttpServletResponse内 按照指定编码
	public static void writeBeanIntoResponse(HttpServletResponse response,Object bean, String charset) {
		writeJsonIntoResponse(response,beanToJSONString(bean), charset);
	}
	//将未转换的list放入HttpServletResponse内 按照指定编码
	public static void  writeListIntoResponse(HttpServletResponse response,List<?> list, String charset) {
		writeJsonIntoResponse(response,listToJsonString(list), charset);
	}
	public static String readJson(String path){
        //从给定位置获取文件
        File file = new File(path);
        BufferedReader reader = null;
        //返回值,使用StringBuffer
        StringBuffer data = new StringBuffer();
        //
        try {
            reader = new BufferedReader(new FileReader(file));
            //每次读取文件的缓存
            String temp = null;
            while((temp = reader.readLine()) != null){
                data.append(temp);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            //关闭文件流
            if (reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return data.toString();
    }
}
