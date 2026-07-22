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

const COLORS = ['#3b82f6', '#ff9933', '#10b981', '#8b5cf6', '#f43f5e', '#06b6d4', '#eab308'];

export const ChartCard = ({
  title,
  subtitle,
  type,
  data,
  dataKeys = [{ key: 'value', name: 'Value', color: '#3b82f6' }],
  radarAngleKey = 'subject',
  pieKey = 'value',
  pieNameKey = 'name',
  height = 300,
}) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-surface-border flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-100">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.75rem', color: '#f3f4f6' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {dataKeys.map((dk) => (
                <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[6, 6, 0, 0]} />
              ))}
            </BarChart>
          ) : type === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} reversed={true} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.75rem', color: '#f3f4f6' }}
                formatter={(val) => [`Rank #${val}`, 'Global Rank']}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
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
              <PolarGrid stroke="#2d3748" />
              <PolarAngleAxis dataKey={radarAngleKey} stroke="#9ca3af" fontSize={10} />
              <PolarRadiusAxis stroke="#4b5563" fontSize={9} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.75rem', color: '#f3f4f6' }}
              />
              {dataKeys.map((dk) => (
                <Radar key={dk.key} name={dk.name} dataKey={dk.key} stroke={dk.color} fill={dk.color} fillOpacity={0.4} />
              ))}
              <Legend wrapperStyle={{ fontSize: '12px' }} />
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
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.75rem', color: '#f3f4f6' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
