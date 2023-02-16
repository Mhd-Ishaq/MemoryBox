import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;
  return (
    <>
      <div className=" d-flex justify-content-center row row-cols-1 row-cols-md-2 note g-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">{note.title}</h5>
                <div>
                  <i
                    className="far fa-edit mx-2"
                    onClick={() => {
                      updateNote(note);
                    }}
                  ></i>
                  <i
                    className="far fa-trash-alt mx-2"
                    onClick={() => {
                      deleteNote(note._id);
                      showAlert("Deleted  successfully", "success");
                    }}
                  ></i>
                </div>
              </div>
              <p className="card-text">{note.description}</p>
              <p className="card-text">
                <small className="text-muted cool">{note.tag}</small>
              </p>
            </div>
            <img src={note.image} className="card-img-bottom img" alt="post-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
