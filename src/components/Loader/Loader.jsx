import styles from './Loader.module.css'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { Vector2 } from 'three'
import { GlitchMode } from 'postprocessing'


function Loader() {
  return (
    <>
    <div className={styles.outer}>
        <span className={styles.text}>Loading</span>

        <div className={styles.cssloadContainer}>
            <div className={styles.cssloadDot}></div>
            <div className={`${styles.step} ${styles.cssloadS1}`}></div>
            <div className={`${styles.step} ${styles.cssloadS2}`}></div>
            <div className={`${styles.step} ${styles.cssloadS3}`}></div>
        </div>
    </div>

    <Canvas className={styles.canvas} style={{height: '100vh'}} >

        <EffectComposer multisampling={0}>
            <Glitch
            delay={[.5, 1]} 
            duration={[0.1, 0.5]} 
            mode={GlitchMode.SPORADIC}
            active 
            ratio={0.85}
            chromaticAberrationOffset={new Vector2(.5, .5)}
            columns={.1}
            />
        </EffectComposer>

        <Sparkles 
        count={50}
        scale={7}
        size={1}
        speed={.5}
        />

    </Canvas>

    </>
  )
}

export default Loader