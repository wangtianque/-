package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.Department;
import com.example.spring_mybatis.model.DepartmentInfo;

public interface IDepartmentService {

	int insert(Department departmentInfo);

	List<Department> selectByPrimaryKey(String departmentId);

	int updateByPrimaryKey(Department departmentId);

	int deleteByPrimaryKey(Department departmentId);

	List<Department> selectAll();

	List<Department> selectAllForParentIdDepartmentId();

}
