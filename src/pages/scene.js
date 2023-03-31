import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'
import MyEnvironment from '@/components/MyEnvironment'


export default function Scene() {

  return (
    <Suspense fallback={null}>
      <Canvas shadows  style={{background:"black", height: '100vh'}} >

        <axesHelper args={[40]}/>
        <OrbitControls />
        <MyEnvironment />
        <Lights />
        <Cameras />
        <Effects />
        <Meshes />

      </Canvas>
    </Suspense>
  )
}



