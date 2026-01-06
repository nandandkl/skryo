"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ResultCard from "@/components/result-card"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [neatnessScore, setNeatnessScore] = useState<number | null>(null)
  const [explanation, setExplanation] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsLoading(true)

    // Read the image file
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // AI scoring
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze-handwriting", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.score !== undefined && data.score !== null) {
        setNeatnessScore(data.score)
        setExplanation(data.explanation || "")
      } else {
        setNeatnessScore(0)
        setExplanation("No handwriting Detected")
      }
    } catch (error) {
      console.error("Error analyzing image:", error)
      setNeatnessScore(0)
      setExplanation("No handwriting Detected or AI Service Unavailable")
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setUploadedImage(null)
    setNeatnessScore(null)
    setExplanation("")
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {uploadedImage && neatnessScore !== null ? (
          <ResultCard imageUrl={uploadedImage} score={neatnessScore} explanation={explanation} onReset={resetState} />
        ) : (
          <Hero onUpload={handleImageUpload} isLoading={isLoading} />
        )}
        <HowItWorks />
        <Footer />
      </main>
    </>
  )
}
