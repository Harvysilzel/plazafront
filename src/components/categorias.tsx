import React, { useState, useEffect } from "react";
import '../styles/categorias.css';
import { serverApi } from "../variablesGlobales";

interface CateShowProps {
  onCategorySelect: (categoriaId: number, categoryName: string) => void;
}

const nav2 = document.querySelector("#LatIzq");
const abrirc = document.querySelector("#abrir-categoria");
const cerrarc = document.querySelector("#cerrarcat");

abrirc?.addEventListener( "click", () =>{
    nav2?.classList.add("visible");
} )

cerrarc?.addEventListener("click", () =>{
    nav2?.classList.remove("visible");
})

export const CateShow: React.FC<CateShowProps> = ({ onCategorySelect }) => {
  const [menu, setMenu] = useState<{ id: number; categoria: string }[]>([]);
  const [, setSelectedCategory] = useState<number | null>(null);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${serverApi}/categories`);
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

  const handleCategoryClick = (categoria: { id: number; categoria: string }) => {
    setSelectedCategory(categoria.id);
    onCategorySelect(categoria.id, categoria.categoria);
  };
  
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div>
      <ul className="navlistcate">
      <button className="cerrarcat" id="cerrarcat">​❌</button>
        {menu.map((item) => (
          <li className="BtnCat" key={item.id}>
            <a href="#" onClick={() => handleCategoryClick(item)}>
              {item.categoria}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        <li className="BtnCat">
          <a href="/AllCategory">Todas Las Categorias</a>
        </li>
      </ul>
    </div>
  );
};

