package qrcode;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.Timer;

import javax.servlet.http.HttpServletRequest;

public class UserEncoder {
	private static Properties config;

	/*
	 * public static void main(String[] args) throws Exception { String
	 * aa="https://www.baidu.com/"; String bb="1s21"; userEncoder(bb,aa); }
	 */
	/**
	 * 
	 * @Title: userEncoder
	 * @Description: TODO(将url生成二维码图片)
	 * @author syf
	 * @date May 15, 2015 2:13:48 PM
	 * @param userid
	 *            用户ID
	 * @param url
	 *            URL链接地址
	 * @throws IOException
	 */
	public static void main(String[] args) {
		String ss="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf679bb28ac2776c0&redirect_uri=http://dswx.tsdsfs.com/dsshop/dsshop/appucenter&response_type=code&scope=snsapi_userinfo&state=DS1111&#wechat_redirect";
		//userEncoderapp("123",ss);
	}
	public static void userEncoder(String userid, String url,String logo) {
		// String configFilePath = UserEncoder.class.getResource("/").getPath()
		// + "img.properties";
		try {
			// initProp(configFilePath);
			// String dir = config.getProperty("dir");
			/*String path1 = UserEncoder.class.getClassLoader().getResource("/")
					.getPath();
			if (path1 != null) {
				path1 = path1.substring(0, path1.length() - 8);
			}*/
			String path = "D:/apache-tomcat-6.0.30/apache-tomcat-6.0.30/apache-tomcat-6.0.30/webapps/dsshop/" + File.separator + "pictureFile"
					+ File.separator + "erweima" + File.separator + userid
					+ File.separator;
			QRCodeParams params2 = new QRCodeParams();
			params2.setTxt(url);
			params2.setFilePath(path);
			params2.setFileName("erweima.png");
			params2.setOnColor(0xFF000000);
			params2.setOffColor(0xFFffffff);
			params2.setWidth(600);
			params2.setHeight(600);
			params2.setLogoPath(logo);
			QRCodeUtil.generateQRImage(params2);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void userEncoderapp(String userid, String url,String logo) {
		// String configFilePath = UserEncoder.class.getResource("/").getPath()
		// + "img.properties";
		try {
			// initProp(configFilePath);
			// String dir = config.getProperty("dir");
			/*String path1 = UserEncoder.class.getClassLoader().getResource("/")
					.getPath();
			if (path1 != null) {
				path1 = path1.substring(0, path1.length() - 8);
			}*/
			String path = "D:/apache-tomcat-6.0.30/apache-tomcat-6.0.30/apache-tomcat-6.0.30/webapps/dsshop/" + File.separator + "pictureFile"
					+ File.separator + "erweima" + File.separator + userid
					+ File.separator;
			QRCodeParams params2 = new QRCodeParams();
			params2.setTxt(url);
			params2.setFilePath(path);
			params2.setFileName("erweima_small.png");
			params2.setOnColor(0xFF000000);
			params2.setOffColor(0xFFffffff);
			params2.setWidth(600);
			params2.setHeight(600);
			params2.setLogoPath(logo);
			QRCodeUtil.generateQRImage(params2);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 初始化静态属性
	 * 
	 * @param configFilePath
	 * @throws Exception
	 */
	private static void initProp(String configFilePath) throws Exception {
		config = UserEncoder.readProperties(configFilePath);
	}

	/**
	 * 读取系统配置
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Properties readProperties(String propPath) throws Exception {
		Properties sysConfig = new Properties();
		File propFile = new File(propPath);
		if (!propFile.exists()) {
			throw new Exception("文件:" + propFile.getAbsolutePath() + "不存在");
		}
		FileInputStream fis = new FileInputStream(propFile);
		sysConfig.load(fis);
		return sysConfig;
	}
}
