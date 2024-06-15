// src/App.tsx

import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import MenuSuperior from './components/menu';
import Colapag from './components/colapagina';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MenuSuperior/>
      </header>
      <main>
        <AppRouter />
      </main>
<Colapag/>
    </div>
  );
};

export default App;
