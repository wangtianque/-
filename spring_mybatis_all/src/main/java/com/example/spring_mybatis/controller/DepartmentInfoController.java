package com.example.spring_mybatis.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.model.LeftTree;
import com.example.spring_mybatis.service.iface.IDepartmentInfoService;

@RestController
@RequestMapping("/departmentInfo")
public class DepartmentInfoController extends BaseController {

	@Resource
	private IDepartmentInfoService departmentInfoService;

	@RequestMapping(value = "/selectAllDepartmentName", method = RequestMethod.GET)
	public ResultDTO selectAllDepartmentName() {
		List<DepartmentInfo> result = serviceFacade.getDepartmentInfoService().selectAllDepartmentName();
		return success(result);
	}
	@RequestMapping(value = "/selectAllDepartmentNameAll", method = RequestMethod.GET)
	public ResultDTO selectAllDepartmentNameAll() {
		List<DepartmentInfo> result = serviceFacade.getDepartmentInfoService().selectAllDepartmentNameAll();
		return success(result);
	}
//	@RequestMapping(value = "/selectAllDepartmentNameNoDel", method = RequestMethod.GET)
//	public ResultDTO selectAllDepartmentNameNoDel() {
//		List<DepartmentInfo> result = serviceFacade.getDepartmentInfoService().selectAllDepartmentNameNoDel();
//		return success(result);
//	}
	@RequestMapping(value = "/selectByPrimaryKey", method = RequestMethod.GET)
	public ResultDTO selectByPrimaryKey(@RequestParam("departmentId") String departmentId) {
		List<DepartmentInfo> result = serviceFacade.getDepartmentInfoService().selectByPrimaryKey(departmentId);
		return success(result);
	}

	@RequestMapping(value = "/selectAllDepartmentNameList", method = RequestMethod.GET)
	public ResultDTO selectAllDepartmentNameRepeatList() {
		List<LeftTree> all = serviceFacade.getDepartmentInfoService().selectAllDepartmentNameNoDel();
		List<DepartmentInfo> list = new ArrayList<DepartmentInfo>();
		boolean check = false;
		for (int i = 0; i < all.size(); i++) {
			if (all.get(i).getParentId().equals("0")) {
				list.add(all.get(i));
				check = true;
			}
			if (check) {
				for (int j = 0; j < all.size(); j++) {
					if (all.get(i).getDepartmentId().equals((all.get(j).getParentId()))) {
						list.add(all.get(j));
					}
				}
				check = false;
			}
		}
		return success(list);
	}

	@RequestMapping(value = "/addDepartmentInfo", method = RequestMethod.POST)
	public ResultDTO add(@RequestBody DepartmentInfo departmentInfo) {
		int result = serviceFacade.getDepartmentInfoService().insertSelective(departmentInfo);
		return check(result);
	}

	@RequestMapping(value = "/updateByPrimaryKeySelective", method = RequestMethod.POST)
	public ResultDTO update(@RequestBody DepartmentInfo departmentInfo) {
		int result = serviceFacade.getDepartmentInfoService().updateByPrimaryKeySelective(departmentInfo);
		return success(result);
	}

	@RequestMapping(value = "/updateIsDel", method = RequestMethod.POST)
	public ResultDTO updateByPrimaryKeySelective(@RequestParam("departmentId") String departmentId) {
		int result = serviceFacade.getDepartmentInfoService().updateIsDel(departmentId);
		return success(result);
	}

}
