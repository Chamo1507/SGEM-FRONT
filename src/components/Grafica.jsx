import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dataBarras = [
  { mes: 'Enero', valor: 4200 },
  { mes: 'Febrero', valor: 3800 },
  { mes: 'Marzo', valor: 5100 },
  { mes: 'Abril', valor: 4700 },
  { mes: 'Mayo', valor: 6300 },
];

const dataPastel = [
  { name: 'Completados', value: 65, color: '#3b82f6' },
  { name: 'Pendientes', value: 35, color: '#ef4444' },
];

const Grafica = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard SGEM - Gráficas</h1>
      
      <h2>Gráfica de Barras - Progreso Mensual</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dataBarras}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: '40px' }}>Gráfica Circular - Estado de Tareas</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie 
            data={dataPastel} 
            cx="50%" 
            cy="50%" 
            outerRadius={150} 
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
  );
};

export default Grafica;