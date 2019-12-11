package com.webul.web;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.json.JSONObject;
import org.jsoup.helper.StringUtil;

import com.google.gson.Gson;
import com.webul.util.http.HttpUtil;

/**
 * Servlet Filter implementation class OAuth2Filter
 */
public class OAuth2Filter implements Filter {

	protected String app_key = null;
	
	protected String app_id = null;
	
	protected String redirect_uri = null;
	
	protected FilterConfig filterConfig; 
    /**
     * Default constructor. 
     */
    public OAuth2Filter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		InputStream is=null;
		String authorize ="";
		String token ="";
		String get_openId ="";
		String get_user_info ="";
		String GetUserInRoleList ="";
		String crailway ="";
		String error ="";
		try {

		 is = HttpUtil.class
					.getResourceAsStream("/web.properties");
			Properties properties = new Properties();
			properties.load(is);

			authorize = properties.getProperty("authorize");
			token = properties.getProperty("token");
			get_openId = properties.getProperty("get_openId");
			get_user_info = properties.getProperty("get_user_info");
			GetUserInRoleList = properties.getProperty("GetUserInRoleList");
			crailway = properties.getProperty("crailway");
			error = properties.getProperty("error");

		} catch (IOException e1) {
			authorize ="";
		}finally {
			try {
				if (is != null) {
					is.close();
					is = null;
				}
			} catch (IOException ex) {
			}
		}
		HttpServletRequest httpRequest = (HttpServletRequest) request; 
		HttpServletResponse httpResponse = (HttpServletResponse) response; 
		System.out.println(httpRequest.getSession());
		AuthenToken user= (AuthenToken) httpRequest.getSession().getAttribute(AuthenToken.BEAN_ID);//获取用户信息session
		String name = httpRequest.getParameter("item.userName");
		if (user == null) {
			String code = getCode(httpRequest);
			if(StringUtil.isBlank(code)){
				System.out.println("code");
				queryRedirecturi(httpRequest);
				httpResponse.sendRedirect(authorize+"?response_type=code&app_key="+queryAppid(request)+"&redirect_uri="+queryRedirecturi(httpRequest)+"&state=test&scope=get_user_info");
				return;
			}else{

				String access_token = "";
				HttpClient client = new HttpClient();
				HttpMethod method = new GetMethod(token+"?grant_type=authorization_code&client_secret="+queryAppkey(request)+"&app_key="+queryAppid(request)+"&code="+code+"&state=test");
				client.executeMethod(method);
				String rs = method.getResponseBodyAsString();
				System.out.println("access_token:"+rs);
				method.releaseConnection();
				String[] st = rs.split("&");
				for(int i = 0 ; i<st.length;i++){
					if(st[i].indexOf("access_token") !=-1){
						access_token = st[i];
					}
				}
				client = new org.apache.commons.httpclient.HttpClient();
				method = new GetMethod(get_openId+"?"+access_token);
				client.executeMethod(method);
				rs = method.getResponseBodyAsString();
				System.out.println("openid:"+rs);
				method.releaseConnection();
				String msg = rs.replace("callback(", "").replace(");", "");
				TokenVO vo = new Gson().fromJson(msg, TokenVO.class);
				client = new org.apache.commons.httpclient.HttpClient();
				method = new GetMethod(get_user_info+"?"+access_token+"&Openid="+vo.getOpenid()+"&app_key="+vo.getApp_key());
				client.executeMethod(method);
				rs = method.getResponseBodyAsString();
				System.out.println("username:"+rs);
				
				method.releaseConnection();
				OAuth2UserVO userVO =  new Gson().fromJson(rs, OAuth2UserVO.class);
				httpRequest.getSession().setAttribute("username",userVO.getUseraccount()); 

//				WebAuthenticationFilter ww = new WebAuthenticationFilter();
//				ww.onLoggedIn0(userVO.getUseraccount(), httpRequest, httpResponse);
				AuthenToken newAuthenToken=new AuthenToken();
				newAuthenToken.setUserName(userVO.getUseraccount());
				newAuthenToken.setHttpRequest(httpRequest);
				newAuthenToken.setHttpResponse(httpResponse);
				httpRequest.getSession().setAttribute(AuthenToken.BEAN_ID, newAuthenToken); 
			    AuthenToken authenToken=(AuthenToken) httpRequest.getSession().getAttribute(AuthenToken.BEAN_ID );
			    if(authenToken.getUserName().equals("noauthority") || authenToken.getUserName().equals("loginerror") ){
			    	httpRequest.getSession().removeAttribute(AuthenToken.BEAN_ID );
			    	
			    	httpResponse.sendRedirect(httpRequest.getContextPath()+"/error/error500.jsp");
			    	return;
			    }
//			    if(authenToken.isAddmin()){
//			    	  httpResponse.sendRedirect(httpRequest.getContextPath()+"/jsp/task/todo_list1.action");
//			  }else{
				 // httpResponse.sendRedirect(httpRequest.getContextPath()+"/jsp/task/todo_index.action");
				  
//			  }
					String ztimestr = HttpUtil.httpGet(
							GetUserInRoleList+"?AppID=09a8d8fc-0bf9-4fd0-9111-1b7a9172784d&UserAccount="+userVO.getUseraccount()+"&RoleType=1&apikey=5334163f-5afa-48fe-8114-5d31729e9068");
					JSONObject jsonObject=new JSONObject(ztimestr);
					if(jsonObject.optInt("success")==1) {
//						JSONObject object=new JSONObject();
//						object.put("user", "userVO.getUseraccount()");
//						httpResponse.getWriter().write(object.toString());
						httpResponse.sendRedirect(crailway);
					}else {
						//httpRequest.getSession().removeAttribute(AuthenToken.BEAN_ID );
						httpResponse.sendRedirect(error);
						return;
					}
				return;
			}
		}
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
		this.filterConfig = fConfig;
		this.app_id = filterConfig.getInitParameter("app_id");
		this.app_key = filterConfig.getInitParameter("app_key");
	}
	
	protected String queryAppid(ServletRequest request){
		return this.app_id;
	}
	protected String queryAppkey(ServletRequest request){
		return this.app_key;
	}
	protected String queryRedirecturi(HttpServletRequest request) throws UnsupportedEncodingException{
		StringBuffer redUrl=request.getRequestURL();
		  Enumeration paramNames = request.getParameterNames();  
		  if (paramNames.hasMoreElements()) {  
			  redUrl.append("?");
		  }
        while (paramNames.hasMoreElements()) {  
            String paramName = (String) paramNames.nextElement();  
  
            String[] paramValues = request.getParameterValues(paramName);  
            if (paramValues.length == 1) {  
                String paramValue = paramValues[0];  
                if (paramValue.length() != 0 && !paramName.equals("code") &&  !paramName.equals("state")) {  
                	redUrl.append(paramName).append("=").append(paramValue).append("&");
                }  
            }  
        }  
        if(redUrl.toString().endsWith("&")||redUrl.toString().endsWith("?")){
        	redUrl.deleteCharAt(redUrl.length()-1);
        }
		return URLEncoder.encode(redUrl.toString(),"UTF-8");
	}
	protected String getCode(HttpServletRequest request) throws UnsupportedEncodingException{
		String code= request.getParameter("code");
		if(!StringUtil.isBlank(code)){
			return code;
		}
		StringBuffer redUrl=request.getRequestURL();
		  Enumeration paramNames = request.getParameterNames();  
		  if (paramNames.hasMoreElements()) {  
			  redUrl.append("?");
		  }
        while (paramNames.hasMoreElements()) {  
            String paramName = (String) paramNames.nextElement();  
  
            String[] paramValues = request.getParameterValues(paramName);  
            if (paramValues.length == 1 ) { 
            	if(paramValues[0].contains("?code=")){
        		   String paramValue = paramValues[0];  
                   if (paramValue.length() != 0 && !paramName.equals("code") &&  !paramName.equals("state")) {  
                	   redUrl.append(paramName).append("=").append(code=paramValue.split("\\?code\\=")[0]);
                	   code=paramValue.split("\\?code\\=")[1];
                   }  
            	}else{
        		   String paramValue = paramValues[0];  
                   if (paramValue.length() != 0 && !paramName.equals("code") &&  !paramName.equals("state")) {  
                   	redUrl.append(paramName).append("=").append(paramValue).append("&");
                   }  
            	}
            	
             
            }  
        }  
        if(redUrl.toString().endsWith("&")||redUrl.toString().endsWith("?")){
        	redUrl.deleteCharAt(redUrl.length()-1);
        }
        redirect_uri=redUrl.toString();
		return code;
	}
}
