package com.example.spring_mybatis.emun;

public enum ResultEmun {
	
	DOUBLE_ROLEID(40, "所选角色存在"), ELSE_PASSWORD(5, "密码与原密码不符"), DOUBLE_EMPID(4, "重复关联"), DOUBLE_EMPNUM(0, "编号重复"),
	SUCCESS(1, "操作成功"), ALL_DATA(2, "返回全部数据"), NO_DATA(3, "没有数据"), INTERNAL_SERVER_ERROR(-1, "系统开小差啦~ 请重试"), // 系统出小差
	VALIDATION_ERROR(-2, "参数错误"), // 参数错误，拒绝访问
	UNAUTHORIZED_ERROR(-3, "获取用户失败，请重试或重新登录"), FORBIDDEN_ERROR(-4, "没有权限"), VALIDATION_FORAMT_ERROR(-5, "数据格式错误"), // 参数错误，拒绝访问
	CF(-7, "编号重复"), METHOD_NOT_ALLOWED(-6, "Method not allowed");// 参数异常

	private Integer code;
	private String message;

	ResultEmun(Integer code, String message) {
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
