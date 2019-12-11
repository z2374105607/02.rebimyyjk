package com.webul.base.dao;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
public class BaseDAObak<T> extends HibernateDaoSupport implements IBaseDAO<T> {
	/**
	 * 向DAO层注入SessionFactory
	 */
	@Resource
	public void setMySessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}
	/**
	 * @描述 添加一条数据到数据库
	 * @param object
	 */
	public void save(T object) {
		this.getHibernateTemplate().save(object);
	}
	/**
	 * @描述 根据持久化对象的主键添加或者更新一条数据
	 * @param object
	 */
	public void saveOrUpdate(T object) {
		this.getHibernateTemplate().saveOrUpdate(object);
	}
	/**
	 * @描述 批量添加
	 * @param object
	 */
	public void batchSave(final List<T> list) {
		int rows=0;
		for (int i = 0; list!=null&&i < list.size(); i++) {
			if(list.get(i)==null){
				continue;
			}
			rows++;
			this.getHibernateTemplate().saveOrUpdate(list.get(i));
			if(rows%500==0){
				this.getHibernateTemplate().flush();
				this.getHibernateTemplate().clear();
			}
		}
	}
	/**
	 * 执行delete hql删除
	 * @param hql
	 * @param objects 参数
	 */
	public int deleteByHql(final String hql, final Object... objects) {
		return this.getHibernateTemplate().execute(new HibernateCallback<Integer>() {
			public Integer doInHibernate(Session session) throws HibernateException,SQLException {
				Query query = session.createQuery(hql);
				if (objects != null && objects.length > 0) {
					for (int i = 0; i < objects.length; i++) {
						query.setParameter(i, objects[i]);
					}
				}
				Integer counts=query.executeUpdate();
				return counts;
			}
		});
	}
	/**
	 * 执行delete 删除list中所有的实体
	 * @param hql
	 * @param objects 参数
	 */
	public void deleteAll(List<T> list) {
		this.getHibernateTemplate().deleteAll(list);
	}
	/**
	 * 执行delete 删除list中所有的实体
	 * @param hql
	 * @param objects 参数
	 */
	public void deleteEntity(T entity) {
		this.getHibernateTemplate().delete(entity);
	}
	/**
	 * 执行更新操作
	 * @param hql
	 * @param objects
	 * @return
	 */
	public Integer updateByHql(String hql, Object... objects) {
		return this.getHibernateTemplate().bulkUpdate(hql, objects);
	}
	/**
	 * 根据主键ID获取记录
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T getById(Serializable id) {
		Class<T> clazz = (Class<T>) GenricsUtils.getSuperClassGenricType(this.getClass());
		return (T) this.getHibernateTemplate().get(clazz, id);
	}
	/**
	 * 根据hql 语句检索数据
	 * @param hql
	 * @param objects
	 * @return list
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByHql(String hql, Object... objects) {
		return this.getHibernateTemplate().find(hql, objects);
	}
	/**
	 * 分页查询
	 * @param hql hql语句
	 * @param pageNo 当前页数
	 * @param pageSize 每页大小
	 * @return
	 */
	public Page pageQuqry(final String hql, final int pageNo, final int pageSize,final Object... objects) {
		Object data=this.getHibernateTemplate().execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException,SQLException {
				Query query = session.createQuery(hql);
				for (int i = 0; objects != null && i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				query.setFirstResult(pageSize*(pageNo-1));
				query.setMaxResults(pageSize);
				return query.list();
			}
		});
		long totalCount=(Long) this.getHibernateTemplate().find(SqlUtil.handlePageHql(hql),objects).get(0);
		return new Page(0, totalCount, pageSize, data);
	}
	/**
	 * 分页查询
	 * @param hql hql语句
	 * @param pageNo 当前页数
	 * @param pageSize 每页大小
	 * @return
	 */
	public Page pageSqlQuqry(final String sql,String sqlCount, final int pageNo, final int pageSize,final Object... objects) {
		Object data=this.getHibernateTemplate().execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException,SQLException {
				Query query = session.createSQLQuery(sql);
				for (int i = 0; objects != null && i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				
				query.setFirstResult(pageSize*(pageNo-1));
				query.setMaxResults(pageSize);
				return query.list();
			}
		});
		
		Integer totalCount=executeSqlQueryCount(sqlCount,objects);
		return new Page(0, totalCount, pageSize, data);
	}
	/**
	 * 获得固定数量的数据
	 * @param hql hql语句
	 * @param rowstart 开始
	 * @param size 大小
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Object> findLimitResult(final String hql, final int rowstart, final int size,final Object... objects) {
		System.out.println(rowstart);
		Object data=this.getHibernateTemplate().execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException,SQLException {
				Query query = session.createQuery(hql);
				for (int i = 0; objects != null && i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				query.setFirstResult(rowstart);
				query.setMaxResults(size);
				return query.list();
			}
		});
		List<Object> ls=new ArrayList<Object>();
		if(data!=null){
			ls=(List<Object>) data;
		}
		return ls;
	}
	/**
	 * 执行Sql查询
	 * @param sql
	 * @param objects
	 * @return
	 */
	public List<Object> executeSqlQuery(final String sql, final Object... objects) {
		List<Object> obj=this.getHibernateTemplate().execute(new HibernateCallback<List<Object>>() {
			@SuppressWarnings("unchecked")
			public List<Object> doInHibernate(Session session) throws HibernateException,SQLException {
				Query query=session.createSQLQuery(sql);
				
				for (int i = 0; objects!=null&&i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				return query.list();
			}
		});
		return obj;
	}
	/**

	 * 执行Sql查询
	 * @param sql
	 * @param objects
	 * @return
	 */
//	public List<T> executeSqlQueryT(final Class<T> cla,final String sql, final Object... objects) {
//		List<T> obj=this.getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
//			@SuppressWarnings("unchecked")
//			public List<T> doInHibernate(Session session) throws HibernateException,SQLException {
//				Query query=session.createSQLQuery(sql);
//				
//				for (int i = 0; objects!=null&&i < objects.length; i++) {
//					query.setParameter(i, objects[i]);
//				}
//				return query.list();
//			}
//		});
//		return obj;
//	}
	/**

	 * 执行Sql查询,并返回实体对象
	 * @param sql
	 * @param objects
	 * @return
	 */
	public List<T> executeSqlQueryT(final Class<T> cla,final String sql, final Object... objects) {
		List<T> obj=this.getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@SuppressWarnings("unchecked")
			public List<T> doInHibernate(Session session) throws HibernateException,SQLException {
				Query query=session.createSQLQuery(sql);
				
				for (int i = 0; objects!=null&&i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				return query.setResultTransformer(Transformers.aliasToBean(cla)).list();
			}
		});
		return obj;
	}
	
	/**

	 * 执行SQL更新
	 * @param sql
	 * @param objects
	 * @return
	 */
	public Integer executeSqlUpdate(final String sql, final Object... objects) {
		Integer nums=this.getHibernateTemplate().execute(new HibernateCallback<Integer>() {
			public Integer doInHibernate(Session session) throws HibernateException,
					SQLException {
				Query query=session.createSQLQuery(sql);
				for (int i = 0; objects!=null&&i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				return query.executeUpdate();
			}
		});
		return nums;
	}
	/**
	 * 查询数量
	 * @param hql
	 * @param objects
	 * @return
	 */
	public int queryForInt(String hql,Object... objects){
		Long count = (Long) this.getHibernateTemplate().find(hql,objects).get(0);
		return count.intValue();
	}
	
	/**
	 * 执行Sql查询
	 * @param hql
	 * @param objects
	 * @return
	 */
	public Integer executeSqlQueryCount(final String sql, final Object... objects) {
		Integer num=this.getHibernateTemplate().execute(new HibernateCallback<Integer>() {
			@SuppressWarnings("unchecked")
			public Integer doInHibernate(Session session) throws HibernateException,SQLException {
				Query query=session.createSQLQuery(sql);
				for (int i = 0; objects != null && i < objects.length; i++) {
					query.setParameter(i, objects[i]);
				}
				return ((Number)query.uniqueResult()).intValue();
			}
		});
		return num;
	}
	public int executeSqlQuery2(final String sql, Object... objects) {
		Integer nums=this.getHibernateTemplate().execute(new HibernateCallback<Integer>() {
			@SuppressWarnings("unchecked")
			public Integer doInHibernate(Session session) throws HibernateException,SQLException {
				Query query=session.createSQLQuery(sql);
				 return query.executeUpdate();	
				 
			}
		});
		return 0;
	}
}
