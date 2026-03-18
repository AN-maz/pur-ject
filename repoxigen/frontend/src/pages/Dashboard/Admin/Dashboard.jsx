// src/pages/Dashboard/Admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { userService } from '../../../services/userService';
import { ShieldAlert, Users, CalendarDays } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getProfile();
        if (res.status) setUser(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Dashboard Admin...</div>;

  // LOGIKA TEMA BERDASARKAN divisi_peminatan_id
  let gradientBg = 'from-oxigen-dark to-oxigen-light'; // Default
  let divisionName = 'Divisi Umum';

  if (user?.divisi_peminatan_id === 2) {
    gradientBg = 'from-green-900 to-software-teal';
    divisionName = 'Software Engineering';
  } else if (user?.divisi_peminatan_id === 3) {
    gradientBg = 'from-blue-900 to-hardware-royal';
    divisionName = 'Hardware & IoT';
  } else if (user?.divisi_peminatan_id === 4) {
    gradientBg = 'from-purple-900 to-game-pink';
    divisionName = 'Game Development';
  }

  return (
    <div className="space-y-6">
      {/* Banner Admin */}
      <div className={`relative rounded-3xl overflow-hidden p-8 text-white shadow-xl bg-gradient-to-r ${gradientBg}`}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert size={28} className="text-white/80" />
            <h1 className="text-3xl font-black tracking-tight">Admin Divisi</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">
            Selamat datang, <b>{user?.nama_lengkap}</b>. Anda mengelola divisi <b>{divisionName}</b>.
          </p>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider border border-white/20">
            Akses Panel Terverifikasi
          </span>
        </div>
      </div>

      {/* Quick Stats Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-oxigen-light rounded-xl"><Users size={24} /></div>
          <div>
            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Anggota Divisi</h3>
            <p className="text-3xl font-black text-gray-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-red-50 text-red-500 rounded-xl"><CalendarDays size={24} /></div>
          <div>
            <h3 className="text-gray-500 text-sm font-bold uppercase">Agenda Aktif</h3>
            <p className="text-3xl font-black text-gray-800">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;