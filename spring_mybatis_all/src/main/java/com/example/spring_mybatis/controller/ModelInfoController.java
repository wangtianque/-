package com.example.spring_mybatis.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

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
import com.example.spring_mybatis.model.GroupInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.JUserModelInfo;
import com.example.spring_mybatis.model.ModelInfo;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

@RestController
@RequestMapping("/modelInfo")
public class ModelInfoController extends BaseController {
	@RequestMapping(value = "/insertModelInfo", method = RequestMethod.POST)
	public ResultDTO insertModelInfo(ModelInfo record) {
		int result = serviceFacade.getModelInfoService().insertSelective(record);
		
		List<GroupInfoWithBLOBs> groupList = serviceFacade.getGroupInfoService().selectAllGroupInfo();

		groupList.forEach(a -> {
			serviceFacade.getJGroupModelInfoService()
					.insertSelective(new JGroupModelInfo(a.getGroupId(), record.getModelId(), "00000000000000000000"));

		});

		List<RoleInfo> roleList = serviceFacade.getRoleInfoService().selectAllRoleInfo();
		roleList.forEach(a -> {
			serviceFacade.getJRoleModelInfoService()
					.insertSelective(new JRoleModelInfo(a.getRoleId(), record.getModelId(), "00000000000000000000"));
		});
		List<UserInfoWithBLOBs> userList = serviceFacade.getUserInfoService().selectUserInfoAll();
		userList.forEach(a -> {
			serviceFacade.getJUserModelInfoService()
					.insertSelective(new JUserModelInfo(a.getUserId(), record.getModelId(), "00000000000000000000"));
		});

		return success(0);
	}

	@RequestMapping(value = "/updateModelInfo", method = RequestMethod.POST)
	public ResultDTO updateModelInfo(ModelInfo record) {
		int result = serviceFacade.getModelInfoService().updateByPrimaryKeySelective(record);
		return success(result);
	}

	@RequestMapping(value = "/deleteModelInfo", method = RequestMethod.POST)
	public ResultDTO deleteModelInfo(@RequestParam("modelId") Integer modelId) {
		int i = serviceFacade.getModelInfoService().deleteByPrimaryKey(modelId);
		serviceFacade.getJGroupModelInfoService().deleteByModelId(modelId);
		serviceFacade.getJRoleModelInfoService().deleteByModelId(modelId);
		serviceFacade.getJUserModelInfoService().deleteByModelId(modelId);
		deleteOtherModel(modelId);
		return success(i);

	}

	public ResultDTO deleteOtherModel(Integer modelId) {
		int j = 0;
		List<ModelInfo> list = serviceFacade.getModelInfoService().selectByParentId(modelId);
		
		for(int i = 0 ; i < list.size();i++) {
			j = serviceFacade.getModelInfoService().deleteByPrimaryKey(list.get(i).getModelId());
			deleteModelInfo(list.get(i).getModelId());
		}
		return success(j);
		
		
		
		
//		serviceFacade.getModelInfoService().deleteByPrimaryKey(modelId);

	}

	@RequestMapping(value = "/selectModelInfo", method = RequestMethod.GET)
	public ResultDTO selectModelInfo(@RequestParam("modelId") Integer modelId) {
		
		ModelInfo result = serviceFacade.getModelInfoService().selectByPrimaryKey(modelId);

		return success(result);
	}

	@RequestMapping(value = "/selectAllModelInfoList", method = RequestMethod.GET)
	public ResultDTO selectAllModelInfo() {
		
		List<ModelInfo> all = serviceFacade.getModelInfoService().selectAllModelInfo();
		List<ModelInfo> result = new ArrayList<ModelInfo>();
		List<ModelInfo> f = toSort(all, result, 0);

		return success(result);
	}

	private static List<ModelInfo> toSort(List<ModelInfo> list, List<ModelInfo> result, Integer father) {
		List<ModelInfo> temp = new ArrayList<ModelInfo>();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getParentId() == father) {
				temp.add(list.get(i));
			}
		}

		for (int i = 0; i < temp.size(); i++) {
			result.add(temp.get(i));
			toSort(list, result, temp.get(i).getModelId());
		}
		return result;

	}

}
