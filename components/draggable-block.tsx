"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useDragDrop } from "./drag-drop-context"
import type { BlockType } from "@/types/blocks"

interface DraggableBlockProps {
  children: ReactNode
  blockType: BlockType
  blockName: string
  className?: string
}

export function DraggableBlock({ children, blockType, blockName, className = "" }: DraggableBlockProps) {
  const { setDraggedItem } = useDragDrop()

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedItem({ type: blockType, name: blockName })
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData("text/plain", blockType)

    // Add visual feedback
    const target = e.target as HTMLElement
    target.classList.add("dragging")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItem(null)
    const target = e.target as HTMLElement
    target.classList.remove("dragging")
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing transition-all ${className}`}
    >
      {children}
    </div>
  )
}
