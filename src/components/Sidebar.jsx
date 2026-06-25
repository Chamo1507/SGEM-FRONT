import { useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/brand/cropped-UMAD-512X512bb-1-192x192.png";
import {
  CalendarIcon as Calendar,
  CalendarPlusIcon as CalendarPlus,
  UsersIcon as Users,
  LayoutDashboardIcon as LayoutDashboard,
  SettingsIcon as Settings,
  LogOutIcon as LogOut,
  ChevronDownIcon as ChevronDown,
  HomeIcon as Home,
} from "./Icons";

const Sidebar = () => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div
        className="sidebar-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={logoImg}
          alt="Logo"
          className="sidebar-logo-image"
          title="Toggle Sidebar"
        />
        <h2 className="sidebar-logo">SGM</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <div className="nav-item-content">
                <Home className="icon" size={24} />
                <span className="nav-text">Inicio</span>
              </div>
            </NavLink>
          </li>

          {/* Menú Desplegable de Eventos */}
          <li className="nav-group">
            <div
              className={`nav-item has-dropdown ${isEventsOpen ? "open" : ""}`}
              onClick={() => {
                if (isCollapsed) setIsCollapsed(false);
                setIsEventsOpen(!isEventsOpen);
              }}
            >
              <div className="nav-item-content">
                <Calendar className="icon" size={24} />
                <span className="nav-text">Eventos</span>
              </div>
              <ChevronDown className="dropdown-arrow" size={16} />
            </div>

            {isEventsOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/eventos/proximos"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    <CalendarPlus size={18} className="dropdown-icon" />
                    <span className="nav-text">Eventos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/eventos/dashboard"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    <LayoutDashboard size={18} className="dropdown-icon" />
                    <span className="nav-text">Dashboard</span>
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
              <div className="nav-item-content">
                <Settings className="icon" size={24} />
                <span className="nav-text">Configuración</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate("/login")}>
          <LogOut className="icon" size={24} />
          <span className="nav-text">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
