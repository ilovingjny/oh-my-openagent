import { describe, expect, test } from "bun:test"

import { generateModelConfig } from "./model-fallback"
import type { InstallConfig } from "./types"

function createConfig(overrides: Partial<InstallConfig> = {}): InstallConfig {
  return {
    hasClaude: false,
    isMax20: false,
    hasOpenAI: false,
    hasGemini: false,
    hasCopilot: false,
    hasOpencodeZen: false,
    hasOpencodeGo: false,
    hasBailianCodingPlan: false,
    hasMinimax: false,
    hasZaiCodingPlan: false,
    hasKimiForCoding: false,
    ...overrides,
  }
}

describe("generateModelConfig policy", () => {
  test("returns ultimate fallback when absolutely no providers are enabled", () => {
    const result = generateModelConfig(createConfig())

    expect(result.agents?.sisyphus).toBeUndefined()
    expect(result.agents?.oracle?.model).toBe("opencode/glm-4.7-free")
    expect(result.categories?.deep?.model).toBe("opencode/glm-4.7-free")
  })

  test("ChatGPT-first groups use qwen3.5-plus fallback when OpenAI is unavailable", () => {
    const result = generateModelConfig(createConfig({ hasBailianCodingPlan: true }))

    expect(result.agents?.hephaestus?.model).toBe("bailian-coding-plan/qwen3.5-plus")
    expect(result.agents?.oracle?.model).toBe("bailian-coding-plan/qwen3.5-plus")
    expect(result.agents?.momus?.model).toBe("bailian-coding-plan/qwen3.5-plus")
    expect(result.categories?.ultrabrain?.model).toBe("bailian-coding-plan/qwen3.5-plus")
    expect(result.categories?.deep).toBeUndefined()
  })

  test("ChatGPT-first groups keep GPT first when OpenAI is enabled", () => {
    const result = generateModelConfig(
      createConfig({ hasOpenAI: true, hasBailianCodingPlan: true })
    )

    expect(result.agents?.hephaestus?.model).toBe("openai/gpt-5.3-codex")
    expect(result.agents?.oracle?.model).toBe("openai/gpt-5.2")
    expect(result.agents?.momus?.model).toBe("openai/gpt-5.2")
    expect(result.categories?.ultrabrain?.model).toBe("openai/gpt-5.3-codex")
    expect(result.categories?.deep?.model).toBe("openai/gpt-5.3-codex")
  })

  test("general groups prioritize opencode-go before bailian/minimax/kimi", () => {
    const result = generateModelConfig(
      createConfig({
        hasOpencodeGo: true,
        hasBailianCodingPlan: true,
        hasMinimax: true,
        hasKimiForCoding: true,
      })
    )

    expect(result.agents?.prometheus?.model).toBe("opencode-go/kimi-k2.5")
    expect(result.agents?.metis?.model).toBe("opencode-go/kimi-k2.5")
  })

  test("minimax model IDs are normalized to MiniMax-M2.5 for minimax provider", () => {
    const result = generateModelConfig(createConfig({ hasMinimax: true }))

    expect(result.agents?.explore?.model).toBe("minimax/MiniMax-M2.5")
    expect(result.categories?.quick?.model).toBe("minimax/MiniMax-M2.5")
  })

  test("google/anthropic remain late fallback in general groups", () => {
    const result = generateModelConfig(createConfig({ hasGemini: true, hasClaude: true }))

    expect(result.agents?.oracle?.model).toBe("google/gemini-3.1-pro-preview")
    expect(result.agents?.oracle?.model?.startsWith("anthropic/")).toBe(false)
  })

  test("sisyphus is created when opencode-go is enabled (new provider availability)", () => {
    const result = generateModelConfig(createConfig({ hasOpencodeGo: true }))

    expect(result.agents?.sisyphus?.model).toBe("opencode-go/kimi-k2.5")
  })

  test("Hephaestus falls back to glm-5 for opencode-go (intentional)", () => {
    const result = generateModelConfig(createConfig({ hasOpencodeGo: true }))
    expect(result.agents?.hephaestus?.model).toBe("opencode-go/glm-5")
  })
})
