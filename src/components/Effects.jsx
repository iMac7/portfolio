import { Circle } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Noise, Vignette, HueSaturation, GodRays, Bloom, UnrealBloomPass, Scanline, Outline } from '@react-three/postprocessing'
import { BlendFunction, BlurPass, Resizer, KernelSize } from 'postprocessing'
import React, { Suspense, forwardRef, useState, useRef, useMemo, useEffect } from 'react'
import { Mesh, Vector2 } from 'three'


export default function Effects() {

  return (<>
    <Suspense fallback={null}>

        <EffectComposer multisampling={0}>

        <Bloom
          intensity={1.0} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          width={Resizer.AUTO_SIZE} // render width
          height={Resizer.AUTO_SIZE} // render height
          kernelSize={KernelSize.MEDIUM} // blur kernel size
          luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />




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
            





        </EffectComposer>

      
    </Suspense>
    
    </>
  )
}

