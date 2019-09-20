package com.example.spring_mybatis.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;

@RestController
@RequestMapping("/JRoleModelInfo")
public class JRoleModelInfoController extends BaseController {
	@RequestMapping(value = "/insertRoleModel", method = RequestMethod.POST)
	public ResultDTO inserRoletModel(@RequestParam("roleId") Integer roleId, @RequestParam("modelId") String modelId,
			@RequestParam("authorization") String authorization, @RequestParam("modelIndex") Integer modelIndex) {
		int result = 0;
		try {
			StringBuffer str = new StringBuffer();
			str.append(authorization);
			for (int i = 20; i < authorization.length(); i += modelIndex + 1) {
				str.insert(i, ",");
			}
			System.out.println(str);
			String[] arr = modelId.split(",");
			String[] arrTwo = str.toString().split(",");

			for (int i = 0; i < arr.length; i++) {
				result = serviceFacade.getJRoleModelInfoService()
						.insertSelective(new JRoleModelInfo(roleId, Integer.valueOf(arr[i]), arrTwo[i]));
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return success(result);
	}
}
