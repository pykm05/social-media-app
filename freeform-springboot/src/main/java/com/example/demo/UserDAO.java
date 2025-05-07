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

    public List<Posts> getPosts(int numPosts, int offset){
        List<Posts> reqPosts = new ArrayList<Posts>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement getReqPosts = connection.prepareStatement("SELECT * FROM posts ORDER BY date_of_post DESC LIMIT ? OFFSET ?");
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

