
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y = Math.PI;
    }
  }, []);
  
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#1B3664" roughness={0.7} />
      <mesh position={[0, 0, 1.02]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#EEF5FF" roughness={0.5} />
      </mesh>
    </mesh>
  );
};

const AirplanePath = () => {
  const planeRef = useRef<THREE.Group>(null);
  const pathRadius = 1.4;
  
  useFrame(({ clock }) => {
    if (planeRef.current) {
      const time = clock.getElapsedTime() * 0.5;
      const x = Math.sin(time) * pathRadius;
      const z = Math.cos(time) * pathRadius;
      const y = Math.sin(time * 0.75) * 0.3;
      
      planeRef.current.position.set(x, y, z);
      
      // Update rotation to face direction of travel
      const nextX = Math.sin(time + 0.1) * pathRadius;
      const nextZ = Math.cos(time + 0.1) * pathRadius;
      const nextY = Math.sin((time + 0.1) * 0.75) * 0.3;
      
      planeRef.current.lookAt(nextX, nextY, nextZ);
    }
  });
  
  return (
    <group ref={planeRef}>
      {/* Plane body */}
      <mesh>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshStandardMaterial color="#E31937" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#E31937" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshStandardMaterial color="#E31937" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

const GlobeWithPlane = () => {
  return (
    <div className="h-32 w-32 md:h-40 md:w-40">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Globe />
        <AirplanePath />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default GlobeWithPlane;
