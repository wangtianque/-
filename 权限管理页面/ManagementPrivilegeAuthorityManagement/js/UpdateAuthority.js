$(function() {
	layui.use('form', function() {
		var form = layui.form;
	});
	var query = location.search.substring(1);
	var values = query.split("&");
	for (var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('=');
		if (pos == -1) continue;
		var paramname = values[i].substring(0, pos);
		var value = values[i].substring(pos + 1);
	};
	getGroupInfo(value);
	$('.exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	});
	$('.ok').click(function() {
		updateGroupInfo(value);

	});


});
var getGroupInfo = function(value) {
	var Html = [];
	var arr = new Array();
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/selectByPrimaryKey',
		data: {
			'groupId': value
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			$('#groupName').val(res.data.groupName);
			$('#groupDescription').val(res.data.groupDescription);
			var roleId = res.data.roleId;
			Html.push('<tr bgcolor="#33FF99">');
			Html.push('	<td width="50">');
			Html.push('		<input type="checkbox" class="checkbox" />');
			Html.push('	</td>');
			Html.push('	<td width="125">角色名</td>');
			Html.push('	<td>角色描述</td>');
			Html.push('</tr>');
			arr = roleId.split('，');
			for (var i = 0; i < arr.length; i++) {
				Html.push('<tr>');
				Html.push('<td><input style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" class="checkbox" /></td>');
				Html.push('<td>' + arr[i] + '</td>');
				Html.push('<td></td>');
				Html.push('</tr>');
			}

			$('.roleTable').html(Html.join(''));
		}
	});
}
var updateGroupInfo = function(value) {
	var groupName = $('#groupName').val();
	var groupDescription = $('#groupDescription').val();
	var data = {
		'groupId': value,
		'groupName': groupName,
		'groupDescription': groupDescription
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/groupInfo/updateByPrimaryKeySelective',
		data: JSON.stringify(data),
		dataType: 'json',
		type: 'POST',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			alert('修改成功!');
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index); //关闭当前页
		}
	});
}
