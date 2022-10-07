import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = ({children}) => {
  const host = "http://localhost:5000";
  const [notes,setNotes] = useState([]);

  const getNotes = async ()=>{
    const response =await fetch(`${host}/fetchAllNotes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token') 
        }
    });

    const result = await response.json();
    setNotes(result);
  }

  const addNote =async (title,description,tag)=>{
    const response = await fetch(`${host}/addNote`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token') 
        },
      body:JSON.stringify({title,description,tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note));

  }
  
  const deleteNote =async (id)=>{
    const response = await fetch(`${host}/deleteNote/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token') 
        },
    });

    const result = await response.json();
    console.log(result);

    const newNotes = notes.filter((note)=>{
      return note._id !== id
    });

    setNotes(newNotes);

    

  }

  const editNote =async (id,title,description,tag)=>{
    const response = await fetch(`${host}/updateNote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":localStorage.getItem('token')
        },
      body:JSON.stringify({title,description,tag})
    });

    const result = await response.json();
    console.log(result);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote}}>
      {children}
    </NoteContext.Provider>

  )
}

export default NoteState;