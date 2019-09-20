package com.example.spring_mybatis.model;

import java.util.List;

public class ModelTree extends ModelInfo{
private List<ModelTree> children;
private String userId;
private List<String> authorization;

public String getUserId() {
	return userId;
}

public void setUserId(String userId) {
	this.userId = userId;
}

public List<String> getAuthorization() {
	return authorization;
}

public void setAuthorization(List<String> authorization) {
	this.authorization = authorization;
}

public List<ModelTree> getChildren() {
	return children;
}

public void setChildren(List<ModelTree> children) {
	this.children = children;
}
}
