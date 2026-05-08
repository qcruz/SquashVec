# How Ollama Works: A Complete Explainer

This document explains exactly what Ollama is, how it operates under the hood,
what risks come with running it, and where its limits are.
Read this before building anything on top of it.

---

## What Ollama Actually Is

Ollama is a **local model runtime** -- a program that:

1. Downloads quantized open-source AI models to your hard drive
2. Loads them into RAM (and GPU memory if available)
3. Runs inference (generates responses) entirely on your machine
4. Exposes a local HTTP API so other programs can talk to it

Nothing is sent to an external server. The model runs on your CPU/GPU.
Ollama itself is open source (MIT license). The models it runs are separately licensed.

---

## The Stack: What's Actually Running

When you run `ollama run llama3.1`, here's what happens:

```
Your prompt
    |
    v
Ollama CLI  (user-facing tool)
    |
    v
Ollama server daemon  (runs in background on port 11434)
    |
    v
llama.cpp backend  (C++ inference engine, handles the math)
    |
    v
Model weights on disk  (~4.9GB file, loaded into RAM)
    |
    v
Apple Metal / CUDA / CPU  (hardware does the matrix math)
    |
    v
Generated tokens -> assembled into text -> returned to you
```

Ollama is essentially a friendly wrapper around **llama.cpp**, which is the
battle-tested open-source inference engine that powers most local AI tools.
Ollama adds model management, an API server, and automatic hardware detection on top.

---

## How Inference Works (Non-Technical Summary)

A language model is a very large lookup table of patterns learned from text.
When you send it a prompt, it does not "think" or "understand" in any human sense.
It predicts, token by token, what text is most likely to follow your input --
based purely on patterns in its training data.

Key implications:
- It has no memory between sessions unless you explicitly pass prior context
- It does not "know" things the way humans know things -- it has statistical associations
- It can be confidently wrong (this is called hallucination)
- The same prompt run twice may produce different outputs (there is randomness in sampling)
- It cannot learn from your conversations -- the weights on disk do not change

---

## What Ollama Does With Your Data

**Short answer: nothing. Your data never leaves your machine.**

- Prompts are processed entirely locally
- Responses are generated locally
- No telemetry, no logging to external servers (by default)
- Ollama Inc. does not receive your conversations
- The model on disk is a static file -- it does not update or transmit anything

This is the primary reason to use a local model for sensitive work.

**Caveat:** Ollama the software (not the models) does make network requests to:
- `ollama.com` to check for model updates and pull new models
- `ollama.com` possibly for version checks

If you need full air-gap operation (zero outbound network), you can block
outbound connections from Ollama after model download, and it will continue
to work for inference.

---

## The API: How Other Programs Talk to It

Ollama runs an HTTP server on `localhost:11434` by default.
It accepts JSON requests and returns JSON responses.

### Generate endpoint (simple, no memory)
```
POST http://localhost:11434/api/generate
{
  "model": "llama3.1",
  "prompt": "Your prompt here",
  "stream": false
}
```

### Chat endpoint (stateful conversation format)
```
POST http://localhost:11434/api/chat
{
  "model": "llama3.1",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help?"},
    {"role": "user", "content": "What is 2+2?"}
  ]
}
```

### OpenAI-compatible endpoint
Ollama also mirrors the OpenAI API format at `http://localhost:11434/v1`.
This means any library or tool built for OpenAI (LangChain, LlamaIndex, etc.)
can point to Ollama with minimal code changes.

---

## Hardware: What It Uses and How Much

### Memory (RAM)
The model must fit in RAM to run. If it doesn't fit, Ollama will either refuse
to load it or be extremely slow (swapping to disk).

| Model | Size on disk | RAM needed (headroom) |
|---|---|---|
| phi3 (3.8B) | ~2.4 GB | ~4 GB RAM |
| llama3.1 (8B) | ~4.9 GB | ~8 GB RAM |
| mistral (7B) | ~4.1 GB | ~6 GB RAM |
| llama3.1:70b | ~40 GB | ~48 GB RAM |

"RAM needed" is always higher than disk size because the model is loaded
in a working format that uses more space than the compressed file on disk.

### GPU (Apple Silicon)
On M1/M2/M3/M4 Macs, Ollama uses **Apple Metal** to offload computation to the GPU.
Because Apple Silicon has unified memory (RAM and GPU share the same pool),
the full model fits "on GPU" as long as you have enough total RAM.

This is why Apple Silicon Macs are unusually good at local inference --
a 16GB M2 runs an 8B model fully accelerated with no bottleneck.

On Intel Macs, there is no GPU offload (Metal only). Inference runs on CPU.

### CPU
CPU inference works but is slower: typically 3-10 tokens/second for a 7-8B model
on a modern laptop CPU, vs. 30-60+ tokens/second on Apple Silicon with Metal.

### Disk
Models are stored in `~/.ollama/models/`. Each model is a multi-gigabyte file.
Plan for 5-50 GB of disk usage depending on how many models you keep.

---

## Risks

### 1. Resource Consumption
Running inference is CPU/GPU and RAM intensive.
- On a MacBook, expect fan activity and reduced battery life during active inference
- The Ollama background service itself is lightweight when idle (~50MB RAM)
- Model loading (first request after idle) takes 5-15 seconds

**Mitigation:** Ollama unloads the model from memory after a period of inactivity
(default: 5 minutes). You can configure this with `OLLAMA_KEEP_ALIVE`.

