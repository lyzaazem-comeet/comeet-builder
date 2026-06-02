"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CheckCircle, Copy, ExternalLink } from "lucide-react"

interface PublishDialogProps {
  open: boolean
  onClose: () => void
  publishedUrl: string
}

export function PublishDialog({ open, onClose, publishedUrl }: PublishDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publishedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const input = document.createElement("input")
      input.value = publishedUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            Site publié avec succès !
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Votre site est maintenant accessible à l'adresse suivante :
          </p>

          <div className="flex gap-2">
            <Input value={publishedUrl} readOnly className="flex-1 text-sm" />
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button
              onClick={() => window.open(publishedUrl, "_blank")}
              className="gap-2"
            >
              <ExternalLink size={16} />
              Voir le site
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
