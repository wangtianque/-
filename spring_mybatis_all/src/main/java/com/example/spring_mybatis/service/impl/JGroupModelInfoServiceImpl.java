package com.example.spring_mybatis.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.JGroupModelInfoMapper;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.service.iface.JGroupModelInfoService;

@Service
public class JGroupModelInfoServiceImpl implements JGroupModelInfoService {
	@Resource
	private JGroupModelInfoMapper jGroupModeInfoMapper;

	@Override
	public int insertSelective(JGroupModelInfo record) {
		return jGroupModeInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKey(Integer groupId) {
		return jGroupModeInfoMapper.deleteByPrimaryKey(groupId);
	}

	@Override
	public List<JGroupModelInfo> selectModelInfo(Integer groupId) {
		return jGroupModeInfoMapper.selectModelInfo(groupId);
	}

	@Override
	public int selectModelId(Integer groupId) {
		return jGroupModeInfoMapper.selectModelId(groupId);
	}

	@Override
	public int updateAuthorizationByGroupId(String authorization, Integer groupId, Integer modelId) {
		return jGroupModeInfoMapper.updateAuthorizationByGroupId(authorization, groupId, modelId);
	}

	@Override
	public List<JGroupModelInfo> selectModelInfoAll() {
		return jGroupModeInfoMapper.selectModelInfoAll();
	}

	@Override
	public int insertModle(Integer groupId, Integer modelId, String authorization) {
		return jGroupModeInfoMapper.insertModle(groupId, modelId, authorization);
	}

	@Override
	public List<JGroupModelInfo> selectGroupModelInfoAll() {
		return jGroupModeInfoMapper.selectGroupModelInfoAll();
	}
	@Override
	public int deleteByModelId(Integer modelId) {
		return jGroupModeInfoMapper.deleteByModelId(modelId);
	}
}
