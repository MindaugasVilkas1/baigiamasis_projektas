import './App.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
// componentai
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Ask from './pages/ask';
import Nav from './components/nav';
import Footer from './components/footer';

function App() {
  const navigate = useNavigate();
  const [questions, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  console.log(loggedIn)
  useEffect(() => {
    // get all questions
    fetch('http://localhost:5000/questions')
      .then(res => res.json())
      .then(data => setQuestion(data));
    // get all answers
    fetch('http://localhost:5000/answers')
      .then(res => res.json())
      .then(data => setAnswer(data));
    // get token
    const token = localStorage.getItem("Token")
    if (token) setLoggedIn(true)
  }, [])

  //logout
  const logout = () => {
    localStorage.removeItem('Token');
    setLoggedIn(false)
    navigate('/login');

  }
  return (
    <div className="App">
      <Nav
        user={user}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Routes>
        <Route path="/" element={
          <Home
            questions={questions}
            answer={answer}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
          />}
        />
        <Route path="/login" element={
          <Login
            setLoggedIn={setLoggedIn}
            setUser={setUser}
          />}
        />
        <Route path="/register" element={
          <Register />}
        />
        <Route path="/ask" element={<Ask

        />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
