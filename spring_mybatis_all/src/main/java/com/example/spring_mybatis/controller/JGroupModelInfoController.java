package com.example.spring_mybatis.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.common.ResultDTO;
import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.GroupInfo;
import com.example.spring_mybatis.model.GroupInfoWithBLOBs;
import com.example.spring_mybatis.model.JGroupModelInfo;
import com.example.spring_mybatis.model.JRoleModelInfo;
import com.example.spring_mybatis.model.ModelInfo;
import com.github.pagehelper.util.StringUtil;
import com.zaxxer.hikari.util.SuspendResumeLock;

@RestController
@RequestMapping("/JGroupModelInfo")
public class JGroupModelInfoController extends BaseController {
	@RequestMapping(value = "/insertSelective", method = RequestMethod.POST)
	public ResultDTO insertSelective(JGroupModelInfo record) {
		int result = serviceFacade.getJGroupModelInfoService().insertSelective(record);
		return success(result);
	}

	@RequestMapping(value = "/insertModel", method = RequestMethod.POST)
	public ResultDTO insertModel(@RequestParam("groupId") Integer groupId, @RequestParam("modelId") String modelId,
			@RequestParam("authorization") String authorization, @RequestParam("modelIndex") Integer modelIndex) {
		int result = 0;
		try {
			StringBuffer str = new StringBuffer();
			str.append(authorization);
			for (int i = 20; i < authorization.length(); i += modelIndex + 1) {
				str.insert(i, ",");
			}

			String[] arr = modelId.split(",");
			String[] arrTwo = str.toString().split(",");

			for (int i = 0; i < arr.length; i++) {
				result = serviceFacade.getJGroupModelInfoService().insertModle(groupId, Integer.valueOf(arr[i]),
						arrTwo[i]);
			}
			return success(result);
		} catch (Exception e) {

		}
		return success(result);
	}

	@RequestMapping(value = "/updateAuthorizationByGroupId", method = RequestMethod.POST)
	public ResultDTO updateAuthorizationByGroupId(@RequestParam("authorization") String authorization,
			@RequestParam("groupId") Integer groupId, @RequestParam("modelId") String modelId,
			@RequestParam("modelIndex") Integer modelIndex) {
		int result = 0;
		StringBuffer str = new StringBuffer();

		str.append(authorization);
		for (int i = 20; i < authorization.length(); i += modelIndex + 1) {
			str.insert(i, ",");
		}

		String[] arr = modelId.split(",");
		String[] arrTwo = str.toString().split(",");

		for (int i = 0; i < arr.length; i++) {
			result = serviceFacade.getJGroupModelInfoService().updateAuthorizationByGroupId(arrTwo[i], groupId,
					Integer.valueOf(arr[i]));
		}
		return success(result);
	}

