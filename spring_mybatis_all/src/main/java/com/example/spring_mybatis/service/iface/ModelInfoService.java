package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.ModelInfo;

public interface ModelInfoService {
	int updateByPrimaryKeySelective(ModelInfo record);

	int insertSelective(ModelInfo record);

	List<ModelInfo> selectAllModelInfo();

	int deleteByPrimaryKey(Integer modelId);

	ModelInfo selectByPrimaryKey(Integer modelId);
	
	List<ModelInfo> selectByParentId(Integer modelInfo);
}
