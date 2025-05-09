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

import static java.lang.Integer.parseInt;

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

    @PostMapping("/api/getpostsbyuser")
    public List<Posts> getPostsByUser(@RequestBody Map<String, String> data){
        String owner = data.get("owner");
        return dao.getPostsByUser(owner);
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

    @PostMapping("/api/changeusername")
    public String changeUsername(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("oldUsername")) == null){
            return "Invalid session";
        }

        String username = data.get("username");

        if (username.contains(" ")) {
            return "Username cannot contain spaces";
        } else if (username.length() > 50 || username.length() < 4) {
            return "Username is invalid (4-50 characters)";
        }

        //System.out.println(username + " | " + password);
        return dao.changeUsername(username, data.get("oldUsername"));
    }

    @PostMapping("/api/deletepost")
    public String deletePost(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("username")) == null){
            return "Invalid session";
        }

        String postId = data.get("postId");

        //System.out.println(username + " | " + password);
        return dao.deletePost(parseInt(postId), data.get("username"));
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

    @PostMapping("/api/getfriends")
    public List<Friend> getFriends(@RequestBody Map<String, String> data){
        String username = data.get("username");
        return dao.getFriends(username);
    }

    @PostMapping("/api/validatesession")
    public Session validateSession(@RequestBody Map<String, String> data){
        String sessionId = data.get("SessionId");
        return sessionManager.getDataIfValid(sessionId);
    }

    @PostMapping("/api/createcomment")
    public String createComment(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("owner")) == null){
            return "Invalid session";
        }

        String owner = data.get("owner");
        String contents = data.get("contents");
        String postId = data.get("postId");

        if (contents.length() < 4 || contents.length() > 256){
            return "Content is invalid (4-256 characters)";
        }

        return dao.createComment(parseInt(postId), contents, owner);
    }

    @PostMapping("/api/sendfriendreq")
    public String sendFriendReq(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("senderUsername")) == null){
            return "Invalid session";
        }

        String sender = data.get("senderUsername");
        String receiver = data.get("receiverUsername");
        System.out.println(receiver);

        if (sender.equals(receiver)){
            return "You can't send yourself a friend request.";
        }

        return dao.createFriendReq(sender, receiver);
    }

    @PostMapping("/api/getfriendreqs")
    public List<FriendRequest> getFriendReqs(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("username")) == null){
            return new ArrayList<FriendRequest>();
        }

        String username = data.get("username");
        System.out.println(username);

        return dao.getFriendReqs(username);
    }

    @PostMapping("/api/acceptfriendreq")
    public String acceptFriendReq(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("receiver")) == null){
            return "Invalid session";
        }

        String senderUsername = data.get("sender");
        String receiverUsername = data.get("receiver");

        return dao.acceptFriendReq(senderUsername, receiverUsername);
    }

    @PostMapping("/api/declinefriendreq")
    public String declineFriendReq(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("receiver")) == null){
            return "Invalid session";
        }

        String senderUsername = data.get("sender");
        String receiverUsername = data.get("receiver");

        return dao.declineFriendReq(senderUsername, receiverUsername);
    }

    @PostMapping("/api/vote")
    public String editVote(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("username")) == null){
            return "?";
        }

        int postId = parseInt(data.get("postId"));
        String username = data.get("username");
        int numVote = parseInt(data.get("numVote"));

        //System.out.println(username + " | " + password);
        return dao.editVotes(postId, username, numVote) + "";
    }

    @PostMapping("/api/getvotes")
    public int getVotes(@RequestBody Map<String, Integer> data){
        int postId = data.get("postId");
        return dao.getVotes(postId);
    }

    @PostMapping("/api/createpost")
    public String createPost(@RequestBody Map<String, String> data){
        if (sessionManager.validateSession(data.get("sessionId"), data.get("owner")) == null){
            return "Invalid session";
        }

        String owner = data.get("owner");
        String title = data.get("title");
        String contents = data.get("contents");

        if (title.length() > 50 || title.length() < 4) {
            return "Title is invalid (4-50 characters)";
        }

        if (contents.length() < 4 || contents.length() > 256){
            return "Content is invalid (4-256 characters)";
        }

        return dao.createPost(title, contents, owner);
    }

    @PostMapping("/api/getcomments")
    public List<Comment> getComments(@RequestBody Map<String, Integer> data){
        Integer postId = data.get("postId");

        return dao.getComments(postId);
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
