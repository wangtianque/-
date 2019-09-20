package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.UserInfoMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;
import com.example.spring_mybatis.service.iface.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService {
	@Resource
	UserInfoExtendMapper userInfoExtendMapper;
	@Resource
	private UserInfoMapper userInfoMapper;
	

	// 根据前端传过来的userName用来验证数据库是否有该userName
	@Override
	public List<String> selectEmpIdByEmpId(String empId, String userName) {
		return userInfoExtendMapper.selectEmpIdByEmpId(empId, userName);
	}
	@Override
	public List<UserInfoWithBLOBs>selectUserInfoAll(){
		return userInfoMapper.selectUserInfoAll();
	}
	// 根据前端传过来的empId用来验证数据库是否有该empId
	@Override
	public String selectUserNameByUserName(String userName) {
		return userInfoExtendMapper.selectUserNameByUserName(userName);
	}
	@Override
	public UserInfoWithBLOBs selectByPrimaryKey(String userId) {
		return userInfoExtendMapper.selectByPrimaryKey(userId);
	}
	@Override
	public int addUser(UserInfoWithBLOBs userInfo) {
		userInfo.setcTime(new Date());
		userInfo.setIsDel("0");
		userInfo.setmTime(new Date());
		return userInfoExtendMapper.addUser(userInfo);
	}

	@Override
	public int updateGroupInfoByUserId(String userId, String groupId, String operator) {
		List<UserEmpInfo> userInfo = userInfoExtendMapper.selectOne(userId);
		String oldGroupId = userInfo.get(0).getGroupId();
		if (operator.equals("add")) {
			// 添加
			return addGroupInfo(userId, oldGroupId, groupId);
		} else if (operator.equals("del")) {
			// 删除
			return delGroupInfo(userId, oldGroupId, groupId);
		}
		return -1;

	}

	@Override
	public int deleteByuserId(String userId) {
		return userInfoExtendMapper.deleteByuserId(userId);
	}

	@Override
	public int updatePWDById(String userId) {
		return userInfoExtendMapper.updatePWDById(userId);
	}

	@Override
	public int updateRoleInfoByUserId(String userId, String roleId, String operator) {
		List<UserEmpInfo> userInfo = userInfoExtendMapper.selectOne(userId);
		String oldRoleId = userInfo.get(0).getRoleId();
		if (operator.equals("add")) {
			// 添加
			return addRoleInfo(userId, oldRoleId, roleId);
		} else if (operator.equals("del")) {
			// 删除
			return delRoleInfo(userId, oldRoleId, roleId);
		}
		return -1;
	}

	// 删除角色
	public int delRoleInfo(String userId, String oldRoleId, String roleId) {
		// 判断旧id是否只有一个
		if (oldRoleId.indexOf(",") == -1) {
			return userInfoExtendMapper.updateRoleInfoByUserId(userId, null);
		} else {
			// 如果旧id有多个
			String[] oldRoleIdArr = oldRoleId.split(",");
			// 判断要删除的id是否是一个
			if (roleId.indexOf(",") == -1) {
				String newRoleId = "";
				for (int i = 0; i < oldRoleIdArr.length; i++) {
					if (!oldRoleIdArr[i].equals(roleId)) {
						newRoleId += oldRoleIdArr[i] + ",";
					}
				}
				newRoleId = newRoleId.substring(0, newRoleId.length() - 1);
				return userInfoExtendMapper.updateRoleInfoByUserId(userId, newRoleId);
			} else {
				// 如果要删除的Id为多个
				int roleIndex = 0;
				String[] roleIdArr = roleId.split(",");
				List<String> listA = Arrays.asList(roleIdArr);
				String newRoleId = "";
				for (String temp : oldRoleIdArr) {
					if (!listA.contains(temp)) {
						newRoleId += temp + ",";
					} else {
						roleIndex++;
					}
				}
				if (roleIndex == oldRoleIdArr.length) {
					return userInfoExtendMapper.updateRoleInfoByUserId(userId, null);
				}
				newRoleId = newRoleId.substring(0, newRoleId.length() - 1);
				return userInfoExtendMapper.updateRoleInfoByUserId(userId, newRoleId);

			}
		}
	}
	@Override
	public int updateGroupIdByUserId(UserInfoWithBLOBs userInfo) {
		return userInfoExtendMapper.updateByPrimaryKeySelective(userInfo);
	}
	
//删除groupInfo
	public int delGroupInfo(String userId, String oldGroupId, String groupId) {
		// 判断旧id是否只有一个
		if (oldGroupId.indexOf(",") == -1) {
			return userInfoExtendMapper.updateGroupInfoByUserId(userId, null);
		} else {
			// 如果旧id有多个
			String[] oldGroupIdArr = oldGroupId.split(",");
			// 判断要删除的id是否是一个
			if (groupId.indexOf(",") == -1) {
				String newGroupId = "";
				for (int i = 0; i < oldGroupIdArr.length; i++) {
					if (!oldGroupIdArr[i].equals(groupId)) {
						newGroupId += oldGroupIdArr[i] + ",";
					}
				}
				newGroupId = newGroupId.substring(0, newGroupId.length() - 1);
				return userInfoExtendMapper.updateGroupInfoByUserId(userId, newGroupId);
			} else {
				int groupIndex = 0;
				// 如果要删除的Id为多个
				String[] groupIdArr = groupId.split(",");
				List<String> listA = Arrays.asList(groupIdArr);
				String newGroupId = "";
				for (String temp : oldGroupIdArr) {
					if (!listA.contains(temp)) {
						newGroupId += temp + ",";
					} else {
						groupIndex++;
					}
				}
				if (groupIndex == oldGroupIdArr.length) {
					return userInfoExtendMapper.updateGroupInfoByUserId(userId, null);
				}
				newGroupId = newGroupId.substring(0, newGroupId.length() - 1);
				return userInfoExtendMapper.updateGroupInfoByUserId(userId, newGroupId);

			}
		}
	}

	public int addRoleInfo(String userId, String oldRoleId, String roleId) {

		boolean checkRoleId = false;
		if (oldRoleId == null || oldRoleId == "") {
			return userInfoExtendMapper.updateRoleInfoByUserId(userId, roleId);
		} else {
			String[] oldRoleIdArr = oldRoleId.split(",");
			// 判断传过来的role是否是只有一个值
			if (roleId.indexOf(",") != -1) {
				String[] roleIdParam = roleId.split(",");
				// 判断是否与已存在的roleid重复
				a: for (int i = 0; i < oldRoleIdArr.length; i++) {
					b: for (int j = 0; j < roleIdParam.length; j++) {
						if (oldRoleIdArr[i].equals(roleIdParam[j])) {
							checkRoleId = true;
							break;

						}
					}
				}
			} else {
				for (int i = 0; i < oldRoleIdArr.length; i++) {
					if (oldRoleIdArr[i].equals(roleId)) {
						checkRoleId = true;
					}
				}
			}
			if (!checkRoleId) {
				String newRoleId = oldRoleId + "," + roleId;
				System.out.println(oldRoleIdArr + "     新     :" + newRoleId);
				return userInfoExtendMapper.updateRoleInfoByUserId(userId, newRoleId);
			} else {
				return -1;
			}
		}

	}

	// 添加groupInfo
	public int addGroupInfo(String userId, String oldgGroupId, String groupId) {
		boolean checkGroupId = false;
		if (oldgGroupId == null || oldgGroupId == "") {
			return userInfoExtendMapper.updateGroupInfoByUserId(userId, groupId);
		} else {
			String[] oldGroupIdArr = oldgGroupId.split(",");
			// 判断传过来的role是否是只有一个值
			if (groupId.indexOf(",") != -1) {
				String[] groupIdParam = groupId.split(",");
				// 判断是否与已存在的roleid重复
				a: for (int i = 0; i < oldGroupIdArr.length; i++) {
					b: for (int j = 0; j < groupIdParam.length; j++) {
						if (oldGroupIdArr[i].equals(groupIdParam[j])) {
							checkGroupId = true;
							break;

						}
					}
				}
			} else {
				for (int i = 0; i < oldGroupIdArr.length; i++) {
					if (oldGroupIdArr[i].equals(groupId)) {
						checkGroupId = true;
					}
				}
			}
			if (!checkGroupId) {
				String newGroupId = oldgGroupId + "," + groupId;
				System.out.println(oldGroupIdArr + "     新     :" + newGroupId);
				return userInfoExtendMapper.updateGroupInfoByUserId(userId, newGroupId);
			} else {
				return -1;
			}
		}

	}

	@Override
	public int updateByPrimaryKeySelective(UserInfoWithBLOBs record) {
		record.setmTime(new Date());
		return userInfoExtendMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public String selectPassword(String userId) {
		String password = userInfoExtendMapper.selectPassword(userId);
		return password;
	}

}
