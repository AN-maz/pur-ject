import { useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

import logo from "@/assets/images/nav-logo_p.png"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [joinDropdownOpen, setJoinDropdownOpen] = useState(false)
  const [mobileJoinOpen, setMobileJoinOpen] = useState(false)
  const dropdownRef = useRef(null)

  const location = useLocation()

  // Active state with prefix matching for child routes
  const isActiveHome = location.pathname === "/" || location.pathname.startsWith("/news")
  const isActiveAbout = location.pathname === "/about" || location.pathname.startsWith("/about/")
  const isActiveJoin = location.pathname === "/volunteer" || location.pathname === "/oprec-bph"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setJoinDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileJoinOpen(false)
    setJoinDropdownOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
        ? "border-white/10 bg-ec-blue/95 text-white shadow-lg backdrop-blur-xl"
        : "border-transparent bg-transparent text-white"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 transition-all duration-300 sm:px-6 lg:px-12">
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img
            src={logo}
            alt="EC-UTB Logo"
            className="w-[140px] transition-transform duration-300 sm:w-[160px] md:w-[150px]"
          />
        </Link>

        {/* --- DESKTOP MENU --- */}
        <ul className="hidden items-center gap-8 md:flex">
          {/* Home */}
          <li className="group relative">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${isActiveHome ? "text-ec-red" : "hover:text-gray-300"}`}
            >
              Home
              <span className={`absolute left-0 -bottom-2 h-[2px] w-full bg-ec-red transition-transform duration-300 ${
                isActiveHome
                  ? "origin-left scale-x-100"
                  : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
              }`} />
            </Link>
          </li>

          {/* About */}
          <li className="group relative">
            <Link
              to="/about"
              className={`font-medium transition-colors duration-300 ${isActiveAbout ? "text-ec-red" : "hover:text-gray-300"}`}
            >
              About
              <span className={`absolute left-0 -bottom-2 h-[2px] w-full bg-ec-red transition-transform duration-300 ${
                isActiveAbout
                  ? "origin-left scale-x-100"
                  : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
              }`} />
            </Link>
          </li>

          {/* Join Us Dropdown */}
          <li className="group relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setJoinDropdownOpen(!joinDropdownOpen)}
              className={`flex items-center gap-1 font-medium transition-colors duration-300 ${isActiveJoin ? "text-ec-red" : "hover:text-gray-300"}`}
            >
              Join Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-300 ${joinDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>

              <span className={`absolute left-0 -bottom-2 h-[2px] w-full bg-ec-red transition-transform duration-300 ${
                isActiveJoin
                  ? "origin-left scale-x-100"
                  : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
              }`} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-1/2 mt-4 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-ec-blue/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                joinDropdownOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-ec-blue/95" />

              <div className="relative z-10 py-2">
                <Link
                  to="/volunteer"
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition-all duration-200 ${
                    location.pathname === "/volunteer"
                      ? "bg-white/10 text-ec-red"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ec-red/20">
                    <svg className="h-4 w-4 text-ec-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold">Volunteer Event</p>
                    <p className="text-xs text-gray-400">Gabung jadi volunteer</p>
                  </div>
                </Link>

                <Link
                  to="/oprec-bph"
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition-all duration-200 ${
                    location.pathname === "/oprec-bph"
                      ? "bg-white/10 text-ec-red"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ec-red/20">
                    <svg className="h-4 w-4 text-ec-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold">Oprec BPH</p>
                    <p className="text-xs text-gray-400">Daftar jadi pengurus</p>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        </ul>

        {/* --- HAMBURGER BUTTON --- */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="group z-[60] flex h-10 w-10 cursor-pointer flex-col items-end justify-center gap-[6px] outline-none md:hidden"
        >
          <span
            className={`block h-[3px] w-8 rounded-full bg-white shadow-sm transition-all duration-300 ${mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
          />
          <span
            className={`block h-[3px] w-8 rounded-full bg-white shadow-sm transition-all duration-300 ${mobileMenuOpen ? "opacity-0 translate-x-5" : ""
              }`}
          />
          <span
            className={`block h-[3px] rounded-full bg-white shadow-sm transition-all duration-300 ${mobileMenuOpen
              ? "w-8 -translate-y-[9px] -rotate-45"
              : "w-5 group-hover:w-8"
              }`}
          />
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ec-blue/95 text-white shadow-2xl backdrop-blur-xl transition-all duration-700 ease-in-out md:hidden ${mobileMenuOpen ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        <div className="flex flex-col gap-6 px-8 py-10">
          <div className="flex flex-col gap-1">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center justify-between py-3 transition-all duration-500 transform ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: "150ms" }}
            >
              <span className={`text-xl font-bold tracking-widest transition-colors ${isActiveHome ? "text-ec-red" : "group-hover:text-ec-red"}`}>
                HOME
              </span>
              <span className="font-mono text-[10px] text-white/30">01</span>
            </Link>

            {/* About */}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center justify-between py-3 transition-all duration-500 transform ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: "250ms" }}
            >
              <span className={`text-xl font-bold tracking-widest transition-colors ${isActiveAbout ? "text-ec-red" : "group-hover:text-ec-red"}`}>
                ABOUT
              </span>
              <span className="font-mono text-[10px] text-white/30">02</span>
            </Link>

            {/* Join Us - Mobile Accordion */}
            <div
              className={`transition-all duration-500 transform ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: "350ms" }}
            >
              <button
                type="button"
                onClick={() => setMobileJoinOpen(!mobileJoinOpen)}
                className="group flex w-full items-center justify-between py-3"
              >
                <span className={`text-xl font-bold tracking-widest transition-colors ${isActiveJoin ? "text-ec-red" : "group-hover:text-ec-red"}`}>
                  JOIN US
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/30">03</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-white/50 transition-transform duration-300 ${mobileJoinOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Sub-menu */}
              <div className={`overflow-hidden transition-all duration-500 ${mobileJoinOpen ? "max-h-40" : "max-h-0"}`}>
                <div className="flex flex-col gap-1 border-l-2 border-ec-red/30 pl-5 pb-2">
                  <Link
                    to="/volunteer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 text-sm font-medium transition-colors ${location.pathname === "/volunteer" ? "text-ec-red" : "text-gray-400 hover:text-white"}`}
                  >
                    ✦ Volunteer Event
                  </Link>
                  <Link
                    to="/oprec-bph"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 text-sm font-medium transition-colors ${location.pathname === "/oprec-bph" ? "text-ec-red" : "text-gray-400 hover:text-white"}`}
                  >
                    ✦ Oprec BPH
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}