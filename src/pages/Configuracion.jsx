import "./Configuracion.css";

const Configuracion = () => {
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
              <input type="text" placeholder="Tu nombre" />
            </div>
            <div className="form-group">
              <label>Correo institucional</label>
              <input type="email" placeholder="ejemplo@umad.edu.mx" disabled />
            </div>
            <button className="save-btn">Guardar Cambios</button>
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
