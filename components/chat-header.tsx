export function ChatHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-base sm:text-lg">🤖</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">CSEC ASTU Bot</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">AI-Powered Educational Assistant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
