package com.example.spring_mybatis.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.example.spring_mybatis.dao.ConnectEmpInfoMapper;
import com.example.spring_mybatis.dao.EmpInfoMapper;
import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.service.iface.IEmpInfoService;
import com.example.spring_mybatis.service.iface.RedisUtilService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class EmpInfoServiceImpl implements IEmpInfoService {
	@Autowired
	private RedisUtilService redisUtilService;
	@Resource
	private EmpInfoMapper empInfoMapper;
	@Resource
	private ConnectEmpInfoMapper connectEmpInfoMapper;
	
	@Override 
	public List<EmpInfo> selectAll(){
		return empInfoMapper.selectEmpInfoAll();
	}
	@Override
	public List<EmpInfo> selectByNumNameDepartmentId(String empNum, String empName, String departmentId) {
		return connectEmpInfoMapper.selectByNumNameDepartmentId(empNum, empName, departmentId);
	}

	@Override
	public PageInfo<EmpInfo> getList(Integer pageNum, Integer pageSize, String empNum, String empName,
			String departmentId) {
		PageHelper.startPage(pageNum, pageSize);

		String key = "emp_serch";
		if (empNum != "") {
			key += "-empNum-" + empNum;
		}
		if (empName != "") {
			key += "-empName-" + empName;
		}
		if (departmentId != "") {
			key += "-departmentId-" + departmentId;
		}
		
		if (redisUtilService.lGetListSize(key) != 0) {
			List<EmpInfo> empList = redisUtilService.lGet(key, 0, -1);
			PageInfo<EmpInfo> result = new PageInfo<>(empList);	
			System.out.println(key);
			System.out.println("REDIS------TIEM"+redisUtilService.getExpire(key));
			return result;
		} else {
			List<EmpInfo> empList = connectEmpInfoMapper.selectByNumNameDepartmentId(empNum, empName, departmentId);
			redisUtilService.lSet(key, empList, 10);
			
			PageInfo<EmpInfo> result = new PageInfo<>(empList);
			System.out.println(key);
			System.out.println("Mapper");
			return result;
		}

	}

	@Override
	public int insertSelective(EmpInfo empInfo) {
		Date date = new Date();
		empInfo.setcTime(date);
		return empInfoMapper.insertSelective(empInfo);
	}

	@Override
	public int updateByPrimaryKeySelective(EmpInfo empInfo) {
		Date date = new Date();
		empInfo.setmTime(date);
		return empInfoMapper.updateByPrimaryKeySelective(empInfo);
	}

	@Override
	public int updateIsDel(String empId) {
		return connectEmpInfoMapper.updateIsDel(empId);
	}

	@Override
	public List<EmpInfo> selectEmpInfoAll() {
		return connectEmpInfoMapper.selectEmpInfoAll();
	}

	@Override
	public List<EmpInfo> selectByPrimaryKey(String empId) {
		return empInfoMapper.selectByPrimaryKey(empId);
	}

	@Override
	public int selectEmpNumRepeat(String empNum) {
		List<String> empNumList = connectEmpInfoMapper.selectEmpNumRepeat(empNum);
		return CollectionUtils.isEmpty(empNumList) ? 0 : empNumList.size();
	}
}
