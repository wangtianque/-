package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.RoleJRoleModelInfo;

@Mapper
public interface RoleInfoExtendMapper  {
	List<RoleInfo>selectAllRoleList();

	RoleInfo selectRoleListByRoleId(Integer roleId);
	
	List<RoleInfo>selectRoleInfoByRoleName(String roleName);

	List<RoleInfo> selectAllRoleInfo();
	
	
	
	
	

}
