import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VaciaImg from '../recursos/vacio.jpg';
import '../styles/detalleproducto.css';
import { serverApi } from '../variablesGlobales';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  descuento: boolean;
  desc: number;
  autor: {
    name: string;
  };
  categoria: {
    id: number;
    categoria: string;
  };
  proveedor: {
    id: number;
    proveedor: string;
  };
  filename: string;
}



const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener el producto por su ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${serverApi}/products/${id}`);
        if (response.ok) {
          const data: Product = await response.json();
          setProduct(data);

          // Obtén todos los productos de la misma categoría
          const categoryProductsResponse = await fetch(`${serverApi}/products/categories/${data.categoria.id}`);
          if (categoryProductsResponse.ok) {
            const categoryProductsData: Product[] = await categoryProductsResponse.json();
            // Baraja (mezcla) la lista de productos al azar
            const shuffledProducts = categoryProductsData.sort(() => Math.random() - 0.5);
            // Selecciona los primeros 5 productos
            const selectedProducts = shuffledProducts.slice(0, 5);
            setRelatedProducts(selectedProducts);
          }
        } else {
          console.error('Error al obtener el producto');
          setProduct(null);
        }
      } catch (error) {
        console.error('Error de red:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  // Determina la clase CSS en función del valor de product.stock
  const stockClassName = product?.stock && product.stock < 5 ? 'red-text' : 'blue-text';
  const productienda = product?.proveedor.proveedor
  const RepTienda = product?.autor.name
  const catetienda = product?.categoria.categoria
  const idProveedor = product?.proveedor.id
  return (
    <div>
      <div className="contenedorProducto">
        {product ? (
          <>
            <div className="DtaProduc">
              <div className="DtaGaleryprod">
                {product.filename ? (
                  <img
                    className="ImagProducdta"
                    src={`/src/recursos/productos/${product.filename}`}
                    alt="imagen"
                    onError={(e) => {
                      console.error("Error al cargar la imagen:", e);
                    }}
                  />
                ) : (
                  <img className="ImagenProducto" src={VaciaImg} alt="imagen vacía" />
                )}
              </div>
              <div className="TxtProd">
                <h1 className="infProd">{product.name}</h1>
                <hr />
                <div className="contPrice">
                  <p className="infPriceProd">Ahora: C${Math.ceil(product.price-(product.price*(product.desc/100)))}</p>
                  {product.descuento? (
                    <><p className="infdescProd">
                      Precio: C${Math.ceil(product.price)}
                    </p><p className="cantdesc">con {product.desc}% de Descuento </p></>

                  ): null}
                  
                </div>
                <p className={stockClassName}>Stock: {product.stock} en existencia</p>
                <hr />
                <hr />
                <p>{product.description}</p>
                
               
                <Link to={`/CategoryDetail/${product.categoria.id}`}>
                <p>Categoría: {product.categoria.categoria}</p>
                </Link>
              </div>
              <div className="EnvProd">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae impedit
                  laudantium quas corrupti, quos repellendus magni fugit deleniti dolorum
                  blanditiis facere accusantium ratione expedita nobis. Cum incidunt sed
                  impedit omnis!
                </p>
              </div>
            </div>
          </>
        ) : (
          <div>Producto no encontrado.</div>
        )}
      </div>





      <div className='SugerenciasShop'>



      <section className='EstaTienda'>
        
          <Link to={`/VirtualStore/${idProveedor}`}>
          <div className='tienda'>
          <div className='nda'>
            <img src={VaciaImg} alt="imagen Vacia" width="100%"/>
          </div>
          <div className='descripTiendaVir'>
            <h3>TIENDA VIRTUAL</h3>
            <hr />
          <h1> {productienda} </h1>
          <p>Propietario:</p>
          
          <p> {RepTienda}</p>
          <hr />
          <p> {catetienda}</p>
          
          </div>
          </div>
          </Link>
          
        </section>




        
        
        <section className='SugProducTxT'>
          {relatedProducts.map((relatedProduct) => (
            
            
            <div className='CajaProducMini' key={relatedProduct.id}>
               <Link to={`/DetalleProducto/${relatedProduct.id}`}>
              {/* Aquí va la información de los productos relacionados */}
              
              <div className="sugGaleryprod">
                {relatedProduct.filename ? (
                  <img
                    className="ImagProducdtammini"
                    src={`/src/recursos/productos/${relatedProduct.filename}`}
                    alt="imagen"
                    onError={(e) => {
                      console.error("Error al cargar la imagen:", e);
                    }}
                  />
                ) : (
                  <img className="ImagProducdtammini" src={VaciaImg} alt="imagen vacía" />
                )}
              </div>
              <div><h3>{relatedProduct.name}</h3></div>
              
              <h3>Precio: C${relatedProduct.price}</h3>
              
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
