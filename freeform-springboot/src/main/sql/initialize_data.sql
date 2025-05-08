-- Include a SQL script (create_schema.sql) that can be used to recreate the 
-- database schema, with all tables, constraints, and any initial data.

-- TABLE CREATION ---------------------------------------------------

CREATE TABLE friend_requests(
  sender_username VARCHAR(50) NOT NULL,
  receiver_username VARCHAR(50) NOT NULL,
  CHECK (sender_username <> receiver_username),
  FOREIGN KEY (sender_username) REFERENCES users(username),
  FOREIGN KEY (receiver_username) REFERENCES users(username)
);

CREATE TABLE friends(
  username1 VARCHAR(50) NOT NULL,
  username2 VARCHAR(50) NOT NULL,
  CHECK (username1 <> username2),
  FOREIGN KEY (username1) REFERENCES users(username),
  FOREIGN KEY (username2) REFERENCES users(username)
);

-- DATA INITIALIZATION ---------------------------------------------------

INSERT INTO friends(username1, username2) 
VALUES ("test", "admin");