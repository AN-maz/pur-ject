import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import AuthLayout from '../../../components/Layouts/AuthLayout';
import { useAuth } from '../../../hooks/UseAuth';


const Login = () => {

  const { login, loading, errorMsg } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Masuk untuk mengakses materi pembelajaran."
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-lg">
            {errorMsg}
          </div>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
          <input
            type="email"
            placeholder="purwa123@gmail.com"
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-oxigen-light focus:ring-2 focus:ring-oxigen-light/20 transition-all"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>

        {/* Password Input */}
        <div>

          {/* <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <a href="#" className="text-xs font-semibold text-oxigen-light hover:underline">Lupa Password?</a>
          </div> */}

          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-oxigen-light focus:ring-2 focus:ring-oxigen-light/20 transition-all"
            onChange={handleChange}
            value={formData.password}
            name="password"

          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 text-oxigen-light border-gray-300 rounded focus:ring-oxigen-light cursor-pointer"
          />
          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
            Remember Me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-oxigen-dark hover:bg-blue-900 hover:-translate-y-1'}`}
          disabled={loading}
        >
          Masuk Sekarang
        </button>

      </form>

      {/* Register Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Belum menjadi anggota?{' '}
        <Link to="/register" className="text-oxigen-light font-bold hover:underline">
          Daftar Yuk..
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;