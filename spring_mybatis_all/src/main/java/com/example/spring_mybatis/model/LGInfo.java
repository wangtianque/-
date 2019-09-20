package com.example.spring_mybatis.model;

import java.util.Date;

public class LGInfo extends logInfo{
	private String userId;
	private String userName;
	private String password;
	
	public void setUserId(String userId) {
	        this.userId = userId == null ? null : userId.trim();
	    }

	    public String getUserId() {
	        return userId;
	    }
	    public void setUserName(String userName) {
	        this.userName = userName == null ? null : userName.trim();
	    }

	    public String getUserName() {
	        return userName;
	    }
	    public void setPassword(String password) {
	        this.password = password == null ? null : password.trim();
	    }

	    public String getPassword() {
	        return password;
	    }
}
