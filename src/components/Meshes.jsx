import { useRef } from "react"
import { DoubleSide } from "three"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import Flag from "./Flag"


function Meshes() {
    const diamondRef = useRef()
    const { nodes } = useGLTF('/models/diamond.glb')
    const envMapTexture = useLoader(RGBELoader, '/envMaps/night.hdr')


    useFrame(state => {
        diamondRef.current.rotation.y += .01
    })


  return (
    <>
        //Diamond
        <mesh position={[0,0,0]} castShadow ref={diamondRef} geometry={nodes.Diamond_1_0.geometry}>
            <MeshRefractionMaterial wireframe={true} envMap={envMapTexture} toneMapped={false} />
        </mesh>


        //intro
        {/* <Image 
         url="/images/me.jpg"
         grayscale={1}
         transparent
         opacity={0}
         position={[-9,6,-15]} 
         scale={10} 
         onClick={()=>console.log('clicked')} /> */}

        <Text color={'white'} position={[3,18,-15]} >
            hello world
        </Text>

        <Flag />

        <mesh position={[0,10,-16]}>
            <planeGeometry args={[20,20,10,10]}/>
            <MeshReflectorMaterial
            color={'darkblue'}
            side={DoubleSide}
            transparent
            opacity={.5}
             />
        </mesh>









        {/* <mesh position={[3,1,0]} castShadow receiveShadow >
          <boxGeometry args={[3,2,4]} />
          <meshStandardMaterial color={'black'} transparent opacity={.9}/>
        </mesh> */}

        <mesh castShadow receiveShadow rotation-x={-Math.PI * .5} position={[0,-5,0]}>
          <planeGeometry args={[30, 30, 10, 10]} />
          <MeshReflectorMaterial
            side={DoubleSide}
            envMapIntensity={0}
            dithering={true}
            color={[.05,.05,.05]}
            roughness={.7}
            blur={[1000, 400]}
            mixBlur={30}
            mixStrength={20}
            mixContrast={1}
            mirror={1}
            depthScale={.01}
            minDepthThreshold={.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={.25}
            reflectorOffset={.2}
            debug={0}
            wireframe={true}
            />
        </mesh>

        {/* <Sparkles
        count={1000}
        speed={1}
        opacity={10}
        size={2}
        scale={100}
        color={[255,255,0]}
         /> */}

        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />

    </>
  )
}

export default Meshes