//操作人员管理
$(function() {
	layui.use('form', function() {
		var form = layui.form;
		info.init();
	});
	$('.AddStaff').off('click').on('click', function() {
		addStaff();
	});
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
	$('.mail').click(function() {
		alert('暂无功能，待实现');
	});
	$('.logInAndOut').click(function() {
		var out = confirm('是否确认注销？');
		if (out) {
			window.location.href = "../registerPage.html";
			alert('注销成功！');
		}
	});
});
var info = {
	//页面主方法
	init: function() {
		info.selectStation();
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
			if ($('.active > .fa-file-text-o').parents().is($('.active'))) {
				window.location.href = "../ModelInfo/ModelInfo.html";
			}
		});
		$('.leftMenu .BottomMag .FunctionMenu').off('click').on('click', function() {
			$('.leftMenu .BottomMag .MenuList').slideToggle();
		});
		$('.InquireButton').off('click').on('click', function() {
			info.TableDataRequest(1);
		});
	},
	rePassWordById: function(userId) {
	
		var data = {
			"userId": userId
		}
		
		$.ajax({
			url: 'http://localhost:8888/manage_system/userInfo/updatePwd',
			contentType: 'application/json;charset=utf-8',
			data: data,
			dataType: 'json',
			type: 'GET',
			success: function(res) {
				alert(res.msg)
			}
		});
	},
	deleteByUserId: function(userId) {
		
		var data = {
			"userId": userId
		}
		$.ajax({
			url: 'http://localhost:8888/manage_system/userInfo/deleteByuserId',
			contentType: 'application/json;charset=utf-8',
			data: data,
			dataType: 'json',
			type: 'GET',
			success: function(res) {
				alert(res.msg);
				info.TableDataRequest(1);
			}
		});
	},
	//表格数据请求
	TableDataRequest: function(pageNum) {
		var userName = $('.user_name').val();
		var empName = $('#emp_name').val();
		var departmentId = $('.station option:selected').val();
		if (departmentId == '不限') {
			departmentId = null;
		}
		if (userName == '') {
			userName = null;
		}
		if (empName == '') {
			empName = null;
		}
		var data = {
			"userName": userName,
			"empName": empName,
			"departmentId": departmentId,
			"pageNum": pageNum,
			"pageSize": 10
		};
		$.ajax({
			url: 'http://localhost:8888/manage_system/userInfo/selectUserInfoLists',
			data: data,
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					info.TableDrawing(res.data);
				}
			},
		});
	},
	//表格会绘制
	TableDrawing: function(param) {
		var Html = [];
		var data = {
			total: param.total,
			list: param.list,
			pageNum: param.pageNum
		};
		
		data.list.forEach(function(item, index) {
			if (item.status == '1') {
				item.status = '有效';
			}
			if (item.status == '2') {
				item.status = '冻结';
			}
			if (item.status == '3') {
				item.status = '停用';
			}
			Html.push('<tr>');
			Html.push('    <th><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="' + item.userID +
				'"></th>');
			Html.push('    <th>' + (index + 1) + '</th>');
			Html.push('    <th>' + item.userName + '</th>');
			Html.push(
				'    <th><button class="layui-btn layui-btn-primary reset_password_btn ">重置密码</button><button class = "layui-btn layui-btn-primary Inquire">查看</button><button class="layui-btn layui-btn-primary edit">修改</button><button class="layui-btn layui-btn-danger del">删除</button></th>'
			);
			Html.push('    <th>' + item.status + '</th>');
			Html.push('    <th>' + item.empName + '</th>');
			Html.push('    <th>' + item.departmentName + '</th>');
			Html.push('    <th>' + item.remark + '</th>');
			Html.push('    <th>' + dateFormat(item.cTime) + '<input class="userId" type="hidden" value="'+item.userId+'" ></th>');
			
			// Html.push('    <th class="user_id" style="display:none;">' + item.userId + '</th>');
			Html.push('</tr>');
		});
		$('.TableContent').html(Html.join(''));
			
		$('.Inquire').off('click').on('click', function() {
			
			var userId = $(this).parents('tr').find('th .userId').val();
			
			viewOperators(userId);
		});

		$('.del').off('click').on('click', function() {
			var userId = $(this).parents('tr').find('th .userId').val();
			if (confirm("是否删除")) {
				info.deleteByUserId(userId);
			}
		});

		$('.edit').off('click').on('click', function() {
			var userId = $(this).parents('tr').find('th .userId').val();
			modificationOfOperators(userId);
		});

		$('.reset_password_btn').off('click').on('click', function() {
			var userId = $(this).parents('tr').find('th .userId').val();
			
			
			if (confirm("是否重置密码")) {
				info.rePassWordById(userId);
			}
		});

		layui.use('form', function() {
			var form = layui.form;
			form.render('checkbox');
			form.on('checkbox(Staff)', function(data) {
			
			
			
				
				
			});
		});
		info.Page(data);
		
	},
	selectStation: function() {
		$.ajax({
			url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentName',
			data: '',
			dataType: 'json',
			type: 'GET',
			success: function(res) {
				
				var html = [];
				html.push('<option>不限</option>');
				res.data.forEach(function(item) {
					html.push('<option class="departmentId" value =' + item.departmentId + '>' + item.departmentName +
						'</option>');
				});
				$('.station').html(html.join(''));
				layui.use(['layer', 'form'], function() {
					layui.form.render('select');
				});
				info.TableDataRequest(1);
			},
		});
	},
	Page: function(data) {
	
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			//执行一个laypage实例
			laypage.render({
				curr: data.pageNum,
				elem: 'Page',
				count: data.total,
				limit: '10',
				theme: '#1E9FFF',
				groups: '5',
				jump: function(item, first) {
					if (!first) {
						info.TableDataRequest(item.curr);
					}
				}
			});
		});
	}
};

var dateFormat = function(time) {
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
	return year + "-" + month + "-" + day;
}

var addStaff = function() {
	layer.open({
		type: 2,
		title: false,
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['500px', '500px'],
		content: 'AddingOperators.html', //iframe的url
		end: function() {
			location.reload();
		}
	});
	info.selectStation();
}

var modificationOfOperators = function(userId) {
	layer.open({
		type: 2,
		title: false,
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['500px', '500px'],
		content: 'ModificationOfOperators.html?userId=' + userId,
		end: function() {
			location.reload();
		}
	});
}

var viewOperators = function(userId) {
	
	layer.open({
		type: 2,
		title: false,
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['500px', '600px'],
		content: 'ViewOperators.html?userId=' + userId,
	});
	info.selectStation();
}
var checkUserName = function() {
	if ($('#user_name').val != '') {
		if (!$('#user_name').val().match(/^[\u0391-\uFFE5A-Za-z0-9-\s]+$/)) {
			alert('不能输入特殊符号！');
			$('#user_name').val('');
		}
	}
}
var checkEmpName = function() {
	if (!$('#emp_name').val().match(/^[\u4E00-\u9FA5]{1,}$/)) {
		alert('姓名只能输入汉字哦~');
		$('#emp_name').val('');
		return false;
	}
}
