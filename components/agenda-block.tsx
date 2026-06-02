"use client"

import type { Theme } from "@/types/blocks"
import { Clock } from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface AgendaBlockProps {
  config: {
    title: string
    events: Array<{
      time: string
      title: string
      description: string
    }>
    backgroundColor?: string
    textColor?: string
    timeColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function AgendaBlock({
  config,
  theme,
  isSelected,
  onClick,
}: AgendaBlockProps) {
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

        <div className="max-w-3xl mx-auto space-y-6">
          {config.events.map((event, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-lg bg-card border border-border"
            >
              <div
                className="flex items-center gap-2 font-semibold min-w-[80px]"
                style={{ color: config.timeColor || config.titleConfig?.textColor || theme.primaryColor }}
              >
                <Clock size={16} />
                {event.time}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {event.description?.replace(/<br\s*\/?>/gi, "\n")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
