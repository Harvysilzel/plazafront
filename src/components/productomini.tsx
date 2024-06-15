import { useState, useEffect } from "react";
import '../styles/categorias.css';
import VaciaImg from '../recursos/vacio.jpg';
import { serverApi } from '../variablesGlobales';
import { serverFront } from '../variablesGlobales';

interface CateShowProps {
  onCategorySelect: (categoriaId: number) => void; // Cambiar el tipo del argumento a número
}

export const CateShowMini: React.FC<CateShowProps> = ({ }) => {
  const [menu, setMenu] = useState<{ id: number; name: string; price: number, filename: string }[]>([]);

  //const API_URL = "http://localhost"; // Cambiar a la URL de tu servidor NestJS
  //const ENDPOINT = "3000"; // Cambiar al puerto correcto de tu servidor NestJS

  const getMenu = async () => {
    try {
      const response = await fetch(`${serverApi}/products`);
      if (response.ok) {
        const data = await response.json();
        setMenu(data);
      } else {
        console.error("Error al obtener las categorías");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

    useEffect(() => {
    getMenu();
  }, []);

  

  return (
    <div>
      <ul>
        {menu.map((item) => (
          <li className="Btnminipro" key={item.id}>
            <div className="miniproduct">
                <div className="cajaimgmini">
                {item.filename ? (
                <img
                  className="Imgmini"
                  src={`${serverFront}/src/recursos/productos/${item.filename}`}
                  alt="imagen"
                  onError={(e) => {
                    console.error("Error al cargar la imagen:", e);
                  }}
                />
              ) : (
                <img className="Imgmini" src={VaciaImg} alt="imagen vacía" />
              )}
             </div>
                <div className="descripminiproduc">
           <h4>
            {item.name}
        </h4>
            <p>C$: {item.price}.00 </p>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CateShowMini;
