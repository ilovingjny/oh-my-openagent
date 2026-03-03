import { describe, expect, test } from "bun:test"

import { isProviderAvailable, toProviderAvailability } from "./provider-availability"
import type { InstallConfig } from "./types"

const baseConfig: InstallConfig = {
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
}

describe("provider availability mapping", () => {
  test("maps new provider flags into availability object", () => {
    const availability = toProviderAvailability({
      ...baseConfig,
      hasOpencodeGo: true,
      hasBailianCodingPlan: true,
      hasMinimax: true,
    })

    expect(availability.opencodeGo).toBe(true)
    expect(availability.bailianCodingPlan).toBe(true)
    expect(availability.minimax).toBe(true)
  })

  test("resolves canonical provider IDs for new providers", () => {
    const availability = toProviderAvailability({
      ...baseConfig,
      hasOpencodeGo: true,
      hasBailianCodingPlan: true,
      hasMinimax: true,
    })

    expect(isProviderAvailable("opencode-go", availability)).toBe(true)
    expect(isProviderAvailable("bailian-coding-plan", availability)).toBe(true)
    expect(isProviderAvailable("minimax", availability)).toBe(true)
    expect(isProviderAvailable("openai", availability)).toBe(false)
  })
})
