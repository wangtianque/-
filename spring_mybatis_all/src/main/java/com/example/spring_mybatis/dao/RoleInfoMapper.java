package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.RoleInfo;
@Mapper
public interface RoleInfoMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(RoleInfo record);

    int insertSelective(RoleInfo record);

    RoleInfo selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(RoleInfo record);

    int updateByPrimaryKeyWithBLOBs(RoleInfo record);

    int updateByPrimaryKey(RoleInfo record);

	List<RoleInfo> selectAllRoleInfo();

	


 
}