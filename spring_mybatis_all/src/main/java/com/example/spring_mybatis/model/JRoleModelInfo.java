package com.example.spring_mybatis.model;

public class JRoleModelInfo {
    private Integer roleId;

    private Integer modelId;

    private String authorization;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getAuthorization() {
        return authorization;
    }

    public void setAuthorization(String authorization) {
        this.authorization = authorization == null ? null : authorization.trim();
    }

	public JRoleModelInfo() {

	}

	public JRoleModelInfo(Integer roleId, Integer modelId, String authorization) {
		this.roleId = roleId;
		this.modelId = modelId;
		this.authorization = authorization;
	}
}