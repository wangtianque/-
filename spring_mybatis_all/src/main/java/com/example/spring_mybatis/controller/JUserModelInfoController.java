package com.example.spring_mybatis.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
@RequestMapping("/JUserModelInfo")
@RestController
public class JUserModelInfoController extends BaseController{
	@RequestMapping(value="/updateJUserModelInfoByUserId" , method = RequestMethod.GET)
	public ResultDTO updataJUserModelInfoByUserId(@RequestParam("userId")String userId,@RequestParam("modelId")String modelId,@RequestParam("authorization")String authorization) {
		int result = serviceFacade.getUserModelInfoService().updataUserModelInfoByUserId(userId, modelId, authorization);
		return success(result);
	}
}
