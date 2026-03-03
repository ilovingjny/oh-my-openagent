import { describe, expect, test } from "bun:test"

import { AGENT_MODEL_REQUIREMENTS, CATEGORY_MODEL_REQUIREMENTS } from "./model-requirements"

describe("model requirements policy", () => {
  test("ChatGPT-first agents keep GPT first and use qwen3.5-plus as next fallback", () => {
    const chatGptFirstAgents = ["hephaestus", "oracle", "momus"] as const

    for (const agentName of chatGptFirstAgents) {
      const requirement = AGENT_MODEL_REQUIREMENTS[agentName]
      expect(requirement).toBeDefined()
      expect(requirement.fallbackChain[0]?.model.startsWith("gpt-")).toBe(true)
      expect(requirement.fallbackChain[1]?.model).toBe("qwen3.5-plus")
      expect(requirement.fallbackChain[1]?.providers).toEqual(["bailian-coding-plan"])
    }
  })

  test("ChatGPT-first categories keep GPT first and use qwen3.5-plus second", () => {
    for (const category of ["ultrabrain", "deep"] as const) {
      const requirement = CATEGORY_MODEL_REQUIREMENTS[category]
      expect(requirement).toBeDefined()
      expect(requirement.fallbackChain[0]?.model).toBe("gpt-5.3-codex")
      expect(requirement.fallbackChain[1]?.model).toBe("qwen3.5-plus")
      expect(requirement.fallbackChain[1]?.providers).toEqual(["bailian-coding-plan"])
    }
  })

  test("hephaestus requiresProvider includes OpenAI + OpenCode-go + Bailian + OpenCode", () => {
    expect(AGENT_MODEL_REQUIREMENTS.hephaestus.requiresProvider).toEqual([
      "openai",
      "opencode-go",
      "bailian-coding-plan",
      "opencode",
    ])
  })

  test("general groups start from opencode-go or minimax-first utility chains", () => {
    expect(AGENT_MODEL_REQUIREMENTS.prometheus.fallbackChain[0]?.providers[0]).toBe("opencode-go")
    expect(AGENT_MODEL_REQUIREMENTS.metis.fallbackChain[0]?.providers[0]).toBe("opencode-go")
    expect(AGENT_MODEL_REQUIREMENTS.explore.fallbackChain[0]?.model).toBe("minimax-m2.5")
    expect(CATEGORY_MODEL_REQUIREMENTS.quick.fallbackChain[0]?.model).toBe("minimax-m2.5")
  })

  test("google and anthropic stay late fallbacks in general chains", () => {
    const oracleChain = AGENT_MODEL_REQUIREMENTS.oracle.fallbackChain.map((entry) => entry.model)
    const geminiIndex = oracleChain.findIndex((model) => model.includes("gemini"))
    const claudeIndex = oracleChain.findIndex((model) => model.includes("claude"))
    const minimaxIndex = oracleChain.findIndex((model) => model.includes("minimax"))
    const kimiIndex = oracleChain.findIndex((model) => model.includes("k2p5"))

    expect(minimaxIndex).toBeGreaterThanOrEqual(0)
    expect(kimiIndex).toBeGreaterThanOrEqual(0)
    expect(geminiIndex).toBeGreaterThan(kimiIndex)
    expect(claudeIndex).toBeGreaterThan(geminiIndex)
  })
})
