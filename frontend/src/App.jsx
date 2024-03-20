import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPass from './components/ForgotPass';
import { useSelector } from 'react-redux';
import ResetPassword from './components/ResetPassword';


function App() {
    const token = useSelector(state => state.userLoggedIn);

    return (
        <Routes>
            {token && <Route path="/" element={<Home />} />}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        </Routes>
    );
}

export default App;


// // import React from 'react'
// import { Route, Routes, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import ForgotPass from "./components/ForgotPass";
// // import { UserContextProvider } from './context/userContext'
// // import { useState } from "react";

// // import LoginRegister from './components/Register'


// function App() {
//   const token = localStorage.getItem("accessToken");

//   // const [user, setUserData] = useState({})
//   // const [loginStatus, setLoginStatus] = useState(false)

//   // const setUser = (data) => {
//   //   setUserData(data);
//   // }
//   // const updateLoginStatus = () => {
//   //   setLoginStatus((prev) => !prev)
//   // }
//   return (
//     // <div>
//     //   <h1>App</h1>
//     //   <div>
//     //   <LoginRegister />
//     //   </div>
//     // </div>
//     // <UserContextProvider value={{user, loginStatus, setUser, updateLoginStatus}}>
//       <Routes>
//         {token && <Route path="/" exact element={<Home />} />}
//         <Route path="/register" exact element={<Register />} />
//         <Route path="/login" exact element={<Login />} />
//         <Route path="/" element={<Navigate replace to="/login" />} />
//         <Route path="/forgot-password" exact element={<ForgotPass />} />
//       </Routes>
//     // </UserContextProvider>
//   )
// }

// export default App