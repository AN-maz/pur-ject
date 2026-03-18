import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../components/Layouts/AuthLayout';
import { useAuth } from '../../../hooks/UseAuth';

const Registrasi = () => {

  const { register, loading, errorMsg } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    nim: '',
    jurusan: '',
    email: '',
    password: '',
    divisi: '',
    alasan: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registrasi Berhasil! Silakan Login.");
    } catch (err) {
      console.error("Registrasi gagal di komponen:", err);
    }

    e.preventDefault();
    try {
      await register(formData);
      alert("Registrasi Berhasil! Silakan Login.");
    } catch (err) {
      console.error("Registrasi gagal di komponen:", err);
    }

  };

  return (
    <AuthLayout
      title="Join the Division"
      subtitle="Daftarkan dirimu dan pilih divisi yang kamu banget dah pokoknya..."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Error Alert */}
        {errorMsg && <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg">{errorMsg}</div>}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="fullName"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="Masukkan nama lengkap"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* NIM */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
              placeholder="2455XXXX"
              onChange={handleChange}
              name="nim"
            />
          </div>


          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all appearance-none cursor-pointer"
              onChange={handleChange}
              name="jurusan"
            >
              <option value="" disabled>Pilih Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Teknik Industri">Teknik Industri</option>
              <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
              <option value="Bisnis Digital">Bisnis Digital</option>
              <option value="Manajemen Retail">Manajemen Retail</option>
            </select>
          </div>
        </div>


        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="purwa123@gmail.com"
            onChange={handleChange}
            name="email"
          />
        </div>


        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="••••••••"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Menjadi Bagian Dari</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all appearance-none cursor-pointer"
            onChange={handleChange}
            value={formData.divisi}
            name="divisi"
          >
            <option value="" disabled>Pilih Divisi Peminatan</option>
            <option value="software">Divisi Software</option>
            <option value="hardware">Divisi Hardware</option>
            <option value="game">Divisi Game</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Alasan Bergabung</label>
          <textarea
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all resize-none"
            placeholder="Ceritakan motivasi singkatmu..."
            onChange={handleChange}
            name="alasan"
          ></textarea>
        </div>


        <button
          type="submit"
          className="w-full py-4 mt-2 bg-gradient-to-r from-oxigen-light to-software-tosca hover:to-oxigen-light text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          {loading ? 'Mendaftar...' : 'Buat Akun Baru'}
        </button>

      </form>

      {/* Login Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-oxigen-light font-bold hover:underline">
          Masuk di sini
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Registrasi;