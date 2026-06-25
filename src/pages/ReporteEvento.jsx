import { useParams, useNavigate } from "react-router-dom";
import "./ReporteEvento.css";

// Datos Harcodeados expandidos para los reportes
const eventosMockData = {
  "1": {
    nombre: "Conferencia Anual de Tecnología",
    fecha: "28 Jun 2026",
    ubicacion: "Auditorio Principal",
    organizador: "Departamento de Sistemas",
    asistentesEsperados: 300,
    asistentesConfirmados: 280,
    presupuesto: "$5,000",
    estado: "Próximo",
    descripcion: "La conferencia más grande del año para hablar sobre las nuevas tecnologías e innovaciones en IA y desarrollo web. Contaremos con 5 expositores internacionales."
  },
  "2": {
    nombre: "Taller de Liderazgo",
    fecha: "15 Jun 2026",
    ubicacion: "Sala B",
    organizador: "Recursos Humanos",
    asistentesEsperados: 50,
    asistentesConfirmados: 45,
    presupuesto: "$500",
    estado: "Completado",
    descripcion: "Taller interactivo de liderazgo y habilidades blandas orientado a mejorar el trabajo en equipo y la resolución de conflictos."
  },
  "3": {
    nombre: "Simposio de Salud Mental",
    fecha: "05 Jul 2026",
    ubicacion: "Auditorio Secundario",
    organizador: "Bienestar Estudiantil",
    asistentesEsperados: 200,
    asistentesConfirmados: 150,
    presupuesto: "$1,200",
    estado: "Próximo",
    descripcion: "Simposio de 2 días para concientizar sobre la salud mental en los estudiantes universitarios. Incluye dinámicas y paneles de expertos."
  },
  "4": {
    nombre: "Feria de Emprendimiento",
    fecha: "10 May 2026",
    ubicacion: "Patio Central",
    organizador: "Facultad de Negocios",
    asistentesEsperados: 500,
    asistentesConfirmados: 500,
    presupuesto: "$3,000",
    estado: "Completado",
    descripcion: "Exposición de más de 40 proyectos de emprendimiento estudiantil. Abierto al público general con stands interactivos."
  }
};

const ReporteEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const evento = eventosMockData[id];

  if (!evento) {
    return (
      <div className="report-container">
        <h2>Reporte no encontrado</h2>
        <button onClick={() => navigate(-1)} style={{ background: "#64748b", color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Volver</button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <div className="report-title">
          <h1>Reporte Oficial del Evento</h1>
          <p>Generado automáticamente - Sistema SGEM</p>
        </div>
        <div className="report-actions">
          <button onClick={handlePrint}>🖨️ Imprimir Reporte</button>
        </div>
      </div>

      <div className="report-grid">
        <div className="info-card">
          <h3>Información General</h3>
          <div className="info-item">
            <span className="info-label">Nombre:</span>
            <span className="info-value">{evento.nombre}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fecha:</span>
            <span className="info-value">{evento.fecha}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ubicación:</span>
            <span className="info-value">{evento.ubicacion}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Organizador:</span>
            <span className="info-value">{evento.organizador}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Estado:</span>
            <span className="info-value" style={{ color: evento.estado === 'Próximo' ? '#3b82f6' : '#10b981' }}>{evento.estado}</span>
          </div>
        </div>

        <div className="info-card">
          <h3>Métricas y Presupuesto</h3>
          <div className="info-item">
            <span className="info-label">Asistentes Esperados:</span>
            <span className="info-value">{evento.asistentesEsperados}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Asistentes Confirmados:</span>
            <span className="info-value">{evento.asistentesConfirmados}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tasa de Asistencia:</span>
            <span className="info-value">{Math.round((evento.asistentesConfirmados / evento.asistentesEsperados) * 100)}%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Presupuesto Asignado:</span>
            <span className="info-value">{evento.presupuesto}</span>
          </div>
        </div>
      </div>

      <div className="info-card" style={{ marginBottom: "20px" }}>
        <h3>Descripción y Detalles</h3>
        <p className="info-description">{evento.descripcion}</p>
      </div>
      
      <div className="report-actions" style={{ marginTop: "40px" }}>
        <button onClick={() => navigate(-1)} style={{ background: "white", color: "#64748b", border: "1px solid #cbd5e1", marginRight: "16px" }}>Volver Atrás</button>
      </div>
    </div>
  );
};

export default ReporteEvento;
