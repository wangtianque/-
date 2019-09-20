package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.GroupInfoWithBLOBs;

public interface GroupInfoService {
	int insertSelective(GroupInfoWithBLOBs record);

	List<GroupInfoWithBLOBs> selectAllGroupInfo();
	
	int deleteByPrimaryKey(Integer groupId);
	
	GroupInfoWithBLOBs selectByPrimaryKey(Integer groupId);
	
	int updateByPrimaryKeySelective(GroupInfoWithBLOBs record);
	
	 List<GroupInfoWithBLOBs> selectAllGroupByRoleId(String roleId);
	 
	
	
}
