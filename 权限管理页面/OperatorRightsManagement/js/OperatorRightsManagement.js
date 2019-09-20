$(document).ready(function() {
	selectDepartmentNameAndEmpNameLists();
	//权限管理页面跳转部分

	$('.user-page').off('click').on('click', function() {
		window.location.href = '../OperatorRightsManagement/OperatorRightsManagement.html'
	});
	$('.model-page').off('click').on('click', function() {
		window.location.href = '../ModelInfo/ModelInfo.html'
	});
	$('.role-page').off('click').on('click', function() {
		window.location.href = '../roleInfoManagement/rolePrivileges.html'
	});
	$('.group-page').off('click').on('click', function() {
		window.location.href = '../ManagementPrivilegeAuthorityManagement/ManagementPrivilegeAuthorityManagement.html'
	});



	//查看权限
	$('.leftMenu .BottomMag .FunctionMenu').off('click').on('click', function() {
		$('.leftMenu .BottomMag .MenuList').slideToggle();
	});
	$('.operatorRole').off('click').on('click', function() {

		var userId = $('.userId').val();
		if (userId == '无') {
			alert('请先选择操作人员!');
			return false;
		} else {
			$('.typeAdd').val('model');
			openOperatorRoleList(userId);
		}
	});
	//查看组
	$('.group').off('click').on('click', function() {

		var userId = $('.userId').val();
		if (userId == '无') {
			alert('请先选择操作人员!');
			return false;
		} else {
			$('.typeAdd').val('group');
			openGroupPage(userId);
		}
	});
	//查看角色
	$('.role').off('click').on('click', function() {

		var userId = $('.userId').val();
		if (userId == '无') {
			alert('请先选择操作人员!');
			return false;
		} else {
			$('.typeAdd').val('role');
			openRolePage(userId);
		}
	});
	//添加角色
	$('.addBtn').off('click').on('click', function() {
		var userId = $('.userId').val();
		if (userId == '无') {
			alert('请先选择操作人员!');
			return false;
		} else {
			var type = $('.typeAdd').val();
			if (type == 'role') {
				openAddRolePage(userId);
			}
			if (type == 'group') {
				openAddGroupPage(userId);
			}
			if (type == 'model') {
				saveOperatorModel(userId);
			}

		}
	});


	$('.roleInfo-delete-button').off('click').on('click', function() {
		var userId = $('.userId').val();
		if (userId == '无') {
			alert('请先选择操作人员!');
			return false;
		} else {
			var type = $('.typeAdd').val();
			if (type == 'role') {
				roleId = '';
				$('.role-list :checkbox:checked').each(function(item) {

					var pram = $(this).parents('tr').find('th+.role_id').text();
					roleId += (pram + ',');
				});
				if (roleId == '') {
					alert('请勾选要删除的角色');
					return false;
				} else {
					roleId = roleId.substring(0, roleId.length - 1);
					addUserRoleInfo(userId, roleId, 'del');


				}
			}
			if (type == 'group') {
				groupId = '';
				$('.group-list :checkbox:checked').each(function(item) {

					var pram = $(this).parents('tr').find('th+.group_id').text();
					groupId += (pram + ',');
				});
				if (groupId == '') {
					alert('请勾选要删除的组');
					return false;
				} else {
					groupId = groupId.substring(0, groupId.length - 1);
					addUserGroupInfo(userId, groupId, 'del');

				}
			}
			if (type == 'model') {
				alert('模块权限只可修改不可删除');
			}


		}
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
});
var saveOperatorModel = function(userId) {
	var modelId = "";
	var index = 0;
	var str = "";
	var integer = 11;
	$('.operator-role-list :checkbox').each(function() {
		console.log(str.length);
		
		if ($(this).prop('checked') == true) {
			str = str + '1';
		} else {
			str = str + '0';
		}
		if (str.length == integer) {
			
			integer += 20;
			str += "000000000";
			modelId += $(this).parent().find('.modelId').val() + ',';
		}

		

		// 	

	});
	modelId = modelId.substring(0, modelId.length - 1);
	var newStr = "";
	var newIndex = 1;
	for (var i = 0; i < str.length; i++) {

		newStr += str.charAt(i);

		if (newIndex % 20 == 0) {
			newStr += ',';
		}
		newIndex++;
	}
	newStr = newStr.substring(0, newStr.length - 1);


	console.log(newStr);


	$.ajax({
		url: 'http://localhost:8888/manage_system/JUserModelInfo/updateJUserModelInfoByUserId',
		data: {
			"userId": userId,
			"modelId": modelId,
			"authorization": newStr
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'GET',
		success: function(res) {
			if (res.msg == '操作成功') {
				alert(res.msg);
			}
		}
	});
}
var openOperatorRoleList = function(userId) {
	var html = [];
	var btnElement = document.getElementById("addBtn");
	btnElement.innerHTML = '保存';
	var element = document.getElementById("TableList");
 // element.style.height = '500px';
 //  element.style.overflow = 'scroll';
	element.innerHTML =  '<div id="hd" scrolling="yes" style="width: 1140px;height: 400px; overflow-x:scroll">'+
	'<table class="layui-table layui-form operator-role-list"lay-even>' +
		'<colgroup>' +
		'<col width="6%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="1%">' +
		'<col width="4%">' +
		'<col width="4%">' +
		'<col width="6%">' +
		'<col width="1%">' +
		'</colgroup>' +
		'<thead class="table-head">' +
		'<tr>' +
		'<th>功能模块维护</th>' +
		'<th>访问</th>' +
		'<th>检索</th>' +
		'<th>新建</th>' +
		'<th>修改</th>' +
		'<th>查看</th>' +
		'<th>删除</th>' +
		'<th>审批</th>' +
		'<th>打印</th>' +
		'<th>下载</th>' +
		'<th>生成报表</th>' +
		'<th>发送消息</th>' +
		'<th>预留扩展</th>' +
		'<th>...</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody class="TableContent  operator-role-list-body" >'+
		'</tbody>' +
		'</table>'+
		'</div>';
	// element.style.height = 'auto';
	getModelTreeData(userId);



}
var getModelTreeData = function(userId) {



	$.ajax({

		url: 'http://localhost:8888/manage_system/modelTree/selectModelTree',
		data: {
			"userId": userId
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			var html = []

			if (res.msg == "没有数据") {

			}
			if (res.data && res.data.length !== 0 && res.data != null) {
				var html = []

				res.data.forEach(function(item) {
					html.push('<tr>');
					html.push('<th>' + item.modelName + '</th>');
					var str = item.authorization[0];

					for (var i = 0; i < str.length - 9; i++) {
						if (str.charAt(i) == '1') {
							html.push('<th><input name="All-' + item.modelId +
								'" type="checkbox" lay-skin="primary" lay-filter="model" value="1"checked><input type="text" class="hiden modelId" value="' +
								item.modelId + '"/> </th>');
						}
						if (str.charAt(i) == '0') {
							html.push('<th><input name="All-' + item.modelId +
								'" type="checkbox" lay-skin="primary" lay-filter="model" value="1"><input type="text" class="hiden modelId" value="' +
								item.modelId + '"/> </th>');
						}
					}
					html.push('<th></th>');
					html.push('<th></th>');

					html.push('</tr>');
					drawModelTree(html, item.children, 1);

				});


				$('.operator-role-list-body').html(html.join(''));

				checkBoxRefresh();
			} else {
				html.push(
					'<tr><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>'
				);
				$('.operator-role-list-body').html(html.join(''));
			}


		}
	});
}
var drawModelTree = function(Html, childrenList, index) {

	if (childrenList && childrenList.length > 0) {
		index++;
		childrenList.forEach(function(param) {

			Html.push('<tr>');
			Html.push('<th style="padding-left:' + index * 15 + 'px">' + param.modelName + '</th>');
			var str = param.authorization[0];
			for (var i = 0; i < str.length - 9; i++) {
				if (str.charAt(i) == '1') {
					Html.push('<th><input name="All-' + param.modelId +
						'" type="checkbox" lay-skin="primary" lay-filter="model" value="1"checked><input type="text" class="hiden modelId" value="' +
						param.modelId + '"/> </th>');
				}
				if (str.charAt(i) == '0') {
					Html.push('<th><input name="All-' + param.modelId +
						'" type="checkbox" lay-skin="primary" lay-filter="model" value="1"><input type="text" class="hiden modelId" value="' +
						param.modelId + '"/> </th>');
				}
			}
			Html.push('<th></th>');
			Html.push('<th></th>');

			Html.push('</tr>');

			if (param.children && param.children.length > 0) {
				drawModelTree(Html, param.children, index);
			}
		});
	}

}
var openRolePage = function(userId) {
	var btnElement = document.getElementById("addBtn");
	btnElement.innerHTML = '添加';
	var element = document.getElementById("TableList");
	element.style.overflow = '';

	element.innerHTML = 
	 '<div id="hd" scrolling="yes" style="width: 1140px;height: 400px; overflow-x:scroll">'+
	'<table class="layui-table layui-form role-list" lay-even>' +
		'<colgroup>' +
		'<col width="2%">' +
		'<col width="15%">' +
		'<col width="50%">' +
		'</colgroup>' +
		'<thead class="table-head">' +
		'<tr>' +
		'<th pane>' +
		'<input name="role_name" type="checkbox" lay-skin="primary" lay-filter="rolePage" value="all" class="head">' +
		'</th>' +
		'<th>角色名</th>' +
		'<th>角色描述</th>' +
		'<th class ="role_id hiden">角色Id</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody class="TableContent role-list-body">' +
		'</tbody>' +
		'</table>'+'</div>';
	getRoleIdByUserId(userId, 'role');
	element.style.height = 'auto';

	checkBoxRefresh();
}
var openGroupPage = function(userId) {
	var btnElement = document.getElementById("addBtn");
	btnElement.innerHTML = '添加';
	var element = document.getElementById("TableList");


	element.innerHTML =
	 '<div id="hd" scrolling="yes" style="width: 1140px;height: 400px; overflow-x:scroll">'+
	 '<table class="layui-table layui-form group-list" lay-even>' +
		'<colgroup>' +
		'<col width="2%">' +
		'<col width="20%">' +
		'<col width="50%">' +
		'</colgroup>' +
		'<thead class="table-head">' +
		'<tr>' +
		'<th pane>' +
		'<input name="role_name" type="checkbox" lay-skin="primary" lay-filter="groupPageList" value="all" class="head">' +
		'</th>' +
		'<th>管理组名</th>' +
		'<th>组描述</th>' +
		'<th class ="group_id hiden">组Id</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody class="TableContent group-list-body">' +
		'</tbody>' +
		'</table>'+'</div>';
		
	getRoleIdByUserId(userId, 'group');

	element.style.height = 'auto';

	checkBoxRefresh();
}

//左侧树形列表--待完善
var selectDepartmentNameAndEmpNameLists = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/leftTree/selectLeftTree',
		data: '',
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			var Html = [];

			if (res.data && res.data != null && res != undefined && res.data.length != 0) {
				var userIndex = 0;
				res.data.forEach(function(item) {
					Html.push('<ul>');
					Html.push('<li class="departmentClick departmentNameA">' + '<b>' + item.departmentName + '</b>' +
						'<input type="hidden" name="departmentA" class="departmentA" value =' + item.departmentId + '>' + '</li>');
					if (item.empList) {
						item.empList.forEach(function(temp) {
							Html.push('<li class = "user-name-click user-name-wapper"><span class="userNameText">' + temp.userName +
								'</span><input type ="text" name ="user-nameA" class="user-name" value="' + temp.userId + '">' +
								'</li>');
						});
					}
					Html.push('<ul>');
					drawChildren(Html, item.childrenList, 1);
					Html.push('</ul>');

					Html.push('</ul>');
				});
				$('.departmentName').html(Html.join(''));


				var userId = $('.user-name').val();
				var userName = $('.userNameText')[0].innerText;


				document.getElementById("ChoiceUserName").innerHTML = '所选操作人员：' + userName +
					'<input type="hidden" name="" id="" class="userId" value="' + userId + '" />';
				$('.typeAdd').val('role');
				openRolePage(userId);

				$('.departmentClick').click(function() {
					var departmentId = $(this).find('.departmentA').val();
					alert(departmentId);
				});
				$('.user-name-click').click(function() {
					var userId = $(this).find('.user-name').val();
					var userName = $(this).text();
					$('.user-name-click').find('.userNameText').removeClass('check');
					$(this).find(".userNameText").addClass('check')
					document.getElementById("ChoiceUserName").innerHTML = '所选操作人员：' + userName +
						'<input type="hidden" name="" id="" class="userId" value="' + userId + '" />';
					$('.typeAdd').val('role');
					openRolePage(userId);

				});
			} else {
				Html.push('<h2>沒有數據<h2>')
				$('.departmentName').html(Html.join(''));
			}


		}
	});
}





