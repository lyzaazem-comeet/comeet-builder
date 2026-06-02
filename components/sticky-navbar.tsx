"use client"

import { useEffect, useState } from "react"
import type { Block, Theme } from "@/types/blocks"

interface StickyNavbarProps {
  blocks: Block[]
  theme: Theme
  navbarBackgroundColor?: string
  navbarTextColor?: string
}

export function StickyNavbar({ blocks, theme, navbarBackgroundColor, navbarTextColor }: StickyNavbarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past 100px
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const generateNavLinks = () => {
    const navItems: { href: string; label: string }[] = []

    blocks.forEach((block) => {
      let label = ""
      switch (block.type) {
        case "hero":
        case "header":
          label = block.config.title || "Accueil"
          break
        case "agenda":
          label = block.config.title || "Programme"
          break
        case "speakers":
          label = block.config.title || "Intervenants"
          break
        case "location":
          label = block.config.title || "Lieu"
          break
        case "rsvp":
          label = block.config.title || "Inscription"
          break
        case "gallery":
          label = block.config.title || "Galerie"
          break
        case "ticketing":
          label = block.config.title || "Billetterie"
          break
        case "contact":
          label = block.config.title || "Contact"
          break
        case "faq":
          label = block.config.title || "FAQ"
          break
        case "text-image":
          label = block.config.title || "À propos"
          break
        case "custom-form":
          label = block.config.title || "Inscription"
          break
      }

      if (label) {
        navItems.push({ href: `#${block.id}`, label })
      }
    })

    return navItems
  }

  const navLinks = generateNavLinks()

  if (!isVisible || navLinks.length === 0) {
    return null
  }

  const bgColor = navbarBackgroundColor || theme.primaryColor || "#ffffff"
  const textColor = navbarTextColor || theme.backgroundColor || "#000000"

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300"
      style={{
        backgroundColor: `${bgColor}f0`,
        borderColor: `${textColor}20`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center py-3">
          <div className="flex gap-6 text-sm">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:opacity-80 transition-opacity font-medium"
                style={{ color: textColor }}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(link.href)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
