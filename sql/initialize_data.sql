-- Provide a script to populate tables with at least 15 entries per table 
-- (initialize_data.sql), ensuring that all fields are populated and no NULL 
-- values are present.

-- Commands located in file:
-- social-media-app/freeform-springboot/src/main/java/com/example/demo/UserDAO.java

-- BACKEND QUERIES ---------------------------------------------------

INSERT INTO Users (username, password, date_of_creation, is_admin) VALUES
    ('alice', 'passAlice', '2025-01-01', FALSE),
    ('bob', 'passBob', '2025-01-02', FALSE),
    ('charlie', 'passCharlie', '2025-01-03', FALSE),
    ('david', 'passDavid', '2025-01-04', FALSE),
    ('eve', 'passEve', '2025-01-05', FALSE),
    ('frank', 'passFrank', '2025-01-06', FALSE),
    ('grace', 'passGrace', '2025-01-07', FALSE),
    ('heidi', 'passHeidi', '2025-01-08', FALSE),
    ('ivan', 'passIvan', '2025-01-09', FALSE),
    ('judy', 'passJudy', '2025-01-10', FALSE),
    ('ken', 'passKen', '2025-01-11', FALSE),
    ('louis', 'passLouis', '2025-01-12', FALSE),
    ('mallory', 'passMallory', '2025-01-13', FALSE),
    ('nancy', 'passNancy', '2025-01-14', FALSE),
    ('oscar', 'passOscar', '2025-01-15', FALSE);

INSERT INTO friends (username1, username2) VALUES
    ('alice', 'bob'),
    ('alice', 'charlie'),
    ('bob', 'david'),
    ('charlie', 'eve'),
    ('frank', 'grace'),
    ('heidi', 'ivan'),
    ('judy', 'ken'),
    ('louis', 'mallory'),
    ('nancy', 'oscar'),
    ('bob', 'frank'),
    ('eve', 'grace'),
    ('ken', 'louis'),
    ('alice', 'heidi'),
    ('charlie', 'judy'),
    ('david', 'nancy');

INSERT INTO friend_requests (sender_username, receiver_username) VALUES
    ('mallory', 'alice'),
    ('oscar', 'bob'),
    ('judy', 'charlie'),
    ('heidi', 'david'),
    ('frank', 'eve'),
    ('grace', 'frank'),
    ('charlie', 'grace'),
    ('bob', 'heidi'),
    ('alice', 'ivan'),
    ('nancy', 'judy'),
    ('louis', 'ken'),
    ('ken', 'mallory'),
    ('david', 'nancy'),
    ('eve', 'oscar'),
    ('ivan', 'alice');

INSERT INTO Posts (title, contents, owner, date_of_post) VALUES
    ('Nintendo memes for the GROUP CHAT', 'First off, we have this does not mama the mia. You can send this if someone says something disappointing, if someone has an idea you don’t like, all of the above. This is perfect. Next, we have Me: wow this group chat is dead. Next we have the group chat after I go to sleep. It do be like that though. Send this to them and see what they say. Next we have this is my my last resort. Use it when you need it. You can screenshot these or download them in the pinned comment', 'biggie cheese', '2024-02-01'),
    ('Post B', 'Content of B', 'bob', '2025-02-02'),
    ('Post C', 'Content of C', 'charlie', '2025-02-03'),
    ('Post D', 'Content of D', 'david', '2025-02-04'),
    ('Post E', 'Content of E', 'eve', '2025-02-05'),
    ('Post F', 'Content of F', 'frank', '2025-02-06'),
    ('Post G', 'Content of G', 'grace', '2025-02-07'),
    ('Post H', 'Content of H', 'heidi', '2025-02-08'),
    ('Post I', 'Content of I', 'ivan', '2025-02-09'),
    ('Post J', 'Content of J', 'judy', '2025-02-10'),
    ('Post K', 'Content of K', 'ken', '2025-02-11'),
    ('Post L', 'Content of L', 'louis', '2025-02-12'),
    ('Post M', 'Content of M', 'mallory', '2025-02-13'),
    ('Post N', 'Content of N', 'nancy', '2025-02-14'),
    ('Post O', 'Content of O', 'oscar', '2025-02-15');

INSERT INTO Votes (post_id, username, numVote) VALUES
    (67, 'bob', 1),
    (68, 'charlie', 1),
    (69, 'david', -1),
    (70, 'eve', 1),
    (71, 'frank', 1),
    (72, 'grace', -1),
    (73, 'heidi', 1),
    (74, 'ivan', 1),
    (75, 'judy', 1),
    (76, 'ken', -1),
    (77, 'louis', 1),
    (78, 'mallory', 1),
    (79, 'nancy', -1),
    (80, 'oscar', 1),
    (81, 'alice', 1);

INSERT INTO comment (contents, owner, date_of_post, post_id) VALUES
    ('Nice post!', 'bob', '2024-03-01', 67),
    ('Great job!', 'charlie', '2024-03-02', 68),
    ('Interesting.', 'david', '2024-03-03', 69),
    ('Well written.', 'eve', '2024-03-04', 70),
    ('Could be better.', 'frank', '2024-03-05', 71),
    ('I like this.', 'grace', '2024-03-06', 72),
    ('Cool!', 'heidi', '2024-03-07', 73),
    ('Love it!', 'ivan', '2024-03-08', 74),
    ('Good points.', 'judy', '2024-03-09', 75),
    ('Thoughtful.', 'ken', '2024-03-10', 76),
    ('Agree with you.', 'louis', '2024-03-11', 77),
    ('Thanks for sharing.', 'mallory', '2024-03-12', 78),
    ('Nice perspective.', 'nancy', '2024-03-13', 79),
    ('I disagree.', 'oscar', '2024-03-14', 80),
    ('Very helpful.', 'alice', '2024-03-15', 81);

