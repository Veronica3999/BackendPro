PRAGMA foreign_keys = ON;

DROP TABLE Products;
DROP TABLE Categories;
DROP TABLE Hero;
DROP TABLE Users;
DROP TABLE Spots;
DROP TABLE Users;
DROP TABLE Orders;
DROP TABLE OrderItems;
DROP TABLE Favorites;

CREATE TABLE "Users"(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT UNIQUE,
    street TEXT,
    zip TEXT,
    city TEXT,
    NewsLetter INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `password` TEXT UNIQUE, 
    `role` TEXT NOT NULL DEFAULT user
    );

CREATE TABLE Spots(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    heading TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT   
);

CREATE TABLE Products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    description TEXT,
    image TEXT,
    brand TEXT,
    sku TEXT NOT NULL UNIQUE,
    price INTEGER,
    categoryId INTEGER NOT NULL, --(FK)
    publishDate TEXT,
    created_at TEXT,
    slug TEXT
);

CREATE TABLE Orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER NOT NULL,
    created_at CURRENT_TIMESTAMP,
    totalPrice INTEGER NOT NULL,
FOREIGN KEY (userID) REFERENCES Users(id) 
);

CREATE TABLE OrderItems(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productID INTEGER NOT NULL,
    orderID INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
FOREIGN KEY (productID) REFERENCES Products(id), 
FOREIGN KEY (orderID) REFERENCES Orders(id) 
);

CREATE TABLE Hero(
 id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 content TEXT,
 image TEXT
);

CREATE TABLE Favorites(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    productID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(id),
    FOREIGN KEY (productID) REFERENCES Products(id),
    UNIQUE(userID, productID)--förhindrar dubletter, samma användare kan inte lägga till samma produkt 2ggr.
);

CREATE TABLE Categories(
    categoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryName TEXT NOT NULL,
    categoryImage TEXT
);

