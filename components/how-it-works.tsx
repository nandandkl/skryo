"use client"

import { Upload, Zap, Brain, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Handwriting",
    description: "Share an image of your handwriting using drag-and-drop or file selection",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Google's advanced Gemini Vision model analyzes strokes, spacing, and patterns",
  },
  {
    icon: Zap,
    title: "Instant Scoring",
    description: "The multimodal AI compares your handwriting against thousands of samples to generate a score",
  },
  {
    icon: CheckCircle2,
    title: "Detailed Insights",
    description: "Receive a neatness score (1-10) along with a specific explanation for the rating",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to analyze your handwriting quality with AI precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step card */}
                <div className="relative h-full bg-card/40 rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-card/60 group-hover:shadow-lg overflow-hidden">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                  </div>

                  {/* Step number */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
