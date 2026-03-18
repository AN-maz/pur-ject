import api from "./api";

const DIVISI_MAP = {
  software: "STF",
  hardware: "HRD",
  game: "GAM",
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const resData = response.data;

      if ((resData.status || resData.success) && resData.data?.token) {

        // Simpan Token
        localStorage.setItem("token", resData.data.token);
        console.log("✅ Token berhasil disimpan ke LocalStorage");
        
        // Simpan Data User (Untuk Dashboard)
        // Cek apakah user ada di dalam object 'user' atau langsung di 'data'
        const userDataToSave = resData.data.user || resData.data;
        
        // Kita copy datanya biar aman, lalu hapus token dari object user (biar gak duplikat)
        const finalUser = { ...userDataToSave };
        delete finalUser.token; 

        localStorage.setItem('user', JSON.stringify(finalUser));
      } else {
        console.warn("❌ Login sukses tapi Token tidak ditemukan di response!");
      }
      
      return response.data;
    } catch (err) {
      throw err.response ? err.response.data : { message: "Server Error" };
    }
  },

  register: async (formData) => {
    try {
      const kodeBackend = DIVISI_MAP[formData.divisi];

      if (!kodeBackend) {
        throw new Error("Pilihan Divisi tidak valid!");
      }

      const payload = {
        nama_lengkap: formData.fullName,
        nim: formData.nim,
        jurusan: formData.jurusan,
        email: formData.email,
        password: formData.password,

        kode_divisi: kodeBackend,
        alasan: formData.alasan,
      };

      console.log("Data yang dikirim ke Backend:", payload);

      const response = await api.post("/api/auth/register", payload);
      return response.data;
    } catch (err) {
      throw err.response ? err.response.data : { message: "Server Error" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};
