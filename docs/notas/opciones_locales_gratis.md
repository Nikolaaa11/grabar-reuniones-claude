# Fully free local and DIY routes to record meetings and feed them to Claude (Windows 11 Home, Spanish), as of 2026-11-02

Method: stars, last push, license and last release were read directly from the GitHub API on 2026-11-02. Nothing was installed or run. Commercial notetakers' free tiers are out of scope. "Setup" ratings are my own judgment, not a sourced fact. The web search budget for this session ran out before the last few lookups, so those items are listed under Gaps instead of being worked around.

Context from this PC (read-only check on 2026-11-02, no tool executed): Intel Core Ultra 7 255HX, 31.4 GB RAM, NVIDIA GeForce RTX 5060 Laptop GPU plus Intel Graphics, Windows 11 Home Single Language. FFmpeg 9.0.2 (Gyan full build, installed through winget) is on PATH, and its local `README.txt` lists the `whisper` library and filter (whisper.cpp 1.9.4) and the input devices `dshow`, `lavfi` and `openal` (`README.txt de la instalación local de FFmpeg`). `whisper`, `whisper-cli`, `obs64`, `audacity`, `ollama` and `docker` are not on PATH (they could still be installed elsewhere), and pip lists no Whisper packages.

## 1. Local open-source meeting apps: Windows support, license, last release, maintenance, system audio plus microphone, Claude/MCP

### Takeaway
On Windows 11 Home the strongest zero-cost meeting app is Meetily Community (MIT, Windows installer, microphone plus system audio, Whisper or Parakeet with Spanish), but it has no MCP server and no speaker labels, so the transcript gets pasted into Claude by hand. Vibe is the closest alternative and adds diarization; Minutes has by far the best Claude integration but its Windows system-audio capture is unfinished; Anarlog is Hyprnote's current name and needs your own transcription server on Windows; screenpipe is no longer open source; Vexa and Scriberr are Docker projects that fit Windows Home poorly.

### Cited Findings

Comparison (GitHub figures as of 2026-11-02; "Setup" is my rating):

