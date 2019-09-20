package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;
import com.github.pagehelper.PageInfo;
@Mapper
public interface UserInfoExtendMapper extends UserInfoMapper{
	List<UserInfo> selectAll();

	List<UserEmpInfo> selectAllUserInfo(String userName, String empName, String departmentId);

	List<UserEmpInfo> selectOne(String userId);

	String selectPassword(String userId);

	int addUser(UserInfoWithBLOBs userInfo);

	int updatePWDById(String userId);

	int deleteByuserId(String userId);

	List<UserEmpInfo> selectUserOne(String userId);

	String selectUserNameByUserName(String userName);
	
	List<String> selectEmpIdByEmpId(String empId,String userName);

	List<UserEmpInfo> selectAllUser();
	
	int updateRoleInfoByUserId(String userId,String roleId);
	
	int updateGroupInfoByUserId(String userId,String groupId);
	
	List<New> selectAllUserInfoByNew();

	List<New>selectUserByNameAndUser(String userName,String empName,String departmentId);
	int updateGroupIdByUserId(String userId);


}
