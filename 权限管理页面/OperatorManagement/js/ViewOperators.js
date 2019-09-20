//查看操作人员
$(document).ready(function() {
	selectEmp();
	
	$('.back').click(function(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index); //关闭当前页
	});
});
var selectOne = function() {
	var thisUrl = decodeURI(document.URL);
	var userId = thisUrl.split('?')[1].split('=')[1];

	var data = {
		"userId": userId
	};
	$.ajax({
		url: 'http://localhost:8888/manage_system/userInfo/selectUserByUserId',
		data: data,
		dataType: 'json',
		type: 'GET',
		success: function(res) {
		
			res.data.forEach(function(item) {
				$("#user_name").val(item.userName);
				$("input[type=radio][name=status][value=" + item.status + "]").attr("checked", 'checked');
				$(".relartion_user_id").val(item.empId).attr("selected",'selected').attr("disabled","disabled");
				if($(".relartion_user_id").find("option:selected").text() ==''){
					var Html = [];
					Html.push('<option>当前员工所在部门不存在<option>');
				
					$(".relartion_user_id").html(Html.join(''));
				}else{
					$(".relartion_user_id").val(item.empId).attr("selected",'selected').attr("disabled","disabled");
				}
				$('.remark').val(item.remark);
				// $(".relartion_user_id").attr("disabled","disabled");	
				$("input[type=radio][name=status]").attr("disabled","disabled");	
				$("#user_name").val(item.userName).attr("disabled","disabled");
				$('.remark').attr("disabled","disabled");
				$('.c_user').val(item.cUser).attr("disabled","disabled");
				$('.c_time').val(item.cTime).attr("disabled","disabled");
				$('.m_user').val(item.mUser).attr("disabled","disabled");
				$('.m_time').val(item.mTime).attr("disabled","disabled");
				$('.c_user').val(item.cUser).attr("disabled","disabled");
				$('.c_time').val(item.cTime).attr("disabled","disabled");
				$('.m_user').val(item.mUser).attr("disabled","disabled");
				$('.m_time').val(item.mTime).attr("disabled","disabled");
				
			});
		}
	});
}
var selectEmp = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/empInfo/selectEmpInfoAll',
		data: '',
		dataType: 'json',
		type: 'GET',
		success: function(res) {
		
			var html = [];
			html.push('<option value=null>无</option>');
			res.data.forEach(function(item) {
				html.push('<option class="emp_name" value =' + item.empId + '>' + item.empName +
					'</option>');
			});
			$('.relartion_user_id').html(html.join(''));
			selectOne();
		}
	});
}