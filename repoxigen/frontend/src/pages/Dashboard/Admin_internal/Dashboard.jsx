import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService'
import { Users, UserCheck, Clock, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const InternalDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [angkatan, setAngkatan] = useState('all');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await adminService.getDashboardStats(angkatan);
        if (res.status && res.data) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Gagal load stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [angkatan]); 

  if (loading && !stats) return <div className="p-8 text-center text-gray-500 font-bold">Memuat Analitik Data...</div>;


  const angkatanOptions = [];
  if (stats?.filter_angkatan) {
    for (let i = stats.filter_angkatan.terlama; i <= stats.filter_angkatan.terbaru; i++) {
      angkatanOptions.push(i);
    }
  }


  const COLORS = {
    pasif: '#94a3b8', 
    aktif: '#3b82f6', 
    bph: '#10b981'    
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Dashboard Internal</h1>
          <p className="text-gray-500 text-sm">Visualisasi status keanggotaan UKM OXIGEN.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-oxigen-light rounded-xl">
            <Filter size={20} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Filter Angkatan</label>
            <select 
              value={angkatan} 
              onChange={(e) => setAngkatan(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-oxigen-light cursor-pointer min-w-[150px]"
            >
              <option value="all">Semua Angkatan</option>
              {angkatanOptions.map(year => (
                <option key={year} value={year}>Angkatan {year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Total Users */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <h3 className="text-gray-400 text-sm font-bold uppercase mb-1">Total Anggota Terdaftar</h3>
            <p className="text-4xl font-black text-gray-800">{stats?.total_users || 0}</p>
          </div>
          <div className="p-4 bg-blue-50 text-oxigen-light rounded-2xl group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
        </div>

        {/* Card Pending Approval */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-3xl shadow-lg flex items-center justify-between text-white group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 opacity-10"><Clock size={120} /></div>
          
          <div className="relative z-10">
            <h3 className="text-white/80 text-sm font-bold uppercase mb-1">Menunggu Persetujuan</h3>
            <p className="text-4xl font-black">{stats?.pending_approval || 0}</p>
            {stats?.pending_approval > 0 && (
              <p className="text-xs mt-2 bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                Perlu ditinjau di Manage Akun
              </p>
            )}
          </div>
          <div className="p-4 bg-white/20 rounded-2xl relative z-10 group-hover:rotate-12 transition-transform">
            <UserCheck size={32} />
          </div>
        </div>

      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
          Visualisasi Status Anggota {angkatan !== 'all' ? `(Angkatan ${angkatan})` : '(Semua Angkatan)'}
        </h3>
        
        {stats?.chart_data && stats.chart_data.length > 0 ? (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.chart_data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80} 
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="jumlah"
                  nameKey="status"
                  label={({ status, percent }) => `${status.toUpperCase()} (${(percent * 100).toFixed(0)}%)`}
                >
                  {stats.chart_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.status.toLowerCase()] || '#cbd5e1'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Orang`, 'Jumlah']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-100 rounded-2xl">
            Tidak ada data untuk angkatan ini.
          </div>
        )}
      </div>

    </div>
  );
};

export default InternalDashboard;