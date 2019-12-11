<%--本页面为前端全局参数文件，可从后台后回话中得到值，提供前台其他脚本页所需的参数，一般为公用型数据参数 --%>
<%
	String path = request.getContextPath();
    String siteURL = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
var _resourceFile = "global/global.xml";//全局资源文件
var _key = "<%= (session.getAttribute("key")==null?"":session.getAttribute("key")) %>"||"886e60bb7e014f22a707de23e6f6505d";
var _sgsUrl = "http://www.mapcx.gov.cn/";//"http://www.mapcx.gov.cn"; //提供服务的平台站点
var _baseurl = "<%=basePath %>"||"";//基础ip信息
var _siteurl = "<%=siteURL %>"||"";//基础站点信息
var _ProxyUrl = "serviceproxy.servlet";//代理url
var _isProxy = false;//是否使用代理
var _defaultImgRoot = "<%=siteURL %>/images/";//默认照片存放目录
var _fid="";
var _restMapUrl = "http://192.168.1.41:8090/iserver/services/map-SGS/rest/maps/";
