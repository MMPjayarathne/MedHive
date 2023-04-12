import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx"

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<SignIn/>}/>
      </Routes>
      </Router>
  );
}

export default App;
