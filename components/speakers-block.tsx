"use client"

import type { Theme } from "@/types/blocks"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface SpeakersBlockProps {
  config: {
    title: string
    speakers: Array<{
      name: string
      role: string
      bio: string
      image: string
    }>
    backgroundColor?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function SpeakersBlock({
  config,
  theme,
  isSelected,
  onClick,
}: SpeakersBlockProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.speakers.map((speaker, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted overflow-hidden">
                {speaker.image ? (
                  <img
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1">{speaker.name}</h3>
              <p className="text-primary font-medium mb-2">{speaker.role}</p>
              <p className="text-sm text-muted-foreground">{speaker.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