var drawChildren = function(Html, childrenList, index) {
	if (childrenList && childrenList.length > 0) {
		index++;
		childrenList.forEach(function(param) {

			Html.push('<li class="departmentClick departmentNameB" style="margin-left:' + index * 15 + 'px;">' + param.departmentName +
				'<input type="hidden" name="departmentA" class="departmentA" value =' + param.departmentId + '>' +
				'</li>');
			Html.push('<ul>');
			if (param.empList) {
				param.empList.forEach(function(temp) {
					Html.push('<li class = "user-name-click user-name-wapper"><span class="userNameText">' + temp.userName +
						'</span><input type ="text" name ="user-nameA" class="user-name" value="' + temp.userId + '">' + '</li>');
				});
			}
			if (param.childrenList && param.childrenList.length > 0) {
				drawChildren(Html, param.childrenList, index);
			}
		});
	}

}
var selectGroupInfoNoAddGroupInfo = function(userId) {

	var data = {
		"userId": userId
	}
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/selectGroupnfoNoAddGroupInfo',
		data: data,
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			var html = [];
			if (res.data && res.data.length != 0) {

				html = tableDrawingGroupInfo(res.data, 'groupAddPage');
				$('#addGroupPage').find('.group-list-body').html(html.join(''));
				checkBoxRefresh();
				layui.use('form', function() {

					var form = layui.form;
					//全选

					form.on('checkbox(groupAdd)', function(data) {

						if (data.value == 'all') {
							$(".Choice-groupAdd-name").prop("checked", true);
							form.render('checkbox');
						}
						if (data.value == 'all' && data.elem.checked == false) {
							$(".Choice-groupAdd-name").prop("checked", false);
							form.render('checkbox');
						}





					});


				});

			}
		}
	});

}

