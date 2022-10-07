const express = require('express');
const router = express.Router();
const Note = require('../models/Note')
const{body,validationResult} = require('express-validator');
const fetchUser = require('../middleware/fetchUser');


router.get('/fetchAllNotes',fetchUser, async(req,res)=>{

  try {
    const notes = await Note.find({user:req.user.id});
    res.json(notes);
    
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
  

});



router.post('/addNote',fetchUser,[
  body('title','Enter the valid title').isLength({min:3}),
  body('description',' Description must be atLeast of 5 Characters').isLength({min:5}),
], async(req,res)=>{

  try {
    const{title,description,tag}= req.body; 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    const note = new Note({
      title,description,tag,user:req.user.id
    });
    const savedNote =  await note.save();
    res.json(savedNote);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
  

})
router.put('/updateNote/:id',fetchUser, async(req,res)=>{
  const{title,description,tag}= req.body; 

  try {

    const newNote = {};
    if(title){
      newNote.title = title;
    }
    if(description){
      newNote.description = description;
    }
    if(tag){
      newNote.tag = tag;
    }

    // find the note to ne updated 

    let note = await Note.findById(req.params.id);
    console.log(note);
    if(!note){
      return res.status(404).send('not found');
    }

    if(note.user.toString() !== req.user.id){
      return res.status(401).send('Not allowed');
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set :newNote},{new:true});
    res.json({note});

  }catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error")
  }
  

})
router.delete('/deleteNote/:id',fetchUser, async(req,res)=>{
  const{title,description,tag}= req.body; 

  try {


    // find the note to delete

    let note = await Note.findById(req.params.id);
    console.log(note);
    if(!note){
      return res.status(404).send('not found');
    }

    if(note.user.toString() !== req.user.id){
      return res.status(401).send('Not allowed');
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success":"Note has been deleted",note:note});

  }catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error")
  }
  

})

module.exports = router;