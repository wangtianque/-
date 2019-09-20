package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.RoleJRoleModelInfo;

@Mapper
public interface RoleJModelMapper{
	List<RoleJRoleModelInfo> selectRoleIdCheckUser(@Param("roleId")Integer roleId);
	int inseRtrole(RoleInfo roleInfo);
	int updateUserRoleId(@Param("roleId")String roleId,@Param("userId")String userId);
	int deleteJRolemodel(@Param("roleId")Integer roleId);
	List<RoleJRoleModelInfo> selectAddRoleUser(@Param("roleId")Integer roleId,
											   @Param("userName") String userName,
											   @Param("empName") String empName,
											   @Param("departmentId")String departmentId);
	List<RoleJRoleModelInfo> selectUserRoleFrom(String userId);
	List<RoleJRoleModelInfo> selectGroupRoleId(@Param("RoleId")Integer  roleId ,@Param("groupName")String groupName);
	List<RoleJRoleModelInfo> selectGroupRoleIdAdd(@Param("groupId")Integer groupId);
	int updateGroupinfoRoleId(@Param("roleId")String roleId,@Param("groupId")Integer groupId);
	List<RoleJRoleModelInfo> selectGroupRoleIdAll(@Param("roleId")Integer roleId);
	List<RoleJRoleModelInfo> selectRoleJurisdiction(@Param("roleId")Integer roleId,@Param("modelId")Integer modelId);
	int updateRoleAttribute(@Param("roleName")String roleName,@Param("roleDescription")String roleDescription,@Param("roleId")int roleId);
	List<RoleJRoleModelInfo> selectModelAllLeftTree(@Param("roleId")Integer roleId);
	int updateRoleJurisdiction(@Param("authorization")String authorization,@Param("roleId")int roleId,@Param("modelId")int modelId);
	
	
	
}
