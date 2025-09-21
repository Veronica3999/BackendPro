require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require('express');
const AdminToken = require("./Admintoken");
const UserToken = require("./Usertoken");
const Database = require('better-sqlite3');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require("fs"); //till images


const port = 8000;

const db = new Database("./db/freakyfashion.db",{
  verbose: console.log,
});

//Middlewear for cors
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(bodyparser.json());

//app.use('/api', require('./routes/index'));
//gör så att vi kan nå våra uppladdade filer via /images/...
app.use('/images/categories', express.static(path.join(__dirname, 'public/images/categories')));
app.use('/images/products', express.static(path.join(__dirname, 'public/images/products')));


//Multer inställningar
const storageProducts = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'public/images/products') //mapp där filerna hamnar
  },
  filename: function (req, file, cb) {
    const uniqueImageName = Date.now() +"-"+ file.originalname;
    cb(null, uniqueImageName);
  }
});
  const productsfileFilter = (req,file,cb) =>{
    if(
      file.mimetype === "image/png" || 
      file.mimetype === "image/jpeg" || 
      file.mimetype === "image/webp" || 
      file.mimetype === "image/gif" || 
      file.mimetype === "image/svg+xml")
      {
        cb(null, true);
      }
      else{
        cb(new Error("Endast tillåtna filtyper"),false);
      }
    };
const productImageupload = multer({
  storage: storageProducts, 
  fileFilter: productsfileFilter,
  limits:{fileSize: 10 * 1024 * 1024},
});

///
  
const categorystorage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'public/images/categories') //mapp där filerna hamnar
  },
  filename: function (req, file, cb) {
    const uniqueImageName = Date.now() +"-"+ file.originalname;
    cb(null, uniqueImageName);
  }
});
  const categoryfileFilter = (req,file,cb) =>{
    if(
      file.mimetype === "image/png" || 
      file.mimetype === "image/jpeg" || 
      file.mimetype === "image/webp" || 
      file.mimetype === "image/gif" || 
      file.mimetype === "image/svg+xml")
      {
        cb(null, true);
      }
      else{
        cb(new Error("Endast tillåtna filtyper"),false);
      }
    };
const upload = multer({
  storage: categorystorage, 
  fileFilter: categoryfileFilter,
  limits:{fileSize: 10 * 1024 * 1024},
});

  function stopImage(file){
    if(file){
      const filePath = path.join(__dirname, "public/images/products", file.filename );
      fs.unlinkSync(filePath);
    }
  }
  function stopImageCategories(file){
    if(file){
      const filePath = path.join(__dirname, "public/images/categories", file.filename );
      fs.unlinkSync(filePath);
    }
  }

///////////////////////////////////////////////////////////
//spotsinfo
app.get('/api/spots', (req,res) =>{
  const spots=db.prepare(`
    SELECT * FROM Spots;
    `).all();
    res.json(spots);
});

//GET alla produkter som är nya
app.get('/api/products/latest/new', (req, res) =>{
   try{ 
      const getNewProducts = db.prepare(`
          SELECT 
            id,
            name,
            description,
            image,
            brand,
            sku,
            price,
            publishDate,
            categoryId,
            slug
          from Products
          WHERE date(publishDate) >= date('now', '-7 days')
          AND date(publishDate) <= date('now')
          ORDER BY publishDate DESC 
        `)
      const products = getNewProducts.all();
          if(products.length === 0){
            return res.status(404).json({error: "Inga nya produkter hittades"})
          }
        res.json(products);

    }
     catch(error){
        return res.status(500).json({error:"Fel i hämtningen"});
     }
});


//hämtar produkterna startsidan
app.get('/api/products', function(req, res){ 
  
  const select = db.prepare(`
    SELECT 
       id,
      name,
      description,
      image,
      brand,
      sku,
      price,
      categoryId,
      publishDate,
      created_at,
      slug
      FROM Products
      WHERE date(publishDate) <= date('now')
      ORDER BY random()
      LIMIT 8;
    `).all();
    res.json(select);

});

