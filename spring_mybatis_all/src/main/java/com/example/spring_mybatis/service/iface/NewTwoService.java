package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;
import com.example.spring_mybatis.model.UserEmpInfo;

public interface NewTwoService {
	List<NewTwo> selectRoleAll();
	
	List<NewTwo>selectRoleAllByRoleName(String roleName);

	List<NewTwo>selectRoleAllByGroupId(Integer groupId);
}
