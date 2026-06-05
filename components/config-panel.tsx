"use client"

import React from "react"
import { useState } from "react"
import type { Block } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Trash2 } from "lucide-react"
import { ImageUploader } from "./image-uploader" // Added image uploader import
import { getNormalizedCustomFormFields, LOCKED_REQUIRED_FIELD_IDS } from "@/lib/custom-form"

interface ConfigPanelProps {
  open: boolean
  selectedBlock: Block | null
  onUpdateBlock: (id: string, config: any) => void
  onClose: () => void
  eventId?: string | null
}

export function ConfigPanel({
  open,
  selectedBlock,
  onUpdateBlock,
  onClose,
  eventId,
}: ConfigPanelProps) {
  const [config, setConfig] = useState(selectedBlock?.config || {})

  // Update local config when selectedBlock changes
  React.useEffect(() => {
    if (selectedBlock) {
      setConfig(selectedBlock.config)
    }
  }, [selectedBlock])

  React.useEffect(() => {
    if (!selectedBlock || selectedBlock.type !== "custom-form") return
    const sourceFields = selectedBlock.config.fields || []
    const normalizedFields = getNormalizedCustomFormFields(sourceFields)
    if (JSON.stringify(sourceFields) !== JSON.stringify(normalizedFields)) {
      onUpdateBlock(selectedBlock.id, {
        ...selectedBlock.config,
        fields: normalizedFields,
      })
    }
  }, [selectedBlock])

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    if (selectedBlock) {
      onUpdateBlock(selectedBlock.id, newConfig)
    }
  }

  const updateNestedConfig = (
    parentKey: string,
    index: number,
    key: string,
    value: any
  ) => {
    const newConfig = { ...config }
    if (!newConfig[parentKey]) newConfig[parentKey] = []
    newConfig[parentKey][index] = {
      ...newConfig[parentKey][index],
      [key]: value,
    }
    setConfig(newConfig)
    if (selectedBlock) {
      onUpdateBlock(selectedBlock.id, newConfig)
    }
  }

  const addArrayItem = (key: string, defaultItem: any) => {
    const newConfig = { ...config }
    if (!newConfig[key]) newConfig[key] = []
    newConfig[key].push({ ...defaultItem, id: Date.now().toString() })
    setConfig(newConfig)
    if (selectedBlock) {
      onUpdateBlock(selectedBlock.id, newConfig)
    }
  }

  const removeArrayItem = (key: string, index: number) => {
    const newConfig = { ...config }
    newConfig[key].splice(index, 1)
    setConfig(newConfig)
    if (selectedBlock) {
      onUpdateBlock(selectedBlock.id, newConfig)
    }
  }

  const updateFormField = (fieldId: string, key: string, value: any) => {
    const fields = getNormalizedCustomFormFields(config.fields || [])
    const newFields = fields.map((field) =>
      field.id === fieldId ? { ...field, [key]: value } : field,
    )
    updateConfig("fields", newFields)
  }

  const removeFormField = (fieldId: string) => {
    if (
      LOCKED_REQUIRED_FIELD_IDS.includes(
        fieldId as (typeof LOCKED_REQUIRED_FIELD_IDS)[number],
      )
    ) {
      return
    }
    const fields = getNormalizedCustomFormFields(config.fields || [])
    updateConfig(
      "fields",
      fields.filter((field) => field.id !== fieldId),
    )
  }

  const addFormField = () => {
    const fields = getNormalizedCustomFormFields(config.fields || [])
    updateConfig("fields", [
      ...fields,
      {
        id: `field-${Date.now()}`,
        label: "Nouveau champ",
        type: "text",
        placeholder: "",
        required: false,
        options: [],
      },
    ])
  }

  if (!open) return null

  const renderBasicFields = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Contenu de base</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        {config.title !== undefined && (
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={config.title || ""}
              onChange={(e) => updateConfig("title", e.target.value)}
              placeholder="Titre du bloc"
            />
          </div>
        )}

        {/* Description/Text */}
        {(config.description !== undefined || config.text !== undefined) && (
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={(config.description || config.text || "").replace(/<br\s*\/?>/gi, "\n")}
              onChange={(e) => {
                const key = config.description !== undefined ? "description" : "text"
                updateConfig(key, e.target.value.replace(/\n/g, "<br>"))
              }}
              placeholder="Description du bloc"
              rows={3}
            />
          </div>
        )}

        {/* Subtitle */}
        {config.subtitle !== undefined && (
          <div>
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input
              id="subtitle"
              value={config.subtitle || ""}
              onChange={(e) => updateConfig("subtitle", e.target.value)}
              placeholder="Sous-titre"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderStyleFields = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Style et apparence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Background Color */}
        {(config.backgroundColor !== undefined ||
          selectedBlock?.type === "text-image") && (
          <div>
            <Label htmlFor="backgroundColor">Couleur d'arrière-plan</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={config.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateConfig("backgroundColor", e.target.value)
                }
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateConfig("backgroundColor", e.target.value)
                }
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        )}

        {/* Text Color */}
        <div>
          <Label htmlFor="textColor">Couleur du texte (contenu)</Label>
          <div className="flex gap-2">
            <Input
              id="textColor"
              type="color"
              value={config.textColor || "#1e293b"}
              onChange={(e) => updateConfig("textColor", e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input
              value={config.textColor || "#1e293b"}
              onChange={(e) => updateConfig("textColor", e.target.value)}
              placeholder="#1e293b"
              className="flex-1"
            />
          </div>
        </div>

        {/* Title Color */}
        <div>
          <Label htmlFor="titleColor">Couleur des titres</Label>
          <div className="flex gap-2">
            <Input
              id="titleColor"
              type="color"
              value={config.titleConfig?.textColor || ""}
              onChange={(e) =>
                updateConfig("titleConfig", {
                  ...(config.titleConfig || {}),
                  textColor: e.target.value,
                })
              }
              className="w-16 h-10 p-1"
            />
            <Input
              value={config.titleConfig?.textColor || ""}
              onChange={(e) =>
                updateConfig("titleConfig", {
                  ...(config.titleConfig || {}),
                  textColor: e.target.value,
                })
              }
              placeholder="#3b82f6 (vide = couleur primaire)"
              className="flex-1"
            />
          </div>
        </div>

        {/* Font Sizes */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Taille du titre (px)</Label>
            <Input
              type="number"
              min={12}
              max={120}
              value={config.titleConfig?.fontSize || "30"}
              onChange={(e) =>
                updateConfig("titleConfig", {
                  ...(config.titleConfig || {}),
                  fontSize: e.target.value,
                })
              }
              placeholder="30"
            />
          </div>
          <div>
            <Label>Taille du texte (px)</Label>
            <Input
              type="number"
              min={10}
              max={72}
              value={config.fontSize || "16"}
              onChange={(e) => updateConfig("fontSize", e.target.value)}
              placeholder="16"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fontFamily">Police</Label>
          <Select
            value={config.fontFamily || "modern"}
            onValueChange={(value) => updateConfig("fontFamily", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classique</SelectItem>
              <SelectItem value="elegant">Élégante</SelectItem>
              <SelectItem value="modern">Moderne</SelectItem>
              <SelectItem value="playful">Ludique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Padding */}
        {config.padding !== undefined && (
          <div>
            <Label htmlFor="padding">Espacement</Label>
            <Select
              value={config.padding || "md"}
              onValueChange={(value) => updateConfig("padding", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Compact</SelectItem>
                <SelectItem value="md">Normal</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderHeroConfig = () => {
    if (selectedBlock?.type !== "hero") return null
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Date */}
          <div>
            <Label htmlFor="eventDate">Date de l'événement</Label>
            <Input
              id="eventDate"
              type="datetime-local"
              value={
                config.eventDate
                  ? new Date(config.eventDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                updateConfig(
                  "eventDate",
                  new Date(e.target.value).toISOString()
                )
              }
            />
          </div>

          {/* Background Type */}
          <div>
            <Label>Type d'arrière-plan</Label>
            <Select
              value={config.backgroundType || "color"}
              onValueChange={(value) => updateConfig("backgroundType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Couleur unie</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Background Color - only if type is color */}
          {(config.backgroundType === "color" || !config.backgroundType) && (
            <div>
              <Label>Couleur d'arrière-plan</Label>
              <div className="flex gap-2 mt-2">
                <div
                  className="w-10 h-10 rounded-lg border border-border flex-shrink-0"
                  style={{ backgroundColor: config.backgroundColor || "#556B55" }}
                />
                <Input
                  type="color"
                  value={config.backgroundColor || "#556B55"}
                  onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          )}

          {/* Background Image - only if type is image */}
          {config.backgroundType === "image" && (
            <div>
              <ImageUploader
                value={config.backgroundImage || ""}
                onChange={(value) => updateConfig("backgroundImage", value)}
                label="Image d'arrière-plan"
                placeholder="URL de l'image d'arrière-plan"
                enableCrop={true}
                cropAspectRatio={16 / 9}
                eventId={eventId || undefined}
              />
              <p className="text-xs text-muted-foreground mt-1">
                L'image sera automatiquement recadrée au format 16:9 pour un rendu optimal
              </p>
            </div>
          )}

          {/* Text Color */}
          <div>
            <Label>Couleur du texte</Label>
            <div className="flex gap-2 mt-2">
              <div
                className="w-10 h-10 rounded-lg border border-border flex-shrink-0"
                style={{ backgroundColor: config.textColor || "#FFFFFF" }}
              />
              <Input
                type="color"
                value={config.textColor || "#FFFFFF"}
                onChange={(e) => updateConfig("textColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Separator />

          {/* Title Font */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Taille du titre (px)</Label>
              <Input
                type="number"
                min={16}
                max={120}
                value={config.fontSize || "48"}
                onChange={(e) => updateConfig("fontSize", e.target.value)}
                placeholder="48"
              />
            </div>
            <div>
              <Label>Police du titre</Label>
              <Select
                value={config.fontFamily || "elegant"}
                onValueChange={(value) => updateConfig("fontFamily", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classique</SelectItem>
                  <SelectItem value="elegant">Élégante</SelectItem>
                  <SelectItem value="modern">Moderne</SelectItem>
                  <SelectItem value="playful">Ludique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subtitle Font */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Taille sous-titre (px)</Label>
              <Input
                type="number"
                min={12}
                max={80}
                value={config.subtitleFontSize || "24"}
                onChange={(e) => updateConfig("subtitleFontSize", e.target.value)}
                placeholder="24"
              />
            </div>
            <div>
              <Label>Police du sous-titre</Label>
              <Select
                value={config.subtitleFontFamily || "modern"}
                onValueChange={(value) => updateConfig("subtitleFontFamily", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classique</SelectItem>
                  <SelectItem value="elegant">Élégante</SelectItem>
                  <SelectItem value="modern">Moderne</SelectItem>
                  <SelectItem value="playful">Ludique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Show Countdown */}
          <div className="flex items-center space-x-2">
            <Switch
              id="showCountdown"
              checked={config.showCountdown !== false}
              onCheckedChange={(checked) =>
                updateConfig("showCountdown", checked)
              }
            />
            <Label htmlFor="showCountdown">Afficher le compte à rebours</Label>
          </div>

          <Separator />

          {/* CTA Button */}
          <div>
            <Label htmlFor="ctaText">Texte du bouton</Label>
            <Input
              id="ctaText"
              value={config.ctaText || "Confirmez votre présence"}
              onChange={(e) => updateConfig("ctaText", e.target.value)}
              placeholder="Confirmez votre présence"
            />
          </div>

          {/* Button Colors */}
          <div>
            <Label>Couleur du bouton</Label>
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Fond</Label>
                <Input
                  type="color"
                  value={config.buttonBackgroundColor || "#FFFFFF"}
                  onChange={(e) => updateConfig("buttonBackgroundColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Texte</Label>
                <Input
                  type="color"
                  value={config.buttonTextColor || "#556B55"}
                  onChange={(e) => updateConfig("buttonTextColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="ctaAction">Action du bouton</Label>
            <Select
              value={config.ctaAction || "rsvp"}
              onValueChange={(value) => updateConfig("ctaAction", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rsvp">
                  Aller au formulaire d'inscription
                </SelectItem>
                <SelectItem value="ticketing">
                  Aller à la billetterie
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderGalleryConfig = () => {
    if (selectedBlock?.type !== "gallery") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration galerie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Layout Type */}
          <div>
            <Label>Type d'affichage</Label>
            <Select
              value={config.layout || "grid"}
              onValueChange={(value) => updateConfig("layout", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grille</SelectItem>
                <SelectItem value="carousel-slide">
                  Carrousel glissant
                </SelectItem>
                <SelectItem value="carousel-fade">Carrousel fondu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Carousel Options */}
          {config.layout !== "grid" && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="fullWidth"
                  checked={config.fullWidth || false}
                  onCheckedChange={(checked) =>
                    updateConfig("fullWidth", checked)
                  }
                />
                <Label htmlFor="fullWidth">Pleine largeur</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoplay"
                  checked={config.autoplay || false}
                  onCheckedChange={(checked) =>
                    updateConfig("autoplay", checked)
                  }
                />
                <Label htmlFor="autoplay">Lecture automatique</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showThumbnails"
                  checked={config.showThumbnails || false}
                  onCheckedChange={(checked) =>
                    updateConfig("showThumbnails", checked)
                  }
                />
                <Label htmlFor="showThumbnails">Afficher les miniatures</Label>
              </div>
            </>
          )}

          {/* Images Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Images</Label>
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("images", {
                    id: Date.now().toString(),
                    url: "",
                    alt: "",
                    caption: "",
                  })
                }
              >
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {(config.images || []).map((image: any, index: number) => (
                <div
                  key={image.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Image {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("images", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <ImageUploader
                      value={image.url || ""}
                      onChange={(value) =>
                        updateNestedConfig("images", index, "url", value)
                      }
                      label={`Image ${index + 1}`}
                      placeholder="URL de l'image ou uploadez un fichier"
                      eventId={eventId || undefined}
                    />
                    <Input
                      placeholder="Texte alternatif"
                      value={image.alt || ""}
                      onChange={(e) =>
                        updateNestedConfig(
                          "images",
                          index,
                          "alt",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Légende (optionnel)"
                      value={image.caption || ""}
                      onChange={(e) =>
                        updateNestedConfig(
                          "images",
                          index,
                          "caption",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    )
  }

  const renderTextImageConfig = () => {
    if (selectedBlock?.type !== "text-image") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration texte/image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Masquer l'image */}
          <div className="flex items-center space-x-2">
            <Switch
              id="hideImage"
              checked={config.hideImage || false}
              onCheckedChange={(checked) => updateConfig("hideImage", checked)}
            />
            <Label htmlFor="hideImage">Masquer l'image (texte seul)</Label>
          </div>

          {/* Layout - seulement si image visible */}
          {!config.hideImage && (
            <>
              <div>
                <Label>Disposition</Label>
                <Select
                  value={config.layout || "text-left"}
                  onValueChange={(value) => updateConfig("layout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-left">Texte à gauche</SelectItem>
                    <SelectItem value="text-right">Texte à droite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ImageUploader
                value={config.image || ""}
                onChange={(value) => updateConfig("image", value)}
                label="Image"
                placeholder="URL de l'image ou uploadez un fichier"
                eventId={eventId || undefined}
              />

              <div>
                <Label htmlFor="imageAlt">Texte alternatif de l'image</Label>
                <Input
                  id="imageAlt"
                  value={config.imageAlt || ""}
                  onChange={(e) => updateConfig("imageAlt", e.target.value)}
                  placeholder="Description de l'image"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderTicketingConfig = () => {
    if (selectedBlock?.type !== "ticketing") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration billetterie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tickets Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Billets (max 3)</Label>
              {(config.tickets || []).length < 3 && (
                <Button
                  size="sm"
                  onClick={() =>
                    addArrayItem("tickets", {
                      id: Date.now().toString(),
                      name: "",
                      price: 0,
                      description: "",
                      image: "",
                      available: true,
                    })
                  }
                >
                  <Plus size={14} className="mr-1" />
                  Ajouter
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {(config.tickets || []).map((ticket: any, index: number) => (
                <div
                  key={ticket.id || index}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Billet {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("tickets", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Nom du billet</Label>
                      <Input
                        placeholder="Ex: Accès VIP"
                        value={ticket.name || ""}
                        onChange={(e) =>
                          updateNestedConfig(
                            "tickets",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Prix (€)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={ticket.price || 0}
                        onChange={(e) =>
                          updateNestedConfig(
                            "tickets",
                            index,
                            "price",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Description du billet"
                      value={ticket.description || ""}
                      onChange={(e) =>
                        updateNestedConfig(
                          "tickets",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={2}
                    />
                  </div>

                  <div>
                    <ImageUploader
                      value={ticket.image || ""}
                      onChange={(value) =>
                        updateNestedConfig("tickets", index, "image", value)
                      }
                      label="Image du billet"
                      placeholder="URL de l'image ou uploadez un fichier"
                      eventId={eventId || undefined}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`available-${index}`}
                      checked={ticket.available !== false}
                      onCheckedChange={(checked) =>
                        updateNestedConfig(
                          "tickets",
                          index,
                          "available",
                          checked
                        )
                      }
                    />
                    <Label htmlFor={`available-${index}`}>Disponible</Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderCustomFormConfig = () => {
    if (selectedBlock?.type !== "custom-form") return null
    const normalizedFields = getNormalizedCustomFormFields(config.fields || [])

    const fieldTypes = [
      { value: "text", label: "Texte" },
      { value: "email", label: "Email" },
      { value: "phone", label: "Téléphone" },
      { value: "number", label: "Nombre" },
      { value: "textarea", label: "Zone de texte" },
      { value: "select", label: "Liste déroulante" },
      { value: "radio", label: "Choix unique (radio)" },
      { value: "checkbox", label: "Case à cocher" },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Formulaire</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fields Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Champs du formulaire</Label>
              <Button size="sm" onClick={addFormField}>
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {normalizedFields.map((field: any, index: number) => {
                const isLocked = LOCKED_REQUIRED_FIELD_IDS.includes(field.id)
                return (
                <div
                  key={field.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Champ {index + 1}
                      {isLocked && (
                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                          (requis)
                        </span>
                      )}
                    </span>
                    {!isLocked && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFormField(field.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label>Libellé</Label>
                      <Input
                        placeholder="Nom du champ"
                        value={field.label || ""}
                        onChange={(e) =>
                          updateFormField(field.id, "label", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Type de champ</Label>
                      <Select
                        value={field.type || "text"}
                        disabled={isLocked}
                        onValueChange={(value) =>
                          updateFormField(field.id, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        placeholder="Texte d'aide"
                        value={field.placeholder || ""}
                        disabled={isLocked}
                        onChange={(e) =>
                          updateFormField(field.id, "placeholder", e.target.value)
                        }
                      />
                    </div>

                    {/* Options for select/radio fields */}
                    {(field.type === "select" || field.type === "radio") && (
                      <div>
                        <Label>Options (une par ligne)</Label>
                        <Textarea
                          placeholder={"Option 1\nOption 2\nOption 3"}
                          value={(field.options || []).join("\n")}
                          disabled={isLocked}
                          onChange={(e) => {
                            const options = e.target.value.split("\n")
                            updateFormField(field.id, "options", options)
                          }}
                          onBlur={(e) => {
                            const options = e.target.value
                              .split("\n")
                              .filter((o: string) => o.trim())
                            updateFormField(field.id, "options", options)
                          }}
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Entrez chaque option sur une nouvelle ligne
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`required-${index}`}
                        checked={field.required}
                        disabled={isLocked}
                        onCheckedChange={(checked) =>
                          updateFormField(field.id, "required", checked)
                        }
                      />
                      <Label htmlFor={`required-${index}`}>
                        Obligatoire
                      </Label>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Companions Section */}
          <Separator />
          <div>
            <Label>Label invités supplémentaires</Label>
            <Input
              placeholder="Invités supplémentaires"
              value={config.companionsLabel || ""}
              onChange={(e) => updateConfig("companionsLabel", e.target.value)}
            />
          </div>
          <div>
            <Label>Description invités supplémentaires</Label>
            <Textarea
              placeholder="Merci d'indiquer le(s) nom(s) et prénom(s) des personnes qui t'accompagnent."
              value={config.companionsDescription || ""}
              onChange={(e) => updateConfig("companionsDescription", e.target.value)}
              rows={3}
            />
          </div>

          <Separator />
          {/* Button Text */}
          <div>
            <Label>Texte du bouton</Label>
            <Input
              placeholder="Envoyer"
              value={config.buttonText || ""}
              onChange={(e) => updateConfig("buttonText", e.target.value)}
            />
          </div>

          {/* Button Colors */}
          <div>
            <Label>Couleur du bouton</Label>
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Fond</Label>
                <Input
                  type="color"
                  value={config.buttonBackgroundColor || "#3b82f6"}
                  onChange={(e) => updateConfig("buttonBackgroundColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Texte</Label>
                <Input
                  type="color"
                  value={config.buttonTextColor || "#ffffff"}
                  onChange={(e) => updateConfig("buttonTextColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderAgendaConfig = () => {
    if (selectedBlock?.type !== "agenda") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Programme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Color */}
          <div>
            <Label>Couleur de l'heure</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={config.timeColor || config.titleConfig?.textColor || "#3b82f6"}
                onChange={(e) => updateConfig("timeColor", e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.timeColor || ""}
                onChange={(e) => updateConfig("timeColor", e.target.value)}
                placeholder="Couleur primaire par défaut"
                className="flex-1"
              />
            </div>
          </div>

          {/* Events Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Événements du programme</Label>
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("events", {
                    id: Date.now().toString(),
                    time: "10:00",
                    title: "Nouveau événement",
                    description: "Description de l'événement",
                  })
                }
              >
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {(config.events || []).map((event: any, index: number) => (
                <div
                  key={event.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Événement {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("events", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label>Heure</Label>
                      <Input
                        type="time"
                        value={event.time || ""}
                        onChange={(e) =>
                          updateNestedConfig("events", index, "time", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Titre</Label>
                      <Input
                        placeholder="Titre de l'événement"
                        value={event.title || ""}
                        onChange={(e) =>
                          updateNestedConfig("events", index, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Description de l'événement"
                        value={event.description || ""}
                        onChange={(e) =>
                          updateNestedConfig(
                            "events",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderFAQConfig = () => {
    if (selectedBlock?.type !== "faq") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Questions Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Questions et réponses</Label>
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("questions", {
                    id: Date.now().toString(),
                    question: "Nouvelle question",
                    answer: "Réponse à la question",
                  })
                }
              >
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {(config.questions || []).map((faq: any, index: number) => (
                <div
                  key={faq.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Question {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("questions", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label>Question</Label>
                      <Input
                        placeholder="Votre question"
                        value={faq.question || ""}
                        onChange={(e) =>
                          updateNestedConfig("questions", index, "question", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Réponse</Label>
                      <Textarea
                        placeholder="Réponse à la question"
                        value={faq.answer || ""}
                        onChange={(e) =>
                          updateNestedConfig(
                            "questions",
                            index,
                            "answer",
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderSpeakersConfig = () => {
    if (selectedBlock?.type !== "speakers") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Intervenants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Speakers Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Intervenants</Label>
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("speakers", {
                    id: Date.now().toString(),
                    name: "Nom de l'intervenant",
                    role: "Fonction",
                    bio: "Biographie courte",
                    image: "",
                  })
                }
              >
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {(config.speakers || []).map((speaker: any, index: number) => (
                <div
                  key={speaker.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Intervenant {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("speakers", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label>Nom</Label>
                      <Input
                        placeholder="Nom complet"
                        value={speaker.name || ""}
                        onChange={(e) =>
                          updateNestedConfig("speakers", index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Fonction/Rôle</Label>
                      <Input
                        placeholder="Ex: CEO, Conférencier"
                        value={speaker.role || ""}
                        onChange={(e) =>
                          updateNestedConfig("speakers", index, "role", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Biographie</Label>
                      <Textarea
                        placeholder="Courte biographie"
                        value={speaker.bio || ""}
                        onChange={(e) =>
                          updateNestedConfig("speakers", index, "bio", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                    <div>
                      <ImageUploader
                        value={speaker.image || ""}
                        onChange={(value) =>
                          updateNestedConfig("speakers", index, "image", value)
                        }
                        label="Photo"
                        placeholder="URL de la photo ou uploadez un fichier"
                        eventId={eventId || undefined}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderContactConfig = () => {
    if (selectedBlock?.type !== "contact") return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={config.email || ""}
              onChange={(e) => updateConfig("email", e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={config.phone || ""}
              onChange={(e) => updateConfig("phone", e.target.value)}
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Réseaux sociaux</Label>
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("socialLinks", {
                    id: Date.now().toString(),
                    platform: "facebook",
                    url: "",
                  })
                }
              >
                <Plus size={14} className="mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {(config.socialLinks || []).map((social: any, index: number) => (
                <div
                  key={social.id || index}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Réseau {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem("socialLinks", index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Plateforme</Label>
                      <Select
                        value={social.platform || "facebook"}
                        onValueChange={(value) =>
                          updateNestedConfig("socialLinks", index, "platform", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        placeholder="https://..."
                        value={social.url || ""}
                        onChange={(e) =>
                          updateNestedConfig("socialLinks", index, "url", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderLocationConfig = () => {
    if (selectedBlock?.type !== "location") return null

    // Auto-build address from separate fields
    const updateAddressFromFields = (field: string, value: string) => {
      const newConfig = { ...config, [field]: value }
      const fullAddress = [newConfig.rue, newConfig.codePostal, newConfig.ville]
        .filter(Boolean)
        .join(", ")
      newConfig.address = fullAddress
      setConfig(newConfig)
      if (selectedBlock) {
        onUpdateBlock(selectedBlock.id, newConfig)
      }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configuration Lieu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rue */}
          <div>
            <Label htmlFor="rue">Rue</Label>
            <Input
              id="rue"
              value={config.rue || ""}
              onChange={(e) => updateAddressFromFields("rue", e.target.value)}
              placeholder="36, rue Baudin"
            />
          </div>

          {/* Ville + Code Postal */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="codePostal">Code postal</Label>
              <Input
                id="codePostal"
                value={config.codePostal || ""}
                onChange={(e) => updateAddressFromFields("codePostal", e.target.value)}
                placeholder="92400"
              />
            </div>
            <div>
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                value={config.ville || ""}
                onChange={(e) => updateAddressFromFields("ville", e.target.value)}
                placeholder="Paris"
              />
            </div>
          </div>

          {/* Map URL */}
          <div>
            <Label htmlFor="mapUrl">URL de la carte (iframe Google Maps)</Label>
            <Input
              id="mapUrl"
              value={config.mapUrl || ""}
              onChange={(e) => updateConfig("mapUrl", e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Pour obtenir l'URL: Google Maps → Partager → Intégrer une carte
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="locationDescription">Informations supplémentaires</Label>
            <Textarea
              id="locationDescription"
              value={(config.description || "").replace(/<br\s*\/?>/gi, "\n")}
              onChange={(e) => updateConfig("description", e.target.value.replace(/\n/g, "<br>"))}
              placeholder="Informations d'accès, parking, etc."
              rows={3}
            />
          </div>

          <Separator />

          {/* Icon Color */}
          <div>
            <Label>Couleur de l'icône adresse</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={config.iconColor || config.titleConfig?.textColor || "#3b82f6"}
                onChange={(e) => updateConfig("iconColor", e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.iconColor || ""}
                onChange={(e) => updateConfig("iconColor", e.target.value)}
                placeholder="Couleur primaire par défaut"
                className="flex-1"
              />
            </div>
          </div>

          {/* Button Customization */}
          <div>
            <Label htmlFor="buttonText">Texte du bouton</Label>
            <Input
              id="buttonText"
              value={config.buttonText || "Obtenir l'itinéraire"}
              onChange={(e) => updateConfig("buttonText", e.target.value)}
              placeholder="Obtenir l'itinéraire"
            />
          </div>

          {/* Button Colors */}
          <div>
            <Label>Couleur du bouton</Label>
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Fond</Label>
                <Input
                  type="color"
                  value={config.buttonBackgroundColor || "#3b82f6"}
                  onChange={(e) => updateConfig("buttonBackgroundColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Texte</Label>
                <Input
                  type="color"
                  value={config.buttonTextColor || "#ffffff"}
                  onChange={(e) => updateConfig("buttonTextColor", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderRSVPConfig = () => {
    // Legacy — rsvp blocks no longer created, kept for backward compat
    return null
  }

  const renderHeaderFooterConfig = () => {
    if (selectedBlock?.type !== "header" && selectedBlock?.type !== "footer")
      return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {selectedBlock?.type === "header"
              ? "Configuration En-tête"
              : "Configuration Pied de page"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedBlock?.type === "header" && (
            <>
              {/* Background Image */}
              <div>
                <ImageUploader
                  value={config.backgroundImage || ""}
                  onChange={(value) => updateConfig("backgroundImage", value)}
                  label="Image d'arrière-plan"
                  placeholder="URL de l'image d'arrière-plan"
                  eventId={eventId || undefined}
                />
              </div>

              {/* Navigation Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="showNavigation"
                  checked={config.showNavigation !== false}
                  onCheckedChange={(checked) =>
                    updateConfig("showNavigation", checked)
                  }
                />
                <Label htmlFor="showNavigation">Afficher la navigation</Label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Couleur du titre</Label>
                  <Input
                    type="color"
                    value={config.titleConfig?.textColor || "#1e293b"}
                    onChange={(e) =>
                      updateConfig("titleConfig", {
                        ...(config.titleConfig || {}),
                        textColor: e.target.value,
                      })
                    }
                    className="w-16 h-10 p-1"
                  />
                </div>
                <div>
                  <Label>Couleur du texte</Label>
                  <Input
                    type="color"
                    value={config.textConfig?.textColor || "#475569"}
                    onChange={(e) =>
                      updateConfig("textConfig", {
                        ...(config.textConfig || {}),
                        textColor: e.target.value,
                      })
                    }
                    className="w-16 h-10 p-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Taille du titre (px)</Label>
                  <Input
                    type="number"
                    min={12}
                    max={120}
                    value={config.titleConfig?.fontSize || "36"}
                    onChange={(e) =>
                      updateConfig("titleConfig", {
                        ...(config.titleConfig || {}),
                        fontSize: e.target.value,
                      })
                    }
                    placeholder="36"
                  />
                </div>
                <div>
                  <Label>Police du titre</Label>
                  <Select
                    value={config.titleConfig?.fontFamily || "modern"}
                    onValueChange={(value) =>
                      updateConfig("titleConfig", {
                        ...(config.titleConfig || {}),
                        fontFamily: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classique</SelectItem>
                      <SelectItem value="elegant">Élégante</SelectItem>
                      <SelectItem value="modern">Moderne</SelectItem>
                      <SelectItem value="playful">Ludique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {selectedBlock?.type === "footer" && (
            <>
              {/* Custom Links */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Liens personnalisés</Label>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("links", {
                        id: Date.now().toString(),
                        label: "Nouveau lien",
                        url: "#",
                      })
                    }
                  >
                    <Plus size={14} className="mr-1" />
                    Ajouter
                  </Button>
                </div>

                <div className="space-y-3">
                  {(config.links || []).map((link: any, index: number) => (
                    <div
                      key={link.id || index}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Lien {index + 1}
                        </span>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeArrayItem("links", index)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Texte</Label>
                          <Input
                            placeholder="Texte du lien"
                            value={link.label || ""}
                            onChange={(e) =>
                              updateNestedConfig("links", index, "label", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>URL</Label>
                          <Input
                            placeholder="https://..."
                            value={link.url || ""}
                            onChange={(e) =>
                              updateNestedConfig("links", index, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Text Color & Font */}
              <div>
                <Label>Couleur du texte</Label>
                <Input
                  type="color"
                  value={config.textColor || "#64748b"}
                  onChange={(e) => updateConfig("textColor", e.target.value)}
                  className="w-16 h-10 p-1"
                />
              </div>

              <div>
                <Label>Taille de police (px)</Label>
                <Input
                  type="number"
                  min={10}
                  max={48}
                  value={config.fontSize || "14"}
                  onChange={(e) => updateConfig("fontSize", e.target.value)}
                  placeholder="14"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-80 bg-sidebar border-l border-border fixed right-0 top-14 bottom-0 z-10">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Configuration
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X size={18} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-6">
          {selectedBlock ? (
            <>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sidebar-foreground">
                    {getBlockDisplayName(selectedBlock.type)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Personnalisez votre bloc
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (selectedBlock) {
                      const blockId = selectedBlock.id
                      // Trigger delete first, before closing the panel
                      window.dispatchEvent(new CustomEvent("delete-block", { detail: blockId }))
                    }
                  }}
                  className="h-8"
                  title="Supprimer ce bloc"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              {renderBasicFields()}
              {renderStyleFields()}
              {renderHeroConfig()}
              {renderHeaderFooterConfig()}
              {renderAgendaConfig()}
              {renderSpeakersConfig()}
              {renderLocationConfig()}
              {renderRSVPConfig()}
              {renderFAQConfig()}
              {renderContactConfig()}
              {renderGalleryConfig()}
              {renderTextImageConfig()}
              {renderTicketingConfig()}
              {renderCustomFormConfig()}
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Sélectionnez un bloc pour le configurer</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function getBlockDisplayName(type: string): string {
  const names = {
    header: "En-tête",
    hero: "Hero",
    agenda: "Programme",
    speakers: "Intervenants",
    location: "Lieu",
    rsvp: "Inscription",
    gallery: "Galerie",
    faq: "FAQ",
    contact: "Contact",
    footer: "Pied de page",
    "text-image": "Texte et Image",
    ticketing: "Billetterie",
    "custom-form": "Inscription / Réservation",
  }
  return names[type as keyof typeof names] || type
}
