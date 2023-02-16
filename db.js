const mongoose = require('mongoose');
const db="mongodb+srv://ishaq:ishaq123@cluster0.mukxsxc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db,{
useNewUrlParser:true,
useUnifiedTopology:true})
.then(()=>console.log("connected to atlas Successfully"))
.catch((e)=>console.log(e));