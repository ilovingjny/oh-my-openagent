import { describe, expect, test } from "bun:test"

import { argsToConfig, detectedToInitialValues, validateNonTuiArgs } from "./install-validators"
import type { DetectedConfig, InstallArgs } from "./types"

describe("install validators", () => {
  test("accepts new provider flags in non-tui validation", () => {
    const args: InstallArgs = {
      tui: false,
      claude: "no",
      openai: "yes",
      gemini: "no",
      copilot: "no",
      opencodeZen: "no",
      opencodeGo: "yes",
      bailianCodingPlan: "yes",
      minimax: "yes",
      zaiCodingPlan: "no",
      kimiForCoding: "yes",
    }

    const result = validateNonTuiArgs(args)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test("maps args to new install config fields", () => {
    const config = argsToConfig({
      tui: false,
      claude: "max20",
      openai: "yes",
      gemini: "no",
      copilot: "no",
      opencodeZen: "yes",
      opencodeGo: "yes",
      bailianCodingPlan: "yes",
      minimax: "yes",
      zaiCodingPlan: "yes",
      kimiForCoding: "yes",
    })

    expect(config.hasOpencodeGo).toBe(true)
    expect(config.hasBailianCodingPlan).toBe(true)
    expect(config.hasMinimax).toBe(true)
    expect(config.isMax20).toBe(true)
  })

  test("maps detected config to tui initial values for new providers", () => {
    const detected: DetectedConfig = {
      isInstalled: true,
      hasClaude: false,
      isMax20: false,
      hasOpenAI: false,
      hasGemini: false,
      hasCopilot: false,
      hasOpencodeZen: false,
      hasOpencodeGo: true,
      hasBailianCodingPlan: true,
      hasMinimax: true,
      hasZaiCodingPlan: false,
      hasKimiForCoding: true,
    }

    const initial = detectedToInitialValues(detected)
    expect(initial.opencodeGo).toBe("yes")
    expect(initial.bailianCodingPlan).toBe("yes")
    expect(initial.minimax).toBe("yes")
    expect(initial.kimiForCoding).toBe("yes")
  })
})
