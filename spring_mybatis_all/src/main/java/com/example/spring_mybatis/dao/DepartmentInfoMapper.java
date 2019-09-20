package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.DepartmentInfo;
@Mapper
public interface DepartmentInfoMapper {
    int deleteByPrimaryKey(String departmentId);

    int insert(DepartmentInfo record);

    int insertSelective(DepartmentInfo record);

    List<DepartmentInfo> selectByPrimaryKey(String departmentId);

    int updateByPrimaryKeySelective(DepartmentInfo record);

    int updateByPrimaryKeyWithBLOBs(DepartmentInfo record);

    int updateByPrimaryKey(DepartmentInfo record);
    

    
    
}