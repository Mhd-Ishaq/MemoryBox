import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const[user,setUser]= useState({name:'',email:'',password:''});
  const navigate = useNavigate();


  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/createUser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:user.name,email:user.email,password:user.password})
    });
    const son =await response.json();
    console.log(son);

    if(son.success){
      localStorage.setItem("token", son.authToken);
      props.showAlert("Account Created Successfully",'success');
      navigate('/home');
    }else{
      props.showAlert("User with this email is already exists ",'danger');
    }



  }
  return (
    <div className="container my-5">
      <form onSubmit={submitHandler}>
        <h2>Create a New Account</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name="name"
          value={user.name}
          onChange={changeHandler}
          minLength ="5"
          required/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={changeHandler}
            minLength ="5"
            required/>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            minLength ="5"
            required/>
        </div>

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
