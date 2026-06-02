"use client"

import { useMemo, useState } from "react"
import type { Theme } from "@/types/blocks"
import type { CustomFormField } from "@/types/blocks"
import type { GuestData } from "@/lib/comeet-api"
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
import { CheckCircle, Loader2 } from "lucide-react"
import { getFontFamily, getFontSize } from "@/lib/font-utils"
import { getNormalizedCustomFormFields } from "@/lib/custom-form"

interface PublishedRSVPBlockProps {
  config: {
    title: string
    description: string
    buttonText: string
    backgroundColor?: string
    textColor?: string
    titleConfig?: { textColor?: string; fontSize?: string; fontFamily?: string }
    fontSize?: string
    fontFamily?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    fields?: CustomFormField[]
    companionsLabel?: string
    companionsDescription?: string
  }
  theme: Theme
  eventId: string
  guestData: GuestData | null
}

interface MainAttendee {
  nameTitle: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  attendingStatus: string
}

const emptyMainAttendee = (): MainAttendee => ({
  nameTitle: "1",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  attendingStatus: "1",
})

export function PublishedRSVPBlock({
  config,
  theme,
  eventId,
  guestData,
}: PublishedRSVPBlockProps) {
  const [mainAttendee, setMainAttendee] =
    useState<MainAttendee>(emptyMainAttendee())
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companionsCountInput, setCompanionsCountInput] = useState("")
  const companionsCount = Number.parseInt(companionsCountInput || "0", 10) || 0
  const [companions, setCompanions] = useState<
    Array<{ firstName: string; lastName: string }>
  >([])
  const [customFieldValues, setCustomFieldValues] = useState<
    Record<string, string | boolean>
  >({})

  const titleFontSize = config.titleConfig?.fontSize || "30"
  const titleFontFamily =
    config.titleConfig?.fontFamily ||
    config.fontFamily ||
    theme.fontFamily ||
    "modern"

  const seatLimit = guestData?.guests?.limit || 1
  const normalizedFields = useMemo(
    () => getNormalizedCustomFormFields(config.fields || []),
    [config.fields],
  )
  const extraFields = normalizedFields.filter(
    (field) =>
      ![
        "name_title",
        "first_name",
        "last_name",
        "email",
        "mobile",
        "attending_status",
      ].includes(field.id),
  )

  // Helper to get custom label for locked fields
  const getFieldLabel = (fieldId: string, defaultLabel: string) => {
    const field = normalizedFields.find((f) => f.id === fieldId)
    return field?.label || defaultLabel
  }

  const updateMainAttendee = (field: keyof MainAttendee, value: string) => {
    setMainAttendee((prev) => ({ ...prev, [field]: value }))
  }

  const updateCustomField = (fieldId: string, value: string | boolean) => {
    setCustomFieldValues((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleCompanionsCountChange = (value: string) => {
    if (value === "") {
      setCompanionsCountInput("")
      setCompanions([])
      return
    }

    const parsed = Math.max(0, Number.parseInt(value, 10) || 0)
    setCompanionsCountInput(String(parsed))
    setCompanions((prev) =>
      Array.from(
        { length: parsed },
        (_, index) => prev[index] || { firstName: "", lastName: "" },
      ),
    )
  }

  const updateCompanion = (
    index: number,
    key: "firstName" | "lastName",
    value: string,
  ) => {
    setCompanions((prev) => {
      const next = [...prev]
      next[index] = {
        ...(next[index] || { firstName: "", lastName: "" }),
        [key]: value,
      }
      return next
    })
  }

  const handleAttendingStatusChange = (status: string) => {
    updateMainAttendee("attendingStatus", status)
    // Reset companions when selecting "Non" (status "3")
    if (status === "3") {
      setCompanionsCountInput("")
      setCompanions([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      // Build attendees array: main attendee + companions (if any and attending)
      const attendeesList = [mainAttendee]

      // Only add companions if mainAttendee is attending (status "1")
      if (mainAttendee.attendingStatus === "1" && companions.length > 0) {
        companions.forEach((companion) => {
          attendeesList.push({
            nameTitle: "1", // Default to M. for companions
            firstName: companion.firstName,
            lastName: companion.lastName,
            email: "", // Companions don't have emails
            mobile: "", // Companions don't have mobile
            attendingStatus: "1", // Companions are attending
          })
        })
      }

      // Calculate total attending
      const totalAttending = attendeesList.filter(
        (a) => a.attendingStatus === "1",
      ).length

      // Flatten attendees into arrays
      const nameTitles = attendeesList.map((a) => a.nameTitle)
      const firstNames = attendeesList.map((a) => a.firstName)
      const lastNames = attendeesList.map((a) => a.lastName)
      const emails = attendeesList.map((a) => a.email)
      const attendingStatuses = attendeesList.map((a) => a.attendingStatus)

      // Format custom fields for other_data
      const otherData: Record<string, string | boolean> = {}
      if (mainAttendee.mobile) {
        otherData[getFieldLabel("mobile", "Mobile")] = mainAttendee.mobile
      }
      extraFields.forEach((field) => {
        if (customFieldValues[field.id] !== undefined) {
          otherData[field.label] = customFieldValues[field.id]
        }
      })

      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          seatlimit: seatLimit,
          total_attending_no: totalAttending,
          name_title: nameTitles,
          first_name: firstNames,
          last_name: lastNames,
          email: emails,
          attending_status: attendingStatuses,
          guest_access_token: guestData?.guests?.token || "",
          other_data: JSON.stringify(otherData),
        }),
      })

      const result = await response.json()

      if (result.error) {
        setError(result.error)
      } else {
        setSubmitted(true)
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section
        className="py-16"
        style={{
          backgroundColor: config.backgroundColor || theme.backgroundColor,
          color: config.textColor || theme.textColor,
          fontFamily: getFontFamily(
            config.fontFamily || theme.fontFamily || "modern",
          ),
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle
              size={48}
              className="mx-auto mb-4"
              style={{
                color: config.buttonBackgroundColor || theme.primaryColor,
              }}
            />
            <h2
              className="font-bold mb-4"
              style={{
                color:
                  config.titleConfig?.textColor ||
                  config.textColor ||
                  theme.textColor,
                fontSize: getFontSize(titleFontSize),
                fontFamily: getFontFamily(titleFontFamily),
              }}
            >
              Merci pour votre réponse !
            </h2>
            <p
              style={{
                color: config.textColor || theme.textColor,
                opacity: 0.9,
              }}
            >
              Votre inscription a bien été enregistrée.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: config.backgroundColor || theme.backgroundColor,
        color: config.textColor || theme.textColor,
        fontFamily: getFontFamily(
          config.fontFamily || theme.fontFamily || "modern",
        ),
        fontSize: getFontSize(config.fontSize || "16"),
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold text-center mb-4 text-balance"
            style={{
              color:
                config.titleConfig?.textColor ||
                config.textColor ||
                theme.textColor,
              fontSize: getFontSize(titleFontSize),
              fontFamily: getFontFamily(titleFontFamily),
            }}
          >
            {config.title}
          </h2>
          <p
            className="mb-8 text-pretty whitespace-pre-line"
            style={{ color: config.textColor || theme.textColor, opacity: 0.9 }}
          >
            {config.description?.replace(/<br\s*\/?>/gi, "\n")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Main Attendee Section */}
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
                  <Select
                    value={mainAttendee.nameTitle}
                    onValueChange={(v) => updateMainAttendee("nameTitle", v)}
                  >
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">M.</SelectItem>
                      <SelectItem value="2">Mme</SelectItem>
                    </SelectContent>
                  </Select>
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
                      required
                      value={mainAttendee.firstName}
                      onChange={(e) =>
                        updateMainAttendee("firstName", e.target.value)
                      }
                      className="bg-white text-gray-900 border-gray-300"
                      placeholder="Prénom"
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
                      required
                      value={mainAttendee.lastName}
                      onChange={(e) =>
                        updateMainAttendee("lastName", e.target.value)
                      }
                      className="bg-white text-gray-900 border-gray-300"
                      placeholder="Nom"
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
                  required
                  type="email"
                  value={mainAttendee.email}
                  onChange={(e) => updateMainAttendee("email", e.target.value)}
                  className="bg-white text-gray-900 border-gray-300"
                  placeholder="email@exemple.com"
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
                  required
                  type="tel"
                  value={mainAttendee.mobile}
                  onChange={(e) => updateMainAttendee("mobile", e.target.value)}
                  className="bg-white text-gray-900 border-gray-300"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <Label
                  className="text-sm mb-2 block"
                  style={{ color: config.textColor || theme.textColor }}
                >
                  {getFieldLabel("attending_status", "Seras-tu présent à la réception ?")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-sm"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      name="attending-status"
                      checked={mainAttendee.attendingStatus === "1"}
                      onChange={() => handleAttendingStatusChange("1")}
                      className="h-4 w-4"
                      required
                    />
                    Oui
                  </label>
                  <label
                    className="flex items-center gap-2 text-sm"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      name="attending-status"
                      checked={mainAttendee.attendingStatus === "3"}
                      onChange={() => handleAttendingStatusChange("3")}
                      className="h-4 w-4"
                    />
                    Non
                  </label>
                  <label
                    className="flex items-center gap-2 text-sm"
                    style={{ color: config.textColor || theme.textColor }}
                  >
                    <input
                      type="radio"
                      name="attending-status"
                      checked={mainAttendee.attendingStatus === "2"}
                      onChange={() => handleAttendingStatusChange("2")}
                      className="h-4 w-4"
                    />
                    Je ne sais pas encore
                  </label>
                </div>
              </div>
            </div>

            {/* Invités Supplémentaires Section - Only show if attending */}
            {mainAttendee.attendingStatus === "1" && (
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
                    min={0}
                    type="number"
                    value={companionsCountInput}
                    onChange={(e) =>
                      handleCompanionsCountChange(e.target.value)
                    }
                    className="bg-white text-gray-900 border-gray-300"
                    placeholder="Nombre de personnes supplémentaires"
                  />
                </div>

                {companionsCount > 0 && (
                  <div className="space-y-3 mt-4">
                    <Label
                      className="text-sm block"
                      style={{ color: config.textColor || theme.textColor }}
                    >
                      {config.companionsDescription || "Merci d'indiquer le(s) nom(s) et prénom(s) des personnes qui t'accompagnent."}
                    </Label>
                    {companions.map((companion, index) => (
                      <div
                        key={`companion-${index}`}
                        className="grid grid-cols-2 gap-3"
                      >
                        <Input
                          value={companion.firstName}
                          onChange={(e) =>
                            updateCompanion(index, "firstName", e.target.value)
                          }
                          className="bg-white text-gray-900 border-gray-300"
                          placeholder={`Prénom personne ${index + 1}`}
                        />
                        <Input
                          value={companion.lastName}
                          onChange={(e) =>
                            updateCompanion(index, "lastName", e.target.value)
                          }
                          className="bg-white text-gray-900 border-gray-300"
                          placeholder={`Nom personne ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Extra Custom Fields */}
            {extraFields.map((field) => {
              const labelStyle = { color: config.textColor || theme.textColor }
              const fieldLabel = (
                <Label
                  className="text-sm mb-1 block"
                  style={labelStyle}
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
              )

              if (field.type === "textarea") {
                return (
                  <div key={field.id}>
                    {fieldLabel}
                    <Textarea
                      required={field.required}
                      value={(customFieldValues[field.id] as string) || ""}
                      onChange={(e) => updateCustomField(field.id, e.target.value)}
                      className="bg-white text-gray-900 border-gray-300"
                      placeholder={field.placeholder || ""}
                      rows={4}
                    />
                  </div>
                )
              }

              if (field.type === "select") {
                const validOptions = (field.options || []).filter((opt) => opt && opt.trim())
                return (
                  <div key={field.id}>
                    {fieldLabel}
                    <Select
                      value={(customFieldValues[field.id] as string) || ""}
                      onValueChange={(v) => updateCustomField(field.id, v)}
                    >
                      <SelectTrigger className="bg-white text-gray-900 border-gray-300">
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
              }

              if (field.type === "radio") {
                const validOptions = (field.options || []).filter((opt) => opt && opt.trim())
                return (
                  <div key={field.id}>
                    {fieldLabel}
                    <div className="space-y-2 mt-1">
                      {validOptions.map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                          style={labelStyle}
                        >
                          <input
                            type="radio"
                            name={field.id}
                            value={option}
                            checked={customFieldValues[field.id] === option}
                            onChange={() => updateCustomField(field.id, option)}
                            required={field.required && idx === 0}
                            className="h-4 w-4"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              }

              if (field.type === "checkbox") {
                return (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={!!customFieldValues[field.id]}
                      onCheckedChange={(checked) => updateCustomField(field.id, !!checked)}
                      required={field.required}
                    />
                    <Label
                      htmlFor={field.id}
                      className="text-sm"
                      style={labelStyle}
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                  </div>
                )
              }

              return (
                <div key={field.id}>
                  {fieldLabel}
                  <Input
                    type={field.type === "phone" ? "tel" : field.type}
                    required={field.required}
                    value={(customFieldValues[field.id] as string) || ""}
                    onChange={(e) => updateCustomField(field.id, e.target.value)}
                    className="bg-white text-gray-900 border-gray-300"
                    placeholder={field.placeholder || ""}
                  />
                </div>
              )
            })}

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full mt-6 font-semibold hover:opacity-90 transition-opacity"
              style={{
                backgroundColor:
                  config.buttonBackgroundColor || theme.primaryColor,
                color: config.buttonTextColor || theme.backgroundColor,
                border: `2px solid ${config.buttonBackgroundColor || theme.primaryColor}`,
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                config.buttonText || "S'inscrire"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
