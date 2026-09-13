import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";
import { PHOTO_THEMES } from "../data/questions";
import { GAMES, resultCopy } from "../data/photobooth";
import { SoundEngine } from "../lib/sound";

// Alur 1:1 dengan EC-GAMES/app.js:
// renderLayoutSelector -> startCamera -> runCountdown -> capturePhoto
//   -> renderPhotoPreview -> exportJpg
// Bedanya hanya: React state menggantikan innerHTML + global booth/stream.
export default function Photobooth({ gameId, result, onBack, onFinish }) {
  const [phase, setPhase] = useState("SELECT"); // SELECT | CAMERA | PREVIEW
  const [photos, setPhotos] = useState([]);
  const [overlay, setOverlay] = useState(null); // angka countdown / '📸' / null
  const [hint, setHint] = useState("Photo 1 of 1");
  const [capturing, setCapturing] = useState(false);
  const [captureLabel, setCaptureLabel] = useState("📸 START COUNTDOWN");
  const [cameraError, setCameraError] = useState(null);
  const [logoOk, setLogoOk] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const delayRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const layoutRef = useRef(1);
  const photosRef = useRef([]);
  const runRef = useRef(null);

  const theme = useMemo(() => PHOTO_THEMES[gameId] ?? PHOTO_THEMES.VOCAB_RUSH, [gameId]);
  const gameMeta = useMemo(() => GAMES[gameId] ?? GAMES.VOCAB_RUSH, [gameId]);
  const copy = useMemo(() => resultCopy(gameId, result), [gameId, result]);
  const scoreText = useMemo(
    () => copy.scoreLabel || `${result.score.toLocaleString()} PTS`,
    [copy, result],
  );

  const clearTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (delayRef.current) { clearTimeout(delayRef.current); delayRef.current = null; }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (delayRef.current) clearTimeout(delayRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 960;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    photosRef.current = [...photosRef.current, canvas.toDataURL("image/jpeg", 0.94)];
    setPhotos([...photosRef.current]);
    const box = document.querySelector(".camera-box");
    if (box) {
      box.classList.add("flash");
      flashTimeoutRef.current = setTimeout(() => box.classList.remove("flash"), 400);
    }
    SoundEngine.correct();
  }, []);

  const runCountdown = useCallback(() => {
    if (capturing) return;
    setCapturing(true);
    setOverlay(3);
    let count = 3;
    timerRef.current = setInterval(() => {
      count--;
      if (count > 0) {
        SoundEngine.tick();
        setOverlay(count);
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setOverlay("📸");
        capturePhoto();
        delayRef.current = setTimeout(() => {
          setOverlay(null);
          if (photosRef.current.length < layoutRef.current) {
            setHint(`Photo ${photosRef.current.length + 1} of ${layoutRef.current} — now make it chaotic! 🤪`);
            setCapturing(false);
            setCaptureLabel("📸 NEXT PHOTO");
          } else {
            stopStream();
            setPhase("PREVIEW");
          }
        }, 450);
      }
    }, 750);
  }, [capturing, capturePhoto, stopStream]);

  useEffect(() => {
    runRef.current = runCountdown;
  }, [runCountdown]);

  const startCamera = useCallback(async (nextLayout) => {
    const chosen = nextLayout ?? layoutRef.current;
    layoutRef.current = chosen;
    photosRef.current = [];
    setPhotos([]);
    setHint(`Photo 1 of ${chosen}`);
    setCaptureLabel("📸 START COUNTDOWN");
    setCapturing(false);
    setOverlay(null);
    setCameraError(null);
    setPhase("CAMERA");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setCameraError("Kamera tidak bisa dibuka. Izinkan akses kamera dan jalankan lewat localhost/HTTPS.");
    }
  }, []);

  const cancelCamera = useCallback(() => {
    clearTimers();
    stopStream();
    photosRef.current = [];
    setPhotos([]);
    setPhase("SELECT");
  }, [clearTimers, stopStream]);

  const backToResult = useCallback(() => {
    clearTimers();
    stopStream();
    onBack();
  }, [clearTimers, stopStream, onBack]);

  const retake = useCallback(() => {
    clearTimers();
    setExportError(null);
    startCamera(layoutRef.current);
  }, [clearTimers, startCamera]);

  const exportJpg = useCallback(async () => {
    const frame = frameRef.current;
    if (!frame || photosRef.current.length === 0 || exporting) return;
    setExporting(true);
    setExportError(null);
    const filename = `english-club-${gameId.toLowerCase()}-${Date.now()}.jpg`;
    const download = (href) => {
      const link = document.createElement("a");
      link.download = filename;
      link.href = href;
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
    try {
      // Jalur utama: html-to-image me-render lewat SVG foreignObject di browser,
      // jadi warna modern Tailwind v4 (oklch/color-mix) tetap bisa diproses.
      const dataUrl = await toJpeg(frame, { quality: 0.95, pixelRatio: 3 });
      download(dataUrl);
    } catch (firstErr) {
      console.warn("html-to-image gagal, coba html2canvas:", firstErr);
      try {
        // Cadangan: html2canvas seperti di EC-GAMES/app.js
        const canvas = await html2canvas(frame, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedFrame = clonedDoc.getElementById("exportFrame");
            if (!clonedFrame) return;
            clonedFrame.style.display = "flex";
            clonedFrame.style.flexDirection = "column";
            clonedFrame.style.justifyContent = "space-between";
            const clonedImg = clonedFrame.querySelector("img, canvas");
            if (clonedImg) {
              clonedImg.style.objectFit = "cover";
              clonedImg.style.width = "100%";
              clonedImg.style.height = "100%";
            }
            const bottomBox = clonedFrame.querySelector(".frame-result") || clonedFrame.lastElementChild;
            if (bottomBox) {
              bottomBox.style.marginBottom = "0px";
              bottomBox.style.paddingBottom = "16px";
            }
            const taglines = clonedFrame.querySelectorAll("span, p, div");
            taglines.forEach((el) => {
              el.style.lineHeight = "1.2";
            });
          },
        });
        download(canvas.toDataURL("image/jpeg", 0.95));
      } catch (err) {
        console.error("Export Error:", err);
        setExportError("Foto gagal dibuat. Coba lagi, atau screenshot manual ya 📸");
      }
    } finally {
      setExporting(false);
    }
  }, [gameId, exporting]);

  if (phase === "SELECT") {
    return (
      <section className="result glass page text-center space-y-6 max-w-md mx-auto animate-fade-in" style={{ "--theme": theme.accent }}>
        <div className="result-icon">📸</div>
        <h2 className="text-2xl font-black text-white">CHOOSE PHOTO STYLE</h2>
        <p className="text-xs text-blue-200/70">Pilih layout yang paling cocok. Kamera akan mengambil foto dengan countdown.</p>
        <div className="layout-grid">
          <button className="layout-option" onClick={() => startCamera(1)}>
            <span className="layout-icon">🖼️</span>
            <b>1 PHOTO</b>
            <small style={{ display: "block", color: "#aebfe5" }}>Single hero shot</small>
          </button>
          <button className="layout-option" onClick={() => startCamera(2)}>
            <span className="layout-icon">🖼️🖼️</span>
            <b>2 PHOTOS</b>
            <small style={{ display: "block", color: "#aebfe5" }}>Fun photostrip</small>
          </button>
        </div>
        <button onClick={backToResult} className="secondary-button">← Back</button>
      </section>
    );
  }

  if (phase === "CAMERA") {
    return (
      <section className="camera-panel page text-center space-y-4 max-w-md mx-auto animate-fade-in" style={{ "--theme": theme.accent }}>
        <div className="hero">
          <h2 style={{ fontSize: 38 }}>GET READY! 📸</h2>
          <p id="cameraStatus">
            {cameraError ? (
              <span style={{ color: "#fda4af" }}>{cameraError}</span>
            ) : (
              "Allow camera access, then show your best pose."
            )}
          </p>
        </div>
        <div className="camera-box">
          <video ref={videoRef} autoPlay playsInline muted />
          {overlay !== null && <div className="countdown">{overlay}</div>}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <p className="camera-hint">{hint}</p>
        <div className="actions">
          <button
            onClick={() => runRef.current?.()}
            disabled={capturing || !!cameraError}
            className="primary-button photo-button"
          >
            {captureLabel}
          </button>
          <button onClick={cancelCamera} className="secondary-button">Cancel</button>
        </div>
      </section>
    );
  }

  return (
    <section className="photo-preview-wrap page max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8">
        <div
          id="exportFrame"
          ref={frameRef}
          className="export-frame relative w-[340px] sm:w-[360px] h-[600px] sm:h-[640px] aspect-[9/16] p-6 rounded-3xl flex flex-col justify-between overflow-hidden shadow-2xl text-white select-none shrink-0"
          style={{ background: theme.gradient, border: `3px solid ${theme.accent}` }}
        >
          <span className="decor decor-1 absolute top-3 right-4 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 uppercase" style={{ color: theme.accent }}>{theme.decor[0]}</span>
          <span className="decor decor-2 absolute bottom-24 -left-2 text-[9px] font-bold px-2 py-0.5 rounded-r-md bg-black/50 border border-white/10 uppercase tracking-widest">{theme.decor[1]}</span>

          <div className="frame-header flex items-center gap-3 border-b border-white/20 pb-3 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/30 shadow-lg flex items-center justify-center shrink-0">
              {logoOk ? (
                <img
                  src="/assets/logo.png"
                  alt="Logo UKM"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  onError={() => setLogoOk(false)}
                />
              ) : (
                <div className="w-full h-full bg-ec-red text-white font-extrabold text-xs rounded-xl flex items-center justify-center">EC</div>
              )}
            </div>
            <div className="frame-brand flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-ec-gold text-ec-navy">PENA BARU 2026</span>
              </div>
              <span className="text-[10px] tracking-widest text-white/80 uppercase font-semibold mt-0.5">STAND CHALLENGE • 2026</span>
            </div>
          </div>

          <div className="frame-title text-center font-outfit font-black text-xs uppercase tracking-widest py-1 px-4 bg-black/40 backdrop-blur-md rounded-full border border-white/20 self-center z-10 my-1 shadow-md" style={{ color: theme.accent }}>
            {gameMeta.icon} {gameMeta.title.toUpperCase()}
          </div>

          <div className="photo-slots flex-1 flex flex-col gap-3 my-2 justify-center z-10">
            {photos.map((src, i) => (
              <div key={i} className="photo-slot relative flex-1 w-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-black/40">
                <img src={src} className="w-full h-full object-cover" alt="Challenge photo" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          <div className="frame-result text-center bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20 z-10 shadow-lg">
            <h3 className="font-outfit text-xs font-black tracking-wider uppercase" style={{ color: theme.accent }}>{theme.title}</h3>
            <div className="big-score font-outfit font-black text-2xl my-0.5 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{scoreText}</div>
            <blockquote className="text-[10px] italic text-white/90 font-medium">“{theme.quote}”</blockquote>
            <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] font-black tracking-wider text-ec-gold uppercase">
              LEARN TOGETHER • GROW TO BE BETTER
            </div>
          </div>
        </div>

        <div className="preview-controls glass w-full max-w-[360px] h-[600px] sm:h-[640px] p-6 rounded-3xl text-center flex flex-col justify-between border border-white/15 shadow-2xl shrink-0">
          <div className="space-y-2">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-ec-gold/20 text-ec-gold border border-ec-gold/30">
              PHOTOBOOTH READY 📸
            </span>
            <h2 className="text-2xl font-outfit font-black text-white leading-tight">YOUR CHALLENGE PHOTO 🔥</h2>
            <p className="text-xs text-ec-slate">Foto siap diunduh dengan rasio presisi Story Instagram (9:16).</p>
          </div>

          <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-3 text-left">
            <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider border-b border-white/10 pb-2">
              Game Performance Summary
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <small className="block text-[10px] text-ec-slate uppercase font-semibold">Game Mode</small>
                <strong className="text-xs text-ec-gold font-outfit font-bold truncate block">{gameMeta.title}</strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <small className="block text-[10px] text-ec-slate uppercase font-semibold">Final Score</small>
                <strong className="text-xs text-white font-outfit font-bold block">{result.score} PTS</strong>
              </div>
            </div>
            <div className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 flex gap-2 items-center">
              <span>💡</span>
              <span>Foto sudah termasuk branding <b>English Club PENA BARU 2026</b>.</span>
            </div>
          </div>

          <div className="actions flex flex-col gap-3">
            <button id="saveJpg" onClick={exportJpg} disabled={exporting} className="primary-button gold w-full py-3.5 text-sm font-black tracking-wider shadow-lg">
              {exporting ? "⏳ GENERATING JPG..." : "⬇ SAVE AS JPG"}
            </button>
            {exportError && <p className="text-xs text-red-300">{exportError}</p>}
            <div className="flex gap-3">
              <button onClick={retake} className="secondary-button flex-1 py-2.5 text-xs font-bold">↻ Retake</button>
              <button onClick={onFinish} className="secondary-button flex-1 py-2.5 text-xs font-bold">⌂ Finish</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
