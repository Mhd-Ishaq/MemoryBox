const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  title:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true,
  },
  image:{
    type:String,
    
  },
  tag:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

const Note = mongoose.model('Note',noteSchema);
module.exports = Note;