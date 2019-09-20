package com.example.spring_mybatis.service.base;

import com.example.spring_mybatis.dao.RoleInfoExtendMapper;
import com.example.spring_mybatis.dao.RoleInfoMapper;
import com.example.spring_mybatis.service.iface.IDepartmentInfoService;
import com.example.spring_mybatis.service.iface.IDepartmentService;
import com.example.spring_mybatis.service.iface.IEmpInfoService;
import com.example.spring_mybatis.service.iface.IGroupInfoService;
import com.example.spring_mybatis.service.iface.IJUserModelInfoService;
import com.example.spring_mybatis.service.iface.ILGInfo;
import com.example.spring_mybatis.service.iface.ILeftTreeService;
import com.example.spring_mybatis.service.iface.IModelTreeService;
import com.example.spring_mybatis.service.iface.IRoleInfoService;
import com.example.spring_mybatis.service.iface.IUserEmpInfoService;
import com.example.spring_mybatis.service.iface.IUserInfoService;
import com.example.spring_mybatis.service.iface.JGroupModelInfoService;
import com.example.spring_mybatis.service.iface.JRoleModelInfoService;
import com.example.spring_mybatis.service.iface.IJUserModelInfoService;
import com.example.spring_mybatis.service.iface.ModelInfoService;
import com.example.spring_mybatis.service.iface.NewService;
import com.example.spring_mybatis.service.iface.NewTwoService;
import com.example.spring_mybatis.service.iface.RoleJModelMapperService;



public interface IServiceFacade {
	IDepartmentInfoService getDepartmentInfoService();
	
	IEmpInfoService getEmpInfoService();
	
    IUserEmpInfoService getUserEmpInfoService();
    
    IUserInfoService getUserInfoService();
    
    ILGInfo ILGInfoService();
    
    IRoleInfoService getRoleInfoService();
    
    ILeftTreeService getLeftTreeService();
    
    IGroupInfoService getGroupInfoService();
    
    IModelTreeService getModelTreeService();
    
    IJUserModelInfoService getUserModelInfoService();
    
    RoleJModelMapperService getRoleJModelMapper();
    
    RoleInfoExtendMapper getRoleJRoleModelservice();
    
    JGroupModelInfoService getJGroupModelInfoService();
    
    JRoleModelInfoService getJRoleModelInfoService();
    
    IJUserModelInfoService getJUserModelInfoService();
    
    NewService getNewService();
    
    NewTwoService getNewTwoService();
    
    ModelInfoService getModelInfoService();
    
    IDepartmentService getDepartmentService();
    }
