package com.example.demo;

import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;

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

            PreparedStatement stmt = connection.prepareStatement("INSERT INTO users (username, password) VALUES (?, ?)");
            stmt.setString(1, username);
            stmt.setString(2, password);
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

