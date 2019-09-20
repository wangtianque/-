package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JGroupModelInfo;
@Mapper
public interface JGroupModelInfoMapper {
    int insert(JGroupModelInfo record);

    int insertSelective(JGroupModelInfo record);
    
    List<JGroupModelInfo> selectModelInfo(Integer groupId);

	int selectModelId(Integer groupId);

	int updateAuthorizationByGroupId(String authorization, Integer groupId, Integer modelId);

	List<JGroupModelInfo> selectModelInfoAll();

	int insertModle(Integer groupId, Integer modelId, String authorization);

	int deleteByPrimaryKey(Integer groupId);

	List<JGroupModelInfo> selectGroupModelInfoAll();

	int deleteByModelId(Integer modelId);
}