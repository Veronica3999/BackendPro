
const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const bodyparser = require('body-parser');
//const cors = require('cors');
//var cookieParser = require('cookie-parser');




const port = 8000;

const db = new Database("./db/freakyfashion.db",{
  verbose: console.log,
});

//Middlewear for cors
//app.use(cors({
//    origin: "http://localhost:3000",
//}));

app.use(bodyparser.json());

//app.use('/api', require('./routes/index'));

app.get('/', function(req, res){ res.send('API är igång')});

app.listen(port, ()=>{
console.log(`API started on port: ${port}`)
});


