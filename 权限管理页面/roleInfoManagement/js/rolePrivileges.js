$(function() {
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
	
	selectRoleAll();

	$('.roleAddUser').click(function() {
		console.log($('.roleAddUser').val())
		if ($('.roleAddUser').val() == 'group') {
			var roleId = $('.role-id-input-privileges').val();
			addgroup(roleId);
		} else if ($('.roleAddUser').val() == 'user') {
			var roleId = $('.role-id-input-privileges').val();
			adduser(roleId);
		}
	})
	$('.deleteRole').click(function() {
		var sValue = $('.role-id-input-privileges').val();
		var out = confirm('是否确认删除？');
		if (out) {
			deleteRole(sValue)
			alert('删除成功！');
			parent.location.reload()
		}

	})
	
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
	$('.addRole').click(function() {
		addPages()
	})
	$('.updateRole').click(function() {
		var sValue = $('.role-id-input-privileges').val();
		updateRole(sValue);
	})


	$('.roleDeleteUser').off('click').on('click', function() {
		if ($('.roleDeleteUser').val() == 'user') {
			$.each($("[name='Staff']:checked"), function(i, val) { //第一个参数表示索引下标，第二个参数表示当前索引元素
				var userId = val.value;
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleIdRoleUser',
					data: {
						'userId': userId
					},
					dataType: 'json',
					type: 'GET',
					success: function(res) {
						var sValue = $('.role-id-input-privileges').val();
						res.data.forEach(function(item, index) {
							var c = [];
							c = item.roleId.split(",");
							var roleId = "";
							c.forEach(function(asd, asda) {
								if (asd != sValue) {
									if (asd != null) {
										roleId += asd + ","
									}
								}
							})
							$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateUserRoleId',
								data: {
									'userId': userId,
									'roleId': roleId
								},
								dataType: 'json',
								type: 'POST',
									success: function(res) {
									alert('删除成功')
									parent.location.reload()
								}
							})
						})
					},
				})
			});
		} else if ($('.roleDeleteUser').val() == 'group') {
			$.each($("[name='Staff']:checked"), function(i, val) { //第一个参数表示索引下标，第二个参数表示当前索引元素
				var groupId = val.value;
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectGroupRoleIdAdd',
					data: {
						'roleId': groupId
					},
					dataType: 'json',
					type: 'GET',
					success: function(res) {
						var cValue = $('.role-id-input-privileges').val();
						res.forEach(function(item, index) {
							var a = [];
							a = item.roleId.split(",");
							var roleId = "";
							console.log(a)

							a.forEach(function(asd, asda) {

								if (asd != cValue) {
									if (asd != "") {
										roleId +=asd  +="," ;

									}
								}

							})
							console.log(roleId)
							$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateGroupRoleId',

								data: {
									'roleId': roleId,
									'groupId': groupId
								},
								dataType: 'json',
								type: 'POST',
								success: function(res) {
									alert('删除成功')
									parent.location.reload()
								}
							})
						})
					},
				})
			});
		}
	})


	$('.TheirRole').off('click').on('click', function() {
		var sValue = $('.role-id-input-privileges').val();
		$('.roleAddUser').show();
		$('.roleDeleteUser').show();
		selectRoleIdCheckUser(sValue);
		

	})
	$('.TheirGroup').off('click').on('click', function() {
		var sValue = $('.role-id-input-privileges').val();
		$('.roleAddUser').show();
		$('.roleDeleteUser').show();
		selectGroupRoleId(sValue);

	})


	$('.Jurisdiction').off('click').on('click', function() {
		var sValue = $('.role-id-input-privileges').val();
		$('.roleAddUser').hide();
		$('.roleDeleteUser').hide();

		selectRoleJurisdiction(sValue);
	})


})
var HtmlModelId = [];
var selectRoleJurisdiction = function(roleId) {

	var Html = [];
	var roleIdModel = roleId
	var index = 1;
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectModelAllLeftTree',
		data: {},
		dataType: "json",
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {

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
			res.forEach(function(item, index) {

				HtmlModelId.push(item.modelId)
				Html.push('<tr id="a' + index + '">');
				Html.push('<th class ="departmentClick departmentNameA"><b>' + item.modelName +
					'</b><input type="text" value="' + item.modelId + '" class=role-model-id></th>');
				console.log(roleIdModel)
				console.log(item.modelId)
				if (roleIdModel == undefined) {
					roleIdModel = $('.role-id-input-privileges').val();
				}
				var Jurisdiction = [];
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleJurisdiction',
					data: {
						'roleId': roleIdModel,
						'modelId': item.modelId
					},
					dataType: "json",
					async: false,
					type: 'GET',
					contentType: 'application/json;charset=utf-8',
					success(raes) {
						

						Jurisdiction = raes[0].authorization.split('');
						console.log(Jurisdiction)
						for (var i = 0; i < Jurisdiction.length; i++) {
							if(i<11){
								if (Jurisdiction[i]==1) {
									Html.push(
										'<td pane><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
										);
								} else {
									Html.push(
										'<td pane><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" disabled="disabled"></td>'
									);
									
								
								}
							}else {
								Html.push(
									'<td pane hidden><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
								);
							}
						
						}
					},
				})

				Html.push('<th></th>');
				Html.push('<th></th>');
				Html.push('</tr>');
				drawChildren(Html, item.childrenList, 1, roleIdModel, item.modelId);
			})
			$('.TableContent').html(Html.join(''));
			$('.role-model-id').hide();
			layui.use('form', function() {
				var form = layui.form;
				//从文档上复制的好像没有这句
				form.render();
				//监听提交
				form.on('submit(formDemo)', function(data) {
					layer.msg(JSON.stringify(data.field));
					return false;
				});
			});

		}
	})
}
var drawChildren = function(Html, childrenList, index, roleIdModel, modelId) {

	if (childrenList && childrenList.length > 0) {
		index++;
		childrenList.forEach(function(param) {
			HtmlModelId.push(param.modelId)
			Html.push('<tr>');
			Html.push('<th class="departmentClick departmentNameB" style="padding-left:' + index * 20 + 'px;">' + param.modelName +
				'<input type="text" value="' + param.modelId + '" class=role-model-id></th>');

			console.log(param.modelId)
			if (roleIdModel == undefined) {
				roleIdModel = $('.role-id-input-privileges').val();
			}
			var Jurisdiction = [];


			console.log(roleIdModel)
			$.ajax({
				url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleJurisdiction',
				data: {
					'roleId': roleIdModel,
					'modelId': param.modelId
				},
				async: false,
				dataType: "json",
				type: 'GET',
				contentType: 'application/json;charset=utf-8',
				success(raes) {
					Jurisdiction = raes[0].authorization.split('');
				for (var i = 0; i < Jurisdiction.length; i++) {
					if(i<11){
						if (Jurisdiction[i]==1) {
							Html.push(
								'<td pane><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
								);
						} else {
							Html.push(
								'<td pane><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" disabled="disabled"></td>'
							);
							
						
						}
					}else {
						Html.push(
							'<td pane hidden><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
						);
					}
				
				}
				},
			})

			Html.push('<th></th>');
			Html.push('<th></th>');
			Html.push('</tr>');
			if (param.childrenList && param.childrenList.length > 0) {
				drawChildren(Html, param.childrenList, index);
			}
		});
	}
}
var selectGroupRoleId = function(roleId) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectGroupRoleId',
		data: {
			'roleId': roleId
		},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			var Html = [];
			Html.push('<tr>')
			Html.push('<td pane><input  type="checkbox"  lay-skin="primary" id="c_all" lay-filter="c_all" value=""></td>')
			Html.push('<td>管理组名</td>')
			Html.push('<td>管理组描述</td>')
			Html.push('</tr>')
			res.forEach(function(item, index) {
				Html.push('<tr>')
				Html.push('<th><input class="checkAllGroup" name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="' + item.groupId +
					'"></th>')
				Html.push('<th>' + item.groupName + '</th>')
				Html.push('<th>' + item.groupDescription + '</th>')
				Html.push('</tr>')
			})
			$('.TableContent').html(Html.join(''));
			$('.roleAddUser').val("group")
			$('.roleDeleteUser').val("group")
			layui.use('form', function () {
			var form = layui.form;
			//全选
			form.on('checkbox(c_all)', function (data) {
			    var a = data.elem.checked;
			    if (a == true) {
			        $(".checkAllGroup").prop("checked", true);
			        form.render('checkbox');
			    } else {
			        $("checkAllGroup").prop("checked", false);
			        form.render('checkbox');
			    }
				 
			})
			})
			layui.use('form', function() {
				var form = layui.form;
				//从文档上复制的好像没有这句
				form.render();
				//监听提交
				form.on('submit(formDemo)', function(data) {
					layer.msg(JSON.stringify(data.field));
					return false;
				});
			});
		}
	})
}

