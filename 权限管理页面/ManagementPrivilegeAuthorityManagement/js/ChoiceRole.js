var roleId = '';
$(document).ready(function() {
	var query = location.search.substring(1);
	var values = query.split("&");
	for (var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('=');
		if (pos == -1) continue;
		var paramname = values[i].substring(0, pos);
		var value = values[i].substring(pos + 1);
	};
	getRoleTwo(value);
	$('#select').click(function() {
		if ($('#roleName').val() == '') {
			getRoleTwo(value);
		} else {
			getRole(value);
		};
	})
	$('#exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	})
	$('#ok').click(function() {
		addRole(value);
	})
});

var addRole = function(groupId) {
	$('.table .checkbox:checked').each(function(item) {
		if (roleId == '') {
			roleId = $(this).next('.roleId').val();
		} else {
			roleId = roleId + ',' + $(this).next('.roleId').val();
		}
	});
	if (roleId == '') {
		alert('请选择一或多位操作人员！');
	} else {
		var data = {
			'groupId': groupId,
			'roleId': roleId
		};
		console.log(data);
		$.ajax({
			url: 'http://localhost:8888/manage_system/groupInfo/updateRoleId',
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
var getRole = function(value) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectRoleAllByRoleName',
		data: {
			'roleName': $('#roleName').val(),
			'groupId':value
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<tr bgcolor="#33FF99">');
			Html.push('<td width="50">');
			Html.push('<input type="checkbox" style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkboxA" />');
			Html.push('	</td>');
			Html.push('	<td width="125">角色名</td>');
			Html.push('	<td>角色描述</td>');
			Html.push('	</tr>');
			console.log(res);
			res.data.forEach(function(item, index) {

				Html.push('<tr>');
				Html.push('<td><input type="checkbox" style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkbox" /><input type="hidden" class="roleId" value="' + item.roleId +
					'"/></td>');
				Html.push('<td>' + item.roleName + '</td>');

				Html.push('<td>' + item.roleDescription + '</td>');


				Html.push('</tr>');
			});
			$('.table').html(Html.join(''));
			$('.checkboxA').change(function(){
				if($(".checkboxA").is(':checked')){
					$('.checkbox').prop("checked",true);
				}else{
					$('.checkbox').prop("checked",false);
				}
			});

		}
	});

}
var getRoleTwo = function(value) {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectRoleAll',
		data: {
			"groupId":value
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<tr bgcolor="#33FF99">');
			Html.push('	<td width="50">');
			Html.push('		<input type="checkbox" style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkboxA" />');
			Html.push('	</td>');
			Html.push('	<td width="125">角色名</td>');
			Html.push('	<td>角色描述</td>');
			Html.push('	</tr>');
			res.data.forEach(function(item, index) {
				Html.push('<tr>');
				Html.push('	<td><input type="checkbox" style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkbox" /><input type="hidden" class="roleId" value="' + item.roleId +
					'"/></td>');
				Html.push('<td>' + item.roleName + '</td>');

				Html.push('<td>' + item.roleDescription + '</td>')

				Html.push('</tr>');
			});
			$('.table').html(Html.join(''));
			$('.checkboxA').change(function(){
				if($(".checkboxA").is(':checked')){
					$('.checkbox').prop("checked",true);
				}else{
					$('.checkbox').prop("checked",false);
				}
			});

		}
	});

}
