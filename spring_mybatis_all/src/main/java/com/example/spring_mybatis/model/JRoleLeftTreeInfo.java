package com.example.spring_mybatis.model;

import java.util.List;

public class JRoleLeftTreeInfo extends ModelInfo{
	
	private List<JRoleLeftTreeInfo> childrenList;
	private List<ModelInfo> modelList;
	
	public List<JRoleLeftTreeInfo> getChildrenList(){
		return childrenList;
	}
	public void setChildrenList( List<JRoleLeftTreeInfo> childrenList){
		this.childrenList = childrenList;
	}
	public List<ModelInfo> getModelList(){
		return modelList;
	}
	public void setModelList( List<ModelInfo> modelList){
		this.modelList = modelList;
	}
}
