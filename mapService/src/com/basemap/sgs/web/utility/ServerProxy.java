package com.basemap.sgs.web.utility;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * Servlet implementation class testServlet
 */
@WebServlet("/serviceproxy.servlet")
public class ServerProxy extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final String[] filter = new String[]{"url","requesttype","transcoding"};
	private String defaultEncoding = "UTF-8";
    /**
     * Default constructor. 
     */
    public ServerProxy() {
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String strRequestType = "get";
		String strOrginURL = "";
		request.setCharacterEncoding(defaultEncoding);
		Map<String, String[]> requestParameter = request.getParameterMap();
		String strParams = getRequestParameterString(requestParameter);
		for(Iterator<String> s=requestParameter.keySet().iterator();s.hasNext();){
			String paramName = s.next();
			if(paramName.equalsIgnoreCase("requesttype")){
				strRequestType = requestParameter.get(paramName)[0];
			}else if(paramName.equalsIgnoreCase("url")){
				strOrginURL = requestParameter.get(paramName)[0];
			}else if(paramName.equalsIgnoreCase("encoding")){
				defaultEncoding = requestParameter.get(paramName)[0];
			}
		}
		URL url = null;
		HttpURLConnection connect = null;
		if(strRequestType.equalsIgnoreCase("GET")){
			url = new URL(strOrginURL + "?" + strParams);
			connect = (HttpURLConnection)url.openConnection();
			connect.setRequestProperty("Content-Type", "text/xml; charset="+defaultEncoding);
			connect.setConnectTimeout(10000);
			connect.setReadTimeout(30000);
			connect.setDoOutput(true);
			connect.setUseCaches(false);
		}else if(strRequestType.equalsIgnoreCase("POST")){
			url = new URL(strOrginURL);
			connect = (HttpURLConnection)url.openConnection();
			connect.setRequestProperty("Content-Type", "text/xml; charset="+defaultEncoding);
			connect.setConnectTimeout(10000);
			connect.setDoOutput(true);
			connect.setReadTimeout(30000);
			connect.setRequestMethod("POST");
			connect.setUseCaches(false);
			connect.connect();
			DataOutputStream out = new DataOutputStream(connect.getOutputStream());
			out.writeBytes(strParams); 
		    out.flush();
		    out.close(); 
		}
		int responseCode = connect.getResponseCode(); 
		String strResult="";
		if (HttpURLConnection.HTTP_OK == responseCode) {// 连接成功 
			response.setContentType(connect.getContentType());
			response.setCharacterEncoding(connect.getContentEncoding());
			BufferedReader reader = new BufferedReader(new InputStreamReader(connect.getInputStream(),defaultEncoding));
			StringBuilder sb = new StringBuilder();
			String line = null;
			int requestSize = connect.getContentLength();
			Long flow = Long.valueOf(requestSize);
			try {
				while ((line = reader.readLine()) != null) {
					sb.append(line + "\n");
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					reader.close();
					connect.getInputStream().close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			 strResult = sb.toString();
		}
		response.getWriter().write(strResult);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	@SuppressWarnings({ "rawtypes" })
	protected String getRequestParameterString(Map requestParameter) throws UnsupportedEncodingException {
		String requestParameterString = "";
		Iterator iterator = requestParameter.entrySet().iterator();
		StringBuffer param = new StringBuffer();
		int i = 0;
		Start:
		while (iterator.hasNext()) {
			Entry entry = (Entry) iterator.next();
			String value = "";
			String key = entry.getKey().toString();
			if(key.equalsIgnoreCase("ft"))
				continue;
			for(int o = 0;o < filter.length; o++){
				if(key.equalsIgnoreCase(filter[o])){
					if(iterator.hasNext()){
						entry = (Entry) iterator.next();
						key = entry.getKey().toString();
						break;
					}else{
						break Start; 
					}
				}
			}
			i++;
			if (i == 1)
				param.append(key).append("=");
			else
				param.append("&").append(key).append("=");
			
			if (entry.getValue() instanceof String[]) {
				value = ((String[]) entry.getValue())[0];
			} else {
				value = entry.getValue().toString();
			}
			if(key.equalsIgnoreCase("transcoding")){
				value = URLEncoder.encode(new String(value.getBytes("ISO_8859_1"),defaultEncoding),defaultEncoding);
			}
			param.append(value);
		}
		requestParameterString = param.toString();
		return requestParameterString;
	}
}
