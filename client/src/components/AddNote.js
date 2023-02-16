import React, { useContext, useState } from "react";
import FileBase64 from "react-file-base64";
import noteContext from "../context/Notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    image: "",
    tag: "",
  });

  const changeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    const { title, description, image, tag } = note;
    e.preventDefault();
    addNote(title, description, image, tag);
    setNote({ title: "", description: "", image: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  return (
    <div className="container my-3">
      <form onSubmit={submitHandler}>
        <h2>Create your Posts</h2>
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
          <label className="form-label">Image: </label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => {
              setNote({ ...note, image: base64 });
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Keywords
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={changeHandler}
            required
            minLength={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddNote;
