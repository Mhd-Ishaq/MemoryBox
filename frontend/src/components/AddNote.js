import React, { useContext, useState } from 'react';
import noteContext from '../context/Notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"",description:"",tag:""});


  const changeHandler = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  const submitHandler =(e)=>{
    const {title,description,tag}= note;
    e.preventDefault();
    addNote(title,description,tag);
    setNote({title:"",description:"",tag:""});
    props.showAlert("Note added successfully",'success');
  }

  return (
    <div className="container my-3" >
      <form  onSubmit={submitHandler}>
        <h2>Add Notes</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={changeHandler}
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="description"
            value={note.description}
            onChange={changeHandler}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Notes</button>
      </form>
    </div>
  )
}

export default AddNote