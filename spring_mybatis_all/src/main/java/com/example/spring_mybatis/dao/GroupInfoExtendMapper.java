package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.GroupInfo;

@Mapper
public interface GroupInfoExtendMapper extends GroupInfoMapper {
	
	List<GroupInfo> selectGroupInfoByGroupName(String groupName);
}
