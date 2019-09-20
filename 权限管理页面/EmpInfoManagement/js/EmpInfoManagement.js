$(function() {

	layui.use('form', function() {
		var form = layui.form;
		info.init();
		$("#add").click(function() {
			layer.open({
				type: 2,
				shadeClose: true,
				title: false,
				closeBtn: 0,
				skin: 'mylayer',
				area: ['500px', '600px'],
				content: 'AddEmpInfo.html', //这里content是一个普通的String
				end: function() {
					location.reload();
				}
			});
		});
	});
	
	// selectByNumNameDepartmentId();
	$('#select').click(function() {
		info.TableDataRequest(1);
	})

	$('#departmentInfoManagement').click(function() {
		window.location.href = "../DepartmentInfoManagement/departmentMainPage.html";
	})
	$('#login').click(function() {
		window.location.href = "../registerPage/login.html";
	})
	$("#Operator").click(function() {
		window.location.href = "../OperatorManagement/OperatorManagement.html";
	})
	//权限管理页面跳转部分
	$("#Rights").click(function() {
		window.location.href='../ModelInfo/ModelInfo.html'
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
		selectAllDepartMentName();
		layui.use('form', function () {
			var form = layui.form;
			form.render('select');
		});
		info.TableDataRequest(1);
		// info.TableDrawing();

		$('.MenuList li').off('click').on('click', function() {
			$('.MenuList li').removeClass('active');
			$(this).addClass('active');
		});

		$('.leftMenu .BottomMag .FunctionMenu').off('click').on('click', function() {
			$('.leftMenu .BottomMag .MenuList').slideToggle();
		});
	},
	//表格数据请求
	TableDataRequest: function(pageNum) {
		var check = true;
		var empNum = $('#empNum').val();
		var empName = $('#empName').val();
		var departmentId = $('#departmentId').val();
		if (departmentId == '0') {
			departmentId = '';
		}
		if (!$('#empName').val().match(/^[\u4E00-\u9FA5]{1,}$/) && $('#empName').val() != '') {
			// el.value = el.value.substring(0,el.value.length-1);
			$('#empName').val($('#empName').val().replace(/[^\u4e00-\u9fa5]{0,}$/, ''));
			alert('姓名只能输入汉字哦~[不允许输入除汉字以外的字符 例如空格或其他]');
			// el.value = '';
			check = false;
		}
		if (check) {
			$.ajax({
				url: 'http://localhost:8888/manage_system/empInfo/selectByNumNameDepartmentId',
				data: {
					'empNum': empNum,
					'empName': empName,
					'departmentId': departmentId,
					"pageNum": pageNum,
					"pageSize": 10
				},
				dataType: 'json',
				Type: 'GET',
				success: function(res) {
					if (res || res.data !== null) {
						console.log(res.data);
						info.TableDrawing(res.data);
					}
				},
				error: function(e) {

				}
			});
		}
	},
	//表格会绘制
	TableDrawing: function(data) {
		var Html = [];
		var data = {
			total: data.total,
			list: data.list,
			pageNum: data.pageNum
		};
		Html.push("<tr>");
		Html.push('<th pane><input name="All" type="checkbox" lay-skin="primary" lay-filter="Staff" value="all"></th>');
		Html.push('<th>序号</th>');
		Html.push('<th>员工编号</th>');
		Html.push('<th>员工姓名</th>');
		Html.push('<th>操作</th>');
		Html.push('<th>在职状态</th>');
		Html.push('<th>性别</th>');
		Html.push('<th>所在油站</th>');
		Html.push('<th>岗位/职位</th>');
		Html.push('<th>联系电话</th>');
		Html.push('<th>入职日期</th>');
		Html.push('<th>其他字段 略</th>');
		Html.push("</tr>");
		data.list.forEach(function(item, index) {
			Html.push('<tr>');
			Html.push('<td><input name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="' + item.empId +
				'"></td>');
			Html.push('<td class="bh" id="bh">' + (index + 1) + '</td>');
			Html.push('<td class="empNum">' + item.empNum + '</td>');
			Html.push('<td class="empName">' + item.empName + '</td>');
			Html.push(
				'<td><button type="button" class="layui-btn layui-btn layui-btn layui-btn-primary layui-btn layui-btn-sm AddStaff EmpInfo" ><span>查看</span></button><button type="button" class="layui-btn layui-btn layui-btn layui-btn-primary layui-btn layui-btn-sm AddStaff update"><span>修改</span></button><button type="button" class="layui-btn layui-btn layui-btn layui-btn-primary layui-btn layui-btn-sm AddStaff deleteEmp"><span>删除</span></button></td>'
			);
			if (item.status == 1) {
				Html.push('<td class="status">异常</td>');
			}
			if (item.status == 0) {
				Html.push('<td class="status">在职</td>');
			}
			if (item.sex == 0) {
				Html.push('<td class="sex">女</td>');
			}
			if (item.sex == 1) {
				Html.push('<td class="sex">男</td>');
			}
			console.log(item.isDel);
			if(item.isDel == 0){
			Html.push('<td class="departmentName" value = "' + item.departmentId + '">' + item.departmentName + '</td>');
			}else{
				Html.push('<td class="departmentName" value = "' + item.departmentId + '">' + '当前油站已被删除' + '</td>');
			}
			Html.push('<td class="job">' + item.job + '</td>');
			Html.push('<td class="tel">' + item.tel + '</td>');
			Html.push('<td class="empDate">' + dateFormat(item.empDate) + '</td>');
			Html.push('<td>其他字段 略<input type="hidden" class="empId" value=' + item.empId + '></input></td>');
			Html.push('</tr>');
		});



		$('#table').html(Html.join(''));
		layui.use('form', function() {
			var form = layui.form;
			form.render('checkbox');
			form.on('checkbox(Staff)', function(data) {
				console.log(data);
				console.log(data.elem); //得到checkbox原始DOM对象
				console.log(data.elem.checked); //是否被选中，true或者false
				console.log(data.value); //复选框value值，也可以通过data.elem.value得到
				console.log(data.othis); //得到美化后的DOM对象
				if (data.value == 'all') {
					console.log('全选');
				}
			});
		});
		info.Page(data);
	},


	Page: function(data) {
		layui.use('laypage', function() {
			var laypage = layui.laypage;

			//执行一个laypage实例
			laypage.render({
				elem: 'Page' //注意，这里的 test1 是 ID，不用加 # 号
					,
				count: data.total //数据总数，从服务端得到
					,
				limit: '10',
				theme: '#1E9FFF',
				curr: data.pageNum,
				groups: '5',
				jump: function(item, first) {
					if (!first) {
						info.TableDataRequest(item.curr)
					}
				}
			});
			$('.deleteEmp').click(function() {
				deleteEmpInfo(this);
			})
			$('.update').click(function() {
				updateEmpInfo(this);
			})
			$('.EmpInfo').click(function() {
				EmpInfo(this);
			})
		});
	}
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
var selectAllDepartMentName = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentName',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<option value="0">不限</option>');
			res.data.forEach(function(item, index) {
				console.log(item.departmentName);
				// if(item.parentId!='0'){
					Html.push('<option value = "' + item.departmentId + '">' + item.departmentName + '</option>');
				// }
			});
		console.log(Html);
			$('#departmentId').html(Html.join());
			layui.use('form', function () {
				var form = layui.form;
				form.render('select');
			});
			layui.use('element', function() {
	        var element = layui.element;
	        element.init();
			element.render();
	    });
		}
	
	});
	

}

