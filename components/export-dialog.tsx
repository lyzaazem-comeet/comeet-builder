"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Globe, CheckCircle, Settings } from "lucide-react"
import type { Block, Theme } from "@/types/blocks"
import { downloadStaticSite, type ExportOptions } from "@/utils/static-generator"

interface ExportDialogProps {
  open: boolean
  onClose: () => void
  blocks: Block[]
  theme: Theme
}

export function ExportDialog({ open, onClose, blocks, theme }: ExportDialogProps) {
  const [siteName, setSiteName] = useState("Mon Événement")
  const [description, setDescription] = useState("Site d'événement créé avec Event Builder")
  const [includeAnalytics, setIncludeAnalytics] = useState(false)
  const [analyticsId, setAnalyticsId] = useState("")
  const [customDomain, setCustomDomain] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Convert blocks to BlockData format
      const blockData = blocks
        .sort((a, b) => a.position - b.position)
        .map((block) => ({
          id: block.id,
          type: block.type,
          position: block.position,
          data: block.config,
        }))

      // Ensure theme has the required structure
      const normalizedTheme = {
        ...theme,
        colors: {
          primary: theme.primaryColor,
          secondary: theme.secondaryColor,
          background: theme.backgroundColor,
          text: theme.textColor,
        },
        typography: {
          fontFamily: theme.fontFamily,
        },
      }

      const exportOptions: ExportOptions = {
        siteName,
        description,
        includeAnalytics,
        analyticsId: includeAnalytics ? analyticsId : undefined,
        customDomain: customDomain || undefined,
      }

      downloadStaticSite(blockData, normalizedTheme, exportOptions)

      setExportComplete(true)
      setTimeout(() => {
        setExportComplete(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download size={20} />
            Exporter votre site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Site Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations du site</h3>

            <div>
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Mon Événement"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de votre événement..."
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings size={18} />
              Options avancées
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeAnalytics"
                  checked={includeAnalytics}
                  onChange={(e) => setIncludeAnalytics(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="includeAnalytics">Inclure Google Analytics</Label>
              </div>

              {includeAnalytics && (
                <div>
                  <Label htmlFor="analyticsId">ID Google Analytics</Label>
                  <Input
                    id="analyticsId"
                    value={analyticsId}
                    onChange={(e) => setAnalyticsId(e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="customDomain">Domaine personnalisé (optionnel)</Label>
                <Input
                  id="customDomain"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="www.monevenement.com"
                />
              </div>
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Format d'export</h3>

            <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
              <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-center">
                <div className="font-medium">Site complet (ZIP)</div>
                <div className="text-sm text-muted-foreground">Archive contenant HTML, CSS, JavaScript et README</div>
              </div>
            </div>
          </div>

          {/* Site Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Aperçu du contenu</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-2">
                {blocks.length} bloc{blocks.length > 1 ? "s" : ""} • Thème: {theme.fontFamily}
              </div>
              <div className="space-y-1">
                {blocks
                  .sort((a, b) => a.position - b.position)
                  .map((block) => (
                    <div key={block.id} className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {getBlockDisplayName(block.type)}: {getBlockTitle(block)}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Annuler
            </Button>
            <Button onClick={handleExport} disabled={isExporting || blocks.length === 0}>
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Export en cours...
                </>
              ) : exportComplete ? (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  Exporté !
                </>
              ) : (
                <>
                  <Download size={16} className="mr-2" />
                  Exporter le site
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getBlockDisplayName(type: string): string {
  const names = {
    header: "En-tête",
    agenda: "Programme",
    speakers: "Intervenants",
    location: "Lieu",
    rsvp: "Inscription",
    gallery: "Galerie",
    countdown: "Compte à rebours",
    faq: "FAQ",
    contact: "Contact",
    footer: "Pied de page",
    "custom-form": "Inscription / Réservation",
  }
  return names[type as keyof typeof names] || type
}

function getBlockTitle(block: Block): string {
  return block.config.title || block.config.name || "Sans titre"
}
