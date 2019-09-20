package com.example.spring_mybatis.service.iface;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.spring_mybatis.model.LGInfo;
import com.example.spring_mybatis.model.logInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

public interface ILGInfo {
	List<LGInfo> all();
	int insert(logInfo lgInfo);
	List<LGInfo> selectUserPassword();
	PageInfo<LGInfo> getList(Integer pagesize,Integer pagenum,Long fromTime,Long endTime);
	PageInfo<LGInfo> selectTime(Integer pagesize,Integer pagenum,Date from , Date end , String userName);
}
