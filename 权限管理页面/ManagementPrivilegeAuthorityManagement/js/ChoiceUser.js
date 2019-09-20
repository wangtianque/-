var userId = '';
$('document').ready(function() {
	var query = location.search.substring(1);
	var values = query.split("&");
	for (var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('=');
		if (pos == -1) continue;
		var paramname = values[i].substring(0, pos);
		var value = values[i].substring(pos + 1);
	};

	selectDepartmentId();
	$('#select').click(function() {
		getUserBy(value);
	})

	$('#exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	})
	$('#ok').click(function() {
		addUser(value);
	})
	getUser(value);
})
var addUser = function(groupId) {
	$('.table .checkbox:checked').each(function(item) {
		if (userId == '') {
			userId = $(this).next('.userId').val();
		} else {
			userId = userId + ',' + $(this).next('.userId').val();
		}
	});
	if (userId == '') {
		alert('请选择一或多位操作人员！');
	} else {
		var data = {
			'groupId': groupId,
			'userId': userId
		};
		console.log(data);
		$.ajax({
			url: 'http://localhost:8888/manage_system/userInfo/updateGroupIdByUserId',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				alert('添加成功！');
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index); //关闭当前页
			}
		});
	}
}

var selectDepartmentId = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentName',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<option value ="">不限</option>');
			res.data.forEach(function(item, index) {

				Html.push('<option value = "' + item.departmentId + '">' + item.departmentName + '</option>');

			});
			$('#department').html(Html.join());

		}

	});
}
var getUser = function(value) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectUserByNameAndUser',
		data: {
			'userName': '',
			'empName': '',
			'departmentId': '',
		},
		dataType: 'json',
		Type: 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			Html.push('<tr bgcolor="#33FF99">')
			Html.push('<td width="50">')
			Html.push('<input type="checkbox" style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkboxA" />')
			Html.push('</td>')
			Html.push('<td width="100">角色名</td>')
			Html.push('<td width="100">状态</td>')
			Html.push('<td width="100">关联员工</td>')
			Html.push('<td width="100">所在油站</td>')
			Html.push('<td width="100">备注</td>')
			Html.push('<td width="145">创建时间</td>')
			Html.push('<td width="145">最后一次登陆时间</td>')
			Html.push('</tr>')
			res.data.forEach(function(item, index) {
				var sear = new RegExp(value);
				if (!sear.test(item.groupId)) {
					Html.push('<tr>')
					Html.push('<td><input style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" class="checkbox" />' +
						'<input class="userId" type = "hidden" value = ' +
						item.userId +
						'>' + '</td>')
					Html.push('<td>' + item.userName + '</td>')
					if (item.status == 1) {
						Html.push('<td>有效</td>')
					}
					if (item.status == 2) {
						Html.push('<td>冻结</td>')
					}
					if (item.status == 3) {
						Html.push('<td>停用</td>')
					}

					Html.push('<td>' + item.empName + '</td>')
					Html.push('<td>' + item.departmentName + '</td>')
					Html.push('<td>' + item.remark + '</td>')
					Html.push('<td>' + dateFormat2(item.cTime) + '</td>')
					Html.push('<td>' + dateFormat2(item.mTime) + '</td>')
					Html.push('</tr>')
				}


			});
			$('.table').html(Html.join(''));
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
var getUserBy = function(value) {
	var userName = $('#userName').val();
	var empName = $('#empName').val();
	var departmentId = $('#department').val();
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectUserByNameAndUser',
		data: {
			'userName': userName,
			'empName': empName,
			'departmentId': departmentId,
		},
		dataType: 'json',
		Type: 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			Html.push('<tr bgcolor="#33FF99">')
			Html.push('<td width="50">')
			Html.push('<input type="checkbox" class="checkboxA" />')
			Html.push('</td>')
			Html.push('<td width="100">角色名</td>')
			Html.push('<td width="100">状态</td>')
			Html.push('<td width="100">关联员工</td>')
			Html.push('<td width="100">所在油站</td>')
			Html.push('<td width="100">备注</td>')
			Html.push('<td width="145">创建时间</td>')
			Html.push('<td width="145">最后一次登陆时间</td>')
			Html.push('</tr>')
			res.data.forEach(function(item, index) {
				var sear = new RegExp(value);
				if (!sear.test(item.groupId)) {
					Html.push('<tr>')
					Html.push('<td><input style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" class="checkbox" />' +
						'<input  class="userId" type = "hidden" value = ' +
						item.userId +
						'>' + '</td>')
					Html.push('<td>' + item.userName + '</td>')
					if (item.status == 1) {
						Html.push('<td>有效</td>')
					}
					if (item.status == 2) {
						Html.push('<td>冻结</td>')
					}
					if (item.status == 3) {
						Html.push('<td>停用</td>')
					}

					Html.push('<td>' + item.empName + '</td>')
					Html.push('<td>' + item.departmentName + '</td>')
					Html.push('<td>' + item.remark + '</td>')
					Html.push('<td>' + dateFormat2(item.cTime) + '</td>')
					Html.push('<td>' + dateFormat2(item.mTime) + '</td>')
					Html.push('</tr>')
				}
			});
			$('.table').html(Html.join(''));
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
