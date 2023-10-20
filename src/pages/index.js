import { Suspense, useEffect, useLayoutEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, useHelper } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const div1ref = useRef(null)
  const div2ref = useRef(null)
  const div3ref = useRef(null)
  const div4ref = useRef(null)
  const div5ref = useRef(null)

  useLayoutEffect(() => {
    const triggers = [div1ref, div2ref, div3ref, div5ref].map((divRef) =>
      ScrollTrigger.create({
        trigger: divRef.current,
        start: "top top",
        pin: true,
      })
    )

    const projectsContainer = document.querySelector(".projects")
    const projectsAnimation = gsap.to(projectsContainer, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: div4ref.current,
        pin: true,
        scrub: true,
        snap: 1 / (projectsContainer.children.length - 1),
        end: () => "+=" + projectsContainer.offsetWidth,
      },
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      projectsAnimation.kill()
    }
  }, [])

  return (
    <>
      <Canvas
        shadows
        style={{
          background: "black",
          height: "100vh",
          position: "fixed",
          zIndex: "-1",
        }}
      >
        <OrbitControls />
        <axesHelper args={[3]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={5}
          saturation={0}
          fade
          speed={2}
        />
        <group></group>
      </Canvas>

      <div ref={div1ref} style={{ height: "100vh", background: "transparent" }}>
        pic
      </div>
      <div ref={div2ref} style={{ height: "100vh", background: "yellow" }}>
        <h1>About div</h1>
      </div>
      <div ref={div3ref} style={{ height: "100vh", background: "blue" }}>
        skills
      </div>
      <div
        className='projects'
        ref={div4ref}
        style={{
          background: "yellow",
          display: "flex",
          width: "400vw",
        }}
      >
        <div
          className='project'
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Project 1</h1>
        </div>
        <div
          className='project'
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "red",
          }}
        >
          <h1>Project 2</h1>
        </div>
        <div
          className='project'
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Project 3</h1>
        </div>
        <div
          className='project'
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "green",
          }}
        >
          <h1>Project 4</h1>
        </div>
      </div>
      <div
        ref={div5ref}
        style={{ height: "100vh", background: "gray", color: "white" }}
      >
        <h1>Contact div</h1>
      </div>
    </>
  )
}
