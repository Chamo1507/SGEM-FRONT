import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Proveedores.css';
import Btn from './btn';
import Input from './CInput';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({ 
    nombre_proveedor: '', 
    correo_proveedor: '', 
    telefono_proveedor: '', 
    servicio_proveedor: '' 
  });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/proveedores`);
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const agregarProveedor = async () => {
    if (!nuevoProveedor.nombre_proveedor) {
      alert("El nombre del proveedor es obligatorio");
      return;
    }
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/proveedores`, nuevoProveedor);
      fetchProveedores();
      setNuevoProveedor({ nombre_proveedor: '', correo_proveedor: '', telefono_proveedor: '', servicio_proveedor: '' });
      setMostrarForm(false);
      alert("Proveedor agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
      alert("Hubo un error al agregar el proveedor");
    }
  };

  return (
    <div className="proveedores-container">
      <div className="proveedores-header">
        <div>
          <h1>Proveedores</h1>
          <p>Gestiona el directorio de proveedores disponibles.</p>
        </div>
        <button 
          className={mostrarForm ? "btn-toggle-form active" : "btn-toggle-form"}
          onClick={() => setMostrarForm(!mostrarForm)} 
        >
          {mostrarForm ? '← Volver a la Lista' : '+ Agregar Proveedor'}
        </button>
      </div>

      <div className="proveedores-content">
        {mostrarForm && (
          <div className="add-item-section animation-fade-in">
            <h3>Agregar Nuevo Proveedor</h3>
            <div className="add-proveedor-form">
              <Input 
                label="Nombre del Proveedor" 
                placeholder="Ej.: Fotografía Studio XYZ" 
                value={nuevoProveedor.nombre_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre_proveedor: e.target.value })}
              />
              <Input 
                label="Correo Electrónico" 
                type="email" 
                placeholder="Ej.: contacto@studioxyz.com" 
                value={nuevoProveedor.correo_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, correo_proveedor: e.target.value })}
              />
              <Input 
                label="Teléfono" 
                placeholder="Ej.: 2221234567" 
                value={nuevoProveedor.telefono_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono_proveedor: e.target.value })}
              />
              <Input 
                label="Servicio" 
                placeholder="Ej.: Fotografía y Video" 
                value={nuevoProveedor.servicio_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, servicio_proveedor: e.target.value })}
              />
              
              <div style={{ alignSelf: 'end' }}>
                <Btn texto="Guardar" onClick={agregarProveedor} type="button" className="add-proveedor-btn" />
              </div>
            </div>
          </div>
        )}

        <div className="items-list-section">
          <h3>Directorio de Proveedores</h3>
          {proveedores.length === 0 ? (
            <p className="empty-text">No hay proveedores registrados.</p>
          ) : (
            <div className="cards-grid">
              {proveedores.map(prov => (
                <div key={prov.id_proveedor} className="prov-card">
                  <div className="prov-avatar">
                    <span className="prov-initial">{prov.nombre_proveedor.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="prov-details">
                    <h4>{prov.nombre_proveedor}</h4>
                    <p><strong>Servicio:</strong> {prov.servicio_proveedor || 'No especificado'}</p>
                    <p><strong>Correo:</strong> {prov.correo_proveedor || 'No especificado'}</p>
                    <p><strong>Teléfono:</strong> {prov.telefono_proveedor || 'No especificado'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
