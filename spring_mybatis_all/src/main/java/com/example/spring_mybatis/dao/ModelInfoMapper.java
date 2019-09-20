package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.ModelInfo;
@Mapper
public interface ModelInfoMapper {
    int deleteByPrimaryKey(Integer modelId);

    int insert(ModelInfo record);

    int insertSelective(ModelInfo record);

    ModelInfo selectByPrimaryKey(Integer modelId);

    int updateByPrimaryKeySelective(ModelInfo record);

    int updateByPrimaryKey(ModelInfo record);
    List<ModelInfo> selectAllModelInfo();

	List<ModelInfo> selectByParentId(Integer modelInfo);

}