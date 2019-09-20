package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JRoleModelInfo;

@Mapper
public interface JRoleModelInfoExtendMapper {
	List<JRoleModelInfo> selectAllRoleModelInfo(Integer roleId);
	
}
