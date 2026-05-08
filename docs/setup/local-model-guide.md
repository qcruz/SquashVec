# Running a Free Local AI Model on Your Computer

This guide gets you from zero to a running, capable AI model on your own hardware.
No API keys. No usage fees. Your data stays on your machine.

This is the first step to becoming an OpenWork contributor.

---

## Recommended Approach: Ollama

[Ollama](https://ollama.com) is the easiest way to run open-source models locally.
It handles model downloads, GPU acceleration, and exposes a local REST API automatically.

**Why Ollama:**
- One-command install and one-command model download
- Works on macOS (Apple Silicon + Intel), Linux, and Windows
- Auto-detects and uses your GPU if available
- Runs a local REST API on `localhost:11434` (compatible with OpenAI API format)
- Completely free, open source

---

## Step 1: Check Your Hardware

Minimum requirements depend on the model size. Use this as a guide:

| RAM  | Recommended model      | Notes |
|------|------------------------|-------|
| 8 GB | Phi-3 Mini (3.8B)      | Lightweight, fast, surprisingly capable |
| 16 GB | Llama 3.1 8B / Mistral 7B | Best general-purpose option for most users |
| 32 GB | Llama 3.1 70B (quantized) | High quality, slower |
| 64 GB+ | Llama 3.1 70B (full) | Near-GPT-4 quality |

**Apple Silicon Macs (M1/M2/M3/M4):** Excellent performance. Unified memory means even
8B models run fast on M1 with 16GB.

**Windows/Linux with NVIDIA GPU:** Ollama will auto-use CUDA. 8GB VRAM handles 7-8B models well.

**No GPU / CPU only:** Still works, just slower. A 7B model on a modern CPU produces
roughly 5-15 tokens/second -- usable, not fast.

---

## Step 2: Install Ollama

### macOS
```bash
# Option A: Download from website
# Go to https://ollama.com and click Download for Mac
# Open the .dmg and drag to Applications

# Option B: Homebrew
brew install ollama
```

After install, Ollama runs as a background service automatically.

### Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows
Download the installer from [https://ollama.com](https://ollama.com).
Run the `.exe` and follow the prompts. Ollama will run in the system tray.

---

## Step 3: Download a Model

Open your terminal and run:

```bash
# Best all-around choice for 16GB RAM (recommended starting point)
ollama pull llama3.1

# Lightweight option for 8GB RAM
ollama pull phi3

# Great for coding tasks
ollama pull codellama

# Strong reasoning, good for analysis
ollama pull mistral
```

The download will take a few minutes depending on your connection (models are 4-8 GB).

**Model sizes after download:**

| Model | Disk space | Min RAM |
|-------|-----------|---------|
| phi3 (3.8B) | ~2.4 GB | 8 GB |
| mistral (7B) | ~4.1 GB | 8 GB |
| llama3.1 (8B) | ~4.7 GB | 8 GB |
| codellama (7B) | ~3.8 GB | 8 GB |
| llama3.1:70b | ~40 GB | 48 GB |

---

## Step 4: Run the Model

### Interactive chat in terminal
```bash
ollama run llama3.1
```
Type your prompt and press Enter. Type `/bye` to exit.

### As a background service (for programmatic use)
Ollama runs automatically as a service after install. You can call it via HTTP:

```bash
# Test it
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "Explain what a REST API is in one sentence.",
  "stream": false
}'
```

### From Python
```bash
pip install ollama
```

```python
import ollama

response = ollama.chat(model='llama3.1', messages=[
    {'role': 'user', 'content': 'What is the capital of France?'}
])

print(response['message']['content'])
```

### OpenAI-compatible API
Ollama's API is compatible with the OpenAI Python SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url='http://localhost:11434/v1',
    api_key='ollama',  # required but unused
)

response = client.chat.completions.create(
    model='llama3.1',
    messages=[{'role': 'user', 'content': 'Hello!'}]
)
print(response.choices[0].message.content)
```

This means any app built for OpenAI can point to your local model with minimal changes.

---

## Step 5: Verify Everything Works

```bash
# List your downloaded models
ollama list

# Run a quick test
ollama run llama3.1 "Say hello and tell me what model you are."

# Check the API is running
curl http://localhost:11434
# Should return: "Ollama is running"
```

---

## Choosing the Right Model for Your Task

| Task type | Recommended model |
|-----------|-------------------|
| General chat / Q&A | `llama3.1` |
| Writing / summarization | `llama3.1` or `mistral` |
| Code generation | `codellama` or `llama3.1` |
| Fast / lightweight | `phi3` |
| Instruction following | `mistral` |
| Long context | `llama3.1` (128k context window) |

---

## Troubleshooting

**Model is very slow:**
- Make sure Ollama is using your GPU: run `ollama run llama3.1` and check Activity Monitor (macOS) or `nvidia-smi` (Linux/Windows) for GPU usage.
- If on CPU only, try `phi3` -- it's much faster at the same quality level for small tasks.

**Out of memory error:**
- Use a smaller model (`phi3` instead of `llama3.1`)
- Close other applications to free RAM
- On macOS, check Memory Pressure in Activity Monitor

**Ollama not found after install:**
- macOS: Make sure `/usr/local/bin` is in your PATH, or restart terminal
- Run `which ollama` to confirm the path

**Port 11434 already in use:**
- Another Ollama instance is running. Check Activity Monitor / Task Manager and kill the duplicate.

---

## What's Next

Once your local model is running, the next step is connecting it to the OpenWork network
so it can automatically pick up tasks and earn credits.

See: `docs/getting-started-contributor.md` *(coming soon)*
