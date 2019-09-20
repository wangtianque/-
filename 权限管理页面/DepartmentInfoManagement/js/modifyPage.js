//接收参数
var url = decodeURI(location.href);
let signIndex = url.search("departmentId=");
let departmentId = url.substring(signIndex + 13);
console.log(departmentId);


$(document).ready(function(){
	downMenuReturnSuperiorDepartment();
	downMenuReturnEmpName();
	// selectBydepartmentId();


	//点击事件修改
	$('#modify').click(function(){
		updateDepartmentInfoByDepartmentId();
	});
	
	//点击事件取消	
	$('#cancel').click(function(){
		custom_close();
	});
	
	//选择按钮
	$('.selectBtn').click(function(){
		layuiAddSelectBtn();
	})
});

//跳转页面查询返回值
var selectBydepartmentId = function(){
	$.ajax({
		url:'http://localhost:8888/manage_system/department/selectByDepartmentId',
		data :{
			'departmentId' : departmentId
		},
		dataType: 'json',
		type: 'GET',
		success(res){
		var Html = [];
		console.log(res);
			if (res) {
				res.data.forEach(function(item,index){
					$("#superiorDepartment option[value='"+item.parentId+"']").attr("selected" , "selected");
					$("#departmentName").val(item.departmentName);
					console.log(item.empId)
					$("#empName option[value='"+item.empId+"']").attr("selected" , "selected");
					$("#tel").val(item.tel);
					$("#address").val(item.address);
					$("#remark").val(item.remark);
					console.log(res);
				});
			}
		}
	});
}

//返回下拉菜单的上级部门的值
var downMenuReturnSuperiorDepartment = function(){
	$.ajax({
		url : 'http://localhost:8888/manage_system/department/selectAll',
		data : {},
		dataType : 'json',
		type : 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			if(res){
				Html.push('<option value="0">'+'选为父级Id'+'</option>');
				res.data.forEach(function(item,index){
					Html.push('<option value="'+item.departmentId+'">'+item.departmentName+'</option>');
				});
			}
			$('#superiorDepartment').html(Html.join(''));
			selectBydepartmentId();
		},
	});
}

//返回下拉菜单的负责人的值
var downMenuReturnEmpName = function(){
	$.ajax({
		url:'http://localhost:8888/manage_system/empInfo/empInfoAll',
		data :{},
		dataType: 'json',
		type: 'GET',
		success(res){
		console.log(res);
		var Html = [];
			if(res){
				res.forEach(function(item,index){
					Html.push('<option value="'+item.empId+'">'+item.empName+'</option>');
				});       
			 $('#empName').html(Html.join(''));
			 selectBydepartmentId();
			}
		}       
	});
}

//修改
var updateDepartmentInfoByDepartmentId = function(param){
	var data = {
		"departmentId":departmentId,
		"parentId":$('#superiorDepartment option:selected').val(),
		"departmentName" :$("#departmentName").val(),
		"empId": $("#empName option:selected").val(),
		"tel":$("#tel").val(),
		"address":$("#address").val(),
		"remark":$("#remark").val(),	
		"mUser":$("#empName option:selected").val(),
		"mTime":getTime(),
		"isDel":0
	}

	console.log(data);
	$.ajax({
		url:'http://localhost:8888/manage_system/department/updateByDepartmentId',
		data:JSON.stringify(data),
		dataType:'json',
		type:'POST',
		contentType :'application/json;charset=utf-8',
		success(res) {
			if (res) {
				alert("成功了呀");
				custom_close();
				parent.location.reload();//刷新父级页面
			} else {
				alter("失败了呀啊");
			}
		},
		error(e){
			alert('修改失败！');
		}
	});  
}


//获取当前时间
var getTime = function (){
	//判断是否在前面加0
	function getNow(s) {
	return s < 10 ? '0' + s: s;
	}
	
	var myDate = new Date();             
	var year=myDate.getFullYear();        //获取当前年
	var month=myDate.getMonth()+1;   //获取当前月
	var date=myDate.getDate();            //获取当前日
	var now=year+'-'+getNow(month)+"-"+getNow(date);
	console.log(now);
	return now;
}

//关闭当前页
function custom_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);//关闭当前页
}

//修改选择上级部门弹出层
var layuiAddSelectBtn = function(param){
	layui.use("layer",function(){
		var layer = layui.layer;
		layer.open({
			type: 1 //Page层类型
			,area: ['300px', '350px']
			,title: ['所有油站','background-color: #00BFFF;text-align: center;font-size: 25px;font-weight: bold;']
			,shade: 0.6 //遮罩透明度
			,maxmin: true //允许全屏最小化
			,btn: ["确认","取消"]
			,content: '<ul id="browser" style="margin-left: 40px;margin-top: 20px;"></ul>',
			// yes: function(index, layer){
			// 	if(confirm('确实要选择此部门吗?')){
			// 		
			// 	}
			// }
		});
		treeReturnSuperiorDepartment();
		$(document).on('click', 'li', function() {
			var departmentId = $(this).attr("value");
			console.log(departmentId);
			layer.msg('成功了');
			$('#superiorDepartment').val(departmentId);
			console.log($('#superiorDepartment').val());
			return false;
		});
	});
}


var treeReturnSuperiorDepartment = function(){
	$.ajax({
		url : 'http://localhost:8888/manage_system/department/selectAllForParentIdDepartmentId',
		data : {},
		dataType : 'json',
		type : 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			Html.push('<li value="所有油站">'+'所有油站');
			//所有油站的子类
			Html.push('<ul>');
			if(res){
				// Html.push('<option value="0">'+'无'+'</option>');
				res.data.forEach(function(item,index){
					if(item.isDel = "0"){
						Html.push('<li value="'+item.departmentId+'">'+item.departmentName);
						recursionHtmlChildrenList(Html,item.childrenList);
						Html.push('</li>');
					}
				});	
			}
			Html.push('</ul>');
			Html.push('</li>');
			$('#browser').html(Html.join(''));
			$("#browser").treeview({
				toggle: function() {
					// console.log(1111);
				}
			});	
		},
	});
}

//父子级递归列表
var recursionHtmlChildrenList = function(Html,childrenList){
	//判断父类是否有子类
	if (childrenList && childrenList.length > 0) {
		//循环子类
		childrenList.forEach(function(param){
			//子类必须再次用<ul>标签<li>才能为上面父类的子类
			Html.push('<ul>');
			// for(var i = 1; i< childrenList.length+1; i++){
			//push到Html数组里
			Html.push('<li value="'+param.departmentId+'">'+param.departmentName);
			//判断使用递归方法
			if (param.childrenList && param.childrenList.length > 0) {
				recursionHtmlChildrenList(Html,param.childrenList);
			}
			Html.push('</li>');
			// }
			Html.push('</ul>');
		});
	}
}