'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

type UseSectionScrollOptions = {
  panelSelector?: string
  enableOnDesktop?: boolean
}

export const useSectionScroll = ({
  panelSelector = '.panel',
  enableOnDesktop = false,
}: UseSectionScrollOptions = {}) => {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

    // ✅ Only run on mobile OR if explicitly enabled for desktop
    if (!isMobile && !enableOnDesktop) return

    const panels = gsap.utils.toArray<HTMLElement>(panelSelector)
    let currentIndex = 0
    let isAnimating = false
    let startY: number | null = null

    const observer = ScrollTrigger.normalizeScroll(true)

    const cancelTouch = (e: TouchEvent) => {
      if (isAnimating) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }

    document.addEventListener('touchstart', cancelTouch, {
      capture: true,
      passive: false,
    })

    function goToSection(index: number) {
      if (index < 0 || index >= panels.length || isAnimating) return

      isAnimating = true

      gsap.to(window, {
        scrollTo: { y: panels[index].offsetTop, autoKill: false },
        duration: 0.9,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onStart: () => {
          observer?.disable()
          observer?.enable()
        },
        onComplete: () => {
          isAnimating = false
          currentIndex = index
        },
      })
    }

    function handleWheel(e: WheelEvent) {
      if (isAnimating) return
      e.preventDefault()

      if (e.deltaY > 0) goToSection(currentIndex + 1)
      else if (e.deltaY < 0) goToSection(currentIndex - 1)
    }

    function handleTouchStart(e: TouchEvent) {
      if (isAnimating) return
      startY = e.touches[0].clientY
    }

    function handleTouchEnd(e: TouchEvent) {
      if (isAnimating || startY === null) return
      const deltaY = startY - e.changedTouches[0].clientY
      const threshold = 50

      if (deltaY > threshold) goToSection(currentIndex + 1)
      else if (deltaY < -threshold) goToSection(currentIndex - 1)

      startY = null
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        currentIndex = Math.round(self.scroll() / window.innerHeight)
      },
    })

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchstart', cancelTouch)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [panelSelector, enableOnDesktop])
}
