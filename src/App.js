import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import Footer from './components/footer';
import './App.css';
import { Register, Login, Add, Products, Update, Error } from './pages';
import Private from './components/private';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Routes>
          <Route path='*' element={<Error />} />
          {/* ... */}
          <Route element={<Private />}>
            <Route path='/' element={<Products />} />
            <Route path='/add' element={<Add />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/logout' element={<h1>Logout</h1>} />
          </Route>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* ... */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
