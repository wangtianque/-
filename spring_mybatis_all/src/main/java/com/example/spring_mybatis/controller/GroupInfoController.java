package com.example.spring_mybatis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.GroupInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;

@RequestMapping("/groupInfo")
@RestController
public class GroupInfoController extends BaseController{
	@RequestMapping(value="/selectGroupnfoNoAddGroupInfo",method=RequestMethod.GET)
	public ResultDTO selectAllNoaddRoleInfo(@RequestParam("userId")String userId) {
		List<GroupInfoWithBLOBs> result = serviceFacade.getGroupInfoService().selectNoAddGroupInfo(userId);
		return success(result);
	}
	@RequestMapping(value = "/selectGroupInfoByGroupId", method = RequestMethod.GET)
	public ResultDTO slectGroupInfoByGroupId(@RequestParam("groupId") String groupId) {
		List<GroupInfo> result = serviceFacade.getGroupInfoService().selectGroupInfoByUserGroupId(groupId);
		return success(result);
	}
	@RequestMapping(value = "/updateByPrimaryKeySelective", method = RequestMethod.POST)
	public ResultDTO updateByPrimaryKeySelective(@RequestBody GroupInfoWithBLOBs record) {
		int result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(record);
		return success(result);
	}
	@RequestMapping(value = "/deleteByPrimaryKey/{groupId}", method = RequestMethod.POST)
	public ResultDTO deleteByPrimaryKey(@PathVariable("groupId") Integer groupId) {
		int result = serviceFacade.getGroupInfoService().deleteByPrimaryKey(groupId);
		serviceFacade.getJGroupModelInfoService().deleteByPrimaryKey(groupId);
		List<UserInfoWithBLOBs> userListAll = serviceFacade.getUserInfoService().selectUserInfoAll();
		userListAll.forEach(a -> {
			System.out.println(groupId);
			if (a.getGroupId().contains(String.valueOf(groupId))) {
				String str = a.getGroupId();
				if (!str.contains(",")) {
					a.setGroupId(a.getGroupId().replace(str, ""));
					serviceFacade.getUserInfoService().updateGroupIdByUserId(a);
				} else {
					String[] arr = str.split(",");
					str = "";
					for (int i = 0; i < arr.length; i++) {
						if (str.equals("")) {
							if (!arr[i].equals(String.valueOf(groupId))) {
								str = arr[i];
							}
						} else {
							if (!arr[i].equals(String.valueOf(groupId))) {
								str = str + "," + arr[i];
							}
						}
					}

					a.setGroupId(str);
					serviceFacade.getUserInfoService().updateGroupIdByUserId(a);
				}

			}
		});
		return success(0);
	}

	@RequestMapping(value = "/addGroupInfo", method = RequestMethod.POST)
	public Integer add(@RequestBody GroupInfoWithBLOBs record) {
		serviceFacade.getGroupInfoService().insertSelective(record);

		return record.getGroupId();
	}
	@RequestMapping(value = "/selectAllGroupInfo", method = RequestMethod.GET)
	public ResultDTO selectAllGroupInfo() {
		List<GroupInfoWithBLOBs> list = serviceFacade.getGroupInfoService().selectAllGroupInfo();
		return success(list);
	}
	@RequestMapping(value = "/selectByPrimaryKey", method = RequestMethod.GET)
	public ResultDTO selectByPrimaryKey(@RequestParam("groupId") Integer groupId) {
		GroupInfoWithBLOBs result = serviceFacade.getGroupInfoService().selectByPrimaryKey(groupId);
		return success(result);
	}
	@RequestMapping(value = "/selectGroupInfoByGroupName", method = RequestMethod.GET)
	public ResultDTO selectAllGroupInfoByGroupName(@RequestParam("groupName") String groupName) {
		List<GroupInfo> list = serviceFacade.getGroupInfoService().selectGroupInfoByGroupName(groupName);
		return success(list);
	}
	@RequestMapping(value = "/updateRoleId", method = RequestMethod.POST)
	public ResultDTO updateRoleId(@RequestBody GroupInfoWithBLOBs record) {
		int result = 0;
		String str = record.getRoleId();
		GroupInfoWithBLOBs list = null;

		if (str.contains(",")) {
			String[] arr = str.split(",");
			for (int i = 0; i < arr.length; i++) {
				list = serviceFacade.getGroupInfoService().selectByPrimaryKey(record.getGroupId());
				if (!list.getRoleId().contains(arr[i])) {
					if (list.getRoleId().isEmpty()) {
						record.setRoleId(arr[i]);
						result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(record);

					} else {
						record.setRoleId(list.getRoleId() + "," + arr[i]);
						result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(record);

					}
				}

			}

			record.setRoleId(list.getRoleId() + "," + str);
		} else {
			list = serviceFacade.getGroupInfoService().selectByPrimaryKey(record.getGroupId());
			if (list.getRoleId().isEmpty()) {
				if (!list.getRoleId().contains(str)) {
					result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(record);

				}
			} else {
				if (!list.getRoleId().contains(str)) {
					record.setRoleId(list.getRoleId() + "," + str);
					result = serviceFacade.getGroupInfoService().updateByPrimaryKeySelective(record);
				}

			}
		}

		return success(result);
	}

}
