package com.webul.util.memcached;
import java.util.Date;
import org.apache.log4j.Logger;
import com.danga.MemCached.MemCachedClient;
import com.danga.MemCached.SockIOPool;

public class CacheUtils {
	private final static Logger log = Logger.getLogger(CacheUtils.class);
	
	private static CacheUtils instance = null;
	
	private SockIOPool pool;
	
	private MemCachedClient mcc;
	public CacheUtils() {
		this.init();
	}
	
	public void init(){
		try {
			pool = SockIOPool.getInstance();
			// 开始设置pool属性
			String[] servers = { "54d617005f2b11e4.m.cnqdalicm9pub001.ocs.aliyuncs.com:11211" };
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
		} catch (Exception e) {
			log.error("memcache read file p2p.properties error:" + e);
		}
	}
	/**
	 * 设置缓存过期时间
	 * @param haomiao 毫秒数
	 * @return
	 */
	public Date getCacheExpireTime(long haomiao){
		long curtime=new Date().getTime();
		return new Date(curtime+haomiao);
	}
	public static CacheUtils getInstance() {
		if (instance == null) {
			synchronized (log) {
				instance = new CacheUtils();
			}
		}
		return instance;
	}

	public String getCache(String key) {
		if (log.isDebugEnabled()) {
			log.debug("memcache get key: " + key);
		}
		return (String) mcc.get(key);
	}

	public Object getCacheObject(String key) {
		if (log.isDebugEnabled()) {
			log.debug("memcache get key: " + key);
		}
		return mcc.get(key);
	}

	public boolean putCache(String key, String value, Date expireTime) {
		if (log.isDebugEnabled()) {
			log.debug("memcache put key:" + key + " value:" + value);
		}
		return mcc.set(key, value, expireTime);
	}

	public boolean putCache(String key, Object value, Date expireTime) {
		if (log.isDebugEnabled()) {
			log.debug("memcache put key:" + key + " value:" + value);
		}
		return mcc.set(key, value, expireTime);
	}

	public boolean putCache(String key, Object value) {
		if (log.isDebugEnabled()) {
			log.debug("memcache put key:" + key + " value:" + value);
		}
		return mcc.set(key, value);
	}

	public boolean delCache(String key) {
		if (log.isDebugEnabled()) {
			log.debug("memcache del key:" + key);
		}
		return mcc.delete(key);
	}
	
}
