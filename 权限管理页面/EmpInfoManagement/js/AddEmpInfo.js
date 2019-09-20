var number = 0;
$('document').ready(function() {
	selectDepartmentId();
	$('#add').click(function() {
		addEmpInfo();
	})
	$('#exit').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	})

})


var checkNum = function(el) {
	el.value = el.value.replace(/[^\w\_\‘]/ig, '');
	el.value = el.value.toUpperCase();
}

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
		console.log(number);
		$('#tel').attr({
			maxlength: "13"
		});
	}
}

var addEmpInfo = function() {
	var empNum = $('#empNum').val();
	var empName = $('#empName').val();
	var status = $('input[name="status"]:checked').val()
	var sex = $('input[name="sex"]:checked').val()
	var departmentId = $('#departmentId').val();
	var job = $('#job').val();
	var tel = $('#tel').val();
	var empDate = dateFormat($('#empDate').val());
	var remark = $('#remark').val();
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
	if (empNum == '') {
		check = false;
	}
	if (empName == '') {
		check = false;
	}
	if (job == '') {
		check = false;
	}
	if (tel == '') {
		check = false;
	}
	if (empDate == '') {
		check = false;
	}
	if (remark == '') {
		remark = '暂无';
	}
	if (check) {
		var data = {
			'empNum': empNum,
			'empName': empName,
			'status': status,
			'sex': sex,
			'departmentId': departmentId,
			'job': job,
			'tel': tel,
			'empDate': empDate,
			'remark': remark,
			'isDel': '0'
		};
		$.ajax({
			url: 'http://localhost:8888/manage_system/empInfo/addEmpInfo',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				if (res.msg == '编号重复') {
					alert('编号重复！');
				} else {
					alert('添加成功！');
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index); //关闭当前页
				}
			}
		});
	} else {
		alert('请填写完整用户信息！');
	}
}





var selectDepartmentId = function() {
	var now = new Date();
	var time = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate() <
		10 ? "0" : "") + now.getDate();
	$('#empDate').val(time);
	$.ajax({
		url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentNameAll',
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
	//x上限，y下限     
	var x = 100;
	var y = 0;
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}
