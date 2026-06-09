import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import useRevealOnScroll from "@/hooks/useRevealOnScroll"

export default function RootLayout() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  useRevealOnScroll()

  useEffect(() => {
    const prevPath = prevPathRef.current
    const currPath = location.pathname

    const isReturningToNewsList =
      currPath === "/news" && prevPath.startsWith("/news/") && prevPath !== "/news"

    if (isReturningToNewsList) {
      const savedScroll = sessionStorage.getItem("news-list-scroll")
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll, 10))
        }, 50)
      }
    } else {
      window.scrollTo(0, 0)
    }

    prevPathRef.current = currPath
  }, [location.pathname])

  useEffect(() => {
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
