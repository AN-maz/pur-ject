import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import TreeModel from './TreeModel';

function Loader() {
  return (
    <Html center>
      <div className="text-white bg-slate-900/90 px-5 py-2.5 rounded-2xl backdrop-blur-md text-sm border border-slate-700 shadow-xl">
        🎋 Menyiapkan Pohon Harapan...
      </div>
    </Html>
  );
}

export default function Canvas3D({ wishes, onSelectWish }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }} // Kamera ditarik mundur ke z: 8
      className="w-full h-full"
    >
      {/* Pencahayaan Scene */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 12, 8]} intensity={1.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Suspense fallback={<Loader />}>
        <TreeModel wishes={wishes} onSelectWish={onSelectWish} />
      </Suspense>

      <OrbitControls
        target={[0, 1.5, 0]}         // Fokus kamera di tengah tinggi pohon
        enablePan={true}
        screenSpacePanning={true}
        minDistance={2}              // Zoom paling dekat
        maxDistance={15}             // Zoom paling jauh
        minPolarAngle={0.1}          // Bisa lihat dari pucuk atas
        maxPolarAngle={Math.PI - 0.1}// Bisa lihat dari dasar bawah
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}