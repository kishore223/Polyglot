grant all on polyglot.* to 'springuser'@'%';

CREATE TABLE polyglot.player (
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  score int DEFAULT '0',
  password varchar(255) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE polyglot.Languages (
  id INT PRIMARY KEY auto_increment,
  name VARCHAR(255) NOT NULL UNIQUE
);
ALTER TABLE polyglot.Languages AUTO_INCREMENT = 2001;

INSERT INTO polyglot.Languages (name) VALUES ('Italian');
INSERT INTO polyglot.Languages (name) VALUES ('Spanish');

CREATE TABLE polyglot.Modules (
     id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO polyglot.Modules (name)
VALUES
('activity_1'),
('learning_1'),
('activity_2'),
('learning_2'),
('activity_3'),
('learning_3');

CREATE TABLE verbs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  english_verb VARCHAR(255),
  italian_verb VARCHAR(255),
  url_image VARCHAR(255)
);

INSERT INTO verbs (english_verb, italian_verb, url_image)
VALUES ('jump', 'saltare','http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcT72MG4ALk3Ahbqe6KLFDhqgKwL5uJkci2qR5YbbDUbDyiP1Lq4djHBTTtv2f27mRxUeFmV_F7dmdrHiY1bGhw');

INSERT INTO verbs (english_verb, italian_verb, url_image)
VALUES ('read', 'leggere','https://cs.ilgiardinodeilibri.it/data/spec/big/leggere-fa-bene-speciale.jpg?_=1647342546');

INSERT INTO verbs (english_verb, italian_verb, url_image)
VALUES ('write', 'scrivere','https://laricerca.loescher.it/images/stories/istruzione/WRW/mano.jpg');

CREATE TABLE polyglot.Scores (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(255),
    Language INT,
    Module INT,
    Score INT,
    PRIMARY KEY (id),
    FOREIGN KEY (email) REFERENCES player(email),
    FOREIGN KEY (Language) REFERENCES Languages(id),
    FOREIGN KEY (Module) REFERENCES Modules(id)
);
