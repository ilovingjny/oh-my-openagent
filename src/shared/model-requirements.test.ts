import { describe, expect, test } from "bun:test"
import {
  AGENT_MODEL_REQUIREMENTS,
  CATEGORY_MODEL_REQUIREMENTS,
  type FallbackEntry,
  type ModelRequirement,
} from "./model-requirements"

describe("AGENT_MODEL_REQUIREMENTS (legacy expectations)", () => {
  test("oracle has valid fallbackChain with gpt-5.2 as primary", () => {
    // given - oracle agent requirement
    const oracle = AGENT_MODEL_REQUIREMENTS["oracle"]

    // when - accessing oracle requirement
    // then - fallbackChain exists with gpt-5.2 as first entry
    expect(oracle).toBeDefined()
    expect(oracle.fallbackChain).toBeArray()
    expect(oracle.fallbackChain.length).toBeGreaterThan(0)

    const primary = oracle.fallbackChain[0]
    expect(primary.providers).toContain("openai")
    expect(primary.model).toBe("gpt-5.2")
    expect(primary.variant).toBe("high")
  })

  test("sisyphus has kimi-k2.5 as primary and requiresAnyModel", () => {
    // #given - sisyphus agent requirement
    const sisyphus = AGENT_MODEL_REQUIREMENTS["sisyphus"]

    // #when - accessing Sisyphus requirement
    // #then - fallbackChain has kimi-k2.5 first, big-pickle last
    expect(sisyphus).toBeDefined()
    expect(sisyphus.fallbackChain).toBeArray()
    expect(sisyphus.fallbackChain).toHaveLength(7)
    expect(sisyphus.requiresAnyModel).toBe(true)

    const primary = sisyphus.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
    expect(primary.model).toBe("kimi-k2.5")

    const last = sisyphus.fallbackChain[6]
    expect(last.providers[0]).toBe("opencode")
    expect(last.model).toBe("big-pickle")
  })

  test("sisyphus includes opencode-go entry before GLM entry", () => {
    const sisyphus = AGENT_MODEL_REQUIREMENTS["sisyphus"]

    const opencodeGoIndex = sisyphus.fallbackChain.findIndex((entry) =>
      entry.providers.includes("opencode-go")
    )
    const glmIndex = sisyphus.fallbackChain.findIndex((entry) => entry.model === "glm-5")

    expect(opencodeGoIndex).toBeGreaterThanOrEqual(0)
    expect(glmIndex).toBeGreaterThanOrEqual(0)
    expect(opencodeGoIndex).toBeLessThan(glmIndex)
  })

  test("librarian has valid fallbackChain with minimax-m2.5 as primary", () => {
    // given - librarian agent requirement
    const librarian = AGENT_MODEL_REQUIREMENTS["librarian"]

    // when - accessing librarian requirement
    // then - fallbackChain exists with minimax-m2.5 as first entry
    expect(librarian).toBeDefined()
    expect(librarian.fallbackChain).toBeArray()
    expect(librarian.fallbackChain.length).toBeGreaterThan(0)

    const primary = librarian.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan", "minimax", "opencode"])
    expect(primary.model).toBe("minimax-m2.5")
  })

  test("explore has valid fallbackChain with minimax-m2.5 as primary", () => {
    // given - explore agent requirement
    const explore = AGENT_MODEL_REQUIREMENTS["explore"]

    // when - accessing explore requirement
    // then - fallbackChain: minimax-m2.5 -> kimi-k2.5 -> k2p5 -> grok-code-fast-1 -> gpt-5-nano -> haiku
    expect(explore).toBeDefined()
    expect(explore.fallbackChain).toBeArray()
    expect(explore.fallbackChain).toHaveLength(6)

    const primary = explore.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan", "minimax", "opencode"])
    expect(primary.model).toBe("minimax-m2.5")

    const grokEntry = explore.fallbackChain[3]
    expect(grokEntry.providers).toContain("github-copilot")
    expect(grokEntry.model).toBe("grok-code-fast-1")

    const haikuEntry = explore.fallbackChain[5]
    expect(haikuEntry.model).toBe("claude-haiku-4-5")
  })

  test("multimodal-looker has valid fallbackChain with kimi-k2.5 as primary", () => {
    // given - multimodal-looker agent requirement
    const multimodalLooker = AGENT_MODEL_REQUIREMENTS["multimodal-looker"]

    // when - accessing multimodal-looker requirement
    // then - fallbackChain exists with kimi-k2.5 first, gpt-5-nano last
    expect(multimodalLooker).toBeDefined()
    expect(multimodalLooker.fallbackChain).toBeArray()
    expect(multimodalLooker.fallbackChain).toHaveLength(8)

    const primary = multimodalLooker.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
    expect(primary.model).toBe("kimi-k2.5")

    const last = multimodalLooker.fallbackChain[7]
    expect(last.providers).toContain("opencode")
    expect(last.model).toBe("gpt-5-nano")
  })

  test("prometheus has kimi-k2.5 as primary", () => {
    // #given - prometheus agent requirement
    const prometheus = AGENT_MODEL_REQUIREMENTS["prometheus"]

    // #when - accessing Prometheus requirement
    // #then - kimi-k2.5 is first
    expect(prometheus).toBeDefined()
    expect(prometheus.fallbackChain).toBeArray()
    expect(prometheus.fallbackChain.length).toBeGreaterThan(1)

    const primary = prometheus.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("metis has kimi-k2.5 as primary", () => {
    // #given - metis agent requirement
    const metis = AGENT_MODEL_REQUIREMENTS["metis"]

    // #when - accessing Metis requirement
    // #then - kimi-k2.5 is first
    expect(metis).toBeDefined()
    expect(metis.fallbackChain).toBeArray()
    expect(metis.fallbackChain.length).toBeGreaterThan(1)

    const primary = metis.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("momus has valid fallbackChain with gpt-5.2 as primary", () => {
    // given - momus agent requirement
    const momus = AGENT_MODEL_REQUIREMENTS["momus"]

    // when - accessing Momus requirement
    // then - fallbackChain exists with gpt-5.2 as first entry, variant medium
    expect(momus).toBeDefined()
    expect(momus.fallbackChain).toBeArray()
    expect(momus.fallbackChain.length).toBeGreaterThan(0)

    const primary = momus.fallbackChain[0]
    expect(primary.model).toBe("gpt-5.2")
    expect(primary.variant).toBe("medium")
    expect(primary.providers[0]).toBe("openai")
  })

  test("atlas has valid fallbackChain with kimi-k2.5 as primary", () => {
    // given - atlas agent requirement
    const atlas = AGENT_MODEL_REQUIREMENTS["atlas"]

    // when - accessing Atlas requirement
    // then - fallbackChain exists with kimi-k2.5 as first entry
    expect(atlas).toBeDefined()
    expect(atlas.fallbackChain).toBeArray()
    expect(atlas.fallbackChain.length).toBeGreaterThan(0)

    const primary = atlas.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("hephaestus requiresProvider includes all relevant providers", () => {
    // #given - hephaestus agent requirement
    const hephaestus = AGENT_MODEL_REQUIREMENTS["hephaestus"]

    // #when - accessing hephaestus requirement
    // #then - requiresProvider includes openai, opencode-go, bailian-coding-plan, minimax, kimi-for-coding, and opencode
    expect(hephaestus).toBeDefined()
    expect(hephaestus.requiresProvider).toEqual(["openai", "opencode-go", "bailian-coding-plan", "minimax", "kimi-for-coding", "opencode"])
    expect(hephaestus.requiresModel).toBeUndefined()
  })

  test("hephaestus has GPT as primary and non-GPT models as later fallbacks", () => {
    const hephaestus = AGENT_MODEL_REQUIREMENTS["hephaestus"]
    const chain = hephaestus.fallbackChain

    // GPT is still primary
    expect(chain[0]?.model.startsWith("gpt-")).toBe(true)

    // Non-GPT fallbacks exist (intentional: glm-5 for opencode-go, minimax for others)
    const hasNonGptFallback = chain.slice(1).some(entry => !entry.model.startsWith("gpt-"))
    expect(hasNonGptFallback).toBe(true)

    // glm-5 appears as opencode-go-specific fallback
    const glmEntry = chain.find(entry => entry.model === "glm-5")
    expect(glmEntry).toBeDefined()
    expect(glmEntry?.providers).toEqual(["opencode-go"])
  })

  test("all 11 builtin agents have valid fallbackChain arrays", () => {
    // #given - list of 11 agent names
    const expectedAgents = [
      "sisyphus",
      "hephaestus",
      "oracle",
      "librarian",
      "explore",
      "multimodal-looker",
      "prometheus",
      "metis",
      "momus",
      "atlas",
      "scribe",
    ]

    // when - checking AGENT_MODEL_REQUIREMENTS
    const definedAgents = Object.keys(AGENT_MODEL_REQUIREMENTS)

    // #then - all agents present with valid fallbackChain
    expect(definedAgents).toHaveLength(11)
    for (const agent of expectedAgents) {
      const requirement = AGENT_MODEL_REQUIREMENTS[agent]
      expect(requirement).toBeDefined()
      expect(requirement.fallbackChain).toBeArray()
      expect(requirement.fallbackChain.length).toBeGreaterThan(0)

      for (const entry of requirement.fallbackChain) {
        expect(entry.providers).toBeArray()
        expect(entry.providers.length).toBeGreaterThan(0)
        expect(typeof entry.model).toBe("string")
        expect(entry.model.length).toBeGreaterThan(0)
      }
    }
  })
})

describe("CATEGORY_MODEL_REQUIREMENTS (legacy expectations)", () => {
  test("ultrabrain has valid fallbackChain with gpt-5.3-codex as primary", () => {
    // given - ultrabrain category requirement
    const ultrabrain = CATEGORY_MODEL_REQUIREMENTS["ultrabrain"]

    // when - accessing ultrabrain requirement
    // then - fallbackChain exists with gpt-5.3-codex as first entry
    expect(ultrabrain).toBeDefined()
    expect(ultrabrain.fallbackChain).toBeArray()
    expect(ultrabrain.fallbackChain.length).toBeGreaterThan(0)

    const primary = ultrabrain.fallbackChain[0]
    expect(primary.variant).toBe("xhigh")
    expect(primary.model).toBe("gpt-5.3-codex")
    expect(primary.providers[0]).toBe("openai")
  })

  test("deep has valid fallbackChain with gpt-5.3-codex as primary", () => {
    // given - deep category requirement
    const deep = CATEGORY_MODEL_REQUIREMENTS["deep"]

    // when - accessing deep requirement
    // then - fallbackChain exists with gpt-5.3-codex as first entry, medium variant
    expect(deep).toBeDefined()
    expect(deep.fallbackChain).toBeArray()
    expect(deep.fallbackChain.length).toBeGreaterThan(0)

    const primary = deep.fallbackChain[0]
    expect(primary.variant).toBe("medium")
    expect(primary.model).toBe("gpt-5.3-codex")
    expect(primary.providers[0]).toBe("openai")
  })

  test("visual-engineering has valid fallbackChain with glm-5 as primary", () => {
    // given - visual-engineering category requirement
    const visualEngineering = CATEGORY_MODEL_REQUIREMENTS["visual-engineering"]

    // when - accessing visual-engineering requirement
    // then - fallbackChain: glm-5 → minimax-m2.5 → kimi-k2.5 → k2p5 → gemini-3.1-pro → gpt-5.2 → claude-opus-4-6
    expect(visualEngineering).toBeDefined()
    expect(visualEngineering.fallbackChain).toBeArray()
    expect(visualEngineering.fallbackChain).toHaveLength(7)

    const primary = visualEngineering.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan", "opencode", "zai-coding-plan"])
    expect(primary.model).toBe("glm-5")

    const last = visualEngineering.fallbackChain[6]
    expect(last.model).toBe("claude-opus-4-6")
    expect(last.variant).toBe("max")
  })

  test("quick has valid fallbackChain with minimax-m2.5 as primary", () => {
    // given - quick category requirement
    const quick = CATEGORY_MODEL_REQUIREMENTS["quick"]

    // when - accessing quick requirement
    // then - fallbackChain exists with minimax-m2.5 as first entry
    expect(quick).toBeDefined()
    expect(quick.fallbackChain).toBeArray()
    expect(quick.fallbackChain.length).toBeGreaterThan(0)

    const primary = quick.fallbackChain[0]
    expect(primary.model).toBe("minimax-m2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan", "minimax", "opencode"])
  })

  test("unspecified-low has valid fallbackChain with kimi-k2.5 as primary", () => {
    // given - unspecified-low category requirement
    const unspecifiedLow = CATEGORY_MODEL_REQUIREMENTS["unspecified-low"]

    // when - accessing unspecified-low requirement
    // then - fallbackChain exists with kimi-k2.5 as first entry
    expect(unspecifiedLow).toBeDefined()
    expect(unspecifiedLow.fallbackChain).toBeArray()
    expect(unspecifiedLow.fallbackChain.length).toBeGreaterThan(0)

    const primary = unspecifiedLow.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("unspecified-high has kimi-k2.5 as primary", () => {
    // #given - unspecified-high category requirement
    const unspecifiedHigh = CATEGORY_MODEL_REQUIREMENTS["unspecified-high"]

    // #when - accessing unspecified-high requirement
    // #then - kimi-k2.5 is first, no variant
    expect(unspecifiedHigh).toBeDefined()
    expect(unspecifiedHigh.fallbackChain).toBeArray()
    expect(unspecifiedHigh.fallbackChain.length).toBeGreaterThan(1)

    const primary = unspecifiedHigh.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.variant).toBeUndefined()
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("artistry has valid fallbackChain with kimi-k2.5 as primary", () => {
    // given - artistry category requirement
    const artistry = CATEGORY_MODEL_REQUIREMENTS["artistry"]

    // when - accessing artistry requirement
    // then - fallbackChain exists with kimi-k2.5 as first entry
    expect(artistry).toBeDefined()
    expect(artistry.fallbackChain).toBeArray()
    expect(artistry.fallbackChain.length).toBeGreaterThan(0)

    const primary = artistry.fallbackChain[0]
    expect(primary.model).toBe("kimi-k2.5")
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
  })

  test("writing has valid fallbackChain with kimi-k2.5 as primary", () => {
    // given - writing category requirement
    const writing = CATEGORY_MODEL_REQUIREMENTS["writing"]

    // when - accessing writing requirement
    // then - fallbackChain: kimi-k2.5 -> k2p5 -> minimax-m2.5 -> glm-5 -> gpt-5.2 -> gemini-3-flash -> claude-sonnet-4-6
    expect(writing).toBeDefined()
    expect(writing.fallbackChain).toBeArray()
    expect(writing.fallbackChain).toHaveLength(7)

    const primary = writing.fallbackChain[0]
    expect(primary.providers).toEqual(["opencode-go", "bailian-coding-plan"])
    expect(primary.model).toBe("kimi-k2.5")

    const last = writing.fallbackChain[6]
    expect(last.model).toBe("claude-sonnet-4-6")
  })

  test("all 8 categories have valid fallbackChain arrays", () => {
    // given - list of 8 category names
    const expectedCategories = [
      "visual-engineering",
      "ultrabrain",
      "deep",
      "artistry",
      "quick",
      "unspecified-low",
      "unspecified-high",
      "writing",
    ]

    // when - checking CATEGORY_MODEL_REQUIREMENTS
    const definedCategories = Object.keys(CATEGORY_MODEL_REQUIREMENTS)

    // then - all categories present with valid fallbackChain
    expect(definedCategories).toHaveLength(8)
    for (const category of expectedCategories) {
      const requirement = CATEGORY_MODEL_REQUIREMENTS[category]
      expect(requirement).toBeDefined()
      expect(requirement.fallbackChain).toBeArray()
      expect(requirement.fallbackChain.length).toBeGreaterThan(0)

      for (const entry of requirement.fallbackChain) {
        expect(entry.providers).toBeArray()
        expect(entry.providers.length).toBeGreaterThan(0)
        expect(typeof entry.model).toBe("string")
        expect(entry.model.length).toBeGreaterThan(0)
      }
    }
  })
})

describe("FallbackEntry type", () => {
  test("FallbackEntry structure is correct", () => {
    // given - a valid FallbackEntry object
    const entry: FallbackEntry = {
      providers: ["anthropic", "github-copilot", "opencode"],
      model: "claude-opus-4-6",
      variant: "high",
    }

    // when - accessing properties
    // then - all properties are accessible
    expect(entry.providers).toEqual(["anthropic", "github-copilot", "opencode"])
    expect(entry.model).toBe("claude-opus-4-6")
    expect(entry.variant).toBe("high")
  })

  test("FallbackEntry variant is optional", () => {
    // given - a FallbackEntry without variant
    const entry: FallbackEntry = {
      providers: ["opencode", "anthropic"],
      model: "big-pickle",
    }

    // when - accessing variant
    // then - variant is undefined
    expect(entry.variant).toBeUndefined()
  })
})

describe("ModelRequirement type", () => {
  test("ModelRequirement structure with fallbackChain is correct", () => {
    // given - a valid ModelRequirement object
    const requirement: ModelRequirement = {
      fallbackChain: [
        { providers: ["anthropic", "github-copilot"], model: "claude-opus-4-6", variant: "max" },
        { providers: ["openai", "github-copilot"], model: "gpt-5.2", variant: "high" },
      ],
    }

    // when - accessing properties
    // then - fallbackChain is accessible with correct structure
    expect(requirement.fallbackChain).toBeArray()
    expect(requirement.fallbackChain).toHaveLength(2)
    expect(requirement.fallbackChain[0].model).toBe("claude-opus-4-6")
    expect(requirement.fallbackChain[1].model).toBe("gpt-5.2")
  })

  test("ModelRequirement variant is optional", () => {
    // given - a ModelRequirement without top-level variant
    const requirement: ModelRequirement = {
      fallbackChain: [{ providers: ["opencode"], model: "big-pickle" }],
    }

    // when - accessing variant
    // then - variant is undefined
    expect(requirement.variant).toBeUndefined()
  })

  test("no model in fallbackChain has provider prefix", () => {
    // given - all agent and category requirements
    const allRequirements = [
      ...Object.values(AGENT_MODEL_REQUIREMENTS),
      ...Object.values(CATEGORY_MODEL_REQUIREMENTS),
    ]

    // when - checking each model in fallbackChain
    // then - none contain "/" (provider prefix)
    for (const req of allRequirements) {
      for (const entry of req.fallbackChain) {
        expect(entry.model).not.toContain("/")
      }
    }
  })

   test("all fallbackChain entries have non-empty providers array", () => {
     // given - all agent and category requirements
     const allRequirements = [
       ...Object.values(AGENT_MODEL_REQUIREMENTS),
       ...Object.values(CATEGORY_MODEL_REQUIREMENTS),
     ]

     // when - checking each entry in fallbackChain
     // then - all have non-empty providers array
     for (const req of allRequirements) {
       for (const entry of req.fallbackChain) {
         expect(entry.providers).toBeArray()
         expect(entry.providers.length).toBeGreaterThan(0)
       }
     }
   })
})

describe("requiresModel field in categories", () => {
  test("deep category has requiresModel set to gpt-5.3-codex", () => {
    // given
    const deep = CATEGORY_MODEL_REQUIREMENTS["deep"]

    // when / #then
    expect(deep.requiresModel).toBe("gpt-5.3-codex")
  })

  test("artistry category has no requiresModel constraint", () => {
    // given
    const artistry = CATEGORY_MODEL_REQUIREMENTS["artistry"]

    // when / #then
    expect(artistry.requiresModel).toBeUndefined()
  })
})

describe("gpt-5.3-codex provider restrictions", () => {
  test("no gpt-5.3-codex entry in AGENT_MODEL_REQUIREMENTS includes github-copilot as provider", () => {
    // given - all agent requirements
    const allAgentEntries = Object.values(AGENT_MODEL_REQUIREMENTS).flatMap(
      (req) => req.fallbackChain
    )

    // when - filtering entries with gpt-5.3-codex model
    const codexEntries = allAgentEntries.filter((entry) => entry.model === "gpt-5.3-codex")

    // then - none of them include github-copilot as a provider
    for (const entry of codexEntries) {
      expect(entry.providers).not.toContain("github-copilot")
    }
  })

  test("no gpt-5.3-codex entry in CATEGORY_MODEL_REQUIREMENTS includes github-copilot as provider", () => {
    // given - all category requirements
    const allCategoryEntries = Object.values(CATEGORY_MODEL_REQUIREMENTS).flatMap(
      (req) => req.fallbackChain
    )

    // when - filtering entries with gpt-5.3-codex model
    const codexEntries = allCategoryEntries.filter((entry) => entry.model === "gpt-5.3-codex")

    // then - none of them include github-copilot as a provider
    for (const entry of codexEntries) {
      expect(entry.providers).not.toContain("github-copilot")
    }
  })
})
