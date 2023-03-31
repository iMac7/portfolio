import { Circle } from '@react-three/drei'
import { EffectComposer, Noise, Vignette, HueSaturation, GodRays, Bloom } from '@react-three/postprocessing'
import { BlendFunction, BlurPass, Resizer, KernelSize } from 'postprocessing'
import React, { Suspense, forwardRef, useState } from 'react'
import { Mesh } from 'three'

const Sun = forwardRef(function Sun(props, forwardRef) {

  return (
    <Circle args={[10, 10]} ref={forwardRef} position={[7, 7, -16]} {...props}>
      <meshBasicMaterial color={'yellow'} />
    </Circle>
  )
})

function Effects() {
  const [material, set] = useState()

  return (
    <Suspense fallback={null}>
      {/* <Sun ref={material} /> */}

      {material && (
        <EffectComposer multisampling={0}>
          {/* <GodRays sun={material} exposure={exposure} decay={decay} blur={blur} density={.5} weight={1} /> */}

          {/* <Noise
            opacity={noise}
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          />

          <HueSaturation hue={hue} saturation={saturation} /> */}

            {/* <Scanline
            blendFunction={BlendFunction.OVERLAY}
            density={1.25}
            /> */}


            <Bloom
                intensity={3.0} // The bloom intensity.
                blurPass={undefined} // A blur pass.
                width={Resizer.AUTO_SIZE} // render width
                height={Resizer.AUTO_SIZE} // render height
                kernelSize={KernelSize.LARGE} // blur kernel size
                luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            />

          <Vignette />
        </EffectComposer>
      )}
    </Suspense>
  )
}

export default Effects
