import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Ask from './pages/ask';
import Nav from './components/nav';
import Footer from './components/footer';

function App() {
  return (

    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={
          <Home />}
        />
        <Route path="/login" element={
          <Login />}
        />
        <Route path="/register" element={
          <Register />}
        />
        <Route path="/ask" element={<Ask

        />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
