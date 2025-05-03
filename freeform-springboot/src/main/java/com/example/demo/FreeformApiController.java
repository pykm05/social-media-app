package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FreeformApiController {
    private UserDAO dao;

    public FreeformApiController(UserDAO userDAO){
        dao = userDAO;
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

    @PostMapping("/api/createaccount")
    public String postUser(@RequestBody Map<String, String> data){
        String username = data.get("username");
        String password = data.get("password");

        if (username.contains(" ")) {
            return "Username cannot contain spaces";
        } else if (username.length() > 50 || username.length() < 4) {
            return "Username is invalid (4-50 characters)";
        }

        if (password.length() <= 4){
            return "Password too short (4+ characters)";
        }

        System.out.println(username + " | " + password);
        return dao.createUser(username, hashPassword(password));
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
