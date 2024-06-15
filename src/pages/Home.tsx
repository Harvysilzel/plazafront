// src/components/Home.tsx

import '../styles/cuerpo.css';
import React from 'react';
import CuerpoWeb from '../components/cuerpo';

const Home: React.FC = () => {
  return (
    <div className='inicio'>
      <CuerpoWeb/>
    </div>
  );
};

export default Home;
