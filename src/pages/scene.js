import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Effects from '@/components/Effects'
import Lights from '@/components/Lights'
import Meshes from '@/components/Meshes'
import Cameras from '@/components/Cameras'
import Environment from '@/components/Environment'
import { OrbitControls } from '@react-three/drei'
import Contacts from '@/components/Contacts/Contacts'
import Projects from '@/components/Projects/Projects'
import Loader from '@/components/Loader/Loader'



export default function Scene() {
  const [contactsPosition, setContactsPosition] = useState('-100%')
  function handleContactsPosition () {
    contactsPosition === '-100%'? setContactsPosition(0) : setContactsPosition('-100%')
  }

  const [projectsPosition, setProjectsPosition] = useState('-100%')
  function handleProjectsPosition () {
    projectsPosition === '-100%'? setProjectsPosition(0) : setProjectsPosition('-100%')
  }

  return (
    <>
    <Suspense fallback={<Loader/>}>
      <Canvas shadows style={{background:"black", height: '100vh'}} frameloop='demand' >

        <OrbitControls enableZoom={false} />

        <Suspense fallback={null} >
          <Environment />
        </Suspense>
        

        <Lights />
        <Cameras />
        <Effects />
        <Meshes setContactsPosition={handleContactsPosition} />

      </Canvas>
    </Suspense>

    <Contacts position={contactsPosition} setPosition={handleContactsPosition} />

    {/* <Projects position={projectsPosition} setPosition={handleProjectsPosition} /> */}

    </>
  )
}
