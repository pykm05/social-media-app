import java.sql.*;

public class Main {
    public static void main(String[] args) {


        String url = "";
        String user = "postgres";
        String password = "404NotFound!";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("connected to database");

                // Statement stmt= conn.createStatement();
                // stmt.execute("CREATE TABLE test(col1 VARCHAR(20), col2 INT)");

                PreparedStatement pstmt = conn.prepareStatement("INSERT INTO test (col1, col2) VALUES (?, ?)");

                String[] names = { "bobe", "joe", "sfd" };

                pstmt.setString(1, "I'm in vscode" + names[0]);
                pstmt.setInt(2, 1234);
                int res = pstmt.executeUpdate();
                if (res == 1) {
                    System.out.println("ya");
                }

            } else {
                System.out.println("failed to connect");
            }
        } catch (SQLException e) {
            System.out.println("connection error");
            e.printStackTrace();
        }
    }
}
