export function WelcomeScreen() {
  const suggestedQuestions = [
    "What is CSEC ASTU?",
    "How can I get started with cybersecurity?",
    "What are the latest security trends?",
    "Tell me about ethical hacking",
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <div className="max-w-5xl w-full text-center space-y-6 sm:space-y-8">
        {/* Logo and Title */}
        <div className="space-y-3 sm:space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center mx-auto">
            <span className="text-3xl sm:text-4xl">🤖</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Welcome to CSEC ASTU Bot</h1>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Your AI-powered educational assistant powered by advanced RAG technology
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: "🎓", title: "Learn", desc: "Get instant answers to your questions" },
            { icon: "🔍", title: "Discover", desc: "Explore new concepts and ideas" },
            { icon: "⚡", title: "Grow", desc: "Enhance your knowledge continuously" },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors"
            >
              <div className="text-2xl sm:text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Try asking:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {suggestedQuestions.map((question, i) => (
              <button
                key={i}
                className="p-2 sm:p-3 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all text-left text-xs sm:text-sm text-foreground hover:text-accent font-medium"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 sm:pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground px-2">
            Powered by RAG (Retrieval-Augmented Generation) • Always learning • Privacy-focused
          </p>
        </div>
      </div>
    </div>
  )
}
