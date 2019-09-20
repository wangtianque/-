package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.EmpInfo;

@Mapper
public interface ConnectEmpInfoMapper {
	List<EmpInfo> selectByNumNameDepartmentId(String empNum, String empName, String departmentId);

	int updateIsDel(String empId);

	List<EmpInfo> selectEmpInfoAll();
	
	List<String> selectEmpNumRepeat(String empNum);
	
	
	
}
