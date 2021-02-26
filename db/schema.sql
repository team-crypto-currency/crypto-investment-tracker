DROP DATABASE IF EXISTS portafolioDB;

CREATE DATABASE portafolioDB;

USE  portafolioDB;

CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(25) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE coins
(
    id int NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    coin VARCHAR(100) NOT NULL,
    

    PRIMARY KEY (id)
);
