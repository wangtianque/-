package com.example.spring_mybatis.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.ibatis.transaction.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring_mybatis.dao.JUserModelInfoExtendMapper;
import com.example.spring_mybatis.dao.JUserModelInfoMapper;
import com.example.spring_mybatis.model.JUserModelInfo;
import com.example.spring_mybatis.service.iface.IJUserModelInfoService;

@Service
public class JUserModelInfoServiceImpl implements IJUserModelInfoService {
	@Resource
	JUserModelInfoExtendMapper jUserModelInfoExtendMapper;
	@Resource
 JUserModelInfoMapper jUserModeInfoMapper;

	@Override
	public int updataUserModelInfoByUserId(String userId, String modelId, String authorization) {
		List<JUserModelInfo> list = jUserModelInfoExtendMapper.selectJUserModelInfoByUserId(userId);
		if (list.size() == 0) {
			insertUserModelInfo(userId, modelId, authorization);
		} else {
			Set<String> temp = new HashSet<>();
			temp.addAll(Arrays.asList(modelId.trim().split(",")));

			List<String> autTemp = new ArrayList<>();
			autTemp.addAll(Arrays.asList(authorization.trim().split(",")));

			List<String> modleList = new ArrayList<>();
			modleList.addAll(temp);

			for (int i = 0; i < modleList.size(); i++) {
				JUserModelInfo param = new JUserModelInfo();
				param.setUserId(userId);
				param.setModelId(Integer.valueOf(modleList.get(i)));
				param.setAuthorization(autTemp.get(i));
				jUserModelInfoExtendMapper.updateUserModelInfoByUserId(userId, param.getModelId(),
						param.getAuthorization());
			}
		}

		return 1;
	}
	@Override
	public int insertSelective(JUserModelInfo record) {
		return jUserModeInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByModelId(Integer modelId) {
		return jUserModeInfoMapper.deleteByModelId(modelId);
	}
	@Override
	public List<JUserModelInfo> selctUserModelInfoByUserId(String userId) {

		return jUserModelInfoExtendMapper.selectJUserModelInfoByUserId(userId);
	}

	@Override
	
	public int insertUserModelInfo(String userId, String modelId, String authorization) {
		Set<String> temp = new HashSet<>();
		temp.addAll(Arrays.asList(modelId.trim().split(",")));

		List<String> autTemp = new ArrayList<>();
		autTemp.addAll(Arrays.asList(authorization.trim().split(",")));

		List<String> modlist = new ArrayList<>();
		modlist.addAll(temp);

		for (int i = 0; i < modlist.size(); i++) {
			JUserModelInfo param = new JUserModelInfo();
			param.setUserId(userId);
			param.setModelId(Integer.valueOf(modlist.get(i)));
			param.setAuthorization(autTemp.get(i));
			jUserModeInfoMapper.insert(param);
		}
		return 1;
	}
}
