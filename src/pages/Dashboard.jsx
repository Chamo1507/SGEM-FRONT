import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

const CalendarIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const CalendarPlusIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="19" x2="19" y1="16" y2="22"/><line x1="16" x2="22" y1="19" y2="19"/></svg>
);

const UsersIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

// Datos Harcodeados
const metrics = {
  eventosSemana: 3,
  eventosAno: 45,
  asistentesTotales: 1250,
};

const chartData = [
  { name: "Ene", eventos: 2 },
  { name: "Feb", eventos: 4 },
  { name: "Mar", eventos: 3 },
  { name: "Abr", eventos: 6 },
  { name: "May", eventos: 5 },
  { name: "Jun", eventos: 8 },
  { name: "Jul", eventos: 4 },
  { name: "Ago", eventos: 2 },
  { name: "Sep", eventos: 7 },
  { name: "Oct", eventos: 5 },
  { name: "Nov", eventos: 9 },
  { name: "Dic", eventos: 6 },
];

const eventosRecientes = [
  {
    id: 1,
    nombre: "Conferencia Anual de Tecnología",
    fecha: "28 Jun 2026",
    asistentes: 300,
    estado: "proximo",
  },
  {
    id: 2,
    nombre: "Taller de Liderazgo",
    fecha: "15 Jun 2026",
    asistentes: 45,
    estado: "completado",
  },
  {
    id: 3,
    nombre: "Simposio de Salud Mental",
    fecha: "05 Jul 2026",
    asistentes: 150,
    estado: "proximo",
  },
  {
    id: 4,
    nombre: "Feria de Emprendimiento",
    fecha: "10 May 2026",
    asistentes: 500,
    estado: "completado",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard de Eventos</h1>
        <p>Resumen general de las actividades y eventos programados.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">
            <CalendarPlusIcon size={24} />
          </div>
          <p className="metric-title">Eventos esta semana</p>
          <h2 className="metric-value">{metrics.eventosSemana}</h2>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon red">
            <CalendarIcon size={24} />
          </div>
          <p className="metric-title">Eventos este año</p>
          <h2 className="metric-value">{metrics.eventosAno}</h2>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">
            <UsersIcon size={24} />
          </div>
          <p className="metric-title">Asistentes Totales</p>
          <h2 className="metric-value">{metrics.asistentesTotales}</h2>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <h2 className="section-title">Frecuencia de Eventos (Año Actual)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEventos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c1c3e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0c1c3e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: '#0c1c3e', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="eventos" stroke="#0c1c3e" strokeWidth={3} fillOpacity={1} fill="url(#colorEventos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="table-section">
          <h2 className="section-title">Eventos Recientes</h2>
          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Nombre del Evento</th>
                  <th>Fecha</th>
                  <th>Asistentes</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {eventosRecientes.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.nombre}</td>
                    <td>{evento.fecha}</td>
                    <td>{evento.asistentes}</td>
                    <td>
                      <span className={`status-badge ${evento.estado}`}>
                        {evento.estado === 'proximo' ? 'Próximo' : 'Completado'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/eventos/reporte/${evento.id}`} className="btn-report">
                        Ver Reporte
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;