import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Customers from "./Pages/Customers";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
