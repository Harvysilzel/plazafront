import React, { useState, useEffect } from "react";
import '../styles/categorias.css';
import { serverApi } from "../variablesGlobales";

interface CateShowProps {
  onCategorySelect: (categoriaId: number, categoryName: string) => void;
}

export const CateShow: React.FC<CateShowProps> = ({ onCategorySelect }) => {
  const [menu, setMenu] = useState<{ id: number; categoria: string }[]>([]);
  const [, setSelectedCategory] = useState<number | null>(null);

  // Lógica para abrir/cerrar panel de categorías
  useEffect(() => {
    const nav2 = document.querySelector(".LatIzq");
    const abrirc = document.querySelector("#openC");
    const cerrarc = document.querySelector("#cerrarcat");

    const handleAbrir = () => nav2?.classList.add("visible");
    const handleCerrar = () => nav2?.classList.remove("visible");

    abrirc?.addEventListener("click", handleAbrir);
    cerrarc?.addEventListener("click", handleCerrar);

    return () => {
      abrirc?.removeEventListener("click", handleAbrir);
      cerrarc?.removeEventListener("click", handleCerrar);
    };
  }, []);

  useEffect(() => {
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

    fetchMenu();
  }, []);

  const handleCategoryClick = (categoria: { id: number; categoria: string }) => {
    setSelectedCategory(categoria.id);
    onCategorySelect(categoria.id, categoria.categoria);
  };

  return (
    <div>
      <ul className="navlistcate">
        <button className="cerrarcat" id="cerrarcat">❌</button>
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
