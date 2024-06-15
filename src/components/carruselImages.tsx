// src/CarruselImages.tsx
const images: string[] = [];

const numImages = 8; // Cantidad de imágenes
const totalImages = numImages * 2 - 1; // Total de imágenes en el ciclo

for (let i = 1; i <= totalImages; i++) {
  // Calcula el valor de i dentro del rango de 1 a numImages y luego de numImages a 1
  const normalizedIndex = i <= numImages ? i : totalImages - i + 1;
  images.push(`/img/${normalizedIndex}.jpg`);
}

export default images;





