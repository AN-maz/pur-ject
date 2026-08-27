import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api/authService';
import { useAuth } from '../../hooks/useAuth.js';



export default function AuthView() {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const [authMode, setAuthMode] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError('');
        setSuccessMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (authMode === 'login') {
                const res = await login(formData.email, formData.password);
                if (res.success) {
                    navigate(from, { replace: true });
                    return;
                }
                setError(res.error || 'Login gagal');
            } else {
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                };
                const res = await authService.register(payload);
                if (res.success) {
                    setAuthMode('login');
                    setFormData({ ...formData, name: '', password: '' });
                    setSuccessMsg('Registrasi berhasil! Silakan login.');
                    
                } else {
                    setError(res.error || 'Registrasi gagal');
                }
            }
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan sistem');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await googleLogin();
            if (!res.success) {
                setError(res.error || 'Google login gagal');
            }
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan sistem');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="authView"
            className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#001A57] to-[#0051D2]"
        >
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">

                    {/* Kolom Kiri - Gamifikasi Info */}
                    <div className="hidden md:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-[#001A57] to-[#0051D2]">
                        <div>
                            {/* Logo & Brand */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-extrabold text-base leading-none">LMS Gamifikasi</div>
                                    <div className="text-white/60 text-[11px] mt-1">Belajar tidak ada kata terlambat</div>
                                </div>
                            </div>

                            {/* Title & Deskripsi */}
                            <h1 className="text-3xl font-extrabold mt-10 leading-snug">
                                Belajar, Berkarya,<br />dan Naik Peringkat!
                            </h1>
                            <p className="text-white/70 text-sm mt-4 leading-relaxed">
                                Kumpulkan XP Learner saat belajar dan XP Creator saat berbagi ilmu. Bersaing di leaderboard tiap musim (season).
                            </p>
                        </div>

                        {/* XP Cards */}
                        <div className="grid grid-cols-3 gap-3 text-center my-6">
                            <div className="bg-white/10 rounded-xl p-3">
                                <div className="text-lg font-bold">+10 XP</div>
                                <div className="text-white/60 text-[11px]">Baca Materi</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3">
                                <div className="text-lg font-bold">+20 XP</div>
                                <div className="text-white/60 text-[11px]">Upload Materi</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3">
                                <div className="text-lg font-bold">+30 XP</div>
                                <div className="text-white/60 text-[11px]">Buat Kuis</div>
                            </div>
                        </div>

                        <div className="text-white/40 text-xs">
                            LMS Gamifikasi • Platform Belajar & Berbagi
                        </div>
                    </div>

                    {/* Kolom Kanan - Form Login/Register */}
                    <div className="p-8 md:p-10 flex flex-col justify-center bg-white relative">

                        {/* Tombol Kembali ke Halaman Utama */}
                        <div className="mb-4">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition group"
                            >
                                <svg
                                    className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Beranda
                            </Link>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-extrabold text-[#001A57]">
                                {authMode === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                            </h2>

                            {/* Tab Switcher */}
                            <div className="flex bg-slate-100 rounded-lg p-1 text-sm font-semibold">
                                <button
                                    type="button"
                                    onClick={() => { setAuthMode('login'); setError(''); }}
                                    className={`px-4 py-1 rounded-md transition duration-200 ${
                                        authMode === 'login'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    Masuk
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setAuthMode('register'); setError(''); }}
                                    className={`px-4 py-1 rounded-md transition duration-200 ${
                                        authMode === 'register'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    Daftar
                                </button>
                            </div>
                        </div>

                        {/* Form Input */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {authMode === 'register' && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Masukkan nama lengkap"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm placeholder:text-slate-400"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="nama@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm placeholder:text-slate-400"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {successMsg && (
                                <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2 rounded-lg">
                                    {successMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-blue-600/30 text-sm"
                            >
                                {loading ? 'Memproses...' : (authMode === 'login' ? 'Masuk' : 'Daftar')}
                            </button>
                        </form>

                        {/* Divider 'atau' */}
                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-3 text-slate-400 font-medium">atau</span>
                            </div>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm font-semibold text-slate-700"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                                />
                            </svg>
                            <span>Masuk dengan Google</span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}