	@RequestMapping(value = "/selectModelInfo", method = RequestMethod.GET)
	public ResultDTO selectModelInfo(@RequestParam("groupId") Integer groupId) {

		if (groupId != 0) {

			List<JGroupModelInfo> groupModelList = serviceFacade.getJGroupModelInfoService().selectModelInfo(groupId);
			GroupInfoWithBLOBs groupInfo = serviceFacade.getGroupInfoService().selectByPrimaryKey(groupId);
			if (groupInfo.getRoleId().contains(",")) {

				String[] roleIdArr = groupInfo.getRoleId().split(",");
				String str = "";
				for (int i = 0; i < roleIdArr.length; i++) {
					if(!roleIdArr[i].equals("")) {
						if(str.equals("")) {
							str = roleIdArr[i];
						}else {
							str = str + ","+ roleIdArr[i];
						}
					}
				}
				String[] arr = str.split(",");

				groupModelList.forEach(item -> {
					StringBuffer allStr = new StringBuffer(item.getAuthorization());
					for (int i = 0; i < arr.length; i++) {
						List<JRoleModelInfo> roleModelList = serviceFacade.getJRoleModelInfoService()
								.selectByPrimaryKey(Integer.valueOf(arr[i]));
						for (int j = 0; j < roleModelList.size(); j++) {
							for (int k = 0; k < roleModelList.get(j).getAuthorization().length(); k++) {
								if (item.getModelId() == roleModelList.get(j).getModelId()) {
									if (roleModelList.get(j).getAuthorization().charAt(k) == '1') {
										allStr = allStr.replace(k, k + 1, "1");
									}
								}
							}
							item.setAuthorization(allStr.toString());
						}
					}
				});

				groupModelList.forEach(item -> {
					String splitStr = "";
					for (int i = 0; i < item.getAuthorization().length(); i++) {
						if (splitStr.equals("")) {
							splitStr = String.valueOf(item.getAuthorization().charAt(i));
						} else {
							splitStr = splitStr + "," + String.valueOf(item.getAuthorization().charAt(i));
						}
					}
					item.setAuthorization(splitStr);
				});
				return success(groupModelList);

			} else {
				if (groupInfo.getRoleId() == null || StringUtil.isEmpty(groupInfo.getRoleId())) {
					groupModelList.forEach(item -> {
						String splitStr = "";
						for (int i = 0; i < item.getAuthorization().length(); i++) {
							if (splitStr.equals("")) {
								splitStr = String.valueOf(item.getAuthorization().charAt(i));
							} else {
								splitStr = splitStr + "," + String.valueOf(item.getAuthorization().charAt(i));
							}
						}
						item.setAuthorization(splitStr);
					});
					return success(groupModelList);
				} else {
					groupModelList.forEach(item -> {
						StringBuffer allStr = new StringBuffer(item.getAuthorization());

						List<JRoleModelInfo> roleModelList = serviceFacade.getJRoleModelInfoService()
								.selectByPrimaryKey(Integer.valueOf(groupInfo.getRoleId()));
						for (int j = 0; j < roleModelList.size(); j++) {
							for (int k = 0; k < roleModelList.get(j).getAuthorization().length(); k++) {
								if (item.getModelId() == roleModelList.get(j).getModelId()) {
									if (roleModelList.get(j).getAuthorization().charAt(k) == '1') {
										allStr = allStr.replace(k, k + 1, "1");
									}
								}

								item.setAuthorization(allStr.toString());
							}
						}
					});
					groupModelList.forEach(item -> {
						String splitStr = "";
						for (int i = 0; i < item.getAuthorization().length(); i++) {
							if (splitStr.equals("")) {
								splitStr = String.valueOf(item.getAuthorization().charAt(i));
							} else {
								splitStr = splitStr + "," + String.valueOf(item.getAuthorization().charAt(i));
							}
						}
						item.setAuthorization(splitStr);
					});

				}
			}

			return success(groupModelList);
		} else {
			List<JGroupModelInfo> all = serviceFacade.getJGroupModelInfoService().selectModelInfoAll();
			List<JGroupModelInfo> result = new ArrayList<JGroupModelInfo>();
			List<JGroupModelInfo> f = toSort(all, result, 0);
			List<String> names = new ArrayList<>();
			List<Integer> ids = new ArrayList<>();
			List<JGroupModelInfo> personList = result.stream().filter(// 过滤去重
					v -> {
						boolean flag = !names.contains(v.getModelName());

						names.add(v.getModelName());
						return flag;
					}).collect(Collectors.toList());
			personList.forEach(item -> {
				String splitStr = "";
				for (int i = 0; i < item.getAuthorization().length(); i++) {
					if (splitStr.equals("")) {
						splitStr = String.valueOf(item.getAuthorization().charAt(i));
					} else {
						splitStr = splitStr + "," + String.valueOf(item.getAuthorization().charAt(i));
					}
				}
				item.setAuthorization(splitStr);
			});
			return success(personList);
		}

	}

	@RequestMapping(value = "/selectModelInfoAll", method = RequestMethod.GET)
	public ResultDTO selectModelInfoAll() {
		List<JGroupModelInfo> result = serviceFacade.getJGroupModelInfoService().selectModelInfoAll();

		for (int i = 0; i < result.size(); i++) {
			String str = result.get(i).getAuthorization();
			String strTwo = "";
			for (int j = 0; j < str.length(); j++) {
				if (strTwo.equals("")) {
					strTwo = String.valueOf(str.charAt(j));
				} else {
					strTwo = strTwo + "," + str.charAt(j);
				}
			}
			result.get(i).setAuthorization(strTwo);

		}

		return success(result);
	}

	private static List<JGroupModelInfo> toSort(List<JGroupModelInfo> list, List<JGroupModelInfo> result,
			Integer father) {
		List<JGroupModelInfo> temp = new ArrayList<JGroupModelInfo>();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getParentId() == father) {
				temp.add(list.get(i));
			}
		}

		for (int i = 0; i < temp.size(); i++) {
			result.add(temp.get(i));
			toSort(list, result, temp.get(i).getModelId());
		}
		return result;

	}
}
