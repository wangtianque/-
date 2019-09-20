//修改操作人员
$(document).ready(function() {
	selectEmp();


	$('.ok').click(function() {
		edit_password();
	});
	$('.back').click(function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	});
});
var selectEmp = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectEmpInfoAll',
		data: '',
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			var html = [];

			res.data.forEach(function(item) {
				html.push('<option class="emp_name" value =' + item.empId + '>' + item.empName +
					'</option>');
			});
			$('.relartion_user_id').html(html.join(''));
			selectOne();
		}
	});
}
var selectOne = function() {
	var thisUrl = decodeURI(document.URL);
	var userId = thisUrl.split('?')[1].split('=')[1];
	var data = {
		"userId": userId
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/selectOne',
		data: data,
		dataType: 'json',
		type: 'GET',
		success: function(res) {

			res.data.forEach(function(item) {
				$("#user_name").val(item.userName).attr("disabled", 'disabled');
				$("input[type=radio][name=status][value=" + item.status + "]").attr("checked", 'checked');
				$('.remark').text(item.remark);
				$(".relartion_user_id").val(item.empId);
				if ($(".relartion_user_id").find("option:selected").text() == '') {
					alert('当前员工所在部门不存在，请另选！');
				} else {
					$(".relartion_user_id").val(item.empId);
				}
			});
		}
	});
}
var edit_password = function() {
	var userName = $('#user_name').val();
	var password = $('#new_password').val();
	var thisUrl = decodeURI(document.URL);
	var userId = thisUrl.split('?')[1].split('=')[1];
	var empId = $('.relartion_user_id option:selected').val();
	var status = $('.status:radio:checked').val();
	var remark = $('.remark').val();
	if (password == '') {
		password = null;
	} else {
		var data = {
			"userName": userName,
			"password": password,
			"empId": empId,
			"status": status,
			"userId": userId,
			"remark": remark
		};
		var pwd2 = $('#check_password').val();

		if (pwd2 == '') {
			alert('请确认密码');
			$('#new_password').val('');
			return false;
		}
		$.ajax({
			url: 'http://localhost:8888/manage_system/userInfo/updataByUserId',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success: function(res) {
				if (res.msg == '操作成功') {
					alert(res.msg);
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index); //关闭当前页
				} else {
					alert(res.msg);
				}
			}
		})
	}
};

var checkOldPassword = function() {
	var oldPassword = $('#old_password').val();
	var thisUrl = decodeURI(document.URL);
	var userId = thisUrl.split('?')[1].split('=')[1];
	var data = {
		"password": oldPassword,
		"userId": userId
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/checkPassword',
		data: data,
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success: function(res) {
			if (res.msg == '操作成功') {} else {
				alert(res.msg);
			}
		}
	});
}

var checkPassword = function() {
	var pwd1 = $('#new_password').val();
	var pwd2 = $('#check_password').val();




		if (pwd1.length >= 8) {
			if (pwd1 != pwd2) {
				alert('两次输入密码不符请重新输入');
				$('#new_password').val('');
				$('#check_password').val('');
			}
		} else {
			alert('密码最少8位')
			$('#new_password').val('');
			$('#check_password').val('');
		}
	

}
