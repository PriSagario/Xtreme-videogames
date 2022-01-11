import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import About from "./pages/About"
import Games from "./pages/Games"

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/games" element={<Games />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
