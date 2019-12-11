package com.webul.util.http;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.webul.util.log.LogUtil;
public class HttpUtil {
	static CloseableHttpClient httpClient = HttpClients.createDefault();
	
	/**
	 * 
	 * @param url
	 * @param dir
	 * @param fileName
	 * @throws UnsupportedEncodingException
	 */
	public static void saveImg(String url,String dir,String fileName) throws UnsupportedEncodingException {
		HttpGet get=new HttpGet(url);
		HttpResponse response;
		try {
			response = httpClient.execute(get);
			HttpEntity httpEntity=response.getEntity();
			InputStream is=httpEntity.getContent();
			if(httpEntity.isStreaming()){
				OutputStream out=new FileOutputStream(new File(dir+fileName));
				byte[] ibyte=EntityUtils.toByteArray(httpEntity);
				out.write(ibyte);
				is.close();
				out.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 
	 * @param url
	 * @param param
	 * @return
	 */
	public static String httpPost(String url,Map<String,String> param){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		Set<Entry<String, String>> keySet=param.entrySet();
		for (Entry<String, String> entry : keySet) {
			formparams.add(new BasicNameValuePair(entry.getKey(),entry.getValue()));
		}
		UrlEncodedFormEntity entity = null;
		String hdcontrolStr = null ;
		try {
			entity = new UrlEncodedFormEntity(formparams, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		HttpPost post=new HttpPost(url);
		//设置请求的报文头部的编码
		post.setHeader(new BasicHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"));

		//设置期望服务端返回的编码
		post.setHeader(new BasicHeader("Accept", "text/plain;charset=utf-8"));
		post.setEntity(entity);
		HttpResponse response;
		try {
			response = httpClient.execute(post);
			hdcontrolStr = EntityUtils.toString(response.getEntity());
			System.out.println(hdcontrolStr);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return hdcontrolStr;
	}
	public static String httpGet(String http){
		HttpGet get=new HttpGet(http);
		//设置请求的报文头部的编码
		get.setHeader(new BasicHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"));

		//设置期望服务端返回的编码
		get.setHeader(new BasicHeader("Accept", "application/json;charset=utf-8"));
		String body=null;
		HttpResponse response;
		try {
			response=httpClient.execute(get);
			HttpEntity entity=response.getEntity();
			body=EntityUtils.toString(entity);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body;
	}
	public static String HttpUtilCommon(String url, Object postData, String token) {
		// String url =
		// "http://125.35.11.32:8081/navigation/screem/getJnxzScreemByStaName";
		// String url = "http://localhost:443/navigation/zwd/zwdByStat";
		// 创建默认的httpClient实例.
		CloseableHttpClient httpclient = HttpClients.createDefault();

		// 创建httppost
		HttpPost httppost = new HttpPost(url);
		// HttpMethod method = new GetMethod(url);
		// method.setRequestHeader("Connection", "close");
		if (token == null || token.equals("")) {
			httppost.setHeader("Content-type", "application/x-www-form-urlencoded");
		}
		//
		// 创建参数队列
		httppost.setHeader("Authorization", token);

		/*
		 * JSONObject postData = new JSONObject(); postData.put("timeStamp",
		 * "20170302151354"); postData.put("md5", "67086A02D0BA3BA0675A658BECCF2F81");
		 * postData.put("ip", "172.17.42.143"); JSONObject json = new JSONObject();
		 */

		// postData.put("requestdata", "QDZ");
//		String testste = postData.toString();
		StringEntity entityStr = new StringEntity(postData.toString(), "UTF-8");

		entityStr.setContentType("application/json;charset=UTF-8");
		CloseableHttpResponse response = null;
		try {
			httppost.setEntity(entityStr);
			System.out.println("executing request " + httppost.getURI());
			response = httpclient.execute(httppost);
			response.setHeader("Connection", "close");
			int stateCode = response.getStatusLine().getStatusCode();
			HttpEntity entity = response.getEntity();
			if (stateCode == 200) {
				//LogUtil.hycsLogger.info("获取接口成功--状态码：" + stateCode + "-----接口：" + httppost.getURI());

				if (entity != null) {
					String str = EntityUtils.toString(entity, "utf-8");
					System.out.println(str);
					//LogUtil.hycsLogger.info("获取数据信息：" + str);
					return str;
				}
			} else {
				String str = EntityUtils.toString(entity, "utf-8");
				System.out.println("状态码：" + stateCode);
				System.out.println("executing request " + httppost.getURI());
//				LogUtil.hycsLogger.info("获取接口调用失败--状态码：" + stateCode + "-----接口：" + httppost.getURI());
//				LogUtil.hycsLogger.info("获取数据信息：" + str);
				return "";
			}

		} catch (Exception e) {
			e.printStackTrace();
			//LogUtil.hycsLogger.info("http接口调用出错：" + e.getMessage());
			return "";
		} finally {

			// 关闭连接,释放资源
			try {
				httpclient.close();
				if (response != null) {
					response.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return "";
	}
}
