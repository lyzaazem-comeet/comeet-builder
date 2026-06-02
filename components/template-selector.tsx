"use client"

import { templates, type Template } from "@/lib/templates"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FileText,
  Sparkles,
  Briefcase,
  Ticket,
  PartyPopper,
  Users,
  ArrowRight,
} from "lucide-react"

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
}

type Category = Template["category"]

const categoryIcons: Record<Category, typeof FileText> = {
  blank: FileText,
  wedding: Sparkles,
  entreprise: Briefcase,
  billetterie: Ticket,
  particulier: PartyPopper,
  association: Users,
}

const categoryLabels: Record<Category, string> = {
  blank: "Vierge",
  wedding: "Mariage",
  entreprise: "Entreprise",
  billetterie: "Billetterie",
  particulier: "Particulier",
  association: "Association",
}

const categoryDescriptions: Record<Category, string> = {
  blank: "Partez d'une page vide et créez votre propre design",
  wedding: "Pour célébrer votre union avec style",
  entreprise: "Conférences, séminaires et événements pros",
  billetterie: "Concerts, festivals et événements sportifs",
  particulier: "Anniversaires, fêtes et soirées privées",
  association: "Assemblées, galas et événements associatifs",
}

// Display order — categories with multiple templates first, blank last
const categoryOrder: Category[] = [
  "wedding",
  "entreprise",
  "billetterie",
  "particulier",
  "association",
  "blank",
]

function TemplateCard({
  template,
  onSelect,
}: {
  template: Template
  onSelect: () => void
}) {
  const Icon = categoryIcons[template.category]
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 overflow-hidden h-full flex flex-col"
      style={{ borderColor: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ab0036")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "transparent")
      }
      onClick={onSelect}
    >
      <div
        className="h-52 relative overflow-hidden"
        style={{
          background: template.thumbnail
            ? undefined
            : template.category === "blank"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : `linear-gradient(135deg, ${template.theme.primaryColor} 0%, ${template.theme.secondaryColor} 100%)`,
        }}
      >
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-20 h-20 text-white/30" />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {template.name}
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {template.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{template.blocks.length} blocs</span>
          <div className="flex gap-2">
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow"
              style={{ backgroundColor: template.theme.primaryColor }}
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow"
              style={{ backgroundColor: template.theme.secondaryColor }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: templates.filter((t) => t.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 relative p-8">
      {/* Comeet Logo */}
      <div className="absolute top-6 left-8">
        <div
          aria-label="Comeet"
          className="h-8 w-28"
          style={{
            backgroundColor: "#ab0036",
            maskImage: "url(/logocomeet.png)",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: "url(/logocomeet.png)",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      </div>

      <div className="max-w-6xl w-full mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: "#ab0036" }}>
            Créez votre site d'événement
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez un template pour commencer ou partez d'une page vierge
          </p>
        </div>

        {/* Sections by category */}
        <div className="space-y-14">
          {grouped.map(({ category, items }) => {
            const Icon = categoryIcons[category]
            return (
              <section key={category}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#ab003615" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#ab0036" }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {categoryLabels[category]}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                </div>

                {/* Cards grid */}
                <div
                  className={
                    category === "blank"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid grid-cols-1 md:grid-cols-2 gap-6"
                  }
                >
                  {items.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={() => onSelectTemplate(template)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Footer Help Text */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>
            💡 Vous pourrez personnaliser tous les éléments après avoir choisi
            votre template
          </p>
        </div>
      </div>
    </div>
  )
}
