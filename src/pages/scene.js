import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'
import Environment from '@/components/Environment'
import Fallback from '@/components/Loader'
import Loader from '@/components/Loader'
import { OrbitControls } from '@react-three/drei'


export default function Scene() {

  return (
    <>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Canvas shadows style={{background:"black", height: '100vh'}} frameloop='demand' >

        <axesHelper args={[1.5]} />
        <OrbitControls />
        <Environment />
        <Lights />
        <Cameras />
        <Effects />
        <Meshes />

      </Canvas>
    </Suspense>


    </>
  )
}
