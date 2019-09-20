package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.JUserModelInfo;

public interface IJUserModelInfoService {
 int updataUserModelInfoByUserId(String userId,String modelId,String authorization);
 int insertUserModelInfo(String userId,String modelId,String authorization);
 List<JUserModelInfo> selctUserModelInfoByUserId(String userId);
 int insertSelective(JUserModelInfo record);

	int deleteByModelId(Integer modelId);
	
}
