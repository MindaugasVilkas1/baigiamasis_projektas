import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// componentai
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Ask from './pages/ask';
import Nav from './components/nav';
import Footer from './components/footer';
import NotFound from './pages/notFound'

function App() {
  const [questions, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    // get all questions
    questionGet()
    // get all answers
    answerGet()
    // get users
    userGet()
    // get token
    const token = localStorage.getItem("Token")
    if (token) setLoggedIn(true)
  }, [])
  // get questions 
  const questionGet = () => {
    fetch('http://localhost:5000/questions')
      .then(res => res.json())
      .then(data => setQuestion(data));
  }
  // get answers
  const answerGet = () => {
    fetch('http://localhost:5000/answers')
      .then(res => res.json())
      .then(data => setAnswer(data));
  }
  //getUsers
  const userGet = () => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setAllUsers(data));
  }
  //logout
  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false)
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
            allUsers={allUsers}
            loggedIn={loggedIn}
            user={user}
            answerGet={answerGet}
            questionGet={questionGet}
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
          loggedIn={loggedIn}
          user={user}
          questions={questions}
          questionGet={questionGet}
        />} />
        <Route path="/*" element={
          <NotFound />
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
