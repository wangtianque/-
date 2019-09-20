package com.example.spring_mybatis.controller;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.dao.RoleInfoMapper;
import com.example.spring_mybatis.dao.RoleJModelMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;

import com.example.spring_mybatis.model.JRoleLeftTreeInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.RoleJRoleModelInfo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfoWithBLOBs;
import com.github.pagehelper.util.StringUtil;


@CrossOrigin
@RequestMapping("/RoleJRoleModel")
@RestController                    
public class RoleJRoleModel extends BaseController {
	RoleInfoMapper roleJModelMapper;
	UserInfoExtendMapper userInfoExtendMapper;
	@RequestMapping(value = "/selectRoleAll" , method = RequestMethod.GET)
	public List<RoleInfo> selectRoleAll(){
		List<RoleInfo> selectRoleAll = serviceFacade.getRoleJRoleModelservice().selectAllRoleList();
		return selectRoleAll;
	}
		@RequestMapping(value = "/selectRoleIdCheckUser" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectRoleAll(Integer roleId){
			List<RoleJRoleModelInfo> selectRoleAll = serviceFacade.getRoleJModelMapper().selectRoleIdCheckUser(roleId);
			return selectRoleAll;
		}
		@RequestMapping(value = "/insertRoleModel" ,method = RequestMethod.POST)
		public int selectLastRoleId(@RequestBody JRoleModelInfo jRoleModelInfo) {
			int selectLastRoleId = serviceFacade.getRoleJModelMapper().insertSelective(jRoleModelInfo);
			return selectLastRoleId;
		}
		@RequestMapping(value = "/selectModelAllLeftTree" , method = RequestMethod.GET)
		public List<JRoleLeftTreeInfo> selectModelAllLeftTree(){
			List<JRoleLeftTreeInfo> selectModelAllLeftTree = serviceFacade.getRoleJModelMapper().selectLeftTree();
			return selectModelAllLeftTree;
		}
		@RequestMapping(value = "/inseRtrole" ,method = RequestMethod.POST)
		public Integer inseRtrole(@RequestBody RoleInfo roleInfo) {
			serviceFacade.getRoleJModelMapper().inseRtrole(roleInfo);
			int selectLastRoleId = roleInfo.getRoleId();
			System.out.println(selectLastRoleId);
			return selectLastRoleId;
		}
		@RequestMapping(value = "/deleteByPrimaryKey" ,method = RequestMethod.DELETE)
		public int deleteByPrimaryKey(@RequestParam("roleId")Integer roleId) {
			int selectModelAllLeftTree = serviceFacade.getRoleJModelMapper().deleteByPrimaryKey(roleId);
			return selectModelAllLeftTree;
		}
		@RequestMapping(value = "/updateUserRoleId" ,method = RequestMethod.POST)
		public int updateUserRoleId(@RequestParam("roleId")String roleId,@RequestParam("userId")String userId) {
			int updateUserRoleId=serviceFacade.getRoleJModelMapper().updateUserRoleId(roleId, userId);
			return updateUserRoleId;
		}
		@RequestMapping(value = "/deleteJRolemodel" ,method = RequestMethod.DELETE)
		public int deleteJRolemodel(@RequestParam("roleId")Integer roleId) {
			int selectModelAllLeftTree = serviceFacade.getRoleJModelMapper().deleteJRolemodel(roleId);
			return selectModelAllLeftTree;
		}
		@RequestMapping(value = "/selectAddRoleUser" , method = RequestMethod.GET)
		public ResultDTO selectAddRoleUser(@RequestParam("roleId")Integer roleId,
											@RequestParam("userName")String userName,
											@RequestParam("empName")String empName,
											@RequestParam("departmentId")String departmentId){
			List<RoleJRoleModelInfo> selectAddRoleUser = serviceFacade.getRoleJModelMapper().selectAddRoleUser(roleId,userName,empName,departmentId);
			return success(selectAddRoleUser);
		}
		@RequestMapping(value = "/updateUserRoleIdAdd" ,method = RequestMethod.POST)
		public int updateUserRoleIdAdd(@RequestParam("roleId")String roleId,@RequestParam("userId")String userId) {	
			int updateUserRoleId=serviceFacade.getRoleJModelMapper().updateUserRoleId(roleId, userId);
			return updateUserRoleId;
		}
		@RequestMapping(value = "/selectRoleIdRoleUser" , method = RequestMethod.GET)
		public ResultDTO selectRoleIdRoleUser(@RequestParam("userId")String userId){
			List<RoleJRoleModelInfo> selectRoleIdRoleUser = serviceFacade.getRoleJModelMapper().selectRoleIdRoleUser(userId);

			
			return success(selectRoleIdRoleUser);
		}
		@RequestMapping(value = "/selectGroupRoleId" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectGroupRoleId(@RequestParam("roleId") int roleId){
			List<RoleJRoleModelInfo> selectGroupRoleId = serviceFacade.getRoleJModelMapper().selectGroupRoleId(roleId);
			return selectGroupRoleId;
		}
		@RequestMapping(value = "/selectRoleGroupAll" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectRoleGroupAll(@RequestParam("roleId") Integer roleId , @RequestParam("groupName")String groupName){
			List<RoleJRoleModelInfo> selectRoleGroupAll = serviceFacade.getRoleJModelMapper().selectRoleGroupAll(roleId,groupName);
			
			return selectRoleGroupAll;
		}
		@RequestMapping(value = "/updateGroupinfoRoleId" ,method = RequestMethod.POST)
		public int updateGroupinfoRoleId(@RequestParam("roleId")String roleId,@RequestParam("groupId")Integer groupId) {
			int updateGroupinfoRoleId = serviceFacade.getRoleJModelMapper().updateGroupinfoRoleId(roleId, groupId);
			return updateGroupinfoRoleId;
		}
		@RequestMapping(value = "/selectGroupRoleIdAdd" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectGroupRoleIdAdd(@RequestParam("roleId")Integer roleId){
			List<RoleJRoleModelInfo> selectGroupRoleIdAdd = serviceFacade.getRoleJModelMapper().selectGroupRoleIdAdd(roleId);
			return selectGroupRoleIdAdd;
		}
		@RequestMapping(value = "/updateGroupRoleId" ,method = RequestMethod.POST)
		public int updateGroupRoleId (@RequestParam("roleId") String roleId , @RequestParam("groupId")Integer groupId) {
			return serviceFacade.getRoleJModelMapper().selectGroupRoleId(roleId, groupId);
		}
		@RequestMapping(value = "/selectRoleJurisdiction" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectRoleJurisdiction(@RequestParam("roleId")int roleId ,@RequestParam("modelId")int modelId){
			return serviceFacade.getRoleJModelMapper().selectRoleJurisdiction(roleId, modelId);
		}
		@RequestMapping(value = "/selectRoleAllLeftTree" , method = RequestMethod.GET)
		public List<RoleJRoleModelInfo> selectModelAllLeftTree(@RequestParam("roleId")int roleId){
			return serviceFacade.getRoleJModelMapper().selectModelAllLeftTree(roleId);
		}
		@RequestMapping(value = "/updateRoleAttribute" ,method = RequestMethod.POST)
		public int updateRoleAttribute(@RequestParam("roleName") String roleName , @RequestParam("roleDescription") String roleDescription , @RequestParam("roleId") int roleId ) {

			return serviceFacade.getRoleJModelMapper().updateRoleAttribute(roleName, roleDescription, roleId);
		}
		@RequestMapping(value = "/updateRoleJurisdiction" ,method = RequestMethod.POST)
		public int updateRoleJurisdiction(@RequestParam("authorization")String authorization,@RequestParam("roleId")int roleId,@RequestParam("modelId")int modelId) {
			return serviceFacade.getRoleJModelMapper().updateRoleJurisdiction(authorization, roleId, modelId);
		}
}
