package com.example.spring_mybatis.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.ConnectDepartmentInfoMapper;
import com.example.spring_mybatis.dao.DepartmentInfoMapper;
import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.LeftTree;
import com.example.spring_mybatis.service.iface.IDepartmentInfoService;

@Service
public class DepartmentInfoServiceImpl implements IDepartmentInfoService{
	@Resource
	private DepartmentInfoMapper departmentInfoMapper;
	@Resource
	private ConnectDepartmentInfoMapper connectDepartmentInfoMapper;
	@Override
	public List<DepartmentInfo> selectAllDepartmentNameAll(){
		return connectDepartmentInfoMapper.selectAllDepartmentNameAll();
	}
	@Override
	public List<DepartmentInfo> selectAllDepartmentName(){
		return connectDepartmentInfoMapper.selectAllDepartmentName();
	}
	@Override
	public List<LeftTree> selectAllDepartmentNameNoDel(){
		return connectDepartmentInfoMapper.selectAllDepartmentNameNoDel();
	}
	@Override
	public int insertSelective(DepartmentInfo record) {
		Date date = new Date();
		record.setcTime(date);
		return departmentInfoMapper.insertSelective(record);
	}
	@Override
	public int updateByPrimaryKeySelective(DepartmentInfo departmentInfo) {
		Date date = new Date();
		departmentInfo.setmTime(date);
		return departmentInfoMapper.updateByPrimaryKeySelective(departmentInfo);
	}
	@Override
	public List<DepartmentInfo> selectByPrimaryKey(String departmentId){
		return departmentInfoMapper.selectByPrimaryKey(departmentId);
	}
	@Override
	public int updateIsDel(String deparmentId) {
		return connectDepartmentInfoMapper.updateIsDel(deparmentId);
	}
	
}
