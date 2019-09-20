package com.example.spring_mybatis.controller.base;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.emun.ResultEmun;
import com.example.spring_mybatis.service.base.IServiceFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BaseController {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	protected IServiceFacade serviceFacade;

	protected <T> ResultDTO<T> noData() {
		return new ResultDTO<>(ResultEmun.NO_DATA);
	}

	protected <T> ResultDTO<T> success(T data) {
		return new ResultDTO<>(ResultEmun.SUCCESS, data);
	}

	protected <T> ResultDTO<T> check(T data) {
		return new ResultDTO<>(ResultEmun.CF, data);
	}
	protected <T> ResultDTO<T> doubleRoleId() {
		return new ResultDTO<>(ResultEmun.DOUBLE_ROLEID);
	}
	 protected<T> ResultDTO<T> doubleEmpnum(){
	    	return new ResultDTO<>(ResultEmun.DOUBLE_EMPNUM);
	    }
	    protected<T> ResultDTO<T> doubleEmpId(){
	    	return new ResultDTO<>(ResultEmun.DOUBLE_EMPID);
	    }
	    protected<T> ResultDTO<T> Pwd(){
	    	return new ResultDTO<>(ResultEmun.ELSE_PASSWORD);
	    }
}
