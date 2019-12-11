package com.webul.base.dao;

public class SqlUtil {

	public static String handlePageHql(String hql){
		Integer fromIndex=hql.indexOf("from");
		if(fromIndex>=0){
			hql="select count(*) "+hql.substring(fromIndex);
		}
		return hql;
	}
}
