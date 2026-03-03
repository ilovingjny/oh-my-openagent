import type { ModelRequirement } from "../shared/model-requirements"

// NOTE: These requirements are used by the CLI config generator (`generateModelConfig`).
// They intentionally use install-time provider IDs so generated config can be resolved
// against authenticated providers in OpenCode.

export const CLI_AGENT_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
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
}

export const CLI_CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
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
