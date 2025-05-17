'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import TypingText from '@/component/TypingText'
import VideoSection from '@/component/VideoSection'
import ShopSection from '@/component/Shop'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { useTheme } from 'next-themes'
import { TYPING_CONTENT } from '@/constants/content'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const currentIndex = useRef(0)
  const [isClient, setIsClient] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setMounted(true)
    setIsMobile(window.innerWidth < 767)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const isDesktop = window.innerWidth >= 1024
    const panels = gsap.utils.toArray<HTMLElement>('.panel')
    if (!panels.length) return

    let scrollTween: gsap.core.Tween | null = null
    const observer = ScrollTrigger.normalizeScroll(true)

    const cancelTouch = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }

    document.addEventListener('touchstart', cancelTouch, {
      capture: true,
      passive: false,
    })

    const goToSection = (index: number) => {
      if (index < 0 || index >= panels.length || scrollTween) return

      scrollTween = gsap.to(window, {
        scrollTo: { y: panels[index].offsetTop, autoKill: false },
        duration: isMobile ? 0.5 : 1.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onStart: () => {
          observer?.disable()
          observer?.enable()
        },
        onComplete: () => {
          currentIndex.current = index
          scrollTween = null
        },
      })
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop || scrollTween) return
      e.preventDefault()

      let nextIndex = currentIndex.current
      if (e.deltaY > 0) {
        nextIndex += 1
      } else if (e.deltaY < 0) {
        nextIndex -= 1
      }

      nextIndex = Math.max(0, Math.min(nextIndex, panels.length - 1))
      if (nextIndex !== currentIndex.current) {
        goToSection(nextIndex)
      }
    }

    let startY: number | null = null

    const handleTouchStart = (e: TouchEvent) => {
      if (isDesktop || scrollTween) return
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDesktop || scrollTween || startY === null) return

      const deltaY = startY - e.changedTouches[0].clientY
      const threshold = 20

      let nextIndex = currentIndex.current
      if (deltaY > threshold) {
        nextIndex += 1
      } else if (deltaY < -threshold) {
        nextIndex -= 1
      }

      nextIndex = Math.max(0, Math.min(nextIndex, panels.length - 1))
      if (nextIndex !== currentIndex.current) {
        goToSection(nextIndex)
      }

      startY = null
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    panels.forEach((panel) => {
      gsap.from(panel.children, {
        opacity: 0,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: panel,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchstart', cancelTouch)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isClient, isMobile])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  if (!isClient) return null

  return (
    <main>
      <section className="panel h-screen flex items-start justify-center">
        <Header />
        <VideoSection
          src="/dress-shop-ad.mov"
          showArrow
          heightClass=""
          nextSectionId="story-section"
        />
      </section>
      <section id="story-section" className="panel min-h-screen py-10 flex items-center justify-center max-w-[654px] mx-auto">
        <div className="w-full">
          {mounted && resolvedTheme === 'light' ? (
            <TypingText content={TYPING_CONTENT.story.light} />
          ) : (
            <TypingText content={TYPING_CONTENT.story.dark} />
          )}
        </div>
      </section>
      <section className="panel h-screen flex items-center justify-center max-w-[654px] mx-auto">
        <TypingText content={TYPING_CONTENT.newStandard} />
      </section>
      <section className="panel h-screen flex items-center justify-center max-w-[654px] mx-auto">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full">
            <TypingText
              content={mounted && resolvedTheme === 'light' ? TYPING_CONTENT.nuItoWay.light : TYPING_CONTENT.nuItoWay.dark}
              className="mt-8"
            />
          </div>
        </div>
      </section>
      <section className="panel h-screen flex items-center max-w-[654px] justify-center mx-auto">
        <ShopSection id="drop-1" />
      </section>
      <section className="max-w-[654px] mx-auto">
        <Footer className="pt-10" />
      </section>
    </main>
  )
}
