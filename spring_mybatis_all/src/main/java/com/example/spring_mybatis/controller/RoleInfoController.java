package com.example.spring_mybatis.controller;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

@RestController
@RequestMapping("/roleInfo")
public class RoleInfoController extends BaseController{
	@RequestMapping(value="/selectRoleInfoNoAddRoleInfo",method=RequestMethod.GET)
	public ResultDTO selectAllNoaddRoleInfo(@RequestParam("userId")String userId) {
		List<RoleInfo> result = serviceFacade.getRoleInfoService().selectNoAddRoleInfo(userId);
		return success(result);
	}
	@RequestMapping(value = "/selectAllRoleInfo", method = RequestMethod.GET)
	public ResultDTO selectAllRoleInfoList(){
		List<RoleInfo> list =  serviceFacade.getRoleInfoService().selectAllList();
		if(list.size()==0) {
			return noData();
		}else {
			return success(list);
		}
	}
	@RequestMapping(value = "/selectRoInfoByUserId", method = RequestMethod.GET)
	public ResultDTO selectRoleInfoByUserId(@RequestParam("roleId")String roleId){
		List<RoleInfo> list =  serviceFacade.getRoleInfoService().selectRoInfoByRoleId(roleId);
		if(list==null) {
			return noData();
		}else {
			return success(list);
		}
	}
	@RequestMapping(value = "/selectRoleInfoByRoleName", method = RequestMethod.GET)
	public ResultDTO selectRoleInfoByRoleName(@RequestParam("roleName")String roleName) {
		List<RoleInfo> list = serviceFacade.getRoleInfoService().selectRoleInfoByRoleName(roleName);
		if(list.size()==0) {
			return noData();
		}else {
			return success(list);
		}
		
	}
	@RequestMapping(value = "/addRole", method = RequestMethod.POST)
	public int addRole(@RequestBody RoleInfo record) {
		int result = serviceFacade.getRoleInfoService().insertSelective(record);
		return record.getRoleId();
	}

	@Transactional(rollbackFor = Exception.class)
	@RequestMapping(value = "/deleteByPrimaryKey", method = RequestMethod.POST)
	public ResultDTO deleteByPrimaryKey(@RequestParam("roleId") String roleId) {
		int result = 0;
		if (!roleId.contains(",")) {
			result = serviceFacade.getRoleInfoService().deleteByPrimaryKey(Integer.valueOf(roleId));
			serviceFacade.getJRoleModelInfoService().deleteByPrimaryKey(Integer.valueOf(roleId));
			List<GroupInfoWithBLOBs> groupList = serviceFacade.getGroupInfoService().selectAllGroupInfo();
			groupList.forEach(a -> {
				if (a.getRoleId().contains(roleId)) {
					if (a.getRoleId().contains(",")) {
						String[] strArr = a.getRoleId().split(",");
						String str = "";
						for (int i = 0; i < strArr.length; i++) {
							if (!strArr[i].equals(roleId)) {
								if (str.equals("")) {
									str = strArr[i];
								} else {
									str = str + "," + strArr[i];
								}
							}
						}
						a.setRoleId(str);
						serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(a);
					} else {
						String str = "";
						a.setRoleId(str);
						serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(a);
					}
				}
			});
			List<UserInfoWithBLOBs> userList = serviceFacade.getUserInfoService().selectUserInfoAll();
			userList.forEach(a -> {
				
				if (a.getRoleId().contains(roleId)) {
					String[] strArr = a.getRoleId().split(",");
					String str = "";
					for (int i = 0; i < strArr.length; i++) {
						if (!strArr[i].equals(roleId)) {
							if (str.equals("")) {
								str = strArr[i];
							} else {
								str = str + "," + strArr[i];
							}
						}
					}
					a.setRoleId(str);
					serviceFacade.getUserInfoService().updateByPrimaryKeySelective(a);
				} else {
					String str = "";
					a.setRoleId(str);
					serviceFacade.getUserInfoService().updateByPrimaryKeySelective(a);
				}
			});
			return success(result);
		} else {
			String[] roleIdArr = roleId.split(",");

			for (int i = 0; i < roleIdArr.length; i++) {
				result = serviceFacade.getRoleInfoService().deleteByPrimaryKey(Integer.valueOf(roleIdArr[i]));
				serviceFacade.getJRoleModelInfoService().deleteByPrimaryKey(Integer.valueOf(roleIdArr[i]));
			}
			List<UserInfoWithBLOBs> userList = serviceFacade.getUserInfoService().selectUserInfoAll();
			userList.forEach(a -> {
				for (int i = 0; i < roleIdArr.length; i++) {
					if (a.getRoleId().contains(roleIdArr[i])) {
						String[] strArr = a.getRoleId().split(",");
						String str = "";
						for (int j = 0; j < strArr.length;j++) {
							if (!strArr[j].equals(roleIdArr[i])) {
								if (str.equals("")) {
									str = strArr[j];
								} else {
									str = str + "," + strArr[j];
								}
							}
						}
						a.setRoleId(str);
						serviceFacade.getUserInfoService().updateByPrimaryKeySelective(a);
					} else {
						String str = "";
						a.setRoleId(str);
						serviceFacade.getUserInfoService().updateByPrimaryKeySelective(a);
					}
				}
			});

			List<GroupInfoWithBLOBs> groupList = serviceFacade.getGroupInfoService().selectAllGroupInfo();

			groupList.forEach(a -> {
				for (int i = 0; i < roleIdArr.length; i++) {
					if (a.getRoleId().contains(roleIdArr[i])) {
						if (a.getRoleId().contains(",")) {
							String[] strArr = a.getRoleId().split(",");
							String str = "";
							for (int j = 0; j < strArr.length; j++) {
								if (!strArr[j].equals(roleIdArr[i])) {
									if (str.equals("")) {
										str = strArr[j];
									} else {
										str = str + "," + strArr[j];
									}
								}
							}
							a.setRoleId(str);
							serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(a);
						} else {
							String str = "";
							a.setRoleId(str);
							serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(a);
						}
					}
				}
			});

		}
		return success(result);
	}
}
