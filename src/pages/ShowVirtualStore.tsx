import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/virtualstore.css';

interface Autor {
  id: number;
  name: string;
  email: string;
  direccionUser: string;
  telefonoUser: string;
  filename?: string | null;
  sexo?: string;
  active?: boolean;
}

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

interface ProveedorData {
  id: number;
  proveedor: string;
  user_id: number;
  logo: string | null;
  autor: Autor;
  productos: Producto[];
}

const VirtualStore: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proveedorData, setProveedorData] = useState<ProveedorData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProveedor = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/proveedores/${id}`);
        if (!res.ok) throw new Error('Proveedor no encontrado');
        const data = await res.json();
        setProveedorData(data);
      } catch (error) {
        console.error(error);
        setProveedorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProveedor();
  }, [id, API_URL]);

  if (loading) return <p>Cargando tienda...</p>;
  if (!proveedorData) return <p>No se encontró el proveedor.</p>;

  // Organizar productos por categoría (por ejemplo usando categoria_id)
  // Si tienes las categorías por id, debes mapear a nombre, aquí usaré categoria_id directo
  const productosPorCategoria = proveedorData.productos.reduce((acc: Record<string, Producto[]>, producto) => {
    const categoriaKey = `Categoría ${producto.categoria_id}`; // Si tienes nombres reales, mejor reemplazar acá
    if (!acc[categoriaKey]) acc[categoriaKey] = [];
    acc[categoriaKey].push(producto);
    return acc;
  }, {});

  return (
    <>
      <section className='secProveedor'>
        <div className='imagenproveedor'>
          <img
            src={proveedorData.logo ? `/recursos/logos/${proveedorData.logo}` : '/recursos/logos/1600w-WaA_p7kReTs.jpg'}
            alt='Logo Tienda'
          />
        </div>
        <div className='datosProveedor'>
          <p>{proveedorData.proveedor}</p>
        </div>
        <div className='detalletienda'>
          <p>Teléfono: {proveedorData.autor.telefonoUser}</p>
          <p>Dirección: {proveedorData.autor.direccionUser}</p>
          <p>Correo: {proveedorData.autor.email}</p>
        </div>
      </section>

      <section className='secAutor'>
        <div className='imgPropietario'>
          <img
            src={proveedorData.autor.filename ? `/recursos/perfiles/${proveedorData.autor.filename}` : '/recursos/perfiles/5fa43a4a54014.jpeg'}
            alt='Propietario'
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <p>{proveedorData.autor.name}</p>
          <p>Bienvenidos a nuestra tienda. Aquí encontrarás lo mejor al mejor precio.</p>
          <p>Contacto:</p>
          <p>Teléfono: {proveedorData.autor.telefonoUser}</p>
          <p>Correo: {proveedorData.autor.email}</p>
        </div>
      </section>

      <section className='producProveedor'>
        {Object.keys(productosPorCategoria).map((cat) => (
          <div key={cat} style={{ marginBottom: '2rem', width: '100%' }}>
            <h2 style={{ backgroundColor: '#ccc', padding: '0.5rem' }}>{cat}</h2>
            <div
              className='collageProductos'
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
            >
              {productosPorCategoria[cat].map((product) => {
                const descuento = product.descuento ? product.desc || 0 : 0;
                const precioDescuento = Math.ceil(product.price - (product.price * descuento) / 100);

                return (
                  <div
                    className={`contenedorProducto ${descuento > 0 ? 'descuento' : ''}`}
                    key={product.id}
                  >
                    <div className='DtaGaleryprod'>
                      <img
                        className='ImagProducdta'
                        src={`/recursos/productos/${product.filename}`}
                        alt={product.name}
                        onError={(e) => {
                          console.error('Error cargando imagen', e);
                        }}
                      />
                    </div>
                    <div className='TxtProd'>
                      <h3 title={product.name}>{product.name}</h3>

                      <div className='contPrice'>
                        <span className='precioDescuento'>C${precioDescuento}</span>
                        {descuento > 0 && (
                          <>
                            <span className='precioTachado'>C${Math.ceil(product.price)}</span>
                            <span className='descCaja'>{descuento}%</span>
                          </>
                        )}
                      </div>

                      <div className='calificacionYCarrito'>
                        <span className='stars'>★★★★☆</span>
                        <button className='btnCarrito'>🛒</button>
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
