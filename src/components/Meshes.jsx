import { useRef, useState } from "react"
import { DoubleSide, TextureLoader, MeshBasicMaterial, Color, MeshStandardMaterial, Vector3, BackSide } from "three"
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text, Sparkles, MeshTransmissionMaterial } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import Flag from "./Flag"


function Meshes() {
    const diamondRef = useRef()
    const { nodes } = useGLTF('/models/diamond.glb')
    const worldTexture = useLoader(TextureLoader, '/envMaps/room.jpg')

    // useFrame(state => {
    //     diamondRef.current.rotation.y += .01
    // })


  return (
    <>
        //Diamond
        {/* <mesh position={[0,0,0]} ref={diamondRef} geometry={nodes.Diamond_1_0.geometry} scale={[5,5,5]}>
            <MeshRefractionMaterial wireframe={false} envMap={worldTexture} toneMapped={false}
            //  color={[1,1,4]}
              />
        </mesh> */}


        //INTRO
        <mesh position={[-60,-10,-90]} rotation={[0,Math.PI*.2,0]}>
            <planeGeometry args={[120,150,10,10]}/>
            <MeshTransmissionMaterial
            // color={[0,50,1000]}
            color={[0,0,.1]}
            roughness={.9}
            thickness={3}
            emissive={'black'} emissiveIntensity={2} toneMapped={false}
            transparent opacity={.8} side={DoubleSide}
            />
        </mesh>

        {/* <mesh position={[-57,-10,-80]} rotation={[0,Math.PI*.2,0]}>
            <planeGeometry args={[115,140,10,10]}/>
            <meshBasicMaterial color={'black'} />
        </mesh> */}


        {/* <Image 
         url="/images/me.jpg"
         grayscale={1}
         transparent
         opacity={0}
         position={[-9,6,-15]} 
         scale={10} 
         onClick={()=>console.log('clicked')} /> */}

        <Text 
        color={new Color(10,100,10)}
         position={[-60,-50,-80]} fontSize={5} rotation={[0,Math.PI*.2,0]}
        material={new MeshStandardMaterial()}
        >
            NAME &nbsp;:&nbsp; ME
            {'\n'}
            {'\n'}SPECIALTY : WEB DEVELOPMENT
            {'\n'}
            {'\n'}LANGUAGES : ENGLISH, SWAHILI,GERMAN
        </Text>

        {/* <Flag position={[-40,-25,-86]}/> */}






        <mesh position={[50,-10,-70]} rotation={[0,Math.PI*-.2,0]}>
          <planeGeometry args={[80,30,10,10]}/>
          <meshStandardMaterial
          toneMapped={false} side={DoubleSide}
          color={[0,0,100]} transparent opacity={.5}
          />
        </mesh>

        <Text 
        position={[50,-10,-69]} rotation={[0,Math.PI*-.2,0]} 
        color={[1000,1000,1000]} fontSize={5}
        material={new MeshStandardMaterial()}
        >
         CLICK FOR CONTACT DETAILS
        </Text>






        //PROJECTS
        <mesh position={[110,40,40]} rotation={[0,Math.PI*-.6,0]}>
          <planeGeometry args={[130,40,10,10]}/>
          <meshStandardMaterial
          toneMapped={false} side={DoubleSide}
          color={[10,0,100]} transparent opacity={.1}
          />
        </mesh>

        <Text 
        position={[109,40,40]} rotation={[0,Math.PI*-.6,0]} 
        color={[1000,1000,1000]} fontSize={8}
        material={new MeshStandardMaterial()}
        >
         CLICK TO GO TO PROJECTS PAGE
        </Text>


        





        //SKILLS

        <mesh position={[-47,10,124]} rotation={[Math.PI*0,Math.PI*-0.1,Math.PI*0]}>
            <planeGeometry args={[75,115,10,10]}/>
            <meshStandardMaterial color={[.1,0,.1]}transparent opacity={.9} side={DoubleSide}  />
        </mesh>

        <Text color={new Color(1000,0,0)} position={[-50,50,120]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={9}>
            SKILLS
        </Text>
        {/* {new Color(100,1,1)} */}
        <Text color={[100,100,100]} position={[-50,10,120]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={5}>
            {'\n'}&gt;&nbsp;HTML
            {'\n'}&gt;&nbsp;CSS
            {'\n'}&gt;&nbsp;SASS
            {'\n'}&gt;&nbsp;JAVASCRIPT
            {'\n'}&gt;&nbsp;REACT
            {'\n'}&gt;&nbsp;NODE.JS
            {'\n'}&gt;&nbsp;NEXT.JS
            {'\n'}&gt;&nbsp;THREE.JS
            {'\n'}&gt;&nbsp;SQL
            {'\n'}&gt;&nbsp;MONGODB
            {'\n'}&gt;&nbsp;WEB3
            {'\n'}&gt;&nbsp;DOCKER & KUBERNETES
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

        <Text color={new Color(100,0,1)} emissive={'purple'} position={[-25,99,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]} fontSize={5}>
            CLOUD
            {'\n'}{'\n'}HARDWARE
            {'\n'}{'\n'}SECURITY
            {'\n'}{'\n'}GAMING
            {'\n'}{'\n'}FOOTBALL
            {'\n'}{'\n'}SWIMMING
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