//hämtar alla produkter på admin sidan
app.get('/api/admin/products', AdminToken, function(req, res){ 
  
  const select = db.prepare(`
    SELECT 
       id,
      name,
      description,
      image,
      brand,
      sku,
      price,
      categoryId,
      publishDate,
      created_at,
      slug
      FROM Products
    `).all();
    res.json(select);

});



//lägger in ny produkt från admin
app.post('/api/products/new',AdminToken, productImageupload.single('image'), (req, res) =>{
 
  try{
    const { name, description, brand, sku, slug } = req.body;
    let {publishDate} = req.body;
      let {price = 0} = req.body;
        let {categoryid} = req.body;
        let parsedCategory = Number(categoryid);
          const productImage = req.file ? `http://localhost:8000/images/products/${req.file.filename}` : null;

      if(!name){
          stopImage(req.file);
          return res.status(400).json({error: "Namn på produkten saknas"});
      };
      if(name.length > 25){
        stopImage(req.file);
          return res.status(400).json({error: "Produktens namn får max vara 25 tecken"});
      }
      if(!sku){
        stopImage(req.file);
          return res.status(400).json({error: "Sku saknas eller ej korrekt format, följer formatet XXX111"});
      };
      if(!/^[A-Za-z]{3}[0-9]{3}$/.test(sku)){
        stopImage(req.file);
          return res.status(400).json({error: "Sku följer formatet XXX111"});
      };
      if(sku){
        const skuInDataBase = db.prepare(`
          SELECT * FROM Products 
          WHERE sku = ?
          `).get(sku);
          
          if(skuInDataBase){
            stopImage(req.file);
            return res.status(409).json({error: "Det SKU nummret finns redan. Försök igen."})
          }
      }
      if(!price){
        price = 0;
      }else{
        const parsed = Number(price);
          if(isNaN(parsed)){
            return res.status(400).json({error: "Priset får bara bestå av siffror"});
          }
        price = parsed;
      }
      if(isNaN(parsedCategory) || parsedCategory == 0){
        stopImage(req.file);
          return res.status(400).json({error: "Välj en kategori"});

      }
      if(!publishDate){
        stopImage(req.file);
            //.split("T") berättar var delningen ska ske och 
            //skickar tillbaka en array där man väljer vilken
            //del man vill ha. 2000-01-01 T 21:00:00
          publishDate = new Date().toISOString().split("T")[0];
      };
      
      let created_at= new Date().toISOString().split("T")[0];

      const insertProduct= db.prepare(`

          INSERT INTO Products(
            name,
            description,
            image,
            brand,
            sku,
            price,
            publishDate,
            created_at,
            categoryId,
            slug
          )
          VALUES(
          LOWER(?), ?, ?, LOWER(?), ?, ?, ?, ?, ?, ?
          )
        `);

        insertProduct.run(
            name,
            description,
            productImage,
            brand,
            sku,
            price,
            publishDate,
            created_at,
            parsedCategory,
            slug
          );
      res.status(201).json({message: "Produkten skapad"})
  }
  catch(error){
      console.error("Fel i api/product/new", error);
        stopImage(req.file);
          res.status(500).json({error: "Något gick fel i servern"});
  }});

  //hämtar sökresultat

app.get('/api/products/search', (req, res) => {
  try{
    const{q} = req.query;
      if(!q){
        return res.status(400),json({error: "Inget sökord skickasdes"});
      }
      if(q.toLowerCase() === "nyheter"){
        const latestProducts =db.prepare(`
            SELECT 
                id,
                name,
                description,
                image,
                brand,
                sku,
                price,
                publishDate,
                created_at,
                categoryId,
                slug
            FROM Products
            WHERE date(publishDate) >= date('now', '-7 days')
            AND date(publishDate) <= date('now')
            ORDER BY publishDate DESC
        `).all();
        return res.json(latestProducts);
      }

      const searchProducts = db.prepare(`
        SELECT 
            Products.id,
            Products.name,
            Products.description,
            Products.image,
            Products.brand,
            Products.sku,
            Products.price,
            Products.publishDate,
            Products.created_at,
            Products.categoryId,
            Products.slug,
            Categories.categoryName
        FROM Products
        INNER JOIN Categories ON Categories.categoryID = Products.categoryId
          WHERE LOWER(Products.name) LIKE LOWER(?)
          OR LOWER(Products.brand) LIKE LOWER(?)
          OR LOWER(Categories.categoryName) LIKE LOWER(?)
        
        `);
      const result = searchProducts.all(`%${q}%`, `%${q}%` , `%${q}%`);
        if(result.length === 0){
          return res.status(404).json({error: "Inga produkter hittades"});
        }
        
      res.json(result);  
      }
  catch(error){
      console.error("Fel i sökningen", error)
      res.status(500).json({error: "sökapi: serverfel"})
    }
  });