var deleteRole = function(sValue) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleIdCheckUser',
		data: {
			'roleId': sValue
		},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			$.ajax({
				url: 'http://localhost:8888/manage_system/RoleJRoleModel/deleteByPrimaryKey',
				data: {
					'roleId': sValue
				},
				dataType: 'json',
				type: 'DELETE',
			})
			res.forEach(function(item, index) {
				var c = [];
				c = item.roleId.split(",");
				var roleId = "";
				c.forEach(function(asd, asda) {
					if (asd != sValue) {
						if (asd != null) {
							roleId += asd + ","
						}
					}
				})
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateUserRoleId',
					data: {
						'userId': item.userId,
						'roleId': roleId
					},
					dataType: 'json',
					type: 'POST',
				})
			})
			$.ajax({
				url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectGroupRoleIdAdd',
				data: {
					'roleId': sValue,
				},
				dataType: 'json',
				type: 'GET',
				contentType: 'application/json;charset=utf-8',
				success(res) {
					res.forEach(function(item, index) {
						var c = [];
						c = item.roleId.split(",");
						var roleId = "";
						c.forEach(function(asd, asda) {
							if (asd != sValue) {
								if (asd != null) {
									roleId += asd + ","
								}
							}
						})
						$.ajax({
							url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateGroupRoleId',
							data: {
								'userId': item.userId,
								'roleId': roleId
							},
							dataType: 'json',
							type: 'POST',
						})
					})


				}
			})
			$.ajax({
				url: 'http://localhost:8888/manage_system/RoleJRoleModel/deleteJRolemodel',
				data: {
					'roleId': sValue
				},
				dataType: 'json',
				type: 'DELETE',
			})
		}
	})
}
var addPages = function() {
	layui.use("layer", function() {
		var layer = layui.layer;
		layer.open({
			skin:'myskin',
			type: 2, // 解析URL
			
			shade: 0.5, // 遮罩
			closeBtn: 0, //关闭按钮
			// anim: 1, //弹出样式
			// move: false, // 禁止拖拽
			// resize: false,  // 禁止拉伸
			btnAlign: 'c', // 按钮居中显示
			title: false,
			
			// skin: 'CircleBorder',  圆型边框
			// btn: ['确认' , '取消'],
		
			title: ['添加角色', 'background-color:#40AFFE;border-radius:25px 25px 0 0;'],
			area: ['1300px', '800px'],
			content: ['rolePrivilegesAdd.html', 'no'],
		});
	});
}
var addgroup = function(roleId) {
	layui.use("layer", function() {
		var layer = layui.layer;
		layer.open({
			skin:'myskin',
			type: 2, // 解析URL
			shade: 0.5, // 遮罩
			closeBtn: 0, //关闭按钮
			// anim: 1, //弹出样式
			// move: false, // 禁止拖拽
			// resize: false,  // 禁止拉伸
			btnAlign: 'c', // 按钮居中显示
			// skin: 'CircleBorder',  圆型边框
			// btn: ['确认' , '取消'],
			title: ['添加管理組', 'background-color:#40AFFE;border-radius:25px 25px 0 0;'],
			area: ['1000px', '700px'],
			content: ['roleGroupAdd.html?roleId=' + roleId,'no'],
		});
	});
}
var updateRole = function(roleId) {
	layui.use("layer", function() {
		var layer = layui.layer;
		layer.open({
			skin:'myskin',
			type: 2, // 解析URL
			shade: 0.5, // 遮罩
			closeBtn: 0, //关闭按钮
			// anim: 1, //弹出样式
			// move: false, // 禁止拖拽
			// resize: false,  // 禁止拉伸
			btnAlign: 'c', // 按钮居中显示
			// skin: 'CircleBorder',  圆型边框
			// btn: ['确认' , '取消'],
			title: ['修改角色','background-color:#40AFFE;border-radius:25px 25px 0 0;'],
			area: ['1300px', '800px'],
			content: ['roleUpdateprivileges.html?roleId=' + roleId, 'no'],
		});
	});
}
var adduser = function(roleId) {
	layui.use("layer", function() {
		var layer = layui.layer;
		layer.open({
			skin:'myskin',
			type: 2, // 解析URL
			shade: 0.5, // 遮罩
			closeBtn: 0, //关闭按钮
			// anim: 1, //弹出样式
			// move: false, // 禁止拖拽
			// resize: false,  // 禁止拉伸
			btnAlign: 'c', // 按钮居中显示
			// skin: 'CircleBorder',  圆型边框
			// btn: ['确认' , '取消'],
			title: ['添加用戶', 'background-color:#40AFFE;border-radius:25px 25px 0 0;'],
			area: ['1300px', '700px'],
			content: ['roleUserAdd.html?roleId=' + roleId,'no'],
		});
	});
}
var selectRoleAll = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleAll',
		data: {},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
		
			selectRoleIdCheckUser(res[0].roleId);
			$('.rolePrivileges-choose-role').html('<i>' + res[0].roleName +
				'</i> <input type="text" class="role-id-input-privileges" value="' + res[0].roleId + '">')
			$('.role-id-input-privileges').hide();
			var Html = [];
			res.forEach(function(item, index) {
				Html.push('<ul class ="role-name-id-ul"><li ><span class="role-name" value="' + item.roleId + '">' + item.roleName +
					'</span><input type="text" class="input-role-id" value=' + item.roleId + '> </li> </ul>');
			})
			$('.role-name-span').html(Html.join(''));
			$('.input-role-id').hide();
			$('.role-name').click(function() {
				var departmentId = $(this).html();
				var sValue = $(this).siblings('input').val();
				var cValue = $(this).text();
				$('span').removeClass('fontCr');
				$(this).addClass('fontCr');
				selectRoleIdCheckUser(sValue);
				$('.rolePrivileges-choose-role').html('<i>' + cValue +
					'</i> <input type="text" class="role-id-input-privileges" value="' + sValue + '">')
				$('.role-id-input-privileges').hide();
			})
		}
	})
}
var selectRoleIdCheckUser = function(sValue) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleIdCheckUser',
		data: {
			'roleId': sValue
		},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			var Html = [];
			var record = 1;
			Html.push('<tr class="role-content">')
			Html.push(
				'<td pane><input name="Staff" type="checkbox"  lay-skin="primary" id="c_all" lay-filter="c_all"  value=""></td>')
			Html.push('<td>序号</td>');
			Html.push('<th class="user-name">用户名</th>');
			Html.push('<th>关联员工</th>');
			Html.push('<th>所在油站</th>');
			Html.push('<th>联系电话</th>');
			Html.push('<th>最后登录时间</th>');
			Html.push('<th>登录次数</th>');
			Html.push('</tr>')
			res.forEach(function(item, index) {
				Html.push('<tr class="role-content">')
				Html.push(
					'<td pane><input class="checkAllUser" name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="' + item.userId +
					'"></td>')
				Html.push('<td>' + record + '</td>');
				Html.push('<th class="user-name">' + item.userName + '</th>');
				Html.push('<th>' + item.empName + '</th>');
				Html.push('<th>' + item.departmentName + '</th>');
				Html.push('<th>' + item.tel + '</th>');
				Html.push('<th>' + dateFormata(item.mTime) + '</th>');
				Html.push('<th>' + 1 + '</th>');
				Html.push('</tr>')
				record++;
			})
			$('.TableContent').html(Html.join(''));
			$('.roleAddUser').val("user");
			$('.roleDeleteUser').val("user");
			layui.use('form', function () {
	        var form = layui.form;
	        //全选
	        form.on('checkbox(c_all)', function (data) {
	            var a = data.elem.checked;
	            if (a == true) {
	                $(".checkAllUser").prop("checked", true);
	                form.render('checkbox');
	            } else {
	                $("checkAllUser").prop("checked", false);
	                form.render('checkbox');
	            }
	 
	        })
			
	})
			layui.use('form', function() {
				var form = layui.form;
				//从文档上复制的好像没有这句
				form.render();
				//监听提交
				form.on('submit(formDemo)', function(data) {
					layer.msg(JSON.stringify(data.field));
					return false;
				});
			});

		}
	})
}
var dateFormata = function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	 * */
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// 拼接
	return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
