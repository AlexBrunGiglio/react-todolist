import React from 'react';
import './App.scss';
import LeftMenu from './components/LeftMenu';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <LeftMenu>
      <TodoPage></TodoPage>
    </LeftMenu>
  );
}

export default App;
