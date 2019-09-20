package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;

public interface NewService {
	List<New> selectUser(Integer groupId);

	List<New> selectUserAll();

	List<New> selectUserByGroupId(String groupId);

	



}
