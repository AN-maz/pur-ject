import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Latar partikel Three.js. Warna mengikuti tema (--color-primary), perlahan
// menyatu dengan gerakan pointer. Ringan & ramah selulrer (DPR dibatasi).
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const getPrimary = () => {
      const cs = getComputedStyle(document.documentElement);
      return new THREE.Color(cs.getPropertyValue('--color-primary').trim() || '#0d9488');
    };

    const isMobile = () =>
      typeof window !== 'undefined' && (window.innerWidth < 640 || 'ontouchstart' in window);

    const count = isMobile() ? 90 : 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
      });
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: getPrimary(),
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Parallax pointer
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onThemeChange = () => {
      material.color.copy(getPrimary());
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove);
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    onResize();

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      const attr = geometry.attributes.position;
      const arr = attr.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3] += velocities[i].x * dt * 60;
        arr[i * 3 + 1] += velocities[i].y * dt * 60;
        if (arr[i * 3] > 8) arr[i * 3] = -8;
        if (arr[i * 3] < -8) arr[i * 3] = 8;
        if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
        if (arr[i * 3 + 1] < -5) arr[i * 3 + 1] = 5;
      }
      attr.needsUpdate = true;

      // Gerakkan layar mulus menuju target pointer
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      camera.position.x = mouse.x * 0.6;
      camera.position.y = -mouse.y * 0.4;
      camera.lookAt(0, 0, 0);

      points.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      themeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}