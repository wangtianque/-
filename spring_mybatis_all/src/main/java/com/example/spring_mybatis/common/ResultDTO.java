package com.example.spring_mybatis.common;


import com.example.spring_mybatis.emun.ResultEmun;


public class ResultDTO<T> {
    private Integer code;
    private String msg;
    private T data;

    public ResultDTO() {
    }

    public ResultDTO(ResultEmun resultEmun) {
        this.code = resultEmun.getCode();
        this.msg = resultEmun.getMessage();
    }
    public ResultDTO(ResultEmun resultEmun, T data) {
        this.code = resultEmun.getCode();
        this.msg = resultEmun.getMessage();
        this.data = data;
    }
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
