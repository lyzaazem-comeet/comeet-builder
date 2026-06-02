"use client"

import type { Theme } from "@/types/blocks"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface LocationBlockProps {
  config: {
    title: string
    address: string
    rue?: string
    ville?: string
    codePostal?: string
    mapUrl: string
    description: string
    backgroundColor?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
    buttonText?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    iconColor?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function LocationBlock({
  config,
  theme,
  isSelected,
  onClick,
}: LocationBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily = config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  return (
    <section
      className={`py-16 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
      style={{
        backgroundColor: config.backgroundColor || theme.backgroundColor,
        color: config.textColor || theme.textColor,
        fontFamily: getFontFamily(config.fontFamily || theme.fontFamily || "modern"),
        fontSize: getFontSize(config.fontSize || "16"),
      }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="font-bold text-center mb-12 text-balance"
          style={{
            color: config.titleConfig?.textColor || theme.primaryColor,
            fontSize: getFontSize(titleFontSize),
            fontFamily: getFontFamily(titleFontFamily),
          }}
        >
          {config.title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="mt-1" size={20} style={{ color: config.iconColor || config.titleConfig?.textColor || theme.primaryColor }} />
              <div>
                <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                <p className="text-muted-foreground">{config.address}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 whitespace-pre-line">
              {config.description?.replace(/<br\s*\/?>/gi, "\n")}
            </p>

            <Button
              className="gap-2"
              style={{
                backgroundColor: config.buttonBackgroundColor || theme.primaryColor,
                color: config.buttonTextColor || (theme.textColor === "#1e293b" ? "#ffffff" : theme.textColor),
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (config.address) {
                  window.open(`https://www.google.com/maps/search/${encodeURIComponent(config.address)}`, "_blank")
                }
              }}
            >
              <Navigation size={16} />
              {config.buttonText || "Obtenir l'itinéraire"}
            </Button>
          </div>

          <div className="bg-muted rounded-lg h-64 flex items-center justify-center overflow-hidden">
            {config.mapUrl || config.address ? (
              <iframe
                src={
                  config.mapUrl?.includes("/embed")
                    ? config.mapUrl
                    : `https://www.google.com/maps?q=${encodeURIComponent(config.address)}&output=embed`
                }
                className="w-full h-full rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>Carte à configurer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
