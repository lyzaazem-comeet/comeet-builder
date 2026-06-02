"use client"
import type { Theme, Block } from "@/types/blocks"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface HeaderBlockProps {
  config: {
    title: string
    subtitle: string
    backgroundImage: string
    showNavigation: boolean
    textColor: string
    fontSize: string
    fontFamily: string
    titleConfig?: {
      fontSize?: string
      fontFamily?: string
      textColor?: string
    }
    textConfig?: {
      fontSize?: string
      fontFamily?: string
      textColor?: string
    }
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
  blocks?: Block[] // Added blocks prop for dynamic navigation
}

export function HeaderBlock({
  config,
  theme,
  isSelected,
  onClick,
  blocks = [],
}: HeaderBlockProps) {
  const titleFontSizeClasses = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
    xl: "text-6xl md:text-7xl",
  }

  const textFontSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  const titleConfig = config.titleConfig || {}
  const textConfig = config.textConfig || {}
  const titleFontFamily = titleConfig.fontFamily || config.fontFamily || theme.fontFamily || "modern"
  const textFontFamily = textConfig.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  return (
    <div
      className={`relative py-8 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <h1
          className={`font-bold mb-4 text-balance ${
            titleFontSizeClasses[
              titleConfig.fontSize as keyof typeof titleFontSizeClasses
            ] || titleFontSizeClasses.lg
          }`}
          style={{
            color:
              titleConfig.textColor ||
              (theme.textColor === "#1e293b" ? "#ffffff" : theme.textColor),
            fontFamily: getFontFamily(titleFontFamily),
          }}
        >
          {config.title}
        </h1>
        <p
          className={`opacity-90 mb-8 text-pretty ${
            textFontSizeClasses[
              textConfig.fontSize as keyof typeof textFontSizeClasses
            ] || textFontSizeClasses.md
          }`}
          style={{
            color: textConfig.textColor || theme.textColor,
            fontFamily: getFontFamily(textFontFamily),
          }}
        >
          {config.subtitle}
        </p>
      </div>
    </div>
  )
}
