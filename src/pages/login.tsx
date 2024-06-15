import logo from '../recursos/logoN.jpg'

import React from 'react';

const Logins: React.FC = () => {
    return (
        <div className='pordefecto'>
          <div className='pagError'><h1>iniciar Sesion</h1></div>
          <div className='pagError'>
            <img className='logoerror' src={logo} alt="logo pagina" />
            <h2>Somos el único sitio donde los Nicaragüenses Emprendedores pueden promocionar sus productos regístrate aquí encontrar los productos que tu deseas encontrar, Te lo Aseguro no te arepentiras</h2>
          </div>
        </div>
      );
};

export default Logins;
