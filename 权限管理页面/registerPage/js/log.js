$(function() {
	$('#EmpInfo').click(function() {
		window.location.href = "../EmpInfoManagement/EmpInfoManagement.html";
	})
	$('#departmentInfoGl').click(function() {
	window.location.href = "../DepartmentInfoManagement/departmentMainPage.html";
	})
	$('#login').click(function() {
		window.location.href = "login.html";
	})
	$("#Operator").click(function() {
		window.location.href = "../OperatorManagement/OperatorManagement.html";
	})
	//权限管理页面跳转部分
	$("#Rights").click(function() {
		window.location.href='../ModelInfo/ModelInfo.html'
	});
	$('.user-page').off('click').on('click',function(){
		window.location.href='../OperatorRightsManagement/OperatorRightsManagement.html'
	});
	$('.model-page').off('click').on('click',function(){
		window.location.href='../ModelInfo/ModelInfo.html'
	});
	$('.role-page').off('click').on('click',function(){
		window.location.href='../roleInfoManagement/rolePrivileges.html'
	});
	$('.group-page').off('click').on('click',function(){
		window.location.href='../ManagementPrivilegeAuthorityManagement/ManagementPrivilegeAuthorityManagement.html'
	});
	$('.mail').click(function() {
		alert('暂无功能，待实现');
	});
	$('.logInAndOut').click(function() {
		var out = confirm('是否确认注销？');
		if (out) {
			window.location.href = "../registerPage.html";
			alert('注销成功！');
		}
	});
	// selectTime(1);
	$("#begin").val("1980-01-01");
	var data = new Date();
	var an = new Date(data.getTime());
	var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
	$("#finish").val(nn);
	$("#begin").attr("disabled", "disabled");
	$("#finish").attr("disabled", "disabled");

	all(1);
	
	layui.use('form', function() {
		var form = layui.form;
		form.on('select(fangxiang)', function(data) {
			var value = data.value;
			if (value == '1') {
				$("#begin").val("1900-01-01");
				var data = new Date();
				var an = new Date(data.getTime()+86400000);
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(nn);
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '2') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 1095);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(nn);
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '3') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 365);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(dateFormat(data));
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '4') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 182);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(dateFormat(data));
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '5') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 91);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(dateFormat(data));
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '6') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 30);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(dateFormat(data));
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '7') {
				var date = new Date();
				var n = new Date(date.getTime() - 86400000 * 7);
				var a = dateFormat(n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate());
				$("#begin").val(a);
				var data = new Date();
				var an = new Date(data.getTime());
				var nn = dateFormat(an.getFullYear() + "-" + (an.getMonth() + 1) + "-" + an.getDate())
				$("#finish").val(dateFormat(data));
				$("#begin").attr("disabled", "disabled");
				$("#finish").attr("disabled", "disabled");
			} else if (value == '8') {
				$("#begin").val("");
				$("#finish").val("");
				$("#begin").removeAttr("disabled");
				$("#finish").removeAttr("disabled");
			}
		});
	});

	$('#selectc').change(() => {
		layui.use('form', function() {
			var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
			form.render();
		});
		layui.use(['layer', 'form'], function() {
			layui.form.render('select');
		});
	})

	$("#SelectButton").click(function() {
		var begin = $("#begin").val();
		var beginOne = (new Date(begin)).getTime();
		var finish = $("#finish").val();
		var finishOne = (new Date(finish)).getTime();
		if (beginOne <= finishOne) {
			all(1);
			layui.use(['layer', 'form'], function() {
				layui.form.render('select');
			});
		} else {
			alert("日期错误");
		}

	})
})
var all = function(pagenum){
	var begin=new Date($("#begin").val()).getTime();
	var finish =new Date( $("#finish").val()).getTime();
	$.ajax({
		url: 'http://localhost:8888/manage_system/LogInfo/all',
		data: {'pagesize':10,'pagenum':pagenum,'fromTime':begin,'endTime':finish},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			var Html = [];
			var record = 1;
			res.list.forEach(function(item, indeSx) {
				Html.push(' <tr class="tou">');
				Html.push(
					'<td pane><input name="All" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="all"></td>')
				Html.push('<td>' + record + '</td>');
				Html.push('<td class="userName">' + item.userName + '</td>');
				var logType;
				if (item.logType == '1') {
					logType = '登陆';
				}
				Html.push('<td>' + logType + '</td>');
				Html.push('<td>' + item.macCode + '</td>');
				Html.push('<td>' + dateFormata(item.logTime) + '</td>');
				Html.push('<td>' + item.masIp + '</td>');
				Html.push('<td>' + item.logDescription + '</td>');
				record++;
			})
			$('.TableContent').html(Html.join(''));
				// trainschemesPage(res.total,res.pageNum,res.pageSize);
			Page(res);
		}
	})
	}
		
	// var selectTime = function(pagenum){
	// 	var begin=new Date($("#begin").val())
	// 	var finish =new Date( $("#finish").val())
	// 	var userName = $(".userName").val()
	// 	$.ajax({
	// 		url: 'http://localhost:8888/manage_system/LogInfo/all',
	// 		// url:'http://localhost:8888/manage_system/LogInfo/selectTime',
	// 		// url:'http://localhost:8888/manage_system/LogInfo/all',
	// 		// data:{'pagesize':pagesize,'pagenum':pagenum,'fromTime':begin,'endTime':finish,'userName':userName},
	// 		data:{'pagesize':10,'pagenum':pagenum,'fromTime':begin,'endTime':finish,'userName':userName},
	// 		dataType: 'json',
	// 		type: 'GET',
	// 		// contentType: 'application/json;charset=utf-8',
	// 		success(res) {
	// 			var Html = [];
	// 				var record = 1;
	// 				res.list.forEach(function(item, indeSx) {
	// 					Html.push(' <tr class="tou">');
	// 					Html.push(
	// 						'<td pane><input name="All" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="all"></td>')
	// 					Html.push('<td>' + record + '</td>');
	// 					Html.push('<td class="userName">' + item.userName + '</td>');
	// 					var logType;
	// 					if (item.logType == '1') {
	// 						logType = '登陆';
	// 					}
	// 					Html.push('<td>' + logType + '</td>');
	// 					Html.push('<td>' + item.macCode + '</td>');
	// 					Html.push('<td>' + dateFormata(item.logTime) + '</td>');
	// 					Html.push('<td>' + item.masIp + '</td>');
	// 					Html.push('<td>' + item.logDescription + '</td>');
	// 					record++;
	// 				})
	// 				$('.TableContent').html(Html.join(''));
	// 					// trainschemesPage(res.total,res.pageNum,res.pageSize);
	// 			}
	// 	})	
	// 	
	// }
	// Page: function(data) {
	// 		console.log(data.total);
	// 		layui.use('laypage', function() {
	// 			var laypage = layui.laypage;
	// 			//执行一个laypage实例
	// 			laypage.render({
	// 				curr: data.pageNum,
	// 				elem: 'Page',
	// 				count: data.total,
	// 				limit: '10',
	// 				theme: '#1E9FFF',
	// 				groups: '5',
	// 				jump: function(item, first) {
	// 					if (!first) {
	// 						info.all(item.curr);
	// 					}
	// 				}
	// 			});
	// 		});
	// 	}
	
	var Page = function (data) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'Page' //注意，这里的 test1 是 ID，不用加 # 号
                , count: data.total //数据总数，从服务端得到
                , limit: '10'
                , theme: '#1E9FFF'
				, curr: data.pageNum
                , groups: '5'
				, jump: function(item, first){
					if (!first){
						all(item.curr);
					}
        }
            });
        });
    };
	
