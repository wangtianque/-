package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.GroupInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
@Mapper
public interface GroupInfoMapper {
    int deleteByPrimaryKey(Integer groupId);

    int insert(GroupInfoWithBLOBs record);

    int insertSelective(GroupInfoWithBLOBs record);

    GroupInfoWithBLOBs selectByPrimaryKey(Integer groupId);

    int updateByPrimaryKeySelective(GroupInfoWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(GroupInfoWithBLOBs record);

    int updateByPrimaryKey(GroupInfo record);
    
 List<GroupInfoWithBLOBs> selectAllGroupInfo();
    
    List<GroupInfoWithBLOBs> selectAllGroupByRoleId(String roleId);

}