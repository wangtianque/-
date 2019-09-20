package com.example.spring_mybatis.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.dao.UserInfoMapper;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.service.iface.IUserEmpInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UserEmpInfoServiceImpl implements IUserEmpInfoService {
	@Resource
	UserInfoExtendMapper userInfoExtendMapper;


	@Override
	public PageInfo<UserEmpInfo> selectAllUserInfo(String userName, String empName, String departmentId,Integer pageNum,Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<UserEmpInfo> list = userInfoExtendMapper.selectAllUserInfo(userName, empName, departmentId);
		PageInfo<UserEmpInfo> result = new PageInfo<>(list);
		return result;

	}
	@Override
	public List<UserEmpInfo> selectAllUser(String userName, String empName, String departmentId) {
	
		return  userInfoExtendMapper.selectAllUser();

	}
	@Override
	public List<New>selectUserByNameAndUser(String userName,String empName,String departmentId){
		return  userInfoExtendMapper.selectUserByNameAndUser(userName, empName, departmentId);
	}
	@Override
	public int updateGroupIdByUserId(String userId) {
		return userInfoExtendMapper.updateGroupIdByUserId(userId);
	}

	@Override
	public List<UserEmpInfo> selectOne(String userId) {
		return userInfoExtendMapper.selectOne(userId);
	}

	@Override
	public List<UserEmpInfo> selectUserOne(String userId) {
		return userInfoExtendMapper.selectUserOne(userId);
	}
}
