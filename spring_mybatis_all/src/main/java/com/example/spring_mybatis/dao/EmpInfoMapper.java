package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.EmpInfo;

@Mapper
public interface EmpInfoMapper {
	
//	public List<String> getEmpNum(String empNum);
	
	int deleteByPrimaryKey(String empId);

	int insert(EmpInfo record);

	int insertSelective(EmpInfo record);

	List<EmpInfo> selectByPrimaryKey(String empId);

	int updateByPrimaryKeySelective(EmpInfo record);

	int updateByPrimaryKeyWithBLOBs(EmpInfo record);

	int updateByPrimaryKey(EmpInfo record);

	List<EmpInfo>selectEmpInfoAll();

}