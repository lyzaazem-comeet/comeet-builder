"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { Theme } from "@/types/blocks"
import { getFontFamily } from "@/lib/font-utils"

interface HeroBlockProps {
  config: {
    title: string
    subtitle: string
    eventDate: string
    backgroundImage: string
    showCountdown: boolean
    ctaText: string
    ctaAction: string
    backgroundColor: string
    textColor: string
    fontSize: string
    fontFamily: string
    backgroundType?: "color" | "image"
    buttonBackgroundColor?: string
    buttonTextColor?: string
    subtitleFontSize?: string
    subtitleFontFamily?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function HeroBlock({ config, theme, isSelected, onClick }: HeroBlockProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(config.eventDate)
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [config.eventDate])

  const scrollToRSVP = () => {
    const rsvpElement = document.getElementById("rsvp") || document.getElementById("custom-form")
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const useImage = config.backgroundType !== "color" && !!config.backgroundImage

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
      style={{
        backgroundColor: useImage ? undefined : (config.backgroundColor || theme.backgroundColor),
        backgroundImage: useImage ? `url(${encodeURI(config.backgroundImage)})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: config.textColor || theme.textColor,
      }}
    >
      {useImage && <div className="absolute inset-0 bg-black/30" />}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="font-bold mb-6 text-balance"
          style={{
            color: config.textColor || theme.textColor,
            fontSize: config.fontSize ? `${config.fontSize}px` : "48px",
            fontFamily: getFontFamily(config.fontFamily || theme.fontFamily || "modern"),
          }}
        >
          {config.title}
        </h1>

        <p
          className="mb-8 text-pretty opacity-90"
          style={{
            color: config.textColor || theme.textColor,
            fontSize: config.subtitleFontSize ? `${config.subtitleFontSize}px` : "24px",
            fontFamily: getFontFamily(config.subtitleFontFamily || theme.fontFamily || "modern"),
          }}
        >
          {config.subtitle}
        </p>

        {config.showCountdown && (
          <div className="mb-8">
            <div className="text-lg mb-4 opacity-80">
              {new Date(config.eventDate).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex justify-center gap-4 md:gap-8 mb-6">
              {[
                { label: "Jours", value: timeLeft.days },
                { label: "Heures", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Secondes", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">{item.value.toString().padStart(2, "0")}</div>
                  <div className="text-sm opacity-70">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          size="lg"
          className="text-lg px-8 py-3 hover:opacity-90 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            if (config.ctaAction === "rsvp") {
              scrollToRSVP()
            }
          }}
          style={{
            backgroundColor: config.buttonBackgroundColor || theme.primaryColor,
            color: config.buttonTextColor || "#ffffff",
            border: `2px solid ${config.buttonBackgroundColor || theme.primaryColor}`,
          }}
        >
          {config.ctaText}
        </Button>
      </div>
    </div>
  )
}
