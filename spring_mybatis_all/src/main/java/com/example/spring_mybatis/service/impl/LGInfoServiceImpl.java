package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.LogInfoExtendMapper;
import com.example.spring_mybatis.dao.logInfoMapper;
import com.example.spring_mybatis.model.LGInfo;
import com.example.spring_mybatis.model.logInfo;
import com.example.spring_mybatis.service.iface.ILGInfo;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;



@Service
public class LGInfoServiceImpl implements ILGInfo{
	@Resource
	@Autowired
	LogInfoExtendMapper logInfoExtendMapper;
	public List<LGInfo> all(){
		return logInfoExtendMapper.all();
	}
	public int insert(logInfo lgInfo) {
		return  logInfoExtendMapper.insert(lgInfo);
	}
	public List<LGInfo> selectUserPassword(){
		return logInfoExtendMapper.selectUserPassword();
	}
	public PageInfo<LGInfo> getList(Integer pagesize,Integer pagenum,Long fromTime,Long endTime){
		PageHelper.startPage(pagesize,pagenum);
		List<LGInfo> all = logInfoExtendMapper.all();
		
		PageInfo<LGInfo> result = new PageInfo<>(all);
		return result;
	}
	public PageInfo<LGInfo> selectTime(Integer pagesize,Integer pagenum,Date from , Date end , String userName){
		PageHelper.startPage(pagesize,pagenum);
		String username = userName;
		if(userName==null||userName=="") {
			userName = null;
		}
		List<LGInfo> selectTime = logInfoExtendMapper.selectTime(from, end,userName);
		PageInfo<LGInfo> result = new PageInfo<>(selectTime);
		return result;
	}
}
