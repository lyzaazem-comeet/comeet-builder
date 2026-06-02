"use client"

import type { Theme, Block } from "@/types/blocks"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface FooterBlockProps {
  config: {
    text: string
    links: Array<{
      label: string
      url: string
    }>
    textColor: string
    fontSize: string
    fontFamily: string
    backgroundColor?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
  blocks?: Block[]
}

export function FooterBlock({
  config,
  theme,
  isSelected,
  onClick,
  blocks = [],
}: FooterBlockProps) {
  const generateFooterLinks = () => {
    const footerItems: { href: string; label: string }[] = []
    const seen = new Set<string>()

    blocks.forEach((block) => {
      if (seen.has(block.type)) return
      seen.add(block.type)

      switch (block.type) {
        case "agenda":
          footerItems.push({ href: "#agenda", label: "Programme" })
          break
        case "speakers":
          footerItems.push({ href: "#speakers", label: "Intervenants" })
          break
        case "location":
          footerItems.push({ href: "#location", label: "Lieu" })
          break
        case "rsvp":
          footerItems.push({ href: "#rsvp", label: "Inscription" })
          break
        case "gallery":
          footerItems.push({ href: "#gallery", label: "Galerie" })
          break
        case "ticketing":
          footerItems.push({ href: "#ticketing", label: "Billetterie" })
          break
        case "contact":
          footerItems.push({ href: "#contact", label: "Contact" })
          break
        case "faq":
          footerItems.push({ href: "#faq", label: "FAQ" })
          break
        case "custom-form":
          footerItems.push({ href: "#custom-form", label: "Inscription" })
          break
      }
    })

    return footerItems
  }

  const dynamicLinks = generateFooterLinks()
  const allLinks = [...dynamicLinks, ...config.links]
  const bgColor = config.backgroundColor || theme.backgroundColor
  const textColor = config.textColor || theme.textColor

  return (
    <footer
      className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto px-4 py-8 text-center">
        {allLinks.length > 0 && (
          <nav className="flex justify-center gap-4 flex-wrap mb-4">
            {allLinks.map((link, index) => {
              const url = "href" in link ? link.href : link.url
              return (
                <a
                  key={index}
                  href={url}
                  className="transition-opacity hover:opacity-70"
                  style={{
                    color: textColor,
                    opacity: 0.7,
                    fontSize: getFontSize(config.fontSize),
                    fontFamily: getFontFamily(config.fontFamily),
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (url?.startsWith("#")) {
                      e.preventDefault()
                      const element = document.querySelector(url)
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        )}

        <p
          style={{
            color: textColor,
            opacity: 0.6,
            fontSize: getFontSize(config.fontSize),
            fontFamily: getFontFamily(config.fontFamily),
          }}
        >
          {config.text}
        </p>
      </div>

      {/* Comeet Logo */}
      <div
        className="py-3 text-center"
        style={{ borderTop: `1px solid ${textColor}15` }}
      >
        <a
          href="https://www.comeet.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            aria-label="Comeet"
            className="h-4 w-16"
            style={{
              backgroundColor: "#ab0036",
              maskImage: "url(/logocomeet.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: "url(/logocomeet.png)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
            }}
          />
        </a>
      </div>
    </footer>
  )
}
