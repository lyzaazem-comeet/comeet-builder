"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Preview } from "@/components/preview"
import { ConfigPanel } from "@/components/config-panel"
import { Toolbar } from "@/components/toolbar"
import { DragDropProvider } from "@/components/drag-drop-context"
import { TemplateSelector } from "@/components/template-selector"
import { PublishDialog } from "@/components/publish-dialog"
import type { Block, BlockType, Theme } from "@/types/blocks"
import type { Template } from "@/lib/templates"
import { getNormalizedCustomFormFields } from "@/lib/custom-form"
import { toast } from "sonner"

const DEFAULT_THEME: Theme = {
  primaryColor: "#3b82f6",
  secondaryColor: "#64748b",
  backgroundColor: "#ffffff",
  textColor: "#1e293b",
  fontFamily: "modern",
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b",
  },
  typography: {
    fontFamily: "modern",
  },
}

export default function EventBuilder() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(true)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [configPanelOpen, setConfigPanelOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME)

  // Comeet integration state
  const [eventId, setEventId] = useState<string | null>(null)
  const [eventDetails, setEventDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  const getStorageKey = useCallback(
    (id?: string | null) => `event-builder-data${id ? `-${id}` : ""}`,
    []
  )

  // Load on mount: check for event ID in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    if (!id) {
      // No event ID — fallback to old localStorage behavior
      const savedData = localStorage.getItem(getStorageKey())
      if (savedData) {
        try {
          const { blocks: savedBlocks, theme: savedTheme } = JSON.parse(savedData)
          setBlocks(savedBlocks)
          setTheme(savedTheme)
          setShowTemplateSelector(false)
        } catch (error) {
          console.error("Error loading saved data:", error)
        }
      }
      setLoading(false)
      return
    }

    setEventId(id)

    // Fetch event details and check DB
    fetch(`/api/event/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then(({ eventDetails: details, existingWebsite }) => {
        if (details) setEventDetails(details)

        if (existingWebsite) {
          // Load from DB
          const dbBlocks = existingWebsite.blocks.map((b: any) => ({
            id: b.id,
            type: b.type,
            position: b.position,
            config: b.config,
          }))
          setBlocks(dbBlocks)
          setTheme(existingWebsite.theme as Theme)
          setShowTemplateSelector(false)

          if (existingWebsite.published && existingWebsite.slug) {
            setPublishedUrl(`${window.location.origin}/site/${existingWebsite.slug}`)
          }
        } else {
          // Check localStorage
          const storageKey = getStorageKey(id)
          const savedData = localStorage.getItem(storageKey)
          if (savedData) {
            try {
              const { blocks: savedBlocks, theme: savedTheme } = JSON.parse(savedData)
              setBlocks(savedBlocks)
              setTheme(savedTheme)
              setShowTemplateSelector(false)
            } catch (error) {
              console.error("Error loading saved data:", error)
            }
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load event:", error)
        // Fallback to localStorage
        const storageKey = getStorageKey(id)
        const savedData = localStorage.getItem(storageKey)
        if (savedData) {
          try {
            const { blocks: savedBlocks, theme: savedTheme } = JSON.parse(savedData)
            setBlocks(savedBlocks)
            setTheme(savedTheme)
            setShowTemplateSelector(false)
          } catch (e) {
            console.error("Error loading saved data:", e)
          }
        }
      })
      .finally(() => setLoading(false))
  }, [getStorageKey])

  // Listen for delete-block events from config panel
  useEffect(() => {
    const handler = (e: Event) => {
      const blockId = (e as CustomEvent).detail
      if (blockId) deleteBlock(blockId)
    }
    window.addEventListener("delete-block", handler)
    return () => window.removeEventListener("delete-block", handler)
  })

  // Save to localStorage whenever blocks or theme change
  useEffect(() => {
    if (blocks.length > 0 || !showTemplateSelector) {
      const storageKey = getStorageKey(eventId)
      localStorage.setItem(storageKey, JSON.stringify({ blocks, theme }))
    }
  }, [blocks, theme, showTemplateSelector, eventId, getStorageKey])

  const handleSelectTemplate = (template: Template) => {
    let updatedBlocks = [...template.blocks]

    // Pre-populate blocks with event data if available
    if (eventDetails) {
      updatedBlocks = updatedBlocks.map((block) => {
        if (block.type === "hero") {
          return {
            ...block,
            config: {
              ...block.config,
              title: eventDetails.name || block.config.title,
              eventDate: eventDetails.start_event_date
                ? new Date(`${eventDetails.start_event_date}T${eventDetails.start_event_time || "00:00"}`).toISOString()
                : block.config.eventDate,
            },
          }
        }
        if (block.type === "location") {
          const address = [
            eventDetails.address_line_one,
            eventDetails.address_line_two,
            eventDetails.postal_code,
            eventDetails.city,
          ]
            .filter(Boolean)
            .join(", ")
          return {
            ...block,
            config: {
              ...block.config,
              address: address || block.config.address,
              rue: eventDetails.address_line_one || block.config.rue || "",
              ville: eventDetails.city || block.config.ville || "",
              codePostal: eventDetails.postal_code || block.config.codePostal || "",
            },
          }
        }
        return block
      })
    }

    setBlocks(updatedBlocks)
    setTheme(template.theme)
    setShowTemplateSelector(false)
  }

  const addBlock = (type: BlockType, position?: number) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type,
      position: position !== undefined ? position : blocks.length,
      config: getDefaultConfig(type),
    }

    if (position !== undefined) {
      const newBlocks = [...blocks]
      newBlocks.splice(position, 0, newBlock)
      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }))
      setBlocks(updatedBlocks)
    } else {
      setBlocks([...blocks, newBlock])
    }

    setSelectedBlock(newBlock)
    setConfigPanelOpen(true)
  }

  const updateBlock = (id: string, config: any) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, config } : block)))
    if (selectedBlock?.id === id) {
      setSelectedBlock({ ...selectedBlock, config })
    }
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
    if (selectedBlock?.id === id) {
      setSelectedBlock(null)
      setConfigPanelOpen(false)
    }
  }

  const reorderBlocks = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex]
    const newBlocks = [...blocks]
    newBlocks.splice(dragIndex, 1)
    newBlocks.splice(hoverIndex, 0, draggedBlock)

    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      position: index,
    }))

    setBlocks(updatedBlocks)
  }

  const selectBlock = (block: Block) => {
    setSelectedBlock(block)
    setConfigPanelOpen(true)
  }

  const handleNewProject = () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir créer un nouveau projet ? Toutes les modifications non exportées seront perdues."
      )
    ) {
      localStorage.removeItem(getStorageKey(eventId))
      setBlocks([])
      setTheme(DEFAULT_THEME)
      setShowTemplateSelector(true)
      setSelectedBlock(null)
      setConfigPanelOpen(false)
    }
  }

  // Save draft to database
  const handleSave = async () => {
    if (!eventId) {
      toast.error("Aucun événement associé")
      return
    }
    setIsSaving(true)
    try {
      await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          name: eventDetails?.name || "Untitled Event",
          theme,
          blocks,
          published: false,
        }),
      })
      toast.success("Sauvegardé avec succès")
    } catch (error) {
      console.error("Save failed:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsSaving(false)
    }
  }

  // Publish website
  const handlePublish = async () => {
    if (!eventId) {
      toast.error("Aucun événement associé")
      return
    }
    setIsPublishing(true)
    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          blocks,
          theme,
          eventName: eventDetails?.name,
        }),
      })

      if (!response.ok) throw new Error("Publish failed")

      const { publishedUrl: url } = await response.json()
      setPublishedUrl(url)
      setShowPublishDialog(true)
      toast.success("Site publié avec succès !")
    } catch (error) {
      console.error("Publish failed:", error)
      toast.error("Erreur lors de la publication")
    } finally {
      setIsPublishing(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#ab0036", borderTopColor: "transparent" }} />
          <p className="text-lg text-muted-foreground">Chargement de l&apos;événement...</p>
        </div>
      </div>
    )
  }

  // Show template selector on first load
  if (showTemplateSelector) {
    return <TemplateSelector onSelectTemplate={handleSelectTemplate} />
  }

  return (
    <DragDropProvider>
      <div className="h-screen bg-background flex flex-col">
        {/* Toolbar */}
        <Toolbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          theme={theme}
          onThemeChange={setTheme}
          blocks={blocks}
          onNewProject={handleNewProject}
          eventId={eventId}
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={isSaving}
          isPublishing={isPublishing}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Block Library */}
          <Sidebar collapsed={sidebarCollapsed} onAddBlock={addBlock} />

          {/* Main Preview Area */}
          <div
            className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? "ml-0" : "ml-80"
            } ${configPanelOpen ? "mr-80" : "mr-0"}`}
          >
            <Preview
              blocks={blocks}
              selectedBlock={selectedBlock}
              onSelectBlock={selectBlock}
              onDeleteBlock={deleteBlock}
              onReorderBlocks={reorderBlocks}
              onAddBlock={addBlock}
              theme={theme}
            />
          </div>

          {/* Right Sidebar - Configuration Panel */}
          <ConfigPanel
            open={configPanelOpen}
            selectedBlock={selectedBlock}
            onUpdateBlock={updateBlock}
            onClose={() => {
              setConfigPanelOpen(false)
              setSelectedBlock(null)
            }}
            eventId={eventId}
          />
        </div>
      </div>

      {/* Publish Success Dialog */}
      <PublishDialog
        open={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        publishedUrl={publishedUrl || ""}
      />
    </DragDropProvider>
  )
}

