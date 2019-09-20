package com.example.spring_mybatis.service.iface;

import java.util.List;

import com.example.spring_mybatis.model.ModelTree;

public interface IModelTreeService {
	List<ModelTree> getAllModel(String userId);
}
