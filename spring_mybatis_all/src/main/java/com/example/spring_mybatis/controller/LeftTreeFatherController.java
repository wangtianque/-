package com.example.spring_mybatis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.LeftTree;
import com.example.spring_mybatis.model.UserEmpInfo;

@RequestMapping("/leftTree")
@RestController
public class LeftTreeFatherController extends BaseController{
	@RequestMapping(value = "/selectLeftTree", method = RequestMethod.GET)
	public ResultDTO selectUserOne() {
		List<LeftTree> list = serviceFacade.getLeftTreeService().selectAllDepartmentInfoEmpInfo();
		return success(list);

	}
}
