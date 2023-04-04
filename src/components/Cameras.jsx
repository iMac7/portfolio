import { PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"

function Cameras() {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    console.log(window.innerWidth, window.innerHeight)
    if(window.innerWidth < 1000){
      //because the site will support from 300px+ device widths, any less and that's not a smartphone lmao
      setZoom((window.innerWidth/700)*.5 + .5)
    }
    
  }, [])
  

  return (
    <PerspectiveCamera makeDefault fov={60} zoom={zoom} position={[42,-1,65]} />
    )
}

export default Cameras