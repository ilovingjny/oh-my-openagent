import type { InstallConfig } from "./types"
import type { ProviderAvailability } from "./model-fallback-types"

export function toProviderAvailability(config: InstallConfig): ProviderAvailability {
  return {
    native: {
      claude: config.hasClaude,
      openai: config.hasOpenAI,
      gemini: config.hasGemini,
    },
    opencodeZen: config.hasOpencodeZen,
    opencodeGo: config.hasOpencodeGo,
    bailianCodingPlan: config.hasBailianCodingPlan,
    minimax: config.hasMinimax,
    copilot: config.hasCopilot,
    zai: config.hasZaiCodingPlan,
    kimiForCoding: config.hasKimiForCoding,
    isMaxPlan: config.isMax20,
  }
}

export function isProviderAvailable(provider: string, availability: ProviderAvailability): boolean {
  const mapping: Record<string, boolean> = {
    anthropic: availability.native.claude,
    openai: availability.native.openai,
    google: availability.native.gemini,
    "github-copilot": availability.copilot,
    opencode: availability.opencodeZen,
    "opencode-go": availability.opencodeGo,
    "bailian-coding-plan": availability.bailianCodingPlan,
    minimax: availability.minimax,
    "zai-coding-plan": availability.zai,
    "kimi-for-coding": availability.kimiForCoding,
  }
  return mapping[provider] ?? false
}
