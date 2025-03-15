import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center justify-center gap-4 md:justify-start">
          <Link
            to="/"
            className="flex items-center gap-1 text-lg font-semibold"
          >
            <span className="text-primary">KidsPlay</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} KidsPlay. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <nav className="flex gap-4 text-sm">
            <Link
              to="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Help Center
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <span className="text-lg">🇺🇸</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
