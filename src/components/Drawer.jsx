import { useEffect } from 'react'
import { useApp } from './AppContext'
import { useLocation } from 'react-router-dom'

const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const Drawer = ({ width, children }) => {
  const location = useLocation()
  const { top, setLeft, drawer, setDrawer } = useApp()

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDrawer(false)
    }
  }, [location])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < 768) {
        setLeft(16)
        setDrawer(false)
      } else {
        setLeft(width)
        setDrawer(true)
      }
    }, 500)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <aside
        style={{
          top: top,
          width: `${width}px`,
          height: `calc(100vh - ${top}px)`,
          transform: `${drawer ? 'translateX(0)' : 'translateX(-100%)'}`
        }}
        className="fixed bottom-0 left-0 right-auto bg-surface z-50 max-w-full overflow-y-auto overflow-x-hidden shadow duration-200 will-change-transform md:z-10 lg:flex lg:translate-x-0 lg:flex-col"
      >
        {children}
      </aside>
      <div
        onClick={() => setDrawer(false)}
        className={`${
          drawer ? 'opacity-100' : 'pointer-events-none opacity-0'
        } transition-colors fixed inset-0 z-40 block md:hidden bg-white/25 dark:bg-black/25 backdrop-blur`}
      ></div>
    </>
  )
}

export default Drawer
