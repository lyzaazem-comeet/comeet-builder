"use client"

import { useState } from "react"
import type { Ticket, Theme } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface TicketingBlockProps {
  config: {
    title: string
    description: string
    tickets: Ticket[]
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

export function TicketingBlock({ config, theme, isSelected, onClick }: TicketingBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily = config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (ticketId: string) => {
    setImageErrors((prev) => ({ ...prev, [ticketId]: true }))
  }

  const formatPrice = (price?: number) => {
    if (price === undefined || price === 0) return "Gratuit"
    return `${price}€`
  }

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-200 py-16 ${
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-center mb-4 text-balance" style={{ color: config.titleConfig?.textColor || config.textColor || theme.primaryColor, fontSize: getFontSize(titleFontSize), fontFamily: getFontFamily(titleFontFamily) }}>
            {config.title}
          </h2>
          <p className="text-xl max-w-2xl mx-auto whitespace-pre-line" style={{ color: config.textColor || theme.textColor, opacity: 0.9 }}>
            {config.description?.replace(/<br\s*\/?>/gi, "\n")}
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {config.tickets.slice(0, 3).map((ticket) => (
            <Card key={ticket.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* Ticket Image */}
              {ticket.image && !imageErrors[ticket.id] ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={ticket.image || "/placeholder.svg"}
                    alt={ticket.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(ticket.id)}
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <ShoppingCart size={48} className="text-muted-foreground" />
                </div>
              )}

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{ticket.name}</CardTitle>
                  <Badge variant={ticket.available ? "default" : "secondary"}>
                    {ticket.available ? "Disponible" : "Épuisé"}
                  </Badge>
                </div>
                <CardDescription className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
                  {formatPrice(ticket.price)}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6">{ticket.description}</p>

                <Button
                  className="w-full font-semibold hover:opacity-90 transition-opacity"
                  disabled={!ticket.available}
                  style={{
                    backgroundColor: "#2C3E2C",
                    color: "#F5F3EF",
                  }}
                >
                  {ticket.available ? "Réserver" : "Non disponible"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
