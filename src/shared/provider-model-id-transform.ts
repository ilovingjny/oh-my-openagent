export function transformModelForProvider(provider: string, model: string): string {
  if (provider === "github-copilot") {
    return model
      .replace("claude-opus-4-6", "claude-opus-4.6")
      .replace("claude-sonnet-4-6", "claude-sonnet-4.6")
      .replace("claude-sonnet-4-5", "claude-sonnet-4.5")
      .replace("claude-haiku-4-5", "claude-haiku-4.5")
      .replace("claude-sonnet-4", "claude-sonnet-4")
      .replace(/gemini-3\.1-pro(?!-)/g, "gemini-3.1-pro-preview")
      .replace(/gemini-3-flash(?!-)/g, "gemini-3-flash-preview")
  }

  if (provider === "google") {
    return model
      .replace(/gemini-3\.1-pro(?!-)/g, "gemini-3.1-pro-preview")
      .replace(/gemini-3-flash(?!-)/g, "gemini-3-flash-preview")
  }

  if (provider === "minimax" || provider === "bailian-coding-plan" || provider === "opencode-go") {
    return model.replace(/^minimax-m2\.5$/i, "MiniMax-M2.5")
  }

  if (provider === "opencode") {
    if (model === "minimax-m2.5") {
      return "minimax-m2.5-free"
    }
    if (model === "glm-5") {
      return "big-pickle"
    }
  }

  return model
}
