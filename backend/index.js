const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const path = require("path");
require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use(require('./Routes/userRoutes'));
app.use(require('./Routes/notesRoutes'))

app.get('/',(req,res)=>{
  res.send('hello world');
});

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


app.listen(port,()=>{
  console.log(`app is running at port:${port}`)
})


