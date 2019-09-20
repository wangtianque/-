var checkboxStr = '';
$(function() {
	layui.use('form', function() {
		var form = layui.form;


	});
	$('.add').click(function() {
		layer.open({
			type: 2,
			shadeClose: true,
			title: false,
			closeBtn: 0,
			skin: 'mylayer',
			area: ['1090px', '600px'],
			content: ['AddRole.html', 'no'], //这里content是一个普通的String
			end: function() {
				location.reload();
			}
		});
	});
	$('.delete').click(function() {
		var roleId = '';
		$('.roleTable .checkbox:checked').each(function(item) {
			if (roleId == '') {
				roleId = $(this).next('.roleId').val();
			} else {
				roleId = roleId + ',' + $(this).next('.roleId').val();
			}
		});
		if (roleId != '') {
			var data = {
				'roleId': roleId,
			};


			$.ajax({
				url: 'http://localhost:8888/manage_system/roleInfo/deleteByPrimaryKey',
				data: data,
				dataType: 'json',
				type: 'POST',
				success(res) {
					alert('删除成功');
					location.reload();
				}
			});
		} else {
			alert('请选择一个或多个角色！');
		}
	});
	$('.ok').click(function() {
		addAuthority();
	});
	$('.exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	});
	$('.authorityTable input:checkbox').val(0);
	$('.authorityTable input:checkbox').click(function() {
		if ($(this).prop("checked")) {
			$(this).val(1);
		}
	});
	getRole();
	getModel();
});
var getModel = function() {

	$.ajax({
		url: 'http://localhost:8888/manage_system/JGroupModelInfo/selectModelInfo',
		data: {
			'groupId': 0
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<tr bgcolor="#FFFF99">');
			Html.push('<td width="100"><b>功能模块维护</b></td>');
			Html.push('<td width="15">访问</td>');
			Html.push('<td width="15">检索</td>');
			Html.push('<td width="15">新建</td>');
			Html.push('<td width="15">修改</td>');
			Html.push('<td width="15">查看</td>');
			Html.push('<td width="15">删除</td>');
			Html.push('<td width="15">审批</td>');
			Html.push('<td width="15">打印</td>');
			Html.push('<td width="15">下载</td>');
			Html.push('<td width="35">生成报表</td>');
			Html.push('<td width="35">发送信息</td>');
			Html.push('<td width="35">预留扩展</td>');
			Html.push('<td width="20">。。。</td>');
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


						Html.push(
							'<td><input style="margin-left:15px;width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" type="checkbox" value = "0" class="checkbox" /></td>'
						)


					}
				}
				Html.push('<td></td>');
				Html.push('<td></td>');
				Html.push('</tr>');

			});
			$('.authorityTable').html(Html.join(''));

		}
	});
}
var getRole = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectRoleAllNo',
		data: {
			// "groupId":groupId
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			Html.push('<tr bgcolor="#33FF99">');
			Html.push('<td width="50">');
			Html.push(
				'<input type="checkbox"style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;"  class="checkboxA" />'
			);
			Html.push('</td>');
			Html.push('<td width="125">角色名</td>');
			Html.push('<td>角色描述</td>');
			Html.push('</tr>');
			res.data.forEach(function(item, index) {
				Html.push('<tr>');
				Html.push(
					'	<td><input type="checkbox" style="width: 19px;height: 25px;background-color: #FFFFFF;display: block;clear: left;float: left;" class="checkbox" /><input type="hidden" class="roleId" value="' +
					item.roleId +
					'"/></td>');
				Html.push('<td>' + item.roleName + '</td>');

				Html.push('<td>' + item.roleDescription + '</td>')

				Html.push('</tr>');
			});
			$('.roleTable').html(Html.join(''));
			$('.roleTable .checkboxA').change(function() {
				if ($(".roleTable .checkboxA").is(':checked')) {
					$('.roleTable .checkbox').prop("checked", true);
				} else {
					$('.roleTable .checkbox').prop("checked", false);
				}
			});

		}
	});
}
var addAuthority = function() {
	var groupId = 0;
	var roleId = '';
	var groupName = $('#groupName').val();
	var groupDescription = $('#groupDescription').val();
	$('.roleTable .checkbox:checked').each(function(item) {
		if (roleId == '') {
			roleId = $(this).next('.roleId').val();
		} else {
			roleId = roleId + ',' + $(this).next('.roleId').val();
		}
	});
	if (groupName == '') {
		alert('请输入信息！');
	} else {
		var data = {
			'groupName': groupName,
			'groupDescription': groupDescription,
			'roleId': roleId
		};
		$.ajax({
			url: 'http://localhost:8888/manage_system/groupInfo/addGroupInfo',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				groupId = res;
				addModel(groupId);


			}
		});
	}

}
var addModel = function(groupId) {
	var checkValue = '';
	var modelId = '';
	$('.authorityTable .modelId').each(function() {
		if (modelId == '') {
			modelId = $(this).val();
		} else {
			modelId = modelId + "," + $(this).val();
		}
	});
	var integer = 11;
	$(".authorityTable .checkbox").each(function() {
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
	var data = {
		'groupId': groupId,
		'authorization': checkValue,
		'modelId': modelId,
		'modelIndex': 20
	};

	$.ajax({
		url: 'http://localhost:8888/manage_system/JGroupModelInfo/insertModel',
		data: data,
		dataType: 'json',
		type: 'POST',
		success(res) {
			alert('添加成功！');
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}
	});
}
