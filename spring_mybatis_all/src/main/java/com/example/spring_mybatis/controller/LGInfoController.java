package com.example.spring_mybatis.controller;

import java.util.Date;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_mybatis.controller.base.BaseController;
import com.example.spring_mybatis.model.LGInfo;
import com.example.spring_mybatis.model.logInfo;
import com.example.spring_mybatis.service.iface.ILGInfo;
import com.github.pagehelper.PageInfo;

@CrossOrigin
@RequestMapping("/LogInfo")
@RestController
public class LGInfoController extends BaseController {
	ILGInfo log;
	@RequestMapping(value="/selectTime" , method = RequestMethod.GET)
	public PageInfo<LGInfo> selectTime(@PathParam("pagesize")int pagesize,@PathParam("pagenum")int pagenum,@PathParam("fromTime")Date fromTime ,@PathParam("endTime")Date endTime ,@PathParam("userName") String userName) {
		PageInfo<LGInfo> selectTime = serviceFacade.ILGInfoService().selectTime(pagesize,pagenum,fromTime,endTime,userName);
		return selectTime;
	}
	//查询所有
	@RequestMapping(value="/all" , method = RequestMethod.GET)
	public PageInfo<LGInfo> all(@PathParam("pagesize")int pagesize,@PathParam("pagenum")int pagenum,@PathParam("fromTime")long fromTime ,@PathParam("endTime")long endTime ,@PathParam("userName") String userName){
		PageInfo<LGInfo> all = serviceFacade.ILGInfoService().getList(pagenum, pagesize,fromTime,endTime);
		return all;
	}
	@RequestMapping(value = "/selectUserPawd" , method = RequestMethod.GET)
	public List<LGInfo> selectUserPassword(){
	
		List<LGInfo> selectUserPassword = serviceFacade.ILGInfoService().selectUserPassword();
		
		return selectUserPassword;
	}
	//添加日志
		@RequestMapping(value="/insert" , method = RequestMethod.POST)
		public int insert(@RequestBody logInfo lgInfo) {
			int insert = serviceFacade.ILGInfoService().insert(lgInfo);
			return insert;
		}
}
