import { useRef, useState } from "react"
import { DoubleSide, TextureLoader, MeshBasicMaterial, Color, MeshStandardMaterial, Vector3 } from "three"
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text, Sparkles } from "@react-three/drei"
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
            {/* <MeshReflectorMaterial
            side={DoubleSide}
            envMapIntensity={0}
            dithering={true}
            color={[.05,.05,.05]}
            roughness={.7}
            blur={.9}
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
            // transparent
            // opacity={.7}
            // wireframe={true}
            /> */}
            <meshNormalMaterial />

        </mesh>

        {/* <Image 
         url="/images/me.jpg"
         grayscale={1}
         transparent
         opacity={0}
         position={[-9,6,-15]} 
         scale={10} 
         onClick={()=>console.log('clicked')} /> */}

        <Text color={new Color(50,1,1)} position={[-60,-50,-86]} fontSize={5} rotation={[0,Math.PI*.2,0]}>
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}COUNTRY : KENYA
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>

        <Flag position={[-40,-25,-86]}/>







         //BESIDE BED
        <mesh position={[130,-10,50]} rotation={[0,Math.PI*-.6,0]}>
          <planeGeometry args={[140,200,10,10]}/>
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
            transparent
            opacity={.7}
            // wireframe={true}
          />

        </mesh>

        <Text color={new Color(0,1,0)} position={[129,-10,50]} rotation={[0,Math.PI*-.6,0]} fontSize={5}>
            PROFESSIONAL QUALIFICATIONS
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>







         //ON BED
         <mesh position={[-50,10,130]} rotation={[Math.PI*0,Math.PI*-0.1,Math.PI*0]}>
            <planeGeometry args={[80,120,10,10]}/>
            <MeshReflectorMaterial
            side={DoubleSide}
            envMapIntensity={0.5}
            dithering={true}
            color={'black'}
            roughness={.7}
            blur={.5}
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
            transparent
            opacity={.97}
            />

        </mesh>

        <Text color={new Color(1000,1,1)} position={[-50,50,129]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={9}>
            SKILLS
        </Text>
        <Text color={new Color(50,1,1)} position={[-50,10,129]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={5}>
            {'\n'}HTML
            {'\n'}CSS
            {'\n'}SASS
            {'\n'}JAVASCRIPT
            {'\n'}REACT
            {'\n'}NODE.JS
            {'\n'}NEXT.JS
            {'\n'}SQL
            {'\n'}MONGODB
            {'\n'}WEB3
        </Text>











         //CEILING
        {/* <mesh position={[0,100,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]}>
            <planeGeometry args={[130,150,10,10]}/>
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
            />

        </mesh> */}

        
        <Text color={new Color(100,0,1)} emissive={'purple'} position={[-70,99,20]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]} fontSize={8}>
          OTHER INTERESTS
        </Text>

        <Text color={new Color(100,0,1)} emissive={'purple'} position={[-30,99,5]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]} fontSize={5}>
            CLOUD
            {'\n'}{'\n'}HARDWARE
            {'\n'}{'\n'}SECURITY
            {'\n'}{'\n'}GAMING
            {'\n'}{'\n'}FOOTBALL
            {'\n'}{'\n'}TRAVELING

        </Text>









        {/* <mesh position={[3,1,0]} castShadow receiveShadow >
          <boxGeometry args={[3,2,4]} />
          <meshStandardMaterial color={'black'} transparent opacity={.9}/>
        </mesh> */}

        <Sparkles
        count={10}
        speed={1}
        opacity={10}
        size={4}
        scale={100}
        color={[255,255,0]}
         />

    </>
  )
}

export default Meshes