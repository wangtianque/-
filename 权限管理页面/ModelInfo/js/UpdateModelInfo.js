$(function() {
	var query = location.search.substring(1);
	var values = query.split("&");
	for (var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('=');
		if (pos == -1) continue;
		var paramname = values[i].substring(0, pos);
		var value = values[i].substring(pos + 1);
	};
	selectAllModelInfo(value);
	selectModelInfo(value);
	$('#exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	})
	$('#ok').click(function() {
		if ($('#modelName').val() == '') {
			alert('请填写模块名');
		} else {
			if ($('#selectModelId').val() == value) {
				alert('亲，不能自己选自己');
			} else {
				updateModelInfo(value);
			}
		}

	})








});
var updateModelInfo = function(value) {
	var modelName = $('#modelName').val();
	var parentId = $('#selectModelId').val();
	var data = {
		'modelId': value,
		'modelName': modelName,
		'parentId': parentId
	};

	$.ajax({
		url: 'http://localhost:8888/manage_system/modelInfo/updateModelInfo',
		data: data,
		dataType: 'json',
		type: 'POST',
		success(res) {
			alert('修改成功！');
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}
	});


}
var selectModelInfo = function(value) {
	var Html = [];
	$.ajax({
		url: 'http://localhost:8888/manage_system/modelInfo/selectModelInfo',
		data: {
			'modelId': value
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			$('#modelName').val(res.data.modelName);
			$('#selectModelId').val(res.data.parentId);
		}
	});
}
var selectAllModelInfo = function(value) {
	var Html = [];
	$.ajax({
		url: 'http://localhost:8888/manage_system/modelInfo/selectAllModelInfoList',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			Html.push('<option value="0">顶级父级</option>');
			res.data.forEach(function(item, index) {
				Html.push('<option value="' + item.modelId + '">' + item.modelName + '</option>');
			});
			$('#selectModelId').html(Html.join(''));
		}
	});
}
