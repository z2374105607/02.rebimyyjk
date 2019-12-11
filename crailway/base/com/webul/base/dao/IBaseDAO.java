package com.webul.base.dao;
import java.io.Serializable;
import java.util.List;
public interface IBaseDAO<T> {
	/**
	 * @描述 添加一条数据到数据库
	 * @param object
	 */
	public void save(T object);
	/**
	 * @描述 根据持久化对象的主键添加或者更新一条数据
	 * @param object
	 */
	public void saveOrUpdate(T object);
	/**
	 * @描述 批量添加
	 * @param object
	 */
	public void batchSave(List<T> list);
	/**
	 * 执行delete hql删除
	 * @param hql
	 * @param objects 参数
	 */
	public int deleteByHql(String hql,Object...objects);
	/**
	 * 执行delete 删除list中所有的实体
	 * @param hql
	 * @param objects 参数
	 */
	public void deleteAll(List<T> list);
	/**
	 * 执行更新操作
	 * @param hql
	 * @param objects
	 * @return
	 */
	public Integer updateByHql(String hql,Object...objects);
	/**
	 * 根据主键ID获取记录
	 * @param id
	 * @return
	 */
	public T getById(Serializable id);
	/**
	 * 根据hql 语句检索数据
	 * @param hql
	 * @param objects
	 * @return list
	 */
	public List<T> findByHql(String hql,Object...objects);
	/**
	 * 分页查询
	 * @param hql hql语句
	 * @param pageNo 当前页数
	 * @param pageSize 每页大小
	 * @return
	 */
	public Page pageQuqry(String hql,int pageNo,int pageSize,Object...objects);
	/**
	 * 执行Sql查询
	 * @param hql
	 * @param objects
	 * @return
	 */
	public List<Object> executeSqlQuery(String sql,Object...objects);
	/**
	 * 执行Sql查询
	 * @return
	 */
	public int executeSqlQuery2(String sql,Object...objects);
	/**
	 * 执行SQL更新
	 * @param sql
	 * @param objects
	 * @return
	 */
	public Integer executeSqlUpdate(String sql,Object...objects);
	
	public List<T> executeSqlQueryT(final Class<T> cla,final String sql, final Object... objects);
	
}
