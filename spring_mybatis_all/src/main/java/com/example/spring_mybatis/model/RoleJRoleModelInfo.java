package com.example.spring_mybatis.model;

import java.util.Date;

public class RoleJRoleModelInfo {
	private String userName;
	private String empName;
	private String departmentName;
	private String departmentId;
	private String tel;
	private Date mTime;
	private String roleId;
	private String userId;
	private String status;
	 private String authorization;
	private Date cTime;
	 private String remark;
	 private int groupId;
	 private String groupName;
	 private String groupDescription;
	 private String roleDescription;
	 private String roleName;
	 public String getRoleName() {
	        return roleName;
	    }

	    public void setRoleName(String roleName) {
	        this.roleName = roleName == null ? null : roleName.trim();
	    }
	 public String getRoleDescription() {
	        return roleDescription;
	    }

	    public void setRoleDescription(String roleDescription) {
	        this.roleDescription = roleDescription == null ? null : roleDescription.trim();
	    }
	  public String getAuthorization() {
	        return authorization;
	    }

	    public void setAuthorization(String authorization) {
	        this.authorization = authorization == null ? null : authorization.trim();
	    }
	 public int getGroupId() {
	        return groupId;
	    }

	    public void setGroupId(int groupId) {
	       this.groupId=groupId;
	    }	
	 public String getGroupName() {
	        return groupName;
	    }

	    public void setGroupName(String groupName) {
	        this.groupName = groupName == null ? null : groupName.trim();
	    }	
	    public String getGroupDescription() {
	        return groupDescription;
	    }

	    public void setGroupDescription(String groupDescription) {
	        this.groupDescription = groupDescription == null ? null : groupDescription.trim();
	    }	
	 public String getRemark() {
	        return remark;
	    }

	    public void setRemark(String remark) {
	        this.remark = remark == null ? null : remark.trim();
	    }	
	public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }
	public String getStatus() {
	    return status;
	}
	public Date getcTime() {
	    return cTime;
	}

	public void setcTime(Date cTime) {
	    this.cTime = cTime;
	}
	public String getUserId() {
		return userId;
	} 
	public void setUserId(String userId) {
		this.userId = userId == null ? null : userId.trim();
	}
	public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }
    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName == null ? null : empName.trim();
    }
    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName == null ? null : departmentName.trim();
    }
    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel == null ? null : tel.trim();
    }
    public Date getmTime() {
        return mTime;
    }

    public void setmTime(Date mTime) {
        this.mTime = mTime;
    }
    public String getroleId() {
        return roleId;
    }

    public void setroleId(String roleId) {
        this.roleId = roleId == null ? null : roleId.trim();
    }
    public String getdepartmentId() {
        return departmentId;
    }

    public void setdepartmentId(String departmentId) {
        this.departmentId = departmentId == null ? null : departmentId.trim();
    }

}
