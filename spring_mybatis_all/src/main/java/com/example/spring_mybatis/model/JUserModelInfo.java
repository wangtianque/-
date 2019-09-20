package com.example.spring_mybatis.model;

public class JUserModelInfo {
    private String userId;

    private Integer modelId;

    private String authorization;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
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
    public JUserModelInfo() {

	}

	public JUserModelInfo(String userId, Integer modelId, String authorization) {
		this.userId = userId;
		this.modelId = modelId;
		this.authorization = authorization;
	}
}