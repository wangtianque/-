 $(function() {
	groupRoleselect();
	$('.selectGroup').click(function() {
		groupRoleselect();
	})
	$('.addRoleUser').click(function() {
		roleGroupAdd();

	})
	$('.endRoleUser').click(function(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);//关闭当前页
		parent.location.reload()
	})
})

  layui.use('form', function () {
        var form = layui.form;
        //全选
        form.on('checkbox(c_all)', function (data) {
            var a = data.elem.checked;
            if (a == true) {
                $(".checkboxGroupSelect").prop("checked", true);
                form.render('checkbox');
            } else {
                $("checkboxGroupSelect").prop("checked", false);
                form.render('checkbox');
            }
 
        })
		
})
var thisUrl = decodeURI(document.URL)
var roleId = thisUrl.split('?')[1].split('=')[1];
var roleGroupAdd = function() {
	$.each($("[name='Staff']:checked"), function(i, val) {
		var userId = val.value;
		//第一个参数表示索引下标，第二个参数表示当前索引元素
		$.ajax({
			url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateGroupinfoRoleId',
			data: {
			'roleId': roleId ,
			'groupId': userId
		},
			dataType: 'json',
			type: 'POST',
			// contentType: 'application/json;charset=utf-8',
			success: function(res) {
				if (res > 0) {
					alert('添加成功')
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);//关闭当前页
					parent.location.reload()
				} else {
					alert('添加失败')
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);//关闭当前页
				}

			}
		})
	})
}
var groupRoleselect = function() {

console.log($('.groupName').val())
var aaaa = $('.groupName').val();
if(aaaa=' '){
	aaaa=null;
}
	
	$.ajax({
		url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleGroupAll',
		data: {
			'roleId': roleId,
			'groupName': aaaa
		},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success: function(res) {
			var Html = [];
			res.forEach(function(item, index) {
				Html.push('<tr>')
				Html.push('<th><input class = "checkboxGroupSelect" name="Staff" type="checkbox"  lay-skin="primary" lay-filter="Staff" value="' + item.groupId +
					'"></th>')
				Html.push('<th>' + item.groupName + '</th>')
				Html.push('<th>' + item.groupDescription + '</th>')
				Html.push('</tr>')
			})
			$('.TableContent').html(Html.join(''));
			layui.use('form', function() {
				var form = layui.form;
				//从文档上复制的好像没有这句
				form.render();
				//监听提交
				form.on('submit(formDemo)', function(data) {
					layer.msg(JSON.stringify(data.field));
					return false;
				});
			});
		},
	})

}
