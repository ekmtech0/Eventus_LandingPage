'use client';

import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XSquare,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', events: 400, users: 2400 },
  { name: 'Fev', events: 300, users: 1398 },
  { name: 'Mar', events: 600, users: 9800 },
  { name: 'Abr', events: 800, users: 3908 },
  { name: 'Mai', events: 500, users: 4800 },
  { name: 'Jun', events: 900, users: 3800 },
];

const stats = [
  { label: 'Total de Usuários', value: '1,284', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { label: 'Eventos Ativos', value: '86', change: '+5%', icon: Calendar, color: 'bg-purple-500' },
  { label: 'Aprovações Pendentes', value: '14', change: '-2', icon: Clock, color: 'bg-orange-500' },
  { label: 'Locais Registrados', value: '42', change: '+8%', icon: MapPin, color: 'bg-green-500' },
];

const recentEvents = [
  { id: '1', title: 'Verão Festival', status: 'Pending', date: '25 Mai, 2024', owner: 'Carlos Alberto' },
  { id: '2', title: 'Tech Conf 2024', status: 'Approved', date: '12 Out, 2024', owner: 'Tech Solutions' },
  { id: '3', title: 'Rock no Parque', status: 'Approved', date: '08 Jun, 2024', owner: 'Maria Silva' },
  { id: '4', title: 'Jazz Night', status: 'Cancelled', date: '02 Abr, 2025', owner: 'João Pedro' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-border shadow-none">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">
              {stat.value}
              {stat.label === 'Aprovações Pendentes' && <span className="text-amber-600 ml-2 text-sm font-medium">!</span>}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border flex flex-col shadow-none">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold">Growth Analytics</h3>
            <span className="text-[11px] text-primary font-bold cursor-pointer hover:underline">View Detailed Reports</span>
          </div>
          <div className="p-6 pt-10 w-full" style={{ minHeight: 320 }}>
            <ResponsiveContainer width="100%" height={320} minHeight={320}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #E5E7EB', 
                    boxShadow: 'none',
                    fontSize: '11px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#6D28D9" 
                  strokeWidth={2}
                  fillOpacity={0.05} 
                  fill="#6D28D9" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-border flex flex-col shadow-none">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-bold">Recent Submissions</h3>
          </div>
          <div className="p-0 flex-1 overflow-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {recentEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-foreground">{event.title}</p>
                      <p className="text-[10px] text-muted-foreground">{event.owner}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        event.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        event.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="flex gap-5">
        <div className="flex-1 p-5 lg:p-6 bg-indigo-50 border border-indigo-100 rounded-xl font-medium text-xs text-indigo-700">
           <strong>Security Alert:</strong> 4 new login attempts from unrecognized IP addresses. Review logs in settings.
        </div>
        <div className="flex-1 p-5 lg:p-6 bg-purple-50 border border-purple-100 rounded-xl font-medium text-xs text-purple-700">
          <strong>Operational Tip:</strong> Event moderation queue is currently lower than average. Auto-approval is active.
        </div>
      </div>
    </div>
  );
}
