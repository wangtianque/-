$('document').ready(function() {
	var urlinfo = window.location.href;
	value = urlinfo.split("?")[1].split("=")[1];
	var empId = decodeURI(value);
	getAllEmpInfo(empId);
	$('#back').click(function() {
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭
	})
})

var getAllEmpInfo = function(empId) {
	selectDepartmentId();
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectByPrimaryKey',
		data: {
			'empId': empId
		},
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res);
			res.data.forEach(function(item, index) {
				$('#empNum').val(item.empNum);
				$('#empName').val(item.empName);
				$("input[type=radio][name=status][value=" + item.status + "]").attr("checked", 'checked');
				$("input[type=radio][name=sex][value=" + item.sex + "]").attr("checked", 'checked');
				if ($('#departmentid').text() == '') {
					var Html = [];
					Html.push('<option>当前油站不存在<option>');
					$('#departmentId').html(Html.join(''));
				} else {
					$('#departmentId').val(item.departmentId);
				}
				$('#job').val(item.job);
				$('#tel').val(item.tel);
				$('#empDate').val(dateFormat(item.empDate));
				$('#remark').val(item.remark);
				$('#cTime').val(dateFormat2(item.cTime));
				if (item.mTime == null) {
					$('#mTime').val('暂无修改');
				} else {
					$('#mTime').val(dateFormat2(item.mTime));
				}
				if (item.isDel == '0') {
					$('#isDel').val('未删除');
				}
				if (item.isDel == '1') {
					$('#isDel').val('已删除');
				}
			});
		}
	});
}
var selectDepartmentId = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentName',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			res.data.forEach(function(item, index) {
				Html.push('<option value = "' + item.departmentId + '">' + item.departmentName + '</option>');
			});
			$('#departmentId').html(Html.join());
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
	return year + "/" + month + "/" + day + '  ' + hours + ':' + minutes + ':' + seconds;
}
