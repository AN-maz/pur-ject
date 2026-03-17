import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import frameGame from '../assets/frames/exmple-live-report-1.png';
import frameSoftware from '../assets/frames/exmple-live-report-2.png';
import frameHardware from '../assets/frames/exmple-live-report-rt3.png';

export default function LiveReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { division = 'Umum', mode = 'photo' } = location.state || {};

  const videoRef = useRef(null);
  const frameImgRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const animationRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [isRecording, setIsRecording] = useState(false);

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

        streamRef.current = stream;
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [mode, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleDownloadAndShare = async (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const file = new File([blob], filename, { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Live Report ${division}`,
          text: 'Halo! Ini hasil Live Report Oxigen (dari sang Purwa).',
        });
      } catch (err) {
        console.log('Share dibatalkan pengguna atau gagal');
      }
    } else {
      console.log('Download berhasil. (Fitur share tidak didukung di perangkat ini)');
    }
  };


  const drawVideoCover = (ctx, video, canvasWidth, canvasHeight) => {
    const scale = Math.max(canvasWidth / video.videoWidth, canvasHeight / video.videoHeight);
    const x = (canvasWidth / 2) - (video.videoWidth / 2) * scale;
    const y = (canvasHeight / 2) - (video.videoHeight / 2) * scale;

    ctx.save();
    if (facingMode === 'user') {
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
    ctx.restore();
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    canvas.width = 720;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;
    drawVideoCover(ctx, video, canvas.width, canvas.height);
    ctx.drawImage(frameImgRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      handleDownloadAndShare(blob, `Photo-Oxigen-${division}.png`);
    }, 'image/png');
  };

  const toggleRecordVideo = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      cancelAnimationFrame(animationRef.current);
      setIsRecording(false);
    } else {
      const canvas = canvasRef.current;

      // 1. OPTIMASI RESOLUSI: Turunkan ke 540x960. 
      // Tetap berasio 9:16 dan terlihat jernih di HP, tapi bebannya turun drastis (hampir 50% lebih ringan dari 720p).
      canvas.width = 540;
      canvas.height = 960;
      const ctx = canvas.getContext('2d');

      const drawLoop = () => {
        if (videoRef.current && frameImgRef.current) {
          drawVideoCover(ctx, videoRef.current, canvas.width, canvas.height);
          ctx.drawImage(frameImgRef.current, 0, 0, canvas.width, canvas.height);
        }
        animationRef.current = requestAnimationFrame(drawLoop);
      };
      drawLoop();

      // 2. OPTIMASI FPS: Turunkan dari 30 ke 24 (Standar video sinematik).
      // Mengurangi jumlah gambar yang harus diproses per detik.
      const canvasStream = canvas.captureStream(24);

      if (streamRef.current.getAudioTracks().length > 0) {
        canvasStream.addTrack(streamRef.current.getAudioTracks()[0]);
      }

      // 3. OPTIMASI ENCODER: Batasi Bitrate (Kualitas rendering)
      // Memberi tahu browser agar tidak memaksakan kualitas terlalu tinggi yang bikin macet.
      const options = {
        mimeType: 'video/webm;codecs=vp8,opus',
        videoBitsPerSecond: 2500000 // 2.5 Mbps (Cukup jernih untuk web/WA)
      };

      // Pengecekan aman: Kalau browser tidak mendukung codec vp8, pakai setelan default
      const recorderOptions = MediaRecorder.isTypeSupported(options.mimeType) ? options : { mimeType: 'video/webm' };
      const recorder = new MediaRecorder(canvasStream, recorderOptions);

      const chunks = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        handleDownloadAndShare(blob, `Video-Oxigen-${division}.webm`);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-2">
      <div className="relative w-full max-w-sm aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={mode === 'photo'}
          className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
        />
        <img
          ref={frameImgRef}
          src={getFrameImage()}
          alt={`Frame Divisi ${division}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />
      </div>

      <div className="w-full max-w-sm mt-6 flex justify-around items-center px-4">
        <button onClick={() => navigate('/mode', { state: { division } })} className="text-white bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
          ❌
        </button>

        <button
          onClick={mode === 'photo' ? takePhoto : toggleRecordVideo}
          className={`w-16 h-16 rounded-full border-4 border-white transition-all 
            ${mode === 'photo' ? 'bg-white active:scale-90' :
              isRecording ? 'bg-red-600 scale-90 animate-pulse' : 'bg-red-500'}`}
        >
        </button>

        <button onClick={toggleCamera} className="text-white bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
          🔄
        </button>
      </div>
    </div>
  );
}