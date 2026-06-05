"use client"

import type { Theme, CustomFormConfig, CustomFormField } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getFontFamily, getFontSize } from "@/lib/font-utils"
import { getNormalizedCustomFormFields } from "@/lib/custom-form"

interface CustomFormBlockProps {
  config: CustomFormConfig
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function CustomFormBlock({
  config,
  theme,
  isSelected,
  onClick,
}: CustomFormBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "md"
  const titleFontFamily = config.titleConfig?.fontFamily || theme.fontFamily || "modern"
  const normalizedFields = getNormalizedCustomFormFields(config.fields || [])

  const renderField = (field: CustomFormField) => {
    const commonLabelStyle = { color: config.textColor || theme.textColor }

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id}>
            <Label
              htmlFor={field.id}
              className="text-sm font-medium mb-2 block"
              style={commonLabelStyle}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 bg-white text-gray-900 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              rows={4}
            />
          </div>
        )

      case "select":
        // Filter out empty options to avoid Select.Item error
        const validOptions = (field.options || []).filter((opt) => opt && opt.trim())
        return (
          <div key={field.id}>
            <Label
              htmlFor={field.id}
              className="text-sm font-medium mb-2 block"
              style={commonLabelStyle}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                <SelectValue placeholder={field.placeholder || "Sélectionner..."} />
              </SelectTrigger>
              <SelectContent>
                {validOptions.map((option, idx) => (
                  <SelectItem key={idx} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox id={field.id} required={field.required} />
            <Label
              htmlFor={field.id}
              className="text-sm font-medium"
              style={commonLabelStyle}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          </div>
        )

      case "radio":
        // Filter out empty options
        const validRadioOptions = (field.options || []).filter((opt) => opt && opt.trim())
        return (
          <div key={field.id}>
            <Label
              className="text-sm font-medium mb-2 block"
              style={commonLabelStyle}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2 mt-2">
              {validRadioOptions.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${field.id}-${idx}`}
                    name={field.id}
                    value={option}
                    required={field.required && idx === 0}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label
                    htmlFor={`${field.id}-${idx}`}
                    className="text-sm font-normal"
                    style={commonLabelStyle}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div key={field.id}>
            <Label
              htmlFor={field.id}
              className="text-sm font-medium mb-2 block"
              style={commonLabelStyle}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === "phone" ? "tel" : field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 bg-white text-gray-900 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        )
    }
  }

  return (
    <section
      id="custom-form"
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
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold text-center mb-4 text-balance"
            style={{
              color: config.titleConfig?.textColor || config.textColor || theme.textColor,
              fontSize: getFontSize(titleFontSize),
              fontFamily: getFontFamily(titleFontFamily),
            }}
          >
            {config.title}
          </h2>
          {config.description && (
            <p
              className="mb-8 text-pretty whitespace-pre-line"
              style={{ color: config.textColor || theme.textColor, opacity: 0.9 }}
            >
              {config.description?.replace(/<br\s*\/?>/gi, "\n")}
            </p>
          )}

          <form className="space-y-4 text-left">
            {normalizedFields.map((field) => renderField(field))}

            {/* Companions section preview */}
            <div
              className="space-y-3 p-4 rounded-lg border"
              style={{
                borderColor: `${config.textColor || theme.textColor}20`,
              }}
            >
              <div>
                <Label
                  className="text-sm mb-1 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {config.companionsLabel || "Invités supplémentaires"}
                </Label>
                <Input
                  type="number"
                  disabled
                  placeholder="Nombre de personnes supplémentaires"
                  className="bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <Label
                  className="text-sm block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {config.companionsDescription || "Merci d'indiquer le(s) nom(s) et prénom(s) des personnes qui t'accompagnent."}
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Input
                    type="text"
                    disabled
                    placeholder="Prénom personne 1"
                    className="bg-gray-100 text-gray-500 border-gray-300"
                  />
                  <Input
                    type="text"
                    disabled
                    placeholder="Nom personne 1"
                    className="bg-gray-100 text-gray-500 border-gray-300"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 font-semibold hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: config.buttonBackgroundColor || theme.primaryColor,
                color: config.buttonTextColor || theme.backgroundColor,
                border: `2px solid ${config.buttonBackgroundColor || theme.primaryColor}`,
              }}
            >
              {config.buttonText || "Envoyer"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
