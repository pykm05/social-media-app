package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FreeformApiController {
    // Test endpoint
    @GetMapping("/api/test")
    public String ping(){
        return "pong";
    }

    @PostMapping("/api/message")
    public String postMessage(@RequestBody String message) {
        System.out.println(message);
        return "Received message: " + message;
    }
}
