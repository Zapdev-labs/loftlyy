export function AdBanner() {
  return (
    <a
      href="https://x.com/preetsuthar17"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden shrink-0 items-center justify-center self-stretch rounded-2xl bg-surface-muted px-10 text-sm text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground lg:flex"
    >
      <span className="flex flex-col items-center gap-1">
        <span>Show your brand ad here</span>
        <span className="text-xs text-muted-foreground/70">Send a DM</span>
      </span>
    </a>
  )
}
