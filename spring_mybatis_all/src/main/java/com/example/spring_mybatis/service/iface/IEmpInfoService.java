package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.EmpInfo;
import com.github.pagehelper.PageInfo;

public interface IEmpInfoService {
	
	PageInfo<EmpInfo> getList(Integer pageNum,Integer pageSize,String empNum, String empName, String departmentId);
	
	List<EmpInfo> selectByNumNameDepartmentId(String empNum, String empName, String departmentId);

	int insertSelective(EmpInfo empInfo);

	int updateByPrimaryKeySelective(EmpInfo empInfo);

	int updateIsDel(String empId);

	List<EmpInfo> selectEmpInfoAll();

	List<EmpInfo> selectByPrimaryKey(String empId);
	
	int selectEmpNumRepeat(String empNum);

	 List<EmpInfo> selectAll();
	
}
