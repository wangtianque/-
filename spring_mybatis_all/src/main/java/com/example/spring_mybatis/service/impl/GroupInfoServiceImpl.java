package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.GroupInfoExtendMapper;
import com.example.spring_mybatis.dao.GroupInfoMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.GroupInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.RoleInfo;
import com.example.spring_mybatis.service.iface.IGroupInfoService;

@Service
public class GroupInfoServiceImpl implements IGroupInfoService {
	@Resource
	GroupInfoMapper groupInfoMapper;

	@Resource
	GroupInfoExtendMapper groupInfoExtendMapper;
@Resource
UserInfoExtendMapper userInfoExtendMapper;
	
	@Override
	public List<GroupInfoWithBLOBs> selectNoAddGroupInfo(String userId){
		List<GroupInfoWithBLOBs> allGroupList = groupInfoExtendMapper.selectAllGroupInfo();
		List<GroupInfo> roleList = selectGroupInfoByUserGroupId(userInfoExtendMapper.selectOne(userId).get(0).getGroupId());
		
		
		if(roleList==null) {
			return allGroupList;
		}else {
			for(int i = 0 ; i< allGroupList.size();i++) {
				for(int j = 0 ; j< roleList.size();j++) {
					if(allGroupList.get(i).getGroupId()==roleList.get(j).getGroupId()) {
						allGroupList.remove(i);
						continue;
					}
				}
			}
			
			return allGroupList;
		}
		
		
	}
	@Override
	public List<GroupInfo> selectGroupInfoByUserGroupId(String groupId) {
		List<GroupInfo> roleList = new ArrayList<GroupInfo>();
	
		if (groupId != "" && groupId != null) {
			if (groupId.contains(",")) {
				String[] roleIdStringArr = groupId.split(",");

				Integer[] roleIdIntTempArr = new Integer[roleIdStringArr.length];

				for (int i = 0; i < roleIdStringArr.length; i++) {
					roleIdIntTempArr[i] = Integer.valueOf(roleIdStringArr[i]);
				}
				for (int i = 0; i < roleIdIntTempArr.length; i++) {
					roleList.add(groupInfoExtendMapper.selectByPrimaryKey(roleIdIntTempArr[i]));
				}
				
//				roleList.add(new GroupInfo(5,""));
				return roleList;
			} else {
				
//				roleList.add(new GroupInfo(5,""));
				roleList.add(groupInfoExtendMapper.selectByPrimaryKey(Integer.valueOf(groupId)));
				
				return roleList;
			}

		}
		return null;
	}

	@Override
	public List<GroupInfoWithBLOBs> selectAllGroupInfo() {
		
		return groupInfoMapper.selectAllGroupInfo();
	};

	@Override
	public List<GroupInfo> selectGroupInfoByGroupName(String groupName) {
		return groupInfoExtendMapper.selectGroupInfoByGroupName(groupName);
	};

	@Override
	public int insertSelective(GroupInfoWithBLOBs record) {
		return groupInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKey(Integer groupId) {
		return groupInfoMapper.deleteByPrimaryKey(groupId);
	}

	@Override
	public GroupInfoWithBLOBs selectByPrimaryKey(Integer groupId) {
		return groupInfoMapper.selectByPrimaryKey(groupId);
	}

	@Override
	public int updateByPrimaryKeySelective(GroupInfoWithBLOBs record) {
		return groupInfoMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<GroupInfoWithBLOBs> selectAllGroupByRoleId(String roleId) {
		return groupInfoMapper.selectAllGroupByRoleId(roleId);
	}
}
