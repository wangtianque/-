package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.example.spring_mybatis.dao.DepartmentInfoMapper;
import com.example.spring_mybatis.dao.DepartmentMapper;
import com.example.spring_mybatis.model.Department;
import com.example.spring_mybatis.model.DepartmentInfo;
import com.example.spring_mybatis.model.UserInfo;
import com.example.spring_mybatis.service.iface.IDepartmentInfoService;
import com.example.spring_mybatis.service.iface.IDepartmentService;

@Service
public class DepartmentServiceImpl implements IDepartmentService {
	@Resource
	DepartmentMapper departmentInfomapper;

    //日志
    Logger logger = LoggerFactory.getLogger(getClass());

    private static final int ROLE_STUDENT = 0;
    private static final int ROLE_TEACHER = 1;
    
    //添加重写
    @Override
    public int insert(Department departmentInfo) {
        return departmentInfomapper.insert(departmentInfo);
    }
    
    //查找重写
    @Override
    public List<Department> selectByPrimaryKey(String departmentInfo) {
        return departmentInfomapper.selectByPrimaryKey(departmentInfo);
    }
    
    //修改重写
    @Override
    public int updateByPrimaryKey (Department departmentId) {
    	return departmentInfomapper.updateByPrimaryKey(departmentId);
    }
    
    //删除重写
    @Override
    public int deleteByPrimaryKey(Department departmentId) {
        return departmentInfomapper.deleteByPrimaryKey(departmentId);
    }
    
    //直接查询全部重写
    @Override
    public List<Department> selectAll() {
        return departmentInfomapper.selectAll();
    }
    
    public void main(String args[]) {
    	System.out.println("---------------------main------------------------");
    	selectAllForParentIdDepartmentId();
    }
    
    @Override
    public List<Department> selectAllForParentIdDepartmentId() {
    	List<Department> allTestList = departmentInfomapper.selectAllForParentIdDepartmentId();
    	
    	Map<String, List<Department>> testMap = new HashMap<>();
    	allTestList.forEach(test ->{
    		if(testMap.containsKey(test.getParentId())) {
    			testMap.get(test.getParentId()).add(test);
    		} else {
    			List<Department> tempList = new ArrayList<>();
    			tempList.add(test);
    			testMap.put(test.getParentId(), tempList);
    		}
    	});
    	
    	allTestList.forEach(test -> {
    		if(testMap.containsKey(test.getDepartmentId())) {
    			test.setChildrenList(testMap.get(test.getDepartmentId()));
    		}
    	});
    	return testMap.get("0");
    }   
}
