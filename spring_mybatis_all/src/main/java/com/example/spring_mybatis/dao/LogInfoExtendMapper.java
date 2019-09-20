package com.example.spring_mybatis.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.spring_mybatis.model.LGInfo;

@Mapper
public interface LogInfoExtendMapper extends logInfoMapper {
	List<LGInfo> all();
    List<LGInfo> selectTime(@Param("from")Date fromTime,@Param("end")Date endTime ,@Param("userName")String userName);
    List<LGInfo> selectUserPassword();
}
