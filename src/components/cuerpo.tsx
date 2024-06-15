import  { useState, useEffect } from "react";
import '../styles/cuerpo.css';
import { CateShow } from "./categorias";
import CateShowMini from "./productomini";
import Carousel from "./bannercarrusel";
import RandomProductShow from "./RandomProductShow";
import { serverApi } from "../variablesGlobales";

function CuerpoWeb() {
  const [, setSelectedCategory] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [products, setProducts] = useState<[]>([]);

  const handleCategorySelect = async (categoriaId: number, categoryName: string) => {
    setSelectedCategory(categoriaId);
    setCategoryName(categoryName);

    // Aquí debes cargar los productos correspondientes a la categoría seleccionada.
    try {
      const response = await fetch(`${serverApi}/products/categories/${categoriaId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error al obtener los productos por categoría");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    // Cargar productos aleatorios por defecto.
    async function loadRandomProducts() {
      try {
        const response = await fetch(`${serverApi}/products/random/12`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos aleatorios", response);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    }

    loadRandomProducts();
  }, []);

  return (
    <div className="cuerpo">
      <div className="LatIzq">
     
        <h2>Categorías</h2>
        <CateShow onCategorySelect={handleCategorySelect} />
      </div>
      <div className="Centro">
        <section className="tituloProd">
          <div className="uvicadobtn">
        <button className="abrir-categoria" id="openC">💬</button>
          <h2>{categoryName || "Sugerencias"}</h2>
          </div>
          <RandomProductShow products={products} />
        </section>
        <section className="caruselNvo">
          <Carousel interval={5000} />
        </section>
      </div>
      <div className="LatDer">
        <h3>Más popular</h3>
        <CateShowMini onCategorySelect={function (_categoriaId: number): void {
          throw new Error("Function not implemented.");
        }} />
      </div>
    </div>
  );
}

export default CuerpoWeb;
