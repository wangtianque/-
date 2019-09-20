package com.example.spring_mybatis.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JUserModelInfo;
@Mapper
public interface JUserModelInfoMapper {
    int insert(JUserModelInfo record);

    int insertSelective(JUserModelInfo record);
    int deleteByModelId(Integer modelId);
}