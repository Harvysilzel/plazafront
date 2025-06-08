import "../styles/menu.css";
import BannerPrincipal from '../recursos/banner.png';
import logo2 from '../recursos/logoN.jpg';
import { useEffect } from 'react';

function MenuSuperior() {

  useEffect(() => {
    const nav = document.querySelector("#nave");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrarMenu");

    const handleAbrir = () => nav?.classList.add("visible");
    const handleCerrar = () => nav?.classList.remove("visible");

    abrir?.addEventListener("click", handleAbrir);
    cerrar?.addEventListener("click", handleCerrar);

    // Limpieza al desmontar
    return () => {
      abrir?.removeEventListener("click", handleAbrir);
      cerrar?.removeEventListener("click", handleCerrar);
    };
  }, []);

  return (
    <>
      <header className="cabesera">
        <div className="bannerlargo">
          <img className="BannerStilo" src={BannerPrincipal} alt="imagen vacia" />
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
