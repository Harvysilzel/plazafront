import "../styles/menu.css";

import logo2 from '../recursos/logoN.jpg';
import { useEffect, useState } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { serverApi } from "../variablesGlobales";

interface Usuario {
  name: string;
  email: string;
}

function MenuSuperior() {
  const [mostrarRegion, setMostrarRegion] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const nav = document.querySelector("#nave");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrarMenu");

    const handleAbrir = () => nav?.classList.add("visible");
    const handleCerrar = () => nav?.classList.remove("visible");

    abrir?.addEventListener("click", handleAbrir);
    cerrar?.addEventListener("click", handleCerrar);

    return () => {
      abrir?.removeEventListener("click", handleAbrir);
      cerrar?.removeEventListener("click", handleCerrar);
    };
  }, []);

const handleLogin = async () => {
  try {
    const response = await axios.post(`${serverApi}/users/login`, {
      email,
      password,
    });

      const { user } = response.data;
      setUsuario(user);
      setMostrarLogin(false);
      setError(null);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <header className="cabesera">
        <div className="barra-superior">
          <div className="barra-izquierda">
            <input type="text" placeholder="Buscar..." className="input-busqueda" />
            <button className="icono"><FaSearch /></button>
          </div>
          <div className="barra-derecha">
            <button className="icono"><FaHeart /></button>

            <div className="icono-contenedor">
              <button className="icono" onClick={() => setMostrarRegion(!mostrarRegion)}>
                <FaMapMarkerAlt />
              </button>
              {mostrarRegion && (
                <div className="submenu desplegable">
                  <button onClick={() => setMostrarRegion(false)} style={{ float: 'right' }}>✖️</button>
                  <p>Selecciona tu municipio:</p>
                  <select>
                    <option>Nueva Guinea</option>
                    <option>Bluefields</option>
                    <option>Juigalpa</option>
                    <option>Managua</option>
                  </select>
                </div>
              )}
            </div>

            <button className="icono"><FaShoppingCart /></button>

            <div className="icono-contenedor">
              <button className="icono" onClick={() => setMostrarLogin(!mostrarLogin)}>
                <FaUser />
              </button>
              {mostrarLogin && (
                <div className="submenu login">
                  <button onClick={() => setMostrarLogin(false)} style={{ float: 'right' }}>✖️</button>
                  <p>Iniciar Sesión</p>
                  <input type="text" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                  <button className="boton-login" onClick={handleLogin}>Entrar</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <a href="#">¿Olvidaste tu contraseña?</a>
                  <a href="#">Registrarse</a>
                </div>
              )}
              {usuario && <span className="nombre-usuario">👤 {usuario.name}</span>}
            </div>
          </div>
        </div>

                <div className="portadas">
          <section className="logo">
            <p><a href="/"><img className="logoEmp" src={logo2} alt="logo empresa" /></a></p>
          </section>
          <section className="menuPrincipal">
            <div className="headermenu cajon">
              <button className="abrir-menu" id="abrir">🏠</button>
              <nav className="nav" id="nave">
                <ul className="nav-list">
                  <button className="cerrar" id="cerrarMenu">❌</button>
                  <li className="botton-list"><a href="/">Inicio</a></li>
                  <li className="botton-list"><a href="/tendencias">Tendencias</a></li>
                  <li className="botton-list"><a href="/Promociones">Promociones</a></li>
                  <li className="botton-list"><a href="/about">Nosotros</a></li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      </header>
    </>
  );
}

export default MenuSuperior;
