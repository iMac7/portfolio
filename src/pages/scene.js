import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Trail } from '@react-three/drei'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'
import Environment from '@/components/Environment'
import { Color, DoubleSide, Raycaster, Vector2, Vector3 } from 'three'
import {useSpring, animated, config} from '@react-spring/three'
// import { useControls } from 'leva'


function MyMesh() {
  const meshRef = useRef()
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  // const {myvalue} = useControls({myvalue:5})


  return (
    <>
    <animated.mesh 
    position={[0,0,0]}
    scale={scale} 
    onClick={() => setActive(!active)}
    ref={meshRef} 
    >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={'gray'}/>
    </animated.mesh>


    {console.log('active- ', active, 'scale- ', scale)}

    </>

  )
}



export default function Scene() {


  return (
    <Suspense fallback={null}>
      <Canvas shadows  style={{background:"black", height: '100vh'}} frameloop='demand' >

        <axesHelper args={[1.5]} />
        <OrbitControls />
        <Environment />
        <Lights />
        <Cameras />
        <Effects />
        <Meshes />

        {/* <MyMesh /> */}


      </Canvas>
    </Suspense>
  )
}
