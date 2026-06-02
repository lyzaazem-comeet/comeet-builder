"use client"
import { useMemo, useEffect, useState } from "react"
import type { Block, Theme } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { X, Monitor, Smartphone } from "lucide-react"
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
import { CustomFormBlock } from "./custom-form-block"

interface PreviewModeProps {
  blocks: Block[]
  theme: Theme
  onClose: () => void
}

export function PreviewMode({ blocks, theme, onClose }: PreviewModeProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  // Load Google Font dynamically
  useEffect(() => {
    if (theme.fontFamily) {
      const fontName = theme.fontFamily.replace(/ /g, '+')
      const linkId = `google-font-${fontName}`

      // Check if link already exists
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link')
        link.id = linkId
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`
        document.head.appendChild(link)
      }
    }
  }, [theme.fontFamily])
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
      blocks, // Pass blocks for footer navigation
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
      case "rsvp":
        return <CustomFormBlock {...commonProps} />
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
      case "custom-form":
        return <CustomFormBlock {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
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
            <div className="flex items-center justify-between py-3">
              <div className="flex gap-6 text-sm">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="font-medium transition-colors hover:opacity-80"
                    style={{ color: theme.navbar?.textColor || theme.backgroundColor }}
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

              <div className="flex items-center gap-2">
                {/* Device toggle */}
                <div className="flex items-center rounded-md border" style={{ borderColor: `${theme.navbar?.textColor || theme.backgroundColor}30` }}>
                  <button
                    onClick={() => setViewMode("desktop")}
                    className="p-1.5 rounded-l-md transition-colors"
                    style={{
                      backgroundColor: viewMode === "desktop" ? `${theme.navbar?.textColor || theme.backgroundColor}20` : "transparent",
                      color: theme.navbar?.textColor || theme.backgroundColor,
                    }}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("mobile")}
                    className="p-1.5 rounded-r-md transition-colors"
                    style={{
                      backgroundColor: viewMode === "mobile" ? `${theme.navbar?.textColor || theme.backgroundColor}20` : "transparent",
                      color: theme.navbar?.textColor || theme.backgroundColor,
                    }}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  style={{ color: theme.navbar?.textColor || theme.backgroundColor }}
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Close button (when no navigation) */}
      {(theme.showNavbar === false || navLinks.length === 0) && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border bg-background">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-1.5 rounded-l-md transition-colors ${viewMode === "desktop" ? "bg-muted" : ""}`}
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-1.5 rounded-r-md transition-colors ${viewMode === "mobile" ? "bg-muted" : ""}`}
            >
              <Smartphone size={16} />
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
      )}

      {/* Preview Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          viewMode === "mobile" ? "flex justify-center bg-gray-100" : ""
        }`}
      >
        <div
          className={`min-h-screen ${
            viewMode === "mobile"
              ? "w-[390px] shadow-2xl border-x border-gray-300 bg-white overflow-y-auto"
              : "w-full"
          }`}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Aucun contenu à prévisualiser
                </h3>
                <p className="text-muted-foreground">
                  Ajoutez des blocs pour voir votre site en action.
                </p>
              </div>
            </div>
          ) : (
            blocks
              .sort((a, b) => a.position - b.position)
              .map((block) => (
                <section key={block.id} id={block.type}>
                  {renderBlock(block)}
                </section>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
