package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.GroupInfoMapper;
import com.example.spring_mybatis.dao.NewMapper;
import com.example.spring_mybatis.dao.NewTwoMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;
import com.example.spring_mybatis.service.iface.NewService;
import com.example.spring_mybatis.service.iface.NewTwoService;

@Service
public class NewTwoServiceImpl implements NewTwoService {
	@Resource
	private NewTwoMapper newTwoMapper;
	@Resource
	private GroupInfoMapper groupInfoMapper;

	@Override
	public List<NewTwo> selectRoleAll() {
		return newTwoMapper.selectRoleAll();
	}

	@Override
	public List<NewTwo> selectRoleAllByRoleName(String roleName) {
		return newTwoMapper.selectRoleAllByRoleName(roleName);
	}

	@Override
	public List<NewTwo> selectRoleAllByGroupId(Integer groupId) {
		List<NewTwo> allRole = newTwoMapper.selectRoleAll();
		GroupInfoWithBLOBs groupRole = groupInfoMapper.selectByPrimaryKey(groupId);
		List<NewTwo> result = new ArrayList<>();
		for (int i = 0; i < allRole.size(); i++) {
			if (groupRole.getRoleId().contains(allRole.get(i).getRoleId())) {

				result.add(allRole.get(i));
			}
		}
		return result;
	}

}
