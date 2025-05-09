-- Include a SQL script (create_schema.sql) that can be used to recreate the 
-- database schema, with all tables, constraints, and any initial data.

-- TABLE CREATION ---------------------------------------------------

CREATE TABLE Users(
  username VARCHAR(50) PRIMARY KEY UNIQUE,
  password VARCHAR(255) NOT NULL,
  date_of_creation DATE NOT NULL,
  is_admin DEFAULT NULL
);

CREATE TABLE friends(
  username1 VARCHAR(50) NOT NULL,
  username2 VARCHAR(50) NOT NULL,
  CHECK (username1 <> username2),
  FOREIGN KEY (username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (username1, username2)
);

CREATE TABLE friend_requests(
  sender_username VARCHAR(50) NOT NULL,
  receiver_username VARCHAR(50) NOT NULL,
  CHECK (sender_username <> receiver_username),
  FOREIGN KEY (sender_username) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (receiver_username, receiver_username) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (sender_username, receiver_username)
);

CREATE TABLE Posts(
  post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  contents VARCHAR(256) NOT NULL,
  owner VARCHAR(50) NOT NULL,
  date_of_post DATE NOT NULL,
  FOREIGN KEY (owner) REFERENCES Users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Votes(
  post_id INT NOT NULL,
  username VARCHAR(50) NOT NULL,
  numVote INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (username) REFERENCES Users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (post_id, username)
);

CREATE TABLE comment(
  comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contents VARCHAR(256) NOT NULL,
  owner VARCHAR(50) NOT NULL,
  date_of_post DATE NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (owner) REFERENCES Users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

-- DATA INITIALIZATION IN THE OTHER FILE