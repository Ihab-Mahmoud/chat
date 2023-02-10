import './App.css';
import { Register } from './pages/register'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { Error } from './pages/Error'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from "./context/authcontext"

function App()
{
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            
            currentUser ? <Home /> : <Login />
            } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