function getDefaultConfig(type: BlockType) {
  const configs = {
    header: {
      title: "Mon Événement",
      subtitle: "Une expérience inoubliable",
      backgroundImage: "",
      showNavigation: true,
    },
    hero: {
      title: "Votre Événement",
      subtitle: "Une célébration inoubliable",
      eventDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      backgroundImage: "",
      showCountdown: true,
      ctaText: "Confirmez votre présence",
      ctaAction: "rsvp",
      backgroundColor: "#1e293b",
      textColor: "#ffffff",
      fontSize: "48",
      fontFamily: "elegant",
    },
    agenda: {
      title: "Programme",
      events: [
        { time: "09:00", title: "Accueil", description: "Café et networking" },
        { time: "10:00", title: "Conférence principale", description: "Présentation du thème" },
      ],
    },
    speakers: {
      title: "Intervenants",
      speakers: [{ name: "Jean Dupont", role: "Expert", bio: "Spécialiste reconnu", image: "" }],
    },
    location: {
      title: "Lieu",
      rue: "123 Rue de la Paix",
      ville: "Paris",
      codePostal: "75001",
      address: "123 Rue de la Paix, 75001, Paris",
      mapUrl: "",
      description: "Un lieu d'exception au cœur de Paris",
    },
    gallery: {
      title: "Galerie",
      images: [],
      layout: "grid",
      autoplay: false,
      showThumbnails: false,
    },
    faq: {
      title: "Questions fréquentes",
      questions: [{ question: "Où se déroule l'événement ?", answer: "L'événement a lieu à Paris." }],
    },
    contact: {
      title: "Contact",
      email: "contact@event.com",
      phone: "+33 1 23 45 67 89",
      socialLinks: [],
    },
    footer: {
      text: "© 2025 Mon Événement. Tous droits réservés.",
      links: [],
    },
    "text-image": {
      title: "Titre de la section",
      text: "Votre contenu texte ici. Vous pouvez décrire votre événement, présenter votre organisation ou partager des informations importantes.",
      image: "",
      imageAlt: "Description de l'image",
      layout: "text-left",
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
      fontSize: "md",
      padding: "md",
    },
    ticketing: {
      title: "Billetterie",
      description: "Choisissez votre billet et rejoignez-nous pour cet événement exceptionnel",
      tickets: [
        {
          id: "1",
          name: "Accès Standard",
          price: 50,
          description: "Accès à toutes les conférences et au networking",
          image: "",
          available: true,
        },
      ],
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
    },
    "custom-form": {
      title: "Inscription",
      description: "Réservez votre place dès maintenant",
      fields: getNormalizedCustomFormFields(),
      buttonText: "Envoyer",
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
    },
  }

  return configs[type as keyof typeof configs] || {}
}
