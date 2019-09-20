package com.example.spring_mybatis.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.ModelInfoMapper;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.ModelInfo;
import com.example.spring_mybatis.service.iface.ModelInfoService;

@Service
public class ModelInfoServiceImpl implements ModelInfoService {
	@Resource
	private ModelInfoMapper modelInfoMapper;

	@Override
	public int updateByPrimaryKeySelective(ModelInfo record) {
		return modelInfoMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<ModelInfo> selectByParentId(Integer modelInfo) {
		return modelInfoMapper.selectByParentId(modelInfo);
	}

	@Override
	public int insertSelective(ModelInfo record) {
		return modelInfoMapper.insertSelective(record);
	}

	@Override
	public List<ModelInfo> selectAllModelInfo() {
		return modelInfoMapper.selectAllModelInfo();
	}

	@Override
	public int deleteByPrimaryKey(Integer modelId) {
		return modelInfoMapper.deleteByPrimaryKey(modelId);
	}

	@Override
	public ModelInfo selectByPrimaryKey(Integer modelId) {
		return modelInfoMapper.selectByPrimaryKey(modelId);
	}

}
