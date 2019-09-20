package com.example.spring_mybatis.dao;

import com.example.spring_mybatis.model.logInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.LGInfo;
@Mapper
public interface logInfoMapper {
    int deleteByPrimaryKey(String logId);

    int insert(logInfo record);

    int insertSelective(logInfo record);

    logInfo selectByPrimaryKey(String logId);

    int updateByPrimaryKeySelective(logInfo record);

    int updateByPrimaryKeyWithBLOBs(logInfo record);

    int updateByPrimaryKey(logInfo record);
    
    
}