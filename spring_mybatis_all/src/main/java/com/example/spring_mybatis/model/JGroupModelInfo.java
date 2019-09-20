package com.example.spring_mybatis.model;

public class JGroupModelInfo extends GroupInfoWithBLOBs{
    private Integer groupId;

    private Integer modelId;

    private String authorization;

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
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
    public JGroupModelInfo(Integer groupId, int modelId, String authorization) {
		this.groupId=groupId;
		this.modelId=modelId;
		this.authorization=authorization;
	}
	public JGroupModelInfo() {
	
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	private Integer parentId;

	private String modelName;
}