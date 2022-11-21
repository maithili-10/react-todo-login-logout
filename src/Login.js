import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import axios from 'axios';
import {Route,useNavigate} from 'react-router-dom';


function Login() {
  const nav= useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPwd]=useState('');

  const handleEmail=(e)=>{
  setEmail(e.target.value);
  }
  const handlePwd=(e)=>{
   setPwd(e.target.value);
  }
  const handleApi=()=>{
    console.log(email,password);
    axios.post('https://reqres.in/api/users',{
      email:email,
      password:password
    }).then(result=>{
      console.log(result.data.id)

    localStorage.setItem("token",result.data.id);
    nav("/home");
 
     
    })
    .catch(error=>{
      alert("service error");
      console.log("no data");
    })
  }

  return (
    <div className="App">
     Email:<input value={email} onChange={handleEmail} type="text" required></input><br/>
     password:<input value={password} onChange={handlePwd} type="text" required></input><br/>
     <button onClick={handleApi}>Login</button>
    </div>
  );
}

export default Login;