// Particles.js
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Particles() {
  const ref = useRef();
  const count = 100;
  const positions = new Float32Array(count * 3);

  // Randomly place particles
  for (let i = 0; i < count; i++) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(20);
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(20);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(20);
  }

  useFrame(({ mouse }) => {
    ref.current.rotation.x = mouse.y * 0.1;
    ref.current.rotation.y = mouse.x * 0.1;
  });

  return (
    <group>
      <Points ref={ref}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attributes', 'position']}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#FFD700"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
