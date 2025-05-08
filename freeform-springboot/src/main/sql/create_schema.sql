-- Provide a script to populate tables with at least 15 entries per table 
-- (initialize_data.sql), ensuring that all fields are populated and no NULL 
-- values are present.

-- Commands located in file:
-- social-media-app/freeform-springboot/src/main/java/com/example/demo/UserDAO.java

-- BACKEND QUERIES ---------------------------------------------------

-- CREATE USERS
SELECT COUNT(*) FROM users 
WHERE username = ?;

INSERT INTO users (username, password, date_of_creation) 
VALUES (?, ?, ?);

-- LOGIN USERS
SELECT password FROM users 
WHERE username = ?;

-- GET POSTS
SELECT * FROM posts 
ORDER BY date_of_post DESC, post_id DESC LIMIT ? OFFSET ?;

-- GET FRIENDS
SELECT username2 FROM friends
WHERE username1 = ?
UNION SELECT username1
FROM friends WHERE username2 = ?;

-- GET FRIEND REQS
SELECT sender_username FROM friend_requests
WHERE receiver_username = ?;

-- ACCEPT FREIEND REQ
SELECT COUNT(*) FROM
    (SELECT username2
    FROM friends WHERE username1 = ?
    AND username2 = ? 
    UNION SELECT username1 
        FROM friends WHERE username2 = ?
        AND username1 = ?) AS temp;

DELETE FROM friend_requests
WHERE sender_username = ?
AND receiver_username = ?;

INSERT INTO friends (username1, username2)
VALUES (?, ?);

-- DECLINE FRIEND REQ
DELETE FROM friend_requests
WHERE sender_username = ?
AND receiver_username = ?;

-- CREATE COMMENT
INSERT INTO comment (contents, owner, date_of_post, post_id)
VALUES (?, ?, ?, ?);

-- GET POSTS BY USERS
SELECT * FROM posts WHERE owner = ?
ORDER BY date_of_post DESC, post_id DESC;

-- GET VOTES
SELECT SUM(numvote) AS totVotes
FROM votes WHERE post_id = ?;

-- CREATE POST
INSERT INTO posts (title, contents, owner, date_of_post)
VALUES (?, ?, ?, ?);

-- CREATE FRIEND REQ
SELECT COUNT(*) FROM users
WHERE username = ?;

SELECT
    (SELECT COUNT(*) FROM friend_requests
    WHERE sender_username = ?
    AND receiver_username = ?)
    (SELECT COUNT(*) FROM friend_requests
    WHERE sender_username = ?
    AND receiver_username = ?) AS total_requests;

SELECT COUNT(*) FROM
    (SELECT username2 FROM friends
    WHERE username1 = ? AND username2 = ?
    UNION SELECT username1 FROM friends
    WHERE username2 = ? AND username1 = ?) AS temp;

-- EDIT VOTES
INSERT INTO votes (post_id, username, numvote)
VALUES (?, ?, ?) ON CONFLICT (post_id, username)
DO UPDATE SET numvote = EXCLUDED.numvote;

-- GET COMMENTS
SELECT * FROM comment
WHERE post_id = ?
ORDER BY date_of_post DESC, comment_id DESC;



