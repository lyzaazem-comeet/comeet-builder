"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Crop, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageCropper } from "./image-cropper"

interface ImageUploaderProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  enableCrop?: boolean
  cropAspectRatio?: number
  eventId?: string
}

export function ImageUploader({
  value,
  onChange,
  label = "Image",
  placeholder = "URL de l'image ou uploadez un fichier",
  enableCrop = false,
  cropAspectRatio = 16 / 9,
  eventId,
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const uploadToStorage = async (file: File | Blob, filename?: string): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file, filename || `image-${Date.now()}.jpg`)
    if (eventId) formData.append("eventId", eventId)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const { url } = await response.json()
    return url
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return

    if (enableCrop) {
      // For crop: read as data URL first so the cropper can work with it
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImageToCrop(result)
        setCropperOpen(true)
      }
      reader.readAsDataURL(file)
    } else {
      // Direct upload to Supabase Storage
      setUploading(true)
      try {
        const url = await uploadToStorage(file, file.name)
        onChange(url)
      } catch (error) {
        console.error("Upload failed:", error)
        // Fallback to base64 if upload fails
        const reader = new FileReader()
        reader.onload = (e) => onChange(e.target?.result as string)
        reader.readAsDataURL(file)
      } finally {
        setUploading(false)
      }
    }
  }

  const handleCropComplete = async (croppedImageUrl: string) => {
    setCropperOpen(false)
    setImageToCrop("")

    // If the cropped result is a data URL, upload it
    if (croppedImageUrl.startsWith("data:")) {
      setUploading(true)
      try {
        const res = await fetch(croppedImageUrl)
        const blob = await res.blob()
        const url = await uploadToStorage(blob)
        onChange(url)
      } catch (error) {
        console.error("Upload of cropped image failed:", error)
        onChange(croppedImageUrl) // Fallback to base64
      } finally {
        setUploading(false)
      }
    } else {
      onChange(croppedImageUrl)
    }
  }

  const handleCropCancel = () => {
    setCropperOpen(false)
    setImageToCrop("")
  }

  const openCropperForExisting = () => {
    if (value) {
      setImageToCrop(value)
      setCropperOpen(true)
    }
  }

  const clearImage = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          type="url"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          disabled={uploading}
        />
        {value && (
          <Button type="button" variant="outline" size="sm" onClick={clearImage} disabled={uploading}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        } ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

        {uploading ? (
          <div className="space-y-2 py-2">
            <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Upload en cours...</p>
          </div>
        ) : value ? (
          <div className="space-y-2">
            <div className="relative inline-block">
              <img
                src={value || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full max-h-32 rounded object-cover"
              />
            </div>
            <div className="flex justify-center gap-2">
              {enableCrop && (
                <Button type="button" variant="outline" size="sm" onClick={openCropperForExisting}>
                  <Crop className="h-4 w-4 mr-2" />
                  Recadrer
                </Button>
              )}
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Changer
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
            <div>
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Choisir un fichier
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Glissez-déposez une image ou cliquez pour sélectionner</p>
          </div>
        )}
      </div>

      {/* Image Cropper Dialog */}
      {enableCrop && imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          aspectRatio={cropAspectRatio}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          open={cropperOpen}
        />
      )}
    </div>
  )
}