INSERT INTO Products 
('name', description, image, brand, sku, price, categoryId, publishDate, created_at, slug)
VALUES
('Sneakers One', 'Bekväma sneakers för vardag och sport.', 'https://placehold.co/500x600', 'Nike', 'AAA111', 799, 1, '2025-01-01', '2025-01-01', 'sneakers-one'),
('Sneakers Two', 'Träningsskor med bra dämpning.', 'https://placehold.co/500x600', 'Adidas', 'BBB111', 899, 1, '2025-01-02', '2025-01-02', 'sneakers-two'),
('Boots Classic', 'Robusta kängor för alla väder.', 'https://placehold.co/500x600', 'Timberland', 'AAA222', 1499, 1, '2025-01-03', '2025-01-03', 'boots-classic'),
('Running Pro', 'Löparskor för långdistans.', 'https://placehold.co/500x600', 'Asics', 'CCC111', 999, 1, '2025-01-04', '2025-01-04', 'running-pro'),
('Loafers', 'Klassiska loafers i skinn.', 'https://placehold.co/500x600', 'Gucci', 'BBB222', 1999, 1, '2025-01-05', '2025-01-05', 'loafers'),
('Sandals', 'Lätta sandaler för sommaren.', 'https://placehold.co/500x600', 'Birkenstock', 'CCC222', 499, 1, '2025-01-06', '2025-01-06', 'sandals'),
('High Heels', 'Stilrena klackskor.', 'https://placehold.co/500x600', 'Zara', 'AAA333', 899, 1, '2025-01-07', '2025-01-07', 'high-heels'),
('Winter Boots', 'Varmfodrade vinterskor.', 'https://placehold.co/500x600', 'Columbia', 'BBB333', 1299, 1, '2025-01-08', '2025-01-08', 'winter-boots'),
('Casual Shoes', 'Allround-skor för vardagsbruk.', 'https://placehold.co/500x600', 'H&M', 'CCC333', 599, 1, '2025-01-09', '2025-01-09', 'casual-shoes'),
('Skate Shoes', 'Skor med slitstark sula.', 'https://placehold.co/500x600', 'Vans', 'AAA444', 749, 1, '2025-01-10', '2025-01-10', 'skate-shoes'),
('Basic Tee White', 'Enkel vit t-shirt i bomull.', 'https://placehold.co/500x600', 'H&M', 'BBB444', 199, 2, '2025-02-01', '2025-02-01', 'basic-tee-white'),
('Basic Tee Black', 'Enkel svart t-shirt i bomull.', 'https://placehold.co/500x600', 'Uniqlo', 'CCC444', 199, 2, '2025-02-02', '2025-02-02', 'basic-tee-black'),
('Graphic Tee', 'T-shirt med tryck.', 'https://placehold.co/500x600', 'Zara', 'AAA555', 249, 2, '2025-02-03', '2025-02-03', 'graphic-tee'),
('Oversized Tee', 'Modern oversized passform.', 'https://placehold.co/500x600', 'COS', 'BBB555', 299, 2, '2025-02-04', '2025-02-04', 'oversized-tee'),
('Sport Tee', 'Fukttransporterande t-shirt.', 'https://placehold.co/500x600', 'Nike', 'CCC555', 349, 2, '2025-02-05', '2025-02-05', 'sport-tee'),
('Striped Tee', 'Randig t-shirt i mjuk bomull.', 'https://placehold.co/500x600', 'H&M', 'AAA666', 229, 2, '2025-02-06', '2025-02-06', 'striped-tee'),
('Long Sleeve Tee', 'Långärmad t-shirt.', 'https://placehold.co/500x600', 'Levi’s', 'BBB666', 279, 2, '2025-02-07', '2025-02-07', 'long-sleeve-tee'),
('V-neck Tee', 'T-shirt med v-ringning.', 'https://placehold.co/500x600', 'GAP', 'CCC666', 219, 2, '2025-02-08', '2025-02-08', 'v-neck-tee'),
('Pocket Tee', 'T-shirt med bröstficka.', 'https://placehold.co/500x600', 'Weekday', 'AAA777', 239, 2, '2025-02-09', '2025-02-09', 'pocket-tee'),
('Premium Tee', 'Lyxig t-shirt i organisk bomull.', 'https://placehold.co/500x600', 'Arket', 'BBB777', 399, 2, '2025-02-10', '2025-02-10', 'premium-tee'),
('Leather Belt', 'Skärp i äkta läder.', 'https://placehold.co/500x600', 'Levi’s', 'CCC777', 299, 3, '2025-03-01', '2025-03-01', 'leather-belt'),
('Wool Scarf', 'Varm halsduk i ull.', 'https://placehold.co/500x600', 'COS', 'AAA888', 399, 3, '2025-03-02', '2025-03-02', 'wool-scarf'),
('Baseball Cap', 'Keps i bomull.', 'https://placehold.co/500x600', 'New Era', 'BBB888', 199, 3, '2025-03-03', '2025-03-03', 'baseball-cap'),
('Beanie', 'Stickad mössa.', 'https://placehold.co/500x600', 'Carhartt', 'CCC888', 249, 3, '2025-03-04', '2025-03-04', 'beanie'),
('Sunglasses', 'Solglasögon med UV-skydd.', 'https://placehold.co/500x600', 'Ray-Ban', 'AAA999', 1299, 3, '2025-03-05', '2025-03-05', 'sunglasses'),
('Watch Classic', 'Klassisk klocka i stål.', 'https://placehold.co/500x600', 'Seiko', 'BBB999', 1499, 3, '2025-03-06', '2025-03-06', 'watch-classic'),
('Backpack', 'Ryggsäck med flera fack.', 'https://placehold.co/500x600', 'Fjällräven', 'CCC999', 1099, 3, '2025-03-07', '2025-03-07', 'backpack'),
('Wallet', 'Plånbok i läder.', 'https://placehold.co/500x600', 'Hugo Boss', 'AAA100', 499, 3, '2025-03-08', '2025-03-08', 'wallet'),
('Tie', 'Elegant slips i siden.', 'https://placehold.co/500x600', 'Tiger of Sweden', 'BBB100', 599, 3, '2025-03-09', '2025-03-09', 'tie'),
('Gloves', 'Vinterhandskar i skinn.', 'https://placehold.co/500x600', 'Hestra', 'CCC100', 799, 3, '2025-03-10', '2025-03-10', 'gloves'),
('Jeans Slim', 'Slim fit jeans i denim.', 'https://placehold.co/500x600', 'Levi’s', 'AAA200', 899, 4, '2025-04-01', '2025-04-01', 'jeans-slim'),
('Jeans Regular', 'Regular fit jeans i denim.', 'https://placehold.co/500x600', 'Wrangler', 'BBB200', 799, 4, '2025-04-02', '2025-04-02', 'jeans-regular'),
('Chinos', 'Bekväma chinos för vardag.', 'https://placehold.co/500x600', 'Dockers', 'CCC200', 699, 4, '2025-04-03', '2025-04-03', 'chinos'),
('Cargo Pants', 'Byxor med fickor på sidorna.', 'https://placehold.co/500x600', 'G-Star', 'AAA300', 749, 4, '2025-04-04', '2025-04-04', 'cargo-pants'),
('Sweatpants', 'Mysiga mjukisbyxor.', 'https://placehold.co/500x600', 'Nike', 'BBB300', 599, 4, '2025-04-05', '2025-04-05', 'sweatpants'),
('Suit Pants', 'Eleganta kostymbyxor.', 'https://placehold.co/500x600', 'Hugo Boss', 'CCC300', 1199, 4, '2025-04-06', '2025-04-06', 'suit-pants'),
('Shorts Denim', 'Korta jeansshorts.', 'https://placehold.co/500x600', 'Zara', 'AAA400', 499, 4, '2025-04-07', '2025-04-07', 'shorts-denim'),
('Shorts Chinos', 'Bekväma chinosshorts.', 'https://placehold.co/500x600', 'H&M', 'BBB400', 399, 4, '2025-04-08', '2025-04-08', 'shorts-chinos'),
('Corduroy Pants', 'Manchesterbyxor.', 'https://placehold.co/500x600', 'Weekday', 'CCC400', 699, 4, '2025-04-09', '2025-04-09', 'corduroy-pants'),
('Track Pants', 'Sportiga träningsbyxor.', 'https://placehold.co/500x600', 'Adidas', 'AAA500', 649, 4, '2025-04-10', '2025-04-10', 'track-pants');


INSERT INTO Hero (title, content, image)
VALUES("Hero","Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum mollitia nemo, laboriosam 0accusantium soluta voluptatum odit, laudantium nam molestias et cupiditate praesentium. Tempora soluta id voluptatibus temporibus rerum unde a.", "https://placehold.co/500x600");


INSERT INTO Spots(id, heading, content,image)
VALUES
(1, "Lorem ipsum dolor" , "Lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor", "https://placehold.co/500x600"),
(2, "Lorem ipsum dolor" , "Lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor", "https://placehold.co/500x600"),
(3, "Lorem ipsum dolor" , "Lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor lormen ipsum dolor", "https://placehold.co/500x600");
