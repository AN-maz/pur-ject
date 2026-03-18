import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { agendaService } from '../../../../services/agendaService';
import { Calendar, MapPin, Users } from 'lucide-react';

const AgendaList = () => {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const res = await agendaService.getAllAgendas();
        if (res.status && res.data) {
          setAgendas(res.data);
        }
      } catch (error) {
        console.error("Error fetching agendas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendas();
  }, []);

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgendas = agendas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(agendas.length / itemsPerPage);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Agenda...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agenda & Kegiatan</h1>
          <p className="text-gray-500 text-sm">Daftar kegiatan UKM OXIGEN yang bisa kamu ikuti.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAgendas.map((agenda) => (
          <Link 
            to={`/dashboard/agenda/${agenda.id_agenda}`} 
            key={agenda.id_agenda}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
          >
            {/* Kategori / Divisi Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-50 text-oxigen-light text-xs font-bold rounded-full uppercase tracking-wide">
                {agenda.divisi?.kode || 'UMUM'}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full capitalize">
                {agenda.kategori}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 group-hover:text-oxigen-light transition-colors mb-2 line-clamp-2">
              {agenda.judul}
            </h3>
            
            <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">
              {agenda.deskripsi}
            </p>

            <div className="space-y-2 mt-auto pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} className="text-oxigen-light" />
                <span>{new Date(agenda.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-red-400" />
                <span>{agenda.lokasi}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
          >
            Sebelumnya
          </button>
          <span className="px-4 py-2 text-gray-600 font-medium">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default AgendaList;