var getRoleIdByUserId = function(userId, type) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/selectUserByUserId',
		data: {
			"userId": userId
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			if (res.data) {
				if (type == 'role') {
					viewUserInfoRoleInfoByUserId(res.data);
				}
				if (type == 'group') {
					viewUserInfoGroupInfoByGroupId(res.data);
				}
			}
		}
	});
}
var selectNoAddRoleInfoList = function(userId) {
	var data = {
		"userId": userId
	}
	$.ajax({
		url: 'http://localhost:8888/manage_system/roleInfo/selectRoleInfoNoAddRoleInfo',
		data: data,
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			if (res.data) {
				var html = [];
				html = tableDrawingRoleInfo(res.data, 'roleAdd');
				$('.list').html(html.join(''));
				layui.use('form', function() {

					var form = layui.form;
					//全选

					form.on('checkbox(roleAdd)', function(data) {


						if (data.value == 'all') {
							$(".Choice-roleAdd-name").prop("checked", true);
							form.render('checkbox');
						}
						if (data.value == 'all' && data.elem.checked == false) {
							$(".Choice-roleAdd-name").prop("checked", false);
							form.render('checkbox');
						}
						$('.Choice-roleAdd-name:checked').each(function() {

						})

					});

				});
				checkBoxRefresh();
			}
		}
	});
}

