var checkboxStr = '';
$(function() {
	layui.use('form', function() {
		var form = layui.form;


	});
	$('.ok').click(function() {
		addRole();
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

var addRole = function() {
	var roleId = 0;
	var roleName = $('#roleName').val();
	var roleDescription = $('#roleDescription').val();
	// $('.roleTable .checkbox:checked').each(function(item) {
	// 	if (roleId == '') {
	// 		roleId = $(this).next('.roleId').val();
	// 	} else {
	// 		roleId = roleId + ',' + $(this).next('.roleId').val();
	// 	}
	// });
	if (roleName == '') {
		alert('请输入信息！');
	} else {
		var data = {
			'roleName': roleName,
			'roleDescription': roleDescription
		};
		$.ajax({
			url: 'http://localhost:8888/manage_system/roleInfo/addRole',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				roleId = res;
				addModel(roleId);


			}
		});
	}

}
var addModel = function(roleId) {
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
		'roleId': roleId,
		'authorization': checkValue,
		'modelId': modelId,
		'modelIndex': 20
	};
	console.log(data);

	$.ajax({
		url: 'http://localhost:8888/manage_system/JRoleModelInfo/insertRoleModel',
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
