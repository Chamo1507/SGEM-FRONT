import React, { useState } from 'react';
import './Inventario.css';
import Btn from './btn';
import Input from './CInput';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({ nombre: '', cantidad: '', imagen: null });
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNuevoItem({ ...nuevoItem, imagen: URL.createObjectURL(file) });
    }
  };

  const agregarItem = () => {
    if (!nuevoItem.nombre || !nuevoItem.cantidad) {
      alert("El nombre y la cantidad son obligatorios");
      return;
    }
    setInventario([...inventario, { ...nuevoItem, id: Date.now() }]);
    setNuevoItem({ nombre: '', cantidad: '', imagen: null });
    setMostrarForm(false);
  };

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <div>
          <h1>Inventario</h1>
          <p>Gestiona los objetos y materiales del inventario.</p>
        </div>
        <button 
          className={mostrarForm ? "btn-toggle-form active" : "btn-toggle-form"}
          onClick={() => setMostrarForm(!mostrarForm)} 
        >
          {mostrarForm ? '← Volver a la Lista' : '+ Agregar Objeto'}
        </button>
      </div>

      <div className="inventario-content">
        {mostrarForm && (
          <div className="add-item-section animation-fade-in">
            <h3>Agregar Objeto al Inventario</h3>
            <div className="add-item-form">
              <Input 
                label="Nombre del Objeto" 
                placeholder="Ej.: Proyector" 
                value={nuevoItem.nombre} 
                onChange={(e) => setNuevoItem({ ...nuevoItem, nombre: e.target.value })}
              />
              <Input 
                label="Cantidad" 
                type="number" 
                placeholder="Ej.: 10" 
                value={nuevoItem.cantidad} 
                onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: e.target.value })}
              />
              <div className="file-input-wrapper">
                <label className="file-label">Imagen del Objeto</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
              </div>
              
              <Btn texto="Guardar" onClick={agregarItem} type="button" className="add-inventario-btn" />
            </div>
          </div>
        )}

        <div className="items-list-section">
          <h3>Objetos en Inventario</h3>
          {inventario.length === 0 ? (
            <p className="empty-text">No hay objetos en el inventario.</p>
          ) : (
            <div className="cards-grid">
              {inventario.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-image-container">
                    {item.imagen ? (
                      <img src={item.imagen} alt={item.nombre} className="item-image" />
                    ) : (
                      <div className="item-no-image">Sin Imagen</div>
                    )}
                  </div>
                  <div className="item-details">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: <strong>{item.cantidad}</strong></p>
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

export default Inventario;
