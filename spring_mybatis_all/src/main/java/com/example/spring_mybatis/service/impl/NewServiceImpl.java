package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.NewMapper;
import com.example.spring_mybatis.dao.NewTwoMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.service.iface.NewService;

@Service
public class NewServiceImpl implements NewService {
	@Resource
	private NewMapper newMapper;
	@Resource
	private NewTwoMapper newTwoMapper;

	@Override
	public List<New> selectUser(Integer groupId) {

		return newMapper.selectUser(groupId);

	}

	@Override
	public List<New> selectUserAll() {

		return newMapper.selectUserAll();

	}

	@Override
	public List<New> selectUserByGroupId(String groupId) {
		List<New> allUserList = newMapper.selectAllUserInfoByNew();
		List<New> result = new ArrayList<>();
		try {
			allUserList.forEach(item -> {
				if (item.getGroupId().contains(groupId)) {
					result.add(item);
				}
			});
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return result;
	}

}
