package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.RoleInfo;

public interface IRoleInfoService {
	List<RoleInfo> selectAllList();
//	List<RoleInfo> selectRoleListByUserId(String userId);
	List<RoleInfo> selectRoInfoByRoleId(String roleId);
	List<RoleInfo> selectRoleInfoByRoleName(String roleName);
	int updateByPrimaryKeySelective(RoleInfo record);

	int insertSelective(RoleInfo record);

	int deleteByPrimaryKey(Integer roleId);

	List<RoleInfo> selectAllRoleInfo();
	List<RoleInfo> selectNoAddRoleInfo(String userId);
}
