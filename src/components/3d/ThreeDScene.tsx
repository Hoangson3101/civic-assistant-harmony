import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDSceneProps {
  className?: string;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Thiết lập scene, camera, và renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Tạo các đối tượng 3D
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x5271ff,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Tạo các lớp hình học 3D
    const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xacadfe,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -10;
    torus.position.x = 5;
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);
    
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x6497b1,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.z = -15;
    sphere.position.x = -5;
    scene.add(sphere);
    
    camera.position.z = 5;
    
    // Xử lý sự kiện resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Theo dõi vị trí chuột
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.002;
      
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;
      
      // Phản ứng với chuột
      torus.position.x += (mouseX * 0.05 - torus.position.x) * 0.02;
      torus.position.y += (mouseY * -0.05 - torus.position.y) * 0.02;
      
      sphere.position.x += (mouseX * -0.05 - sphere.position.x) * 0.02;
      sphere.position.y += (mouseY * 0.05 - sphere.position.y) * 0.02;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);
  
  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 -z-10 pointer-events-none ${className || ''}`}
    />
  );
};

export default ThreeDScene; 