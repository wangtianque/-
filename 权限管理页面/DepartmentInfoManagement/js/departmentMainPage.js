$(document).ready(function(){
	// var thisDepartmentId = '';
	viewSuperiorDepartment();
	$('.user-page').off('click').on('click',function(){
		window.location.href='../OperatorRightsManagement/OperatorRightsManagement.html'
	});
	$('.model-page').off('click').on('click',function(){
		window.location.href='../ModelInfo/ModelInfo.html'
	});
	$('.role-page').off('click').on('click',function(){
		window.location.href='../roleInfoManagement/rolePrivileges.html'
	});
	$('.group-page').off('click').on('click',function(){
		window.location.href='../ManagementPrivilegeAuthorityManagement/ManagementPrivilegeAuthorityManagement.html'
	});
	//点击事件跳转到员工管理页面
	$('#EmpInfoManagement').click(function(){
		window.location.href= "../EmpInfoManagement/EmpInfoManagement.html";
	});
	//点击事件跳转到操作人员管理页面
	$('#Operator').click(function(){
		window.location.href = "../OperatorManagement/OperatorManagement.html";
	});
	//点击事件跳转到日志管理
	$('#log').click(function(){
		window.location.href = "../registerPage/login.html";
	});
	
	//点击事件跳转到日志管理
	$('#Rights').click(function(){
		window.location.href = "../ModelInfo/ModelInfo.html";
	});
	
	 $('.MenuList li').off('click').on('click', function() {
	 	$('.MenuList li').removeClass('active');
	 	$(this).addClass('active');
	 	if ($('.active > .fa-home').parents().is($('.active'))) {
	 		window.location.href = "../EmpInfoManagement/EmpInfoManagement.html";
	 	}
	 	if ($('.active > .fa-user').parents().is($('.active'))) {
	 		window.location.href = "../DepartmentInfoManagement/departmentMainPage.html";
	 	}
	 	if ($('.active > .fa-cog').parents().is($('.active'))) {
	 		window.location.href = "../registerPage/login.html";
	 	}
	 	if ($('.active > .fa-envelope').parents().is($('.active'))) {
	 		window.location.href = "../OperatorManagement/OperatorManagement.html";
	 	}
	 	
	 	if ($('.active > .fa-file-text-o').parents().is($('.active'))) {
	 		window.location.href = "../ModelInfo/ModelInfo.html";
	 	}
	 	
	 });
	 $('.mail').click(function() {
	 	alert('暂无功能，待实现');
	 });
	 $('#logInAndOut').click(function() {
	 	var out = confirm('是否确认注销？');
	 	if (out) {
	 		window.location.href = "../registerPage.html";
	 		alert('注销成功！');
	 	}
	 });
	//点击事件跳转添加弹出层
	$('#addDepartment').click(function(){
		layuiAddWindowDepartment();
	});
	
	//点击事件跳转修改弹出层
	$('#updateDepartment').click(function(){
		// if(thisDepartmentId != ''){
		// 	layuiModifyWindowDepartment(thisDepartmentId);
		// }
		layuiModifyWindowDepartment();
	});
	
	//点击事件跳转查看弹出层
	$('#viewDepartment').click(function(){
		layuiViewWindowDepartment();
	});
	
	//点击事件删除
	$('#deleteDepartment').click(function(){
		deleteDepartmentInfoByDepartmentId();
	});
	
});

//查找油站
var viewSuperiorDepartment = function(){
	// var parentId;
	$.ajax({
		url : 'http://localhost:8888/manage_system/department/selectAllForParentIdDepartmentId',
		data : {},
		dataType : 'json',
		type : 'GET',
		contentType :'application/json;charset=utf-8',
		success(res) {
			console.log(res);
			var Html = [];
			Html.push('<li>'+'所有油站');
			//所有油站的子类
			Html.push('<ul>');
			// if(res.data > 0){
			// 	
			// }
			if(res.data != null){
				console.log(res);
				res.data.forEach(function(item){
					if(item.isDel = "0"){
						//查询父类油站
						Html.push('<li class="father" value="'+item.departmentId+'">'+item.departmentName);
						//调用递归方法查询子类必须用父类的<li>标签包着所有子类这是treeview的格式
						console.log(item.departmentName);
						recursionHtmlChildrenList(Html,item.childrenList);
						Html.push('</li>');
					}
				});
			}
			Html.push('</ul>');
			Html.push('</li>');
			//添加到html里
			$('#browser').html(Html.join(''));
			//使用插件
			$("#browser").treeview({
				toggle: function() {
					
				}
			});	
		},
	});	
}


