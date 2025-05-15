"use client"

import { Button } from "@mui/joy"
import { useEffect, useRef, useState } from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setTheme } = useTheme()
  console.log(theme)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Button variant="solid" size="md" className="h-9 w-9" onClick={() => setOpen(!open)}>
        <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-background shadow-lg">
          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                setTheme("light")
                setOpen(false)
              }}
            >
              Light
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                setTheme("dark")
                setOpen(false)
              }}
            >
              Dark
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                setTheme("system")
                setOpen(false)
              }}
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
