import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300 hover:border-primary/50">
                <Image src="/logo.png" alt="Skryo" width={32} height={32} className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold text-primary/90 hidden sm:inline">Skryo</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              How It Works
            </a>
            <a
              href="https://github.com/nandandkl/skryo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
