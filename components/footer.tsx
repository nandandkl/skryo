import { Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Skryo</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered handwriting analysis for better penmanship awareness
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Resources</p>
            <a
              href="https://github.com/nandandkl/skryo#readme"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="https://ai.google.dev/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Reference
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Follow</p>
            <a
              href="https://github.com/nandandkl/skryo"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {currentYear} Skryo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
