import React from 'react';
import './Home.css';
import noticia1 from '../assets/noticias/1.jpg';
import noticia2 from '../assets/noticias/2.jpg';
import noticia3 from '../assets/noticias/3.jpg';

const Home = () => {
  const noticias = [
    {
      id: 1,
      titulo: 'La familia juega un papel clave en la preparación de Tigres Blancos UMAD',
      descripcion: 'Después de concluir una exigente temporada de básquetbol universitario, los integrantes de Tigres Blancos UMAD disfrutaron de un periodo...',
      imagen: noticia1
    },
    {
      id: 2,
      titulo: 'UMAD fortalece su comunidad celebrando a los maderistas',
      descripcion: 'La Universidad Madero vivió una jornada llena de alegría, gratitud y compañerismo al celebrar los cumpleaños de los colaboradores...',
      imagen: noticia2
    },
    {
      id: 3,
      titulo: 'Ingeniería en Software y básquetbol: una combinación posible para Juncal Serrano',
      descripcion: 'Ser estudiante deportista implica asumir una doble responsabilidad todos los días. Significa mantener un excelente desempeño académico mientras se...',
      imagen: noticia3
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Bienvenido al SGM</h1>
        <p>Sistema de Gestión Mader</p>
      </section>

      {/* Noticias Section */}
      <section className="noticias-section">
        <h2 className="noticias-title">Últimas Noticias</h2>
        <div className="noticias-grid">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="noticia-card">
              <h3>{noticia.titulo}</h3>
              <div className="noticia-image-container">
                <img src={noticia.imagen} alt={noticia.titulo} />
              </div>
              <p>{noticia.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
