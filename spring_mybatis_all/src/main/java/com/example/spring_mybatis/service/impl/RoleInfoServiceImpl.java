package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.RoleInfoExtendMapper;
import com.example.spring_mybatis.dao.RoleInfoMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.service.iface.IRoleInfoService;

@Service
public class RoleInfoServiceImpl implements IRoleInfoService {
	@Resource
	RoleInfoExtendMapper roleInfoExtendMapper;
	@Resource
	UserInfoExtendMapper userInfoExtendMapper;
	@Override
	public List<RoleInfo> selectNoAddRoleInfo(String userId){
		List<RoleInfo> allGroupList = roleInfoExtendMapper.selectAllRoleList();
		List<RoleInfo> roleList = selectRoInfoByRoleId(userInfoExtendMapper.selectOne(userId).get(0).getRoleId());
		
		
		if(roleList==null) {
			return allGroupList;
		}else {
			for(int i = 0 ; i< allGroupList.size();i++) {
				for(int j = 0 ; j< roleList.size();j++) {
					if(allGroupList.get(i).getRoleId()==roleList.get(j).getRoleId()) {
						allGroupList.remove(i);
						continue;
					}
				}
			}
			return allGroupList;
		}
		
		
	}
	@Override
	public List<RoleInfo> selectAllList() {
		return roleInfoExtendMapper.selectAllRoleList();
	}
@Override
public List<RoleInfo> selectRoleInfoByRoleName(String roleName){
	return roleInfoExtendMapper.selectRoleInfoByRoleName(roleName);
}
	@Override
	public List<RoleInfo> selectRoInfoByRoleId(String roleId) {
		List<RoleInfo> roleList = new ArrayList<RoleInfo>();
		if(roleId !=""&& roleId!=null) {
			if(roleId.contains(",")) {
				String[] roleIdStringArr = roleId.split(",");
				
				Integer[] roleIdIntTempArr = new Integer[roleIdStringArr.length];
				
				for (int i = 0; i < roleIdStringArr.length; i++) {
					roleIdIntTempArr[i] = Integer.valueOf(roleIdStringArr[i]);
				}
				for(int i = 0;i<roleIdIntTempArr.length;i++) {
					roleList.add(roleInfoExtendMapper.selectRoleListByRoleId(roleIdIntTempArr[i]));
				}
				return roleList;
			}else {
				roleList.add(roleInfoExtendMapper.selectRoleListByRoleId(Integer.valueOf(roleId)));
				return roleList;
			}
			
			}
			
			
		return null;
	}
	
	@Resource
	private RoleInfoMapper roleInfoMapper;

	@Override
	public int updateByPrimaryKeySelective(RoleInfo record) {
		return roleInfoMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int insertSelective(RoleInfo record) {
		return roleInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKey(Integer roleId) {
		return roleInfoMapper.deleteByPrimaryKey(roleId);
	}

	@Override
	public List<RoleInfo> selectAllRoleInfo() {
		return roleInfoMapper.selectAllRoleInfo();
	}
}
