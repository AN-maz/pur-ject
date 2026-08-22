import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stars, Sparkles } from '@react-three/drei';
import TreeModel from './TreeModel';

function Loader() {
  return (
    <Html center>
      <div className="text-cyan-300 bg-slate-950/90 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-mono border border-cyan-500/30">
        &lt;Loading: Bamboo.3D /&gt;
      </div>
    </Html>
  );
}

export default function Canvas3D({ wishes, onSelectWish }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
    dpr={[1, 1.5]} 
    gl={{ powerPreference: 'high-performance', antialias: true, alpha: false }}
      camera={{ 
        position: isMobile ? [0, 1.5, 9.5] : [0, 1.8, 7.5], 
        fov: isMobile ? 52 : 45 
      }}
      className="w-full h-full touch-none"
    >
      <color attach="background" args={['#030712']} />

      {/* Lighting Terang & Vibrant */}
      <ambientLight intensity={1.8} />
      <hemisphereLight skyColor="#67e8f9" groundColor="#064e3b" intensity={1.5} />
      <directionalLight position={[5, 15, 8]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, 8, -5]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[0, -1, 3]} intensity={1.6} color="#f43f5e" />

      {/* Kosmik & Partikel Bintang */}
      <Stars radius={50} depth={50} count={1800} factor={3.5} saturation={0.6} fade speed={1} />
      <Sparkles count={60} scale={isMobile ? 6 : 8} size={2.5} speed={0.4} color="#38bdf8" />

      <Suspense fallback={<Loader />}>
        <TreeModel wishes={wishes} onSelectWish={onSelectWish} />
      </Suspense>

      {/* Kontrol Orbit Mudah */}
      <OrbitControls
        target={[0, isMobile ? 1.0 : 1.2, 0]}
        enablePan={true}
        screenSpacePanning={true}
        panSpeed={1.2}
        rotateSpeed={0.8}
        minDistance={2}
        maxDistance={16}
        minPolarAngle={0.05}
        maxPolarAngle={Math.PI - 0.05}
        enableDamping={true}
        dampingFactor={0.06}
      />
    </Canvas>
  );
}