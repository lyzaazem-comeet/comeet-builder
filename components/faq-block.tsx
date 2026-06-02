"use client"

import { useState } from "react"
import type { Theme } from "@/types/blocks"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"

interface FAQBlockProps {
  config: {
    title: string
    questions: Array<{
      question: string
      answer: string
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

export function FAQBlock({
  config,
  theme,
  isSelected,
  onClick,
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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

        <div className="max-w-3xl mx-auto space-y-4">
          {config.questions.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenIndex(openIndex === index ? null : index)
                }}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
