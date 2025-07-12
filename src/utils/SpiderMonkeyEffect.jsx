import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function SpiderMonkeyEffect() {
  const [positions, setPositions] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < 200; i++) {
      tempArray.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
    }
    setPositions(tempArray);
  }, []);

  const handleMouseMove = (event) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <Canvas
      onMouseMove={handleMouseMove}
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="absolute inset-0"
    >
      <Points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(positions)}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          size={0.05}
          color="#FFD700"
          depthWrite={false}
        />
      </Points>
    </Canvas>
  );
}
