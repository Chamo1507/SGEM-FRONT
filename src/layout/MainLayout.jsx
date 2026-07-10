import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./MainLayout.css";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotificaciones = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id_usuario) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/notificaciones/usuario/${user.id_usuario}`);
        setNotificaciones(res.data.map(n => ({
          id: n.id_notificacion,
          titulo: n.titulo_notificacion || 'Notificación',
          mensaje: n.mensaje_notificacion || '',
          leida: n.estatus_notificacion === 'Leida',
          tiempo: new Date(n.fechaenvio_notificacion).toLocaleDateString()
        })));
      }
    } catch (error) {
      console.error("Error fetching notificaciones:", error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, []);

  // Cerrar panel si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const marcarComoLeidas = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id_usuario) {
        await axios.patch(`${import.meta.env.VITE_API_URL}/notificaciones/usuario/${user.id_usuario}/leidas`);
        fetchNotificaciones();
      }
    } catch (error) {
      console.error("Error al marcar como leídas:", error);
    }
  };

  const handleNotificationClick = (notif) => {
    if (notif.titulo.toLowerCase().includes("invitaci")) {
      setShowNotifications(false);
      navigate("/eventos/confirmar");
    }
  };

  const unreadCount = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <header className="topbar">
          <div className="topbar-spacer"></div>
          <div className="topbar-right" ref={panelRef}>
            <button 
              className="notification-btn" 
              aria-label="Notificaciones"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) fetchNotificaciones();
              }}
            >
              <span className="bell-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown animation-fade-in">
                <div className="notifications-header">
                  <h3>Notificaciones</h3>
                  <button className="mark-read-btn" onClick={marcarComoLeidas}>Marcar todas como leídas</button>
                </div>
                <div className="notifications-list">
                  {notificaciones.length === 0 ? (
                    <p style={{ padding: '10px', textAlign: 'center', color: '#666' }}>No tienes notificaciones.</p>
                  ) : (
                    notificaciones.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.leida ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notif)}
                        style={{ cursor: notif.titulo.toLowerCase().includes("invitaci") ? "pointer" : "default" }}
                      >
                        <div className="notification-icon">
                          {notif.titulo.toLowerCase().includes("invitaci") ? "📩" : 
                           notif.titulo.toLowerCase().includes("cancelado") ? "🚨" : "🔔"}
                        </div>
                        <div className="notification-content">
                          <h4>{notif.titulo}</h4>
                          <p>{notif.mensaje}</p>
                          <span className="notification-time">{notif.tiempo}</span>
                        </div>
                        {!notif.leida && <div className="unread-dot"></div>}
                      </div>
                    ))
                  )}
                </div>
                <div className="notifications-footer">
                  <button>Ver todas las notificaciones</button>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
