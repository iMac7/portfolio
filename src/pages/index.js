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

    const projects = gsap.utils.toArray(".project")
    const projectsAnimation = gsap.to(projects, {
      xPercent: -100 * projects.length - 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        pin: true,
        scrub: 1,
        snap: 1 / (projects.length - 1),
        end: () => "+=" + document.querySelector(".projects").offsetWidth,
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

      <div className='me' style={{ background: "transparent", color: "black" }}>
        <div
          ref={div1ref}
          style={{ height: "100vh", background: "transparent" }}
        >
          {/* Add your picture here */}
        </div>
        <div ref={div2ref} style={{ height: "100vh", background: "yellow" }}>
          <h1>About div</h1>
        </div>
        <div ref={div3ref} style={{ height: "100vh", background: "blue" }}>
          {/* Add your skills here */}
        </div>
        <div
          className='projects'
          ref={div4ref}
          style={{
            background: "white",
            // height: "100vh",
            // width: "400vw",
            // display: "flex",
            // overflowX: "hidden",
            borderTop: "2px solid red",
            borderBottom: "2px solid red",
          }}
        >
          {/* Add your projects here */}
          <div
            className='project'
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid black",
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
              borderBottom: "1px solid black",
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
              borderBottom: "1px solid black",
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
              borderBottom: "1px solid black",
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
      </div>
    </>
  )
}
