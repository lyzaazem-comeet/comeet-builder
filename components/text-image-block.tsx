"use client"

import { useState } from "react"
import type { TextImageConfig, Theme } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface TextImageBlockProps {
  config: TextImageConfig
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function TextImageBlock({
  config,
  theme,
  isSelected,
  onClick,
}: TextImageBlockProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const paddingClasses = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
  }

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-200 ${
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
      {/* Edit overlay */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button size="sm" variant="secondary">
            <Edit size={14} />
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 size={14} />
          </Button>
        </div>
      )}

      <div
        className={`container mx-auto ${
          paddingClasses[config.padding || "md"]
        }`}
      >
        {/* Si hideImage est true ou pas d'image, afficher texte en pleine largeur */}
        {config.hideImage ? (
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="font-bold mb-6"
              style={{
                color: config.titleConfig?.textColor || theme.primaryColor,
                fontFamily: getFontFamily(config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"),
                fontSize: getFontSize(config.titleConfig?.fontSize || "30"),
              }}
            >
              {config.title}
            </h2>
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: config.text }}
            />
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              config.layout === "text-right" ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div
              className={config.layout === "text-right" ? "lg:col-start-2" : ""}
            >
              <h2
                className="font-bold mb-6"
                style={{
                  color: config.titleConfig?.textColor || theme.primaryColor,
                  fontFamily: getFontFamily(config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"),
                  fontSize: getFontSize(config.titleConfig?.fontSize || "30"),
                }}
              >
                {config.title}
              </h2>
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: config.text }}
              />
            </div>

            {/* Image */}
            <div
              className={config.layout === "text-right" ? "lg:col-start-1" : ""}
            >
              {config.image && !imageError ? (
                <img
                  src={config.image || "/placeholder.svg"}
                  alt={config.imageAlt}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Image non disponible
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
