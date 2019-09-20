package com.example.spring_mybatis.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

@Mapper

public interface UserInfoMapper {
	int deleteByPrimaryKey(String userId);

	int insert(UserInfoWithBLOBs record);

	int insertSelective(UserInfoWithBLOBs record);

	UserInfoWithBLOBs selectByPrimaryKey(String userId);

	int updateByPrimaryKeySelective(UserInfoWithBLOBs record);

	int updateByPrimaryKeyWithBLOBs(UserInfoWithBLOBs record);

	int updateByPrimaryKey(UserInfo record);

	List<UserInfoWithBLOBs>selectUserInfoAll();

}