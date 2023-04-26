import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
// import glb from '../../public/models/diamond.glb'


export default function Loader() {
  // const diamondRef = useRef()
  // const { nodes } = useGLTF('/models/diamond.glb')
  // const { nodes } = useGLTF('../../public/models/diamond.glb')


  return (
    <Canvas style={{width: '100vw', height: '100vh', border: '1px solid red'}}>
      
      {/* <mesh position={[0,0,0]} ref={diamondRef} geometry={nodes.Diamond_1_0.geometry} scale={[5,5,5]}>
      <MeshRefractionMaterial wireframe={false} envMap={worldTexture} toneMapped={false}
      //  color={[1,1,4]}
      />
      </mesh> */}

      <OrbitControls />

      <mesh position={[0,2,0]}>
        <boxGeometry args={[.5,.5,.5]}/>
        <meshBasicMaterial />
      </mesh>

    </Canvas>
  )
}
