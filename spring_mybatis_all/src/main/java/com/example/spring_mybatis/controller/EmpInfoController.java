package com.example.spring_mybatis.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.New;
import com.example.spring_mybatis.model.NewTwo;
import com.example.spring_mybatis.service.iface.IEmpInfoService;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/empInfo")
public class EmpInfoController extends BaseController {

	@RequestMapping(value = "/selectByNumNameDepartmentId", method = RequestMethod.GET)
	public ResultDTO selectByNumNameDepartmentId(@RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize, @RequestParam(value = "empNum", required = false) String empNum,
			@RequestParam(value = "empName", required = false) String empName,
			@RequestParam("departmentId") String departmentId) {
		PageInfo<EmpInfo> result = serviceFacade.getEmpInfoService().getList(pageNum, pageSize, empNum, empName,
				departmentId);

		return success(result);
	}
	@RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResultDTO selectAll () {
        List<EmpInfo> empInfo = serviceFacade.getEmpInfoService().selectAll();
        return success(empInfo); 
    }
	@RequestMapping(value = "/empInfoAll", method = RequestMethod.GET)
	public List<EmpInfo> empInfoAll(){
		List<EmpInfo> selectEmpInfoAll=serviceFacade.getEmpInfoService().selectAll();
		return selectEmpInfoAll;
	}
	@RequestMapping(value = "/selectRoleAll", method = RequestMethod.GET)
	public ResultDTO selectRoleAll(@RequestParam("groupId") Integer groupId) {
		GroupInfoWithBLOBs list = serviceFacade.getGroupInfoService().selectByPrimaryKey(groupId);
		List<NewTwo> result = null;
		if (list.getRoleId().isEmpty()) {
			result = serviceFacade.getNewTwoService().selectRoleAll();
		} else {

			result = serviceFacade.getNewTwoService().selectRoleAll();
			if (list.getRoleId().contains(",")) {
				String[] str = list.getRoleId().split(",");
				for (int i = 0; i < str.length; i++) {
					for (int j = 0; j < result.size(); j++) {
						if (result.get(j).getRoleId().contains(str[i])) {
							result.remove(j);
						}
					}
				}
			} else {
				for (int i = 0; i < result.size(); i++) {
					if (result.get(i).getRoleId().contains(list.getRoleId())) {
						result.remove(i);
					}
				}

			}
		}
//	
//			result.forEach(a -> {
//				if (!a.getRoleId().contains(list.getRoleId())) {
//					newResult.add(a);
//				}
//			});

		return success(result);
	}
	@RequestMapping(value = "/selectRoleAllByGroupId", method = RequestMethod.GET)
	public ResultDTO selectRoleAllByGroupId(@RequestParam("groupId") Integer groupId) {
		List<NewTwo> result = serviceFacade.getNewTwoService().selectRoleAllByGroupId(groupId);
		return success(result);
	}
	@RequestMapping(value = "/selectRoleAllNo", method = RequestMethod.GET)
	public ResultDTO selectRoleAllNo() {

		List<NewTwo> result = serviceFacade.getNewTwoService().selectRoleAll();

		return success(result);
	}
	@RequestMapping(value = "/selectRoleAllByRoleName", method = RequestMethod.GET)
	public ResultDTO selectRoleAllByRoleName(@RequestParam(value = "roleName", required = false) String roleName,
			@RequestParam("groupId") Integer groupId) {
		List<NewTwo> result = null;
		GroupInfoWithBLOBs list = serviceFacade.getGroupInfoService().selectByPrimaryKey(groupId);
		if (list.getRoleId().isEmpty()) {
			result = serviceFacade.getNewTwoService().selectRoleAll();
		} else {
			result = serviceFacade.getNewTwoService().selectRoleAllByRoleName(roleName);
			if (list.getRoleId().contains(",")) {
				String[] str = list.getRoleId().split(",");
				for (int i = 0; i < str.length; i++) {
					for (int j = 0; j < result.size(); j++) {
						if (result.get(j).getRoleId().contains(str[i])) {
							result.remove(j);
						}
					}
				}
			} else {
				for (int i = 0; i < result.size(); i++) {
					if (result.get(i).getRoleId().contains(list.getRoleId())) {
						result.remove(i);
					}
				}

			}
		}
		return success(result);
	}
	@RequestMapping(value = "/selectUser", method = RequestMethod.GET)
	public ResultDTO selectUser(@RequestParam("groupId") Integer groupId) {

		List<New> result = serviceFacade.getNewService().selectUserByGroupId(String.valueOf(groupId));

		return success(result);
	}

	@RequestMapping(value = "/updateIsDel", method = RequestMethod.GET)
	public ResultDTO updateByPrimaryKeySelective(@RequestParam("empId") String empId) {
		int result = serviceFacade.getEmpInfoService().updateIsDel(empId);
		return success(result);
	}
	@RequestMapping(value = "/addEmpInfo", method = RequestMethod.POST)
	public ResultDTO add(@RequestBody EmpInfo empInfo) {
		int selectEmpNumRepeat = serviceFacade.getEmpInfoService().selectEmpNumRepeat(empInfo.getEmpNum());
		int result = 0;
		System.out.println(selectEmpNumRepeat);
		if (selectEmpNumRepeat == 0) {
			result = serviceFacade.getEmpInfoService().insertSelective(empInfo);
			return success(result);
		} else {
			return check(result);
		}
	}
	@RequestMapping(value = "/selectUserByNameAndUser", method = RequestMethod.GET)
	public ResultDTO selectUserByNameAndUser(@RequestParam(value = "userName", required = false) String userName,
			@RequestParam(value = "empName", required = false) String empName,
			@RequestParam(value = "departmentId", required = false) String departmentId) {

		List<New> result = serviceFacade.getUserEmpInfoService().selectUserByNameAndUser(userName, empName,
				departmentId);

		return success(result);
	}

	@RequestMapping(value = "/selectEmpInfoAll", method = RequestMethod.GET)
	public ResultDTO selectEmpInfoAll() {
		List<EmpInfo> result = serviceFacade.getEmpInfoService().selectEmpInfoAll();
		return success(result);
	}

	@RequestMapping(value = "/selectEmpInfoByDepartmentId", method = RequestMethod.GET)
	public ResultDTO selectEmpInfoByDepartmentId(@RequestParam("departmentId") String departmentId) {
		List<EmpInfo> result = serviceFacade.getEmpInfoService().selectByNumNameDepartmentId("", "", departmentId);
		System.out.println(result);
		return success(result);
	}

	@RequestMapping(value = "/selectByPrimaryKey", method = RequestMethod.GET)
	public ResultDTO selectByPrimaryKey(@RequestParam("empId") String empId) {
		List<EmpInfo> result = serviceFacade.getEmpInfoService().selectByPrimaryKey(empId);
		return success(result);
	}

	@RequestMapping(value = "/updateByPrimaryKeySelective", method = RequestMethod.POST)
	public ResultDTO update(@RequestBody EmpInfo empInfo) {
		int result = serviceFacade.getEmpInfoService().updateByPrimaryKeySelective(empInfo);
		return success(result);
	}
}
