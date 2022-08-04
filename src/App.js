// import './App.css';
import React, {useEffect, useState} from  "react"
import { Routes, Route , useNavigate} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {userAccessToken,fetchUserInfo} from "../src/Utils/FetchUser"

function App() {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = userAccessToken();
    if(!accessToken) {
      navigate('login', {replace: true});
    }else {
      const [userInfo] = fetchUserInfo();
      setUser(userInfo)
    }

  },[])
  return (
    <Routes>
      <Route path="/*" element={<Home user={user} />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
