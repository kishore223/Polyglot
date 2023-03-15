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
INSERT INTO polyglot.verbs (english_verb, italian_verb, url_image) 
VALUES 
    ('swim', 'nuotare', 'https://images.unsplash.com/photo-1560518883-86fe089f6d48?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3dpbSUyMGF0JTIwdGhlJTIwc3VwcG9ydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('fly', 'volare', 'https://images.unsplash.com/photo-1605088121816-d3f9c9ab6354?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZseSUyMGZseW5pbmclMjBjb3ZlcmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('study', 'studiare', 'https://images.unsplash.com/photo-1549911586-44f469eee0a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3R1ZGllcyUyMGluJTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('work', 'lavorare', 'https://images.unsplash.com/photo-1579887436613-39a92a1d2c4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3MlMjBjb21wYW55fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('run', 'correre', 'https://images.unsplash.com/photo-1574455777171-9c6f52e6b1c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJ1bnMlMjBjb3ZlcmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('talk', 'parlare', 'https://images.unsplash.com/photo-1612901191247-01cc12f37a67?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsa3MlMjBjb21wYW55fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('sing', 'cantare', 'https://images.unsplash.com/photo-1597570915632-05d8a26fc74d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNpbmclMjBjb3ZlcmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('cook', 'cucinare', 'https://images.unsplash.com/photo-1542094774-5f46ad1b048e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vayUyMGNvbXBhbnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('clean', 'pulire', 'https://images.unsplash.com/photo-1533226300569-94b7e81f6ab5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('draw', 'disegnare', 'https://images.unsplash.com/photo-1544209628-36e8e1aafc88?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRyYXdzJTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('paint', 'dipingere', 'https://images.unsplash.com/photo-1557126364-89f0e4e4b20e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhaW50JTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('laugh', 'ridere', 'https://images.unsplash.com/photo-1542716203-7a6e25e8f7a2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGF1Z2glMjBjb21wYW55fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('cry', 'piangere', 'https://images.unsplash.com/photo-1614738313196-9fc6d7df2334?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvJTIwd2FsbGV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('speak', 'parlare', 'https://images.unsplash.com/photo-1528925080181-d35aa1d666fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uJTIwd2l0aCUyMGxpdmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('watch', 'guardare', 'https://images.unsplash.com/photo-1553674909-7e748ce3bda5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2glMjBjb21wYW55fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('eat', 'mangiare', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWF0JTIwd29tZW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('drink', 'bere', 'https://images.unsplash.com/photo-1595867199376-eb9c9dfa5662?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpbmtzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('sleep', 'dormire', 'https://images.unsplash.com/photo-1620970339041-79d01b15a8a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNsZWVwJTIwd2l0aCUyMGxpdmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
('wake', 'svegliare', 'https://images.unsplash.com/photo-1534050354057-a1bb2d3cb3be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdhc2tlciUyMGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('go', 'andare', 'https://images.unsplash.com/photo-1593720210263-9ac44737b421?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z29vZ2xlJTIwY29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('think', 'pensare', 'https://images.unsplash.com/photo-1517524005126-1c7c9c9d5158?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhpbmtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('listen', 'ascoltare', 'https://www.impresadigitale.it/wp-content/uploads/2020/08/ascoltare.jpg'),
    ('read', 'leggere', 'https://images.unsplash.com/photo-1569144671420-53929d15e3a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWRzJTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('write', 'scrivere', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NyaXZlcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('play', 'giocare', 'https://images.unsplash.com/photo-1609708648119-9e8191fc3e3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGxheSUyMGZyb250JTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('drive', 'guidare', 'https://images.unsplash.com/photo-1598986966807-93806df1b6f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRyaXZlJTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('dance', 'ballare', 'https://images.unsplash.com/photo-1528747045269-3904f8c821bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRhbmNlJTIwY29udHJvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('move', 'muovere', 'https://images.unsplash.com/photo-1561014820-1dfe741c623e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW92ZSUyMGluJTIwY29sbGVjdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'),
    ('wait', 'aspettare', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FpdCUyMG9mJTIwd2FpdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('exist', 'esistere', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FpdCUyMG9mJTIwd2FpdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'),
    ('open', 'aprire', 'https://c8.alamy.com/compit/gextc5/mano-destra-aprire-la-porta-isolata-su-sfondo-bianco-con-percorso-di-clipping-gextc5.jpg'),
    ('fight', 'combattere', 'https://images.unsplash.com/photo-1552949506-aa5e5fdcaf7a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlnaHQlMjBhbmQlMjBjb21iYXR0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');

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
