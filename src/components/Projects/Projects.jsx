import { useState } from 'react'
import styles from './Projects.module.css'
import Image from 'next/image'
import myimg from '/public/images/ars.jpg'

export default function Projects({position, setPosition}) {
    const values = [1,2,3,4,5,6]

    const [focused, setFocused] = useState(0)

    function handleClick(direction) {
        if(direction==='left') {
            if(focused===0) setFocused(values.length -1)
            else setFocused(focused => focused-1)
        }
        if(direction==='right') {
            if(focused===values.length -1) setFocused(0) 
            else setFocused(focused => focused + 1)
        }
    }


  return (
    <div className={styles.outer} style={{left: position}}>
        <button className={styles.cancel} onClick={setPosition}>x</button>

        <div className={styles.carousel}>
            <button className={styles.left} onClick={() => handleClick('left')}>&lt;</button>
            <button className={styles.right} onClick={() => handleClick('right')}>&gt;</button>

            <div className={styles.images} style={{transform: `translateX(calc(10vw - ${focused * 10}vw)`}}>
                {values.map((value, index) => 
                <div 
                key={index} className={`${index===focused? styles.focused: styles.unfocused} ${styles.project}`}
                onClick={() => setFocused(index)} >

                    <Image 
                    src={myimg}
                    alt='image here'
                    placeholder='blur'
                    />

                </div>
                )}
            </div>

        </div>

    </div>
  )
}
