import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TechnicalSkill } from '../../services/resume/resumeService';

interface SkillChartProps {
  skills: TechnicalSkill[];
}

export function SkillChart({ skills }: SkillChartProps) {
  // Map proficiency to a numerical value for chart
  const data = skills.map(skill => ({
    name: skill.name,
    level: skill.proficiency === 'Advanced' ? 3 : skill.proficiency === 'Intermediate' ? 2 : 1,
    proficiencyLabel: skill.proficiency
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 text-white p-3 rounded-lg text-sm shadow-xl border border-neutral-700">
          <p className="font-semibold">{label}</p>
          <p className="text-neutral-300 mt-1">{payload[0].payload.proficiencyLabel}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" domain={[0, 3]} hide />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
          <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.level === 3 ? '#4f46e5' : entry.level === 2 ? '#818cf8' : '#c7d2fe'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
