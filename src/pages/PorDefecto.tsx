import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pordefecto.css';
import vacio from '../recursos/shopvoid.png';
import logo from '../recursos/logoN.jpg';
import errorSound from '../recursos/algoandamal.mp3'

const Defaults: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Reproducir el sonido al cargar el componente
    const audio = new Audio(errorSound);
    audio.play();

    // Usamos un temporizador para redirigir después de 8 segundos
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 5000); // 8000 milisegundos = 8 segundos

    // Limpia el temporizador al desmontar el componente
    return () => {
      audio.pause(); // Pausa el sonido si el componente se desmonta antes de redirigir
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className='pordefecto'>
      <div className='pagError'>
        <h1>Error 404 Algo anda mal...</h1>
        <img className='logoerror' src={vacio} alt="carrito vacío" />
      </div>
      <div className='pagError'>
        <img className='logoerror' src={logo} alt="logo página" />
        <h2>Estamos trabajando en esto. Esperamos que no tengas inconvenientes. Pronto lo resolveremos. Mientras tanto, te redireccionaremos a nuestra página de descuentos.</h2>
      </div>
    </div>
  );
};

export default Defaults;
