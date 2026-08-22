import React, { useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function TanzakuTag({ wish, onSelect }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + (wish.position?.[0] || 0)) * 0.12;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 1.5 + (wish.position?.[2] || 0)) * 0.08;
    }
  });

  return (
    <group position={wish.position || [0, 0, 0]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(wish);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <boxGeometry args={[0.22, 0.65, 0.015]} />
        <meshStandardMaterial 
          color={wish.color || '#f43f5e'} 
          roughness={0.35} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function TreeModel({ wishes = [], onSelectWish }) {
  const { scene } = useGLTF('/models/bamboo.glb');

  return (
    // Posisi Y diturunkan ke -0.4 agar pas di area tengah-bawah yang nyaman dilihat
    <group position={[0, -0.4, 0]}>
      <Center>
        <primitive object={scene} scale={0.7} />
      </Center>

      {wishes.map((item) => (
        <TanzakuTag key={item.id} wish={item} onSelect={onSelectWish} />
      ))}
    </group>
  );
}

useGLTF.preload('/models/bamboo.glb');