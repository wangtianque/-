package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.ModelTree;

@Mapper
public interface ModelInfoExtendMapper extends ModelInfoMapper{
	List<ModelTree> getModelInfo();
}
