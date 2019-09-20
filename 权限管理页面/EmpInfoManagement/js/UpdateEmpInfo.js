var number = 0;
$('document').ready(function() {
	
	var urlinfo = window.location.href;
	value = urlinfo.split("?")[1].split("=")[1];
	var empId = decodeURI(value);
	getAllEmpInfo(empId);
	$('#update').click(function() {
		updateEmpInfo(empId);
	})
	$('#back').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	})
	console.log($('#tel').val());
	

})

var checkTel = function(el) {
	el.value = el.value.replace(/[^\d- ]/g, '');
	re = new RegExp('-', "g");
	res = new RegExp(' ', "g");
	re1 = new RegExp('--', "g");
	res1 = new RegExp('  ', "g");
	ress = new RegExp('- -', "g");
	ress1 = new RegExp(' - ', "g");
	ress2 = new RegExp(' -', "g");
	ress3 = new RegExp('- ', "g");
	var str = el.value.replace(res, '');
	var str2 = str;
	str = str2.replace(re, '');
	el.value = el.value.replace(re1, '-');
	el.value = el.value.replace(res1, ' ');
	el.value = el.value.replace(ress, '');
	el.value = el.value.replace(ress1, '');
	el.value = el.value.replace(ress2, '');
	el.value = el.value.replace(ress3, '');
	if (str.length == '11') {
		number = 11;
	} else {
		number = 0;
	};
	if (str.length == '12') {
		number = 11;
		el.value = el.value.substring(0, el.value.length - 1);
		$('#tel').attr({
			maxlength: "13"
		});
	}
}

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
			res.data.forEach(function(item, index) {
				$('#empNum').val(item.empNum);
				$('#empName').val(item.empName);
				$("input[type=radio][name=status][value=" + item.status + "]").attr("checked", 'checked');
				$("input[type=radio][name=sex][value=" + item.sex + "]").attr("checked", 'checked');
				$('#departmentId').val(item.departmentId);
				if ($('#departmentId').find("option:selected").text() == '') {
					
					alert('所在油站不存在，请另选！');
					
				} else {
					$('#departmentId').val(item.departmentId);
				}
				
				$('#job').val(item.job);
				$('#tel').val(item.tel);
				$('#empDate').val(dateFormat(item.empDate));
				$('#remark').val(item.remark);
			});
			re = new RegExp('-','g');
			res = new RegExp(' ','g');
			var str = $('#tel').val().replace(re,'');
			str = str.replace(res,'');
			number = str.length;
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

var updateEmpInfo = function(empId) {
	var check = true;
	if (!$('#empName').val().match(/^[\u4E00-\u9FA5]{1,}$/) && $('#empName').val() != '') {
		// el.value = el.value.substring(0,el.value.length-1);
		$('#empName').val($('#empName').val().replace(/[^\u4e00-\u9fa5]{0,}$/, ''));
		alert('姓名只能输入汉字哦~[不允许输入除汉字以外的字符 例如空格或其他]');
		// el.value = '';
		check = false;
	}
	if ($('#tel').val().trim() == '' || $('#tel').val() == '--------------------' || number != 11) {
		check = false;
		alert('请输入正确的手机号格式！');
	}
	if ($("#empName").val() == '') {
		check = false;
	}
	if ($("#job").val() == '') {
		check = false;
	}
	if ($("#tel").val() == '') {
		check = false;
	}
	if ($("#empDate").val() == '') {
		check = false;
	}
	var remark = $('#remark').val();
	if ($('#remark').val() == '') {
		remark = '暂无';
	}
	if (check) {
		var data = {
			"empId": empId,
			"empName": $("#empName").val(),
			"status": $("input[name='status']:checked").val(),
			"sex": $("input[name='sex']:checked").val(),
			"departmentId": $('#departmentId').val(),
			"job": $("#job").val(),
			"tel": $("#tel").val(),
			"empDate": dateFormat($("#empDate").val()),
			"remark": remark
		};
		$.ajax({
			url: 'http://localhost:8888/manage_system/empInfo/updateByPrimaryKeySelective',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				alert('修改成功！');
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index); //关闭当前页
			}
		});
	} else {
		alert('请填写完整修改信息！');
	}
}
$('#tel').bind('input propertychange', function() {
	var ram = randomNumber();
	if (ram % 2 == 0) {
		$(document).keydown(function(event) {
			if (event.keyCode == 8 || event.keyCode == 46) {

			} else {
				if ($('#tel').val().length == 3 || $('#tel').val().length == 8) {
					var phone = $('#tel').val() + "-";
					$('#tel').val(phone);
				}
			}
		});
	} else {
		$(document).keydown(function(event) {
			if (event.keyCode == 8 || event.keyCode == 46) {

			} else {
				if ($('#tel').val().length == 3 || $('#tel').val().length == 8) {
					var phone = $('#tel').val() + " ";
					$('#tel').val(phone);
				}
			}
		});
	}
});
var randomNumber = function() {
	var x = 100;
	var y = 0;
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}
