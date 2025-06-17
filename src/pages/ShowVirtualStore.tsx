import React, { useEffect, useState } from 'react';
import '../styles/virtualstore.css';

const VirtualStore: React.FC = () => {
  const [proveedor, setProveedor] = useState<any>(null);
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    // Datos simulados
    const mockProveedor = {
      nombreTienda: "Pulperia Papito Virtual",
      user: {
        name: "Marisol Ortiz Tercero",
        teléfonoUser: "8527-9670",
        direcciónUser: "frente al museo comunitario Nueva Guinea",
        email: "juan@ejemplo.com"
      }
    };

    const mockProductos = [
      {
        id: 1,
        name: "Camiseta Azul hombre",
        price: 500,
        desc: 10,
        stock: 20,
        description: "Camiseta de algodón 100% para caballeros de buena calidad y comodidad en el uso diario.",
        filename: "images.jfif",
        categoria: {
          categoria: "Ropa"
        }
      },
       {
        id: 1,
        name: "Camiseta negra hombre",
        price: 500,
        desc: 10,
        stock: 20,
        description: "Camiseta de algodón 100% para caballeros de buena calidad y comodidad en el uso diario.",
        filename: "images (1).jfif",
        categoria: {
          categoria: "Ropa"
        }
      },
       {
        id: 1,
        name: "Camiseta roja hombre",
        price: 500,
        desc: 10,
        stock: 20,
        description: "Camiseta de algodón 100% para caballeros de buena calidad y comodidad en el uso diario.",
        filename: "istockphoto-1354031012-612x612.jpg",
        categoria: {
          categoria: "Ropa"
        }
      },
      {
        id: 2,
        name: "Zapatos Deportivos Adidas",
        price: 1500,
        desc: 20,
        stock: 10,
        description: "Zapatos cómodos para correr",
        filename: "ADIH7830-6.jfif",
        categoria: {
          categoria: "Calzado"
        }
      },
      {
        id: 3,
        name: "Jeans Clásicos levis",
        price: 900,
        desc: 0,
        stock: 15,
        description: "Jeans azul oscuro, corte clásico",
        filename: "D_NQ_NP_977823-MLA73088579246_112023-O.webp",
        categoria: {
          categoria: "Ropa"
        }
      },
    ];

    setProveedor(mockProveedor);
    setProductos(mockProductos);
  }, []);

  const productosPorCategoria = productos.reduce((acc: any, producto: any) => {
    const categoria = producto.categoria?.categoria || "Sin Categoría";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(producto);
    return acc;
  }, {});

  return (
    <>
      {proveedor && (
        <>
          <section className='secProveedor'>
            <div className='imagenproveedor'>
              <img src='/recursos/logos/1600w-WaA_p7kReTs.jpg' alt='Logo Tienda'  />
            </div>
            <div className='datosProveedor'>
              <p>{proveedor.nombreTienda || 'Tienda Virtual 2.0'}</p>
            </div>
            <div className='detalletienda'>
              <p>Teléfono: {proveedor.user?.teléfonoUser}</p>
              <p>Dirección: {proveedor.user?.direcciónUser}</p>
              <p>Correo: {proveedor.user?.email}</p>
            </div>
          </section>

          <section className='secAutor'>
            <div className='imgPropietario'>
              <img src='/recursos/perfiles/5fa43a4a54014.jpeg' alt='Propietario' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p>{proveedor.user?.name}</p>
              <p>Bienvenidos a nuestra tienda. Aquí encontrarás lo mejor al mejor precio.</p>
              <p>Contacto:</p>
              <p>Teléfono: {proveedor.user?.teléfonoUser}</p>
              <p>Correo: {proveedor.user?.email}</p>
            </div>
          </section>
        </>
      )}

      <section className='producProveedor'>
  {Object.keys(productosPorCategoria).map((cat) => (
    <div key={cat} style={{ marginBottom: '2rem', width: '100%' }}>
      <h2 style={{ backgroundColor: '#ccc', padding: '0.5rem' }}>{cat}</h2>
      <div className="collageProductos" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {productosPorCategoria[cat].map((product: any) => {
          const precioDescuento = Math.ceil(product.price - (product.price * (product.desc / 100)));

          return (
            <div
              className={`contenedorProducto ${product.desc > 0 ? 'descuento' : ''}`}
              key={product.id}
            >
              <div className="DtaGaleryprod">
                <img
                  className="ImagProducdta"
                  src={`/recursos/productos/${product.filename}`}
                  alt={product.name}
                  onError={(e) => console.error("Error cargando imagen", e)}
                />
              </div>
              <div className="TxtProd">
                <h3 title={product.name}>{product.name}</h3>

                <div className="contPrice">
                  <span className="precioDescuento">C${precioDescuento}</span>
                  {product.desc > 0 && (
                    <>
                      <span className="precioTachado">C${Math.ceil(product.price)}</span>
                      <span className="descCaja">{product.desc}%</span>
                    </>
                  )}
                </div>

                <div className="calificacionYCarrito">
                  <span className="stars">★★★★☆</span>
                  <button className="btnCarrito">🛒</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ))}
</section>

    </>
  );
};

export default VirtualStore;