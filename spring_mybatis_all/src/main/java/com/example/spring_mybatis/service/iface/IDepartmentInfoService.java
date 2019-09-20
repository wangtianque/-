package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.LeftTree;

public interface IDepartmentInfoService {
	List<DepartmentInfo> selectAllDepartmentName();
	
	List<LeftTree> selectAllDepartmentNameNoDel();
	
	int insertSelective(DepartmentInfo record);
	
	int updateByPrimaryKeySelective(DepartmentInfo departmentInfo);
	
	List<DepartmentInfo> selectByPrimaryKey(String departmentId);

	int updateIsDel(String deparmentId);
	
	List<DepartmentInfo> selectAllDepartmentNameAll();
}
