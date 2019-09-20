package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.JRoleModelInfoMapper;
import com.example.spring_mybatis.dao.NewMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.service.iface.JRoleModelInfoService;
import com.example.spring_mybatis.service.iface.NewService;

@Service
public class JRoleModelInfoServiceImpl implements JRoleModelInfoService {
	@Resource
	private JRoleModelInfoMapper jRoleModelInfoMapper;

	@Override
	public int insertSelective(JRoleModelInfo record) {
		return jRoleModelInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKey(Integer roleId) {
		return jRoleModelInfoMapper.deleteByPrimaryKey(roleId);
	}

	@Override
	public List<JRoleModelInfo>  selectByPrimaryKey(Integer roleId) {
		return jRoleModelInfoMapper.selectByPrimaryKey(roleId);
	}

	@Override
	public List<JRoleModelInfo> selectRoleModelInfoAll() {
		return jRoleModelInfoMapper.selectRoleModelInfoAll();
	}

	@Override
	public int deleteByModelId(Integer modelId) {
		return jRoleModelInfoMapper.deleteByModelId(modelId);
	}

}
