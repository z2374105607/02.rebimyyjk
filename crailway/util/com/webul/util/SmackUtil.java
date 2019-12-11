/**
 * @Project: 特维内容管理系统
 * @Description: TODO(用一句话描述该文件做什么)
 * Copyright (c) 2015 北京特维网讯技术有限公司 版权所有
 *
 * @author ff
 * @date Oct 9, 2015 4:37:47 PM
 * @version V1.0
 */
package com.webul.util;

import java.io.File;

import org.jivesoftware.smack.AccountManager;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.XMPPConnection;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smackx.filetransfer.FileTransferManager;
import org.jivesoftware.smackx.filetransfer.OutgoingFileTransfer;
import org.springframework.web.servlet.ModelAndView;


/**
 * @ClassName: SmackUtil
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author ff
 * @date Oct 9, 2015 4:37:47 PM
 * 
 */
public class SmackUtil {
	//获取连接
	public static XMPPConnection openConnection(String user,String pasword) throws Exception {
		ModelAndView mav=new ModelAndView();
		AccountManager accountManager;
		ConnectionConfiguration config = new ConnectionConfiguration("dswx.tsdsfs.com", 5222);  
		XMPPConnection con= new XMPPConnection(config);  
		con.connect();// 开启连接  
		con.login("admin", "admin");   
		return con;
	}
	 /**  
     * 发送文件 
     * @param con 用户连接对象 
     * @param filePath 文件路径 
     */ 
    public static void sendFile(XMPPConnection connection,  
            String user, File file) throws XMPPException, InterruptedException {  
        System.out.println("发送文件开始"+file.getName());  
        FileTransferManager transfer = new FileTransferManager(connection);  
        OutgoingFileTransfer out = transfer.createOutgoingFileTransfer(user+"/Smack");//  
          
        out.sendFile(file, file.getName());  
          
        System.out.println("//////////");  
        System.out.println(out.getStatus());  
        System.out.println(out.getProgress());  
        System.out.println(out.isDone());  
          
        System.out.println("//////////");  
          
        System.out.println("发送文件结束");  
    }  
	/*public static List<AppUserBean> searchUsers(String userName,XMPPConnection connection) throws XMPPException  
    {  
        List<AppUserBean> results = new ArrayList<AppUserBean>();  
        System.out.println("查询开始..............."+connection.getHost()+connection.getServiceName());  
        CacheUtil cache = CacheUtil.getInstance();
        UserSearchManager usm = new UserSearchManager(connection);  
          
          
        Form searchForm = usm.getSearchForm("search." + connection.getServiceName());  
        Form answerForm = searchForm.createAnswerForm();  
        answerForm.setAnswer("Username", true);  
        answerForm.setAnswer("search", userName);  
        ReportedData data = usm.getSearchResults(answerForm, "search." + connection.getServiceName());  
           
         Iterator<Row> it = data.getRows();  
         Row row = null;  
         AppUserBean user = null;  
         while(it.hasNext())  
         {  
             user = new AppUserBean();  
             row = it.next();  
             AppUser appuser =  (AppUser) ((Map<String,AppUser>)cache.getCacheObject("phoneMap")).get(row.getValues("Username").next().toString());
             user.setJid(row.getValues("jid").next().toString());  
             user.setName(appuser==null?"":appuser.getUsername());  
             user.setImgurl(appuser==null?"":appuser.getShouchiurl());
             user.setUser(row.getValues("Username").next().toString());  
             user.setEmail(row.getValues("Email").next().toString()); 
             results.add(user);  
             //若存在，则有返回,UserName一定非空，其他两个若是有设，一定非空  
         }  
           
         return results;  
    }
	*//** 
	 * 返回所有用户信息 <RosterEntry> 
	 *  
	 * @return List(RosterEntry) 
	 *//*  
	public static List<AppUserBean> getAllEntries(Roster roster) {  
		CacheUtil cache = CacheUtil.getInstance();
	    List<RosterEntry> EntriesList = new ArrayList<RosterEntry>();  
	    List<AppUserBean> results = new ArrayList<AppUserBean>(); 
	    AppUserBean user =null; 
	    Collection<RosterEntry> rosterEntry = roster.getEntries();  
	    Iterator<RosterEntry> i = rosterEntry.iterator();  
	    while (i.hasNext())  
	        EntriesList.add(i.next());  
	    for (RosterEntry rosterEntry1 : EntriesList) {
	    	user= new AppUserBean();
	    	AppUser appuser =  (AppUser) ((Map<String,AppUser>)cache.getCacheObject("phoneMap")).get(rosterEntry1.getName());
	    	user.setJid(rosterEntry1.getUser());
	    	user.setUser(rosterEntry1.getName());
	    	user.setName(appuser==null?"":appuser.getUsername());
	    	user.setImgurl(appuser==null?"":appuser.getShouchiurl());
	    	results.add(user);
		}
	    return results;  
	} 
	*//**
	 * 搜索用户
	 *//*
	public static ArrayList<String> searchUsers(String user,XMPPConnection connection) {
		ArrayList<String> users = new ArrayList<String>();
		UserSearchManager usm = new UserSearchManager(connection);
		Form searchForm = null;
		try {
			searchForm = usm.getSearchForm("search."
					+ connection.getServiceName());
			Form answerForm = searchForm.createAnswerForm();
			answerForm.setAnswer("Username", true);
			answerForm.setAnswer("search", user);
			ReportedData data = usm.getSearchResults(answerForm, "search."
					+ connection.getServiceName());
			// column:jid,Username,Name,Email
			Iterator<Row> it = data.getRows();
			Row row = null;
			while (it.hasNext()) {
				row = it.next();
				users.add(row.getValues("Username").next().toString());
			}
		} catch (XMPPException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	*//**
	 * 添加好友
	 * 
	 * @param user
	 *//*
	public static void addFriend(String user,XMPPConnection connection) {
		try {
			// 添加好友
			Roster roster = connection.getRoster();
			roster.createEntry(user + "@dswx.tsdsfs.com", user,
					new String[] { "friends" });
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
}
