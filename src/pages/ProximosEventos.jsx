import React, { useState } from 'react';
import FormularioEventos from '../components/FormularioEventos';
import './ProximosEventos.css';

const ProximosEventos = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'details'
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [eventos, setEventos] = useState([
    {
      id: 1,
      nombre: 'Conferencia Anual de Tecnología',
      estatus: 'confirmado',
      fecha: '2026-07-15',
      hora: '10:00',
      organizador: 'org1',
      comentarios: 'Evento principal sobre inteligencia artificial en el auditorio principal.',
      objetivo: 'Fomentar la innovación tecnológica.',
      prioridad: 'alta',
      proveedor: 'prov1'
    },
    {
      id: 2,
      nombre: 'Taller de Liderazgo Estudiantil',
      estatus: 'pendiente',
      fecha: '2026-07-20',
      hora: '14:30',
      organizador: 'org2',
      comentarios: 'Taller para representantes de carrera. Faltan confirmar proveedores.',
      objetivo: 'Mejorar las habilidades de liderazgo.',
      prioridad: 'media',
      proveedor: 'prov2'
    },
    {
      id: 3,
      nombre: 'Simposio de Salud Mental',
      estatus: 'en preparación',
      fecha: '2026-08-05',
      hora: '09:00',
      organizador: 'org3',
      comentarios: 'Charlas de psicólogos invitados y dinámicas grupales en la explanada.',
      objetivo: 'Concientizar sobre la salud mental.',
      prioridad: 'baja',
      proveedor: 'prov3'
    }
  ]);

  const handleSaveEvento = (datosEvento) => {
    if (selectedEvento) {
      // Modo Edición
      setEventos(eventos.map(ev => ev.id === datosEvento.id ? datosEvento : ev));
    } else {
      // Modo Creación
      setEventos([...eventos, datosEvento]);
    }
    setViewMode('list');
    setSelectedEvento(null);
  };

  const handleCreateNew = () => {
    setSelectedEvento(null);
    setViewMode('form');
  };

  const handleViewDetails = (evento) => {
    setSelectedEvento(evento);
    setViewMode('details');
  };

  const handleEdit = () => {
    setViewMode('form');
  };

  return (
    <div className="proximos-container">
      <div className="proximos-header">
        <div>
          <h1>Gestión de Eventos</h1>
          <p>Administra la lista de eventos o registra uno nuevo.</p>
        </div>
        <button 
          className={viewMode !== 'list' ? "btn-toggle-form active" : "btn-toggle-form"}
          onClick={() => {
            if (viewMode === 'list') {
              handleCreateNew();
            } else {
              setViewMode('list');
              setSelectedEvento(null);
            }
          }}
        >
          {viewMode !== 'list' ? '← Volver a la Lista' : '+ Registrar Nuevo Evento'}
        </button>
      </div>

      <div className="proximos-content">
        {viewMode === 'form' ? (
          <div className="animation-fade-in">
            <FormularioEventos onSaveEvento={handleSaveEvento} eventoEditando={selectedEvento} />
          </div>
        ) : viewMode === 'details' && selectedEvento ? (
          <div className="evento-details-view animation-fade-in">
            <div className="details-card">
              <div className="details-header">
                <div className="details-title-row">
                  <h2>{selectedEvento.nombre}</h2>
                  <span className={`badge-estatus ${selectedEvento.estatus}`}>
                    {selectedEvento.estatus}
                  </span>
                </div>
                <div className="details-meta">
                  <span>📅 {selectedEvento.fecha}</span>
                  <span>🕒 {selectedEvento.hora}</span>
                  <span>👤 Organizador: {selectedEvento.organizador === 'org1' ? 'Organizador 1' : selectedEvento.organizador === 'org2' ? 'Organizador 2' : selectedEvento.organizador}</span>
                </div>
              </div>
              <div className="details-body">
                <h3>Objetivo</h3>
                <p>{selectedEvento.objetivo || 'No especificado'}</p>
                
                <h3>Descripción / Comentarios</h3>
                <p>{selectedEvento.comentarios}</p>

                <div className="details-actions">
                  <button className="btn-edit" onClick={handleEdit}>
                    ✏️ Editar Evento
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : eventos.length > 0 ? (
          <div className="eventos-list animation-fade-in">
            {eventos.map((evento) => (
              <div key={evento.id} className="evento-card">
                <div className="evento-card-header">
                  <h3>{evento.nombre}</h3>
                  <span className={`badge-estatus ${evento.estatus}`}>
                    {evento.estatus}
                  </span>
                </div>
                <div className="evento-card-body">
                  <p><strong>Fecha:</strong> {evento.fecha} - {evento.hora}</p>
                  <p><strong>Organizador:</strong> {evento.organizador === 'org1' ? 'Organizador 1' : evento.organizador === 'org2' ? 'Organizador 2' : evento.organizador}</p>
                  <p className="evento-desc">{evento.comentarios}</p>
                </div>
                <div className="evento-card-footer">
                  <button className="btn-acerca" onClick={() => handleViewDetails(evento)}>
                    Ver acerca de
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-events-state animation-fade-in">
            <div className="empty-icon">📅</div>
            <h3>No hay eventos programados en esta sección</h3>
            <p>Aún no has registrado ningún evento para visualizarlo aquí.</p>
            <button className="btn-primary" onClick={handleCreateNew}>
              Crear tu primer evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProximosEventos;