//////////////////////////////////////////////////////////

//----category middlwear










// lägger in kategorier från admin

app.post('/api/new/categories', AdminToken, upload.single('categoryImage'), (req,res)=>{
  try{
    const { categoryName }=req.body;
    const  categoryImage = req.file ? `http://localhost:8000/images/categories/${req.file.filename}` : null;

    if (!categoryName) {
      return res.status(400).json({ error: "Kategorinamn krävs" });
    }

    const category = categoryName.toLowerCase();

    //hämtar alla kategorier
    const checkNames= db.prepare(`
      SELECT * FROM Categories 
      WHERE LOWER(categoryName) = ?
      `).get(category);

      if(checkNames){
        stopImageCategories(req.file);
        return res.status(409).json({error: "Kategorin finns redan, försök igen."})
      }
      
      const insertCategory = db.prepare(`
        INSERT INTO Categories(
          categoryName,
          categoryImage
          )
          VALUES(?,?)
        `);
         
        
         insertCategory.run(category, categoryImage);
          res.status(201).json({
            message: "Kategorin är skapad"});
        }
        catch(error){
          console.error("Fel i api/new/categories", error);
          res.status(500).json({error: "Något gick fel i servern"});
          }
 
});

//hämtar alla kategorier på admin sidan och nav
app.get('/api/categories',(req,res)=>{
try{
  const categoryList= db.prepare(`
      
    SELECT categoryID, categoryName FROM Categories 
      `).all();
      
    res.json(categoryList);
  }
  catch(error){
    console.error("Navigering och kategorilistan: kategorierna kunde inte hämtas:", error)
    res.status(500).json({error: "Något gick fel på server sidan!"})
  }
});

//raderar kategorin
app.delete('/api/delete/categories/:id', AdminToken, (req,res)=>{
  try {
    const{id} = req.params;  

    const categoryToDelete=db.prepare(`
      DELETE FROM Categories WHERE categoryID = ?`).run(id);

      if(categoryToDelete.changes === 0){
        return res.status(404).json({error: "kategorin hittades inte"});
      }
      res.json({message: "Kategorin raderad"})
  } catch (error) {
    res.status(500).json({error:"servern svarar inte"});
  }
});


//hämtar produkterna på detaljsidan
app.get('/api/products/:slug', function(req, res){ 
    try{
      const {slug} = req.params;

      const select = db.prepare(`
          SELECT 
            id,
            name,
            description,
            image,
            brand,
            sku,
            price,
            categoryId,
            publishDate,
            created_at,
            slug

            FROM Products
            WHERE slug = ?
          `)
          const product = select.get(slug);
          
          if(!product){
            return res.status(404).json({error: "Produkten hittades inte tyvärr"})
          }

          const similarproducts = db.prepare(`
              SELECT 
            id,
            name,
            description,
            image,
            brand,
            sku,
            price,
            categoryId,
            publishDate,
            created_at,
            slug

            FROM Products
            WHERE categoryId = ? AND id !=?
            ORDER BY random()
            LIMIT 6 
            `);
            const similar = similarproducts.all(product.categoryId, product.id);

          res.json({
              product,
              similars: similar,
              });


        }catch(error){
console.error("fel i hämtning")
          res.status(500).json({error: "serverfel och den kommer snart att elimineras"})
        }
});
  
  
//Raderar produkter på admin sidan

