import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const divisions = ["Game", "Software", "Hardware"];

    const handleSelectionDivision = (division) => {
        navigate("/mode", { state: { division } });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold mb-2 text-blue-600">Oxigen Live</h1>
                <p className="text-gray-500 mb-6">Pilih Mank Divisina</p>

                <div className="flex flex-col gap-4">
                    {divisions.map((div) => (
                        <button
                            key={div}
                            onClick={() => handleSelectionDivision(div)}
                            className="w-full py-3 px-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-xl font-semibold transition-all">
                            Divisi {div}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}