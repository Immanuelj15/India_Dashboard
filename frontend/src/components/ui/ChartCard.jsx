import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#0284c7', '#d97706', '#16a34a', '#6366f1', '#e11d48', '#0891b2', '#ca8a04'];

export const ChartCard = ({
  title,
  subtitle,
  type,
  data,
  dataKeys = [{ key: 'value', name: 'Value', color: '#0284c7' }],
  radarAngleKey = 'subject',
  pieKey = 'value',
  pieNameKey = 'name',
  height = 300,
  reversedYAxis = true,
}) => {
  return (
    <div className="glass-panel p-5 lg:p-6 rounded-3xl border border-slate-300 bg-white flex flex-col justify-between shadow-premium">
      <div className="mb-4">
        <h3 className="text-base font-black text-slate-950 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-700 font-bold mt-0.5">{subtitle}</p>}
      </div>

      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" stroke="#0f172a" fontSize={11} fontWeight="bold" />
              <YAxis stroke="#0f172a" fontSize={11} fontWeight="bold" />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#94a3b8', borderRadius: '0.75rem', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              {dataKeys.map((dk) => (
                <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[8, 8, 0, 0]} />
              ))}
            </BarChart>
          ) : type === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="year" stroke="#0f172a" fontSize={11} fontWeight="bold" />
              <YAxis stroke="#0f172a" fontSize={11} fontWeight="bold" reversed={reversedYAxis} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#94a3b8', borderRadius: '0.75rem', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                formatter={(val) => [reversedYAxis ? `Rank #${val}` : `${val}`, reversedYAxis ? 'Global Rank' : 'Metric Value']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              {dataKeys.map((dk) => (
                <Line
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color}
                  strokeWidth={3}
                  dot={{ r: 5, fill: dk.color }}
                  activeDot={{ r: 7 }}
                />
              ))}
            </LineChart>
          ) : type === 'radar' ? (
            <RadarChart outerRadius="75%" data={data}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey={radarAngleKey} stroke="#0f172a" fontSize={10} fontWeight="bold" />
              <PolarRadiusAxis stroke="#64748b" fontSize={9} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#94a3b8', borderRadius: '0.75rem', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              {dataKeys.map((dk) => (
                <Radar key={dk.key} name={dk.name} dataKey={dk.key} stroke={dk.color} fill={dk.color} fillOpacity={0.35} />
              ))}
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
            </RadarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={5}
                dataKey={pieKey}
                nameKey={pieNameKey}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#94a3b8', borderRadius: '0.75rem', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
