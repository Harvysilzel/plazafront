//import React, { useState, useEffect } from 'react';
//import { Link, useParams } from 'react-router-dom';
//import { serverApi } from '../variablesGlobales';

import '../styles/virtualstore.css';

//interface User {
 // id: number;
//  name: string;
 // password: string;
 // email: string;
 // sexo: string;
 // filename: string | null;
//  active: boolean;
 // images: { id: number; url: string }[];
//}

//interface Proveedor {
 // id: number;
 // proveedor: string;
 // autor: {
 //   id: number;
 //   name: string;
 //   filename: string[];
//  };
//}

//*interface Product {
//  id: number;
//  name: string;
  //description: string;
//  price: number;
//  stock: number;
//  descuento: boolean;
//  desc: number;
//  autor: {
//    name: string;
//  };
//  categoria: {
 //   id: number;
//    categoria: string;
 //// };
 // proveedor: {
 //   id: number;
//    proveedor: string;
//  };
 // filename: string;
//}

// <Link to={'https://api.whatsapp.com/send/?phone=%2B50583316265&text&type=phone_number&app_absent=0'}>
//whatsapp 8888 8888
//</Link>

const VirtualStore: React.FC = () => {



    return(
        <>
        <section className='secProveedor'>
            <div className='imagenproveedor'><p>img</p></div>
            <div className='datosProveedor'>
                <p>tienda virtual 2.0</p>
            </div>
            <div className='detalletienda'>
                <p>telefono:8888-8888</p> 
                 <p>.      direccion: frente a la casa del vecino</p>
                  <p>.          correo: micoreeodeempresa@gmail.com</p> 
                  
            </div>
        </section>
        <section className='secAutor'>
            <div className='imgPropietario'><p>imgpropietario</p></div>
            <div>
                <p>harvy silva </p>
                <p>aqui una breve descripcion y saludo del propietario</p>
                <p>contactos</p>
                <p>telefono: 8888-8888</p>
                <p>correo: micorreo@gmail.com </p>
            
            </div>
            
        </section>
        <section className='producProveedor'>
                

        </section>
        </>
    )
}
export default VirtualStore;
