import React, { useState, useRef } from 'react';
import { serverApi, serverFront } from '../variablesGlobales';

// Define la interfaz del usuario incluyendo 'images'
interface User {
  name: string;
  password: string;
  email: string;
  sexo: string;
  images?: string[]; // Un arreglo de URLs de imágenes
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    password: '',
    email: '',
    sexo: '',
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${serverApi}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.id;

        // Subir la imagen al servidor y agregar la URL de la imagen al usuario
        await uploadImage(userId);

        // Mostrar la ventana emergente de éxito
        setShowSuccessPopup(true);

        // Limpiar el formulario
        setUser({
          name: '',
          password: '',
          email: '',
          sexo: '',
        });
      } else {
        console.error('Error al guardar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const uploadImage = async (userId: number) => {
    if (imageRef.current && imageRef.current.files && imageRef.current.files[0]) {
      const formData = new FormData();
      formData.append('file', imageRef.current.files[0]);

      try {
        const response = await fetch(`${serverApi}/files/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = `${serverApi}/files/product/${data.url}`;

          // Agregar la URL de la imagen al usuario usando un PATCH
          await fetch(`${serverApi}/users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ images: [imageUrl] }),
          });
        } else {
          console.error('Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const handleAccept = () => {
    setShowSuccessPopup(false);

    // Redirigir al usuario a la página de inicio
    window.location.href = `${serverFront}/Home`;
  };

  return (
    <div>
      <h2>Ingresar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sexo">Sexo:</label>
          <select id="sexo" name="sexo" value={user.sexo} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label htmlFor="filename">Imagen:</label>
          <input
            type="file"
            id="filename"
            name="filename"
            ref={imageRef}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>

      {/* Ventana emergente de éxito */}
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Usuario guardado con éxito:</p>
          <ul>
            <li>Nombre: {user.name}</li>
            <li>Contraseña: {user.password}</li>
            <li>Correo Electrónico: {user.email}</li>
            <li>Sexo: {user.sexo}</li>
            {user.images && user.images.length > 0 && (
              <li>
                Imagen:
                <img src={user.images[0]} alt="Imagen de usuario" />
              </li>
            )}
          </ul>
          <button onClick={handleAccept}>Aceptar</button>
        </div>
      )}
    </div>
  );
};

export default UserForm;

