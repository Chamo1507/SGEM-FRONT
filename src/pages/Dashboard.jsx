import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dataBarras = [
  { mes: 'Enero', valor: 4200, completados: 2800 },
  { mes: 'Febrero', valor: 3800, completados: 3100 },
  { mes: 'Marzo', valor: 5100, completados: 4200 },
  { mes: 'Abril', valor: 4700, completados: 3900 },
  { mes: 'Mayo', valor: 6300, completados: 5800 },
];

const dataPastel = [
  { name: 'Completados', value: 65, color: '#10b981' },
  { name: 'Pendientes', value: 35, color: '#ef4444' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard SGEM - Resumen de Eventos</h1>

      {/* Resumen Cards */}
      <div className="cards-container">
        <div className="card">
          <h3>Total Eventos</h3>
          <h2>248</h2>
        </div>
        <div className="card">
          <h3>Eventos Completados</h3>
          <h2>162</h2>
        </div>
        <div className="card">
          <h3>Eventos Pendientes</h3>
          <h2>86</h2>
        </div>
      </div>

      {/* Gráficas */}
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Progreso Mensual</h2>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={dataBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#60a5fa" name="Total" />
              <Bar dataKey="completados" fill="#34d399" name="Completados" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Estado General de Eventos</h2>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={dataPastel}
                cx="50%"
                cy="50%"
                outerRadius={130}
                dataKey="value"
                label
              >
                {dataPastel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;