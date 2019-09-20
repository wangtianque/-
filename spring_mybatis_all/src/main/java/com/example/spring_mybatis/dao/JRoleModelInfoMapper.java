package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JRoleModelInfo;
@Mapper
public interface JRoleModelInfoMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(JRoleModelInfo record);

    int insertSelective(JRoleModelInfo record);

    List<JRoleModelInfo> selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(JRoleModelInfo record);

    int updateByPrimaryKey(JRoleModelInfo record);

	List<JRoleModelInfo> selectRoleModelInfoAll();
	int deleteByModelId(Integer modelId);

}