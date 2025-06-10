import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/virtualstore.css';

const API_URL = import.meta.env.VITE_API_URL;

const VirtualStore: React.FC = () => {
  const [proveedor, setProveedor] = useState<any>(null);
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProveedor = await axios.get(`${API_URL}/proveedores/1`); // Cambia el ID si es dinámico
        const resProductos = await axios.get(`${API_URL}/productos?proveedorId=1`); // Filtra por proveedor

        setProveedor(resProveedor.data);
        setProductos(resProductos.data);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    fetchData();
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
              <img src='/recursos/logos/logo_tienda.png' alt='Logo Tienda' style={{ height: '100%', objectFit: 'contain' }} />
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
              <img src='/recursos/perfil/usuario.png' alt='Propietario' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
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
                  <div className="contenedorProducto" key={product.id} style={{ width: '250px', border: '1px solid #ccc', borderRadius: '10px', padding: '1rem', backgroundColor: '#fff' }}>
                    <div className="DtaGaleryprod" style={{ textAlign: 'center' }}>
                      <img
                        className="ImagProducdta"
                        src={`/recursos/productos/${product.filename}`}
                        alt={product.name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        onError={(e) => console.error("Error cargando imagen", e)}
                      />
                    </div>
                    <div className="TxtProd" style={{ marginTop: '0.5rem' }}>
                      <h3>{product.name}</h3>
                      <p>Ahora: C${precioDescuento}</p>
                      {product.desc ? (
                        <>
                          <p>Precio regular: C${Math.ceil(product.price)}</p>
                          <p className="cantdesc">Descuento: {product.desc}%</p>
                        </>
                      ) : null}
                      <p>Stock: {product.stock}</p>
                      <p style={{ fontSize: '0.9rem' }}>{product.description}</p>
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
