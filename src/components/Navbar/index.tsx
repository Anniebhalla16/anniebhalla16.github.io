"use client"

import { Button } from "@mui/material"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { LuMenu, LuX } from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Research", path: "/research" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname


  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-10">
        <div className="flex items-center gap-2">
          <Link to="/" style={{ color:"purple"}} color="primary">
            Annie Bhalla
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Navigation Toggle */}
        {isMobile && (
          <div className="flex items-center gap-2">
            <Button size="medium" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <LuX size={20} /> : <LuMenu size={20} />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isOpen && (
        <div className="container pb-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "px-2 py-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}