app.delete('/api/products/delete/:id', AdminToken, (req,res) =>{
  try{
    const {id} = req.params;
    const proid = parseInt(id);  
      

      const productToDelete = db.prepare(`
        DELETE FROM Products WHERE id = ?
        `).run(proid);

          if(productToDelete.changes === 0){
            return res.status(404).json({error: "Produkten fanns inte"});
          }
        res.json({message:"Produkt raderad"});
        }
        catch(error){
            res.status(500).json({error: "Något fel på server sidan"})
        }
});

//hämtar hero infon
app.get('/api/hero',(req,res)=>{
  const heroInfo =db.prepare(`
    SELECT * FROM Hero 
    `).all();
    res.json(heroInfo);
  
});





//lägger in köpta produkter och använaren

app.post('/api/checkout', (req, res) =>{
  try{
  let {firstName, lastName, email, street, zip,city, newsLetter} = req.body;
  firstName=firstName?.trim();
  lastName=lastName?.trim();
  street=street?.trim();
  zip=zip?.trim();
  city=city?.trim();
  const {cart} = req.body;
  console.log("Detta kom in från checkout", cart);
    if(!firstName){
      return res.status(400).json({error: "Förnamn saknas"});
    };
    if(!lastName){
      return res.status(400).json({error: "Efternamn saknas"});
    };
    if(!street){
      return res.status(400).json({error: "Gatunamn saknas"});
    };
    const Zip=Number(zip);
    if(!Zip || isNaN(Zip)){
        return res.status(400).json({error: "postnummer får bara bestå av siffror"});
      };
    if(!city){
      return res.status(400).json({error: "stad saknas"});
    };

  const newsLetterValue = newsLetter ? 1 : 0;
  //kollar om användaren finns redan i db
    let user = db.prepare(`
      SELECT * FROM Users
      WHERE email = ?
    `).get(email);

      let userID;
        if(user){
          userID = user.id;
    
          const upDateUser=db.prepare(`
              UPDATE Users
              SET 
              firstName = LOWER(?),
              lastName = LOWER(?),
              street = LOWER(?),
              Zip = ?,
              city = LOWER(?),
              NewsLetter = ?
              WHERE id = ?
            `)
            upDateUser.run(firstName, lastName, street, Zip, city, newsLetterValue, userID);
        }
        else{
          const insertUser = db.prepare(`
              INSERT INTO Users(
                firstName,
                lastName,
                email,
                street,
                zip,
                city,
                NewsLetter,
                created_at,
                password
              )
            VALUES(LOWER(?),LOWER(?),?,LOWER(?),?,LOWER(?),?,CURRENT_TIMESTAMP,?)
    `);
     const userResult = insertUser.run(firstName, lastName, email, street, zip, city, newsLetterValue, "");
      userID = userResult.lastInsertRowid

}

  
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
     const insertOrder = db.prepare(`
      INSERT INTO Orders(
        userID, 
        created_at,   
        totalPrice
        )
        VALUES(?, CURRENT_TIMESTAMP, ?)
      `);
      const orderResult = insertOrder.run(userID, totalPrice);
      
      const orderID = orderResult.lastInsertRowid;
      
     const insertCartItems = db.prepare(`
      INSERT INTO OrderItems(
        productID,
        name,
        price,
        quantity,
        orderID
        )
        VALUES(?,?,?,?,?)
      `)
      cart.forEach(item => {
        insertCartItems.run(item.id, item.name, item.price, item.qty, orderID)  
      });
      
  res.json({message: "Ordern mottagen"});
  }
  catch(error){
    console.error(error);
    res.status(500).json({error:"Något gick fel i checkout"})
  }
});

//lägger in registreringen

app.post('/api/registrer', (req, res) => {
  const {email, password}= req.body;
  console.log("Detta kom in från front:",email,password);
    const userAlreadyInDB = db.prepare(`
      SELECT * FROM Users
      WHERE email = ?
      `).get(email);
      
      if(userAlreadyInDB){
        return res.status(400).json({error: "Användaren finns redan"})
      }

    const registrer=db.prepare(`
      INSERT INTO Users(
          email,
          password
        )
        VALUES(?,?)
      `);
      registrer.run(email, password);
    res.json({message: "Tack för din registrering"})
});




