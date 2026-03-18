import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { agendaService } from '../../../../services/agendaService';
import { ArrowLeft, Edit, Trash2, Users, Power, X } from 'lucide-react';

const AdminAgendaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agenda, setAgenda] = useState(null);
  const [pesertaAbsen, setPesertaAbsen] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const fetchDetail = async () => {
    try {
      const [resAgenda, resPeserta] = await Promise.all([
        agendaService.getAgendaById(id),
        agendaService.getParticipants(id)
      ]);

      if (resAgenda.status && resAgenda.data) {
        setAgenda(resAgenda.data);
        setEditFormData({
          judul: resAgenda.data.judul,
          deskripsi: resAgenda.data.deskripsi,
          lokasi: resAgenda.data.lokasi,
          konten_materi: resAgenda.data.konten_materi || '',
          tanggal: new Date(resAgenda.data.tanggal).toISOString().slice(0, 16)
        });
      }

      if (resPeserta) {
        setPesertaAbsen(
          resPeserta.peserta ||
          resPeserta.data?.peserta ||
          []
        );
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  // TOGGLE ABSEN
  const handleToggleAbsen = async () => {
    try {
      const newStatus = !agenda.is_absen_open;
      await agendaService.editAgenda(id, { is_absen_open: newStatus });
      setAgenda({ ...agenda, is_absen_open: newStatus });
    } catch (error) {
      alert("Gagal mengubah status absensi");
    }
  };


  const handleKickAnggota = async (id_absensi, nama_peserta) => {
    const isConfirm = window.confirm(
      `Yakin ingin menghapus absensi atas nama ${nama_peserta}?`
    );
    if (!isConfirm) return;

    try {
      await agendaService.kickAnggota(id_absensi);
      const updatedPeserta = pesertaAbsen.filter(
        item => item.id_absensi !== id_absensi
      );
      setPesertaAbsen(updatedPeserta);
      alert("Berhasil menghapus peserta!");
    } catch (error) {
      console.error("Detail Error Kick:", error);
      alert(`Gagal: ${error.message || "Server Error"}`);
    }
  };

  // SAVE EDIT
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...editFormData,
        tanggal: new Date(editFormData.tanggal).toISOString()
      };

      await agendaService.editAgenda(id, payload);
      alert("Agenda berhasil diperbarui!");
      setIsEditModalOpen(false);
      fetchDetail();
    } catch (error) {
      alert(error.message || "Gagal mengupdate agenda");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Detail Agenda...</div>;
  if (!agenda) return <div className="p-8 text-center text-red-500">Data tidak ditemukan.</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* BACK & EDIT */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-oxigen-light font-bold"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-5 py-2 bg-oxigen-dark text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-900 transition-colors"
        >
          <Edit size={16} /> Edit Agenda
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* KOLOM KIRI */}
        <div className="lg:col-span-1 space-y-6">

          {/* INFO */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 text-xs font-bold uppercase rounded-full inline-flex items-center gap-1 ${agenda.is_absen_open
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}
              >
                {agenda.is_absen_open ? 'Absen Terbuka' : 'Absen Ditutup'}
              </span>

              <button
                onClick={handleToggleAbsen}
                className={`p-2 rounded-full transition-colors ${agenda.is_absen_open
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
              >
                <Power size={18} />
              </button>
            </div>

            <h1 className="text-2xl font-black text-gray-800 mb-2">
              {agenda.judul}
            </h1>

            <p className="text-gray-500 text-sm mb-4">
              {agenda.deskripsi}
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 text-center">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                Token Absensi
              </p>
              <p className="text-2xl font-mono font-black tracking-widest text-oxigen-dark">
                {agenda.token_absen}
              </p>
            </div>
          </div>

          {/* LIST PESERTA */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Users size={18} /> Hadir ({pesertaAbsen.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {pesertaAbsen.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  Belum ada yang absen.
                </div>
              ) : (
                <ul className="space-y-1">
                  {pesertaAbsen.map((p) => (
                    <li
                      key={p.id_absensi}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl group transition-colors"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {p.nama}
                        </p>
                        <p className="text-xs text-gray-500">
                          {p.jurusan} •{' '}
                          {new Date(p.waktu_absen).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} WIB
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleKickAnggota(p.id_absensi, p.nama)
                        }
                        className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN MARKDOWN */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[740px] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Preview Materi (Membaca Tampilan User)
            </h3>

            {agenda.konten_materi ? (
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown>
                  {agenda.konten_materi}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Belum ada materi yang dilampirkan.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAgendaDetail;