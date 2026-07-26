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
import { motion } from 'framer-motion';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#64748B', '#EF4444', '#3B82F6', '#8B5CF6'];

export const ChartCard = ({
  title,
  subtitle,
  type,
  data,
  dataKeys = [{ key: 'value', name: 'Value', color: '#2563EB' }],
  radarAngleKey = 'subject',
  pieKey = 'value',
  pieNameKey = 'name',
  height = 340,
  reversedYAxis = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="dash-card p-6 lg:p-7 flex flex-col justify-between bg-white"
    >
      <div className="mb-5">
        <h3 className="text-lg font-extrabold text-[#0F172A] tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-[#64748B] font-medium mt-1">{subtitle}</p>}
      </div>

      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={13} fontWeight={600} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={13} fontWeight={600} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '10px', color: '#0F172A', fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              {dataKeys.map((dk) => (
                <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color || '#2563EB'} radius={[6, 6, 0, 0]} />
              ))}
            </BarChart>
          ) : type === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="year" stroke="#64748B" fontSize={13} fontWeight={600} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={13} fontWeight={600} tickLine={false} reversed={reversedYAxis} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '10px', color: '#0F172A', fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}
                formatter={(val) => [reversedYAxis ? `Rank #${val}` : `${val}`, reversedYAxis ? 'Global Rank' : 'Metric Value']}
              />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              {dataKeys.map((dk) => (
                <Line
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color || '#2563EB'}
                  strokeWidth={3}
                  dot={{ r: 5, fill: dk.color || '#2563EB' }}
                  activeDot={{ r: 7 }}
                />
              ))}
            </LineChart>
          ) : type === 'radar' ? (
            <RadarChart outerRadius="75%" data={data}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey={radarAngleKey} stroke="#0F172A" fontSize={12} fontWeight={700} />
              <PolarRadiusAxis stroke="#64748B" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '10px', color: '#0F172A', fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}
              />
              {dataKeys.map((dk) => (
                <Radar key={dk.key} name={dk.name} dataKey={dk.key} stroke={dk.color || '#2563EB'} fill={dk.color || '#2563EB'} fillOpacity={0.25} />
              ))}
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
            </RadarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey={pieKey}
                nameKey={pieNameKey}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '10px', color: '#0F172A', fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