var openAddGroupPage = function(userId) {
	layer.open({

		type: 1,
		title: ['添加管理组', 'color:#fff;background-color:#40AFFE;;border-radius:  25px 25px 0 0;'],
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['900px', '70%'],
		content: '<div class = "wapper">' +
			'<div class="fontjump">添加组</div>' +
			'<input type ="text"  class="add-role-user-id hiden" value="' + userId + '">' +
			'<div class="layui-form-item layui-inline">' +
			' <label class="layui-form-label">组名:</label>' +
			' <div class="layui-input-block">' +
			'  <input type="text" name="title" required placeholder="请输入管理组名" autocomplete="off" class="layui-input choise-group-name"/>' +
			' </div>' +
			' </div>' +
			'<div class="layui-form-item layui-inline selectGroupInfoButton-wapper">' +
			'             <button type="button" class="layui-btn layui-btn layui-btn-danger layui-btn layui-btn-sm selectGroupButton">' +
			'   <span>查询</span>' +
			'  </button>' +
			'  </div>' +
			'<div class="TableList" id="addGroupPage">' +
			'<table class="layui-table layui-form group-list" lay-even>' +
			'  <!--  colgroup 中定义表格列辐  -->' +
			' <colgroup>' +
			'    <col width="4%">' +
			'    <col width="20%">' +
			'    <col width="40%">	' +
			' </colgroup>' +
			' <thead>' +
			'  <tr>' +
			'   <th pane>' +
			'      <input name="group_add_name" type="checkbox"   lay-skin="primary" lay-filter="groupAdd" value="all">' +
			'    </th>' +
			'    <th>管理组名</th>' +
			'    <th>管理组描述</th>	' +
			'	<th class="group_id hiden">Id</th>' +
			'   </tr>' +
			'</thead>' +
			'<tbody class="TableContent group-list-body">' +
			'</tbody>' +
			'</table>' +
			'</div>' +
			'<div class="btn-jump-wapper">' +
			'<button class ="addUserGroupInfoOk layui-btn layui-btn-primary">确定</button>' +
			'<button class ="Cancle layui-btn layui-btn-primary">取消</button>' +
			'</div>',
		success: function() {
			selectGroupInfoNoAddGroupInfo(userId);

			$('.Cancle').off('click').on('click', function() {
				layer.closeAll('page');
			});
			$('.addUserGroupInfoOk').off('click').on('click', function() {
				var userId = $('.add-role-user-id').val();
				var groupId = '';


				$('.Choice-groupAdd-name:checked').each(function(item) {
					var pram = $(this).parents('tr').find('th+.group_id').text();
					groupId += (pram + ',');
				});
				if (groupId == '' || groupId == null || groupId == undefined) {
					alert('请选择管理组');
					return false;
				}
				groupId = groupId.substring(0, groupId.length - 1);
				addUserGroupInfo(userId, groupId, "add");
			});




			$('.selectGroupButton').off('click').on('click', function() {
				var groupName = $('.choise-group-name').val();

				selectGroupInfoByGroupNameOnSelectButton(groupName);
			});
		}


	});
}


