import React, { useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Komponen Pita Tanzaku
function TanzakuTag({ wish, onSelect }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + (wish.position?.[0] || 0)) * 0.12;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 1.5 + (wish.position?.[2] || 0)) * 0.08;
    }
  });

  return (
    <group position={wish.position || [0, 1, 0]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation(); // Cegah event tembus ke canvas
          onSelect(wish);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        {/* Dimensi Kertas Harapan */}
        <boxGeometry args={[0.2, 0.6, 0.015]} />
        <meshStandardMaterial 
          color={wish.color || '#f43f5e'} 
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function TreeModel({ wishes = [], onSelectWish }) {
  const { scene } = useGLTF('/models/bamboo.glb');

  return (
    <group>
      {/* Center membungkus model agar otomatis berada tepat di tengah koordinat (0,0,0) */}
      <Center top>
        <primitive object={scene} scale={0.6} />
      </Center>

      {/* Render semua kartu harapan */}
      {wishes.map((item) => (
        <TanzakuTag key={item.id} wish={item} onSelect={onSelectWish} />
      ))}
    </group>
  );
}

useGLTF.preload('/models/bamboo.glb');