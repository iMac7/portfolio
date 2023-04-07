import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'
import Environment from '@/components/Environment'
import { Color, DoubleSide, Vector2, Vector3 } from 'three'


function Plane() {
  const meshRef = useRef()

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <shaderMaterial
        ref={meshRef}
        attach="material"
        side={DoubleSide}
        uniforms={{
          color: { value: new Color('white') },
          circleCenter: { value: new Vector3() },
          circleRadius: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform vec3 circleCenter;
          uniform float circleRadius;
          varying vec2 vUv;
          void main() {
            float distance = length(gl_FragCoord.xyz - circleCenter);
            float insideCircle = step(distance, circleRadius);
            vec3 circleColor = mix(color, vec3(1.0, 1.0, 0.0), insideCircle);
            gl_FragColor = vec4(circleColor, 1.0);
          }
        `}
      />
    </mesh>
  )
}



export default function Scene() {



  return (
    <Suspense fallback={null}>
      <Canvas shadows  style={{background:"black", height: '100vh'}}  >

        <axesHelper args={[40]}/>
        <OrbitControls />
        <Environment />
        <Lights />
        <Cameras />
        <Effects />
        <Meshes />
      
        {/* <Plane /> */}

      </Canvas>
    </Suspense>
  )
}
