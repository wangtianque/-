//添加操作作人员
$(document).ready(function() {

	selectEmp();
	$('.back').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	});

});
var selectEmp = function() {
	//校验关联员工是否重复
	var data = {
		"userName": null,
		"empName": null,
		"departmentId": null,
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/all',
		data: '',
		dataType: 'json',
		type: 'GET',
		success: function(res) {
			var html = [];
			$.ajax({
				url: 'http://localhost:8888/manage_system/userInfo/selectUserInfo',
				contentType: 'application/json;charset=utf-8',
				data: data,
				dataType: 'json',
				type: 'GET',

				success: function(resUserInfo) {
				
					res.data.forEach(function(itemOne, indexOne) {
						resUserInfo.data.forEach(function(itemTwo, indexTwo) {
							if (itemOne.empId == itemTwo.empId) {
								itemOne.empId = '';
							}
						});

					});
					res.data.forEach(function(item) {
						if (item.empId != '') {
							html.push('<option class="emp_name" value =' + item.empId + '>' + item.empName +
								'</option>');
						}
					});
					$('.relartion_user_id').html(html.join(''));
					$('.ok').click(function() {
						addCtrl();
					});

				}


			});
		}
	});
}
var addCtrl = function() {
	var checkPassword = $('#check_password').val();
	var userName = $('#user_name').val();
	var password = $('#password').val();
	var status = $('.status:radio:checked').val();
	var empId = $('.relartion_user_id option:selected').val();
	var remark = $('.remark').val();
	if (userName == '') {
		alert('用户名不能为空');
		return false;
	}
	if (password == '') {
		alert('密码输入不能为空');
		return false;
	}
	if (checkPassword == '') {
		alert('请确认密码');
		return false;
	}
	var data = {
		"userName": userName,
		"password": password,
		"status": status,
		"empId": empId,
		"remark": remark
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/addUserCtrl',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		type: 'POST', //HTTP请求类型
		success: function(res) {
			alert(res.msg);
			if (res.msg == "操作成功") {
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index); //关闭当前页
			}
		}
	});
}
var checkUserName = function() {
	if ($('#user_name').val() == '') {
		alert('密码输入不能为空');
	} else if (!$('#user_name').val().match(/^[\u0391-\uFFE5A-Za-z0-9-\s]+$/))  {
		alert('不能输入特殊符号！');
	}
}
var checkPassword = function() {
	var pwd1 = $('#password').val();
	var pwd2 = $('#check_password').val();
	if (pwd1.length >= 8) {
		if (pwd1 != pwd2) {
			alert('两次输入密码不符请重新输入');
			$('#password').val('');
			$('#check_password').val('');
		}
	} else {
		alert('密码最少8位');
		$('#password').val('');
		$('#check_password').val('');
	}

}
