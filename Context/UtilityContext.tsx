"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type ScrollDirection = "up" | "down" | "none"

type RouteMeta = {
  title: string
  subtitle?: string
  [key: string]: any
}

type UtilityContextState = {
  scrollY: number
  windowWidth: number
  windowHeight: number
  documentHeight: number
  scrollProgress: number
  scrollDirection: ScrollDirection
  isAtTop: boolean
  isAtBottom: boolean
  isSmallScreen: boolean
  componentScrollY: number
  setComponentScrollY: (value: number) => void
  routePath: string
  routeHistory: string[]
  routeMeta: RouteMeta
  setRouteMeta: (value: RouteMeta) => void
  goBack: () => void
  goForward: () => void
  navigate: (path: string, meta?: RouteMeta) => void
}

const initialState: UtilityContextState = {
  scrollY: 0,
  windowWidth: 0,
  windowHeight: 0,
  documentHeight: 0,
  scrollProgress: 0,
  scrollDirection: "none",
  isAtTop: true,
  isAtBottom: false,
  isSmallScreen: false,
  componentScrollY: 0,
  setComponentScrollY: () => {},
  routePath: "/",
  routeHistory: ["/"],
  routeMeta: { title: "", subtitle: "" },
  setRouteMeta: () => {},
  goBack: () => {},
  goForward: () => {},
  navigate: () => {},
}

const UtilityContext = createContext<UtilityContextState>(initialState)

export const UtilityProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [scrollY, setScrollY] = useState<number>(0)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [windowHeight, setWindowHeight] = useState<number>(0)
  const [documentHeight, setDocumentHeight] = useState<number>(0)
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("none")
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [componentScrollY, setComponentScrollY] = useState<number>(0)
  const [routePath, setRoutePath] = useState<string>(pathname || "/")
  const [routeHistory, setRouteHistory] = useState<string[]>([pathname || "/"])
  const [routeMeta, setRouteMeta] = useState<RouteMeta>({ title: "", subtitle: "" })

  const prevScrollY = React.useRef<number>(0)

   

  useEffect(() => {
    if (typeof window === "undefined"){
        console.warn("UtilityProvider: window is undefined. This component should only be used in a browser environment.")
        return
    }



    const updateDimensions = () => {
          console.log("UtilityProvider: Updating dimensions")
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setDocumentHeight(document.documentElement?.scrollHeight || 0)
    }

    const updateScroll = () => {

         console.log('UtilityProvider rendered with scrollY:', scrollY, 'windowWidth:', windowWidth, 'windowHeight:', windowHeight, 'documentHeight:', documentHeight, 'scrollDirection:', scrollDirection, 'isAtTop:', isAtTop, 'isAtBottom:', isAtBottom, 'isSmallScreen:', isSmallScreen)

      const currentScrollY = window.scrollY || window.pageYOffset
      const pageHeight = document.documentElement?.scrollHeight || 0
      const viewportHeight = window.innerHeight

      console.log('Current Scroll Y:', currentScrollY)

      setScrollDirection(currentScrollY > prevScrollY.current ? "down" : currentScrollY < prevScrollY.current ? "up" : "none")
      prevScrollY.current = currentScrollY

      setScrollY(currentScrollY)
      setDocumentHeight(pageHeight)
      setWindowHeight(viewportHeight)
      setWindowWidth(window.innerWidth)
      setIsAtTop(currentScrollY <= 0)
      setIsAtBottom(currentScrollY + viewportHeight >= pageHeight)
      setIsSmallScreen(window.innerWidth <= 768)
    }

    // initialize once
    updateDimensions()
    updateScroll()

        // console.log("UtilityProvider mounted izzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")

    window.addEventListener("resize", updateDimensions)
    window.addEventListener("scroll", updateScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("scroll", updateScroll)
    }
  }, [])

  useEffect(() => {
    if (!pathname) return
    setRoutePath(pathname)
    setRouteHistory(prev => (prev[prev.length - 1] === pathname ? prev : [...prev, pathname]))
  }, [pathname])

  const scrollProgress = documentHeight > windowHeight ? scrollY / (documentHeight - windowHeight) : 0

  const contextValue = useMemo(() => ({
    scrollY,
    windowWidth,
    windowHeight,
    documentHeight,
    scrollProgress,
    scrollDirection,
    isAtTop,
    isAtBottom,
    isSmallScreen,
    componentScrollY,
    setComponentScrollY,
    routePath,
    routeHistory,
    routeMeta,
    setRouteMeta,
    goBack: () => router.back(),
    goForward: () => router.forward(),
    navigate: (path: string, meta?: RouteMeta) => {
      if (meta) setRouteMeta(prev => ({ ...prev, ...meta }))
      router.push(path)
    },
  }), [
    scrollY,
    windowWidth,
    windowHeight,
    documentHeight,
    scrollProgress,
    scrollDirection,
    isAtTop,
    isAtBottom,
    isSmallScreen,
    componentScrollY,
    routePath,
    routeHistory,
    routeMeta,
    router,
  ])

  return <UtilityContext.Provider value={contextValue}>{children}</UtilityContext.Provider>
}

export const useUtilityContext = () => {
  const context = useContext(UtilityContext)
  if (context === undefined) {
    throw new Error("useUtilityContext must be used within UtilityProvider")
  }
  return context
}
