import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import useRevealOnScroll from "@/hooks/useRevealOnScroll"

export default function RootLayout() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Run reveal-on-scroll observer
  useRevealOnScroll()

  // Scroll-to-top on route change
  // Exception: returning from /news/:slug to /news → restore scroll position
  useEffect(() => {
    const prevPath = prevPathRef.current
    const currPath = location.pathname

    const isReturningToNewsList =
      currPath === "/news" && prevPath.startsWith("/news/") && prevPath !== "/news"

    if (isReturningToNewsList) {
      // Restore saved scroll position from sessionStorage
      const savedScroll = sessionStorage.getItem("news-list-scroll")
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll, 10))
        }, 50)
      }
    } else {
      // Scroll to top for all other navigation
      window.scrollTo(0, 0)
    }

    prevPathRef.current = currPath
  }, [location.pathname])

  // Re-trigger reveal animations on route change
  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal-up:not(.active)")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      )
      elements.forEach((el) => observer.observe(el))

      return () => elements.forEach((el) => observer.unobserve(el))
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
