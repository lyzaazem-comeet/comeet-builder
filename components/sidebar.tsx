"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { BlockType, BlockLibraryItem } from "@/types/blocks"
import { DraggableBlock } from "./draggable-block"
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  UserCheck,
  ImageIcon,
  HelpCircle,
  Mail,
  Layout,
  FileText,
  Ticket,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onAddBlock: (type: BlockType) => void
}

const blockLibrary: BlockLibraryItem[] = [
  {
    type: "hero",
    name: "Hero",
    description: "Section principale avec countdown",
    icon: "Sparkles",
    category: "structure",
  },
  { type: "agenda", name: "Programme", description: "Planning de l'événement", icon: "Calendar", category: "content" },
  { type: "speakers", name: "Intervenants", description: "Liste des speakers", icon: "Users", category: "content" },
  { type: "location", name: "Lieu", description: "Adresse et carte", icon: "MapPin", category: "content" },
  { type: "gallery", name: "Galerie", description: "Photos de l'événement", icon: "ImageIcon", category: "media" },
  { type: "faq", name: "FAQ", description: "Questions fréquentes", icon: "HelpCircle", category: "content" },
  { type: "contact", name: "Contact", description: "Informations de contact", icon: "Mail", category: "content" },
  { type: "footer", name: "Pied de page", description: "Liens et copyright", icon: "Layout", category: "structure" },
  {
    type: "text-image",
    name: "Texte & Image",
    description: "Contenu mixte personnalisable",
    icon: "FileText",
    category: "content",
  },
  { type: "ticketing", name: "Billetterie", description: "Vente de billets", icon: "Ticket", category: "interactive" },
  { type: "custom-form", name: "Inscription / Réservation", description: "Formulaire d'inscription personnalisable", icon: "UserCheck", category: "interactive" },
]

const iconMap = {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  UserCheck,
  ImageIcon,
  HelpCircle,
  Mail,
  Layout,
  FileText,
  Ticket,
}

export function Sidebar({ collapsed, onAddBlock }: SidebarProps) {
  const categories = {
    structure: "Structure",
    content: "Contenu",
    interactive: "Interactif",
    media: "Médias",
  }

  if (collapsed) {
    return (
      <div className="w-16 bg-sidebar border-r border-border fixed left-0 top-14 bottom-0 z-10">
        <div className="p-2 space-y-2">
          {blockLibrary.slice(0, 6).map((block) => {
            const Icon = iconMap[block.icon as keyof typeof iconMap]
            return (
              <DraggableBlock key={block.type} blockType={block.type} blockName={block.name}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddBlock(block.type)}
                  className="w-12 h-12 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
                  title={block.name}
                >
                  <Icon size={18} />
                </Button>
              </DraggableBlock>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-sidebar border-r border-border fixed left-0 top-14 bottom-0 z-10">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">Bibliothèque de blocs</h2>

        <ScrollArea className="h-[calc(100vh-120px)]">
          {Object.entries(categories).map(([categoryKey, categoryName]) => (
            <div key={categoryKey} className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">{categoryName}</h3>

              <div className="space-y-2">
                {blockLibrary
                  .filter((block) => block.category === categoryKey)
                  .map((block) => {
                    const Icon = iconMap[block.icon as keyof typeof iconMap]
                    return (
                      <DraggableBlock
                        key={block.type}
                        blockType={block.type}
                        blockName={block.name}
                        className="block w-full"
                      >
                        <Button
                          variant="ghost"
                          onClick={() => onAddBlock(block.type)}
                          className="w-full justify-start text-left p-3 h-auto text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                          <Icon size={20} className="mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{block.name}</div>
                            <div className="text-xs text-muted-foreground">{block.description}</div>
                          </div>
                        </Button>
                      </DraggableBlock>
                    )
                  })}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}
