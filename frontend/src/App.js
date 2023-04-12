import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx"
import Register from "./pages/Register.jsx"

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<Register/>}/>
      </Routes>
      </Router>
  );
}

export default App;