//kollar om man är inloggad
app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  
  const user = db.prepare(`
    SELECT * FROM Users
    WHERE email = ?
    `).get(email);

    if(!user){
      return res.status(401).json({error: "Du är inte registrerad. Registrera dig här ."})
    }
    if(user.password !==password){
      return res.status(401).json({error:"Fel E-post eller Password"});
    }

    //Skapa payload med id och role
    const payload ={id: user.id, role: user.role};
     
    //signera token
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: "1h"});

  res.json({message: "Inloggad", token});
});



app.get("/api/favorites", UserToken, (req, res) =>{
  try{
    const favorites = db.prepare(`
      SELECT Products.* FROM FAVORITES
      INNER JOIN Products ON Favorites.productID = Product.id
      WHERE Favorites.userID = ?
      `).all(req.user.id);
      res.json(favorites);
  } catch(error){
    console.error({error:"Det gick inte att hämta några favoriter", error});
    res.status(500).json({error: "Serverfel"});
  }
});

//En inloggad användare som trycker på hjärtan, lägger till i db live
app.post("/api/favorites/", UserToken, (req, res)=>{
  const { productID } = req.body;
  try{
    const insertFav = db.prepare(`
      INSERT OR IGNORE INTO Favorites( userID, productID)
      VALUES(?,?)
      `);
      insertFav.run(req.user.id, productID);
      res.json({message:"Favoriten sparad"});
  }
  catch(error){
    console.error("Fel när favoriten skulle sparas",error)
    res.status(500),json({error:"Serverfel"})
  }
});

//en inloggad användare som tar bort ett hjärta,tar bort från db live
app.delete("/api/favorites/:productId", UserToken,(req,res)=>{
  const { productId } = req.params;
  try {
    const deleteFav = db.prepare(`
      DELETE FROM Favorites
      WHERE userID = ? AND productID =?
      `);
      deleteFav.run(req.user.id, productId);
  
  } catch (error) {
    console.error("Fel vid radering", error);
    res.status(500).json({error: "Serverfel"});
  }
});

//en EJ inloggad som sen LOGGAR IN, synkar de sparade favoritern som ligger tillfälligt i sessionstorage
app.post("/api/favorites/sync", UserToken,(req, res) =>{
  const { favorites } = req.body;
    const userID = req.user.id;
    try{
      favorites.forEach((fav) =>{
        const syncFav = db.prepare(`
          INSERT OR IGNORE INTO Favorites (userID, productID)
          VALUES (?,?)
          `)
          syncFav.run(userID, fav.id);
      });
      res.json({message: "Favoriter synkade"})
    }catch(error){
      console.error("Fel vid synk", error);
      res.status(500).json({error: "Serverfel"})
    }

});

//GET producter baserat på kategori namn
app.get('/api/products/category/:categoryName', (req, res) => {
  try{
    const  {categoryName} =req.params;
console.log("Route param:",categoryName);

    const getCategoryName=db.prepare(`
          SELECT 
              Products.id,
              Products.name,
              Products.description,
              Products.image,
              Products.brand,
              Products.sku,
              Products.price,
              Products.publishDate,
              Products.slug,
              Categories.categoryID,
              Categories.categoryName
          FROM Products
          INNER JOIN Categories ON Categories.categoryID = Products.categoryId
          WHERE LOWER(Categories.categoryName) = LOWER (?)
          AND date(Products.publishDate) <=('now')
      `);
    const products = getCategoryName.all(categoryName);
    console.log("SQL result:",products);

       if (products.length === 0) {
          return res.status(404).json({ error: "Inga produkter hittades i DB" });
        }   
      res.json(products);
      
  }  
  catch(error){
    return res.status(404).json({error:"Fel i hämtningen"});
  }
});

app.listen(port, ()=>{
console.log(`API started on port: ${port}`)
});