$(document).ready(function() {
	//点击登陆执行方法进行验证
	$(".btnAll").click(function() {
		register();
	})
})
//验证方法
var register = function() {
	if ($('.InputSize').val() != '123456' && $('.PasWord').val() != '123456') {
		$.ajax({
			url: 'http://localhost:8888/manage_system/LogInfo/selectUserPawd',
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				var a = 0;
				var id;
				var logType;
				var macCode;
				var masIp;
				var logDescription;
				res.forEach(function(item, index) {
					var as = item.password;
					var b = item.userName;
					if ($(".PasWord").val() == as && $(".InputSize").val() == b) {
						a++
						id = item.userId;
						logType = '1';
						macCode = '登录';
						masIp = 'localhost';
						logDescription = '一台-PC';
					}
				})
				if (a > 0) {
					var data = {
						'userId': id,
						'logType': logType,
						'macCode': macCode,
						'masIp': masIp,
						'logDescription': logDescription
					}
					//进行添加log
					var myurl = "EmpInfoManagement/EmpInfoManagement.html";
					$.ajax({
						url: 'http://localhost:8888/manage_system/LogInfo/insert',
						data: JSON.stringify(data),
						dataType: "json",
						type: 'POST',
						contentType: 'application/json;charset=utf-8',
						success(res) {
							alert("登录成功");
							window.location.assign(encodeURI(myurl));
						}
					})
				} else {
					alert("用户名或密码错误");
				}
			}
		})

	} else {
		alert("临时测试用户登录成功");
		window.location.assign(encodeURI('OperatorManagement/OperatorManagement.html'));
	}
}
