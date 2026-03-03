import { describe, expect, test } from "bun:test"
import { AGENT_MODEL_REQUIREMENTS, CATEGORY_MODEL_REQUIREMENTS } from "./model-requirements"

const PROVIDER_PRIORITY_SEPARATOR = " -> "

const EXPECTED_AGENT_KEYS = [
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
]

const EXPECTED_CATEGORY_KEYS = [
  "visual-engineering",
  "ultrabrain",
  "deep",
  "artistry",
  "quick",
  "unspecified-low",
  "unspecified-high",
  "writing",
]

const AGENT_DISPLAY_NAME_TO_KEY: Record<string, string> = {
  sisyphus: "sisyphus",
  hephaestus: "hephaestus",
  oracle: "oracle",
  librarian: "librarian",
  explore: "explore",
  "multimodal-looker": "multimodal-looker",
  prometheus: "prometheus",
  metis: "metis",
  momus: "momus",
  atlas: "atlas",
}

const CATEGORY_DISPLAY_NAME_TO_KEY: Record<string, string> = {
  "visual-engineering": "visual-engineering",
  ultrabrain: "ultrabrain",
  deep: "deep",
  artistry: "artistry",
  quick: "quick",
  "unspecified-low": "unspecified-low",
  "unspecified-high": "unspecified-high",
  writing: "writing",
}

type RequirementsMap = Record<string, { fallbackChain: Array<{ providers: string[] }> }>
type ParsedDocsRow = {
  providers: string[]
  usesViaNotation: boolean
}

function normalizeDisplayName(value: string): string {
  return value.replaceAll("**", "").replaceAll("`", "").trim().toLowerCase()
}

function computeProviderPriorityChains(requirements: RequirementsMap): Record<string, string[]> {
  const providerChains: Record<string, string[]> = {}

  for (const [key, requirement] of Object.entries(requirements)) {
    const providers: string[] = []

    for (const fallbackEntry of requirement.fallbackChain) {
      for (const provider of fallbackEntry.providers) {
        if (!providers.includes(provider)) {
          providers.push(provider)
        }
      }
    }

    providerChains[key] = providers
  }

  return providerChains
}

function parseProviderPriorityCell(priorityCell: string): ParsedDocsRow {
  const normalizedCell = priorityCell
    .replaceAll("`", "")
    .replaceAll("**", "")
    .toLowerCase()
  const providerMatches = normalizedCell.match(/[a-z][a-z0-9-]*/g)

  if (!providerMatches) {
    return { providers: [], usesViaNotation: false }
  }

  const providers: string[] = []

  for (const provider of providerMatches) {
    if (provider === "via") {
      continue
    }

    if (!providers.includes(provider)) {
      providers.push(provider)
    }
  }

  return {
    providers,
    usesViaNotation: normalizedCell.includes("(via "),
  }
}

function parseProviderTable(
  markdown: string,
  heading: string,
  displayNameToKey: Record<string, string>
): Record<string, ParsedDocsRow> {
  const headingToken = `#### ${heading}`
  const sectionStart = markdown.indexOf(headingToken)

  if (sectionStart === -1) {
    throw new Error(`Could not find section \"${heading}\" in docs/reference/configuration.md`)
  }

  const sectionText = markdown.slice(sectionStart)
  const rowsByKey: Record<string, ParsedDocsRow> = {}

  for (const line of sectionText.split("\n")) {
    const trimmedLine = line.trim()

    if (!trimmedLine.startsWith("|")) {
      if (Object.keys(rowsByKey).length > 0) {
        break
      }

      continue
    }

    const cells = trimmedLine
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())

    if (cells.length < 3) {
      continue
    }

    if (cells.every((cell) => /^[:\-\s]+$/.test(cell))) {
      continue
    }

    const rawName = normalizeDisplayName(cells[0])
    if (rawName === "agent" || rawName === "category") {
      continue
    }

    const mappedKey = displayNameToKey[rawName]
    if (!mappedKey) {
      throw new Error(`Unknown row label \"${cells[0]}\" in section \"${heading}\"`)
    }

    rowsByKey[mappedKey] = parseProviderPriorityCell(cells[cells.length - 1])
  }

  return rowsByKey
}

