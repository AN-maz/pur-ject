import api from "./api";

export const agendaService = {

  getAllAgendas: async () => {
    try {
      const response = await api.get("/api/agendas");
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Gagal mengambil data agenda" };
    }
  },

  getAgendaById: async (id) => {
    try {
      const response = await api.get(`/api/agendas/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Gagal mengambil detail agenda" }
      );
    }
  },

  createAgenda: async (agendaData) => {
    try {
      const response = await api.post("/api/agendas", agendaData);
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Gagal membuat agenda baru" };
    }
  },

  editAgenda: async (id_agenda, dataUpdate) => {
    try {
      const response = await api.put(`/api/agendas/${id_agenda}`, dataUpdate);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Gagal mengedit agenda" };
    }
  },

  kickAnggota: async (id_absensi) => {
    try {
      const response = await api.delete(
        `/api/agendas/participants/${id_absensi}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Gagal menghapus peserta" };
    }
  },

  absenAgenda: async (id_agenda, token_absen) => {
    try {
      const response = await api.post(`/api/agendas/${id_agenda}/absen`, {
        token_absen,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Gagal melakukan absensi" };
    }
  },

  getParticipants: async (id_agenda) => {
    try{
      const response = await api.get(`/api/agendas/${id_agenda}/participants`);
      return response.data;
    }catch(err){
      throw err.response?.data || {message: "Gagal mengambil data anggota"}
    }
  }
  
};
