"use client"

import { useMemo, useEffect, useState } from "react"
import type { Block, Theme } from "@/types/blocks"
import { HeaderBlock } from "./header-block"
import { AgendaBlock } from "./agenda-block"
import { SpeakersBlock } from "./speakers-block"
import { LocationBlock } from "./location-block"
import { GalleryBlock } from "./gallery-block"
import { HeroBlock } from "./hero-block"
import { FAQBlock } from "./faq-block"
import { ContactBlock } from "./contact-block"
import { FooterBlock } from "./footer-block"
import { TextImageBlock } from "./text-image-block"
import { TicketingBlock } from "./ticketing-block"
import { PublishedRSVPBlock } from "./published-rsvp-block"
import type { GuestData } from "@/lib/comeet-api"

interface PublishedSiteProps {
  blocks: Block[]
  theme: Theme
  eventId: string
  encryptedGuestData?: string
}

export function PublishedSite({
  blocks,
  theme,
  eventId,
  encryptedGuestData,
}: PublishedSiteProps) {
  const [guestData, setGuestData] = useState<GuestData | null>(null)

  // Load Google Font dynamically
  useEffect(() => {
    if (theme.fontFamily) {
      const fontName = theme.fontFamily.replace(/ /g, "+")
      const linkId = `google-font-${fontName}`

      if (!document.getElementById(linkId)) {
        const link = document.createElement("link")
        link.id = linkId
        link.rel = "stylesheet"
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`
        document.head.appendChild(link)
      }
    }
  }, [theme.fontFamily])

  // Decrypt guest data if present
  useEffect(() => {
    if (encryptedGuestData) {
      fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: encryptedGuestData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setGuestData(data)
          }
        })
        .catch(console.error)
    }
  }, [encryptedGuestData])

  // Generate navigation links based on blocks
  const navLinks = useMemo(() => {
    const links: { href: string; label: string }[] = []
    const seen = new Set<string>()

    blocks.forEach((block) => {
      let href = ""
      let label = ""

      switch (block.type) {
        case "header":
          if (!seen.has("header")) {
            href = "#header"
            label = "Accueil"
            seen.add("header")
          }
          break
        case "agenda":
          if (!seen.has("agenda")) {
            href = "#agenda"
            label = "Programme"
            seen.add("agenda")
          }
          break
        case "speakers":
          if (!seen.has("speakers")) {
            href = "#speakers"
            label = "Intervenants"
            seen.add("speakers")
          }
          break
        case "location":
          if (!seen.has("location")) {
            href = "#location"
            label = "Lieu"
            seen.add("location")
          }
          break
        case "rsvp":
          if (!seen.has("rsvp")) {
            href = "#rsvp"
            label = "Inscription"
            seen.add("rsvp")
          }
          break
        case "gallery":
          if (!seen.has("gallery")) {
            href = "#gallery"
            label = "Galerie"
            seen.add("gallery")
          }
          break
        case "ticketing":
          if (!seen.has("ticketing")) {
            href = "#ticketing"
            label = "Billetterie"
            seen.add("ticketing")
          }
          break
        case "contact":
          if (!seen.has("contact")) {
            href = "#contact"
            label = "Contact"
            seen.add("contact")
          }
          break
        case "faq":
          if (!seen.has("faq")) {
            href = "#faq"
            label = "FAQ"
            seen.add("faq")
          }
          break
        case "hero":
          if (!seen.has("hero")) {
            href = "#hero"
            label = "Accueil"
            seen.add("hero")
          }
          break
        case "text-image":
          if (!seen.has("text-image")) {
            href = "#text-image"
            label = "À propos"
            seen.add("text-image")
          }
          break
        case "custom-form":
          if (!seen.has("custom-form") && !seen.has("rsvp")) {
            href = "#custom-form"
            label = "Inscription"
            seen.add("custom-form")
          }
          break
      }

      if (href && label) {
        links.push({ href, label })
      }
    })

    return links
  }, [blocks])

  const renderBlock = (block: Block) => {
    const commonProps = {
      config: block.config,
      theme,
      isSelected: false,
      onClick: undefined,
      blocks,
    }

    // For RSVP and custom-form blocks on published site, use the working RSVP component
    if (block.type === "rsvp" || block.type === "custom-form") {
      return (
        <PublishedRSVPBlock
          config={block.config}
          theme={theme}
          eventId={eventId}
          guestData={guestData}
        />
      )
    }

    switch (block.type) {
      case "header":
        return <HeaderBlock {...commonProps} />
      case "hero":
        return <HeroBlock {...commonProps} />
      case "agenda":
        return <AgendaBlock {...commonProps} />
      case "speakers":
        return <SpeakersBlock {...commonProps} />
      case "location":
        return <LocationBlock {...commonProps} />
      case "gallery":
        return <GalleryBlock {...commonProps} />
      case "faq":
        return <FAQBlock {...commonProps} />
      case "contact":
        return <ContactBlock {...commonProps} />
      case "footer":
        return <FooterBlock {...commonProps} />
      case "text-image":
        return <TextImageBlock {...commonProps} />
      case "ticketing":
        return <TicketingBlock {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Sticky Navigation */}
      {theme.showNavbar !== false && navLinks.length > 0 && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: `${theme.navbar?.backgroundColor || theme.primaryColor}f0`,
            borderColor: `${theme.navbar?.textColor || theme.backgroundColor}20`,
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-3">
              <div className="flex gap-6 text-sm">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="font-medium transition-colors hover:opacity-80"
                    style={{
                      color:
                        theme.navbar?.textColor || theme.backgroundColor,
                    }}
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
      )}

      {/* Site Content */}
      <div>
        {blocks
          .sort((a, b) => a.position - b.position)
          .map((block) => (
            <section key={block.id} id={block.type}>
              {renderBlock(block)}
            </section>
          ))}
      </div>

    </div>
  )
}
