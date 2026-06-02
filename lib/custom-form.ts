import type { CustomFormField } from "@/types/blocks"

export const LOCKED_REQUIRED_FIELD_IDS = [
  "name_title",
  "first_name",
  "last_name",
  "email",
  "mobile",
  "attending_status",
] as const

const LOCKED_REQUIRED_FIELDS: CustomFormField[] = [
  {
    id: "name_title",
    label: "Civilite",
    type: "select",
    required: true,
    options: ["M.", "Mme"],
    placeholder: "Selectionner",
    locked: true,
  },
  {
    id: "first_name",
    label: "Prenom",
    type: "text",
    required: true,
    placeholder: "Prenom",
    locked: true,
  },
  {
    id: "last_name",
    label: "Nom",
    type: "text",
    required: true,
    placeholder: "Nom",
    locked: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "email@exemple.com",
    locked: true,
  },
  {
    id: "mobile",
    label: "Mobile",
    type: "phone",
    required: true,
    placeholder: "06 12 34 56 78",
    locked: true,
  },
  {
    id: "attending_status",
    label: "Participation",
    type: "radio",
    required: true,
    options: ["Oui", "Non", "Je ne sais pas encore"],
    locked: true,
  },
]

export function getNormalizedCustomFormFields(fields: CustomFormField[] = []): CustomFormField[] {
  // Build a map of user-customized labels for locked fields
  const userLabelOverrides = new Map<string, string>()
  for (const field of fields) {
    if (LOCKED_REQUIRED_FIELD_IDS.includes(field.id as typeof LOCKED_REQUIRED_FIELD_IDS[number]) && field.label) {
      userLabelOverrides.set(field.id, field.label)
    }
  }

  const nonLockedCustomFields = fields.filter((field) => !LOCKED_REQUIRED_FIELD_IDS.includes(field.id as typeof LOCKED_REQUIRED_FIELD_IDS[number]))

  // Apply user label overrides to locked fields
  const lockedFields = LOCKED_REQUIRED_FIELDS.map((field) => {
    const customLabel = userLabelOverrides.get(field.id)
    if (customLabel) {
      return { ...field, label: customLabel }
    }
    return field
  })

  return [
    ...lockedFields,
    ...nonLockedCustomFields,
  ]
}
