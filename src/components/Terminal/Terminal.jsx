import { useEffect, useState } from 'react'
import styles from './Terminal.module.css' 

function Terminal() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const message = 'whoami'

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


  return (
    <div className={styles.main}>
        <div className={styles.terminal}>

          <nav>
            <div className={styles.head}>
              <span></span>
              <span>me:~</span>
              <div className={styles.controls}>
                <svg fill="#00ff00" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                  <g fillRule="evenodd">
                  <path d="M960 0c529.355 0 960 430.645 960 960s-430.645 960-960 960S0 1489.355 0 960 430.645 0 960 0Zm0 112.941c-467.125 0-847.059 379.934-847.059 847.059 0 467.125 379.934 847.059 847.059 847.059 467.125 0 847.059-379.934 847.059-847.059 0-467.125-379.934-847.059-847.059-847.059Z"/>
                  <path d="M451.765 1016.47h1016.47V903.53H451.765z"/>
                  </g>
                </svg>

                <svg fill="none" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path opacity="0.4" d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path opacity="0.4" d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <svg fill="#ff0000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  )
}

export default Terminal