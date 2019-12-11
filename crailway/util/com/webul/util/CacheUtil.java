package com.webul.util;

import java.util.Date;
import java.util.HashMap;

import org.apache.log4j.Logger;

import com.danga.MemCached.MemCachedClient;
import com.danga.MemCached.SockIOPool;
//import com.kong.wot.hd.herolist20120223.memcached.CacheKey;







/**
 * @author shen.hai
 * 
 */
public final class CacheUtil {
	private final static Logger log = Logger.getLogger(CacheUtil.class);

	private static CacheUtil instance = null;
	private SockIOPool pool;
	private MemCachedClient mcc;

	private CacheUtil() {
		this.init();
	}

	/**
	 * 
	 */
	private void init() {
		try {
			pool = SockIOPool.getInstance();
			// 开始设置pool属性
			String[] servers = {"127.0.0.1:11211"};
			// grab an instance of our connection pool
			pool.setServers(servers);
			// set some basic pool settings
			pool.setInitConn(10);
			pool.setMinConn(10);
			pool.setMaxConn(200);
			pool.setMaxIdle(1000 * 60 * 60 * 6);

			// set the sleep for the maint thread
			// it will wake up every x seconds and
			// maintain the pool size
			pool.setMaintSleep(30);

			// set some TCP settings
			// disable nagle
			// set the read timeout to 3 secs
			// and don't set a connect timeout
			pool.setNagle(false);
			pool.setSocketTO(3000);
			pool.setSocketConnectTO(0);

			// initialize the connection pool
			pool.initialize();

			// get client instance
			mcc = new MemCachedClient();
			// 开始设置 mcc属性
			// lets set some compression on for the client
			// compress anything larger than 64k
			mcc.setCompressEnable(true);
			mcc.setCompressThreshold(64 * 1024);
		} catch (Exception e) {
			log.error("memcache read file p2p.properties error:" + e);
		}
	}

	public static CacheUtil getInstance() {
		if (instance == null) {
			synchronized (log) {
				instance = new CacheUtil();
			}
		}
		return instance;
	}

	public String getCache(String key) {
		if(log.isDebugEnabled()){
			log.debug("memcache get key: "+key);
		}
		return (String) mcc.get(key);
	}
	public Object getCacheObject(String key) {
		if(log.isDebugEnabled()){
			log.debug("memcache get key: "+key);
		}
		return  mcc.get(key);
	}

	public boolean putCache(String key, String value,Date expireTime) {
		if(log.isDebugEnabled()){
			log.debug("memcache put key:"+key+" value:"+value);
		}
		return mcc.set(key, value,expireTime);
	}
	public boolean putCache(String key, Object value,Date expireTime) {
		if(log.isDebugEnabled()){
			log.debug("memcache put key:"+key+" value:"+value);
		}
		return mcc.set(key, value,expireTime);
	}
	
	public boolean putCache(String key, Object value) {
		if(log.isDebugEnabled()){
			log.debug("memcache put key:"+key+" value:"+value);
		}
		return mcc.set(key, value);
	}
	
	public boolean delCache(String key) {
		if(log.isDebugEnabled()){
			log.debug("memcache del key:"+key);
		}
		return mcc.delete(key);
	}
	 public static void main(String[] args)
	    {
		 CacheUtil cache = CacheUtil.getInstance();
	        long startDate=System.currentTimeMillis();
	        System.out.println(startDate);
	        for (int i = 0; i < 10000; i++) {
	        cache.putCache("test"+i , "中国");
	        }
	        long endDate=System.currentTimeMillis();
	        cache.putCache("AppgetCode", new HashMap<String,Integer>());  
	        cache.getCacheObject("1234566777");
	        long nowDate=(endDate-startDate)/1000;
	        Date date=new Date(2000000);
	        System.out.println(date);
	        System.out.print( " get value : " + cache.getCache( "test1" ));
	    }
}