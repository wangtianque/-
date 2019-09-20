package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring_mybatis.dao.JGroupModelInfoExtendMapper;
import com.example.spring_mybatis.dao.JRoleModelInfoExtendMapper;
import com.example.spring_mybatis.dao.JUserModelInfoExtendMapper;
import com.example.spring_mybatis.dao.ModelInfoExtendMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.JUserModelInfo;
import com.example.spring_mybatis.model.ModelTree;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.service.iface.IModelTreeService;

@Service
public class ModelTreeServiceImpl implements IModelTreeService {
	@Resource
	JUserModelInfoExtendMapper jUserModelInfoExtendMapper;
	@Resource
	JGroupModelInfoExtendMapper jGroupModelInfoExtendMapper;
	@Resource
	JRoleModelInfoExtendMapper jRoleModelInfoExtendMapper;
	@Resource
	ModelInfoExtendMapper modelInfoExtendMapper;
	@Resource
	UserInfoExtendMapper userInfoExtendMapper;

	@Override
	public List<ModelTree> getAllModel(String userId) {
		// 分好model上下级，
		List<ModelTree> modelList = modelInfoExtendMapper.getModelInfo();
		Map<Integer, List<ModelTree>> modelMap = new HashMap<>();
		modelList.forEach(item -> {
			if (modelMap.containsKey(item.getParentId())) {
				modelMap.get(item.getParentId()).add(item);
			} else {
				List<ModelTree> temp = new ArrayList<>();
				temp.add(item);
				modelMap.put(item.getParentId(), temp);
			}
		});
		modelList.forEach(param -> {
			if (modelMap.containsKey(param.getModelId())) {
				param.setChildren(modelMap.get(param.getModelId()));
			}
		});
		// 角色自有权限
		List<JUserModelInfo> userModleInfoSelf = jUserModelInfoExtendMapper.selectJUserModelInfoByUserId(userId);
		// 用户信息
		List<UserEmpInfo> user = userInfoExtendMapper.selectOne(userId);

		String roleId = user.get(0).getRoleId();
		String groupId = user.get(0).getGroupId();
		// 根据组模块分类的权限字符串
		Map<Integer, List<String>> jurisdictionMap = new HashMap<>();
		// 自有权限不等于空或者不等于null时
		if (!userModleInfoSelf.isEmpty() || userModleInfoSelf != null) {
			userModleInfoSelf.forEach(item -> {
				if (jurisdictionMap.containsKey(item.getModelId())) {
					jurisdictionMap.get(item.getModelId()).add(item.getAuthorization());
				} else {
					List<String> temp = new ArrayList<>();
					temp.add(item.getAuthorization());
					jurisdictionMap.put(item.getModelId(), temp);
				}
			});
			
			
			
			
			
		}

		if (groupId == null && roleId == null) {
			
			if (!userModleInfoSelf.isEmpty() || userModleInfoSelf != null) {
				modelList.forEach(item->{
					if (!jurisdictionMap.get(item.getModelId()).isEmpty()) {
						String str = jurisdictionMap.get(item.getModelId()).get(0);
						if (item.getAuthorization() == null) {
							List<String> autList = new ArrayList<>();
							autList.add(str);
							item.setAuthorization(autList);
						} else {
							item.getAuthorization().add(str);
						}
					}
				});
			}else {
			
			
				modelList.forEach(item -> {
					List<String> temp = new ArrayList<>();
					temp.add("00000000000000000000");
					item.setAuthorization(temp);
				});
				}
				return modelMap.get(0);
			

		
		}

		if (groupId == null) {
			List<JRoleModelInfo> roleModelList = checkRole(roleId);

			roleModelList.forEach(item -> {
				if (jurisdictionMap.containsKey(item.getModelId())) {
					jurisdictionMap.get(item.getModelId()).add(item.getAuthorization());
				} else {
					List<String> temp = new ArrayList<>();
					temp.add(item.getAuthorization());
					jurisdictionMap.put(item.getModelId(), temp);
				}
			});
			modelList.forEach(item -> {
				if (!jurisdictionMap.get(item.getModelId()).isEmpty()) {
					String str = checkJurisdiction(jurisdictionMap.get(item.getModelId()));
					if (item.getAuthorization() == null) {
						List<String> autList = new ArrayList<>();
						autList.add(str);
						item.setAuthorization(autList);
					} else {
						item.getAuthorization().add(str);
					}
				}

			});
			return modelMap.get(0);
		}

		if (roleId == null) {
			List<JGroupModelInfo> groupModelList = checkGroup(groupId);
			groupModelList.forEach(item -> {
				if (jurisdictionMap.containsKey(item.getModelId())) {
					jurisdictionMap.get(item.getModelId()).add(item.getAuthorization());
				} else {
					List<String> temp = new ArrayList<>();
					temp.add(item.getAuthorization());
					jurisdictionMap.put(item.getModelId(), temp);
				}
			});
			modelList.forEach(item -> {
				if (!jurisdictionMap.get(item.getModelId()).isEmpty()) {
					String str = checkJurisdiction(jurisdictionMap.get(item.getModelId()));
					if (item.getAuthorization() == null) {
						List<String> autList = new ArrayList<>();
						autList.add(str);
						item.setAuthorization(autList);
					} else {
						item.getAuthorization().add(str);
					}
				}

			});
			return modelMap.get(0);
		}

		if (groupId != null && roleId != null) {
			List<JGroupModelInfo> groupModelList = checkGroup(groupId);
			groupModelList.forEach(item -> {
				if (jurisdictionMap.containsKey(item.getModelId())) {
					jurisdictionMap.get(item.getModelId()).add(item.getAuthorization());
				} else {
					List<String> temp = new ArrayList<>();
					temp.add(item.getAuthorization());
					jurisdictionMap.put(item.getModelId(), temp);
				}
			});
			List<JRoleModelInfo> roleModelList = checkRole(roleId);

			roleModelList.forEach(item -> {
				if (jurisdictionMap.containsKey(item.getModelId())) {
					jurisdictionMap.get(item.getModelId()).add(item.getAuthorization());
				} else {
					List<String> temp = new ArrayList<>();
					temp.add(item.getAuthorization());
					jurisdictionMap.put(item.getModelId(), temp);
				}
			});

			modelList.forEach(item -> {
				if (!jurisdictionMap.get(item.getModelId()).isEmpty()) {
					String str = checkJurisdiction(jurisdictionMap.get(item.getModelId()));

					if (item.getAuthorization() == null) {
						List<String> autList = new ArrayList<>();
						autList.add(str);
						item.setAuthorization(autList);
					} else {
						item.getAuthorization().add(str);
					}

				}

			});
			return modelMap.get(0);
		}

		return modelMap.get(0);
	}

