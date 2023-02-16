const express = require('express');
const connect =require('./db');
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
dotenv.config();
const port = process.env.PORT || 5000;
const path = require("path");

const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use(require('./Routes/userRoutes'));
app.use(require('./Routes/notesRoutes'));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*",function(_, res){
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function(err){
      res.status(500).send(err);
    }
  )
});


app.listen(port, async()=>{
  try{
    await connect()
    console.log(`app is running at port:${port}`)
  }catch(e){
    console.log(e.message)
  }
})


