package com.example.demo;

import org.springframework.aot.generate.GeneratedTypeReference;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Repository
public class UserDAO {

    private DataSource dataSource;
    private SessionManager sessionManager;

    public UserDAO(DataSource dataSource, SessionManager sessionManager){
        this.dataSource = dataSource;
        this.sessionManager = sessionManager;
    }

    public String createUser(String username, String password) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement uniqueness = connection.prepareStatement("SELECT COUNT(*) FROM users WHERE username = ?");
            uniqueness.setString(1, username);
            try (ResultSet rs = uniqueness.executeQuery()){
                if (rs.next() && rs.getInt(1) > 0) {
                    return "username taken";
                }
            }

            PreparedStatement stmt = connection.prepareStatement("INSERT INTO users (username, password, date_of_creation) VALUES (?, ?, ?)");
            stmt.setString(1, username);
            stmt.setString(2, password);
            stmt.setDate(3, Date.valueOf(LocalDate.now()));
            stmt.executeUpdate();

            connection.close();
            return "account created";
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "error";
    }

    public String loginUser(String username, String password) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getPassword = connection.prepareStatement("SELECT password FROM users WHERE username = ?");
            getPassword.setString(1, username);
            try (ResultSet rs = getPassword.executeQuery()) {
                if (rs.next()) {
                    if (hashPassword(password).equals(rs.getString(1))){
                        connection.close();
                        return sessionManager.createSession(username);
                    } else {
                        connection.close();
                        return "Incorrect password";
                    }
                } else {
                    connection.close();
                    return "User not found";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "error";
    }

    public List<Posts> getPosts(int numPosts, int offset) {
        List<Posts> reqPosts = new ArrayList<Posts>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqPosts = connection.prepareStatement("SELECT * FROM posts ORDER BY date_of_post DESC, post_id DESC LIMIT ? OFFSET ?");
            getReqPosts.setInt(1, numPosts);
            getReqPosts.setInt(2, offset);
            try (ResultSet rs = getReqPosts.executeQuery()) {
                while (rs.next()){
                    Posts post = new Posts(
                            rs.getInt("post_id"),
                            rs.getString("title"),
                            rs.getString("contents"),
                            rs.getString("owner"),
                            rs.getDate("date_of_post"));
                    reqPosts.add(post);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return reqPosts;
    }

    public List<Friend> getFriends(String username){
        List<Friend> reqFriends = new ArrayList<Friend>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqFriends = connection.prepareStatement("SELECT username2 FROM friends WHERE username1 = ? UNION SELECT username1 FROM friends WHERE username2 = ?");

            getReqFriends.setString(1, username);
            getReqFriends.setString(2, username);

            try (ResultSet rs = getReqFriends.executeQuery()) {
                while (rs.next()){
                    reqFriends.add(new Friend(rs.getString("username2")));
                }
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return reqFriends;
    }

    public String createComment(int postId, String contents, String owner){
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO comment (contents, owner, date_of_post, post_id) VALUES (?, ?, ?, ?)");
            stmt.setString(1, contents);
            stmt.setString(2, owner);
            stmt.setDate(3, Date.valueOf(LocalDate.now()));
            stmt.setInt(4, postId);
            stmt.executeUpdate();

            connection.close();
            return "Comment created!";
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "error";
    }

    public List<Posts> getPostsByUser(String owner){
        List<Posts> reqPosts = new ArrayList<Posts>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqPosts = connection.prepareStatement("SELECT * FROM posts WHERE owner = ? ORDER BY date_of_post DESC, post_id DESC");
            getReqPosts.setString(1, owner);
            try (ResultSet rs = getReqPosts.executeQuery()) {
                while (rs.next()){
                    Posts post = new Posts(
                            rs.getInt("post_id"),
                            rs.getString("title"),
                            rs.getString("contents"),
                            rs.getString("owner"),
                            rs.getDate("date_of_post"));
                    reqPosts.add(post);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println(reqPosts);
        return reqPosts;
    }

    public int getVotes(int postId){
        int voteCount = 0;
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqPosts = connection.prepareStatement("SELECT SUM(numvote) AS totVotes FROM votes WHERE post_id = ?");
            getReqPosts.setInt(1, postId);
            try (ResultSet rs = getReqPosts.executeQuery()) {
                if (rs.next()){
                    voteCount = rs.getInt("totVotes");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return voteCount;
    }

    public String createPost(String title, String contents, String owner){
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO posts (title, contents, owner, date_of_post) VALUES (?, ?, ?, ?)");
            stmt.setString(1, title);
            stmt.setString(2, contents);
            stmt.setString(3, owner);
            stmt.setDate(4, Date.valueOf(LocalDate.now()));
            stmt.executeUpdate();

            connection.close();
            return "Post created!";
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "error";
    }

    public int editVotes(int postId, String username, int numvote){
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO votes (post_id, username, numvote) VALUES (?, ?, ?) ON CONFLICT (post_id, username) DO UPDATE SET numvote = EXCLUDED.numvote");
            stmt.setInt(1, postId);
            stmt.setString(2, username);
            stmt.setInt(3, numvote);
            stmt.execute();

            connection.close();

            return getVotes(postId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -11111111;
    }

    public List<Comment> getComments(int postId){
        List<Comment> reqComment = new ArrayList<Comment>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqPosts = connection.prepareStatement("SELECT * FROM comment WHERE post_id = ? ORDER BY date_of_post DESC, comment_id DESC");
            getReqPosts.setInt(1, postId);
            try (ResultSet rs = getReqPosts.executeQuery()) {
                while (rs.next()){
                    Comment comment = new Comment(
                            rs.getInt("post_id"),
                            rs.getInt("comment_id"),
                            rs.getString("contents"),
                            rs.getString("owner"),
                            rs.getDate("date_of_post"));
                    reqComment.add(comment);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println(reqComment);
        return reqComment;
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

