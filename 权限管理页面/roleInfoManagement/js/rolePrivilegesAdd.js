$(function() {
	
	modelNameAll();
	$('.ok').click(function(){
		var index = 0
		if($('.role-user-name').val()==''){
			alert('角色名不可为空')
		}else{
			aaa();
			rolePrivilegesAdd();
			
			}
	})
	$('.exit').click(function(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);//关闭当前页
		parent.location.reload()
	})
	})
var HtmlModelId=[];
var modelNameAll= function(){
	var index =1;
	$.ajax({
	url: 'http://localhost:8888/manage_system/RoleJRoleModel/selectModelAllLeftTree',
		data: {},
		dataType: "json",
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			var Html=[];
			var index = 1;
			
			res.forEach(function(item,index){
				HtmlModelId.push(item.modelId)
				Html.push('<tr id="a'+index+'">');
				Html.push('<th class ="departmentClick departmentNameA"><b>'+item.modelName+'</b><input type="text" value="'+item.modelId+'" class=role-model-id></th>');
			
				for(var i = 0; i<20; i++){
					if(i<11){
						Html.push('<th><input name="All-'+item.modelId+'" type="checkbox" lay-skin="primary" lay-filter="Staff" value="all"> </th>');
					}else {
						Html.push('<th hidden="hidden"><input name="All-'+item.modelId+'" type="checkbox" lay-skin="primary" lay-filter="Staff" value="all" > </th>');
					}
					
				}
				
				Html.push('<th></th>');
				Html.push('<th></th>');
				Html.push('</tr>');
				drawChildren(Html,item.childrenList,1); 
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
			$('.role-model-id').hide();
			
		}	
	})
}
var drawChildren = function(Html, childrenList, index) {

  if (childrenList && childrenList.length > 0) {
    index++;
    childrenList.forEach(function(param) {
	HtmlModelId.push(param.modelId)
		Html.push('<tr>');
      Html.push('<th class="departmentClick departmentNameB" style="padding-left:' + index * 20 + 'px;">' + param.modelName + '<input type="text" value="'+param.modelId+'" class=role-model-id></th>');
		for(var i = 0; i<20; i++){
			if(i<11){
				Html.push('<th><input name="All-'+param.modelId+'" type="checkbox" lay-skin="primary" lay-filter="Staff" value="all"> </th>')
			}else {
				Html.push('<th hidden="hidden"><input name="All-'+param.modelId+'" type="checkbox" lay-skin="primary" lay-filter="Staff" value="all" hidden> </th>')
			}
		}
	Html.push('<th></th>');
	Html.push('<th></th>');
	  Html.push('</tr>');     
      if (param.childrenList && param.childrenList.length > 0) {
        drawChildren(Html, param.childrenList, index);
      }
    });
  } 	
  }
  
  var aaa=function(){
	  
	
	
  }

var rolePrivilegesAdd = function(){
	var roleUserName= $('.role-user-name').val();
	var roleUserDescribe=$('.role-user-describe').val();
	var data = {'roleName':roleUserName,
				'roleDescription':roleUserDescribe} 
		$.ajax({
			url: 'http://localhost:8888/manage_system/RoleJRoleModel/inseRtrole',
			data:JSON.stringify(data),
			dataType: "json",
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				HtmlModelId.forEach(function(paa){
					var obj = document.getElementsByName("All-"+paa);//选择所有name="interest"的对象，返回数组  
					 //如果这样定义var s;变量s中会默认被赋个null值
					 var menuAll = "";
					  for(var i=0;i<obj.length;i++){
					     if(obj[i].checked!=""){ //取到对象数组后，我们来循环检测它是不是被选中
							menuAll+='1';  //如果选中，将value添加到变量s中  
						 }else{
							menuAll+='0';
						 }
					  }
					  console.log(menuAll)
					  var data = {
						  'roleId':res,
						  'modelId':paa,
						  'authorization':menuAll
					  }
					$.ajax({
						url: 'http://localhost:8888/manage_system/RoleJRoleModel/insertRoleModel',
						data:JSON.stringify(data),
						dataType: "json",
						type: 'POST',
						contentType: 'application/json;charset=utf-8',
						success(res) {}
					})
				})
				alert('添加成功')
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);//关闭当前页
				parent.location.reload()
			}
				})
	
	
}

