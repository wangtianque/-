package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

public interface IUserInfoService {
	int addUser(UserInfoWithBLOBs userInfo);


	String selectPassword(String userId);

	int updateByPrimaryKeySelective(UserInfoWithBLOBs record);

	int updatePWDById(String userId);

	int deleteByuserId(String userId);

	String selectUserNameByUserName(String userName);

	List<String> selectEmpIdByEmpId(String empId,String userName);
	int updateRoleInfoByUserId(String userId,String roleId,String operator);
	int updateGroupInfoByUserId(String userId,String roleId,String operator);
	List<UserInfoWithBLOBs> selectUserInfoAll();
	UserInfoWithBLOBs selectByPrimaryKey(String userId);
	int updateGroupIdByUserId(UserInfoWithBLOBs userInfo);
}
