package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JRoleLeftTreeInfo;
import com.example.spring_mybatis.model.ModelInfo;
@Mapper
public interface ModelMapper extends ModelInfoMapper{
	
	List<JRoleLeftTreeInfo> selectRoleAll();
}