var deleteEmpInfo = function(param) {
	var check = confirm('是否确认删除');
	if (check) {
		var empId = $(param).parents('tr').children('td').children('.empId').val();
		
		$.ajax({
			url: 'http://localhost:8888/manage_system/empInfo/updateIsDel',
			data:{"empId":empId},
			dataType: 'json',
			type: 'GET',
			success(res) {
				alert('删除成功！');
				window.location.reload();
			}
		});

	}

}
var updateEmpInfo = function(param) {
	var empId = $(param).parents('tr').children('td').children('.empId').val();
	layer.open({
		type: 2,
		shadeClose: true,
		title: false,
		closeBtn: 0,
		skin: 'mylayer',
		area: ['500px', '600px'],
		content: 'UpdateEmpInfo.html?value=' + empId, //这里content是一个普通的String
		end: function() {
			location.reload();
		}
	});



}
var EmpInfo = function(param) {
	var empId = $(param).parents('tr').children('td').children('.empId').val();
	layer.open({
		id:'EmpInfo',
		type: 2,
		shadeClose: true,
		title: false,
		closeBtn: 0,
		skin: 'mylayer',
		area: ['400px', '650px'],
		content: 'EmpInfo.html?value=' + empId, //这里content是一个普通的String

	});


}
var checkNum = function(el) {
	el.value = el.value.replace(/[^\w\_\‘]/ig, '');
	el.value = el.value.toUpperCase();
}
