package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FreeformApiController {
    private UserDAO dao;
    private SessionManager sessionManager;

    public FreeformApiController(UserDAO userDAO, SessionManager sessionManager){
        dao = userDAO;
        this.sessionManager = sessionManager;
    }

    // Test endpoint
    /*@GetMapping("/api/test")
    public String ping(){
        return "pong";
    }

    @GetMapping("/api/dbtest")
    public String dbTest(){
        dao.createUser("d", "d");
        return "Attempted";
    }

    @PostMapping("/api/message")
    public String postMessage(@RequestBody String message) {
        System.out.println(message);
        return "Received message: " + message;
    }*/

    @PostMapping("/api/getposts")
    public List<Posts> getPosts(@RequestBody Map<String, Integer> data){
        int numPosts = data.get("numPosts");
        int offset = data.get("offset");
        return dao.getPosts(numPosts, offset);
    }

    @PostMapping("/api/createaccount")
    public String postUser(@RequestBody Map<String, String> data){
        String username = data.get("username");
        String password = data.get("password");

        if (username.contains(" ")) {
            return "Username cannot contain spaces";
        } else if (username.length() > 50 || username.length() < 4) {
            return "Username is invalid (4-50 characters)";
        }

        if (password.length() < 4){
            return "Password too short (4+ characters)";
        }

        //System.out.println(username + " | " + password);
        return dao.createUser(username, hashPassword(password));
    }

    @PostMapping("/api/login")
    public String loginUser(@RequestBody Map<String, String> data){
        String username = data.get("username");
        String password = data.get("password");

        if (username.contains(" ") || username.length() > 50 || username.length() < 4) {
            return "Invalid Username";
        }

        if (password.length() < 4){
            return "Invalid Password";
        }

        //System.out.println(username + " | " + password);
        return dao.loginUser(username, password);
    }

    @PostMapping("/api/validatesession")
    public String validateSession(@RequestBody Map<String, String> data){
        String sessionId = data.get("SessionId");
        if (sessionManager.validateSession(sessionId)){
            return "Valid session";
        }
        return "Invalid session";
    }

    public static String hashPassword(String password){
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : messageDigest) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing", e);
        }
    }
}
