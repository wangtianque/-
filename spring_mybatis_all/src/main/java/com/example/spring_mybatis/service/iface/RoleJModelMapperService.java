package com.example.spring_mybatis.service.iface;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.spring_mybatis.model.JRoleLeftTreeInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.RoleJRoleModelInfo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

public interface RoleJModelMapperService {
	List<RoleInfo> selectRoleAll();
	List<RoleJRoleModelInfo> selectRoleIdCheckUser(Integer roleId);
	int insertSelective(JRoleModelInfo jRoleModelInfo);
	 List<JRoleLeftTreeInfo> selectLeftTree();
	 Integer inseRtrole(RoleInfo roleInfo);
	 Integer deleteByPrimaryKey(Integer roleId);
	 int updateUserRoleId(String roleId,String userId);
	 int deleteJRolemodel(Integer roleId);
	 List<RoleJRoleModelInfo>selectAddRoleUser(Integer roleId,String userName,String empName,String departmentId);
	int selectUserRoleFrom(String roleId , String userId); 
	List<RoleJRoleModelInfo> selectRoleIdRoleUser(String userId);
	List<RoleJRoleModelInfo> selectGroupRoleId(int roleId);
	List<RoleJRoleModelInfo> selectRoleGroupAll(int roleId ,String groupName);
	int updateGroupinfoRoleId(String roleId,Integer groupId);
	List<RoleJRoleModelInfo> selectGroupRoleIdAdd(Integer roleId);
	int selectGroupRoleId(String roleId,int groupId);
	List<RoleJRoleModelInfo> selectRoleJurisdiction(int roleId,int modelId);
	List<RoleJRoleModelInfo> selectModelAllLeftTree(int roleId);
	int updateRoleAttribute(String roleName,String roleDescription,int  roleId);
	int updateRoleJurisdiction(String authorization,int roleId,int modelId);
}
