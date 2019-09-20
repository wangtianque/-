package com.example.spring_mybatis.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//@JsonIgnoreProperties(value={"transportOrders"})  
public class LeftTree extends DepartmentInfo {
	private List<LeftTree> childrenList;
	private List<UserEmpInfo> empList;

	public List<LeftTree> getChildrenList() {
		return childrenList;
	}

	public void setChildrenList(List<LeftTree> childrenList) {
		this.childrenList = childrenList;
	}

	public List<UserEmpInfo> getEmpList() {
		return empList;
	}

	public void setEmpList(List<UserEmpInfo> empList) {
		this.empList = empList;
	}

	public LeftTree() {

	}
}
