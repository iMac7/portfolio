import { useRef } from "react"
import { TextureLoader, Vector2 } from "three"
import { useFrame, useLoader } from "@react-three/fiber"
import {vertexShader, fragmentShader} from '../../public/shaders'


export default function Flag({position}) {
    const flagTexture = useLoader(TextureLoader, '/textures/kenya.png')

    const meshRef = useRef()

    useFrame(state => {
        meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
    })


  return (
    <>
        <mesh position={position} rotation={[0,Math.PI*.2,0]} ref={meshRef} >
         <planeGeometry args={[15,15,20,20]}/>
         <rawShaderMaterial
          uniforms={{
            uTexture: {value: flagTexture},
            uFrequency: {value: new Vector2(10, 5)},
            uTime: {value: 0},  
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
         
         />
        </mesh>

    </>
  )
}