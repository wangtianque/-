package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.model.New;

@Mapper
public interface NewMapper {
	
	List<New> selectUser(Integer groupId);
	
	List<New> selectUserAll();
	List<New>selectAllUserInfoByNew();
	
	


	
}
