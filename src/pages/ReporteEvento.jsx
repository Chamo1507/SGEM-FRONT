import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ReporteEvento.css";

const ReporteEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos/${id}/reporte`);
        setEvento(response.data);
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReporte();
  }, [id]);

  if (loading) {
    return (
      <div className="report-container">
        <h2>Cargando reporte...</h2>
      </div>
    );
  }

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
            <span className="info-value">{evento.asistentesEsperados ? Math.round((evento.asistentesConfirmados / evento.asistentesEsperados) * 100) : 0}%</span>
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
