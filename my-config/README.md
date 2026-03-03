# My OpenCode Config

Personal OpenCode configuration using oh-my-opencode with Alibaba Cloud Model Studio (bailian-coding-plan), MiniMax, and OpenAI.

## Setup

1. Copy `opencode.json` to `~/.config/opencode/opencode.json`
2. Copy `oh-my-opencode.json` to `~/.config/opencode/oh-my-opencode.json`
3. Replace `YOUR_BAILIAN_API_KEY` in `opencode.json` with your actual API key from [Alibaba Cloud Model Studio](https://bailian.console.aliyun.com/)
4. Run `opencode auth login` to authenticate OpenAI, MiniMax, and any other providers

## Provider Setup

| Provider | Where to get key |
|---|---|
| `bailian-coding-plan` | [Alibaba Cloud Model Studio](https://bailian.console.aliyun.com/) — International endpoint |
| `openai` | [platform.openai.com](https://platform.openai.com/) |
| `minimax` | [minimax.io](https://minimax.io/) |

## Plugin

This config uses `oh-my-opencode` plugin (npm). Install it via OpenCode or add it to `opencode.json` as shown.
