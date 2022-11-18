import React from 'react';
import './App.scss';
import LeftMenu from './components/LeftMenu';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <LeftMenu>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<TodoPage />} />
          <Route path='/todo/:id' element={<TodoPage />} />
        </Routes>
      </LeftMenu>
    </BrowserRouter>
  );
}

export default App;
