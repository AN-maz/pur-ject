import api from "./api";

export const adminService = {
  getDashboardStats: async (angkatan = "all") => {
    try {
      const params = angkatan !== "all" ? { angkatan } : {};

      const response = await api.get("/api/admin/dashboard-stats", { params });
      return response.data;
    } catch (err) {
      throw (
        err.response?.data || {
          message: "Gagal mengambil data statistik admin",
        }
      );
    }
  },
};
