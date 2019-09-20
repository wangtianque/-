package com.example.spring_mybatis.controller;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;
import com.github.pagehelper.PageInfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * author lindan. date 2019/6/4.
 */

@RestController
@RequestMapping("/userInfo")
public class UserInfoController extends BaseController {
	@RequestMapping(value = "/updataByGroupIdDelete", method = RequestMethod.POST)
	public ResultDTO updataByGroupIdDelete(@RequestBody GroupInfoWithBLOBs groupInfo) {
		int result = 0;
		GroupInfoWithBLOBs list = serviceFacade.getGroupInfoService().selectByPrimaryKey(groupInfo.getGroupId());
		if (groupInfo.getRoleId().contains(",")) {
			String[] groupRoleArr = groupInfo.getRoleId().split(",");
			if (list.getRoleId().contains(",")) {
				String[] listRoleArr = list.getRoleId().split(",");
				String str = "";

				for (int j = 0; j < groupRoleArr.length; j++) {
					for (int i = 0; i < listRoleArr.length; i++) {
						if (groupRoleArr[j].equals(listRoleArr[i])) {

							listRoleArr[i] = "";
						}

					}
				}
				for (int i = 0; i < listRoleArr.length; i++) {
					if (listRoleArr[i] != "") {
						if (str.equals("")) {
							str = listRoleArr[i];
						} else {
							str = str + "," + listRoleArr[i];

						}
					}
				}
				groupInfo.setRoleId(str);
				result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(groupInfo);
			} else {
				String str = "";
				for (int i = 0; i < groupRoleArr.length; i++) {
					if (!groupRoleArr[i].equals(list.getRoleId())) {
						if (str.equals("")) {
							str = groupRoleArr[i];
						} else {
							str = str + "," + groupRoleArr[i];
						}
					}
				}

				groupInfo.setRoleId(str);
				result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(groupInfo);
			}

		} else {
			if (list.getRoleId().contains(",")) {
				String[] listRoleArr = list.getRoleId().split(",");
				String str = "";
				for (int i = 0; i < listRoleArr.length; i++) {
					if (!listRoleArr[i].equals(groupInfo.getRoleId())) {
						if (str.equals("")) {
							str = listRoleArr[i];
						} else {
							str = str + "," + listRoleArr[i];
						}
					}
				}
				groupInfo.setRoleId(str);
				result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(groupInfo);
			} else {
				groupInfo.setRoleId("");
				result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(groupInfo);
			}
		}

		result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(groupInfo);

		return success(result);
	}
	@RequestMapping(value = "/updateGroupIdByUserId", method = RequestMethod.POST)
	public ResultDTO updateGroupIdByUserId(@RequestBody UserInfoWithBLOBs userInfo) {

		String str = userInfo.getGroupId();
		UserInfoWithBLOBs list = null;
		int result = 0;

		if (userInfo.getUserId().contains(",")) {
			String[] arr = userInfo.getUserId().split(",");
			for (int i = 0; i < arr.length; i++) {
				list = serviceFacade.getUserInfoService().selectByPrimaryKey(arr[i]);
				if (list.getGroupId() == null) {
					userInfo.setUserId(arr[i]);
					result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);
				} else {
					if (list.getGroupId().isEmpty()) {
						userInfo.setUserId(arr[i]);
						result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);
					} else {
						if (!list.getGroupId().contains(str)) {

							userInfo.setUserId(arr[i]);

							userInfo.setGroupId(list.getGroupId() + "," + str);

							result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);
						}
					}
				}
			}

		} else {
			list = serviceFacade.getUserInfoService().selectByPrimaryKey(userInfo.getUserId());
			if (list.getGroupId() == null) {
				result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);
			} else {
				if (!list.getGroupId().contains(str)) {
					if (list.getGroupId().isEmpty()) {
						result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);

					} else {
						userInfo.setGroupId(list.getGroupId() + "," + str);
						result = serviceFacade.getUserInfoService().updateGroupIdByUserId(userInfo);
					}
				}
			}
		}

		return success(result);

	}
	@RequestMapping(value = "/selectUserByUserId", method = RequestMethod.GET)
	public ResultDTO selectUserOne(@RequestParam("userId") String userId) {
		List<UserEmpInfo> arr = serviceFacade.getUserEmpInfoService().selectUserOne(userId);
		return success(arr);

	}
	@RequestMapping(value="/updateUserRoleInfoByUserId",method=RequestMethod.GET)
	public ResultDTO updateUserRoleInfo (@RequestParam("userId")String userId,@RequestParam("roleId")String roleId,@RequestParam("operator")String operator) {
		int result = serviceFacade.getUserInfoService().updateRoleInfoByUserId(userId, roleId,operator);
		if(result==-1) {
			return doubleRoleId();
		}
		return success(result);
	}
	@RequestMapping(value="/updateUserGroupIdByUserId",method=RequestMethod.GET)
	public ResultDTO updateUserGroupInfo (@RequestParam("userId")String userId,@RequestParam("groupId")String gorupId,@RequestParam("operator")String operator) {
		int result = serviceFacade.getUserInfoService().updateGroupInfoByUserId(userId, gorupId,operator);
		if(result==-1) {
			return doubleRoleId();
		}
		return success(result);
	}
	@RequestMapping(value = "/selectUserInfo", method = RequestMethod.GET)
	public ResultDTO selectAllUser(){
		List<UserEmpInfo> list = serviceFacade.getUserEmpInfoService().selectAllUser("", "","");
		return success(list);
	}


	@RequestMapping(value = "/selectUserInfoLists", method = RequestMethod.GET)
	public ResultDTO selectAllUserInfo(@RequestParam("userName") String userName,
			@RequestParam("empName") String empName, @RequestParam("departmentId") String departmentId,@RequestParam("pageNum")Integer pageNum,@RequestParam("pageSize")Integer pageSize) {
		PageInfo<UserEmpInfo> list = serviceFacade.getUserEmpInfoService().selectAllUserInfo(userName, empName, departmentId,pageNum,pageSize);
		return success(list);
	}

	@RequestMapping(value = "/selectOne", method = RequestMethod.GET)
	public ResultDTO selectOne(@RequestParam("userId") String userId) {
		List<UserEmpInfo> ue = serviceFacade.getUserEmpInfoService().selectOne(userId);
		return success(ue);
	}

	@RequestMapping(value = "/checkPassword", method = RequestMethod.GET)
	public ResultDTO selectPassword(@RequestParam("userId") String userId, @RequestParam("password") String password) {
		String checkPassword = serviceFacade.getUserInfoService().selectPassword(userId);
		if (!password.equals(checkPassword)) {
			
			return Pwd();
		}
		return success(password);
	}

	@RequestMapping(value = "/updataByUserId", method = RequestMethod.POST)
	public ResultDTO editPwd(@RequestBody UserInfoWithBLOBs userInfo) {
		
		List<String> checkEmpId = serviceFacade.getUserInfoService().selectEmpIdByEmpId(userInfo.getEmpId(),userInfo.getUserName());
	
			if (checkEmpId.size() == 0) {
				int num = serviceFacade.getUserInfoService().updateByPrimaryKeySelective(userInfo);
				return success(num);
			}
				return doubleEmpId();
			
		
	}

	@RequestMapping(value = "/deleteByuserId", method = RequestMethod.GET)
	public ResultDTO dele(@RequestParam("userId") String userId) {
		int a = serviceFacade.getUserInfoService().deleteByuserId(userId);
		return success(a);
	}

	@RequestMapping(value = "/updatePwd", method = RequestMethod.GET)
	public ResultDTO rePwd(@RequestParam("userId") String userId) {
		int a = serviceFacade.getUserInfoService().updatePWDById(userId);
		return success(a);
	}


	@RequestMapping(value = "/addUserCtrl", method = RequestMethod.POST)
	public ResultDTO addUserCtrl(@RequestBody UserInfoWithBLOBs userInfo) {
		String checkUserName = serviceFacade.getUserInfoService().selectUserNameByUserName(userInfo.getUserName());
		List<String> checkEmpId = serviceFacade.getUserInfoService().selectEmpIdByEmpId(userInfo.getEmpId(),userInfo.getUserName());
		if (checkUserName == null) {
			if (checkEmpId.size()==0) {
				int num = serviceFacade.getUserInfoService().addUser(userInfo);
				return success(num); 
			} else {
				return doubleEmpId();
			}
		} else {

			return doubleEmpnum();
		}
	}
}
