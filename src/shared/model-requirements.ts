export type FallbackEntry = {
  providers: string[]
  model: string
  variant?: string // Entry-specific variant (e.g., GPT→high, Opus→max)
}

export type ModelRequirement = {
  fallbackChain: FallbackEntry[]
  variant?: string // Default variant (used when entry doesn't specify one)
  requiresModel?: string // If set, only activates when this model is available (fuzzy match)
  requiresAnyModel?: boolean // If true, requires at least ONE model in fallbackChain to be available (or empty availability treated as unavailable)
  requiresProvider?: string[] // If set, only activates when any of these providers is connected
}

export const AGENT_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  sisyphus: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
    requiresAnyModel: true,
  },
  hephaestus: {
    fallbackChain: [
      { providers: ["openai"], model: "gpt-5.3-codex", variant: "medium" },
      { providers: ["bailian-coding-plan"], model: "qwen3.5-plus" },
      // opencode-go subscribers get glm-5 (intentional: GLM is a better fit for opencode-go than MiniMax in this slot)
      { providers: ["opencode-go"], model: "glm-5" },
      { providers: ["bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
    ],
    requiresProvider: ["openai", "opencode-go", "bailian-coding-plan", "opencode"],
  },
  oracle: {
    fallbackChain: [
      { providers: ["openai", "github-copilot"], model: "gpt-5.2", variant: "high" },
      { providers: ["bailian-coding-plan"], model: "qwen3.5-plus" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  librarian: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode"], model: "gpt-5-nano" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-sonnet-4-6" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  explore: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["github-copilot"], model: "grok-code-fast-1" },
      { providers: ["opencode"], model: "gpt-5-nano" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-haiku-4-5" },
    ],
  },
  "multimodal-looker": {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["zai-coding-plan"], model: "glm-4.6v" },
      { providers: ["opencode"], model: "gpt-5-nano" },
    ],
  },
  prometheus: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro" },
    ],
  },
  metis: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
    ],
  },
  momus: {
    fallbackChain: [
      { providers: ["openai", "github-copilot"], model: "gpt-5.2", variant: "medium" },
      { providers: ["bailian-coding-plan"], model: "qwen3.5-plus" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  scribe: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-sonnet-4-6" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  atlas: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-sonnet-4-6" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro" },
    ],
  },
}

export const CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  "visual-engineering": {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  ultrabrain: {
    fallbackChain: [
      { providers: ["openai"], model: "gpt-5.3-codex", variant: "xhigh" },
      { providers: ["bailian-coding-plan"], model: "qwen3.5-plus" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  deep: {
    fallbackChain: [
      { providers: ["openai"], model: "gpt-5.3-codex", variant: "medium" },
      { providers: ["bailian-coding-plan"], model: "qwen3.5-plus" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
    requiresModel: "gpt-5.3-codex",
  },
  artistry: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro", variant: "high" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  quick: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode"], model: "gpt-5-nano" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-haiku-4-5" },
    ],
  },
  "unspecified-low": {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["openai"], model: "gpt-5.3-codex", variant: "medium" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-sonnet-4-6" },
    ],
  },
  "unspecified-high": {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2", variant: "high" },
      { providers: ["openai"], model: "gpt-5.3-codex", variant: "medium" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3.1-pro" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-opus-4-6", variant: "max" },
    ],
  },
  writing: {
    fallbackChain: [
      { providers: ["opencode-go", "bailian-coding-plan"], model: "kimi-k2.5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", "bailian-coding-plan", "minimax", "opencode"], model: "minimax-m2.5" },
      { providers: ["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"], model: "glm-5" },
      { providers: ["openai", "github-copilot", "opencode"], model: "gpt-5.2" },
      { providers: ["github-copilot", "google", "opencode"], model: "gemini-3-flash" },
      { providers: ["opencode", "github-copilot", "anthropic"], model: "claude-sonnet-4-6" },
    ],
  },
}
