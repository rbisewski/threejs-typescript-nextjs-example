"use client"
import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const loader: THREE.TextureLoader = useMemo(
    () => new THREE.TextureLoader(),
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 3;

      const light = new THREE.DirectionalLight(0xFFFFFF, 3);
      light.position.set(-1, 2, 4);
      scene.add(light);

      const texture = loader.load('blue_marble_globe.jpg');
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.SphereGeometry();
      const material = new THREE.MeshPhongMaterial({ map: texture });

      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      const renderScene = () => {
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      // start the animation loop
      renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize, false);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [loader]);

  return <div ref={containerRef} />;
};
export default ThreeScene;
