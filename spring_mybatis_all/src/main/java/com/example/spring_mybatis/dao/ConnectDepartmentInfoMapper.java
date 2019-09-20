package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.LeftTree;

@Mapper
public interface ConnectDepartmentInfoMapper {
	List<DepartmentInfo> selectAllDepartmentName();

	List<LeftTree> selectAllDepartmentNameNoDel();
	List<DepartmentInfo> selectAllChilder(String departmentId);
	int updateIsDel(String deparmentId);
	
	List<DepartmentInfo> selectAllDepartmentNameAll();
}