var openAddRolePage = function(userId) {
	layer.open({
		type: 1,
		title: ['添加角色', 'color:#fff;background-color:#40AFFE;;border-radius:  25px 25px 0 0;'],
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['900px', '70%'],
		content: '<div class = "wapper">' +
			'<div class="fontjump">选择角色</div>' +
			'<input type ="text"  class="add-role-user-id hiden" value="' + userId + '">' +
			'<div class="layui-form-item layui-inline">' +
			' <label class="layui-form-label">角色名:</label>' +
			' <div class="layui-input-block">' +
			'  <input type="text" name="title" required placeholder="请输入角色名" autocomplete="off" class="layui-input choise-role-name"/>' +
			' </div>' +
			' </div>' +
			'<div class="layui-form-item layui-inline selectRoleInfoButton-wapper">' +
			'             <button type="button" class="layui-btn layui-btn layui-btn-danger layui-btn layui-btn-sm selectRoleInfoButton">' +
			'   <span>查询</span>' +
			'  </button>' +
			'  </div>' +
			'<div class="TableList">' +
			'<table class="layui-table layui-form role-list" lay-even>' +
			'  <!--  colgroup 中定义表格列辐  -->' +
			' <colgroup>' +
			'    <col width="4%">' +
			'    <col width="15%">' +
			'    <col width="40%">	' +
			' </colgroup>' +
			' <thead>' +
			'  <tr>' +
			'   <th pane>' +
			'      <input name="role_name" type="checkbox"  lay-skin="primary" lay-filter="roleAdd" value="all">' +
			'    </th>' +
			'    <th>角色名</th>' +
			'    <th>角色概述</th>	' +
			'	<th class="role_id hiden">角色Id</th>' +
			'   </tr>' +
			'</thead>' +
			'<tbody class="TableContent list">' +
			'</tbody>' +
			'</table>' +
			'</div>' +
			'<div class="btn-jump-wapper">' +
			'<button class ="addUserRoleIsOk layui-btn layui-btn-primary">确定</button>' +
			'<button class ="Cancle layui-btn layui-btn-primary">取消</button>' +
			'</div>',
		success: function() {
			// selectAllRoleInfoList();
			selectNoAddRoleInfoList(userId)
			$('.Cancle').off('click').on('click', function() {
				layer.closeAll('page');
			});
			$('.addUserRoleIsOk').off('click').on('click', function() {
				var userId = $('.add-role-user-id').val();
				var roleId = '';
				$('.Choice-roleAdd-name:checkbox:checked').each(function(item) {
					var pram = $(this).parents('tr').find('th+.role_id').text();
					roleId += (pram + ',');
				});
				if (roleId == '' || roleId == null || roleId == undefined) {
					alert('请选择角色');
					return false;
				}
				roleId = roleId.substring(0, roleId.length - 1);
				addUserRoleInfo(userId, roleId, "add");
			});
			$('.selectRoleInfoButton').off('click').on('click', function() {
				var roleName = $('.choise-role-name').val();

				selectRoleInfoByRoleNameOnSelectButton(roleName);
			});
		}
	});
};

