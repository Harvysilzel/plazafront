import  { useState, useEffect } from "react";
import '../styles/cuerpo.css';
import { serverApi } from "../variablesGlobales";

export const ProductShow = ({ selectedCategory }: { selectedCategory: number | null }) => {
  const [products, setProducts] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    filename: string; // Asegúrate de incluir la propiedad filename en el tipo de producto
  }[]>([]);

  const fetchProducts = async (categoryId: number | null) => {
    try {
      const response = await fetch(
        categoryId
          ? `${serverApi}/products/categories/${categoryId}`
          : `${serverApi}/products`
      );

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
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="ProducEstilo">
      <ul className="stiloul">
        {products.map((product) => (
          <li className="stiloli" key={product.id}>
           {product.filename ? (
              <img
                className="ImgVacia"
                src={`../recursos/productos/${product.filename}`}
                alt="imagen"
                onError={(e) => {
                  console.error("Error al cargar la imagen:", e);
                }}
              />
            ) : (
              <img className="ImgVacia" src={`../recursos/productos/logoN.jpg`} alt="imagen vacía" />
            )}
            <h1 className="stilotitulo">{product.name}</h1>
            <div className="descripcionproducto lineacamp">
              <p>{product.description}</p>
            </div>
            <p className="preciostile">Precio: C${product.price}</p>
            <p>Stock: {product.stock} en existencia</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
