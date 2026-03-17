import { useLocation, useNavigate } from "react-router-dom";

export default function ModeSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const division = location.state?.division || "Umum";

    const handleSelectMode = (mode) => {
        console.log("1. Tombol ditekan! Memilih mode:", mode);
        console.log("2. Bersiap pindah ke /camera dengan divisi:", division);

        try {
            navigate('/camera', { state: { division, mode } });
            console.log("3. Navigasi berhasil dieksekusi!");
        } catch (error) {
            console.error("Gagal melakukan navigasi:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Divisi {division}</h2>
                <p className="text-gray-500 mb-6">Pilih format live reportna</p>

                <div className="flex gap-4">
                    <button
                        onClick={() => handleSelectMode('photo')}
                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                    >
                        Foto
                    </button>


                    <button
                        onClick={() => handleSelectMode('video')}
                        className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all"
                    >
                        Video
                    </button>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 text-sm text-gray-400 hover:text-gray-600"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}