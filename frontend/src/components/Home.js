import React from "react";
import Notes from "./Notes";
// import { useContext } from 'react';
// import noteContext from './context/Notes/noteContext';

const Home = ({showAlert}) => {
  return (
    <div>
    <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
