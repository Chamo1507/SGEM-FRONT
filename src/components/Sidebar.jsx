import { useState, useEffect } from "react";
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
  PackageIcon as Package,
} from "./Icons";

const Sidebar = () => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [userName, setUserName] = useState("Usuario");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRol(Number(user.id_rol));
    if (user.nombre_usuario) {
      setUserName(user.nombre_usuario);
    }
  }, []);

  // Root = 1, Admin = 2, Coord = 3, Invitado = 4
  const canViewHome = true; // Todos los roles ven home
  const canViewEventosList = userRol === 1 || userRol === 2 || userRol === 3;
  const canViewDashboard = userRol === 1 || userRol === 3;
  const canViewAsistencia = userRol === 1 || userRol === 3 || userRol === 4;
  const canViewEncuestaInvitado = userRol === 1 || userRol === 4;
  const canViewEncuestaOrganizador = userRol === 1 || userRol === 3;
  const canViewConfiguracion = userRol === 1 || userRol === 2;
  const canViewInventario = userRol === 1 || userRol === 2;
  const canViewProveedores = userRol === 1 || userRol === 2 || userRol === 3 || userRol === 4;

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
          {canViewHome && (
            <li>
              <NavLink
                to="/home"
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
          )}

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
                {canViewEventosList && (
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
                )}
                {canViewDashboard && (
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
                )}
                {canViewAsistencia && (
                  <li>
                    <NavLink
                      to="/eventos/confirmar"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      <Users size={18} className="dropdown-icon" />
                      <span className="nav-text">Asistencia</span>
                    </NavLink>
                  </li>
                )}
                {canViewEncuestaInvitado && (
                  <li>
                    <NavLink
                      to="/eventos/encuesta-invitado"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      <Users size={18} className="dropdown-icon" />
                      <span className="nav-text">Encuesta Invitado</span>
                    </NavLink>
                  </li>
                )}
                {canViewEncuestaOrganizador && (
                  <li>
                    <NavLink
                      to="/eventos/encuesta-organizador"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      <Settings size={18} className="dropdown-icon" />
                      <span className="nav-text">Encuesta Organizador</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </li>

          {canViewInventario && (
            <li>
              <NavLink
                to="/eventos/inventario"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <div className="nav-item-content">
                  <Package className="icon" size={24} />
                  <span className="nav-text">Inventario</span>
                </div>
              </NavLink>
            </li>
          )}

          {canViewInventario && (
            <li>
              <NavLink
                to="/eventos/proveedores"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <div className="nav-item-content">
                  <Users className="icon" size={24} />
                  <span className="nav-text">Proveedores</span>
                </div>
              </NavLink>
            </li>
          )}

          {canViewConfiguracion && (
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
          )}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <Users className="icon" size={20} />
          </div>
          <div className="user-info">
            <span className="nav-text user-name">{userName}</span>
          </div>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          <LogOut className="icon" size={24} />
          <span className="nav-text">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
