package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JUserModelInfo;

@Mapper
public interface JUserModelInfoExtendMapper {
	int insertUserModelInfo(String userId,int modelId,String authorization);
	int updateUserModelInfoByUserId(String userId,int modelId,String authorization);
	List<JUserModelInfo> selectJUserModelInfoByUserId(String userId);
}