### 2. No Authentication on the API
By default, the local API on `localhost:11434` has **no authentication**.
Any process running on your machine can send prompts to it.

This is acceptable for personal use, but means:
- A malicious browser extension or script could use your model without your knowledge
- Any local application you run can access the API

**Mitigation:** Do not expose port 11434 to the network (see below).

### 3. Network Exposure Risk
By default, Ollama only listens on `localhost` (127.0.0.1), meaning only
processes on your own machine can reach it. This is safe.

**However:** If you run `OLLAMA_HOST=0.0.0.0 ollama serve`, it becomes
reachable from your local network (and potentially the internet if you have
open firewall rules). Do not do this without authentication unless on a
fully trusted, isolated network.

For OpenWork contributor nodes, network exposure will need to be carefully
designed -- nodes need to receive tasks, but must not be openly exploitable.

### 4. Model Output is Unreliable
This is the most important risk for any production use.

Models hallucinate -- they produce plausible-sounding but factually wrong output.
This happens more with:
- Specific facts (dates, names, numbers)
- Niche or recent topics (the model's training data has a cutoff)
- Long chains of reasoning
- Tasks requiring precise technical accuracy

**For OpenWork:** This is why the verification layer is essential. Raw model output
cannot be trusted without checking. Every task output must pass verification
before being delivered to a submitter or triggering payment.

### 5. Model Licensing
The models themselves have separate licenses from Ollama.

| Model | License | Commercial use? |
|---|---|---|
| Llama 3.1 | Meta Llama 3.1 Community License | Yes, with conditions (>700M users requires Meta approval) |
| Mistral | Apache 2.0 | Yes, freely |
| Phi-3 | MIT | Yes, freely |
| CodeLlama | Meta Llama 2 Community License | Limited commercial use |
| Gemma | Google Gemma Terms | Yes, with conditions |

For most small/medium scale use, Llama 3.1 and Mistral are commercially usable.
If OpenWork becomes large-scale, Meta's Llama license requires review.

### 6. No Persistent Memory
The model has no memory between separate conversations by default.
Each new API call starts fresh.

To give a model "memory," you must:
- Pass prior conversation history in the messages array, OR
- Use a retrieval-augmented generation (RAG) system to inject relevant context

For OpenWork, this means task context (files, instructions, prior work) must be
explicitly included in every prompt sent to the model. This is a design constraint.

### 7. Context Window Limits
Every model has a maximum amount of text it can process at once (the context window).

| Model | Context window |
|---|---|
| llama3.1 (8B) | 128,000 tokens (~96,000 words) |
| mistral (7B) | 32,768 tokens (~24,000 words) |
| phi3 | 128,000 tokens |
| codellama | 16,384 tokens |

1 token ≈ 0.75 words in English.

If a task's combined input (instructions + context + files + history) exceeds
the context window, the model will either truncate input or error.

For large tasks (long documents, big codebases), this is a real constraint
that OpenWork's task decomposition layer must account for.

### 8. Determinism and Reproducibility
Model outputs are not deterministic by default -- the same input can produce
different outputs on different runs. This is controlled by the `temperature`
parameter (higher = more random, lower = more predictable).

Setting `temperature: 0` makes outputs deterministic, which is useful for
verification and testing. For creative or open-ended tasks, higher temperature
is appropriate.

---

## Limitations Summary

| Limitation | Details |
|---|---|
| Speed | 30-60 tok/s on Apple Silicon; 3-10 tok/s on CPU-only |
| Max input size | Capped at context window (32k-128k tokens depending on model) |
| No real-time knowledge | Training cutoff; knows nothing after that date |
| Hallucination | Confidently wrong answers, especially on specific facts |
| No learning | Weights don't update; model doesn't improve from use |
| No vision/audio | Text-only (unless using a multimodal model like llava) |
| Single-session memory | No memory across separate API calls without manual context injection |
| RAM constrained | Model must fit in available RAM |
| Concurrent requests | Ollama queues requests; it does not run two inferences in parallel on one model |

---

## What Ollama Is Good For (and What It Isn't)

### Good for:
- Summarizing documents
- Writing and editing assistance
- Code generation and explanation
- Question answering over provided context (RAG)
- Structured output generation (JSON, lists, etc.)
- Classification and labeling tasks
- Translation
- Offline / private AI use

### Not good for:
- Real-time information (news, stock prices, current events)
- Tasks requiring precise arithmetic (models are poor at math)
- High-stakes decisions without human verification
- Legal, medical, or financial advice without expert review
- Tasks requiring persistent memory across many sessions (without RAG)
- Extremely long documents that exceed context window in one pass

---

## Relevance to OpenWork

Understanding these constraints directly shapes OpenWork's design:

1. **Verification is non-negotiable** -- model output cannot be trusted without checking
2. **Task decomposition must respect context windows** -- large tasks must be chunked
3. **Context must be explicit** -- every task sent to a node must include all necessary context
4. **Speed matters for node economics** -- faster hardware earns more per unit time
5. **Model choice should match task type** -- routing should consider model capabilities
6. **No network exposure without auth** -- contributor nodes need a secure, authenticated endpoint

---

## Further Reading

- Ollama source code: https://github.com/ollama/ollama
- llama.cpp (the underlying engine): https://github.com/ggerganov/llama.cpp
- Llama 3.1 model card: https://ai.meta.com/blog/meta-llama-3-1/
- Mistral model info: https://mistral.ai/news/announcing-mistral-7b/
