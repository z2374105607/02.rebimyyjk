package com.webul.util.http;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.net.ssl.SSLContext;
import org.apache.commons.io.Charsets;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.config.SocketConfig;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.LayeredConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
public class HttpsUtils {
	private static HttpClient client=null;
	private static HttpClient getInstance(){
		if(client==null){
			RegistryBuilder<ConnectionSocketFactory> registryBuilder = RegistryBuilder.<ConnectionSocketFactory> create();
			ConnectionSocketFactory plainSF = new PlainConnectionSocketFactory();
			registryBuilder.register("http", plainSF);
			try {
				KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
				SSLContext sslContext = SSLContexts.custom().useTLS().loadTrustMaterial(trustStore, new AnyTrustStrategy()).build();
				LayeredConnectionSocketFactory sslSF = new SSLConnectionSocketFactory(sslContext,SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				registryBuilder.register("https", sslSF);
			} catch (KeyStoreException e) {
				throw new RuntimeException(e);
			} catch (KeyManagementException e) {
				throw new RuntimeException(e);
			} catch (NoSuchAlgorithmException e) {
				throw new RuntimeException(e);
			}
			Registry<ConnectionSocketFactory> registry = registryBuilder.build();
			// 设置连接管理器
			PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(registry);
			connManager.setDefaultConnectionConfig(ConnectionConfig.custom().setCharset(Charsets.toCharset(Charset.defaultCharset())).build());
			connManager.setDefaultSocketConfig(SocketConfig.custom().setSoTimeout(100000).build());
			// 构建客户端
			return HttpClientBuilder.create().setConnectionManager(connManager).build();
		}else{
			return client;
		}
	}
	
	public static String httpsGet(String https){
		HttpGet get=new HttpGet(https);
		HttpClient util = HttpsUtils.getInstance();
		String body=null;
		HttpResponse response;
		try {
			response=util.execute(get);
			HttpEntity entity=response.getEntity();
			body=EntityUtils.toString(entity);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body;
	}
	public static String httpsPost(String https,String params){
		HttpPost post=new HttpPost(https);
		post.setEntity(new StringEntity(params, "UTF-8"));
		HttpClient util = HttpsUtils.getInstance();
		String body=null;
		HttpResponse response;
		try {
			response=util.execute(post);
			HttpEntity entity=response.getEntity();
			body=EntityUtils.toString(entity,"UTF-8");
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body;
	}
	public static String httpPost(String https,Map<String,String> param){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		Set<Entry<String, String>> keySet=param.entrySet();
		for (Entry<String, String> entry : keySet) {
			formparams.add(new BasicNameValuePair(entry.getKey(),entry.getValue()));
		}
		UrlEncodedFormEntity entity = null;
		try {
			entity = new UrlEncodedFormEntity(formparams, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		HttpPost post=new HttpPost(https);
		post.setEntity(entity);
		HttpClient util = HttpsUtils.getInstance();
		String body=null;
		HttpResponse response;
		try {
			response=util.execute(post);
			HttpEntity responseEntity=response.getEntity();
			body=EntityUtils.toString(responseEntity);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body;
	}
	public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();  
        sb.append("{");  
        sb.append(" \"button\":[");  
        sb.append("{");  
        sb.append("\"name\":\"测试1\",");       //第一个菜单  
        sb.append("\"sub_button\":[");  
        sb.append("{");  
        sb.append("\"type\":\"click\",");  
        sb.append("\"name\":\"测试11\",");  
        sb.append("\"key\":\"cs1\"");  
        sb.append("},");  
        sb.append("{");  
        sb.append("\"type\":\"click\",");  
        sb.append("\"name\":\"测试12\",");  
        sb.append("\"key\":\"cs2\"");  
        sb.append("},");  
        sb.append("{");  
        sb.append("\"type\":\"click\",");  
        sb.append("\"name\":\"测试13\",");  
        sb.append("\"key\":\"cs3\"");  
        sb.append("}");  
        sb.append("]");  
        sb.append("},");  
        sb.append("{");  
        sb.append("\"name\":\"测试2\",");  
        sb.append("\"sub_button\":[");  
        sb.append("{");  
        sb.append("\"type\":\"click\",");  
        sb.append("\"name\":\"测试21\",");  
        sb.append("\"key\":\"cs4\"");  
        sb.append("}");  
        sb.append("]");  
        sb.append("},");  
        sb.append("{");  
        sb.append("\"name\":\"测试URL\",");
        sb.append("\"sub_button\":[");  
        sb.append("{");  
        sb.append("\"type\":\"view\",");  
        sb.append("\"name\":\"百度\",");  
        sb.append("\"url\":\"http://www.baidu.com\",");
        sb.append("}");  
        sb.append("]");  
        sb.append("}");  
        sb.append("]");  
        sb.append("}"); 
        System.out.println(sb.toString());
		String body=HttpsUtils.httpsPost("https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=XgWgYdh9f9q0aQ_lYWc-vu38c_whk6YbnpZ-HgEg4AwQUDxxSrR0ixSmedcDvJPDfN7Qg-glYkvHPnkb2or-rUpUka0ZQRp5rZkXp9G3v4o",sb.toString());
		System.out.println(body);
	}
}
