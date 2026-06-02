"use client"

import type { Theme } from "@/types/blocks"
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface ContactBlockProps {
  config: {
    title: string
    email: string
    phone: string
    socialLinks: Array<{
      platform: string
      url: string
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

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
}

export function ContactBlock({
  config,
  theme,
  isSelected,
  onClick,
}: ContactBlockProps) {
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
      <div className="container mx-auto px-4 text-center">
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

        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Mail size={20} style={{ color: config.textColor || theme.textColor }} />
            <a
              href={`mailto:${config.email}`}
              className="hover:underline"
              style={{ color: config.textColor || theme.textColor }}
            >
              {config.email}
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone size={20} style={{ color: config.textColor || theme.textColor }} />
            <a
              href={`tel:${config.phone}`}
              className="hover:underline"
              style={{ color: config.textColor || theme.textColor }}
            >
              {config.phone}
            </a>
          </div>

          {config.socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 pt-6">
              {config.socialLinks.map((social, index) => {
                const Icon =
                  socialIcons[social.platform as keyof typeof socialIcons]
                return Icon ? (
                  <a
                    key={index}
                    href={social.url}
                    className="p-2 rounded-full hover:opacity-80 transition-opacity"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <Icon size={24} />
                  </a>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
