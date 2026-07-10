import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventario.css';
import Btn from './btn';
import Input from './CInput';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({ nombre: '', cantidad: '', imagen: null });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id_rol > 2) {
      window.location.href = '/home';
    }
    fetchMateriales();
  }, []);

  const fetchMateriales = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/materiales`);
      setInventario(res.data.map(item => ({
        id: item.id_material,
        nombre: item.nombre_material,
        cantidad: item.cantidad_material,
        imagen: item.imagen_material
      })));
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoItem({ ...nuevoItem, imagen: reader.result }); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const agregarItem = async () => {
    if (!nuevoItem.nombre || !nuevoItem.cantidad) {
      alert("El nombre y la cantidad son obligatorios");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/materiales`, {
        nombre_material: nuevoItem.nombre,
        cantidad_material: Number(nuevoItem.cantidad),
        imagen_material: nuevoItem.imagen
      });
      setNuevoItem({ nombre: '', cantidad: '', imagen: null });
      setMostrarForm(false);
      fetchMateriales(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar material:", error);
      alert("Error al guardar el material");
    }
  };

  const eliminarItem = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este objeto del inventario?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/materiales/${id}`);
        fetchMateriales(); // Recargar lista
      } catch (error) {
        console.error("Error al eliminar material:", error);
        alert(error.response?.data?.message || "Error al eliminar el material");
      }
    }
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
          {loading ? (
            <p className="empty-text">Cargando inventario...</p>
          ) : inventario.length === 0 ? (
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
                    <button className="delete-item-btn" onClick={() => eliminarItem(item.id)} style={{marginTop: '10px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', width: '100%'}}>
                      Eliminar
                    </button>
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
