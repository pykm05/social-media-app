package com.example.demo;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@Service
public class SessionManager {
    private Map<String, Session> sessionsByUsername = new HashMap<String, Session>();
    private Map<String, Session> sessionsBySessionId = new HashMap<String, Session>();

    public String createSession(String username){
        String sessionId = UUID.randomUUID().toString();
        if (sessionsByUsername.containsKey(username)){
            String tempSes = sessionsByUsername.get(username).sessionId;
            sessionsBySessionId.remove(tempSes);
            sessionsByUsername.remove(username);
        }

        Session session = new Session(username, sessionId);
        sessionsByUsername.put(username, session);
        sessionsBySessionId.put(sessionId, session);
        System.out.println(sessionsBySessionId);
        return sessionId;
    }

    public Session validateSession(String sessionId){
        if (sessionsBySessionId.containsKey(sessionId)){
            Session tempSes = sessionsBySessionId.get(sessionId);
            if (tempSes.isValid()){
                return tempSes;
            }
            sessionsBySessionId.remove(tempSes.sessionId);
            sessionsByUsername.remove(tempSes.username);
        }
        return null;
    }

    public void seeSessions(){
        System.out.println(sessionsBySessionId);
    }
}
