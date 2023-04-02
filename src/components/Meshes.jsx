import { useRef } from "react"
import { DoubleSide, TextureLoader, MeshBasicMaterial, Color, MeshStandardMaterial } from "three"
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import Flag from "./Flag"


function Meshes() {
    const diamondRef = useRef()
    const { nodes } = useGLTF('/models/diamond.glb')
    const worldTexture = useLoader(TextureLoader, '/envMaps/room.jpg')


    useFrame(state => {
        diamondRef.current.rotation.y += .01
    })


  return (
    <>

        //Diamond
        <mesh position={[0,0,0]} ref={diamondRef} geometry={nodes.Diamond_1_0.geometry} scale={[5,5,5]}>
            <MeshRefractionMaterial wireframe={false} envMap={worldTexture} toneMapped={false}
            //  color={[1,1,4]}
              />
        </mesh>


        //INTRO PANEL
        <mesh position={[-60,-10,-90]} rotation={[0,Math.PI*.2,0]}>
            <planeGeometry args={[100,150,10,10]}/>
            <MeshReflectorMaterial
            color={'black'}
            // emissive={'red'}
            side={DoubleSide}
            transparent
            opacity={.5}
            blur={.5}
             />
        </mesh>

        {/* <Image 
         url="/images/me.jpg"
         grayscale={1}
         transparent
         opacity={0}
         position={[-9,6,-15]} 
         scale={10} 
         onClick={()=>console.log('clicked')} /> */}

        <Text color={new Color(100,1,1)} position={[-60,-10,-88]} fontSize={5} rotation={[0,Math.PI*.2,0]}>
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>

        {/* <Flag /> */}







         //BESIDE BED
        <mesh position={[130,-10,50]} rotation={[0,Math.PI*-.6,0]}>
          <planeGeometry args={[140,200,10,10]}/>
          <MeshReflectorMaterial
          color={'black'}
          emissive={'black'}
          side={DoubleSide}
          transparent
          opacity={.9}
            />
        </mesh>

        <Text color={new Color(100,1,1)} position={[129,-10,50]} rotation={[0,Math.PI*-.6,0]} fontSize={5}>
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>







         //ON BED
        <mesh position={[-30,-50,130]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.13]}>
            <planeGeometry args={[130,80,10,10]}/>
            <MeshReflectorMaterial
            color={'black'}
            emissive={'black'}
            side={DoubleSide}
            transparent
            opacity={.9}
             />
        </mesh>

        <Text color={new Color(100,1,1)} position={[-30,-49,130]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.13]} fontSize={5}>
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>











         //CEILING
        <mesh position={[0,100,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]}>
            <planeGeometry args={[170,150,10,10]}/>
            <MeshReflectorMaterial
            color={'black'}
            emissive={'black'}
            side={DoubleSide}
            transparent
            opacity={.9}
             />
        </mesh>

        <Text color={new Color(100,1,1)} position={[0,99,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]} fontSize={5}>
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>





        {/* <mesh position={[0,4,0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={[100,1,1]} emissive={'hotpink'} />
        </mesh> */}






        {/* <mesh position={[3,1,0]} castShadow receiveShadow >
          <boxGeometry args={[3,2,4]} />
          <meshStandardMaterial color={'black'} transparent opacity={.9}/>
        </mesh> */}

        {/* <mesh castShadow receiveShadow rotation-x={-Math.PI * .5} position={[0,-10,0]}>
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
            // wireframe={true}
            />
        </mesh> */}

        {/* <Sparkles
        count={1000}
        speed={1}
        opacity={10}
        size={2}
        scale={100}
        color={[255,255,0]}
         /> */}

    </>
  )
}

export default Meshes