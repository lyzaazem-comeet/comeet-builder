"use client"

import type React from "react"

import { useState } from "react"
import { useDragDrop } from "./drag-drop-context"
import type { BlockType } from "@/types/blocks"
import { Plus } from "lucide-react"

interface DropZoneProps {
  onDrop: (blockType: BlockType, position: number) => void
  position: number
  isVisible?: boolean
}

export function DropZone({ onDrop, position, isVisible = false }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const { draggedItem, setDropZoneActive } = useDragDrop()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragOver(true)
    setDropZoneActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    setIsDragOver(false)
    setDropZoneActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const blockType = e.dataTransfer.getData("text/plain") as BlockType

    if (blockType) {
      onDrop(blockType, position)
    }

    setIsDragOver(false)
    setDropZoneActive(false)
  }

  // Show drop zone when dragging or when explicitly visible
  const shouldShow = draggedItem || isVisible

  if (!shouldShow) {
    return <div className="h-2" />
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        h-16 border-2 border-dashed rounded-lg transition-all duration-200 flex items-center justify-center
        ${isDragOver ? "border-primary bg-primary/10 scale-105" : "border-muted-foreground/30 hover:border-primary/50"}
        ${draggedItem ? "opacity-100" : "opacity-50 hover:opacity-100"}
      `}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Plus size={16} />
        <span className="text-sm">
          {isDragOver ? `Ajouter ${draggedItem?.name || "le bloc"} ici` : "Zone de dépôt"}
        </span>
      </div>
    </div>
  )
}
