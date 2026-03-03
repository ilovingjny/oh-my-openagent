import * as p from "@clack/prompts"
import type { Option } from "@clack/prompts"
import type {
  ClaudeSubscription,
  DetectedConfig,
  InstallConfig,
} from "./types"
import { detectedToInitialValues } from "./install-validators"

async function selectOrCancel<TValue extends Readonly<string | boolean | number>>(params: {
  message: string
  options: Option<TValue>[]
  initialValue: TValue
}): Promise<TValue | null> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return null

  const value = await p.select<TValue>({
    message: params.message,
    options: params.options,
    initialValue: params.initialValue,
  })
  if (p.isCancel(value)) {
    p.cancel("Installation cancelled.")
    return null
  }
  return value as TValue
}

export async function promptInstallConfig(detected: DetectedConfig): Promise<InstallConfig | null> {
  const initial = detectedToInitialValues(detected)

  const claude = await selectOrCancel<ClaudeSubscription>({
    message: "Do you have a Claude Pro/Max subscription?",
    options: [
      { value: "no", label: "No", hint: "Will use fallback chains" },
      { value: "yes", label: "Yes (standard)", hint: "Claude fallback for non-GPT-first agents" },
      { value: "max20", label: "Yes (max20 mode)", hint: "Full Claude access" },
    ],
    initialValue: initial.claude,
  })
  if (!claude) return null

  const openai = await selectOrCancel({
    message: "Do you have an OpenAI/ChatGPT Plus subscription?",
    options: [
      { value: "no", label: "No", hint: "GPT-first agents will use qwen3.5-plus fallback" },
      { value: "yes", label: "Yes", hint: "GPT-first agents keep OpenAI first" },
    ],
    initialValue: initial.openai,
  })
  if (!openai) return null

  const opencodeGo = await selectOrCancel({
    message: "Do you use OpenCode Go provider?",
    options: [
      { value: "yes", label: "Yes", hint: "Preferred provider for most non-GPT agents" },
      { value: "no", label: "No", hint: "Skip opencode-go fallback" },
    ],
    initialValue: initial.opencodeGo,
  })
  if (!opencodeGo) return null

  const bailianCodingPlan = await selectOrCancel({
    message: "Do you use Bailian Coding Plan (mstudio)?",
    options: [
      { value: "yes", label: "Yes", hint: "Secondary preferred provider (bailian-coding-plan)" },
      { value: "no", label: "No", hint: "Skip bailian-coding-plan fallback" },
    ],
    initialValue: initial.bailianCodingPlan,
  })
  if (!bailianCodingPlan) return null

  const minimax = await selectOrCancel({
    message: "Do you use MiniMax provider (minimax.io)?",
    options: [
      { value: "yes", label: "Yes", hint: "Used in minimax-specific fallback chains" },
      { value: "no", label: "No", hint: "Skip minimax provider fallback" },
    ],
    initialValue: initial.minimax,
  })
  if (!minimax) return null

  const kimiForCoding = await selectOrCancel({
    message: "Do you have a Kimi For Coding subscription?",
    options: [
      { value: "yes", label: "Yes", hint: "k2p5 fallback for non-GPT-first agents" },
      { value: "no", label: "No", hint: "Skip kimi-for-coding fallback" },
    ],
    initialValue: initial.kimiForCoding,
  })
  if (!kimiForCoding) return null

  const opencodeZen = await selectOrCancel({
    message: "Do you have access to OpenCode Zen (opencode/ models)?",
    options: [
      { value: "yes", label: "Yes", hint: "Includes big-pickle and gpt-5-nano fallback" },
      { value: "no", label: "No", hint: "Will use other providers only" },
    ],
    initialValue: initial.opencodeZen,
  })
  if (!opencodeZen) return null

  const zaiCodingPlan = await selectOrCancel({
    message: "Do you have a Z.ai Coding Plan subscription?",
    options: [
      { value: "yes", label: "Yes", hint: "Late fallback (glm family)" },
      { value: "no", label: "No", hint: "Skip zai-coding-plan fallback" },
    ],
    initialValue: initial.zaiCodingPlan,
  })
  if (!zaiCodingPlan) return null

  const gemini = await selectOrCancel({
    message: "Will you integrate Google Gemini?",
    options: [
      { value: "no", label: "No", hint: "Gemini fallback disabled" },
      { value: "yes", label: "Yes", hint: "Gemini stays as late fallback" },
    ],
    initialValue: initial.gemini,
  })
  if (!gemini) return null

  const copilot = await selectOrCancel({
    message: "Do you have a GitHub Copilot subscription?",
    options: [
      { value: "no", label: "No", hint: "No github-copilot fallback" },
      { value: "yes", label: "Yes", hint: "Late fallback route" },
    ],
    initialValue: initial.copilot,
  })
  if (!copilot) return null

  return {
    hasClaude: claude !== "no",
    isMax20: claude === "max20",
    hasOpenAI: openai === "yes",
    hasGemini: gemini === "yes",
    hasCopilot: copilot === "yes",
    hasOpencodeZen: opencodeZen === "yes",
    hasOpencodeGo: opencodeGo === "yes",
    hasBailianCodingPlan: bailianCodingPlan === "yes",
    hasMinimax: minimax === "yes",
    hasZaiCodingPlan: zaiCodingPlan === "yes",
    hasKimiForCoding: kimiForCoding === "yes",
  }
}
