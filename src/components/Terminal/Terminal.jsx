import { useEffect, useState } from 'react'
import styles from './Terminal.module.css'
import { useRouter } from 'next/router'
import Loader from '../Loader/Loader'


export default function Terminal() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const message = 'whoami'

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        setText(prevText => {
          if (prevText === message) setIsTyping(false)
          return message.slice(0, prevText.length + 1)
        })
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
    
  }, [isTyping]);


  const router = useRouter()

  useEffect(() => {
    router.prefetch('/scene')
  }, [router])
  

  if(isTyping===false) {
    setTimeout(() => {
      setLoading(true)
      setTimeout(() => {
        router.push('/scene')
      }, 4000);
    }, 4000);
  }

  const [active, setActive] = useState(false)
  

  useEffect(() => {
    const interval = setInterval(() => setActive(!active), 1000)
  
    return () => {
      clearInterval(interval)
    }
  }, [active])
  


  return (
    <>
    {!loading ?
    <div className={styles.main}>
        <div className={`${styles.terminal} ${!loading? styles.visible: undefined}`}>

          <nav>
            <div className={styles.head}>
              <span></span>
              <span>me:~</span>
              <div className={styles.controls}>
                <svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 1920 1920">
                <path d="M960 0c529.468 0 960 430.645 960 960s-430.532 960-960 960C430.645 1920 0 1489.355 0 960S430.645 0 960 0Zm508.235 903.53H451.765v112.94h1016.47V903.53Z" fillRule="evenodd"/>
                </svg>

                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 6L6 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 10V6H14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 14V18H10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
                  <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"></path>
                </svg>

              </div>
              
            </div>

            <ul className={styles.ul}>
                <li>File</li>
                <li>Edit</li>
                <li>View</li>
                <li>Terminal</li>
                <li>Help</li>
            </ul>
          </nav>

          <div className={styles.content}>
            <div className={styles.line}>
              <span>me@portfolio:~$&nbsp;</span>
              <span>{text}</span>              
              <span className={styles.blinker}>_</span>
            </div>
          </div>

        </div>

    </div>:

    <Loader />}
    </>
  )
}

