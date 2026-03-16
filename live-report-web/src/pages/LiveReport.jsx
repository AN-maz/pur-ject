import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import frameGame from '../assets/frames/exmple-live-report-1.png';
import frameSoftware from '../assets/frames/exmple-live-report-2.png';
import frameHardware from '../assets/frames/exmple-live-report-rt3.png';

export default function LiveReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [facingMode, setFacingMode] = useState('user');

  const { division = 'Umum', mode = 'photo' } = location.state || {};

  const getFrameImage = () => {
    switch (division) {
      case 'Game': return frameGame;
      case 'Software': return frameSoftware;
      case 'Hardware': return frameHardware;
      default: return frameGame;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: mode === 'video'
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
        alert("Izinkan akses kamera di browser kamu ya!");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [mode, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-2">
      {/* Container Kamera 9:16 */}
      <div className="relative w-full max-w-sm aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">

        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={mode === 'photo'}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <img
          src={getFrameImage()}
          alt={`Frame Divisi ${division}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />

        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 border-4 border-transparent">
          <div className="bg-white/80 text-black text-xs px-2 py-1 rounded w-fit font-bold">
            Live Report: {division}
          </div>
          <div className="bg-white/80 text-black text-xs px-2 py-1 rounded w-fit self-end font-bold">
            Mode: {mode?.toUpperCase()}
          </div>
        </div>

      </div>

      <div className="w-full max-w-sm mt-6 flex justify-around items-center px-4">

        <button onClick={() => navigate(-1)} className="text-white bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
          ❌
        </button>

        <button className={`w-16 h-16 rounded-full border-4 border-white active:scale-95 transition-transform ${mode === 'video' ? 'bg-red-500' : 'bg-white'}`}>
        </button>

        <button onClick={toggleCamera} className="text-white bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
          🔄
        </button>
      </div>
    </div>
  );
}