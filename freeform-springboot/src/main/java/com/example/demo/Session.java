package com.example.demo;

import java.time.LocalDateTime;

public class Session {
    public String username;
    public String sessionId;
    public LocalDateTime expireTime;

    public Session(String username, String sessionId){
        this.username = username;
        this.sessionId = sessionId;
        this.expireTime = LocalDateTime.now().plusMinutes(5);
    }

    public Boolean isValid(){
        return LocalDateTime.now().isBefore(this.expireTime);
    }

    @Override
    public String toString(){
        return username + " | " + sessionId + " | " + expireTime;
    }
}
