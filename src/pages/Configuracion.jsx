import { useState } from "react";
import "./Configuracion.css";

const Configuracion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const estaVinculado = !!(user?.google_refresh_token || user?.google_access_token);

  const manejarConexionGoogle = async () => {
    if (!user?.id_usuario) {
      return alert("Por favor inicia sesión primero.");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/eventos/google/url?id_usuario=${user.id_usuario}`
      );
      const datos = await response.json();

      if (datos.url) {
        window.location.href = datos.url;
      } else {
        alert("No se pudo generar la URL de autenticación.");
      }
    } catch (error) {
      console.error("Error al conectar con Google:", error);
      alert("Error de comunicación con el servidor del sistema.");
    }
  };

  return (
    <div className="config-page">
      <div className="config-header">
        <h1>Configuración</h1>
        <p>Administra las preferencias y ajustes de tu cuenta.</p>
      </div>

      <div className="config-content">
        <section className="config-section">
          <h2>Perfil de Usuario</h2>
          <div className="config-card">
            <div className="form-group">
              <label>Nombre completo</label>
              <input type="text" placeholder="Tu nombre" defaultValue={`${user?.nombre_usuario || ''} ${user?.apellidop_usuario || ''}`} />
            </div>
            <div className="form-group">
              <label>Correo institucional</label>
              <input type="email" placeholder="ejemplo@umad.edu.mx" defaultValue={user?.correo_usuario || ""} disabled />
            </div>
            <button className="save-btn">Guardar Cambios</button>
          </div>
        </section>

        {/*SECCIÓN ACTUALIZADA: INTEGRACIÓN OAUTH2 CON GOOGLE */}
        <section className="config-section">
          <h2>Integración con Google Calendar</h2>
          <div className="config-card">
            <p className="config-description" style={{ marginBottom: "1.5rem", color: "#64748b" }}>
              Sincroniza tus eventos directamente en tu cuenta institucional o personal. Al activarlo, cada vez que agendes un evento en el sistema, aparecerá reflejado en tu calendario de Google en tiempo real.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button 
                className={`save-btn ${estaVinculado ? "connected" : ""}`} 
                onClick={manejarConexionGoogle}
                style={{
                  backgroundColor: estaVinculado ? "#10b981" : "#0c1c3e",
                  color: "#ffffff"
                }}
              >
                {estaVinculado ? "🔄 Re-vincular Cuenta de Google" : "🔴 Vincular con Google Calendar"}
              </button>

              <span style={{ fontSize: "0.9rem", fontWeight: "600", color: estaVinculado ? "#10b981" : "#64748b" }}>
                Estado: {estaVinculado ? "✅ Sincronizado" : "❌ No vinculado"}
              </span>
            </div>
          </div>
        </section>

        <section className="config-section">
          <h2>Preferencias del Sistema</h2>
          <div className="config-card">
            <div className="toggle-group">
              <div className="toggle-info">
                <h3>Modo Oscuro</h3>
                <p>Cambia la apariencia del sistema a tonos oscuros.</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="toggle-group">
              <div className="toggle-info">
                <h3>Notificaciones por Correo</h3>
                <p>Recibe alertas sobre nuevos eventos y registros.</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Configuracion;