-- database: c:\Users\Veron\Desktop\BackendPro\server\db\freakyfashion.db

CREATE TABLE Products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName VARCHAR(25) NOT NULL,
    description VARCHAR(300),
    image TEXT,
    brand VARCHAR(100),
    sku VARCHAR(6),
    price INTEGER,
    categoryId INTEGER NOT NULL, --(FK)
    publishDate TEXT,
    created_at TEXT,
    slug TEXT
);

INSERT INTO Products 
(productName, description, image, brand, sku, price, categoryId, publishDate, created_at, slug)
VALUES
('Classic T-Shirt', 'En enkel klassisk t-shirt i bomull.', 'https://placehold.co/500x600', 'Plopp', 'AAA111', 199, 1,'2025-01-01', '2025-01-01','classic-t-shirt'),
('Sports Sneakers', 'Lätta och bekväma sneakers för träning.', 'https://placehold.co/500x600', 'Snickers', 'BBB222', 899, 1, '2025-02-15', '2025-02-10','sports-sneakers'),
('Leather Wallet', 'Exklusiv plånbok i äkta läder.', 'https://placehold.co/500x600', 'Levis', 'CCC333', 499, 2, '2025-03-01', '2025-02-25','leather-wallet'),
('Smartphone X100', 'Högpresterande smartphone med lång batteritid.', 'https://placehold.co/500x600', 'Marabou', 'DDD444', 6999, 2, '2025-04-10', '2025-04-01','smartphone-x100'),
('Coffee Maker', 'Brygg ditt kaffe snabbt och enkelt.', 'https://placehold.co/500x600', 'Monster', 'EEE555', 1299, 3, '2025-05-05', '2025-05-01','coffee-maker'),
('Gaming Chair', 'Ergonomisk stol för gaming och kontor.', 'https://placehold.co/500x600', 'Dell', 'FFF666', 2499, 3, '2025-06-12', '2025-06-10','gaming-chair'),
('Bluetooth Headphones', 'Trådlösa hörlurar med bra ljud.', 'https://placehold.co/500x600', 'Zara', 'GGG777', 1299, 4, '2025-07-01', '2025-06-28','bluetooth-headphones'),
('Winter Jacket', 'Varm och snygg jacka för vintern.', 'https://placehold.co/500x600', 'Puma', 'HHH888', 1999, 4, '2025-08-01', '2025-07-25','winter-jacket'),
('Desk Lamp', 'LED-lampa med justerbar ljusstyrka.', 'https://placehold.co/500x600', 'Cloetta', 'III999', 399, 1, '2025-09-01', '2025-08-28','desk-lamp'),
('Yoga Mat', 'Bekväm och halkfri yogamatta.', 'https://placehold.co/500x600', 'Nike', 'JJJ111', 299, 1, '2025-10-01', '2025-09-25', 'yoga-mat');

DROP TABLE Products;

CREATE TABLE IF NOT EXISTS Categories(
    categoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryName TEXT NOT NULL,
    categoryImage TEXT
);

INSERT INTO Categories VALUES
    ("","","","")

CREATE TABLE Users(
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    street VARCHAR(100),
    zip VARCHART(10),
    city VARCHAR(100),
    newsLetter INTEGER NOT NULL DEFAULT 0 CHECK (newsLetter IN (0,1))
);

INSERT INTO Users VALUES
(1,"Sara","Nilsson","sara@gmail.com","Sommargatan 1","25600", "Malmö", 0),
(2,"Bob","Svensson","bob@gmail.com","Vintergatan 2","25600", "Helsingborg", 1);

DROP TABLE Users;

CREATE TABLE Hero(
 id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT
);
INSERT INTO Hero VALUES
(1,
"Hero",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum mollitia nemo, laboriosam 0accusantium soluta voluptatum odit, laudantium nam molestias et cupiditate praesentium. Tempora soluta id voluptatibus temporibus rerum unde a.");

DROP TABLE Hero;