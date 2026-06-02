"use client"

import { useState, useEffect } from "react"
import type { Theme } from "@/types/blocks"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface CountdownBlockProps {
  config: {
    title: string
    eventDate: string
    message: string
    backgroundColor?: string
    backgroundImage?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
    tileBackgroundColor?: string
    tileNoBackground?: boolean
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function CountdownBlock({
  config,
  theme,
  isSelected,
  onClick,
}: CountdownBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily = config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isValidDate, setIsValidDate] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime()
      const eventTime = new Date(config.eventDate).getTime()
      const difference = eventTime - now

      const valid = !Number.isNaN(eventTime) && difference > 0
      setIsValidDate(valid)

      if (valid) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    update()

    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [config.eventDate])

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
        backgroundImage: config.backgroundImage
          ? `url(${config.backgroundImage})`
          : undefined,
        backgroundSize: config.backgroundImage ? "cover" : undefined,
        backgroundPosition: config.backgroundImage ? "center" : undefined,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          className="font-bold text-center mb-4 text-balance"
          style={{
            color: config.titleConfig?.textColor || theme.primaryColor,
            fontSize: getFontSize(titleFontSize),
            fontFamily: getFontFamily(titleFontFamily),
          }}
        >
          {config.title}
        </h2>
        <p className="text-muted-foreground mb-8">{config.message}</p>

        {!isValidDate && (
          <div className="text-sm text-destructive mb-6">
            La date doit être supérieure à aujourd'hui.
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div
                className={`text-4xl font-bold mb-2 p-4 rounded-lg ${
                  config.tileNoBackground ? "bg-transparent" : ""
                }`}
                style={{
                  backgroundColor: config.tileNoBackground
                    ? undefined
                    : config.tileBackgroundColor || theme.primaryColor,
                  color:
                    (config.textColor || theme.textColor) === "#1e293b"
                      ? "#ffffff"
                      : config.textColor || theme.textColor,
                }}
              >
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {unit === "days"
                  ? "Jours"
                  : unit === "hours"
                  ? "Heures"
                  : unit === "minutes"
                  ? "Minutes"
                  : "Secondes"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