var selectRoleInfoByRoleNameOnSelectButton = function(roleName) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/roleInfo/selectRoleInfoByRoleName',
		data: {
			"roleName": roleName
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			if (res.msg == '操作成功') {
				if (res.data && res.data.length != 0) {
					var Html = tableDrawingRoleInfo(res.data);
					$('.list').html(Html.join(''));
					checkBoxRefresh();
				}
			} else {
				alert(res.msg);
			}

		}
	});
}

var selectGroupInfoByGroupNameOnSelectButton = function(groupName) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/selectGroupInfoByGroupName',
		data: {
			"groupName": groupName
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			if (res.msg == '操作成功') {
				if (res.data && res.data.length != 0) {
					var Html = tableDrawingGroupInfo(res.data, 'groupPageList');
					$('.group-list-body').html(Html.join(''));
					checkBoxRefresh();
				}
			} else {
				alert(res.msg);
			}

		}
	});
}
//group
var addUserGroupInfo = function(userId, groupId, operator) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/updateUserGroupIdByUserId',
		data: {

			"userId": userId,
			"groupId": groupId,
			"operator": operator
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			if (res.msg != '操作成功') {
				alert(res.msg);
			} else {
				alert(res.msg);
				if (operator == 'add') {
					layer.closeAll('page');
					getRoleIdByUserId(userId, 'group');
				}
				if (operator == 'del') {
					getRoleIdByUserId(userId, 'group');
					openGroupPage(userId);
				}

			}
		}
	});
};
//role
var addUserRoleInfo = function(userId, roleId, operator) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/updateUserRoleInfoByUserId',
		data: {

			"userId": userId,
			"roleId": roleId,
			"operator": operator
		},
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			if (res.msg != '操作成功') {
				alert(res.msg);
			} else {
				alert(res.msg);
				if (operator == 'add') {
					layer.closeAll('page');
					getRoleIdByUserId(userId, 'role');
				}
				if (operator == 'del') {
					getRoleIdByUserId(userId, 'role');
					openRolePage(userId);
				}

			}
		}
	});
};
var viewUserInfoGroupInfoByGroupId = function(data) {
	if (data[0].groupId && data[0].groupId != null && data[0].groupId != undefined) {
		$.ajax({
			url: 'http://localhost:8888/manage_system/groupInfo/selectGroupInfoByGroupId',
			data: {
				"groupId": data[0].groupId
			},
			dataType: 'json',
			type: 'GET',
			success: function(res) {


				if (res.data && res.data.length != 0) {
					var Html = tableDrawingGroupInfo(res.data, 'groupPageList');
					$('.group-list-body').html(Html.join(''));
					layui.use('form', function() {

						var form = layui.form;
						//全选

						form.on('checkbox(groupPageList)', function(data) {

							if (data.value == 'all') {
								$(".Choice-groupPage-name").prop("checked", true);
								form.render('checkbox');
							}
							if (data.value == 'all' && data.elem.checked == false) {
								$(".Choice-groupPage-name").prop("checked", false);
								form.render('checkbox');
							}




						});

						checkBoxRefresh();

					});
				}
			},
			error: function() {

			}
		});
	}


}
var viewUserInfoRoleInfoByUserId = function(data) {
	if (data[0].roleId && data[0].roleId != null && data[0].roleId != undefined) {
		$.ajax({
			url: 'http://localhost:8888/manage_system/roleInfo/selectRoInfoByUserId',
			data: {
				"roleId": data[0].roleId
			},
			dataType: 'json',
			type: 'GET',
			success: function(res) {
				if (res.data && res.data.length != 0) {
					var Html = tableDrawingRoleInfo(res.data, 'rolePage');
					$('.role-list-body').html(Html.join(''));
					layui.use('form', function() {

						var form = layui.form;
						//全选

						form.on('checkbox(rolePage)', function(data) {

							if (data.value == 'all') {
								$(".Choice-rolePage-name").prop("checked", true);
								form.render('checkbox');
							}
							if (data.value == 'all' && data.elem.checked == false) {
								$(".Choice-rolePage-name").prop("checked", false);
								form.render('checkbox');
							}



							checkBoxRefresh();

						});
						checkBoxRefresh();
					});
				} else {
					var html = [];
					html.push('<tr>');
					html.push('<th>无</th>');
					html.push('<th>无</th>');
					html.push('<th>无</th>');
					html.push('<tr>');
					$('.role-list-body').html(html.join(''));
					checkBoxRefresh();
				}


			}
		});
	}
}




