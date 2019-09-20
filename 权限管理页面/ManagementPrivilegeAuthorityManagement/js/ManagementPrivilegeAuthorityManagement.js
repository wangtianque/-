var groupId = 0;
var buttonId = 1;

$(function() {
	$('.ok').hide();
	$('.exit').hide();
	$('.exit').click(function() {
		location.reload();
	});
	$('.ok').click(function() {
		if (groupId != 0) {
			var checkValue = '';
			var modelId = '';
			$('.userTable .modelId').each(function() {
				if (modelId == '') {
					modelId = $(this).val();
				} else {
					modelId = modelId + "," + $(this).val();
				}
			});
			var integer = 11;
			$(".userTable .checkbox").each(function() {
				if ($(this).is(':checked')) {
					$(this).val('1');
				} else {
					$(this).val('0');
				}


				checkValue += $(this).val();
				if (checkValue.length == integer) {
					integer += 20;
					checkValue += "000000000"
				}
			});
			if (checkValue == '') {
				alert('请选择一个或多个功能权限！');
			} else {
				var data = {
					'groupId': groupId,
					'modelId': modelId,
					'authorization': checkValue,
					'modelIndex': 20
				};
				console.log(checkValue);

				$.ajax({
					url: 'http://localhost:8888/manage_system/JGroupModelInfo/updateAuthorizationByGroupId',
					data: data,
					dataType: 'json',
					type: 'POST',
					success(res) {
						alert('修改成功！');
						location.reload();
					}
				});
			}
		} else {
			alert('请选择权限组！');
		}

	});
	// 	layui.use('form', function() {
	// 		var form = layui.form;
	// 		info.init();
	// 
	// 	});

	getALLGroupName();

	$('.add').click(function() {
		layer.open({
			type: 2,
			shadeClose: true,
			title: false,
			closeBtn: 0,
			skin: 'mylayer',
			area: ['1280px', '900px'],
			content: ['AddAuthority.html', 'no'], //这里content是一个普通的String
			end: function() {
				location.reload();
			}
		});
	});
	$('#deleteUser').click(function() {
		var userId = '';
		if (groupId != 0) {
			if (buttonId == 1) {
				userId = '';
				$('.userTable .checkbox:checked').each(function(item) {
					if (userId == '') {
						userId = $(this).next('.userId').val();
					} else {
						userId = userId + ',' + $(this).next('.userId').val();
					}
				});
				if (userId != '') {
					var data = {
						'userId': userId,
						'groupId': groupId
					};
					console.log(JSON.stringify(data));
					$.ajax({
						url: 'http://localhost:8888/manage_system/userInfo/updateByUserIdDelete',
						data: JSON.stringify(data),
						dataType: 'json',
						type: 'POST',
						contentType: 'application/json;charset=utf-8',
						success(res) {
							alert('删除成功');
							location.reload();
						}


					});
				} else {
					alert('请选择一个或多个用户！');
				}
			}
			if (buttonId == 2) {
				userId = '';
				$('.userTable .checkbox:checked').each(function(item) {
					if (userId == '') {
						userId = $(this).next('.roleId').val();
					} else {
						userId = userId + ',' + $(this).next('.roleId').val();
					}
				});
				if (userId != '') {
					var data = {
						'roleId': userId,
						'groupId': groupId
					};

					$.ajax({
						url: 'http://localhost:8888/manage_system/userInfo/updataByGroupIdDelete',
						data: JSON.stringify(data),
						dataType: 'json',
						type: 'POST',
						contentType: 'application/json;charset=utf-8',
						success(res) {
							alert('删除成功');
							location.reload();
						}


					});
				} else {
					alert('请选择一个或多个角色!');
				}

			}
		} else {
			alert('请选择一个组！');
		}


	});
	$('#addUser').click(function() {
		if (groupId != 0) {
			if (buttonId == 1) {
				layer.open({
					type: 2,
					shadeClose: true,
					title: false,
					closeBtn: 0,
					skin: 'mylayer',
					area: ['850px', '500px'],
					content: ['ChoiceUser.html?value=' + groupId, 'no'], //这里content是一个普通的String
					end: function() {
						location.reload();
					}
				});
			}
			if (buttonId == 2) {
				layer.open({
					type: 2,
					shadeClose: true,
					title: false,
					closeBtn: 0,
					skin: 'mylayer',
					area: ['740px', '500px'],
					content: ['ChoiceRole.html?value=' + groupId, 'no'], //这里content是一个普通的String
					end: function() {
						location.reload();
					}
				});
			}
		} else {
			alert('请选择一个组！');
		}

	})
	$('.update').click(function() {
		if (groupId != 0) {
			layer.open({
				type: 2,
				shadeClose: true,
				title: false,
				closeBtn: 0,
				skin: 'mylayer',
				area: ['600px', '500px'],
				content: ['UpdateAuthority.html?value=' + groupId, 'no'], //这里content是一个普通的String
				end: function() {
					location.reload();
				}
			});
		} else {
			alert('请点击选择一个管理组！');
		}
	});
	$('.delete').click(function() {
		if (groupId != 0) {
			var msg = confirm('确定删除？');
			if (msg) {
				deleteGroup();
			}
		} else {
			alert('请点击选择一个管理组！');
		}
	});
	$('.atitle').click(function() {

		$('.ok').hide();
		$('.exit').hide();
		getUser(groupId);



	})
	$('.btitle').click(function() {

		$('.ok').hide();
		$('.exit').hide();
		getRoleTable();




	})
	$('.ctitle').click(function() {

		getAuthority();


	})
	$('#EmpInfoManagement').click(function() {

		window.location.href = "../EmpInfoManagement/EmpInfoManagement.html";

	});
	$("#Rights").click(function() {
		window.location.href = '../ModelInfo/ModelInfo.html'
	});
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
	$('#departmentInfoManagement').click(function() {
		window.location.href = "../DepartmentInfoManagement/departmentMainPage.html";
	});
	$('#login').click(function() {
		window.location.href = "../registerPage/login.html";
	});
	$("#Operator").click(function() {
		window.location.href = "../OperatorManagement/OperatorManagement.html";
	});

	// selectByNumNameDepartmentId();
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
	var info = {
		//页面主方法
		init: function() {

			// info.TableDrawing();

			$('.MenuList li').off('click').on('click', function() {
				$('.MenuList li').removeClass('active');
				$(this).addClass('active');
			});

			$('.leftMenu .BottomMag .FunctionMenu').off('click').on('click', function() {
				$('.leftMenu .BottomMag .MenuList').slideToggle();
			});


		}
	}



});
var getALLGroupName = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/selectAllGroupInfo',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];

			res.data.forEach(function(item, index) {

				Html.push('<li class="groupName">' + item.groupName +
					'<input type="hidden" name="groupId" class="groupId" value ="' + item.groupId +
					'"/>' + '<li>');
				if (index == 0) {
					groupId = item.groupId
					$('.font2').text('所选管理组:' + item.groupName);
					getUser(groupId);
				}


			});
			$('.list').html(Html.join(''));
			$('.groupName').click(function() {
				$('.ok').hide();
				$('.exit').hide();
				groupId = $(this).find('.groupId').val();
				$('.font2').text('所选管理组:' + $(this).text());
				getUser(groupId);
			});
		}
	});
}
var dateFormat = function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return year + "-" + month + "-" + day;
}
var dateFormat2 = function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	return year + "-" + month + "-" + day + '  ' + hours + ':' + minutes + ':' + seconds;
}
var getAuthority = function() {
	if (groupId != 0) {
		$('.ok').show();
		$('.exit').show();
		$('.blue2').hide();
		$.ajax({
			url: 'http://localhost:8888/manage_system/JGroupModelInfo/selectModelInfo',
			data: {
				'groupId': groupId
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = [];
				Html.push('<tr>');
				Html.push('<td><b>功能模块维护</b></td>');
				Html.push('<td>访问</td>');
				Html.push('<td>检索</td>');
				Html.push('<td>新建</td>');
				Html.push('<td>修改</td>');
				Html.push('<td>查看</td>');
				Html.push('<td>删除</td>');
				Html.push('<td>审批</td>');
				Html.push('<td>打印</td>');
				Html.push('<td>下载</td>');
				Html.push('<td>生成报表</td>');
				Html.push('<td>发送信息</td>');
				Html.push('<td>预留扩展</td>');
				Html.push('<td>。。。</td>');
				Html.push('</tr>');
				var int = Html.length - 5;
				res.data.forEach(function(item, index) {


					Html.push('<tr class="Authority">');

					if (item.parentId == 0) {
						Html.push('<td><b>' + item.modelName + '</b><input type="hidden" class="modelId" value="' + item.modelId +
							'"/></td>');
					} else {
						Html.push('<td>->' + item.modelName + '<input type="hidden" class="modelId" value="' + item.modelId +
							'"/></td>');
					}
					var arr = new Array();
					arr = item.authorization.split(',');
					for (var i = 0; i < arr.length; i++) {
						if (int > i) {
							if (arr[i] == '1') {
								Html.push(
									'<td><input style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" value = "1" class="checkbox" checked/></td>'
								);
							} else {
								Html.push(
									'<td><input style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" value = "0" class="checkbox" /></td>'
								);
							}
						}
					}
					Html.push('<td></td>');
					Html.push('<td></td>');
					Html.push('</tr>');

				});
				$('.userTable').html(Html.join(''));

			}
		});
	} else {
		alert('请选择管理组！');
	}
}
var getRoleTable = function() {
	if (groupId != 0) {
		$('.blue2').show();
		buttonId = 2;
		$.ajax({
			url: 'http://localhost:8888/manage_system/empInfo/selectRoleAllByGroupId',
			data: {
				"groupId": groupId
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = [];
				Html.push('<tr>');
				Html.push('<td width="212">');
				Html.push(
					'<input type="checkbox" style="margin-left:100px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkboxA" lay-skin="primary" lay-filter="Staff" />'
				);
				Html.push('</td>');
				Html.push('<td>角色名</td>');
				Html.push('<td>角色描述</td>');
				Html.push('</tr>');
				res.data.forEach(function(item, index) {
					Html.push('<tr>');
					Html.push(
						'	<td><input type="checkbox" style="margin-left:100px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkbox" /><input type="hidden" class="roleId" value="' +
						item
						.roleId +
						'"/></td>');
					Html.push('<td>' + item.roleName + '</td>');

					Html.push('<td>' + item.roleDescription + '</td>')

					Html.push('</tr>');
				});
				$('.userTable').html(Html.join(''));
				$('.checkboxA').change(function() {
					if ($(".checkboxA").is(':checked')) {
						$('.checkbox').prop("checked", true);
					} else {
						$('.checkbox').prop("checked", false);
					}
				});

			}
		});

	} else {
		alert('请选择管理组！');
	}



}
var getUser = function(groupId) {
	console.log(groupId);
	$('.blue2').show();
	buttonId = 1;
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectUser',
		data: {
			"groupId": groupId
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			Html.push('<tr>');
			Html.push('<td>');
			Html.push(
				'<input type="checkbox" style="margin-left:99px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkboxA" />'
			);
			Html.push('</td>');
			Html.push('<td width="125">用户名</td>');
			Html.push('<td>姓名</td>');
			Html.push('<td>所在油站</td>');
			Html.push('<td>联系电话</td>');
			Html.push('<td>最后一次登陆时间</td>');
			Html.push('<td>登录次数</td>');
			Html.push('</tr>');

			res.data.forEach(function(item, index) {

				Html.push('<tr>');
				Html.push('<td>');
				Html.push(
					'	<input type="checkbox" style="margin-left:99px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkbox" /><input type="hidden" class="userId" value=' +
					item.userId +
					' />');
				Html.push('</td>');
				Html.push('<td ">' + item.userName + '</td>');
				Html.push('<td>' + item.empName + '</td>');
				Html.push('<td>' + item.departmentName + '</td>');
				Html.push('<td>' + item.tel + '</td>');
				Html.push('<td>' + dateFormat2(item.logTime) + '</td>');
				Html.push('<td>' + item.number + '</td>');
				Html.push('	</tr>');


			});

			$('.userTable').html(Html.join(''));

			$('.checkboxA').change(function() {
				if ($(".checkboxA").is(':checked')) {
					$('.checkbox').prop("checked", true);
				} else {
					$('.checkbox').prop("checked", false);
				}
			});

		}
	});
}

var deleteGroup = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/deleteByPrimaryKey/' + groupId,
		data: '',
		dataType: 'json',
		type: 'POST',
		success(res) {
			alert('删除成功！');
			window.location.reload();
		}
	});
}
