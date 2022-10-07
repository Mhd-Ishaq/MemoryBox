const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/iNoteBook")
.then(()=>console.log("connected Successfully"))
.catch((e)=>console.log(e));