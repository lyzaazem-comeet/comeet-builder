"use client"

import { useState, useRef, useCallback } from "react"
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ImageCropperProps {
  imageSrc: string
  aspectRatio?: number
  onCropComplete: (croppedImageUrl: string) => void
  onCancel: () => void
  open: boolean
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export function ImageCropper({
  imageSrc,
  aspectRatio = 16 / 9,
  onCropComplete,
  onCancel,
  open,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspectRatio))
    },
    [aspectRatio]
  )

  const getCroppedImage = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio || 1

    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = "high"

    const cropX = completedCrop.x * scaleX
    const cropY = completedCrop.y * scaleY
    const cropWidth = completedCrop.width * scaleX
    const cropHeight = completedCrop.height * scaleY

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    )

    const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.9)
    onCropComplete(croppedImageUrl)
  }, [completedCrop, onCropComplete])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Recadrer l'image</DialogTitle>
          <DialogDescription>
            Ajustez le cadrage de votre image (ratio {aspectRatio === 16/9 ? "16:9" : aspectRatio})
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center max-h-[60vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-w-full"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Image à recadrer"
              onLoad={onImageLoad}
              className="max-w-full max-h-[55vh] object-contain"
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={getCroppedImage}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
