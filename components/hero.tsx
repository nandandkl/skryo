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
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onUpload(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
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
          className={`relative rounded-2xl border-2 transition-all duration-300 p-12 md:p-16 text-center cursor-pointer group ${
            dragActive
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
              onClick={() => fileInputRef.current?.click()}
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
      </div>
    </section>
  )
}
