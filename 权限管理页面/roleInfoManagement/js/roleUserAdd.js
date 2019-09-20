$(function() {
	var thisUrl = decodeURI(document.URL);
	var roleId = thisUrl.split('?')[1].split('=')[1];
	layui.use('form', function () {
	        var form = layui.form;
	        //全选
	        form.on('checkbox(c_all)', function (data) {
	            var a = data.elem.checked;
	            if (a == true) {
	                $(".checboxUserSelect").prop("checked", true);
	                form.render('checkbox');
	            } else {
	                $("checboxUserSelect").prop("checked", false);
	                form.render('checkbox');
	            }
	 
	        })
			
	})
$('.addRoleUser').off('click').on('click', function() {
	var index = 1;
	$.each($("[name='Staff']:checked"),function(i,val){//第一个参数表示索引下标，第二个参数表示当前索引元素
			var userId = val.value;
			
			var userRoleId = "";
			console.log(userId);
			$.ajax({
				url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleIdRoleUser',
				data: {'userId':userId},
				dataType: 'json',
				type: 'GET',
				success: function(res) {
					console.log(res);
					if(res.data[0].roleId == null){
						updateRoleIdByUserId(userId,roleId);
						alert('添加成功')
						index++;
					}else{
						var newRoleId = res.data[0].roleId+','+roleId;
					updateRoleIdByUserId(userId,newRoleId);
					alert('添加成功')
					index++;
					}
				}
			})
				
	});
		if(index>1){
			alert('添加成功')
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);//关闭当前页
			parent.location.reload()
			}else{
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);//关闭当前页
				parent.location.reload()
				}
	})
	$('.endRoleUser').click(function(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);//关闭当前页
		parent.location.reload()
	})
			$('.InquireButton').off('click').on('click', function() {
						selectUserRole(roleId);

				})
					selectUserRole(roleId);
		
							$.ajax({
								url: 'http://localhost:8888/manage_system/departmentInfo/selectAllDepartmentName',
								data: '',
								dataType: 'json',
								type: 'GET',
								success: function(res) {
									
									var html = [];
									html.push('<option>不限</option>');
									res.data.forEach(function(item) {
										html.push('<option class="departmentId" value =' + item.departmentId + '>' + item.departmentName +
											'</option>');
									});
									$('.station').html(html.join(''));
									layui.use(['layer', 'form'], function() {
										layui.form.render('select');
									});
								},
							});
						})
						var selectUserRole = function(roleId) {
							var userName = $('.user_name').val();
							var empName = $('#emp_name').val();
							var departmentId = $('#departmentId').val();


							console.log(departmentId)
							if (departmentId == '不限') {
								departmentId = null;
							}
							if (userName == '') {
								userName = null;
							}
							if (empName == '') {
								empName = null;
							}
							
							var data = {
								"userName": userName,
								"empName": empName,
								"departmentId": departmentId,
								'roleId': roleId
								// "pageNum": pageNum,
								// "pageSize": 10
							};
							$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectAddRoleUser',
								data: data,
								dataType: 'json',
								Type: 'GET',
								success: function(res) {
									var Html = [];
									var record = 1;
									res.data.forEach(function(item, index) {
										
										Html.push('<tr class="role-content">')
										Html.push(
											'<th><input class = "checboxUserSelect" name="Staff" type="checkbox"  lay-skin=primary lay-filter=checkboxIsSelected lay-filter="Staff" value="' + item.userId +'"></th>')
										Html.push('<th class="user-name">' + item.userName + '</th>');
										if (item.status == '1') {
											item.status = '有效';
										}
										if (item.status == '2') {
											item.status = '冻结';
										}
										if (item.status == '3') {
											item.status = '停用';
										}
										Html.push('<th>' + item.status + '</th>');
										Html.push('<th>' + item.empName + '</th>');
										Html.push('<th>' + item.departmentName + '</th>');
										Html.push('<th>' + item.remark + '</th>');
										Html.push('<th>' + dateFormat(item.mTime) + '</th>');
										Html.push('</tr>')
										record++;
									})
									$('.TableContent').html(Html.join(''));
				layui.use('form', function(){
				var form = layui.form;
				  //从文档上复制的好像没有这句
				  form.render();
				  //监听提交
				  form.on('submit(formDemo)', function(data){
				    layer.msg(JSON.stringify(data.field));
				    return false;
				  });
				});

								},

							})
						}
						// },

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
						var updateRoleIdByUserId = function(userId,roleId){
								$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateUserRoleIdAdd',
								data: {'roleId':roleId,
										'userId':userId},
							
								dataType: 'json',
								type: 'POST',
								success: function(res) {
									
									
								}
							});
						}
						
					
		  