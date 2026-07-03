import React, { useState, useEffect } from 'react';
import FormularioEventos from '../components/FormularioEventos';
import axios from 'axios';
import './ProximosEventos.css';

const ProximosEventos = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'details'
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'coverage'
  const [isAdmin, setIsAdmin] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id_rol === 1) setIsAdmin(true);
    if (user.id_rol === 1 || user.id_rol === 3) setCanCreate(true);
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`);
      
      const fetchedEventos = response.data.map(ev => ({
        id: ev.id_evento,
        nombre: ev.nombre_evento,
        estatus: ev.estatus_evento || 'Pendiente',
        fecha: new Date(ev.fecha_evento).toISOString().split('T')[0],
        hora: ev.horainicio_evento ? new Date(ev.horainicio_evento).toISOString().split('T')[1].substring(0, 5) : '',
        horaFin: ev.horafin_evento ? new Date(ev.horafin_evento).toISOString().split('T')[1].substring(0, 5) : '',
        organizador: ev.responsable_evento || 'No asignado',
        comentarios: ev.descripcion_evento,
        objetivo: ev.objetivo_evento,
        prioridad: ev.prioridad_evento,
        requiereCobertura: ev.requiere_cobertura,
        plantel: ev.planteles?.nombre_plantel || 'N/A',
        espacio: ev.espacios?.nombre_espacio || 'N/A',
        proveedores: ev.proveedor_evento?.map(pe => pe.proveedores?.nombre_proveedor).join(', ') || 'Ninguno'
      }));
      setEventos(fetchedEventos);
    } catch (error) {
      console.error("Error fetching eventos:", error);
    }
  };

  const handleSaveEvento = () => {
    fetchEventos();
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
    // Para el admin, al darle editar en uno de cobertura, le permite asignar proveedor
    setViewMode('form');
  };

  const handleEliminar = async (evento) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento? También se cancelará en Google Calendar.')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const calendarId = user?.google_calendar_id || user?.correo_usuario;
        await axios.delete(`${import.meta.env.VITE_API_URL}/eventos/${evento.id}`, {
          data: { calendarId } // Mandamos el calendarId para eliminar de Google Calendar
        });
        alert('Evento eliminado exitosamente');
        fetchEventos();
        if (selectedEvento?.id === evento.id) {
          setViewMode('list');
          setSelectedEvento(null);
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al intentar eliminar el evento');
      }
    }
  };

  const displayedEventos = filterMode === 'coverage' 
    ? eventos.filter(e => e.requiereCobertura && e.estatus === 'pendiente') 
    : eventos;

  return (
    <div className="proximos-container">
      <div className="proximos-header">
        <div>
          <h1>Gestión de Eventos</h1>
          <p>Administra la lista de eventos o registra uno nuevo.</p>
        </div>
        {canCreate && (
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
        )}
      </div>

      <div className="proximos-content">
        {viewMode === 'list' && isAdmin && (
          <div className="admin-filters" style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
            <button 
              className={`btn-filter ${filterMode === 'all' ? 'active-filter' : ''}`}
              onClick={() => setFilterMode('all')}
              style={{padding: '8px 16px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', background: filterMode === 'all' ? '#007bff' : '#fff', color: filterMode === 'all' ? '#fff' : '#333'}}
            >
              Todos los Eventos
            </button>
            <button 
              className={`btn-filter ${filterMode === 'coverage' ? 'active-filter' : ''}`}
              onClick={() => setFilterMode('coverage')}
              style={{padding: '8px 16px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', background: filterMode === 'coverage' ? '#ff9800' : '#fff', color: filterMode === 'coverage' ? '#fff' : '#333'}}
            >
              Pendientes de Cobertura 🚨
            </button>
          </div>
        )}

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
                  <span>🕒 {selectedEvento.hora} - {selectedEvento.horaFin}</span>
                  <span>📍 {selectedEvento.plantel} - {selectedEvento.espacio}</span>
                  <span>👤 Responsable: {selectedEvento.organizador}</span>
                </div>
              </div>
              <div className="details-body">
                <h3>Objetivo</h3>
                <p>{selectedEvento.objetivo || 'No especificado'}</p>
                
                <h3>Descripción / Comentarios</h3>
                <p>{selectedEvento.comentarios}</p>

                {isAdmin && (
                  <>
                    <h3>Cobertura Asignada</h3>
                    <p><strong>Proveedores:</strong> {selectedEvento.proveedores}</p>
                    <p><strong>Requiere Fotografía/Reseña:</strong> {selectedEvento.requiereCobertura ? 'Sí' : 'No'}</p>
                  </>
                )}

                <div className="details-actions">
                  <button className="btn-edit" onClick={handleEdit}>
                    {isAdmin && selectedEvento.requiereCobertura ? '✏️ Asignar Cobertura / Editar' : '✏️ Editar Evento'}
                  </button>
                  <button className="btn-edit" style={{backgroundColor: '#dc3545', marginLeft: '10px'}} onClick={() => handleEliminar(selectedEvento)}>
                    🗑️ Eliminar Evento
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : displayedEventos.length > 0 ? (
          <div className="eventos-list animation-fade-in">
            {displayedEventos.map((evento) => (
              <div key={evento.id} className="evento-card">
                <div className="evento-card-header">
                  <h3>{evento.nombre}</h3>
                  <span className={`badge-estatus ${evento.estatus}`}>
                    {evento.estatus}
                  </span>
                </div>
                <div className="evento-card-body">
                  <p><strong>Fecha:</strong> {evento.fecha} - {evento.hora}</p>
                  <p><strong>Responsable:</strong> {evento.organizador}</p>
                  {isAdmin && evento.requiereCobertura && (
                     <p style={{color: '#ff9800', fontWeight: 'bold'}}>📸 Requiere Cobertura</p>
                  )}
                  <p className="evento-desc">{evento.comentarios}</p>
                </div>
                <div className="evento-card-footer" style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                  <button className="btn-acerca" style={{flex: 1}} onClick={() => handleViewDetails(evento)}>
                    Ver detalles
                  </button>
                  <button className="btn-acerca" style={{flex: 1, backgroundColor: '#dc3545', color: 'white'}} onClick={() => handleEliminar(evento)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-events-state animation-fade-in">
            <div className="empty-icon">📅</div>
            <h3>No hay eventos en esta vista</h3>
            <p>No se encontraron eventos con los filtros actuales.</p>
            {filterMode !== 'coverage' && (
              <button className="btn-primary" onClick={handleCreateNew}>
                Crear tu primer evento
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProximosEventos;
