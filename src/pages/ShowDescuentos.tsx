
import React, { useEffect, useState } from 'react';

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number | string;
  descuento: boolean;
  desc: number | null;
  filename: string;
  categoria_id: number;
  proveedor_id: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const Promociones: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromociones = async () => {
      setLoading(true);
      try {
        // Traemos todos los productos y luego filtramos en frontend
        // Si tienes endpoint específico para productos con descuento, mejor usarlo
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data: Producto[] = await res.json();

        // Filtramos los que tienen descuento
        const conDescuento = data.filter(p => p.descuento === true);
        setProductos(conDescuento);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromociones();
  }, []);

  const mostrarMas = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (loading) return <p>Cargando promociones...</p>;
  if (productos.length === 0) return <p>No hay promociones disponibles.</p>;

  return (
    <>
      <h1 className="titulo-promociones">Promociones</h1>
      <div className="collage-promociones">
        {productos.slice(0, visibleCount).map((producto) => {
          const descuento = producto.desc || 0;
          const precioDescuento = Math.ceil(producto.price - (producto.price * descuento) / 100);

          return (
            <div key={producto.id} className="producto-promocion">
              <img
                src={`/recursos/productos/${producto.filename}`}
                alt={producto.name}
                className="img-producto"
              />
              <h3 title={producto.name}>{producto.name}</h3>
              <p className="descripcion">{producto.description}</p>
              <div className="precios">
                <span className="precio-descuento">C${precioDescuento}</span>
                <span className="precio-original">C${producto.price}</span>
                <span className="porcentaje-descuento">-{descuento}%</span>
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < productos.length && (
        <button onClick={mostrarMas} className="btn-mostrar-mas">Mostrar más</button>
      )}

      {/* Estilos CSS en JSX */}
      <style>{`
        .titulo-promociones {
          text-align: center;
          margin: 2rem 0;
          color: #1e4d2b; /* verde oscuro Guardabarranco */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .collage-promociones {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          padding: 0 1rem;
        }
        .producto-promocion {
          background: #d3f2d1; /* verde claro */
          border: 2px solid #1e4d2b;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(30, 77, 43, 0.3);
          width: 220px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s ease;
        }
        .producto-promocion:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 10px rgba(30, 77, 43, 0.5);
        }
        .img-producto {
          width: 180px;
          height: 180px;
          object-fit: contain;
          border-radius: 10px;
          margin-bottom: 0.7rem;
          background: #ebf6e8;
        }
        h3 {
          font-size: 1.1rem;
          color: #154923;
          margin: 0.3rem 0;
          text-align: center;
        }
        .descripcion {
          font-size: 0.85rem;
          color: #2e6b32;
          text-align: center;
          flex-grow: 1;
        }
        .precios {
          margin-top: 0.5rem;
          display: flex;
          gap: 0.6rem;
          align-items: baseline;
          font-weight: bold;
          color: #0b3d17;
        }
        .precio-descuento {
          color: #1e4d2b;
          font-size: 1.2rem;
        }
        .precio-original {
          text-decoration: line-through;
          color: #6fa46f;
          font-size: 0.9rem;
        }
        .porcentaje-descuento {
          background: #1e4d2b;
          color: white;
          border-radius: 6px;
          padding: 0 6px;
          font-size: 0.9rem;
        }
        .btn-mostrar-mas {
          display: block;
          margin: 2rem auto 3rem;
          background-color: #1e4d2b;
          color: #d3f2d1;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.8rem 2rem;
          border-radius: 25px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(30, 77, 43, 0.4);
          transition: background-color 0.3s ease;
        }
        .btn-mostrar-mas:hover {
          background-color: #154923;
          box-shadow: 0 6px 12px rgba(21, 73, 35, 0.7);
        }
      `}</style>
    </>
  );
};

export default Promociones;
