package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.JRoleModelInfoMapper;
import com.example.spring_mybatis.dao.ModelInfoMapper;
import com.example.spring_mybatis.dao.ModelMapper;
import com.example.spring_mybatis.dao.RoleInfoExtendMapper;
import com.example.spring_mybatis.dao.RoleInfoMapper;
import com.example.spring_mybatis.dao.RoleJModelMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;

import com.example.spring_mybatis.model.JRoleLeftTreeInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.ModelInfo;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.RoleJRoleModelInfo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

import com.example.spring_mybatis.service.iface.RoleJModelMapperService;

@Service
public class RoleJModelMapperImpl implements RoleJModelMapperService {
	@Autowired
	RoleInfoMapper roleJModelMapper;
	@Autowired
	RoleInfoExtendMapper roleInfoExtendMapper;
	@Autowired
	RoleJModelMapper roleJModelInfo;
	@Autowired
	ModelInfoMapper modelInfoMapper;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	UserInfoExtendMapper userInfoExtendMapper;
	@Autowired
	JRoleModelInfoMapper jRoleModelInfoMapper;

	@Override
	public List<RoleInfo> selectRoleAll() {
		return roleInfoExtendMapper.selectAllRoleList();
	}

	@Override
	public List<RoleJRoleModelInfo> selectRoleIdCheckUser(Integer roleId) {
		return roleJModelInfo.selectRoleIdCheckUser(roleId);
	}

	@Override
	public int insertSelective(JRoleModelInfo jRoleModelInfo) {
		return jRoleModelInfoMapper.insertSelective(jRoleModelInfo);
	}

	@Override
	public List<JRoleLeftTreeInfo> selectLeftTree() {

		List<JRoleLeftTreeInfo> selectLeftTree = modelMapper.selectRoleAll();

		Map<Integer, List<JRoleLeftTreeInfo>> DepartmentInfoMap = new HashMap<>();
		selectLeftTree.forEach(item -> {
			if (DepartmentInfoMap.containsKey(item.getParentId())) {
				DepartmentInfoMap.get(item.getParentId()).add(item);
			} else {
				List<JRoleLeftTreeInfo> tempList = new ArrayList<>();
				tempList.add(item);
				DepartmentInfoMap.put(item.getParentId(), tempList);
			}
		});
		selectLeftTree.forEach(item -> {
			if (DepartmentInfoMap.containsKey(item.getModelId())) {
				item.setChildrenList(DepartmentInfoMap.get(item.getModelId()));
			}
		});

		return DepartmentInfoMap.get(0);
	}

	public Integer inseRtrole(RoleInfo roleInfo) {
		return roleJModelMapper.insertSelective(roleInfo);
	}

	public Integer deleteByPrimaryKey(Integer roleId) {
		return roleJModelMapper.deleteByPrimaryKey(roleId);
	}

	public int updateUserRoleId(String roleId, String userId) {
		return roleJModelInfo.updateUserRoleId(roleId, userId);
	}

	public int deleteJRolemodel(Integer roleId) {
		return roleJModelInfo.deleteJRolemodel(roleId);
	}

	public List<RoleJRoleModelInfo> selectAddRoleUser(Integer roleId, String userName, String empName,
			String departmentId) {
		List<RoleJRoleModelInfo> selectAllUser = roleJModelInfo.selectAddRoleUser(null, userName, empName,
				departmentId);
		List<RoleJRoleModelInfo> selectAllRole = roleJModelInfo.selectAddRoleUser(roleId, userName, empName,
				departmentId);
		for (int i = 0; i < selectAllUser.size(); i++) {
			for (int z = 0; z < selectAllRole.size(); z++) {
				if (selectAllUser.get(i).getUserId().equals(selectAllRole.get(z).getUserId())) {
					selectAllUser.remove(i);
					System.out.println(selectAllUser.get(i).getUserName());
					break;
				}
			}
		}
		return selectAllUser;
	}

	public int selectUserRoleFrom(String roleId, String userId) {
		List<RoleJRoleModelInfo> selectRoleUserId = roleJModelInfo.selectUserRoleFrom(userId);
		String UserRoleId = selectRoleUserId.get(0).getroleId();
		UserRoleId += roleId + ",";
		int updateRole = roleJModelInfo.updateUserRoleId(roleId, userId);
		return updateRole;
	}

	public List<RoleJRoleModelInfo> selectRoleIdRoleUser(String userId) {
		List<RoleJRoleModelInfo> selectRoleUserId = roleJModelInfo.selectUserRoleFrom(userId);
		return selectRoleUserId;
	}

	public List<RoleJRoleModelInfo> selectGroupRoleId(int roleId) {
		return roleJModelInfo.selectGroupRoleIdAll(roleId);
	}

	public List<RoleJRoleModelInfo> selectRoleGroupAll(int roleId, String groupName) {
		if (groupName.equals(" ") || groupName.equals(null) || groupName.isEmpty()) {
			groupName = null;
		}
		List<RoleJRoleModelInfo> selectAllUser = roleJModelInfo.selectGroupRoleId((Integer) null, groupName);
		List<RoleJRoleModelInfo> selectAllRole = roleJModelInfo.selectGroupRoleId(roleId, groupName);
		for (int i = 0; i < selectAllUser.size(); i++) {
			for (int z = 0; z < selectAllRole.size(); z++) {
				if (selectAllUser.get(i).getGroupId() == (selectAllRole.get(z).getGroupId())) {
					selectAllUser.remove(i);
					break;
				}
			}
		}
		return selectAllUser;
	}

	public int updateGroupinfoRoleId(String roleId, Integer groupId) {
		List<RoleJRoleModelInfo> selectRoleId = roleJModelInfo.selectGroupRoleIdAdd(groupId);
		String UserRoleId = selectRoleId.get(0).getroleId();
		UserRoleId = UserRoleId.replace(",,", ",");
		UserRoleId += "," + roleId;
		int updateGroupinfoRoleId = roleJModelInfo.updateGroupinfoRoleId(UserRoleId, groupId);
		return updateGroupinfoRoleId;
	}

	public List<RoleJRoleModelInfo> selectGroupRoleIdAdd(Integer roleId) {
		return roleJModelInfo.selectGroupRoleIdAdd(roleId);
	}

	public int selectGroupRoleId(String roleId, int groupId) {
		return roleJModelInfo.updateGroupinfoRoleId(roleId, groupId);
	}

	public List<RoleJRoleModelInfo> selectRoleJurisdiction(int roleId, int modelId) {
		return roleJModelInfo.selectRoleJurisdiction(roleId, modelId);
	}

	public List<RoleJRoleModelInfo> selectModelAllLeftTree(int roleId) {
		return roleJModelInfo.selectModelAllLeftTree(roleId);
	}

	public int updateRoleAttribute(String roleName, String roleDescription, int roleId) {
		return roleJModelInfo.updateRoleAttribute(roleName, roleDescription, roleId);

	}

	public int updateRoleJurisdiction(String authorization, int roleId, int modelId) {
		return roleJModelInfo.updateRoleJurisdiction(authorization, roleId, modelId);
	}
}
