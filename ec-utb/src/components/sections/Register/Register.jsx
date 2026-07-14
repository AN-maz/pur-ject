import { useState } from 'react';

export default function Register() {

  const [formData, setFormData] = useState({
    nama: "", nim: "", jurusan: "", email: "", alasan: ""
  });
  const [status, setStatus] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (value && !emailPattern.test(value)) {
        setEmailError("Email harus menggunakan format @gmail.com");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError("Email harus menggunakan format @gmail.com");
      return;
    }

    setStatus("Sending...");
    
    const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("Success");
      setTimeout(() => {
        setFormData({ nama: "", nim: "", jurusan: "", email: "", alasan: "" });
        setStatus("");
      }, 2000);
    } catch {
      setStatus("Error");
      setTimeout(() => setStatus(""), 2000);
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col lg:flex-row">
      {/* Loading Popup */}
      {status === "Sending..." && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-ec-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-gray-700">Mengirim data...</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {status === "Success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700">Berhasil terdaftar!</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {status === "Error" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700">Gagal mengirim data</p>
            </div>
          </div>
        </div>
      )}
      {/* Left Section - Branding */}
      <div className="w-full lg:w-1/2 bg-ec-blue flex items-center justify-center relative overflow-hidden py-12 lg:py-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ec-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="relative z-10 text-center px-6 lg:px-12 reveal-up">
          <img
            src="/images/nav-logo_p.png"
            alt="EC Logo"
            className="w-32 lg:w-40 mx-auto mb-6 lg:mb-8"
          />
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 lg:mb-4">
            Join the Family!
          </h2>
          <p className="text-blue-200 text-sm lg:text-lg leading-relaxed max-w-md mx-auto mb-4 lg:mb-0">
            Be part of a community that grows together. <br />
            Prepare yourself for an exciting journey of leadership and language.
          </p>

          <div className="reveal-up mt-6 lg:mt-8 text-left inline-block space-y-2 lg:space-y-3 bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
              <span className="text-green-400">✓</span>{" "}
              <span>Public Speaking Training</span>
            </div>
            <div className="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
              <span className="text-green-400">✓</span>{" "}
              <span>Toefl Preparation</span>
            </div>
            <div className="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
              <span className="text-green-400">✓</span> <span>Networking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="reveal-up w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 lg:p-8 bg-white">
        <div className="reveal-up w-full max-w-lg py-6 lg:py-8">
          <div className="reveal-up text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-500">Fill in your data correctly to join us.</p>
          </div>

          <div className="my-4">
            {/* Tempat untuk komponen Alert/Flash message React nantinya */}
          </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                placeholder="e.g. Purwa Muslim"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIM
                </label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim} // Diperbaiki dari formData.nama
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                  placeholder="2455xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 reveal-up">
                  Major (Jurusan)
                </label>
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors bg-white"
                >
                  <option value="" disabled>
                    Select Major
                  </option>
                  <option value="Informatics Engineering">
                    Informatics Engineering
                  </option>
                  <option value="Industrial Engineering">
                    Industrial Engineering
                  </option>
                  <option value="Visual Communication Design">
                    Visual Communication Design
                  </option>
                  <option value="Digital Business">Digital Business</option>
                  <option value="Retail Management">Retail Management</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-ec-blue transition-colors ${
                    emailError
                      ? "border-red-500 focus:border-red-500"
                      : formData.email && !emailError
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-300 focus:border-ec-blue"
                  }`}
                  placeholder="purwa@gmail.com"
                />
                {formData.email && !emailError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason to Join
              </label>
              <textarea
                name="alasan"
                rows="3"
                value={formData.alasan}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                placeholder="Why do you want to join English Club?"
              ></textarea>
            </div>

            <div className="pt-2 reveal-up">
              <button
                type="submit"
                disabled={status === "Sending..." || emailError !== ""}
                className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-1 ${
                  status === "Sending..." || emailError !== ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-ec-red hover:bg-red-700 hover:shadow-xl"
                }`}
              >
                {status === "Sending..." ? "Mendaftarkan..." : "Register Now"}
              </button>
            </div>

            <div className="text-center mt-4 reveal-up">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth"
                  className="font-bold text-ec-blue hover:text-blue-900 transition-colors"
                >
                  Login Here
                </a>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 reveal-up">
              <a
                href="/home"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Kembali ke Home
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}