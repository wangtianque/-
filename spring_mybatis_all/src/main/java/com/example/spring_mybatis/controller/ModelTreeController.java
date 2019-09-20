package com.example.spring_mybatis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.ModelTree;

@RequestMapping("/modelTree")
@RestController
public class ModelTreeController extends BaseController {
	

	@RequestMapping(value = "/selectModelTree", method = RequestMethod.GET)
	public ResultDTO getModelTree(@RequestParam("userId")String userId) {
	List<ModelTree> rsult = serviceFacade.getModelTreeService().getAllModel(userId);
	if(rsult == null) {
		return noData();
	}
	return success(rsult);
	}
}
