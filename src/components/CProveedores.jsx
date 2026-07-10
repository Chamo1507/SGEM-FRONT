import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CProveedores.css';
import Btn from './btn';
import Input from './CInput';

const CProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({ nombre_proveedor: '', telefono_proveedor: '', correo_proveedor: '', servicio_proveedor: '' });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Cargar los proveedores al entrar a la página
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/proveedores`);
        // Asume que la API devuelve un arreglo directamente. Si devuelve un objeto, ajusta a response.data.propiedad
        setProveedores(response.data);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    };
    fetchProveedores();
  }, []);

  const agregarProveedor = async () => {
    if (!nuevoProveedor.nombre_proveedor || !nuevoProveedor.telefono_proveedor || !nuevoProveedor.correo_proveedor || !nuevoProveedor.servicio_proveedor) {
      alert("Todos los campos son obligatorios");
      return;
    }
    
    try {
      setCargando(true);
      // Petición POST para guardar en la base de datos
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/proveedores`, nuevoProveedor);
      
      // Asumimos que el backend devuelve el proveedor creado (con su ID de la BD)
      const proveedorCreado = response.data.proveedor || response.data;
      
      setProveedores([...proveedores, proveedorCreado]);
      setNuevoProveedor({ nombre_proveedor: '', telefono_proveedor: '', correo_proveedor: '', servicio_proveedor: '' });
      setMostrarForm(false);
    } catch (error) {
      console.error("Error al guardar en la base de datos:", error);
      alert("Hubo un error al guardar el proveedor. Revisa la consola.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="proveedores-container">
      <div className="proveedores-header">
        <div>
          <h1>Proveedores</h1>
          <p>Gestiona la información y servicios de tus proveedores.</p>
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
            <h3>Agregar Proveedor</h3>
            <div className="add-item-form">
              <Input 
                label="Nombre" 
                placeholder="Ej.: Distribuidora ABC" 
                value={nuevoProveedor.nombre_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre_proveedor: e.target.value })}
              />
              <Input 
                label="Teléfono" 
                type="tel" 
                placeholder="Ej.: 555-1234" 
                value={nuevoProveedor.telefono_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono_proveedor: e.target.value })}
              />
              <Input 
                label="Correo" 
                type="email" 
                placeholder="Ej.: contacto@abc.com" 
                value={nuevoProveedor.correo_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, correo_proveedor: e.target.value })}
              />
              <Input 
                label="Servicio" 
                placeholder="Ej.: Suministro de papel" 
                value={nuevoProveedor.servicio_proveedor} 
                onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, servicio_proveedor: e.target.value })}
              />
              
              <Btn texto={cargando ? "Guardando..." : "Guardar Proveedor"} onClick={agregarProveedor} type="button" className="add-proveedor-btn" disabled={cargando} />
            </div>
          </div>
        )}

        <div className="items-list-section">
          <h3>Lista de Proveedores</h3>
          {proveedores.length === 0 ? (
            <p className="empty-text">No hay proveedores registrados.</p>
          ) : (
            <div className="table-container">
              <table className="proveedores-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Servicio</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedores.map(prov => (
                    <tr key={prov.id_proveedor || prov.id || Date.now() + Math.random()}>
                      <td>{prov.nombre_proveedor}</td>
                      <td>{prov.telefono_proveedor}</td>
                      <td>{prov.correo_proveedor}</td>
                      <td>{prov.servicio_proveedor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CProveedores;
