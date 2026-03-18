import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { agendaService } from '../../../../services/agendaService';
import { userService } from '../../../../services/userService';
import { Plus, Edit, Trash2, X, Eye } from 'lucide-react';

const AdminAgendaList = () => {
    const navigate = useNavigate();
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State baru untuk menyimpan profil admin yang paling valid
    const [adminProfile, setAdminProfile] = useState(null);

    const [formData, setFormData] = useState({
        judul: '', deskripsi: '', kategori: 'pelatihan',
        tanggal: '', lokasi: '', konten_materi: '', token_absen: ''
    });

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            // 1. Ambil Profil Admin (Paling Akurat)
            const profileRes = await userService.getProfile();
            const profileData = profileRes.data;
            setAdminProfile(profileData);

            // 2. Ambil List Agenda
            const agendaRes = await agendaService.getAllAgendas();
            if (agendaRes.status && agendaRes.data) {
                // Filter menggunakan ID dari profil asli
                const filteredAgendas = agendaRes.data.filter(
                    (agenda) => Number(agenda.id_divisi) === Number(profileData.divisi_peminatan_id)
                );
                setAgendas(filteredAgendas);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const generateToken = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';
        for (let i = 0; i < 6; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, token_absen: token }));
    };

    const setWaktuSekarang = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setFormData(prev => ({ ...prev, tanggal: now.toISOString().slice(0, 16) }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateAgenda = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Pastikan id_divisi diambil dari adminProfile
            const payload = {
                ...formData,
                id_divisi: Number(adminProfile.divisi_peminatan_id), // Pastikan jadi Number
                tanggal: new Date(formData.tanggal).toISOString()
            };

            console.log("Payload dikirim:", payload); // Debugging

            await agendaService.createAgenda(payload);
            alert('Agenda berhasil dibuat!');
            setIsModalOpen(false);

            // Refresh data
            fetchInitialData();

            setFormData({ judul: '', deskripsi: '', kategori: 'pelatihan', tanggal: '', lokasi: '', konten_materi: '', token_absen: '' });
        } catch (error) {
            alert(error.message || 'Gagal membuat agenda');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Agenda</h1>
                    <p className="text-gray-500 text-sm">Kelola kegiatan untuk divisi Anda.</p>
                </div>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        generateToken();
                    }}
                    className="flex items-center gap-2 bg-oxigen-dark text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-900 transition-colors"
                >
                    <Plus size={18} /> Buat Agenda Baru
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase">
                                <th className="p-4 font-bold">Judul Kegiatan</th>
                                <th className="p-4 font-bold">Tanggal</th>
                                <th className="p-4 font-bold">Token</th>
                                <th className="p-4 font-bold text-center">Status Absen</th>
                                <th className="p-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                            ) : agendas.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Belum ada agenda di divisi ini.</td></tr>
                            ) : (
                                agendas.map((agenda) => (
                                    <tr key={agenda.id_agenda} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800 line-clamp-1">{agenda.judul}</p>
                                            <p className="text-xs text-gray-500 capitalize">{agenda.kategori} • {agenda.lokasi}</p>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {new Date(agenda.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </td>
                                        <td className="p-4">
                                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm tracking-wider font-bold text-gray-700">
                                                {agenda.token_absen}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${agenda.is_absen_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {agenda.is_absen_open ? 'Buka' : 'Tutup'}
                                            </span>
                                        </td>

                                        <td className="p-4 text-center space-x-1 flex justify-center">
                                            {/* Tombol Detail & Edit Digabung */}
                                            <button
                                                onClick={() => navigate(`/dashboard/admin/agenda/${agenda.id_agenda}`)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                                                title="Detail & Edit"
                                            >
                                                <Edit size={18} /> <span className="text-xs font-bold">Kelola</span>
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL BUAT AGENDA */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-fade-in-up">

                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Buat Agenda Baru</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="agendaForm" onSubmit={handleCreateAgenda} className="space-y-4">

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Judul Agenda</label>
                                    <input type="text" name="judul" value={formData.judul} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-oxigen-light focus:outline-none" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
                                        <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none">
                                            <option value="pelatihan">Pelatihan / Materi</option>
                                            <option value="sharing">Sharing Session</option>
                                            <option value="rapat">Rapat</option>
                                            <option value="proyek">Proyek / Workshop</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Lokasi</label>
                                        <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Waktu Pelaksanaan</label>
                                        <div className="flex gap-2">
                                            <input type="datetime-local" name="tanggal" value={formData.tanggal} onChange={handleChange} required className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none" />
                                            <button type="button" onClick={setWaktuSekarang} className="bg-gray-100 hover:bg-gray-200 text-xs px-3 font-bold rounded-xl whitespace-nowrap">Saat Ini</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Token Absensi</label>
                                        <div className="flex gap-2">
                                            <input type="text" name="token_absen" value={formData.token_absen} onChange={handleChange} required maxLength={6} className="w-full px-4 py-2 font-mono font-bold tracking-widest uppercase rounded-xl border border-gray-200 focus:outline-none" />
                                            <button type="button" onClick={generateToken} className="bg-gray-100 hover:bg-gray-200 text-xs px-3 font-bold rounded-xl whitespace-nowrap">Acak</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                                    <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} required rows="2" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Konten Materi (Markdown)</label>
                                    <textarea name="konten_materi" value={formData.konten_materi} onChange={handleChange} rows="5" placeholder="# Judul Besar&#10;**Tebal**" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none font-mono text-sm"></textarea>
                                </div>

                            </form>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
                            <button form="agendaForm" type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-xl font-bold text-white bg-oxigen-dark hover:bg-blue-900 disabled:bg-gray-400">
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Agenda'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAgendaList;