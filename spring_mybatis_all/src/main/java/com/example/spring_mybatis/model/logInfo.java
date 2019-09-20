package com.example.spring_mybatis.model;

import java.util.Date;

public class logInfo {
    private String logId;

    private String userId;

    private Byte logType;

    private Date logTime;

    private String macCode;

    private String masIp;

    private String logDescription;

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId == null ? null : logId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Byte getLogType() {
        return logType;
    }

    public void setLogType(Byte logType) {
        this.logType = logType;
    }

    public Date getLogTime() {
        return logTime;
    }

    public void setLogTime(Date logTime) {
        this.logTime = logTime;
    }

    public String getMacCode() {
        return macCode;
    }

    public void setMacCode(String macCode) {
        this.macCode = macCode == null ? null : macCode.trim();
    }

    public String getMasIp() {
        return masIp;
    }

    public void setMasIp(String masIp) {
        this.masIp = masIp == null ? null : masIp.trim();
    }

    public String getLogDescription() {
        return logDescription;
    }

    public void setLogDescription(String logDescription) {
        this.logDescription = logDescription == null ? null : logDescription.trim();
    }
}