"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PanelLeftOpen,
  PanelLeftClose,
  Eye,
  Palette,
  RotateCcw,
  Save,
  Globe,
  Loader2,
} from "lucide-react"
import { PreviewMode } from "./preview-mode"
import { ThemePanel } from "./theme-panel"
import type { Theme, Block } from "@/types/blocks"

interface ToolbarProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
  theme: Theme
  onThemeChange: (theme: Theme) => void
  blocks?: Block[]
  onNewProject?: () => void
  eventId?: string | null
  onSave?: () => Promise<void>
  onPublish?: () => Promise<void>
  isSaving?: boolean
  isPublishing?: boolean
}

export function Toolbar({
  onToggleSidebar,
  sidebarCollapsed,
  theme,
  onThemeChange,
  blocks = [],
  onNewProject,
  eventId,
  onSave,
  onPublish,
  isSaving,
  isPublishing,
}: ToolbarProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [themePanelOpen, setThemePanelOpen] = useState(false)

  return (
    <>
      <div className="h-14 bg-sidebar border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {eventId && (
            <a
              href={
                process.env.NEXT_PUBLIC_COMEET_PLATFORM_URL ||
                "https://app.comeet.fr"
              }
              className="flex items-center gap-1   hover:opacity-80 transition-opacity"
              title="Retour à la plateforme"
            >
              <div
                aria-label="Comeet"
                className="h-5 w-20"
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
            </a>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              Event Builder
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNewProject && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onNewProject}
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <RotateCcw size={18} className="mr-2" />
                Nouveau projet
              </Button>
              <div className="h-6 w-px bg-border mx-2" />
            </>
          )}

          {eventId && onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isSaving ? (
                <Loader2 size={18} className="mr-2 animate-spin" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Sauvegarder
            </Button>
          )}

          {eventId && onPublish && (
            <Button
              size="sm"
              onClick={onPublish}
              disabled={isPublishing}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isPublishing ? (
                <Loader2 size={18} className="mr-2 animate-spin" />
              ) : (
                <Globe size={18} className="mr-2" />
              )}
              Publier
            </Button>
          )}

          {eventId && (onSave || onPublish) && (
            <div className="h-6 w-px bg-border mx-2" />
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setThemePanelOpen(true)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Palette size={18} className="mr-2" />
            Thème
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreviewMode(true)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Eye size={18} className="mr-2" />
            Aperçu
          </Button>
        </div>
      </div>

      {/* Preview Mode Overlay */}
      {previewMode && (
        <PreviewMode
          blocks={blocks}
          theme={theme}
          onClose={() => setPreviewMode(false)}
        />
      )}

      {/* Theme Panel */}
      <ThemePanel
        open={themePanelOpen}
        theme={theme}
        onThemeChange={onThemeChange}
        onClose={() => setThemePanelOpen(false)}
      />
    </>
  )
}