	private String checkJurisdiction(List<String> list) {
		boolean[] check = new boolean[list.get(0).length()];
		for (int i = 0; i < check.length; i++) {
			check[i] = false;
		}
		String newStr = "";
		for (int i = 0; i < list.get(0).length(); i++) {
			for (int j = 0; j < list.size(); j++) {
				if (list.get(j).charAt(i) == '1') {
					check[i] = true;
				}
			}
		}

		for (int i = 0; i < check.length; i++) {
			if (check[i]) {
				newStr += "1";
			} else {
				newStr += "0";
			}
		}
		return newStr;
	}

	private List<JGroupModelInfo> checkGroup(String groupId) {

		List<JGroupModelInfo> result = new ArrayList<>();
		if (groupId.contains(",")) {
			String[] groupIdArr = groupId.split(",");

			for (int i = 0; i < groupIdArr.length; i++) {
				jGroupModelInfoExtendMapper.selectAllGroupModelInfo(Integer.valueOf(groupIdArr[i])).forEach(item -> {
					result.add(item);
				});
			}
			return result;
		} else {
			result.addAll(jGroupModelInfoExtendMapper.selectAllGroupModelInfo(Integer.valueOf(groupId)));
			return result;
		}
	}

	private List<JRoleModelInfo> checkRole(String roleId) {
		List<JRoleModelInfo> result = new ArrayList<>();
		if (roleId.contains(",")) {
			String[] roleIdArr = roleId.split(",");

			for (int i = 0; i < roleIdArr.length; i++) {
				jRoleModelInfoExtendMapper.selectAllRoleModelInfo(Integer.valueOf(roleIdArr[i])).forEach(item -> {
					result.add(item);
				});
			}
			return result;
		} else {
			result.addAll(jRoleModelInfoExtendMapper.selectAllRoleModelInfo(Integer.valueOf(roleId)));
			return result;
		}
	}
}
