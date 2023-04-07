import { useEffect, useRef, useState } from "react"
import { DoubleSide, TextureLoader, MeshBasicMaterial, Color, MeshStandardMaterial, Vector2, Vector3, BackSide } from "three"
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text, Sparkles, MeshTransmissionMaterial } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import Flag from "./Flag"


function Meshes() {
    const diamondRef = useRef()
    const { nodes } = useGLTF('/models/diamond.glb')
    const worldTexture = useLoader(TextureLoader, '/envMaps/room.jpg')

    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const message = 'IAN MACHARIA'

    const [opacity, setOpacity] = useState(0)
      
    // useFrame(state => {
      //     diamondRef.current.rotation.y += .01
      // })
      
    // const [name, setName] = useState('me')
    // useEffect(() => {
    //   const timeOut = setTimeout(() => {
    //     setName('this is the set name')
    //   }, 3000);
    
    //   return () => {
    //     clearTimeout(timeOut)
    //   }
    // }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        if (isTyping) {
          setText(prevText => {
            if (prevText === message) setIsTyping(false)
            return message.slice(0, prevText.length + 1)
          })
        } else {
          clearInterval(interval);
          setOpacity(1)
        }
      }, 200);
  
      return () => clearInterval(interval);
      
    }, [isTyping]);
  
    
    const materialRef = useRef()

  // useFrame(({ mouse, raycaster, camera, scene }) => {
  //   const point = new Vector2(mouse.x, mouse.y)
  //   raycaster.setFromCamera(point, camera)
  //   const intersects = raycaster.intersectObjects(scene.children)
  //   if (intersects.length > 0) {
  //     const { point } = intersects[0]
  //     materialRef.current.uniforms.touchPoint.value = point
  //   }
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
        <mesh position={[-60,-10,-90]} rotation={[0,Math.PI*.2,Math.PI]}>
          <planeGeometry args={[120,150,10,10]}/>
          <shaderMaterial
          ref={materialRef}
          attach="material"
          side={DoubleSide}
          transparent={true}
          uniforms={{
            color: { value: new Color('black') },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 color;
            varying vec2 vUv;
            void main() {
              float opacity = smoothstep(0.3, 0.7, vUv.y);
              gl_FragColor = vec4(color, opacity);
            }
          `}
        />        

        </mesh>

        <Image 
         url="/images/me.png"
        position={[-60,20,-87]} rotation={[0,Math.PI*.2,0]} 
         scale={91}
         transparent
         onClick={()=>console.log('clicked')}
        />

        <Text 
        color={[.8,.8,.8]}
         position={[-60,-50,-80]} fontSize={6} rotation={[0,Math.PI*.2,0]}
        material={new MeshStandardMaterial({toneMapped:false})}
        >
            NAME &nbsp;:&nbsp; {text}
            {'\n'}{'\n'}
        </Text>

        <Text 
        color={[.8,.8,.8]}
         position={[-60,-50,-80]} fontSize={6} rotation={[0,Math.PI*.2,0]}
        material={new MeshStandardMaterial({toneMapped:false, transparent: true, opacity: opacity})}
        >
            {'\n'}SPECIALTY : WEB DEVELOPMENT
        </Text>






        //CONTACT DETAILS

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
            <planeGeometry args={[75,115,100,100]}/>
            <meshStandardMaterial color={[0,.1,9]} toneMapped={false} transparent opacity={.9} side={DoubleSide} 
            // wireframe={true}  
            />
        </mesh>

        <Text position={[-50,50,120]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={9}>
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











        //INTERESTS
         
        <Image 
        url="/images/arsenal.png"
        position={[0,100,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]}
        scale={91}
        grayscale={.8}
        transparent
        opacity={.2}
        onClick={()=>console.log('clicked')} />


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