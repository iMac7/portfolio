import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Effects from './Effects'
import Lights from './Lights'
import Meshes from './Meshes'
import Cameras from './Cameras'
import Environment from './Environment'
// import Fallback from './Loader'


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
