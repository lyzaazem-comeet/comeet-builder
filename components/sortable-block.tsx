"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { Block } from "@/types/blocks"
import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SortableBlockProps {
  block: Block
  index: number
  children: React.ReactNode
  onReorder: (dragIndex: number, hoverIndex: number) => void
  onDelete: (id: string) => void
  isSelected: boolean
  onSelect: () => void
}

export function SortableBlock({
  block,
  index,
  children,
  onReorder,
  onDelete,
  isSelected,
  onSelect,
}: SortableBlockProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("application/json", JSON.stringify({ blockId: block.id, index }))
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    try {
      const dragData = JSON.parse(e.dataTransfer.getData("application/json"))
      if (dragData.blockId && dragData.index !== index) {
        onReorder(dragData.index, index)
      }
    } catch (error) {
      // Handle invalid JSON or missing data
      console.warn("Invalid drag data")
    }
  }

  return (
    <div
      ref={dragRef}
      id={block.id}
      className={`
        relative group transition-all duration-200
        ${isDragging ? "opacity-50 scale-95" : ""}
        ${dragOver ? "scale-105" : ""}
        ${isSelected ? "ring-2 ring-primary" : ""}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Block Controls Overlay */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1 bg-background/90 backdrop-blur-sm rounded-md p-1 border border-border">
          <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
            title="Déplacer le bloc"
          >
            <GripVertical size={16} className="text-muted-foreground" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(block.id)
            }}
            className="p-1 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Supprimer le bloc"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Block Content */}
      <div onClick={onSelect} className="cursor-pointer">
        {children}
      </div>
    </div>
  )
}
