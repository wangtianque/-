package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.JGroupModelInfo;
@Mapper
public interface JGroupModelInfoExtendMapper {
List<JGroupModelInfo> selectAllGroupModelInfo(Integer groupId);
}
