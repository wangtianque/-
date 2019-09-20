package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.JRoleModelInfo;

public interface JRoleModelInfoService {
	int insertSelective(JRoleModelInfo record);

	int deleteByPrimaryKey(Integer roleId);

	List<JRoleModelInfo>  selectByPrimaryKey(Integer roleId);

	List<JRoleModelInfo> selectRoleModelInfoAll();

	int deleteByModelId(Integer modelId);
	
}
