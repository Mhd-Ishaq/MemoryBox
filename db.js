const mongoose = require('mongoose');
const db= process.env.MONGO_URI

mongoose.connect(db,{
useNewUrlParser:true,
useUnifiedTopology:true})
.then(()=>console.log("connected to atlas Successfully"))
.catch((e)=>console.log(e));