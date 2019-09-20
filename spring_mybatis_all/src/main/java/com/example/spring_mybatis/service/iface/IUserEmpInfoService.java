package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.github.pagehelper.PageInfo;

public interface IUserEmpInfoService {
	PageInfo<UserEmpInfo> selectAllUserInfo(String userName, String empName, String departmentId,Integer pageNum,Integer pageSize);

	List<UserEmpInfo> selectOne(String userId);

	List<UserEmpInfo> selectUserOne(String userId);

	List<UserEmpInfo> selectAllUser(String userName, String empName, String departmentId);

	List<New>selectUserByNameAndUser(String userName,String empName,String departmentId);
	int updateGroupIdByUserId(String userId);


}
