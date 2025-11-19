import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Generates a sphere of points
const ParticleSphere = (props: any) => {
  const ref = useRef<THREE.Points>(null);

  // Generate random points on a sphere surface
  const [sphere] = useState(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.5; // Radius variation

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color gradient from blue to purple
      colors[i * 3] = 0.2 + Math.random() * 0.2; // R
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
      colors[i * 3 + 2] = 1.0; // B
    }
    return { positions, colors };
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere.positions} colors={sphere.colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          color="#ffffff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Interactive particles that follow the mouse
const MouseParticles = () => {
  const { viewport } = useThree();
  const ref = useRef<THREE.Points>(null);
  
  const count = 80; // Number of follower particles
  const [data] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for(let i=0; i<count; i++) {
       positions[i*3] = 0;
       positions[i*3+1] = 0;
       positions[i*3+2] = 0;
       
       velocities[i*3] = (Math.random() - 0.5) * 0.02;
       velocities[i*3+1] = (Math.random() - 0.5) * 0.02;
       velocities[i*3+2] = (Math.random() - 0.5) * 0.02;

       // Electric cyan/blue colors
       colors[i*3] = 0.0; // R
       colors[i*3+1] = 0.6 + Math.random() * 0.4; // G
       colors[i*3+2] = 1.0; // B
    }
    return { positions, colors, velocities };
  });

  useFrame((state) => {
    if (!ref.current) return;
    
    // Map mouse (normalized -1 to +1) to viewport world coordinates
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const velocities = data.velocities;
    
    for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const px = positions[ix];
        const py = positions[iy];
        const pz = positions[iz];

        // Distance to target (mouse)
        const dx = x - px;
        const dy = y - py;
        const dz = 0 - pz; // Attraction to z=0 plane

        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Attraction Force (Swarm behavior)
        // Particles accelerate towards mouse, capped to prevent explosion
        const force = Math.min(dist * 0.02, 0.2); 
        
        if (dist > 0.01) {
            velocities[ix] += (dx / dist) * force + (Math.random()-0.5)*0.002;
            velocities[iy] += (dy / dist) * force + (Math.random()-0.5)*0.002;
            velocities[iz] += (dz / dist) * force + (Math.random()-0.5)*0.002;
        }
        
        // Friction / Damping to stop them from oscillating forever
        velocities[ix] *= 0.94;
        velocities[iy] *= 0.94;
        velocities[iz] *= 0.94;
        
        // Update position
        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
      <Points ref={ref} positions={data.positions} colors={data.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
  )
}

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        
        {/* Animated Floating Sphere */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <ParticleSphere />
        </Float>

        {/* Interactive Mouse Particles */}
        <MouseParticles />

        {/* Subtle Fog for depth */}
        <fog attach="fog" args={['#020617', 3, 10]} />
      </Canvas>
    </div>
  );
};

export default Scene;