var tableDrawingGroupInfo = function(data, check) {
	var html = [];

	if (check == 'groupPageList') {
		data.forEach(function(item) {
			html.push('<tr>');
			html.push(
				'<th><input name="group_page_name" type="checkbox"  lay-skin="primary" lay-filter="groupPageList" class="Choice-groupPage-name" value="' +
				item.groupId + '"></th>');
			html.push('<th>' + item.groupName + '</th>');
			html.push('<th>' + item.groupDescription + '</th>');
			html.push('<th class="group_id hiden">' + item.groupId + '</th>');
			html.push('</tr>');
		});
	}
	if (check == "groupAddPage") {
		data.forEach(function(item) {
			html.push('<tr>');
			html.push(
				'<th><input name="group_add_name" type="checkbox"  lay-skin="primary" lay-filter="groupAdd" class="Choice-groupAdd-name" value="' +
				item.groupId + '"></th>');
			html.push('<th>' + item.groupName + '</th>');
			html.push('<th>' + item.groupDescription + '</th>');
			html.push('<th class="group_id hiden">' + item.groupId + '</th>');
			html.push('</tr>');
		});
	}



	return html;
};
var tableDrawingRoleInfo = function(data, check) {
	var html = [];
	if (check == 'roleAdd') {
		data.forEach(function(item) {
			html.push('<tr>');
			html.push(
				'<th><input name="role_name" type="checkbox"  lay-skin="primary" lay-filter="roleAdd" class="Choice-roleAdd-name" value="' +
				item.roleId + '"/></th>');
			html.push('<th>' + item.roleName + '</th>');
			html.push('<th>' + item.roleDescription + '</th>');
			html.push('<th class="role_id hiden">' + item.roleId + '</th>');
			html.push('</tr>');
		});
	}
	if (check == 'rolePage') {
		data.forEach(function(item) {
			html.push('<tr>');
			html.push(
				'<th><input name="role_name" type="checkbox"  lay-skin="primary" lay-filter="rolePage" class="Choice-rolePage-name" value="' +
				item.roleId + '"/></th>');
			html.push('<th>' + item.roleName + '</th>');
			html.push('<th>' + item.roleDescription + '</th>');
			html.push('<th class="role_id hiden">' + item.roleId + '</th>');
			html.push('</tr>');
		});
	}

	return html;
};

var checkBoxRefresh = function() {
	layui.use('form', function() {
		var form = layui.form;
		form.render('checkbox');

	});
}
