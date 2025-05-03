package com.example.demo;

import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;

@Repository
public class UserDAO {

    private DataSource dataSource;

    public UserDAO(DataSource dataSource){
        this.dataSource = dataSource;
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

