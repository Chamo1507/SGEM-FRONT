import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./MainLayout.css";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const panelRef = useRef(null);

  const notificaciones = [
    {
      id: 1,
      titulo: "Nueva invitación de asistencia",
      mensaje: "Has sido invitado como VIP a la Conferencia Anual de Tecnología. Por favor confirma tu lugar.",
      tiempo: "Hace 5 min",
      leida: false
    },
    {
      id: 2,
      titulo: "Evento cancelado",
      mensaje: "El Taller de Liderazgo Estudiantil ha sido suspendido temporalmente por el organizador.",
      tiempo: "Hace 2 horas",
      leida: true
    },
    {
      id: 3,
      titulo: "Recordatorio de evento",
      mensaje: "Mañana es el Simposio de Salud Mental a las 09:00 AM. ¡No faltes!",
      tiempo: "Hace 1 día",
      leida: true
    }
  ];

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
              onClick={() => setShowNotifications(!showNotifications)}
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
                  <button className="mark-read-btn">Marcar todas como leídas</button>
                </div>
                <div className="notifications-list">
                  {notificaciones.map((notif) => (
                    <div key={notif.id} className={`notification-item ${!notif.leida ? 'unread' : ''}`}>
                      <div className="notification-icon">
                        {notif.titulo.includes("invitación") ? "📩" : 
                         notif.titulo.includes("cancelado") ? "🚨" : "🔔"}
                      </div>
                      <div className="notification-content">
                        <h4>{notif.titulo}</h4>
                        <p>{notif.mensaje}</p>
                        <span className="notification-time">{notif.tiempo}</span>
                      </div>
                      {!notif.leida && <div className="unread-dot"></div>}
                    </div>
                  ))}
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
