grant all on polyglot.* to 'springuser'@'%';

CREATE TABLE `player` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` int DEFAULT '0',
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
);


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
