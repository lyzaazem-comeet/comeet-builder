"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { X, Undo2 } from "lucide-react"
import type { Theme } from "@/types/blocks"
import { getFontFamily } from "@/lib/font-utils"

interface ThemePanelProps {
  open: boolean
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onClose: () => void
}

const fontFamilyOptions = [
  { key: "classic", label: "Classique (Playfair Display)" },
  { key: "elegant", label: "Élégante (Montserrat)" },
  { key: "modern", label: "Moderne (Inter)" },
  { key: "playful", label: "Ludique (Poppins)" },
]

export function ThemePanel({ open, theme, onThemeChange, onClose }: ThemePanelProps) {
  const [activeTab, setActiveTab] = useState<"typography" | "navbar">("typography")

  if (!open) return null

  const resetTheme = () => {
    onThemeChange({
      ...theme,
      fontFamily: "modern",
      typography: { fontFamily: "modern" },
    })
  }

  const tabs = [
    { key: "typography" as const, label: "Police" },
    { key: "navbar" as const, label: "Navbar" },
  ]

  return (
    <div className="w-80 bg-sidebar border-l border-border fixed right-0 top-14 bottom-0 z-20">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Personnalisation</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTheme}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            title="Réinitialiser"
          >
            <Undo2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X size={18} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 p-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-sidebar-primary border-b-2 border-sidebar-primary"
                : "text-muted-foreground hover:text-sidebar-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-160px)]">
        <div className="p-4">
          {activeTab === "typography" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fontFamily" className="text-sm font-medium text-sidebar-foreground">
                  Police de caractères
                </Label>
                <select
                  id="fontFamily"
                  value={theme.fontFamily}
                  onChange={(e) =>
                    onThemeChange({
                      ...theme,
                      fontFamily: e.target.value,
                      typography: { ...theme.typography, fontFamily: e.target.value },
                    })
                  }
                  className="w-full mt-2 p-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {fontFamilyOptions.map((font) => (
                    <option key={font.key} value={font.key}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-sm font-medium text-sidebar-foreground mb-3">Aperçu typographique</h4>
                <div
                  className="space-y-4 p-4 rounded-lg border border-border"
                  style={{ fontFamily: getFontFamily(theme.fontFamily) }}
                >
                  <h1 className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
                    Titre principal
                  </h1>
                  <h2 className="text-xl font-semibold" style={{ color: theme.textColor }}>
                    Sous-titre
                  </h2>
                  <p className="text-base" style={{ color: theme.textColor }}>
                    Ceci est un exemple de paragraphe avec la police sélectionnée.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "navbar" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="showNavbar" className="text-sm font-medium text-sidebar-foreground mb-0">
                  Afficher la navbar
                </Label>
                <Switch
                  id="showNavbar"
                  checked={theme.showNavbar !== false}
                  onCheckedChange={(checked) =>
                    onThemeChange({ ...theme, showNavbar: checked })
                  }
                />
              </div>

              {theme.showNavbar !== false && (
                <>
                  <div>
                    <Label htmlFor="navbarBg" className="text-sm font-medium text-sidebar-foreground">
                      Fond de la navbar
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-lg border border-border shrink-0"
                        style={{ backgroundColor: theme.navbar?.backgroundColor || theme.primaryColor }}
                      />
                      <Input
                        id="navbarBg"
                        type="color"
                        value={theme.navbar?.backgroundColor || theme.primaryColor}
                        onChange={(e) => onThemeChange({
                          ...theme,
                          navbar: {
                            ...theme.navbar,
                            backgroundColor: e.target.value,
                            textColor: theme.navbar?.textColor || theme.backgroundColor,
                          }
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="navbarText" className="text-sm font-medium text-sidebar-foreground">
                      Texte de la navbar
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <div
                        className="w-10 h-10 rounded-lg border border-border shrink-0"
                        style={{ backgroundColor: theme.navbar?.textColor || theme.backgroundColor }}
                      />
                      <Input
                        id="navbarText"
                        type="color"
                        value={theme.navbar?.textColor || theme.backgroundColor}
                        onChange={(e) => onThemeChange({
                          ...theme,
                          navbar: {
                            ...theme.navbar,
                            backgroundColor: theme.navbar?.backgroundColor || theme.primaryColor,
                            textColor: e.target.value,
                          }
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