function compareProviderPriority(
  kind: "agent" | "category",
  key: string,
  docsRow: ParsedDocsRow,
  runtimeProviders: string[]
): void {
  const docsProviders = docsRow.providers

  const missingFromDocs = runtimeProviders.filter((provider) => !docsProviders.includes(provider))
  const extraInDocs = docsProviders.filter((provider) => !runtimeProviders.includes(provider))

  if (missingFromDocs.length > 0 || extraInDocs.length > 0) {
    const runtime = runtimeProviders.join(PROVIDER_PRIORITY_SEPARATOR)
    const docs = docsProviders.join(PROVIDER_PRIORITY_SEPARATOR)

    throw new Error(
      `Provider set mismatch for ${kind} \"${key}\". Docs: \"${docs}\". Runtime: \"${runtime}\". Missing in docs: [${missingFromDocs.join(", ")}]. Extra in docs: [${extraInDocs.join(", ")}].`
    )
  }

  if (!docsRow.usesViaNotation) {
    const docs = docsProviders.join(PROVIDER_PRIORITY_SEPARATOR)
    const runtime = runtimeProviders.join(PROVIDER_PRIORITY_SEPARATOR)
    if (docs !== runtime) {
      throw new Error(
        `Provider priority mismatch for ${kind} \"${key}\". Docs: \"${docs}\". Runtime: \"${runtime}\".`
      )
    }
  }
}

function getDocsRow(docsProviderChains: Record<string, ParsedDocsRow>, key: string, kind: "agent" | "category"): ParsedDocsRow {
  const row = docsProviderChains[key]
  if (!row) {
    throw new Error(
      `Missing ${kind} \"${key}\" row in parsed docs provider chain table.`
    )
  }

  return row
}

describe("model requirements docs sync", () => {
  test("Agent Provider Chains table matches runtime requirements", async () => {
    const docsMarkdown = await Bun.file(new URL("../../docs/reference/configuration.md", import.meta.url)).text()

    const runtimeProviderChains = computeProviderPriorityChains(AGENT_MODEL_REQUIREMENTS)
    const docsProviderChains = parseProviderTable(
      docsMarkdown,
      "Agent Provider Chains",
      AGENT_DISPLAY_NAME_TO_KEY
    )

    expect(Object.keys(docsProviderChains).sort()).toEqual([...EXPECTED_AGENT_KEYS].sort())

    for (const agentKey of EXPECTED_AGENT_KEYS) {
      const docsRow = getDocsRow(docsProviderChains, agentKey, "agent")
      compareProviderPriority(
        "agent",
        agentKey,
        docsRow,
        runtimeProviderChains[agentKey] ?? []
      )
    }
  })

  test("Category Provider Chains table matches runtime requirements", async () => {
    const docsMarkdown = await Bun.file(new URL("../../docs/reference/configuration.md", import.meta.url)).text()

    const runtimeProviderChains = computeProviderPriorityChains(CATEGORY_MODEL_REQUIREMENTS)
    const docsProviderChains = parseProviderTable(
      docsMarkdown,
      "Category Provider Chains",
      CATEGORY_DISPLAY_NAME_TO_KEY
    )

    expect(Object.keys(docsProviderChains).sort()).toEqual([...EXPECTED_CATEGORY_KEYS].sort())

    for (const categoryKey of EXPECTED_CATEGORY_KEYS) {
      const docsRow = getDocsRow(docsProviderChains, categoryKey, "category")
      compareProviderPriority(
        "category",
        categoryKey,
        docsRow,
        runtimeProviderChains[categoryKey] ?? []
      )
    }
  })
})