// function trainschemesPage(total,pageNum,pageSize){
//     //使用layui的分页插件
//     layui.use(['laypage', 'layer'], function(){
//         var laypage = layui.laypage,layer = layui.layer;
// 
//         //执行一个laypage实例
//         laypage.render({
//             elem: 'Page', //注意，这里的 test1 是 ID，不用加 # 号
//             count: total, //数据总数，从服务端得到
//             limit:pageSize,//每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
//             curr:pageNum,//当前页号
//            
//             layout:['prev', 'page', 'next','count'],//显示哪些分页组件
//             jump: function(obj, first){//点击页号的时候执行的函数
//                 //obj包含了当前分页的所有参数，比如：
//                 // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                 // console.log(obj.limit); //得到每页显示的条数
// 
//                 $("[name='pageNum']").val(obj.curr);//向隐藏域设置当前页的值
//                 $("[name='pageSize']").val(obj.limit);//向隐藏域设置当前页的大小
//                 if(!first){//首次不执行(点击的时候才执行)
//                     selectTime(obj.curr,obj.limit);//执行查询分页函数(这个函数必须写在这里)
//                 }
//             }
// 
//         });
//     });
// }
// var selectCondition = function(pagesize,pagenum) {
// 	var spinner = $("#spinner").val();
// 	var begin = $("#begin").val();
// 	var beginOne = (new Date(begin)).getTime();
// 	var finish = $("#finish").val();
// 	var finishOne = (new Date(finish)).getTime();
// 	$.ajax({
// 		url: 'http://localhost:8888/manage_system/log/all',
// 		data: {'pagesize':pagesize,'pagenum':pagenum},
// 		dataType: 'json',
// 		type: 'GET',
// 		contentType: 'application/json;charset=utf-8',
// 		success(res) {
// 			var Html = [];
// 			var record = 1;
// 			res.list.forEach(function(item, indeSx) {
// 				if (spinner == item.userName || spinner == "") {
// 					var boss = dateFormat(item.logTime);
// 					var bossOne = (new Date(boss)).getTime();
// 					if ((bossOne >= beginOne && bossOne <= finishOne)) {
// 						Html.push(' <tr class="tou">');
// 						Html.push(
// 							'<td pane><input name="All" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="all"></td>')
// 						Html.push('<td>' + record + '</td>');
// 						Html.push('<td>' + item.userName + '</td>');
// 						var logType;
// 						if (item.logType == '1') {
// 							logType = '登陆';
// 						}
// 						Html.push('<td>' + logType + '</td>');
// 						Html.push('<td>' + item.macCode + '</td>');
// 						Html.push('<td>' + dateFormata(item.logTime) + '</td>');
// 						Html.push('<td>' + item.masIp + '</td>');
// 						Html.push('<td>' + item.logDescription + '</td>');
// 						record++;
// 					}
// 				}
// 			})
// 			$('.TableContent').html(Html.join(''));
// 						trainschemesPageCopy(record,res.pageNum,res.pageSize);
// 						$('.userId').hide();
// 			layui.use('element', function() {
// 				var element = layui.element;
// 				element.init();
// 			});
// 			layui.use('form', function() {
// 				var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
// 				form.render();
// 			});
// 		}
// 	})
// }
var dateFormata = function(time) {
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
	return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
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
