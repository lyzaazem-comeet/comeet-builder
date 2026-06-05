"use client"

import type { Theme } from "@/types/blocks"
import type { CustomFormField } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getFontFamily, getFontSize } from "@/lib/font-utils"
import { getNormalizedCustomFormFields } from "@/lib/custom-form"

interface RSVPBlockProps {
  config: {
    title: string
    description: string
    fields: string[]
    buttonText: string
    backgroundColor?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    fields?: CustomFormField[]
    customFields?: CustomFormField[]
    companionsLabel?: string
    companionsDescription?: string
  }
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
}

export function RSVPBlock({
  config,
  theme,
  isSelected,
  onClick,
}: RSVPBlockProps) {
  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily = config.titleConfig?.fontFamily || config.fontFamily || theme.fontFamily || "modern"

  const normalizedFields = getNormalizedCustomFormFields(
    config.fields || config.customFields || [],
  )

  const extraFields = normalizedFields.filter(
    (field) => ![
      "name_title",
      "first_name",
      "last_name",
      "email",
      "mobile",
      "attending_status",
    ].includes(field.id),
  )

  const getFieldLabel = (fieldId: string, defaultLabel: string) => {
    const field = normalizedFields.find((f) => f.id === fieldId)
    return field?.label || defaultLabel
  }

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
          <p className="mb-8 text-pretty whitespace-pre-line" style={{ color: config.textColor || theme.textColor, opacity: 0.9 }}>
            {config.description?.replace(/<br\s*\/?>/gi, "\n")}
          </p>

          <form className="space-y-6 text-left">
            {/* Main attendee section */}
            <div
              className="p-4 rounded-lg border space-y-4"
              style={{
                borderColor: `${config.textColor || theme.textColor}20`,
              }}
            >
              <div>
                <span
                  className="text-sm font-medium"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  Vos informations
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label
                    className="text-sm mb-1 block"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    {getFieldLabel("name_title", "Civilité")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    disabled
                    value="M. ou Mme"
                    className="bg-gray-100 text-gray-500 border-gray-300"
                  />
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label
                      className="text-sm mb-1 block"
                      style={{ color: config.textColor || theme.textColor }}
                    >
                      {getFieldLabel("first_name", "Prénom")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      disabled
                      placeholder="Prénom"
                      className="bg-gray-100 text-gray-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label
                      className="text-sm mb-1 block"
                      style={{ color: config.textColor || theme.textColor }}
                    >
                      {getFieldLabel("last_name", "Nom")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      disabled
                      placeholder="Nom"
                      className="bg-gray-100 text-gray-500 border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  className="text-sm mb-1 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {getFieldLabel("email", "Email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  disabled
                  placeholder="email@exemple.com"
                  className="bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>

              <div>
                <Label
                  className="text-sm mb-1 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {getFieldLabel("mobile", "Mobile")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  disabled
                  placeholder="06 12 34 56 78"
                  className="bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>

              <div>
                <Label
                  className="text-sm mb-2 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {getFieldLabel("attending_status", "Seras-tu présent à la réception ?")} <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-sm opacity-50"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      disabled
                      className="h-4 w-4"
                    />
                    Oui
                  </label>
                  <label
                    className="flex items-center gap-2 text-sm opacity-50"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      disabled
                      className="h-4 w-4"
                    />
                    Non
                  </label>
                  <label
                    className="flex items-center gap-2 text-sm opacity-50"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      disabled
                      className="h-4 w-4"
                    />
                    Je ne sais pas encore
                  </label>
                </div>
              </div>
            </div>

            {/* Companions section */}
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

            {/* Extra Custom Fields */}
            {extraFields.map((field) => (
              <div key={field.id}>
                <Label
                  className="text-sm mb-1 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  type={field.type === "phone" ? "tel" : field.type}
                  disabled
                  placeholder={field.placeholder || ""}
                  className="bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>
            ))}

            <Button
              type="submit"
              disabled
              className="w-full mt-6 font-semibold hover:opacity-90 transition-opacity opacity-50"
              style={{
                backgroundColor: config.buttonBackgroundColor || theme.primaryColor,
                color: config.buttonTextColor || theme.backgroundColor,
                border: `2px solid ${config.buttonBackgroundColor || theme.primaryColor}`,
              }}
            >
              {config.buttonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
