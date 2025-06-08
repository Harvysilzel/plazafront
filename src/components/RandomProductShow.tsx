import VaciaImg from '../recursos/vacio.jpg';
import shopvoid from '../recursos/shopvoid.png'
import { Link } from 'react-router-dom';
import '../styles/cuerpo.css'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  filename: string;
  
}

interface RandomProductShowProps {
  products: Product[];
}

function RandomProductShow({ products }: RandomProductShowProps) {
  
  return (
    
    <div className="ProducEstilo">
      <ul className="stiloul">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <li className="stiloli" key={product.id}>
              <Link to={`/DetalleProducto/${product.id}`}>
                {product.filename ? (
                  <img
                    className="ImagenProducto"
                    src={`/recursos/productos/${product.filename}`}
                    alt="imagen"
                    onError={(e) => {
                      console.error("Error al cargar la imagen:", e);
                    }}
                  />
                ) : (
                  <img className="ImagenProducto" src={VaciaImg} alt="imagen vacía" />
                )}
                <h1 className='nomproducrdw'>{product.name}</h1>
                <div className="descripcionproducto">
                  <p>{product.description}</p>
                </div>
                <p className="preciostile">Precio: C${product.price}</p>
                <p>Stock: {product.stock} en existencia</p>
              </Link>
            </li>
          ))
        ) : (
          <div className="nohaynada">
            <h1>Upss... No encontramos nada</h1>
            <img className="carrovoid" src={shopvoid} alt="carrito vacío" />
            <h2>Lo invitamos a que mire otra de nuestras secciones</h2>
          </div>
        )}
      </ul>
    </div>
    
  );
}

export default RandomProductShow;
