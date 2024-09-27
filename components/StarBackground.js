"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function Stars(props) {
  const ref = useRef()
  const [sphere1, sphere2, sphere3] = useMemo(() => {
    const sphere1 = random.inSphere(new Float32Array(5000), { radius: 1.5 })
    const sphere2 = random.inSphere(new Float32Array(5000), { radius: 1.5 })
    const sphere3 = random.inSphere(new Float32Array(5000), { radius: 1.5 })
    return [sphere1, sphere2, sphere3]
  }, [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere1} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffa500"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <Points positions={sphere2} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.001}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <Points positions={sphere3} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ff00ff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function StarBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 bg-gray-950">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}