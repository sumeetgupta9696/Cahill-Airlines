import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Purchase from "./Pages/Purchase";
import SearchFlight from "./Pages/SearchFlight";
import MyBooking from "./Pages/MyBooking";
import AdminHome from "./Pages/AdminHome";

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/purchase" element={<Purchase />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/searchflight" element={<SearchFlight />} />
      <Route exact path="/booking" element={<MyBooking />} />
      <Route exact path="/adminhome" element={<AdminHome />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
