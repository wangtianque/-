package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_mybatis.dao.ConnectDepartmentInfoMapper;
import com.example.spring_mybatis.dao.ConnectEmpInfoMapper;
import com.example.spring_mybatis.dao.EmpInfoMapper;
import com.example.spring_mybatis.dao.RoleInfoExtendMapper;
import com.example.spring_mybatis.dao.UserInfoExtendMapper;
import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.EmpInfo;
import com.example.spring_mybatis.model.LeftTree;
import com.example.spring_mybatis.model.UserEmpInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.service.iface.ILeftTreeService;


@Service
public class LeftTreeServiceImpl implements ILeftTreeService {
	@Resource
	ConnectDepartmentInfoMapper connectDepartmentInfoMapper;
	@Resource
	UserInfoExtendMapper userInfoExtendMapper;
	@Override
	public List<LeftTree> selectAllDepartmentInfoEmpInfo() {
	
		List<LeftTree> allDepartmentInfo = connectDepartmentInfoMapper.selectAllDepartmentNameNoDel();
		List<UserEmpInfo> allEmpInfo = userInfoExtendMapper.selectAllUserInfo("","","");	
		//用户按油站id分类
		Map<String,List<UserEmpInfo>> empMap = new HashMap<>();
		allEmpInfo.forEach(item->{
			System.out.println("员工油站信息"+item.getDepartmentId()+"  "+item.getDepartmentName());
			if(empMap.containsKey(item.getDepartmentId())) {
				empMap.get(item.getDepartmentId()).add(item);
            } else {
                List<UserEmpInfo> tempList = new ArrayList<>();
                tempList.add(item);
                empMap.put(item.getDepartmentId(), tempList);
            }
		});
		
		//油站按parentId分上下级
		Map<String,List<LeftTree>> DepartmentInfoMap = new HashMap<>();
		allDepartmentInfo.forEach(item->{
			System.out.println("油站信息"+item.getDepartmentId()+"  "+item.getDepartmentName());
			if(empMap.containsKey(item.getDepartmentId())) {
				item.setEmpList(empMap.get(item.getDepartmentId()));
				}
			if(DepartmentInfoMap.containsKey(item.getParentId())) {
				DepartmentInfoMap.get(item.getParentId()).add(item);
				
			}  else {
                List<LeftTree> tempList = new ArrayList<>();
                tempList.add(item);
                DepartmentInfoMap.put(item.getParentId(), tempList);
            }
		});
		
		allDepartmentInfo.forEach(item->{
			if(DepartmentInfoMap.containsKey(item.getDepartmentId())) {
				item.setChildrenList(DepartmentInfoMap.get(item.getDepartmentId()));
			}
		});
		
	
		return DepartmentInfoMap.get("0");
		
		
	}
}
