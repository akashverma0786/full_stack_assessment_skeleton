CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);


CREATE TABLE home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255),
    state_name VARCHAR(100),
    zip VARCHAR(20),
    sqft DECIMAL(10, 2),
    beds INT,
    baths INT,
    list_price DECIMAL(15, 2)
);



-- DESCRIBE home;

INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;
-- SELECT * FROM user;

INSERT INTO home (street_address, state_name, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;
-- SELECT * FROM home;

ALTER TABLE user_home
ADD COLUMN user_id INT,
ADD COLUMN home_id INT,
ADD COLUMN id INT;

ALTER TABLE user_home MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

UPDATE user_home AS uh
JOIN user AS u
ON uh.username = u.username AND uh.email = u.email
SET uh.user_id = u.user_id;

-- UPDATE user_home AS uh
-- JOIN home AS h
-- ON uh.street_address = h.street_address AND uh.state = h.state_name AND uh.zip = h.zip AND uh.sqft = h.sqft AND uh.beds = h.beds AND uh.baths = h.baths AND uh.list_price = h.list_price
-- SET uh.home_id = h.home_id;

UPDATE user_home uh
JOIN home h
ON uh.street_address = h.street_address
   AND uh.state = h.state_name
   AND uh.zip = h.zip
   AND ROUND(uh.sqft, 2) = ROUND(h.sqft, 2) 
   AND uh.beds = h.beds
   AND uh.baths = h.baths
   AND ROUND(uh.list_price, 2) = ROUND(h.list_price, 2)  
SET uh.home_id = h.home_id;



ALTER TABLE user_home
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(user_id),
ADD CONSTRAINT fk_home FOREIGN KEY (home_id) REFERENCES home(home_id);

-- SELECT * FROM user;
-- DESCRIBE user_home;
-- SELECT user_id, home_id FROM user_home;


-- CREATE TABLE user (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE home (
--     home_id INT AUTO_INCREMENT PRIMARY KEY,
--     street_address VARCHAR(255),
--     state_name VARCHAR(100),
--     zip VARCHAR(20),
--     sqft DECIMAL(10, 2),
--     beds INT,
--     baths INT,
--     list_price DECIMAL(15, 2)
-- );

-- INSERT INTO user (username, email)
-- SELECT DISTINCT username, email FROM user_home;

-- INSERT INTO home (street_address, state_name, zip, sqft, beds, baths, list_price)
-- SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;


-- ALTER TABLE user_home
-- ADD COLUMN user_id INT,
-- ADD COLUMN home_id INT;


-- UPDATE user_home uh
-- JOIN user u ON uh.username = u.username AND uh.email = u.email
-- JOIN home h ON uh.street_address = h.street_address AND uh.state = h.state_name AND uh.zip = h.zip
--    AND uh.sqft = h.sqft AND uh.beds = h.beds AND uh.baths = h.baths AND uh.list_price = h.list_price
-- SET uh.user_id = u.user_id, uh.home_id = h.home_id;


-- ALTER TABLE user_home
-- ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(user_id),
-- ADD CONSTRAINT fk_home FOREIGN KEY (home_id) REFERENCES home(home_id);
