"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DragDropContextType {
  draggedItem: any
  setDraggedItem: (item: any) => void
  dropZoneActive: boolean
  setDropZoneActive: (active: boolean) => void
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined)

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [dropZoneActive, setDropZoneActive] = useState(false)

  return (
    <DragDropContext.Provider
      value={{
        draggedItem,
        setDraggedItem,
        dropZoneActive,
        setDropZoneActive,
      }}
    >
      {children}
    </DragDropContext.Provider>
  )
}

export function useDragDrop() {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error("useDragDrop must be used within DragDropProvider")
  }
  return context
}
