import { PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"

//will support from 300px+ device widths, any less and that's not a smartphone lmao
function Cameras() {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if(window.innerWidth < 1000){
      setZoom((window.innerWidth/700)*.5 + .5)
    }
    
  }, [])
  

  return (
    <PerspectiveCamera makeDefault fov={62} zoom={zoom} position={[46.7,6,61]} />
    )
}

export default Cameras