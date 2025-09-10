
const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


//var cookieParser = require('cookie-parser');

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
//gör så att vi kan nå våra uppladdade filer via /images
app.use('/images', express.static(path.join(__dirname, 'public/images/categories')));


//Multer inställningar
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'public/images/categories') //mapp där filerna hamnar
  },
  filename: function (req, file, cb) {
    const uniqueImageName = Date.now() +"-"+ file.originalname;
    cb(null, uniqueImageName);
  }
});
  const fileFilter = (req,file,cb) =>{
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
  storage, 
  fileFilter,
  limits:{fileSize: 5 * 1024 * 1024},
});
  




///////////////////////////////////////////////////////////

//hämtar produkterna
app.get('/api/products', function(req, res){ 
  
  const select = db.prepare(`
    SELECT 
       id,
      productName,
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
    console.log(select);
});

app.delete('/api/products/delete/:id', function(req,res){
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

app.post('/api/products/new', upload.single('image'), function(req, res){
  try{
    const { productName, description, brand, sku, slug } = req.body;
    let {publishDate} = req.body;
      let {price = 0} = req.body;
        let {categoryid} = req.body;
        let parsedCategory = Number(categoryid);
          const productImage = req.file ? `image/${req.file.filename}` : null;

      if(!productName){
          return res.status(400).json({error: "Namn på produkten saknas"});
      };
      if(productName.length > 25){
          return res.status(400).json({error: "Produktens namn får max vara 25 tecken"});
      }
      if(!sku){
          return res.status(400).json({error: "Sku saknas eller ej korrekt format, följer formatet XXX111"});
      };
      if(!/^[A-Za-z]{3}[0-9]{3}$/.test(sku)){
          return res.status(400).json({error: "Sku följer formatet XXX111"});
      };
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
          return res.status(400).json({error: "Välj en kategori"});

      }
      if(!publishDate){
            //.split("T") berättar var delningen ska ske och 
            //skickar tillbaka en array där man väljer vilken
            //del man vill ha. 2000-01-01 T 21:00:00
          publishDate = new Date().toISOString().split("T")[0];
      };
      
      let created_at= new Date().toISOString().split("T")[0];

      const insertProduct= db.prepare(`

          INSERT INTO Products(
            productName,
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
            productName,
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
          res.status(500).json({error: "Något gick fel i servern"});
      }
});







//////////////////////////////////////////////////////////////

//category middlwear

app.post('/api/new/categories', upload.single('categoryImage'), (req,res)=>{
  try{
    const { categoryName }=req.body;
    const  categoryImage = req.file ? `/images/${req.file.filename}` : null;

    if (!categoryName) {
      return res.status(400).json({ error: "Kategorinamn krävs" });
    }

    const category = categoryName.toLowerCase();

    //hämtar alla kategorier, återanvända på lista kategorier
    const checkNames= db.prepare(`
      SELECT * FROM Categories 
      WHERE LOWER(categoryName) = ?
      `).get(category);

      if(checkNames){
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

app.get('/api/categories',(req,res)=>{
try{
  const categoryList= db.prepare(`
      
    SELECT * FROM Categories 
      `).all();
      
    res.json(categoryList);
  }
  catch(error){
    res.status(500).json({error: "Något gick fel på server sidan!"})
  }
});

app.delete('/api/delete/categories/:id',(req,res)=>{
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
  

app.listen(port, ()=>{
console.log(`API started on port: ${port}`)
});