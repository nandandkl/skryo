"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Upload, Cloud, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export default function Hero({ onUpload, isLoading }: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [showUploadOptions, setShowUploadOptions] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height
        const maxDim = 1500

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error("Canvas to Blob failed"))
            }
          },
          "image/jpeg",
          0.8,
        )
      }
      img.onerror = (error) => reject(error)
    })
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      try {
        const compressed = await compressImage(files[0])
        onUpload(compressed)
      } catch (error) {
        console.error("Compression failed:", error)
        onUpload(files[0]) // Fallback to original
      }
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const compressed = await compressImage(e.target.files[0])
        onUpload(compressed)
      } catch (error) {
        console.error("Compression failed:", error)
        onUpload(e.target.files[0]) // Fallback
      }
      setShowUploadOptions(false)
    }
  }

  const handleUploadClick = () => {
    // Check if we are on a mobile device to show options
    // Assuming simple check for now, can be improved or just always show for robust UX
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      setShowUploadOptions(true)
    } else {
      fileInputRef.current?.click()
    }
  }

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header text */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Your Handwriting,
            <br />
            <span className="gradient-text">Scored by AI.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload a handwritten image and get an instant score from 1 to 10.
          </p>
        </div>

        {/* Upload area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 transition-all duration-300 p-12 md:p-16 text-center cursor-pointer group ${dragActive
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-border bg-card/50 hover:border-primary/50 hover:bg-card/70 hover:shadow-lg shadow-md"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />

          <div className="flex flex-col items-center gap-6">
            {isLoading ? (
              <>
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" />
                  <div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin"
                    style={{ animationDirection: "reverse" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                  </div>
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg">Analyzing handwriting...</p>
                  <p className="text-muted-foreground text-sm mt-1">Processing your image</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <Cloud className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-foreground font-bold text-xl mb-2">Drag and drop your handwriting</p>
                  <p className="text-muted-foreground text-base">or click below to select from your device</p>
                </div>
              </>
            )}
          </div>

          {!isLoading && (
            <Button
              onClick={handleUploadClick}
              className="mt-10 bg-primary/15 hover:bg-primary/50 text-primary-foreground px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 border border-primary/50"
              disabled={isLoading}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Handwriting
            </Button>
          )}
        </div>

        {/* Info text */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Supports JPG, PNG, and GIF. Fast, private, and secure.
        </p>

        {/* Upload Options Modal */}
        {showUploadOptions && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6" onClick={() => setShowUploadOptions(false)}>
            <div
              className="w-full max-w-sm bg-background border border-border rounded-xl shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-10 fade-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground text-center mb-6">Choose an option</h3>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    cameraInputRef.current?.click()
                    setShowUploadOptions(false)
                  }}
                  className="w-full h-14 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span className="mr-2">📸</span> Take Photo
                </Button>
                <Button
                  onClick={() => {
                    fileInputRef.current?.click()
                    setShowUploadOptions(false)
                  }}
                  className="w-full h-14 text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  <span className="mr-2">🖼️</span> Choose from Gallery
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowUploadOptions(false)}
                  className="w-full mt-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
