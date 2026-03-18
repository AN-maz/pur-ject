import React, { useEffect, useState } from 'react';
import { userService } from '../../../services/userService';
import { AlertCircle, CheckCircle, Crown, Cpu, Code, Gamepad2, User } from 'lucide-react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch Data User saat Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getProfile();
        if (res.status) {
          setUser(res.data);
        }
      } catch (err) {
        setError(err.message || 'Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  let themeColor = 'bg-oxigen-light'; 
  let iconDivisi = <User size={40} className="text-white" />;
  let gradientBg = 'from-oxigen-dark to-oxigen-light';


  const namaDivisi = user?.peminatan?.nama_divisi?.toLowerCase() || '';

  if (namaDivisi.includes('software')) {
    themeColor = 'bg-software-tosca';
    gradientBg = 'from-green-900 to-software-teal';
    iconDivisi = <Code size={40} className="text-white" />;
  } else if (namaDivisi.includes('hardware')) {
    themeColor = 'bg-hardware-cyan';
    gradientBg = 'from-blue-900 to-hardware-royal';
    iconDivisi = <Cpu size={40} className="text-white" />;
  } else if (namaDivisi.includes('game')) {
    themeColor = 'bg-game-red';
    gradientBg = 'from-purple-900 to-game-pink';
    iconDivisi = <Gamepad2 size={40} className="text-white" />;
  }

  // 3. Tentukan Konten Berdasarkan Status
  const isBPH = user?.status_keanggotaan === 'bph' || user?.jabatan_struktural_id !== null;
  const isAktif = user?.status_keanggotaan === 'aktif';
  const isPasif = user?.status_keanggotaan === 'pasif';

  return (
    <div className="space-y-8">
      
      {/* --- HERO CARD (Tema Mengikuti Divisi) --- */}
      <div className={`relative rounded-3xl overflow-hidden p-8 text-white shadow-xl bg-gradient-to-r ${gradientBg}`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar / Icon Divisi */}
          <div className={`p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner`}>
            {iconDivisi}
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black tracking-tight mb-1">Halo, {user?.nama_lengkap}!</h1>
            <p className="text-blue-100 text-lg opacity-90">
              {user?.nim} • {user?.jurusan}
            </p>
            
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              {/* Badge Divisi */}
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider border border-white/20">
                {user?.peminatan?.nama_divisi || 'Belum Ada Divisi'}
              </span>

              {/* Badge Status */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1
                ${isBPH ? 'bg-yellow-500/80 text-white' : 
                  isAktif ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-gray-200'}
              `}>
                {isBPH && <Crown size={12} />}
                {isAktif && <CheckCircle size={12} />}
                {user?.status_keanggotaan}
              </span>
            </div>
          </div>
        </div>

        {/* Dekorasi Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>


      {/* --- DASHBOARD CONTENT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* KONTEN KHUSUS PASIF */}
        {isPasif && (
          <div className="col-span-full bg-orange-50 border border-orange-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-800">Status Keanggotaan: Pasif</h3>
              <p className="text-orange-700 mt-1 text-sm leading-relaxed">
                Halo Calon Anggota! Saat ini statusmu masih <b>Pasif</b>. 
                Silakan ikuti kegiatan <b>First Gathering</b> dan selesaikan tantangan awal divisimu 
                untuk menjadi Anggota Aktif.
              </p>
              <button className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors">
                Lihat Jadwal First Gathering
              </button>
            </div>
          </div>
        )}

        {/* KONTEN KHUSUS BPH */}
        {isBPH && (
          <div className="col-span-full md:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Crown size={20} className="text-yellow-500" />
              Panel Pengurus (BPH)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Total Anggota Divisi</p>
                <p className="text-2xl font-black text-oxigen-dark mt-1">24</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Proker Berjalan</p>
                <p className="text-2xl font-black text-oxigen-dark mt-1">3</p>
              </div>
            </div>
          </div>
        )}

        {/* KONTEN User Info */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
           <h3 className="text-gray-500 text-xs font-bold uppercase mb-4">Biodata Singkat</h3>
           <ul className="space-y-4 text-sm">
             <li className="flex justify-between border-b border-gray-50 pb-2">
               <span className="text-gray-400">Angkatan</span>
               <span className="font-semibold text-gray-700">{user?.angkatan}</span>
             </li>

             {/* <li className="flex justify-between border-b border-gray-50 pb-2">
               <span className="text-gray-400">Email</span>
               <span className="font-semibold text-gray-700 truncate max-w-[150px]" title={user?.email}>{user?.email}</span>
             </li> */}
             
             <li className="flex justify-between">
               <span className="text-gray-400">Bergabung Sejak</span>
               <span className="font-semibold text-gray-700">
                 {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
               </span>
             </li>
           </ul>
        </div>
        
        {/* Konten Tambahan (Contoh: Absensi Terakhir) */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <div className={`w-12 h-12 rounded-full ${themeColor} flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-100`}>
               <CheckCircle size={20} />
            </div>
            <h3 className="font-bold text-gray-800">Absensi Kegiatan</h3>
            <p className="text-xs text-gray-400 mt-1">Belum ada kegiatan minggu ini.</p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;