package com.example.spring_mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;
import com.example.spring_mybatis.model.UserEmpInfo;

@Mapper
public interface NewTwoMapper {
	
	List<NewTwo>selectRoleAll();
	List<NewTwo>selectRoleAllByRoleName(String roleName);


	
}
