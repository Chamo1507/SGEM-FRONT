import { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">SGM</h2>
        <img
          src="./src/assets/brand/cropped-UMAD-512X512bb-1-192x192.png"
          alt="Logo"
          className="sidebar-logo-image"
        />
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* Menú Desplegable de Eventos */}
          <li className="nav-group">
            <div
              className={`nav-item has-dropdown ${isEventsOpen ? "open" : ""}`}
              onClick={() => setIsEventsOpen(!isEventsOpen)}
            >
              <div className="nav-item-content">
                <span className="icon"></span>
                Eventos
              </div>
              <span className="dropdown-arrow">▼</span>
            </div>

            {isEventsOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/eventos/registro"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Registro eventos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/eventos/invitados"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Registro invitados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/eventos/dashboard"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/configuracion"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="icon"></span>
              Configuración
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <span className="icon"></span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
