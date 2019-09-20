package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.Department;
import com.example.spring_mybatis.model.DepartmentInfo;

@Mapper
public interface DepartmentMapper {
	
	//添加
    int insert(Department departmentInfo);
    
    //查看
    List<Department> selectByPrimaryKey(String departmentId);

    //修改	
	int updateByPrimaryKey(Department departmentId);
	
	//删除
	int deleteByPrimaryKey(Department departmentId);
	
	//直接查看全部
	List<Department> selectAll();
	
	//直接查看全部
	List<Department> selectAllForParentIdDepartmentId();

}