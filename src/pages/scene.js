import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'


export default function Scene() {

  return (
    <Suspense fallback={null}>
      <Canvas shadows  style={{background:"black", height: '100vh'}} >

        <OrbitControls />
        <Lights />
        <Cameras />
        <Effects />
        <Meshes />

      </Canvas>
    </Suspense>
  )
}



