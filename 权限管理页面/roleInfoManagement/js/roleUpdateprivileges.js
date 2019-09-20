$(function() {
			var thisUrl = decodeURI(document.URL);
			var roleId = thisUrl.split('?')[1].split('=')[1];
			selectRoleJurisdiction(roleId);
			selectRoleIdAttribute(roleId)
			$('.ok').click(function() {
				rolePrivilegesAdd(roleId)
				
			})
			$('.exit').click(function() {
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index); //关闭当前页
				parent.location.reload()
			})
			
		})
			var HtmlModelId = [];
			var rolePrivilegesAdd = function(roleId) {
				var roleName = $('.role-user-name').val();
				var roleDescription = $('.role-user-describe').val();
				var data = {
					'roleName': roleName,
					'roleDescription': roleDescription,
					'roleId': roleId
				}
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateRoleAttribute',
					data: data,
					dataType: "json",
					type: 'POST',
					// contentType: 'application/json;charset=utf-8',
					success(res) {
						HtmlModelId.forEach(function(paa) {
							var obj = document.getElementsByName("All-" + paa); //选择所有name="interest"的对象，返回数组  
							//如果这样定义var s;变量s中会默认被赋个null值
							 var menuAll = "";
							 for(var i=0;i<obj.length;i++){
							    if(obj[i].checked!=""){ //取到对象数组后，我们来循环检测它是不是被选中
														menuAll+='1';  //如果选中，将value添加到变量s中  
													 }else{
														menuAll+='0';
													 }
							 }
							var data = {
								'authorization': menuAll,
								'roleId': roleId,
								'modelId': paa
							}
							$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/updateRoleJurisdiction',
								data: data,
								dataType: "json",
								type: 'POST',
								// contentType: 'application/json;charset=utf-8',
								success(res) {}
							})
						})
						alert('修改成功')
						var index = parent.layer.getFrameIndex(window.name);
						parent.layer.close(index); //关闭当前页
						parent.location.reload()
					}
				})


			}
			var selectRoleIdAttribute = function(roleId) {



				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleAllLeftTree',
					data: {
						'roleId': roleId
					},
					dataType: "json",
					type: 'GET',
					contentType: 'application/json;charset=utf-8',
					success(res) {

						res.forEach(function(item, index) {
							$('.role-user-name').val(item.roleName)
							$('.role-user-describe').val(item.roleDescription)
						})

					}
				})
			}







			var selectRoleJurisdiction = function(roleId) {

				var Html = [];
				var roleIdModel = roleId
				var index = 1;
				$.ajax({
					url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectModelAllLeftTree',
					data: {},
					dataType: "json",
					type: 'GET',
					contentType: 'application/json;charset=utf-8',
					success(res) {
						res.forEach(function(item, index) {

							HtmlModelId.push(item.modelId)
							Html.push('<tr id="a' + index + '">');
							Html.push('<th class ="departmentClick departmentNameA"><b>' + item.modelName +
								'</b><input type="text" value="' + item.modelId + '" class=role-model-id></th>');
							console.log(roleIdModel)
							console.log(item.modelId)
							if (roleIdModel == undefined) {
								roleIdModel = $('.role-id-input-privileges').val();
							}
							var Jurisdiction = [];
							$.ajax({
								url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleJurisdiction',
								data: {
									'roleId': roleIdModel,
									'modelId': item.modelId
								},
								dataType: "json",
								async: false,
								type: 'GET',
								contentType: 'application/json;charset=utf-8',
								success(raes) {
									console.log(raes)

									Jurisdiction = raes[0].authorization.split('');
									for (var i = 0; i < Jurisdiction.length; i++) {
										if(i<11){
											if (Jurisdiction[i]==1) {
												Html.push(
													'<td pane><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked ></td>'
													);
											} else {
												Html.push(
													'<td pane><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff"></td>'
												);
												
											
											}
										}else {
											Html.push(
												'<td pane hidden><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked ></td>'
											);
										}
									
									}
								},
							})

							Html.push('<th></th>');
							Html.push('<th></th>');
							Html.push('</tr>');
							drawChildren(Html, item.childrenList, 1, roleIdModel, item.modelId);
						})
						$('.TableContent').html(Html.join(''));
						$('.role-model-id').hide();
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

					}
				})
			}
			var drawChildren = function(Html, childrenList, index, roleIdModel, modelId) {

				if (childrenList && childrenList.length > 0) {
					index++;
					childrenList.forEach(function(param) {
						HtmlModelId.push(param.modelId)
						Html.push('<tr>');
						Html.push('<th class="departmentClick departmentNameB" style="padding-left:' + index * 20 + 'px;">' + param.modelName +
							'<input type="text" value="' + param.modelId + '" class=role-model-id></th>');

						console.log(param.modelId)
						if (roleIdModel == undefined) {
							var thisUrl = decodeURI(document.URL);
							var roleId = thisUrl.split('?')[1].split('=')[1];
							roleIdModel = roleId
						}
						var Jurisdiction = [];


						console.log(roleIdModel)
						$.ajax({
							url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectRoleJurisdiction',
							data: {
								'roleId': roleIdModel,
								'modelId': param.modelId
							},
							async: false,
							dataType: "json",
							type: 'GET',
							contentType: 'application/json;charset=utf-8',
							success(raes) {
								Jurisdiction = raes[0].authorization.split('');
								for (var i = 0; i < Jurisdiction.length; i++) {
										if(i<11){
											if (Jurisdiction[i]==1) {
												Html.push(
													'<td pane><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
													);
											} else {
												Html.push(
													'<td pane><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff"></td>'
												);
												
											
											}
										}else {
											Html.push(
												'<td pane hidden><input name="All-'+item.modelId+'" type="checkbox"  lay-skin="primary" lay-filter="Staff" value=""checked disabled="disabled"></td>'
											);
										}
									
									}
							},
						})

						Html.push('<th></th>');
						Html.push('<th></th>');
						Html.push('</tr>');
						if (param.childrenList && param.childrenList.length > 0) {
							drawChildren(Html, param.childrenList, index);
						}
					});
				}
			}