//父子级递归列表
var recursionHtmlChildrenList = function(Html,childrenList){
	//判断父类是否有子类
	if (childrenList && childrenList.length > 0) {
		//循环子类
		childrenList.forEach(function(param){
			//子类必须再次用<ul>标签<li>才能为上面父类的子类
			Html.push('<ul>');
			//push到Html数组里
			Html.push('<li value="'+param.departmentId+'">'+param.departmentName);
			//判断使用递归方法
			if (param.childrenList && param.childrenList.length > 0) {
				recursionHtmlChildrenList(Html,param.childrenList);
			}
			Html.push('</li>');
			Html.push('</ul>');
		});
	}
	
}

//逻辑删除（主方法）通过departmentId来修改
var deleteDepartmentInfoByDepartmentId = function(){
	alert('请点击要选择修改的部门');
	$('li').click(function(){
		var departmentId = $(this).attr("value");
		console.log(departmentId);
		recursionDeleteDepartmentInfoByDepartmentId(departmentId);
		var department = $(this).find('ul').find('li');
		if(department){
			department.each(function(index,obj){
				var arrDepartmentId = $(obj).attr("value");
				console.log(arrDepartmentId);
				recursionDeleteDepartmentInfoByDepartmentId(arrDepartmentId);
			})
		}
		$("li").unbind();//解除点击的绑定
	});
}

//逻辑删除ajax（修改）
var recursionDeleteDepartmentInfoByDepartmentId = function(departmentId){
	var data = {
		"departmentId" :departmentId
	}
	console.log(data);
	$.ajax({
		url:'http://localhost:8888/manage_system/department/delete',
		data:JSON.stringify(data),
		dataType:'json',
		type:'POST',
		async:false,
		contentType:'application/json;charset=utf-8',
		success(res){
			if(res){
				alert("删除成功了呀");
				var department = $(this).find('.father').find('li');
				viewSuperiorDepartment();
			}
		},
		error(e){
			alert("删除失败");
		}
	});
}



//添加弹出层
var layuiAddWindowDepartment = function (){
	layui.use("layer",function(){
		var layer = layui.layer;
		layer.open({
			type: 2 //Page层类型
			,area: ['520px', '690px']
			,title: ['添加页面','background-color: #00BFFF;text-align: center;font-size: 25px;font-weight: bold;']
			,shade: 0.6 //遮罩透明度
			,maxmin: true //允许全屏最小化
			,content: '../DepartmentInfoManagement/addPage.html'
		});    
	});
}


//修改弹出层
var layuiModifyWindowDepartment = function (param){
	alert('请点击要选择修改的部门');
	$("li").click(function(){
		var departmentId = $(this).attr("value");
		// var departmentId = param;
		// console.log(departmentId);
		layui.use("layer",function(){
			var layer = layui.layer;
			layer.open({
				type: 2 //Page层类型
				,area: ['520px', '690px']
				,title: ['修改页面','background-color: #00BFFF;text-align: center;font-size: 25px;font-weight: bold;']
				,shade: 0.6 //遮罩透明度
				,maxmin: true //允许全屏最小化
				,content: '../DepartmentInfoManagement/modifyPage.html?departmentId='+ departmentId
			});    
		});
		$("li").unbind();//解除点击的绑定
	})
}

//查看弹出层
var layuiViewWindowDepartment = function (){
	alert('请点击要选择修改的部门');
	$("li").click(function(){
		var departmentId = $(this).attr("value");
		layui.use("layer",function(){
			var layer = layui.layer;
			layer.open({
				type: 2 //Page层类型
				,area: ['520px', '670px']
				,title: ['查看页面','background-color: #00BFFF;text-align: center;font-size: 25px;font-weight: bold;']
				,shade: 0.6 //遮罩透明度
				,maxmin: true //允许全屏最小化
				,btn: ["确认","取消"]
				,content: '../DepartmentInfoManagement/viewPage.html?departmentId='+ departmentId
			});    
		});
		$("li").unbind();//解除点击的绑定
	})
}