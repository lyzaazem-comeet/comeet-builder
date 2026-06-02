"use client"

import { useState, useEffect } from "react"
import type { GalleryConfig, Theme } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Edit,
  Trash2,
} from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface GalleryBlockProps {
  config: GalleryConfig & {
    backgroundColor?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
    fullWidth?: boolean
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function GalleryBlock({
  config,
  theme,
  isSelected,
  onClick,
}: GalleryBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily = config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Auto-play for carousel
  useEffect(() => {
    if (
      config.layout !== "grid" &&
      config.autoplay &&
      config.images.length > 1
    ) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % config.images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [config.layout, config.autoplay, config.images.length])

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % config.images.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + config.images.length) % config.images.length
    )
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const renderGridLayout = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {config.images && config.images.length > 0
        ? config.images.map((image) => (
            <div
              key={image.id}
              className="aspect-square bg-muted rounded-lg overflow-hidden group relative"
            >
              {image.url && !imageErrors[image.id] ? (
                <img
                  src={image.url}
                  alt={image.alt || "Image"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(image.id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={32} className="text-muted-foreground" />
                </div>
              )}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.caption}
                </div>
              )}
            </div>
          ))
        : // Placeholder images
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-muted rounded-lg flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <ImageIcon size={32} className="mx-auto mb-2" />
                <p className="text-sm">Image {index + 1}</p>
              </div>
            </div>
          ))}
    </div>
  )

  const renderCarousel = () => {
    const images =
      config.images && config.images.length > 0
        ? config.images
        : [
            {
              id: "1",
              url: "",
              alt: "Placeholder 1",
              caption: "Image exemple 1",
            },
            {
              id: "2",
              url: "",
              alt: "Placeholder 2",
              caption: "Image exemple 2",
            },
            {
              id: "3",
              url: "",
              alt: "Placeholder 3",
              caption: "Image exemple 3",
            },
          ]

    const isFullWidth = config.fullWidth

    const getSlideClasses = (index: number) => {
      if (config.layout === "carousel-fade") {
        return index === currentSlide ? "opacity-100" : "opacity-0"
      }
      if (index === currentSlide) return "translate-x-0"
      if (index < currentSlide) return "-translate-x-full"
      return "translate-x-full"
    }

    return (
      <div className={`relative ${isFullWidth ? 'w-full' : 'max-w-4xl mx-auto'}`}>
        {/* Main carousel */}
        <div className={`relative ${isFullWidth ? 'h-[70vh]' : 'h-96'} ${isFullWidth ? '' : 'rounded-lg'} overflow-hidden`}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-500 ${getSlideClasses(index)}`}
            >
              {image.url && !imageErrors[image.id] ? (
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image.id)}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon size={48} className="mx-auto mb-2" />
                    <p>Image {index + 1}</p>
                  </div>
                </div>
              )}

              {/* Caption overlay */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg">{image.caption}</p>
                </div>
              )}
            </div>
          ))}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevSlide}
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextSlide}
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {config.showThumbnails && images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentSlide
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                {image.url && !imageErrors[image.id] ? (
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon size={12} />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Dots indicator */}
        {!config.showThumbnails && images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section
      className={`py-16 cursor-pointer transition-all duration-200 relative group ${
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

      <div className={config.fullWidth && config.layout !== "grid" ? "" : "container mx-auto px-4"}>
        <h2
          className={`font-bold text-center mb-12 text-balance ${config.fullWidth ? 'px-4' : ''}`}
          style={{
            color: config.titleConfig?.textColor || theme.primaryColor,
            fontSize: getFontSize(titleFontSize),
            fontFamily: getFontFamily(titleFontFamily),
          }}
        >
          {config.title}
        </h2>

        {config.layout === "grid" ? renderGridLayout() : renderCarousel()}
      </div>
    </section>
  )
}
