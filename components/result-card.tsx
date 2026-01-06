"use client"
import { Button } from "@/components/ui/button"
import { RotateCcw, CheckCircle2 } from "lucide-react"

interface ResultCardProps {
  imageUrl: string
  score: number
  explanation?: string
  onReset: () => void
}

export default function ResultCard({ imageUrl, score, explanation, onReset }: ResultCardProps) {
  const getNeatnessCategory = (score: number) => {
    if (score === 0) return "No Handwriting Detected"
    if (score <= 3) return "Messy"
    if (score <= 6) return "Average"
    return "Neat"
  }

  const getCategoryColor = (score: number) => {
    if (score === 0) return "text-muted-foreground"
    if (score <= 3) return "text-red-400"
    if (score <= 6) return "text-yellow-400"
    return "text-emerald-400"
  }

  const category = getNeatnessCategory(score)
  const categoryColor = getCategoryColor(score)
  const circumference = 2 * Math.PI * 45

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image preview */}
            <div className="flex flex-col items-center gap-4 order-2 md:order-1">
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-primary/30 bg-card/80">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Uploaded handwriting"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">Your handwriting sample</p>
            </div>

            {/* Score section */}
            <div className="flex flex-col justify-center gap-8 order-1 md:order-2">
              {/* Score display with circular progress */}
              <div className="bg-card/80 rounded-2xl p-8 shadow-lg border-2 border-primary/20 animate-score-reveal">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-8">
                  Neatness Score
                </p>

                <div className="flex justify-center mb-8">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2A2A" strokeWidth="3" />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * score) / 10}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center score text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-foreground">{score}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">out of 10</span>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${categoryColor.replace("text-", "bg-")}`} />
                  <p className={`text-lg font-semibold ${categoryColor}`}>{category}</p>
                </div>

                {/* AI insights */}
                <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4 mt-6">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">AI Insights</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {explanation ||
                          "This score is estimated using a CNN model trained on handwriting samples. The score evaluates stroke consistency, letter spacing, alignment, and overall neatness patterns."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <Button
                onClick={onReset}
                className="w-full py-6 text-base font-semibold rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border-2 border-primary/30 hover:border-primary/50 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Analyze Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
