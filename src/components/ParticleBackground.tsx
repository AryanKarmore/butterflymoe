import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<{
    positions: Float32Array;
    velocities: Float32Array;
  } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (0.5 - e.clientY / window.innerHeight) * 20
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize particles
    const count = 150;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    particlesRef.current = { positions, velocities };

    // Set up points geometry
    if (pointsRef.current) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry = geometry;
    }

    // Set up lines geometry
    if (linesRef.current) {
      const linePositions = new Float32Array(count * 6); // Max possible connections
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      linesRef.current.geometry = lineGeometry;
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !particlesRef.current) return;
    
    const { positions, velocities } = particlesRef.current;
    const count = positions.length / 3;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Boundary check
      if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update connections
    if (linesRef.current && linesRef.current.geometry) {
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const maxConnections = 5;
      const connectionDistance = 2;
      
      // Clear previous lines
      linePositions.fill(0);
      
      for (let i = 0; i < count && lineIndex < maxConnections; i++) {
        const ix = positions[i * 3];
        const iy = positions[i * 3 + 1];
        const iz = positions[i * 3 + 2];
        
        // Check distance to mouse
        const distToMouse = Math.sqrt(
          (ix - mouseRef.current.x) ** 2 + 
          (iy - mouseRef.current.y) ** 2 + 
          iz ** 2
        );
        
        if (distToMouse < 3) {
          // Connect to nearby particles
          for (let j = i + 1; j < count && lineIndex < maxConnections; j++) {
            const jx = positions[j * 3];
            const jy = positions[j * 3 + 1];
            const jz = positions[j * 3 + 2];
            
            const dist = Math.sqrt(
              (ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2
            );
            
            if (dist < connectionDistance) {
              linePositions[lineIndex * 6] = ix;
              linePositions[lineIndex * 6 + 1] = iy;
              linePositions[lineIndex * 6 + 2] = iz;
              linePositions[lineIndex * 6 + 3] = jx;
              linePositions[lineIndex * 6 + 4] = jy;
              linePositions[lineIndex * 6 + 5] = jz;
              lineIndex++;
            }
          }
        }
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }
    
    // Gentle rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(150 * 3), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(150 * 6), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
