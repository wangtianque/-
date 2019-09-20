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
import com.example.spring_mybatis.service.iface.ModelInfoService;
import com.example.spring_mybatis.service.iface.NewService;
import com.example.spring_mybatis.service.iface.NewTwoService;
import com.example.spring_mybatis.service.iface.RoleJModelMapperService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceFacadeImpl implements IServiceFacade {
	 
    @Autowired
    IDepartmentService departmentService;
	@Autowired
	IJUserModelInfoService jUserModelInfoService;
	@Autowired
	IModelTreeService modelTreeService;
	@Autowired
	IGroupInfoService groupInfoService;
	@Autowired
	IRoleInfoService roleInfoService;
	@Autowired
	ILGInfo serviceFacade;
	@Autowired
	IUserInfoService userInfoService;
	@Autowired
	IUserEmpInfoService userEmpInfoService;
	@Autowired
	IDepartmentInfoService departmentInfoService;
	@Autowired
	IEmpInfoService empInfoService;
	@Autowired
	ILeftTreeService leftTreeService;
	@Autowired
	RoleInfoExtendMapper roleJRoleModel;
	@Autowired
	RoleJModelMapperService roleJModelMapper;
	@Autowired
	IJUserModelInfoService jrUserModelInfoService;
	@Autowired
	JGroupModelInfoService jGroupModelInfoService;
	@Autowired
	ModelInfoService modelInfoService;
	@Autowired
	JRoleModelInfoService jRoleModelInfoService;
	@Autowired
	NewService newService;
	@Autowired
	NewTwoService newTwoService;
	@Override
    public IDepartmentService getDepartmentService() {
        return departmentService;
    }
	@Override
	public NewService getNewService() {
		return newService;
	}

	@Override
	public NewTwoService getNewTwoService() {
		return newTwoService;
	}

	@Override
	public ModelInfoService getModelInfoService() {
		return modelInfoService;
	}

	@Override
	public IJUserModelInfoService getJUserModelInfoService() {
		return jrUserModelInfoService;
	}

	@Override
	public JRoleModelInfoService getJRoleModelInfoService() {
		return jRoleModelInfoService;
	}

	@Override
	public JGroupModelInfoService getJGroupModelInfoService() {
		return jGroupModelInfoService;
	}

	@Override
	public RoleInfoExtendMapper getRoleJRoleModelservice() {
		return roleJRoleModel;
	}

	@Override
	public RoleJModelMapperService getRoleJModelMapper() {
		return roleJModelMapper;
	}

	@Override
	public IModelTreeService getModelTreeService() {
		return modelTreeService;
	}

	@Override
	public IRoleInfoService getRoleInfoService() {
		return roleInfoService;
	}

	@Override
	public IGroupInfoService getGroupInfoService() {
		return groupInfoService;
	}

	@Override
	public IJUserModelInfoService getUserModelInfoService() {
		return jUserModelInfoService;
	}

	@Override
	public IDepartmentInfoService getDepartmentInfoService() {
		return departmentInfoService;
	}

	@Override
	public IEmpInfoService getEmpInfoService() {
		return empInfoService;
	}

	@Override
	public IUserInfoService getUserInfoService() {
		return userInfoService;
	}

	@Override
	public IUserEmpInfoService getUserEmpInfoService() {
		return userEmpInfoService;
	}

	@Override
	public ILGInfo ILGInfoService() {
		return serviceFacade;
	}

	@Override
	public ILeftTreeService getLeftTreeService() {
		return leftTreeService;
	}

}
