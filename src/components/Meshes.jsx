import { useEffect, useRef, useState } from "react"
import { Raycaster, DoubleSide, TextureLoader, MeshBasicMaterial, Color, MeshStandardMaterial, Vector2, Vector3, BackSide } from "three"
import { MeshReflectorMaterial, Stars, useGLTF, MeshRefractionMaterial, Image, Text, Sparkles, MeshTransmissionMaterial } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useSpring, animated, config} from '@react-spring/three'

export default function Meshes({setContactsPosition, setProjectsPosition}) {

    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const message = 'IAN MACHARIA'

    const [opacity, setOpacity] = useState(0)      

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
    

    const introRef = useRef()
    const contactsRef = useRef()
    const projectsRef = useRef()
    const interestsRef = useRef()
    const skillsRef = useRef()



    const [introSpring, setIntroSpring] = useSpring(() => ({
      scale: [1,1,1],
      config: config.wobbly
    }))

    const [contactsSpring, setContactsSpring] = useSpring(() => ({
      scale: [1,1,1],
      rotation: [0,0,0],
      position: [0,0,0],
      onRest: () => setContactsSpring({rotation: [0,0,0]})
    }))

    const [projectsSpring, setProjectsSpring] = useSpring(() => ({
      color: [10,0,100],
      position:[0,0,0],
      config: config.wobbly
    })) 

    const [skillsSpring, setSkillsSpring] = useSpring(() => ({
      scale: [1.4,.6,1],
      config: config.wobbly
    })) 

    const [interestsSpring, setInterestsSpring] = useSpring(() => ({
      scale: [1,1,1],
      config: config.wobbly
    })) 


    const vector2 = new Vector2(0,0)

    const raycaster = new Raycaster()


    useFrame(({ camera }) => {
      raycaster.setFromCamera(vector2, camera);

      const introIntersects = raycaster.intersectObject(introRef.current);
      if(introIntersects.length > 0) {
        setIntroSpring({ scale: [1.2, 1.2, 1]})
      }else{
        setIntroSpring({ scale: [1,1,1]})
      }

      const contactsIntersects = raycaster.intersectObject(contactsRef.current);
      if(contactsIntersects.length > 0) {
        setContactsSpring({position: [0,10,0], scale: [1,1,1]})
      }else{
        setContactsSpring({position: [0,0,0]})
      }

      const projectsIntersects = raycaster.intersectObject(projectsRef.current);
      if(projectsIntersects.length > 0) {
        setProjectsSpring({color:[10,0,100], position: [0,-10,0]})
      }else{
        setProjectsSpring({color:[0,0,0], position: [0,0,0]})
      }


      const skillsIntersects = raycaster.intersectObject(skillsRef.current);
      if(skillsIntersects.length > 0) {
        setSkillsSpring({scale:[1,1,1], opacity:1})
      }else{
        setSkillsSpring({scale:[1,.7,1], opacity:0})
      }


    })


  return (
    <>  

        <animated.group scale={introSpring.scale} ref={introRef}>
          <animated.mesh 
          position={[-60,-10,-90]}
          rotation={[0,Math.PI*.2,Math.PI]}>
            <planeGeometry args={[120,150,10,10]}/>
            <shaderMaterial
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

          </animated.mesh>

          {/* <Image 
          url="/images/me.png"
          position={[-60,20,-87]} rotation={[0,Math.PI*.2,0]} 
          scale={91}
          transparent
          onClick={()=>console.log('clicked')}
          /> */}

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
        </animated.group>





        <animated.group 
        onClick={setContactsPosition}
        position={contactsSpring.position} rotation={contactsSpring.rotation} ref={contactsRef} >
          <mesh position={[50,-10,-70]} rotation={[0,Math.PI*-.2,0]}>
            <planeGeometry args={[80,30,10,10]}/>
            <meshStandardMaterial
            toneMapped={false} side={DoubleSide}
            color={[0,0,100]} transparent opacity={.5}
            />
          </mesh>

          <mesh position={[50,-10,-72]} rotation={[0,Math.PI*-.2,0]}>
            <planeGeometry args={[80,100,10,10]}/>
            <meshStandardMaterial
            color={[0,0,100]} transparent opacity={0}
            />
          </mesh>

          <Text 
          position={[50,-10,-69]} rotation={[0,Math.PI*-.2,0]} 
          color={[1000,1000,1000]} fontSize={5}
          material={new MeshStandardMaterial()}
          >
          CLICK FOR CONTACT DETAILS
          </Text>

        </animated.group>




        <animated.group position={projectsSpring.position} scale={projectsSpring.scale} ref={projectsRef}
        onClick={setProjectsPosition}>
          <mesh position={[110,40,40]} rotation={[0,Math.PI*-.6,0]}>
            <planeGeometry args={[130,40,10,10]}/>
            <animated.meshStandardMaterial
            toneMapped={false} side={DoubleSide}
            color={projectsSpring.color}
            transparent opacity={projectsSpring.opacity}
            />
          </mesh>

          <mesh position={[112,0,40]} rotation={[0,Math.PI*-.6,0]}>
            <planeGeometry args={[130,200,10,10]}/>
            <meshStandardMaterial
            color={[10,0,100]} transparent opacity={0}
            />
          </mesh>

          <Text 
          position={[109,40,40]} rotation={[0,Math.PI*-.6,0]} 
          color={[1000,1000,1000]} fontSize={8}
          material={new MeshStandardMaterial()}
          >
          CLICK TO GO TO PROJECTS PAGE
          </Text>
        </animated.group>

        





        <animated.group ref={skillsRef} scale={skillsSpring.scale}>
          <mesh position={[-47,10,124]} rotation={[Math.PI*0,Math.PI*-0.1,Math.PI*0]}>
              <planeGeometry args={[75,115,100,100]}/>
              <meshStandardMaterial color={[0,.1,9]} toneMapped={false} transparent opacity={.9} side={DoubleSide} 
              />
          </mesh>

          <mesh position={[-47,10,124]} rotation={[Math.PI*0,Math.PI*-0.1,Math.PI*0]}>
              <planeGeometry args={[130,150,100,100]}/>
              <meshStandardMaterial color={[0,.1,9]} toneMapped={false} transparent opacity={0} side={DoubleSide} 
              />
          </mesh>

          <Text position={[-50,50,120]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={9}>
              SKILLS
          </Text>
          <Text color={[100,100,100]} position={[-50,10,120]} rotation={[Math.PI*0,Math.PI*.9,Math.PI*0]} fontSize={5}>
              {'\n'}&gt;&nbsp;HTML
              {'\n'}&gt;&nbsp;CSS
              {'\n'}&gt;&nbsp;MATERIAL UI
              {'\n'}&gt;&nbsp;JAVASCRIPT
              {'\n'}&gt;&nbsp;TYPESCRIPT
              {'\n'}&gt;&nbsp;REACT
              {'\n'}&gt;&nbsp;NODE.JS
              {'\n'}&gt;&nbsp;NEXT.JS
              {'\n'}&gt;&nbsp;THREE.JS
              {'\n'}&gt;&nbsp;SQL
              {'\n'}&gt;&nbsp;MONGODB
              {'\n'}&gt;&nbsp;WEB3
              {'\n'}&gt;&nbsp;DOCKER & KUBERNETES
          </Text>

        </animated.group>









        <animated.group ref={interestsRef}>
          {/* <Image 
          url="/images/arsenal.png"
          position={[0,100,-10]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]}
          scale={91}
          grayscale={.8}
          transparent
          opacity={.2}
          onClick={()=>console.log('clicked')} /> */}


          {/* <Text color={new Color(100,0,1)} emissive={'purple'} position={[-70,99,20]} rotation={[Math.PI*0.5,Math.PI*0,Math.PI*0.3]} fontSize={8}>
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

          </Text> */}
        </animated.group>




        <Sparkles
        count={30}
        speed={5}
        opacity={25}
        size={1}
        scale={350}
        />


    </>
  )
}
