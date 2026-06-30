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
          <h2>Integración con Google Calendar</h2>
          <div className="config-card">
            <p className="config-description" style={{marginBottom: "1rem"}}>
              Para que el sistema agende eventos en tu Google Calendar, por favor comparte tu calendario con nuestra cuenta de servicio: 
              <br/>
              <strong>nestjs-calendar@sgm-comunicacion.iam.gserviceaccount.com</strong>
              <br/><br/>
              Una vez compartido, ingresa tu correo de Google a continuación para vincularlo.
            </p>
            <div className="form-group">
              <label>ID de Google Calendar (Tu Correo Gmail)</label>
              <input 
                type="email" 
                placeholder="tu.correo@gmail.com" 
                id="gcal-input"
                defaultValue={JSON.parse(localStorage.getItem("user"))?.google_calendar_id || JSON.parse(localStorage.getItem("user"))?.correo_usuario || ""}
              />
            </div>
            <button className="save-btn" onClick={async () => {
              const email = document.getElementById("gcal-input").value;
              if (!email) return alert("Por favor ingresa un correo");
              const user = JSON.parse(localStorage.getItem("user"));
              if (!user?.id_usuario) return alert("Por favor inicia sesión primero");

              try {
                // Update in backend
                const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${user.id_usuario}/google-calendar`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ google_calendar_id: email })
                });
                if (response.ok) {
                  // Update local storage
                  user.google_calendar_id = email;
                  localStorage.setItem("user", JSON.stringify(user));
                  alert("Cuenta de Google Calendar vinculada exitosamente.");
                } else {
                  alert("Hubo un error al vincular la cuenta.");
                }
              } catch (error) {
                console.error(error);
                alert("Error de conexión con el servidor.");
              }
            }}>
              Vincular Google Calendar
            </button>
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