| App | Windows | License | Last release | Activity | Mic + system audio | Claude / MCP | Setup |
|---|---|---|---|---|---|---|---|
| [Meetily](https://github.com/Zackriya-Solutions/meetily) (32,381 stars) | Yes, x64 installer | MIT | v0.4.1, 2026-09-12 | Active | Yes, built in | No MCP; Claude only as API summarizer | Low |
| [Vibe](https://github.com/thewh1teagle/vibe) (7,994) | Yes, signed | MIT | v3.3.0, 2026-10-29 | Active | Yes, with a known sync bug | Claude API summaries, HTTP API, agent skills; no MCP found | Low |
| [StenoAI](https://github.com/stenolabs/stenoai) (1,355) | Alpha, unsigned | MIT | v0.8.0, 2026-10-03 | Active | Yes, `[You]`/`[Others]` | Skill for Claude Code, optional Anthropic key | Medium |
| [Minutes](https://github.com/silverstein/minutes) (1,584) | CLI and desktop assets | MIT | v0.31.1, 2026-10-27 | Very active | Mic yes; system audio partial on Windows | MCP (34 tools), Claude Code plugin (23 skills) | Medium |
| [Anarlog, ex-Hyprnote](https://github.com/fastrepl/anarlog) (9,745) | Beta, installer or Microsoft Store | MIT (community app) | desktop_v1.4.34, 2026-10-29 | Very active | "Microphone and computer audio" input; Windows specifics not stated | Local CLI and MCP, skill | Medium |
| [screenpipe](https://github.com/screenpipe/screenpipe) (22,208) | Yes, Windows 10+ | Source-available, not OSS | App v2.7.130, 2026-10-28 | Very active | Always-on screen and audio capture | MCP, Claude Desktop extension, skills | Low to medium |
| [Pensieve](https://github.com/lukasbach/pensieve) (117) | Yes, Setup.exe | No license declared | v1.0.20, 2026-05-30 | Slow | Records from local apps | Built-in MCP server | Low |
| [Vexa](https://github.com/Vexa-ai/vexa) (2,938) | Docker only | Apache-2.0 | v0.12.28, 2026-10-09 | Very active | Bot joins the call instead | MCP at `/mcp` | High |
| [Scriberr](https://github.com/rishikanthc/Scriberr) (3,130) | Docker only | MIT | v1.2.0, 2025-12-17 | Stalled, author says not abandoned | No system capture documented | No MCP found | High |

**Meetily**
- The repo was renamed from `meeting-minutes` to `meetily`; the Community Edition is MIT and "will remain free and open source" — [README](https://github.com/Zackriya-Solutions/meetily).
- Windows install is an `x64-setup.exe`; it needs an AVX2-capable CPU, the packaged Whisper uses Vulkan, and CUDA requires a source build — [README](https://github.com/Zackriya-Solutions/meetily). The vendor says releases ship as signed Windows and macOS installers — [meetily.ai](https://meetily.ai/open-source-ai-note-taker).
- "Capture microphone and system audio simultaneously with intelligent ducking and clipping prevention" — [README](https://github.com/Zackriya-Solutions/meetily); Windows-specific audio code exists — [windows.rs](https://github.com/Zackriya-Solutions/meetily/blob/HEAD/frontend/src-tauri/src/audio/devices/platform/windows.rs). No bot joins — [meetily.ai](https://meetily.ai/open-source-ai-note-taker).
- Summaries: Ollama recommended; Claude, Groq, OpenRouter and OpenAI-compatible endpoints also supported. Import of existing audio is in beta — [README](https://github.com/Zackriya-Solutions/meetily). Multi-language summaries arrived in v0.4.0 — [release](https://github.com/Zackriya-Solutions/meetily/releases/tag/v0.4.0).
- Spanish is in the language list — [languages.ts](https://github.com/Zackriya-Solutions/meetily/blob/HEAD/frontend/src/constants/languages.ts). A code comment says "Parakeet only supports auto-detection (doesn't support manual language selection)", so forcing `es` needs Whisper — [LanguageSelection.tsx](https://github.com/Zackriya-Solutions/meetily/blob/HEAD/frontend/src/components/LanguageSelection.tsx).
- Speaker identification and advanced exports (PDF, DOCX, Markdown) are listed as PRO advantages, speaker identification marked "Coming Soon" — [README](https://github.com/Zackriya-Solutions/meetily).
- GitHub code search for `mcp` hits only a lockfile and a vendored header, so I found no MCP server — [code search](https://github.com/search?q=repo%3AZackriya-Solutions%2Fmeetily+mcp&type=code).

**Hyprnote, now Anarlog (and Char)**
- "anarlog started as Hyprnote, then briefly used the char name", then split: Char is the team's current productivity app, Anarlog is the open-source notetaker in this repo, "not being retired", MIT. The README also says "The team is now building char", and enterprise components are commercially licensed — [README](https://github.com/fastrepl/anarlog). `fastrepl/hyprnote` now redirects to `fastrepl/anarlog` (GitHub API).
- Windows: "Windows and Linux support are in beta"; x64 installer or Microsoft Store — [download page](https://anarlog.so/download).
- Key limit: its built-in transcription needs Apple Silicon, so other platforms must set up a local transcription server or a hosted provider — [download page](https://anarlog.so/download). The capture input is "Microphone and computer audio" with no platform detail — [docs](https://docs.anarlog.so/models-and-providers).
- Local CLI and MCP work "without Cloud login, a Pro subscription, or completed Cloud Sync"; on Windows the CLI installs to `%LOCALAPPDATA%\Anarlog\bin\anarlog.exe`; Cloud MCP needs Pro — [setup reference](https://github.com/fastrepl/anarlog/blob/HEAD/skills/anarlog/references/setup.md). It also ships an agent skill — [SKILL.md](https://github.com/fastrepl/anarlog/blob/HEAD/skills/anarlog/SKILL.md).

**screenpipe**
- License is the "Screenpipe Commercial License": free for personal non-commercial, non-profit, educational or research use, and a 7-day evaluation; "Commercial Use" includes use "in a business or production environment" and "requires a paid Screenpipe Enterprise plan"; official builds are governed separately by its Terms of Service — [LICENSE.md](https://github.com/screenpipe/screenpipe/blob/HEAD/LICENSE.md). Third-party directories still call it MIT, which is stale — [playbooks.com](https://playbooks.com/mcp/mediar-ai-screenpipe).
- Pricing: Free $0 (capture, limited searchable history, limited scheduled workflows), Basic $21/month, Business $42/seat/month, Enterprise custom. Windows 10+, 600 MB to 4 GB RAM, about 30 GB storage per month — [pricing](https://screenpipe.com/pricing).
- MCP: `claude mcp add screenpipe -- npx -y screenpipe-mcp@latest` — [README](https://github.com/screenpipe/screenpipe). The stdio server's tools include list-meetings and activity-summary; a local Claude Desktop extension exists — [MCP README](https://github.com/screenpipe/screenpipe/blob/HEAD/packages/screenpipe-mcp/README.md).
- Product focus has shifted to "finds work worth automating in your company" (YC S26) — [README](https://github.com/screenpipe/screenpipe).

**Minutes (not in the brief, but the most Claude-native project found)**
- "free, open-source conversation memory app"; "MIT licensed and staying that way: no relicensing, no paid tier for anything in this repo"; stores local Markdown plus YAML; MCP with 34 tools and a Claude Code plugin with 23 skills — [README](https://github.com/silverstein/minutes). Windows assets exist (`minutes-windows-x64.zip`, desktop setup.exe) — [release](https://github.com/silverstein/minutes/releases/tag/v0.31.1), [install docs](https://github.com/silverstein/minutes/blob/HEAD/docs/install.md).
- Windows caveats: "Windows support (WASAPI audio capture) PARTIAL (core builds + tests pass on Windows CI; audio capture untested)" — [PLAN.md](https://github.com/silverstein/minutes/blob/HEAD/PLAN.md); "Windows is deferred, not blocked" in a design doc reviewed 2026-03-31 — [multi-source-capture.md](https://github.com/silverstein/minutes/blob/HEAD/docs/architecture/multi-source-capture.md). System audio is recognized by device name such as `vb-cable` or `stereo mix` — [capture.rs](https://github.com/silverstein/minutes/blob/HEAD/crates/core/src/capture.rs).
- Open Windows performance bug from a user forcing `es`: on an i7-10750H, small model, 20 s of audio took 49 s, "a one-hour meeting would take around 2.5 hours" — [issue #1256](https://github.com/silverstein/minutes/issues/1256). The Parakeet engine is not yet shipped on Windows — [issue #645](https://github.com/silverstein/minutes/issues/645). Language can be forced with `language = "es"`; default model `small` — [configuration](https://github.com/silverstein/minutes/blob/HEAD/docs/configuration.md).

**Vibe**
- Features include "Transcribe system audio", microphone, speaker diarization, Whisper, Nemotron 3.5 and Parakeet TDT v3, Claude API summaries, Ollama, CLI, "HTTP API with Swagger docs and agent skills", and phone recording by QR code — [README](https://github.com/thewh1teagle/vibe). v3.3.0 is "Signed and notarized on macOS and Windows" — [release](https://github.com/thewh1teagle/vibe/releases/tag/v3.3.0).
- Open bug: when recording both microphone and system audio on Windows, system audio loses silent gaps and drifts from the mic, though "may not be very noticeable during typical Teams, Google Meet, etc. meetings" — [issue #1592](https://github.com/thewh1teagle/vibe/issues/1592).

**StenoAI**
- Windows 10/11 is "alpha" with "system-audio loopback capture with `[You]`/`[Others]` diarisation", unsigned, transcription via Parakeet on onnx-asr with Whisper optional, CPU-only Ollama summaries; Parakeet TDT v3 lists Spanish; the app offers skill install prompts for Claude Code — [README](https://github.com/stenolabs/stenoai).

**Pensieve**
- Records "from locally running applications", bundled Whisper, Ollama or OpenAI summaries, "a built-in MCP server" — [README](https://github.com/lukasbach/pensieve). The GitHub API reports no license.

**Vexa, self-hosted**
- A visible bot joins Meet, Teams and Zoom; Apache-2.0; "Linux (Ubuntu 24.04) is the production target"; personal use is "Docker on your Mac, Linux, or Windows machine"; needs `make`, Docker engine v26 or later, and "Transcription is a separate GPU unit" or "a free hosted token at vexa.ai/account while testing"; MCP endpoint at `/mcp`; speaker attribution "is not guaranteed" — [README](https://github.com/Vexa-ai/vexa). Full MCP landed in v0.12.27 — [release](https://github.com/Vexa-ai/vexa/releases/tag/v0.12.27).
- Docker Desktop's WSL 2 requirements list Windows 11 Enterprise, Pro or Education, while a later note says "Windows Home or Education editions only allow you to run Linux containers", so Home support is implied rather than stated — [Docker docs](https://docs.docker.com/desktop/setup/install/windows-install/).

**Scriberr**
- Post-hoc transcription with Whisper, Parakeet and Canary, diarization, Ollama or OpenAI chat, folder watcher, PWA; install via Homebrew or Docker, no Windows installer documented. "TLDR the project isn't abandoned. I'll be starting development again this week" — [README](https://github.com/rishikanthc/Scriberr). That README commit is dated 2026-09-20; the previous code commits are from 2026-04-21 (GitHub API). RTX 50-series needs a separate Docker image — [README](https://github.com/rishikanthc/Scriberr).

**Post-hoc transcribers with a GUI (no capture of their own)**
- noScribe: GPL-3.0, Windows, Mac and Linux, offline, speaker labels via pyannote, built-in editor, v0.8 on 2026-10-06 — [README](https://github.com/kaixxx/noScribe). Installer about 3 GB; "One hour of interview takes about 1-3 hours of transcription time" — [noscribe.de](https://noscribe.de/en/). The author warns that noscribe(dot)ai is an unrelated paid service — [README](https://github.com/kaixxx/noScribe).
- aTrain: AGPL-3.0, Microsoft Store on Windows, faster-whisper plus pyannote speaker detection, v1.4.1 on 2026-01-28 — [README](https://github.com/aTrainTranscription/aTrain).
- Speakr: AGPL-3.0, self-hosted web app, v0.10.18-alpha on 2026-10-30 — [repo](https://github.com/murtaza-nasir/speakr).

**Dormant or not usable on Windows**
- Ecoute: Windows-only live transcript, last commit 2025-09-26, optional paid OpenAI key — [repo](https://github.com/SevaSk/ecoute). Treat as dormant.
- OpenOats requires Apple Silicon — [repo](https://github.com/yazinsai/OpenOats). Recap is macOS-native, last release 2025-08-07 — [repo](https://github.com/RecapAI/Recap). notekeeper is macOS — [repo](https://github.com/charle-com/notekeeper).

### Inferences
- For a non-technical user: Meetily or Vibe. Meetily is meeting-first; Vibe is transcription-first but adds diarization. For Spanish in Meetily, choose Whisper so `es` can be forced, since Parakeet there is auto-detect only.
- "Connects to Claude" inside Meetily, Vibe and StenoAI means an Anthropic API key, which is billed separately and is not covered by a Free plan, so those buttons are not zero-cost. Copying the transcript out is the free path.
- Minutes on Windows today looks like a good retrieval layer (MCP over Markdown) but not a dependable capturer. Expect to need a virtual audio device for system audio, based on the name matching in `capture.rs`.
- If the meetings are for a for-profit business, screenpipe's license language needs reading before use, even on the Free plan; the interaction between the license and the official-build terms is not clear to me.
- Star counts are not a safety or quality signal: Meetily's vendor page quoted 12.7K+ stars while the API now shows 32,381.

### Gaps
- Meetily Community's exact transcript export path (copy, TXT or SQLite) was not verified; PRO lists advanced exports.
- Which local transcription servers Anarlog accepts on Windows, and how hard that is, was not tested. Anarlog's Windows system-audio behavior is undocumented on the pages read.
- None of these apps has published Spanish accuracy data of its own.
- Vexa on Windows Home with WSL 2 has no documented walkthrough that I found.

## 2. Local transcription engines: hardware, speed, Spanish accuracy, speaker labels with pyannote

### Takeaway
Hardware is not the bottleneck on a GPU laptop: published figures put Whisper at roughly 4x to 60x real time on NVIDIA GPUs, and about real time on laptop CPUs with large models. Spanish accuracy on clean benchmarks is 3 to 5 percent WER for Whisper large-v3 and Parakeet v3 (vendor numbers), but one independent test on rural conversational Spanish gave 29 percent, and I found no Chilean-Spanish benchmark. pyannote needs a free Hugging Face account, accepting gated terms and a token; several apps avoid it with other diarizers.

### Cited Findings

| Engine / app | Last release | Windows route | Notes |
|---|---|---|---|
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (54,867 stars, MIT) | v1.9.5, 2026-10-06 | Prebuilt zips on rolling tags | CPU, Vulkan, CUDA, OpenVINO |
| [FFmpeg whisper filter](https://github.com/FFmpeg/FFmpeg/blob/HEAD/doc/filters.texi) | FFmpeg 8+ | [BtbN builds](https://github.com/BtbN/FFmpeg-Builds/blob/HEAD/scripts.d/50-whisper.sh); Gyan full build on this PC | Single binary plus a model file |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) (26,405, MIT) | v1.2.1, 2025-10-31 | Python | Last commit 2026-11-02 was a CI fix, so maintenance is light |
| [WhisperX](https://github.com/m-bain/whisperX) (25,012, BSD-2) | v3.8.6, 2026-05-25 | Python plus CUDA 12.8 | Word timestamps, pyannote diarization |
| [Buzz](https://github.com/chidiwilliams/buzz) (22,364, MIT) | v1.4.5, 2026-08-23 | Unsigned installer | GUI, mic live, file, watch folder, CLI |
| [Vibe](https://github.com/thewh1teagle/vibe) (7,994, MIT) | v3.3.0, 2026-10-29 | Signed installer | GUI, system audio, diarization |
| [Handy](https://github.com/cjpais/Handy) (37,048, MIT) | v0.10.0, 2026-11-02 | Installer or winget | Dictation, not meetings |
| [Parakeet TDT v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) | Model | ONNX via [onnx-asr](https://github.com/istupakov/onnx-asr) or apps | CC BY 4.0, 25 languages including es |

**Hardware**
- whisper.cpp model sizes (disk / memory): tiny 75 MiB / ~273 MB; base 142 MiB / ~388 MB; small 466 MiB / ~852 MB; medium 1.5 GiB / ~2.1 GB; large 2.9 GiB / ~3.9 GB — [README](https://github.com/ggml-org/whisper.cpp).
- faster-whisper GPU needs cuBLAS for CUDA 12 and cuDNN 9; no system FFmpeg required — [README](https://github.com/SYSTRAN/faster-whisper). WhisperX on Windows asks for CUDA toolkit 12.8 and "<8GB gpu memory for large-v2" — [README](https://github.com/m-bain/whisperX).
- Parakeet v3 needs at least 2 GB RAM to load; NeMo's preferred OS is Linux — [model card](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3). A 572 MB Parakeet build and a 1.6 GB large-v3-turbo are the sizes StenoAI lists — [README](https://github.com/stenolabs/stenoai).
- Integrated GPUs: whisper.cpp v1.8.3 notes "12x Performance Boost with Integrated Graphics" — [release](https://github.com/ggml-org/whisper.cpp/releases/tag/v1.8.3). Buzz offers Vulkan "on most GPUs, including integrated GPUs" — [README](https://github.com/chidiwilliams/buzz).
- whisper.cpp also gained Parakeet support in v1.9.0 — [release](https://github.com/ggml-org/whisper.cpp/releases/tag/v1.9.0). v1.9.5 has no attached binaries, while the same-day rolling tag has `whisper-bin-x64.zip`, BLAS and CUDA zips — [b5454](https://github.com/ggml-org/whisper.cpp/releases/tag/b5454). No prebuilt Vulkan zip appears in that list.

**Speed (multipliers are my arithmetic from the published times)**

| Test | Hardware | Time | Approx. real-time factor |
|---|---|---|---|
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper), 13 min, small, int8 | i7-12700K, 8 threads | 1m42s; batch 8: 51s | 7.6x; 15x |
| [whisper.cpp in the same table](https://github.com/SYSTRAN/faster-whisper), 13 min, small | i7-12700K | 2m05s | 6x |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper), 13 min, large-v2 | RTX 3070 Ti | 59s to 1m03s (2.9 to 4.5 GB VRAM); batch 8: 16s to 17s (4.5 to 6.1 GB) | 13x; 46x to 49x |
| [aTrain](https://github.com/aTrainTranscription/aTrain), 22 min, with speaker detection, large-v3 | Ryzen 6850U CPU | 26:12 | 0.84x |
| Same, large-v3-turbo | Ryzen 6850U; i7-8750H | 18:30; 19:16 | 1.2x; 1.1x |
| Same, large-v3 | i9-10940X CPU | 10:25 | 2.1x |
| Same, large-v3 | RTX 2080 Ti | 1:44 | 12.7x |
| Same, large-v3; turbo | RTX 2070 Max-Q | 5:59; 4:37 | 3.7x; 4.8x |
| [noScribe](https://noscribe.de/en/), one hour | Typical PC | 1 to 3 hours | 0.33x to 1x |
| [local-whisper-mcp](https://github.com/OrihuelaConde/local-whisper-mcp), author claim, turbo q8, Vulkan | RTX 3080 | one minute in about one second | about 60x |
| [WhisperX](https://github.com/m-bain/whisperX), project claim, large-v2 | GPU | n/a | 70x |
| [onnx-asr](https://github.com/istupakov/onnx-asr), Parakeet v2/v3, port author's benchmark | 9800X3D CPU; T4; RTX 5070 Ti TensorRT | n/a | 36x; 57x; 320x |

- aTrain's table also lists Distil large-v3, but its README describes distilled models (for example `faster-distil-english`) as "single-language only", so they are not an option for Spanish — [README](https://github.com/aTrainTranscription/aTrain).
- NVIDIA's own English-leaderboard RTFx is Parakeet 3332.74, Canary 749.00, Whisper large-v3 145.51, on unstated hardware — [arXiv 2509.14128](https://arxiv.org/html/2509.14128v2).

**Spanish accuracy**

| Model (NVIDIA paper, not independent) | FLEURS es | MLS es | CoVoST2 es |
|---|---|---|---|
| Canary-1B-v2 | 2.90 | 2.94 | 3.81 |
| Parakeet-TDT-0.6B-v3 | 3.45 | 4.39 | 3.41 |
| whisper-large-v3 | 3.12 | 4.89 | 4.32 |
| seamless-m4t-v2-large | 5.10 | 3.08 | 4.20 |

WER percent from appendix tables — [arXiv 2509.14128](https://arxiv.org/html/2509.14128v2). The Parakeet row matches the model card, which states no punctuation or capitalization and greedy decoding — [model card](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3).

- Independent: on COSER, a corpus of rural European Spanish, Whisper large-v3 was the best model tested, with mean WER 0.292; the authors report accuracy regardless of dialect or speaking rate, and "human supervision is still needed" — [San Martín et al., 2024](https://investigacion.unirioja.es/documentos/670967f4002d1b09ea0225fe).
- Open ASR Leaderboard: "OpenAI's Whisper Large v3 remains a strong multilingual baseline" and "Multilingual: Comes at the cost of single-language performance"; only five languages were benchmarked as of November 2025, and the post does not mention Spanish — [Hugging Face](https://huggingface.co/blog/open-asr-leaderboard).
- Chilean Spanish, low-confidence vendor blog only: high density of slang (po, cachai), fast delivery and elision, with large-v3 at about 3 to 6 percent on clean Spanish audio — [convertaudiototext](https://convertaudiototext.com/es/blog/spanish-transcription-guide).
- Practical settings: `whisper-cli` defaults to `-l en`, so Spanish must be set explicitly — [CLI README](https://github.com/ggml-org/whisper.cpp/blob/HEAD/examples/cli/README.md). In the FFmpeg filter a larger `queue` of 10 to 20 s gives "more accurate results using less CPU", with `vad_model` suggested alongside it — [filters.texi](https://github.com/FFmpeg/FFmpeg/blob/HEAD/doc/filters.texi). WhisperX has default Spanish alignment models — [README](https://github.com/m-bain/whisperX).

**Speaker labels**
- pyannote `community-1`: license CC-BY-4.0; gated ("You need to agree to share your Hugging Face information"), and accepting allows occasional emails; token passed at load; runs on CPU by default; can be cloned and then "works without internet connection" — [model page](https://huggingface.co/pyannote/speaker-diarization-community-1). The library itself is MIT, latest 4.0.7 on 2026-06-30 — [repo](https://github.com/pyannote/pyannote-audio). Telemetry is described as optional — [README](https://github.com/pyannote/pyannote-audio). `precision-2` is a paid hosted service with free credits — [model page](https://huggingface.co/pyannote/speaker-diarization-community-1).
- WhisperX diarization needs `--hf_token` and accepting the community-1 agreement — [README](https://github.com/m-bain/whisperX). Scriberr labels "Pyannote (accurate, needs HF token) or NVIDIA Sortformer (up to 4 speakers)" — [config dialog source](https://github.com/rishikanthc/Scriberr/blob/HEAD/web/frontend/src/components/transcription/TranscriptionConfigDialog.tsx).
- Alternatives whose docs mention no token: Vibe uses in-process `nemotron-diarize-rs` — [ARCHITECTURE.md](https://github.com/thewh1teagle/vibe/blob/HEAD/docs/ARCHITECTURE.md); Buzz uses an MSDD model — [docs](https://github.com/chidiwilliams/buzz/blob/HEAD/docs/docs/usage/5_speaker_identification.md); whisper-diarization uses NeMo — [repo](https://github.com/MahmoudAshraf97/whisper-diarization).
- Zero-ML option: whisper.cpp's `-di` does "stereo audio diarization" by channel, while `-tdrz` needs an English `small.en-tdrz` model — [CLI README](https://github.com/ggml-org/whisper.cpp/blob/HEAD/examples/cli/README.md), [README](https://github.com/ggml-org/whisper.cpp). Minutes' design uses stems for "you" vs "them" and adds pyannote only on the call stem — [design doc](https://github.com/silverstein/minutes/blob/HEAD/docs/architecture/multi-source-capture.md).

**App notes**
- Handy: "One tool, one job. Transcribe what you say and put it into a text box"; Whisper small to large or Parakeet V3 ("CPU-optimized") — [README](https://github.com/cjpais/Handy). v0.10.0 adds transcribing audio files and auto language detection — [release](https://github.com/cjpais/Handy/releases/tag/v0.10.0).
- Buzz on Windows: "App is not signed, you will get a warning"; live transcription is from the microphone; supports speaker identification, watch folder and CLI — [README](https://github.com/chidiwilliams/buzz).

**Dormant or partly closed Windows options**
- Const-me/Whisper: last release 1.12.0 on 2023-07-22, and the latest commit only updates the readme — [repo](https://github.com/Const-me/Whisper). Treat as abandoned.
- Purfview's standalone builds: the public Faster-Whisper-XXL release entry is dated 2024-03-27, and the newer Pro build (2025-11-07) is a "Special non-public version for the donators" — [repo](https://github.com/Purfview/whisper-standalone-win).

### Inferences
- This PC's RTX 5060 should run large-v3-turbo well above real time, judging from the 3070 Ti and 3080 figures. CUDA stacks may need care because Scriberr ships a separate image for RTX 50-series over CUDA and PyTorch compatibility; Vulkan-based tools (Meetily, Vibe, the FFmpeg filter if its build includes Vulkan, local-whisper-mcp) avoid that risk. Parakeet is the faster option if accuracy holds up on real audio.
- Default recommendation for Spanish: Whisper large-v3-turbo with the language forced to `es`, plus VAD, and a small test on a real meeting comparing against Parakeet v3. Without a GPU, use small or medium, or accept running large overnight.
- The gap between 3 to 5 percent on these benchmarks and 29 percent on rural interviews suggests real meetings will sit somewhere in between, depending on microphone, overlap and slang. These benchmarks appear to be mainly clean read speech (my understanding of those corpora), so do not quote them to the user as meeting accuracy.
- Summaries are more forgiving than verbatim transcripts: Claude can often repair errors from context, but names, figures and dates need human checking.

### Gaps
- No independent benchmark for Chilean Spanish or for multi-speaker Spanish meetings was found. A search for Chile-specific WER returned only blogs and unrelated dialect studies.
- No independent side-by-side of Whisper, Parakeet and Canary on Spanish was found; the table above is NVIDIA's.
- CPU figures for this PC's Core Ultra 7 255HX and VRAM use on an RTX 5060 were not measured, because nothing was run.
- pyannote `community-1` on Spanish meetings has no language-specific DER figure in what I read.

## 3. Pure recording on Windows: which tools actually capture the other participants?

### Takeaway
Without extra drivers, OBS Studio, Snipping Tool and Game Bar capture both the others and your microphone, as do the in-app loopback recorders in Q1. Sound Recorder does not capture the others; Audacity captures them but its docs give no way to add your mic at the same time; Clipchamp only captures a browser tab and stops at 30 minutes; FFmpeg has no WASAPI input, so it needs Stereo Mix or a virtual device.

### Cited Findings

| Tool | Captures others? | Your mic too? | Limits | Setup |
|---|---|---|---|---|
| Sound Recorder | No | Yes (mic only) | 3 hours per file | None |
| Snipping Tool | Yes | Yes | Records video; no limit found | None |
| Xbox Game Bar | Yes, the app in focus | Yes, off by default | Apps only; length setting | None |
| Clipchamp | Only a browser tab | Only with browser tab | 30 minutes | None |
| Audacity | Yes, via WASAPI loopback | Not documented | Needs active signal | Low |
| OBS Studio | Yes | Yes, by default | Learning curve | Low to medium |
| FFmpeg | Only with a loopback device | Yes | No WASAPI input | Medium to high |

- **Sound Recorder**: "record audio for up to three hours per recording file"; the FAQ only discusses the microphone — [Microsoft FAQ](https://support.microsoft.com/en-US/Windows/Apps/sound-recorder-app-for-windows-faq). "It is designed for microphone input only, so it cannot capture system audio" (community reply, Sep 2026, not official) — [Tech Community](https://techcommunity.microsoft.com/discussions/windows11/any-good-audio-recorder-for-windows-11-pc%EF%BC%9F/4555523/replies/4555532).
- **Snipping Tool**: system audio is a Screen recording setting that "works the same on Home and Pro"; microphone is a separate toggle; "Windows must actually be playing audio, and the output device can't be muted, or the recording will be silent" (guide updated 2026-10-10) — [Geek Rewind](https://geekrewind.com/how-to-turn-include-system-audio-when-recording-on-or-off-with-snipping-tool-in-windows-11/). Audio support reportedly arrived in version 11.2307.44.0 (search snippet; page returned 403 when opened) — [ElevenForum](https://www.elevenforum.com/t/record-screen-with-snipping-tool-app-in-windows-11.11190).
- **Xbox Game Bar**: "recording from the Windows 11 desktop or the File Explorer is not possible"; "Capture audio when recording a game" must be enabled; "By default, the microphone is disabled", toggled with Windows + Alt + M (2023 guide) — [IONOS](https://ionos.ca/digitalguide/server/configuration/screen-capture-windows-11). Length options are 30 minutes, 1, 2 (default) or 4 hours, though the same page also claims up to 8 hours — [Geek Rewind](http://geekrewind.com/how-to-set-the-max-recording-length-with-game-capture-in-windows-11). It needs microphone permission — [Guiding Tech](https://www.guidingtech.com/fix-windows-xbox-game-bar-mic-not-working).
- **Clipchamp**: "If you would like to use audio, select browser tab only"; "There is currently a 30-minute time limit on all screen recordings with audio" — [Clipchamp](https://clipchamp.com/en/blog/how-to-screen-record-audio). Multiple recordings are allowed for free — [Clipchamp](https://clipchamp.com/en/blog/screen-and-camera-record/).
- **Audacity**: set the host to Windows WASAPI and pick the output labelled "(loopback)"; it records "all desktop audio, including notification-pings"; the page gives no mic-plus-desktop steps — [Audacity support](https://support.audacityteam.org/basics/recording-desktop-audio). "Windows WASAPI host only records loopback when there is an active signal present" — [manual](https://manual.audacityteam.org/man/tutorial_recording_computer_playback_on_windows.html). A third-party blog suggests virtual mixing software for both sources (treat as unofficial) — [Swell AI](https://www.swellai.com/blog/how-to-use-audacity-to-record-mic-and-pc-audio). Audacity 4.0 was released 2026-09-03 (4.0.2 on 2026-11-02); its notes do not mention loopback, and "Macro Manager and the scripting pipe" are not available in 4.0 — [release notes](https://github.com/audacity/audacity/releases/tag/Audacity-4.0.0).
- **OBS Studio** (GPL-2.0, 33.0.1 on 2026-10-29 — [release](https://github.com/obsproject/obs-studio/releases/tag/33.0.1)): "By default, OBS Studio is set to capture your desktop audio and microphone" — [quick start](https://obsproject.com/kb/quick-start-guide). Per-application audio needs Windows 10 2004 or later, and global Desktop Audio should be disabled then to avoid echo; VB-Cable is the fallback for incompatible apps — [app audio guide](https://obsproject.com/kb/application-audio-capture-guide). Advanced mode can choose recorded tracks, and MKV "will not corrupt the whole file" if recording stops abruptly — [recording guide](https://obsproject.com/kb/standard-recording-output-guide). Automation: `--startrecording` and `--minimize-to-tray` — [launch parameters](https://obsproject.com/kb/launch-parameters); WebSocket is built in since OBS 28 — [remote control](https://obsproject.com/kb/remote-control-guide).
- **FFmpeg**: the documented input devices on Windows are `dshow`, `gdigrab`, `lavfi`, `openal` and `vfwcap`, with no WASAPI section — [indevs.texi](https://github.com/FFmpeg/FFmpeg/blob/HEAD/doc/indevs.texi); there is no WASAPI source file in `libavdevice` — [repo](https://github.com/FFmpeg/FFmpeg/tree/HEAD/libavdevice). A WASAPI input was proposed in 2021 — [trac mailing list](https://ffmpeg.org/pipermail/ffmpeg-trac/2021-September/059732.html). The classic DirectShow route uses `virtual-audio-capturer`, whose last release is v0.13.3 from 2023-06-20 — [screen-capture-recorder](https://github.com/rdp/screen-capture-recorder-to-video-windows-free).
- **Script-level alternative**: PyAudioWPatch adds WASAPI loopback to PyAudio, v0.2.12.9 on 2026-10-06 — [repo](https://github.com/s0d3s/PyAudioWPatch). Windows loopback applies to shared-mode streams; "exclusive-mode streams cannot operate in loopback mode" — [Microsoft Learn](https://learn.microsoft.com/windows/win32/coreaudio/loopback-recording).

### Inferences
- OBS is the most robust free recorder for the DIY path: separate tracks, a crash-tolerant container and command-line start. The Snipping Tool is the zero-install emergency option; run a short test first, because it depends on the output device not being muted.
- With headphones, a mic-only recorder hears nothing from the others. With speakers it picks them up as room sound, at lower quality and with echo risk.
- Stereo Mix depends on the audio driver, so check this PC before planning around FFmpeg `dshow`. If it is absent, a virtual cable means installing a driver, so OBS is simpler.
- Avoid Audacity 4 for automation, since the scripting pipe is gone in 4.0.

### Gaps
- Snipping Tool's maximum length and output format were not confirmed from a Microsoft page; I found no stated limit.
- Whether Audacity 4 keeps WASAPI loopback on Windows was not confirmed from release notes; the support page describes it without mentioning a version.
- Game Bar's actual limit is inconsistent across sources (4 hours, 8 hours, or none), and I found no current Microsoft page. Xbox support's page returned no usable content.
- FFmpeg trac ticket #9408's current status could not be read (blocked by an access check).

## 4. Built-in free recording in Zoom, Google Meet and Microsoft Teams, and free transcripts

### Takeaway
Zoom Basic is the only one of the three with free built-in recording, and it records locally. No platform gives a free full transcript: Zoom Basic gets three AI summaries a month and optional caption files on local recordings, free Google accounts are not on Meet's lists for recording or transcripts, and secondary sources say Teams free has neither. The zero-cost transcript comes from running Whisper on the recording, or from saving Meet captions with an open-source extension.

### Cited Findings

| Platform | Free recording? | Free transcript? | Notes |
|---|---|---|---|
| Zoom Basic | Yes, local, desktop app only | No; captions VTT possible | 3 AI summaries a month |
| Google Meet, free account | Not listed | Not listed | Captions are the only route |
| Teams free | No | No | Recording needs a paid Microsoft 365 plan |

**Zoom**
- Local recording "is available to both free and paid subscribers"; needs the desktop app on Windows, macOS or Linux, is not supported on iOS or Android, and depends on host permission; files can include video, audio, chat and closed captions, with captions saved as VTT by an optional setting — [Zoom support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063640).
- Cloud-recording audio transcripts need "A Pro, Business, Education, or Enterprise account"; Spanish is in the supported list — [Zoom support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064927).
- A notetaker vendor's analysis says: Meeting transcript "No" on Basic; live captions show on screen but are not saved; "Captions can't be saved anymore. Zoom stopped that in May 2026" (rollout May 24 to 26); "Recordings saved to your computer get no transcript from Zoom", except a VTT file if live captions ran and "Save closed caption as a VTT file" was on; summaries for "3 hosted meetings a month" — [Scribbl, a competitor](https://www.scribbl.co/post/zoom-meeting-transcription).
- TechCrunch (Dec 2025): Basic gets AI Companion in three meetings a month with summary, in-meeting questions and note-taking, and 20 questions — [TechCrunch](https://techcrunch.com/2025/12/15/zoom-brings-its-ai-assistant-to-the-web-with-access-to-free-users/). One source says the "AI Companion" name was retired in June 2026 for "Zoom AI" — [Rework](https://resources.rework.com/libraries/ai-terms/what-is-zoom-ai-companion).
- A forum user on Basic reports transcripts stopping around 30 to 40 minutes (anecdotal) — [Zoom Community](https://community.zoom.com/ai-companion-21/what-are-the-limits-of-ai-companion-basic-for-meeting-transcriptions-79537).

**Google Meet**
- Recording editions: Business Plus, Business Standard, Essentials, Education Plus (staff), Enterprise Essentials, Plus, Standard and Starter, Teaching and Learning Upgrade, Workspace Individual, and "Google One subscribers with 2 TB or more storage space". Free personal accounts are not listed — [Google support](https://support.google.com/meet/answer/9308681?hl=en).
- Transcripts: Business Standard, Business Plus, Enterprise Starter, Standard and Plus, Teaching and Learning Upgrade, Education Plus, Workspace Individual; Spanish is supported — [Google support](https://support.google.com/meet/answer/12849897?hl=en).
- Open-source workaround: TranscripTonic (MIT, 235 stars, pushed 2026-10-31, v3.4.4) downloads a text file at the end of each Meet by reading Meet's captions, the language follows the caption setting, processing and storage stay in the browser except anonymous errors and a timestamp, Zoom and Teams are in beta, and "New errors caused by Google Meet updates" can lose a transcript — [repo](https://github.com/vivek-nexus/transcriptonic).

**Microsoft Teams**
- Official recording article names organizational licenses (Office 365 Enterprise E1, E3, E5, F3, A1, A3, A5, Microsoft 365 Business, Business Premium, Business Essentials), and guests or people from another organization cannot record — [Microsoft support](https://support.microsoft.com/en-us/office/record-a-meeting-in-microsoft-teams-34dfbe7f-b07d-4a27-b4c6-de62f1348c24).
- "In November 2025, Microsoft added meeting recording for users with a Microsoft 365 Personal or Family subscription"; "Without an M365 subscription, recording is still unavailable"; transcription is not in the free plan — [Flat.social, March 2026](https://flat.social/guides/microsoft-teams-pricing).
- A volunteer moderator confirmed in July 2026 that recording was enabled for personal accounts in December of the previous year and "requires Microsoft 365 subscription", while a Family subscriber in the same thread reported no record menu — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/5540161/cant-make-recording-meeting-on-microsoft-365-famil).

### Inferences
- Practical answer for a free user on any platform: capture on the PC (Q3 or Q1 apps) and transcribe locally. Zoom's local recording is the cleanest input when you host, since it avoids OS routing.
- When you are not the host on Zoom, local recording needs the host's permission, while OS-level capture does not ask anyone, which is a consent matter (see Q8 Gaps).
- TranscripTonic gives speaker-attributed text for Meet cheaply, but accuracy depends on Meet's captions rather than Whisper, and it is fragile against UI changes.

### Gaps
- I could not open Microsoft's "Manage meeting and call recordings in Teams free" article (search budget exhausted), and Microsoft's compare page timed out, so the Teams free status rests on secondary sources plus Microsoft's licensed-recording article.
- Zoom's own plan page for Basic was not read. The Zoom Community thread with a staff answer about Basic summaries (October 2026) appeared only as a truncated page. Sources on Basic AI features conflict in wording.
- Whether "Save closed caption as a VTT file" works on a Basic account in Spanish today needs a real test.
- Whether free personal Google accounts get base Meet captions in Latin American Spanish was not confirmed; the captions page read covers translated captions, whose list has only "Spanish (Spain)" — [Google support](https://support.google.com/meet/answer/9300310?hl=en).

## 5. Phones and in-person meetings

### Takeaway
For in-person meetings a phone is the simplest free recorder. iPhone Voice Memos (iPhone 12 or later) and Samsung Voice Recorder (select Galaxy models) produce free Spanish transcripts that can be shared as text; Google Recorder does too on Pixel 6 and later, but without Spanish summaries. Claude does not list audio among uploadable file types, so send text, or pass the audio through a local transcriber first.

### Cited Findings
- **iPhone Voice Memos**: Apple says transcription works on iPhone 12 or later, lists Spanish among its languages, and warns it is not available in every country or region (Apple text as returned by search; the page body did not load when fetched) — [Apple Support](https://support.apple.com/guide/iphone/view-a-transcription-iph00953a982/ios).
- Copying is by "Tap and hold the transcript to copy it, or tap Share", on-device, iOS 18 or later (commercial vendor's blog) — [Spokenly](https://spokenly.app/blog/voice-memo-to-text-iphone).
- Apple's availability page lists Notes "Audio Transcription" with "Spanish", Phone "Call Transcription" with Spanish (Mexico, United States) only, and Apple Intelligence Notes transcription summaries including "Spanish (Chile)". It has no Voice Memos entry — [Apple](https://www.apple.com/ios/feature-availability/).
- **Google Recorder**: live transcription on Pixel 6 and later includes "Spanish" and "Spanish (Latin America)"; Pixel 3 to 5a list no Spanish; re-transcribe lists Spanish (Spain and United States) and "may process audio files on Google servers"; summaries (Pixel 8 and later) do not list Spanish — [Pixel Help](https://support.google.com/pixelphone/answer/16267698?hl=en).
- **Samsung Voice Recorder**: Galaxy AI features are on "select phones and tablets running Android 14 with One UI 6.1 or higher"; Transcript Assist includes Spanish; transcripts can be shared as "Voice file or Text file"; "Galaxy AI basic features provided by Samsung are free", while enhanced and third-party features "may be subject to fees" — [Samsung US](https://www.samsung.com/us/support/answer/ANS10000942/). Another regional page lists "Spanish (Spain/Mexico/US)", names S24, S25, S26, Z Fold, Z Flip and A series, adds a summary function, and suggests checking the internet connection when errors occur — [Samsung AE](https://www.samsung.com/ae/support/mobile-devices/how-to-use-transcript-assist-speech-to-text-and-transformation/).
- **Into Claude**: official uploads cover PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON and XLSX, plus images; 500 MB per file and up to 20 files per chat, 30 MB per project file; audio is not listed — [Claude help](https://support.claude.com/en/articles/8241126). Third-party claims that projects accept MP3 or WAV are unverified — [AI wiki](https://artificial-intelligence-wiki.com/ai-tools/claude/claude-file-upload-guide/); a transcription vendor says audio is not in the supported list — [Sonix](https://sonix.ai/ai/can-claude-transcribe-audio/).
- **Phone audio into PC tools**: Vibe can "Record from your phone: scan a QR code once, then your computer does the transcribing", with nothing to install from an app store — [README](https://github.com/thewh1teagle/vibe). Minutes watches a folder and documents iPhone to Windows sync through iCloud for Windows, Dropbox or Google Drive — [docs](https://github.com/silverstein/minutes/blob/HEAD/docs/phone-voice-memo-pipeline.md). local-whisper-mcp reads WAV, Ogg Opus and MP3 alone, and M4A or FLAC with ffmpeg on PATH — [README](https://github.com/OrihuelaConde/local-whisper-mcp).

### Inferences
- If the phone's transcript is poor, keep the audio file and re-run it on the PC with large-v3-turbo. That also yields better punctuation and an editable SRT.
- Phone transcripts have no reliable speaker labels in what I read, so ask Claude to infer speakers from context only with a warning that the attribution is a guess.
- The iPhone route is the lowest-effort path if the owner has an iPhone 12 or later, since Voice Memos needs no setup at all.

### Gaps
- Whether Voice Memos transcription works under a Chilean region setting was not confirmed. Apple says it is not in all regions, and its availability page has no Voice Memos row.
- Samsung's Chile page and its Spanish variants were not read. Regional pages differ, and it is not stated whether Transcript Assist is on-device or has duration limits.
- Google Recorder's text export was not read (it is in a linked "Save & share" article), and Pixel availability in Chile was not checked.

## 6. Free cloud routes

### Takeaway
Colab is the best free cloud fallback for a machine without a GPU, but its GPU access is not guaranteed. Groq's free tier is the fastest API path but sends audio to a third party. Hugging Face ZeroGPU quotas are small. Word's Transcribe is not free (it needs Microsoft 365), and Google Docs voice typing is free but takes only live microphone input.

### Cited Findings

| Route | Cost | Hard limits | Spanish | Fit for meetings |
|---|---|---|---|---|
| Google Colab with Whisper | Free tier | GPU not guaranteed; up to 12 h; idle timeout | Yes, Whisper | Fair |
| Hugging Face ZeroGPU Spaces | Free tier | 2 min a day anonymous, 5 min a day free account | Yes, Whisper | Weak for long files |
| Groq API | Free tier | 25 MB per file; 28,800 audio s a day | "Multilingual" | Good if cloud is acceptable |
| Word Transcribe | Needs Microsoft 365 | 300 min a month | Yes | Not free |
| Google Docs voice typing | Free | Live mic only | Includes Spanish (Chile) | Weak |

- **Colab**: free notebooks "can run for at most 12 hours"; "access to expensive resources like GPUs is heavily restricted"; "Colab does not publish these limits"; "Runtimes will time out if you are idle"; on free runtimes, "bypassing the notebook UI to interact primarily via a web UI" is disallowed, which rules out running web UIs as the main interface — [Colab FAQ](https://research.google.com/colaboratory/faq.html). A ready notebook exists for Whisper plus NeMo diarization — [whisper-diarization](https://github.com/MahmoudAshraf97/whisper-diarization) (5,673 stars, pushed 2026-08-15).
- **Hugging Face**: daily GPU quota is 2 minutes unauthenticated, 5 minutes on a free account, 40 on PRO; the default function runtime is 60 seconds — [ZeroGPU docs](https://huggingface.co/docs/hub/spaces-zerogpu). The `hf-audio/whisper-large-v3` Space uses batch size 8 and a bare `@spaces.GPU` — [app.py](https://huggingface.co/spaces/hf-audio/whisper-large-v3/raw/main/app.py). Browser-only Whisper Web runs locally but was last pushed in October 2024 — [repo](https://github.com/xenova/whisper-web).
- **Word Transcribe**: "Transcribe only works on the new Microsoft Edge and Chrome"; "Microsoft 365 subscription" gets "a maximum of 300 minutes of uploaded audio per month", a Copilot license 30,000; Spanish (Spain) and Spanish (Mexico) are among 80+ locales — [Microsoft support](https://support.microsoft.com/en-us/office/transcribe-your-recordings-7fc2efec-245e-45f0-b053-2a97531ecf57). "To use Microsoft Word's transcription feature, you'll need a Microsoft 365 subscription" — [How-To Geek, 2023](https://www.howtogeek.com/883209/how-to-use-microsoft-words-hidden-transcription-feature/). Dictate (live voice) is "free to use, although it requires having a Microsoft account" — [RCPmag, 2020](https://rcpmag.com/articles/2020/08/26/microsoft-365-transcription-dictation.aspx).
- **Google Docs voice typing**: works on latest Chrome, Edge or Safari with a microphone; Spanish (Chile) and Spanish (Latin America) are among the listed variants — [Google support](https://support.google.com/docs/answer/4492226?hl=en).
- **Groq**: `whisper-large-v3` and `whisper-large-v3-turbo` show 20 RPM, 2K requests a day, 7.2K audio seconds an hour and 28.8K a day, described as "base limits for the Developer plan" — [rate limits](https://console.groq.com/docs/rate-limits). Max file size "25 MB (free tier), 100MB (dev tier)"; paid price $0.04 to $0.111 per hour — [speech-to-text docs](https://console.groq.com/docs/speech-to-text).

### Inferences
- On this PC, cloud routes add risk without a benefit, since the local GPU should be enough. They matter for lower-end machines or as a one-off fallback.
- A one-hour mono recording at about 32 kbps is about 14 MB, which fits Groq's 25 MB limit; 28,800 audio seconds is 8 hours a day. This is my arithmetic.
- Google Docs voice typing could only take meeting audio via a virtual cable routed into its mic input; with no timestamps or speakers, it is a last resort.
- Cloud routes send confidential meeting audio to third parties, so disclose that to participants and check the provider's data terms, which I did not review.

### Gaps
- Groq's rate-limit page does not label these numbers as free tier explicitly; confirm on the account's limits page.
- Current Colab GPU availability from Chile and session length in practice were not tested; Google publishes no numbers.
- ZeroGPU's practical cap for long audio in the Whisper Space was not tested; the 60-second default suggests long files may fail.
- NotebookLM and Google AI Studio (Gemini free tier) as transcription routes could not be verified, because the search budget ran out.

## 7. Community extensions: MCP servers and Claude Code skills

### Takeaway
The credible integrations are app-backed (Minutes, screenpipe, Anarlog, Vexa). Standalone Whisper MCP servers are small and young, with low adoption, and they transcribe files rather than record. The one that fits Windows best, local-whisper-mcp, is 1 star and under a month old. None was audited here, and all of them run with your user permissions.

### Cited Findings

**App-backed (more credible; repo stars and pushes as of 2026-11-02)**

| Project | Stars | Last push | What it gives Claude | Windows |
|---|---|---|---|---|
| [silverstein/minutes](https://github.com/silverstein/minutes) | 1,584 | 2026-11-02 | 34 MCP tools over local Markdown; 23-skill Claude Code plugin | Yes, capture partial |
| [screenpipe/screenpipe](https://github.com/screenpipe/screenpipe/blob/HEAD/packages/screenpipe-mcp/README.md) | 22,208 | 2026-11-02 | Search screen and audio history, list meetings | Yes; license limits |
| [fastrepl/anarlog](https://github.com/fastrepl/anarlog/blob/HEAD/skills/anarlog/references/mcp.md) | 9,745 | 2026-11-01 | Read meetings and transcripts; local proposal tools; skill | Yes, beta |
| [Vexa-ai/vexa](https://github.com/Vexa-ai/vexa) | 2,938 | 2026-11-02 | Send bots, read transcripts through `/mcp` | Docker |
| [thewh1teagle/vibe](https://github.com/thewh1teagle/vibe) | 7,994 | 2026-10-30 | HTTP API and agent skills | Yes |
| [stenolabs/stenoai](https://github.com/stenolabs/stenoai) | 1,355 | 2026-10-29 | Skill install for Claude Code | Alpha |
| [lukasbach/pensieve](https://github.com/lukasbach/pensieve) | 117 | 2026-05-30 | Built-in MCP server | Yes; no license |

**Standalone transcription MCP servers**

| Project | Stars | Last push | What it does | Windows / cost |
|---|---|---|---|---|
| [OrihuelaConde/local-whisper-mcp](https://github.com/OrihuelaConde/local-whisper-mcp) | 1 | 2026-10-31 | whisper.cpp; `transcribe`, `status`, `delete_models`; default `large-v3-turbo-q8_0`; created 2026-10-08, v1.0.0 | Windows `.mcpb` and zip; Vulkan; no Python; free |
| [nhatvu148/video-transcriber-mcp-rs](https://github.com/nhatvu148/video-transcriber-mcp-rs) | 19 | 2026-11-01 | whisper.cpp; video URLs via yt-dlp | Windows zip; free |
| [BigUncle/Fast-Whisper-MCP-Server](https://github.com/BigUncle/Fast-Whisper-MCP-Server) | 17 | 2025-03-22 | faster-whisper, batch | `start_server.bat`; no license; stale |
| [SmartLittleApps/local-stt-mcp](https://github.com/SmartLittleApps/local-stt-mcp) | 20 | 2025-06-03 | whisper.cpp | Stale; Windows not verified |
| [jwulff/whisper-mcp](https://github.com/jwulff/whisper-mcp) | 3 | 2026-10-20 | whisper.cpp | macOS only |
| [kachiO/mlx-whisper-mcp](https://github.com/kachiO/mlx-whisper-mcp) | 24 | 2025-06-09 | MLX Whisper | Apple only; stale |
| [arcaputo3/mcp-server-whisper](https://github.com/arcaputo3/mcp-server-whisper) | 60 | 2026-05-02 | OpenAI API; "no longer maintained", moved to [TJC-LP/sanzaru](https://github.com/TJC-LP/sanzaru) (6 stars) | Paid API key |
| [chicogong/ffvoice-engine](https://github.com/chicogong/ffvoice-engine) | 3 | 2026-09-15 | Offline Whisper and diarization with MCP | Not checked |
| [bis-code/groq-whisper-mcp](https://github.com/bis-code/groq-whisper-mcp) | 1 | 2026-06-08 | Groq-hosted Whisper | Cloud |
| [fbossiere/open-transcribe-mcp](https://github.com/fbossiere/open-transcribe-mcp) | 1 | 2026-10-28 | Microsoft MAI, ElevenLabs, Groq | Cloud |

**Claude Code skills and plugins** (all very low adoption; none audited)

| Project | Stars | Last push | What it does |
|---|---|---|---|
| [dutchbase/video-audio-transcriber](https://github.com/dutchbase/video-audio-transcriber) | 0 | 2026-06-26 | faster-whisper, on-device, WSL-aware |
| [valerymad/transcribe-media-local](https://github.com/valerymad/transcribe-media-local) | 1 | 2026-06-23 | Local Whisper; `openai` backend on Windows |
| [ljniox/claude-skill-transcribe](https://github.com/ljniox/claude-skill-transcribe) | 0 | 2026-03-25 | Diarization via Groq, OpenAI or AssemblyAI |
| [Justin2259/claude-skill-meeting-notes-to-actions](https://github.com/Justin2259/claude-skill-meeting-notes-to-actions) | 0 | 2026-04-25 | Transcript to action items |
| [tomoaid/claude-plugin](https://github.com/tomoaid/claude-plugin) | 0 | 2026-06-12 | Recording, voiceprint transcript, minutes (Traditional Chinese) |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/blob/HEAD/meeting-insights-analyzer/SKILL.md) | 78,572 (list) | 2026-09-18 | `meeting-insights-analyzer`: behavior patterns from transcripts |

- macOS-only automation examples: meeting-scribe runs ffmpeg, whisper.cpp and a summarize step — [pkg.go.dev](https://pkg.go.dev/github.com/krischandran/meeting-scribe); meeting-assist records system audio, uses AssemblyAI and ships a Claude Code skill — [PyPI](https://pypi.org/project/meeting-assist/).
- Skill directories list generic Whisper skills without Windows coverage — [skillselion](https://skillselion.com/skills/spillwavesolutions/whisper-transcribe), [claudepro.directory](https://claudepro.directory/skills/audio-transcription-summarization). A pattern page warns that such a skill "fails silently" if Whisper or ffmpeg are missing — [agentpatterns](https://agentpatterns.ai/tools/claude/video-transcript-skill/).
- PulseMCP's "whisper" search returns only community servers (MacWhisper, Listen, Whisper, FFVoice, Voice Recorder, Local Speech-to-Text and others), with low traffic and none specifically about meetings — [PulseMCP](https://www.pulsemcp.com/servers?q=whisper). GitHub repo search for "meeting recorder mcp" returned nothing, though that search also missed Minutes, so absence is weak evidence.

**Risks of unvetted third-party code**
- Anthropic: "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk" — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp). A desktop extension "runs locally with your user permissions" and can access what you can access — [Claude docs](https://claude.com/docs/connectors/custom/desktop-extensions).
- Real incident: `postmark-mcp`, an unofficial npm package, behaved for 15 versions, then v1.0.16 added one line that blind-copied outgoing emails to an attacker's server; it was removed from npm, but installed copies kept running — [Security Boulevard, Sept 2025](https://securityboulevard.com/2025/09/malicious-mcp-server-found-quietly-stealing-emails/).
- Ecosystem data: OX Security (April 2026) traced ten CVEs to a systemic STDIO transport flaw, and nine of eleven public MCP marketplaces accepted its proof-of-concept malicious servers (secondary report) — [HackerNoon, May 2026](https://hackernoon.com/lite/mcp-servers-are-a-supply-chain-you-have-not-inventoried-yet).
- Distribution risks seen here: unsigned Windows builds (Buzz, StenoAI); an impostor domain warned about by noScribe's author; `@latest` in screenpipe's quick start; Pensieve and some MCP repos without a declared license. Separately, Scriberr, WhisperX and Pensieve READMEs carry Recall.ai sponsor links, which is a possible bias signal rather than a security issue.

### Inferences
- Lowest-risk integrations, in order: no third-party MCP at all (FFmpeg filter plus plain text files, or Claude Code reading a folder); an established, actively developed app with a local CLI (Anarlog, Minutes); a reviewed small server pinned to a version and hash (local-whisper-mcp publishes SHA256 sums, and its `LOCAL_WHISPER_ALLOWED_ROOTS` can narrow readable folders, but the code is unaudited and the author unknown to me).
- Pin versions rather than `@latest`, since version updates are what enabled the postmark-mcp attack. Prefer tools that work offline after model download, and block their network access once installed if possible.
- Meeting transcripts are untrusted input too: anything said in a meeting becomes text Claude reads, so avoid running transcripts through a session with broad tools or auto-approval.

### Gaps
- No code review of any repository was done, in line with the read-only brief. Stars and activity are not evidence of safety.
- Glama, Smithery and mcp.so were not systematically searched, since the search budget ended; a popular server could be missing.

## 8. Can Claude Code orchestrate the whole pipeline on Windows? Simplest realistic pipeline and true cost

### Takeaway
Yes, technically: Claude Code runs natively on Windows and can drive command-line tools, but the Free plan does not include it, so a "100 percent free" pipeline cannot use Claude Code. The fully free version is local recording and transcription plus the Claude Free app, either by pasting the transcript or through a local desktop extension. I found no documented Windows example joining ffmpeg, Whisper and Claude Code end to end, so the sketch below is untested.

### Cited Findings
- "Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access." Native Windows needs no admin rights; without Git for Windows it runs shell commands through the PowerShell tool; requires Windows 10 1809 or later and 4 GB+ RAM — [setup docs](https://code.claude.com/docs/en/setup). Native Windows has no sandboxing — [setup docs](https://code.claude.com/docs/en/setup).
- Free plan: "Limited usage" every 5 hours and every week; Claude Code "No"; Connectors "Yes"; Desktop extensions "Yes"; Pro is $17 a month with annual billing ($200 up front) or $20 monthly — [pricing](https://claude.com/pricing).
- Free can add one custom remote connector — [Claude help](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp). A `.mcpb` desktop extension runs "on your device inside Claude Desktop" and is installed from Settings > Extensions when "signed in to claude.ai", with no plan gate stated — [Claude docs](https://claude.com/docs/connectors/custom/desktop-extensions).
- local-whisper-mcp documents exactly this flow: install the `.mcpb` in Claude Desktop, then ask "Transcribe `C:\Users\me\Recordings\meeting.m4a` and summarize the decisions"; `claude mcp add local-whisper -e LOCAL_WHISPER_LANGUAGE=es -- PATH_TO_EXECUTABLE` for Claude Code — [README](https://github.com/OrihuelaConde/local-whisper-mcp).
- FFmpeg documents this transcription command: `ffmpeg -i input.mp4 -vn -af "whisper=model=...:language=en:queue=3:destination=output.srt:format=srt" -f null -` — [filters.texi](https://github.com/FFmpeg/FFmpeg/blob/HEAD/doc/filters.texi). The filter requires a build with `--enable-whisper` — [filters.texi](https://github.com/FFmpeg/FFmpeg/blob/HEAD/doc/filters.texi). Whisper model files are published at [Hugging Face](https://huggingface.co/ggerganov/whisper.cpp/tree/main) (link also in the local README noted at the top).
- Precedent on this machine: the user's skill `subtitulos-reels/scripts/transcribir.py (skill local del usuario)` already wraps faster-whisper with language, vocabulary and CUDA-to-CPU fallback, but needs `pip install faster-whisper`, which its docs say requires user authorization, and it is not installed now. This research session itself ran PowerShell and Bash commands through Claude Code on this PC.
- Documented near-matches are macOS: meeting-scribe and meeting-assist — [pkg.go.dev](https://pkg.go.dev/github.com/krischandran/meeting-scribe), [PyPI](https://pypi.org/project/meeting-assist/). Cross-platform agent recording exists in Minutes (`minutes record`, then `minutes stop`, with Windows capture caveats) — [README](https://github.com/silverstein/minutes).
- Consent features or notices exist in some tools: Minutes has "Consent reminders, acknowledgement, and provenance" — [README](https://github.com/silverstein/minutes). TranscripTonic says compliance with laws is the user's responsibility — [repo](https://github.com/vivek-nexus/transcriptonic).

### Inferences

**Simplest realistic pipeline (sketch only, not run; check names and paths on the machine)**

```powershell
# 1. Record desktop audio and mic (OBS profile with MKV and tracks: 1 = mix, 2 = mic, 3 = desktop)
obs64.exe --minimize-to-tray --startrecording
# Stop from the tray icon, or through OBS WebSocket.

# 2. Extract 16 kHz mono audio from the mix track
ffmpeg -i reunion.mkv -map 0:a:0 -vn -ac 1 -ar 16000 reunion.wav

# 3. Transcribe in Spanish with FFmpeg's whisper filter (Gyan full build on this PC lists it)
ffmpeg -i reunion.wav -vn -af "whisper=model=ggml-large-v3-turbo-q8_0.bin:language=es:queue=20:destination=reunion.srt:format=srt" -f null -

# 4A. Claude Code (paid plan): summarize into a file
claude -p "Lee reunion.srt y escribe reunion_resumen.md con decisiones, tareas y responsables. No inventes hablantes."
# 4B. Claude Free: drag reunion.srt or a .txt into the chat, or paste it.
```

- Step 3's model path needs care on Windows, because colons in filter arguments must be escaped; keeping the model beside the audio avoids that. Whether this build uses the GPU by default was not verified (the filter's `use_gpu` defaults to true per the docs, but GPU backends depend on the build).
- For "you vs. others" labels without pyannote, transcribe tracks 2 and 3 separately and have Claude merge by timestamp, or mix them to a stereo file and use `whisper-cli -di`.
- Claude Code can wrap all of this into one skill, with the permission to run those commands and a fixed output folder.

**True cost**

| Item | Cost | Notes |
|---|---|---|
| Recording (OBS, Snipping Tool, Meetily, Zoom local) | $0 | Time to configure and test |
| Transcription, local | $0 | Model download about 1.6 GB for turbo or 572 MB for Parakeet; PC busy during the job |
| Disk | $0 | 16 kHz mono WAV is about 115 MB per hour (my arithmetic); video recordings much more |
| Claude Free: paste or upload text | $0, with limits | Unpublished 5-hour and weekly limits; a one-hour meeting is roughly 9,000 words, perhaps 15,000 to 20,000 tokens (my estimate) |
| Claude Desktop with a `.mcpb` | $0 as documented | Third-party binary risk; usage still counts against Free limits; not tested on Free |
| Claude Code | Not free | Pro from $17 to $20 a month, or Console API billing |
| Claude API keys inside Meetily, Vibe, StenoAI | Pay per use | Separate from any plan |
| Ollama summaries instead of Claude | $0 | Lower quality and no Claude, but no limits |

**Recommended routes, by need**
1. Zero cost, minimal setup, online meetings: Meetily, with Whisper set to Spanish, then copy the transcript into Claude Free. Add Vibe when speaker labels matter.
2. Zero cost, in person: Voice Memos or Samsung Voice Recorder, then share text to Claude.
3. Zero cost but semi-automated: OBS or Zoom local recording, then Claude Desktop with local-whisper-mcp, after reviewing that risk.
4. Paid Claude plan available: OBS, FFmpeg filter and Claude Code skill. This session runs on Claude Code, so the account likely already includes it, but the plan should be confirmed. This route involves no third-party MCP code and uses the FFmpeg already installed.
5. Later, once Windows capture matures: Minutes for searchable memory across meetings through MCP.

### Gaps
- No example of the full Windows pipeline was found or executed. Every command above is assembled from docs and unverified on this machine, including whether Stereo Mix exists and whether OBS is installed.
- Official numbers for Free plan limits are not published on the pricing page, and the help article I tried returned 404.
- Whether a `.mcpb` works in practice on Free was not tested. An older documentation snippet framed extensions as Team and Enterprise, whereas the current doc and pricing table do not gate them; the "Devices / Run tasks on" flow local-whisper-mcp mentions may have its own plan rules.
- Legal consent for recording in Chile was not researched: the search budget ran out, and the official law page did not load. The Chilean rule on recording private conversations (Código Penal art. 161-A, from my prior knowledge and unverified here) should be checked by someone before recommending silent OS-level capture. This matters most because Q1 and Q3 tools leave no visible signal to participants, unlike platform recording or a bot.
