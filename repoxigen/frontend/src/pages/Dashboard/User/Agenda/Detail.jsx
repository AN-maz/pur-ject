import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; 
import { agendaService } from '../../../../services/agendaService';
import { Calendar, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';

const AgendaDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk form absen
  const [tokenAbsen, setTokenAbsen] = useState('');
  const [absenStatus, setAbsenStatus] = useState({ loading: false, message: '', isSuccess: false });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await agendaService.getAgendaById(id);
        if (res.status && res.data) {
          setAgenda(res.data);
        }
      } catch (error) {
        console.error("Error fetching agenda detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleAbsen = async (e) => {
    e.preventDefault();
    setAbsenStatus({ loading: true, message: '', isSuccess: false });
    try {
      await agendaService.absenAgenda(id, tokenAbsen);
      setAbsenStatus({ loading: false, message: 'Absen Berhasil!', isSuccess: true });
    } catch (error) {
      setAbsenStatus({ loading: false, message: error.message || 'Token Salah / Gagal Absen', isSuccess: false });
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Detail...</div>;
  if (!agenda) return <div className="p-8 text-center text-red-500">Agenda tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-oxigen-light transition-colors">
        <ArrowLeft size={20} /> Kembali
      </button>

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex gap-3 mb-4">
          <span className="px-3 py-1 bg-oxigen-light text-white text-xs font-bold rounded-full uppercase">
            {agenda.divisi?.nama_divisi || 'UMUM'}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">
            {agenda.kategori}
          </span>
        </div>

        <h1 className="text-3xl font-black text-gray-800 mb-4">{agenda.judul}</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{agenda.deskripsi}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-oxigen-light">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Tanggal & Waktu</p>
              <p className="font-bold text-gray-800">
                {new Date(agenda.tanggal).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-50 text-red-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Lokasi</p>
              <p className="font-bold text-gray-800">{agenda.lokasi}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Form Absen & Materi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Form Absen (1 Kolom) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Presensi Kehadiran</h3>
            
            {!agenda.is_absen_open ? (
              <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500 border border-gray-200">
                Sesi absensi belum dibuka atau sudah ditutup.
              </div>
            ) : absenStatus.isSuccess ? (
              <div className="p-6 bg-green-50 rounded-xl text-center border border-green-200">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                <p className="font-bold text-green-700">Kamu sudah absen!</p>
              </div>
            ) : (
              <form onSubmit={handleAbsen} className="space-y-4">
                {absenStatus.message && (
                  <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                    {absenStatus.message}
                  </p>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Token Absen</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan 6 digit token..."
                    value={tokenAbsen}
                    onChange={(e) => setTokenAbsen(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-oxigen-light text-center font-mono text-xl tracking-widest uppercase"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={absenStatus.loading}
                  className="w-full py-3 bg-oxigen-dark text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:bg-gray-400"
                >
                  {absenStatus.loading ? 'Memproses...' : 'Submit Kehadiran'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Kanan: Materi Markdown (2 Kolom) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Materi Kegiatan</h3>
            
            {agenda.konten_materi ? (
              // Ini keajaiban react-markdown. Class 'prose' (dari tailwind typography jika ada) 
              // membuat markdown terlihat seperti artikel blog sungguhan.
              <div className="prose prose-blue max-w-none prose-headings:font-bold prose-a:text-oxigen-light">
                <ReactMarkdown>{agenda.konten_materi}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                <p className="mt-2">Belum ada materi yang dilampirkan untuk kegiatan ini.</p>
              </div>
            )}
            
            {agenda.file_lampiran && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a href={agenda.file_lampiran} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-oxigen-light font-bold rounded-xl hover:bg-blue-100 transition-colors">
                  Unduh File Lampiran Tambahan
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgendaDetail;