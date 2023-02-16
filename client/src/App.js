import React,{useState} from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/Notes/NotesContext";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 3000);
}
  return (
    <>
    <NoteState>
    <Navbar />
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
      <Route path="/" element={<SignUp showAlert={showAlert}/>}/>
      <Route path="/home" element={<Home showAlert={showAlert} />}/>
      <Route path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route path="/signup" element={<SignUp showAlert={showAlert}/>}/>
      
      
      </Routes>
      </div>
      </NoteState>
    </>
  );
};

export default App;
