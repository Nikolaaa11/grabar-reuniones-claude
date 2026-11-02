# Build-it-yourself route for recording meetings with Claude: bot APIs, STT APIs, platform APIs, phone and no-code (prices checked 2026-11-02)

How to read these notes:
- All prices are USD unless marked otherwise. "Checked" means fetched on 2026-11-02. Most vendor pages show no date of their own, so the fetch date is the date check.
- Items marked **UNVERIFIED** could not be confirmed on an official page.
- Worked calculations are in the section "Worked monthly cost at 20 hours".

## Meeting-bot APIs: price, credits, coverage, MCP and maintenance

### Takeaway
At 20 h/month a hosted bot with transcription costs about $8 to $13/month before Claude (Nylas is $23), and several now have an MCP server, so Claude can dispatch the bot and read the transcript. Zoom is the weak point: since 2 March 2026 Zoom requires authorized joins for Meeting SDK apps, and at least one bot vendor has been refused an anonymous-join exception. Test Zoom first on any vendor.

### Cited Findings

**Comparison table (all checked 2026-11-02)**

| Service | Bot price | Transcription | Free credits | Coverage | MCP / Claude | Retention |
|---|---|---|---|---|---|---|
| Recall.ai | $0.50/h pay-as-you-go, prorated to the second; $0.25/h startup program for first 10,000 h — [Recall pricing](https://www.recall.ai/pricing) | Built-in $0.15/h or third-party — [Recall pricing](https://www.recall.ai/pricing) | First 5 h free — [Recall pricing](https://www.recall.ai/pricing) | Zoom, Meet, Teams, Webex, GoTo, Slack Huddles — [Recall pricing](https://www.recall.ai/pricing) | Official connector, read access by default; no documented tool that sends a bot — [Recall MCP docs, updated 2026-10-18](https://docs.recall.ai/docs/mcp.md). Composio's third-party wrapper adds create/delete bot — [Composio](https://composio.dev/toolkits/recallai/framework/claude-code) | 7 days free, then $0.05 per hour retained, for 30 days — [Recall pricing](https://www.recall.ai/pricing) |
| MeetingBaaS | "From $0.35/h" only on the $1,500 pack; smallest pack is $50 for 100 tokens = $0.50/token; 1 token/h raw recording — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing) | Gladia +0.25 token/h; own key (BYOK) +0.05 token/h — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing) | 8 h free; tokens never expire — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing) | Zoom, Meet, Teams — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing) | Yes, can dispatch: `createBot`, transcript tools; local install, Node 16+ and API key — [MCP README](https://cdn.jsdelivr.net/gh/meeting-baas/meeting-mcp@main/README.md) | 3 days on pay-as-you-go — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing) |
| MeetStream | $0.35/h; no charge for idle bots or failed joins — [MeetStream pricing](https://meetstream.ai/pricing) | In-house +$0.10/h, or own provider key at no extra charge — [MeetStream pricing](https://meetstream.ai/pricing) | $5 on signup, no card — [MeetStream pricing](https://meetstream.ai/pricing) | Zoom, Meet, Teams; Webex, GoTo, Slack, WhatsApp in beta — [MeetStream pricing](https://meetstream.ai/pricing) | First-party hosted MCP, nothing to install; "drop-in skills for Claude" — [MeetStream llms.txt](https://meetstream.ai/llms.txt) | 30 days included — [MeetStream pricing](https://meetstream.ai/pricing) |
| Nylas Notetaker | Free $0 with 5 h/month; Essentials $15 with 10 h + $0.80/h; Pro from $49 with 70 h + $0.70/h — [Nylas pricing](https://www.nylas.com/pricing/) | AssemblyAI transcription and diarization "included", 90+ languages — [Nylas product page](https://www.nylas.com/products/notetaker-api/) | 5 h/month on Free plan — [Nylas pricing](https://www.nylas.com/pricing/) | Meet, Teams, Zoom — [Nylas docs](https://developer.nylas.com/docs/v3/notetaker/) | Official hosted MCP with 11 Notetaker tools including `send_notetaker` and `get_notetaker_transcript` (10 MiB limit); Claude Desktop setup uses `npx mcp-remote` — [Nylas MCP docs](https://developer.nylas.com/docs/dev-guide/mcp.md) | Not checked |
| Skribby | $0.35/h, no minimums — [Skribby pricing](https://skribby.io/pricing) | Menu of 30 models; totals $0.39/h (Groq turbo), $0.55/h (AssemblyAI Universal), $0.67/h (Deepgram Nova-3), $1.31/h (Google Chirp 3); BYOK available — [Skribby pricing](https://skribby.io/pricing) | "Get Started Free", no card; amount not stated — [Skribby pricing](https://skribby.io/pricing) | Zoom, Teams, Meet — [Skribby pricing](https://skribby.io/pricing) | No MCP page in the docs index — [Skribby docs](https://skribby.io/docs) | 1 week; 1 year +$0.05/h — [Skribby pricing](https://skribby.io/pricing) |
| Vexa (hosted) | $0.30/bot-h; $0.50/h with transcription; Individual $12/seat/month with one concurrent bot, unlimited meetings — [Vexa pricing](https://vexa.ai/pricing) | +$0.20/h, included on Individual — [Vexa pricing](https://vexa.ai/pricing) | $2 (about 4 transcribed hours) — [Vexa pricing](https://vexa.ai/pricing) | Meet, Teams, Zoom "production" — [Vexa status](https://docs.vexa.ai/roadmap/status.md) | Yes, `/mcp` on hosted and self-hosted; 9 tools verified 2026-08-18 — [Vexa status](https://docs.vexa.ai/roadmap/status.md) | Not checked |
| Vexa (self-hosted) | $0 licence, Apache-2.0 — [Vexa pricing](https://vexa.ai/pricing) | Own faster-whisper service (GPU box) or a free hosted token — [Vexa README](https://github.com/Vexa-ai/vexa) | n/a | Same | Included — [Vexa pricing](https://vexa.ai/pricing) | Own |
| Attendee (hosted) | $0.50/h, down to $0.35/h with volume — [Attendee pricing](https://attendee.dev/pricing) | Listed as included — [Attendee pricing](https://attendee.dev/pricing) | 5 h free — [Attendee pricing](https://attendee.dev/pricing) | Zoom, Meet, Teams — [Attendee home](https://attendee.dev/); the [README](https://github.com/attendee-labs/attendee) lists Meet and Teams as roadmap items, so the two sources differ | No official MCP on the site; community `rexposadas/attendee-mcp` exists — [Playbooks](https://playbooks.com/mcp/rexposadas-attendee-bot) | Not checked |
| Attendee (self-hosted) | Licence free; Enterprise self-hosting plan "custom" — [Attendee pricing](https://attendee.dev/pricing) | Own Deepgram key — [README](https://github.com/attendee-labs/attendee) | n/a | Same | As above | Own |

**Maintenance status**
- Vexa: Apache-2.0, 2,938 stars, last push 2026-11-02, not archived — [GitHub API](https://api.github.com/repos/Vexa-ai/vexa). Latest release v0.12.28 published 2026-10-09 — [Vexa status](https://docs.vexa.ai/roadmap/status.md). 519 open issues, 250 open PRs and 2 security alerts — [Vexa README](https://github.com/Vexa-ai/vexa).
- Attendee: 787 stars, last push 2026-10-30, not archived — [GitHub API](https://api.github.com/repos/attendee-labs/attendee). Licence is Elastic License 2.0, which bars offering it as a hosted service to third parties — [LICENSE](https://raw.githubusercontent.com/attendee-labs/attendee/main/LICENSE). So it is source-available for own use.
- MeetingBaaS MCP repo: MIT, 30 stars, last push 2026-09-24 — [GitHub API](https://api.github.com/repos/Meeting-Baas/meeting-mcp).
- Recall.ai: docs updated 2026-10-18 and 2026-10-28 — [MCP docs](https://docs.recall.ai/docs/mcp.md); [Zoom docs](https://docs.recall.ai/docs/zoom-overview.md).
- MeetStream: claims ISO 27001 and SOC 2 Type 2 "under audit"; no founding date, changelog or status page on the home page — [MeetStream](https://meetstream.ai/).
- Skribby: docs index shows no changelog — [Skribby docs](https://skribby.io/docs).

**Self-hosting requirements**
- Vexa targets Linux (Ubuntu 24.04), with Mac Docker Desktop for evaluation; Docker v26+ is needed and `make all` needs no GPU. `POST /bots` returns 503 if STT is not configured — [Vexa README](https://github.com/Vexa-ai/vexa). Windows is not mentioned.
- Attendee needs Postgres, Redis, Zoom OAuth credentials and a Deepgram key. Kubernetes is recommended for production and official Kubernetes setup is part of a paid plan — [Attendee README](https://github.com/attendee-labs/attendee).

**Zoom risk (key finding)**
- Enforcement began 2 March 2026. Meeting SDK apps joining external meetings need an OBF token, and the authorizing user must have authorized the app via OAuth and be actively present; the session ends if that user leaves — [Zoom OBF FAQ](https://developers.zoom.us/docs/meeting-sdk/obf-faq/).
- MeetingBaaS reported `AppCanNotAnonymousJoinMeeting` failures from about 7 July 2026. Zoom staff replied they were "unable to approve an anonymous join exception for bot participants" — [Zoom dev forum](https://devforum.zoom.us/t/anonymous-join-exception/144677). In a different thread Zoom staff said "an exception may be available" if OAuth cannot be implemented — [Zoom dev forum](https://devforum.zoom.us/t/request-anonymous-join-exception-learn-more/142426.md). These two replies conflict for the bot case.
- Recall says a Zoom bot is "still a single API call" but does not explain how — [Recall OBF post](https://www.recall.ai/blog/zoom-obf). Its docs say bots need only a meeting URL and do not mention OBF — [Recall Zoom docs](https://docs.recall.ai/docs/zoom-overview.md).
- Vexa 0.12 "joins Zoom via web client only"; OBF/ZAK and the native SDK are not carried and are on the roadmap — [Vexa status](https://docs.vexa.ai/roadmap/status.md).
- Skribby lists Zoom authentication as "ZAK Tokens" — [Skribby docs](https://skribby.io/docs).
- A Nylas user reported on 6 July 2026 that the Zoom bot stayed stuck connecting while Meet worked; the cause is unconfirmed and the case moved to email — [Nylas forum](https://forums.nylas.com/t/nylas-notetaker-doesnt-join-in-zoom-bot-never-appears-in-the-meeting-or-waiting-room/1213).

**Teams and Meet risk**
- Teams flags third-party bots in the lobby and admins can block them via `ExternalBotAccessMode` (AllowAllBots, RequireApprovalWhenDetected, BlockDetectedBots); general availability was targeted for August 2026 — [MC1459141](https://mc.merill.net/message/MC1459141); [BleepingComputer](https://bleepingcomputer.com/news/security/microsoft-teams-now-lets-admins-block-external-bots-from-meetings).
- Google Meet added risk-based join queues to screen suspicious bots — [UC Today](https://www.uctoday.com/?p=444081). One vendor FAQ says Meet now defaults to "Deny" for flagged bots; this is a vendor account, not a Google statement — [Glyphic FAQ](https://glyphic.help.usepylon.com/articles/7805421929-glyphic-notetaker-google-meet-potential-risk-faq).

**What can be built beyond off-the-shelf**
- Speaking bots: MeetingBaaS bots accept your own Deepgram, Cartesia, OpenAI or Anthropic keys at no extra charge from MeetingBaaS — [MeetingBaaS pricing](https://www.meetingbaas.com/pricing).
- Live triggers: Skribby's SDK examples show a bot reacting to keywords in the live transcript, such as posting a chat message — [Skribby SDK examples](https://docs.skribby.io/ts-sdk/examples).
- Per-speaker audio: MeetStream advertises per-participant audio streams on Zoom — [MeetStream](https://meetstream.ai/).

### Inferences
- The easiest non-developer form of "build" in 2026 is a hosted bot plus hosted MCP inside Claude Desktop or Claude.ai ("join this link", later "summarize it"). MeetStream and Vexa hosted need no local install. Nylas needs Node for `npx` on Claude Desktop, and MeetingBaaS needs a local clone.
- Recall has the widest coverage and looks the most mature, but its official MCP is for inspection, so it needs a developer or a third-party wrapper to dispatch bots from Claude.
- Zoom coverage on these pricing pages is a claim, not a guarantee. Because OBF needs the authorizing user present, a bot route suits someone who attends their own meetings, but it may fail in other companies' Zoom meetings or when the user leaves early.
- Self-hosting (Vexa, Attendee) is not realistic on Windows 11 Home for a non-developer. It means a Linux VPS plus STT, and it is cheaper only if your time is free.

### Gaps
- Skribby's free-credit amount and any MeetStream, Skribby or Nylas retention details beyond those listed were not found.
- Whether Attendee's hosted price truly includes transcription without your own key; the pricing page says included, the README's self-host setup asks for a Deepgram key.
- Attendee's handling of Zoom OBF: the docs page returned HTTP 410.
- Spanish quality of MeetStream's in-house transcription: no data found.
- No independent reliability comparison of these bots on Zoom after July 2026 was found.

## Speech-to-text APIs: price, free credits, Spanish, speaker labels and MCP

### Takeaway
Transcription with speaker labels now costs about $0.17 to $0.36/h for most options, or $3.40 to $7.20 at 20 h/month. Deepgram's $200 credit alone covers about 32 to 38 months at this volume. No independent test of Chilean Spanish was found, so run your own sample with the free credits.

### Cited Findings

| Provider / model | Price per hour | 20 h/month | Free | Spanish | Speaker labels | MCP |
|---|---|---|---|---|---|---|
| Deepgram Nova-3 monolingual, pre-recorded | $0.0043/min = $0.258/h — [Deepgram pricing](https://deepgram.com/pricing) | $5.16 | $200 credit, no expiry, no card — [Deepgram pricing](https://deepgram.com/pricing) | `es`, `es-419` — [Deepgram languages](https://developers.deepgram.com/docs/models-languages-overview) | Included on pre-recorded — [Deepgram pricing](https://deepgram.com/pricing). All Nova batch models; Whisper not supported. Docs do not confirm Spanish explicitly — [Deepgram diarization](https://developers.deepgram.com/docs/diarization) | Official: `dg mcp` in the CLI, or `deepgram-mcp` package — [Deepgram MCP docs](https://developers.deepgram.com/developer-tools/cli/mcp-server); [repo](https://github.com/deepgram/mcp) |
| Deepgram Nova-3 multilingual, pre-recorded | $0.0052/min = $0.312/h — [Deepgram pricing](https://deepgram.com/pricing) | $6.24 | Same | Includes `es` — [Deepgram languages](https://developers.deepgram.com/docs/models-languages-overview) | Same | Same |
| AssemblyAI Universal-3.5 Pro + diarization | $0.21 + $0.02 = $0.23/h — [AssemblyAI pricing](https://www.assemblyai.com/pricing) | $4.60 | $50 credit, no card — [AssemblyAI pricing](https://www.assemblyai.com/pricing) | `es` covers all dialects — [AssemblyAI languages](https://www.assemblyai.com/docs/pre-recorded-audio/supported-languages) | Default cap 30 speakers on 10+ minute audio; each speaker should have 30 s of continuous speech — [AssemblyAI diarization](https://www.assemblyai.com/docs/pre-recorded-audio/speaker-diarization) | Remote server under AssemblyAI's GitHub org with `submit_transcript`, `get_transcript`, `summarize_transcript`; needs a **public** audio URL; README never says "official" — [repo](https://github.com/AssemblyAI/assemblyai-mcp). Separate docs-only MCP — [AssemblyAI docs](https://www.assemblyai.com/docs/coding-agent-prompts) |
| AssemblyAI Universal-2 + diarization | $0.15 + $0.02 = $0.17/h — [AssemblyAI pricing](https://www.assemblyai.com/pricing) | $3.40 | Same | "High accuracy (≤10% WER)" tier, vendor claim — [AssemblyAI languages](https://www.assemblyai.com/docs/pre-recorded-audio/supported-languages) | Same | Same |
| ElevenLabs Scribe v2 | $0.22/h; keyterms +$0.05/h; silence is billed — [ElevenLabs API pricing](https://elevenlabs.io/pricing/api); [docs](https://elevenlabs.io/docs/overview/capabilities/speech-to-text) | $4.40 | Page lists 4 h 30 min at the first tier and $6 Starter with 27 h; rows are unlabelled, so the mapping is by order — [ElevenLabs API pricing](https://elevenlabs.io/pricing/api) | "Excellent (≤5% WER)" tier, vendor claim — [ElevenLabs docs](https://elevenlabs.io/docs/overview/capabilities/speech-to-text) | Up to 32 speakers; no separate price listed; files up to 3 GB — [ElevenLabs docs](https://elevenlabs.io/docs/overview/capabilities/speech-to-text) | Local server has `speech_to_text` but is archived and deprecated — [repo](https://github.com/elevenlabs/elevenlabs-mcp); [changelog 2026-08-22](https://elevenlabs.io/docs/changelog/2026/8/22). Hosted MCP documented for managing agents; STT not confirmed — [ElevenLabs blog](https://elevenlabs.io/blog/elevenlabs-mcp-in-claude) |
| OpenAI `gpt-transcribe` (recommended) | $0.0045/min = $0.27/h — [OpenAI pricing](https://developers.openai.com/api/docs/pricing) | $5.40 | None mentioned — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text) | `es` accepted — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text) | Not claimed for this model — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text) | No official server found; community Whisper MCP noted as unmaintained — [Sonix, 2026-07-14](https://sonix.ai/resources/mcp-servers-speech-to-text-transcription/) |
| OpenAI `gpt-4o-transcribe-diarize` | $0.006/min = $0.36/h — [OpenAI pricing](https://developers.openai.com/api/docs/pricing) | $7.20 | None mentioned | Languages not listed for this model — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text) | Yes; up to 4 known-speaker clips. **Deprecated, shutdown 2027-02-26** — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text) | Same |
| Google V2 standard (Chirp is included in "standard") | $0.016/min = $0.96/h — [Google pricing](https://cloud.google.com/speech-to-text/pricing) | $19.20 | 60 free minutes/month appears only in the V1 table — [Google pricing](https://cloud.google.com/speech-to-text/pricing) | Chirp 3: `es-ES`, `es-US` GA, `es-MX` preview; `es-CL` and `es-419` not listed — [Chirp 3 docs](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3) | Yes for `es-ES` and `es-US` via BatchRecognize; page is inconsistent on Recognize — [Chirp 3 docs](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3) | None found |
| Google V2 dynamic batch | $0.003/min = $0.18/h — [Google pricing](https://cloud.google.com/speech-to-text/pricing) | $3.60 | Same | Same | Same | None found |
| Groq `whisper-large-v3-turbo` | $0.04/h, 10-second minimum — [Groq docs](https://console.groq.com/docs/speech-to-text) | $0.80 | Free tier exists, file limit 25 MB (Dev tier 100 MB) — [Groq docs](https://console.groq.com/docs/speech-to-text) | Multilingual; `es` hint improves results — [Groq docs](https://console.groq.com/docs/speech-to-text) | Not mentioned — [Groq docs](https://console.groq.com/docs/speech-to-text) | None found |
| Groq `whisper-large-v3` | $0.111/h — [Groq docs](https://console.groq.com/docs/speech-to-text) | $2.22 | Same | Same | Not mentioned | None found |

**Limits that affect meetings**
- OpenAI accepts files up to 25 MB, so longer recordings must be compressed or split — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text).
- Google BatchRecognize suits 1 minute to 1 hour, and only up to 20 minutes with word-level timestamps — [Chirp 3 docs](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3).
- Groq's Developer plan is limited to 28.8K audio seconds/day (8 h) for both Whisper models — [Groq rate limits](https://console.groq.com/docs/rate-limits).

**Spanish accuracy evidence (all vendor-published)**
- AssemblyAI's October 2025 benchmark gives itself 94.7% on Spanish, OpenAI 94.4%, Deepgram 93.3%, Google 88.2% — [AssemblyAI benchmarks](https://www.assemblyai.com/benchmarks), as summarized from a search result.
- ElevenLabs lists Scribe v1 at 2.0% WER, Whisper Large v3 3.1%, Deepgram Nova 2 5.6% on FLEURS — [ElevenLabs Spanish page](https://elevenlabs.io/speech-to-text/spanish). Other language versions of that page give 3.1% for Scribe, so the claim is internally inconsistent.
- Soniox's 2023 Spanish study found Google trailing badly, but it is old and self-reported — [Soniox PDF](https://soniox.com/media/SonioxSpanishBenchmarks2023.pdf).

**Cross-check of vendor prices against Skribby's resale table**
- Skribby's totals minus its $0.35 base match official rates for Deepgram Nova-3, AssemblyAI Universal-3.5 Pro, Groq turbo, OpenAI and Google Chirp 3 — [Skribby pricing](https://skribby.io/pricing).
- ElevenLabs does not match: Skribby implies $0.35/h against the official $0.22/h — [Skribby pricing](https://skribby.io/pricing); [ElevenLabs API pricing](https://elevenlabs.io/pricing/api). Confirm the ElevenLabs rate at checkout.

### Inferences
- For mostly Spanish meetings, the sensible shortlist is AssemblyAI Universal-3.5 Pro, ElevenLabs Scribe v2 and Deepgram Nova-3 `es-419`. All three cost under $0.32/h with speaker labels.
- Groq is the cheapest, but with no speaker labels it fits dictation or one-speaker audio, not group meetings.
- OpenAI is a poor long-term choice for meetings: its only speaker-label model shuts down in February 2027 and has a 25 MB limit.
- Google is the least attractive: highest standard price and no `es-CL` listed for Chirp 3.
- Free-credit runway at 20 h/month: Deepgram $200 ÷ $5.16 = 38.8 months (monolingual), or ÷ $6.24 = 32.1 months (multilingual). AssemblyAI $50 ÷ $4.60 = 10.9 months.
- Test plan: run the same 2 or 3 real Chilean recordings through all three vendors on free credit. Chilean speech may behave differently from the generic Spanish in vendor tests.

### Gaps
- No independent 2026 Spanish benchmark and no Chilean Spanish benchmark was found.
- Groq's Free plan audio limits did not appear in the page text; only Developer plan figures were visible.
- Google's new-customer credit could not be confirmed. **UNVERIFIED.**
- Whether Deepgram and AssemblyAI diarization perform equally on Spanish is not stated in their docs.
- I found no official MCP server for Google Speech, OpenAI transcription or Groq. This means none surfaced, not proof that none exists.

## Platform APIs: Zoom, Google Meet and Microsoft Teams requirements

### Takeaway
Platform APIs are the no-bot route, but they require a paid plan and work only for meetings you host or organize. Zoom Pro and Google One 2 TB are the cheapest ways in from Chile. Teams effectively needs a work account plus tenant admin involvement, and RTMS is developer-only.

### Cited Findings

**Zoom**
- Cloud recording: Basic is local only; Pro has local plus 10 GB cloud per licence; cloud recording transcripts are listed from Pro up — [Zoom pricing](https://zoom.us/pricing).
- Price loaded from Chile: Pro CLP 15,291/user/month billed monthly, or CLP 12,742 billed annually; Commercial CLP 19,791 or CLP 16,492 — [Zoom pricing](https://zoom.us/pricing).
- API: "a Pro or higher account plan is required" for cloud recordings. The webhook `download_token` expires after 24 hours; afterwards call the Get meeting recordings endpoint with an OAuth token — [Zoom dev blog](https://developers.zoom.us/blog/meeting-api-querying-tips-part4/). The post's text and sample payload differ on the event name (`meeting.recordings.completed` vs `recording.completed`).
- Transcript events: one developer did not get transcripts in `recording.completed`, and Zoom staff suggested the transcript-completed event — [Zoom dev forum](https://devforum.zoom.us/t/transcript-file-not-recieved-in-webhook-payload-event-recording-completed/137762).
- Spanish conflict: one Zoom article lists Spanish for cloud recording transcripts and says the default is English, with the option to change and regenerate — [Zoom KB0064927](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064927). Another says audio transcription supports only English — [Zoom KB0065911](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065911).
- RTMS: gives live audio, video and transcript without a bot, and needs Developer Pack credits — [Zoom RTMS docs](https://developers.zoom.us/docs/rtms/).
- RTMS price: Zoom staff said "$0.01 per streaming minute" without transcription, on 2026-06-15 — [Zoom dev forum](https://devforum.zoom.us/t/rtms-developer-pack-pricing-for-business-account/144203). A Recall.ai employee gave 0.01 credit/min without and 0.02 credit/min with transcription, and said a Basic participant can trigger it if the account is verified — [Zoom dev forum](https://devforum.zoom.us/t/rtms-credit-consumption-per-minute-and-whether-the-initiating-participant-needs-a-paid-plan/145391). A third-party blog says RTMS is paid-plan only — [TRTC](https://trtc.io/blog/details/zoom-video-sdk-pricing-2026). The official [developer pricing page](https://zoom.us/pricing/developer) shows no credit figures in its text. **Treat RTMS rates as partly UNVERIFIED.**

**Google Meet**
- Recording is available on Business Standard and Plus, Enterprise tiers, Essentials, Workspace Individual, and "Google One subscribers with 2 TB or more"; files go to the organizer's Drive and the admin must allow recording — [Meet help](https://support.google.com/meet/answer/9308681?hl=en). Business Starter is not on that list.
- Built-in transcripts are available on Business Standard and Plus, Enterprise tiers and Workspace Individual, and Spanish is supported; the page does not cover Google One — [Meet transcripts help](https://support.google.com/meet/answer/12849897?hl=en).
- Meet REST API exposes recordings, transcripts and per-participant transcript entries; recordings are MP4 in the organizer's Drive; API transcript entries are deleted 30 days after the conference — [Meet API artifacts](https://developers.google.com/workspace/meet/api/guides/artifacts).
- `drive.readonly` and `drive.meet.readonly` are **Restricted** scopes requiring verification, and a security assessment if data is stored on servers; domain-wide delegation needs a domain administrator — [Meet API auth](https://developers.google.com/workspace/meet/api/guides/authenticate-authorize).
- Prices shown from Chile: Google AI Plus (2 TB) CLP 8,990/month — [Google One plans](https://one.google.com/about/plans?hl=es-419). Workspace Starter CLP 6,500, Standard CLP 13,000, Plus CLP 20,200, with a 50% promo for 3 months; the page was showing the annual option — [Workspace pricing](https://workspace.google.com/pricing?hl=es-419).

**Microsoft Teams**
- Recordings are stored in the organizer's OneDrive (private meetings) or SharePoint (channel meetings); both organizer and initiator need recording permission — [Teams recording](https://learn.microsoft.com/en-us/microsoftteams/meeting-recording).
- Graph transcript permissions: delegated `OnlineMeetingTranscript.Read.All` for work or school accounts; **personal Microsoft accounts are not supported**. Application permission requires a tenant admin to create an application access policy — [Get callTranscript](https://learn.microsoft.com/en-us/graph/api/calltranscript-get).
- Organization-wide access needs admin authorization; a per-meeting RSC alternative needs the app installed in the meeting chat. Tenant admins can independently disable Graph access to transcripts and speaker attribution. Output is `.vtt` and `.mp4`, and the APIs stopped being metered on 25 August 2025 — [Teams transcripts overview, updated 2026-09-30](https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/meeting-transcripts/overview-transcripts).
- Price shown from Chile: Microsoft 365 Empresa Estándar with Copilot USD 23.50/user/month, annual — [Microsoft 365 pricing](https://www.microsoft.com/es-cl/microsoft-365/business/microsoft-365-plans-and-pricing).

### Inferences
- All three platforms store files with the host or organizer, so these APIs do not help when you are an invited guest. That case needs a bot or local capture.
- Cheapest no-bot entry from Chile: Google One 2 TB at CLP 8,990/month for Meet recording only, then your own STT. Workspace Standard at CLP 13,000 adds Spanish transcripts in Docs, which can eliminate STT cost entirely. Zoom Pro at CLP 12,742 to 15,291 gives recording, an API and webhooks.
- 10 GB of Zoom cloud storage is tight at 20 h/month if MP4 is kept, so delete after processing or keep only audio files. This is my estimate; I did not measure file sizes.
- RTMS at 20 h would cost $12 to $24/month (1,200 min × $0.01 or $0.02) and also needs an always-on service to receive streams, so it is developer-only.
- For a personal Apps Script reading your own Drive, restricted-scope verification should not be the obstacle it is for a public app, though Google may show an unverified-app warning. Not confirmed in the sources read.

### Gaps
- Zoom Developer Pack credit table and credit price: the page text shows none, and the details are in images on the forum.
- Whether a Zoom Pro owner can create the needed OAuth app without extra admin steps, and which scopes it needs.
- Exact Teams licence needed for recording, and the Chile price of a Microsoft plan without Copilot. The page text was captured only in part.
- Whether Google One 2 TB still grants Meet recording under the renamed "Google AI Plus" plan. The help page says 2 TB or more, and the plan page does not list it explicitly.

## Telephone calls: Twilio and other simple options

### Takeaway
Twilio works from Chile but it is the most expensive route: about $29/month at 20 h inbound and over $100/month outbound to mobiles, with identity and address paperwork. For occasional calls, recording on the phone or on speaker and then using STT is far cheaper, but built-in phone features in Chile are unconfirmed.

### Cited Findings
- Twilio Chile prices ("current as of August 2026"): inbound local $0.0107/min; number $7.00/month; outbound local $0.0475/min; outbound mobile $0.0746/min; recording $0.0025/min; recording storage $0.0005/min per month; transcription $0.05/min — [Twilio Chile pricing](https://www.twilio.com/en-us/voice/pricing/cl).
- Conversation Intelligence transcription: $0.024/min batch and $0.027/min streaming — [Twilio Chile pricing](https://www.twilio.com/en-us/voice/pricing/cl). Transcription is billed as part of Twilio Voice; Conversation Intelligence bills only the AI analysis — [Twilio billing docs](https://www.twilio.com/docs/conversations/intelligence/understanding-billing).
- Analysis rates: Twilio-authored operators $0.005 per 1K characters; custom operators $0.002 input and $0.018 output per 1K characters — [Twilio pricing](https://www.twilio.com/en-us/products/conversational-ai/pricing).
- Chile numbers: voice local numbers use +56600 (requested) and +56809 (unsolicited). Individuals need proof of identity and proof of a local address. Call forwarding to international destinations is prohibited — [Twilio Chile regulations](https://www.twilio.com/en-us/guidelines/cl/regulatory).
- iPhone: built-in call recording with transcript in Notes, in select regions and languages — [Apple support](https://support.apple.com/en-al/guide/iphone/iph57c6590e9/ios). The Apple Intelligence "Call Transcription Summaries" entry lists Spanish (Mexico) and Spanish (United States), not Chile — [Apple feature availability](https://www.apple.com/ios/feature-availability/).
- Android: Google Phone app recording needs Android 9+ (Pixel 6+ with Android 14+) and a supported country; Chile is not mentioned — [Google Phone help](https://support.google.com/phoneapp/answer/9803950?hl=en).
- Chile law (adjacent to my scope, not legal advice): Article 161-A penalizes recording private communications without authorization — [text](https://iura.cl/cp/161-a.html). A UDP analysis says the Supreme Court has required that the recording be done by a third party other than the addressee — [UDP](https://derecho.udp.cl/cms/wp-content/uploads/2023/11/Constituye-prueba-ilicita-la-grabacion-de-una-conversacion-entre-particulares-Correa-y-Duce-21-11-202.pdf). A commercial site says participants may generally record without notice, subject to expectation of privacy — [RecordingLaw](https://www.recordinglaw.com/es/world-laws/world-recording-laws/chile-recording-laws/).

### Inferences
- Do not use Twilio's own transcription here. Twilio batch costs $0.024/min = $1.44/h, against $0.23/h for AssemblyAI with speaker labels. That is about 6 times more.
- Twilio's language operator is also poor value for this job: about 60,000 characters × $0.005/1K = $0.30 per meeting, against about $0.07 with Claude Sonnet 5.5.
- A Twilio setup also means building call flows (TwiML or Studio) and webhooks, so it is a developer task despite being simple to describe.
- Twilio makes sense only for many business calls on a dedicated line that need automatic recording. A non-developer with occasional calls should use a phone recorder or a speakerphone with a PC recorder, then the STT and Claude steps.
- Bridging your own mobile into an outbound call doubles the leg cost, because you pay two outbound mobile legs.

### Gaps
- Twilio's support article on batch vs real-time returned HTTP 403, so its details come from a search snippet and the Chile price page.
- Twilio's Spanish transcription quality and exact free units after upgrade were not found.
- Apple's "Call Recording" regional list and Google's country list could not be read, so availability in Chile is **UNVERIFIED** for both.
- Whether a recording bot counts as a "participant" or a "third party" under Article 161-A was not found. A lawyer should confirm.

## No-code automations: Zapier, Make, n8n and Apps Script

### Takeaway
The usual flow is "new recording → transcribe → Claude → Notion", and the platform fee usually exceeds the AI cost. Apps Script is free but limited to 50 MB per call. Zapier is simplest but adds $20 to $30/month. Make can be $0 to about $12, with tight free limits, and n8n is free only if you self-host.

### Cited Findings

**Zapier**
- Plans: Free has 100 tasks, two-step Zaps only, no webhooks, no premium apps, 15-minute polling. Pro with 750 tasks is $19.99/month annual or $29.99 monthly, with multi-step, webhooks and 2-minute polling. Team starts at $69 annual — [Zapier pricing](https://zapier.com/pricing).
- Task counting: triggers, polling, filters, paths, delays and formatter steps do not use tasks; code steps use 1 task; MCP uses 2 tasks per successful tool call — [Zapier help](https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier).
- Zapier MCP is "included in every Zapier plan" and works with Claude; each call uses two tasks from the shared quota — [Zapier MCP](https://zapier.com/mcp). From 1 December 2026, free By Zapier app calls will not count, and AI by Zapier calls bill at their own price — [Zapier help](https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier).
- Building blocks exist: Zoom "New Cloud Recording" trigger — [Zapier Zoom](https://zapier.com/apps/zoom/integrations); AssemblyAI "Transcribe" (requires `audio_url`, supports speaker labels) and "Get Transcript" — [Zapier AssemblyAI](https://zapier.com/apps/assemblyai/integrations); Anthropic "Send Message" — [Zapier Anthropic](https://zapier.com/apps/anthropic-claude/integrations).

**Make**
- Free: 1,000 credits/month; most actions cost 1 credit; each 10,000 credits gives 5 GB of data transfer — [Make pricing](https://www.make.com/en/pricing). So Free gets about 0.5 GB.
- Make maintains an Anthropic Claude app with 17 actions and no meeting template shown — [Make Claude](https://www.make.com/en/integrations/anthropic-claude).
- Plan limits as seen in a search snippet of Make's pricing page: max file 5 MB Free, 100 MB Core, 250 MB Pro. The table did not render in my fetch, so these are **partly UNVERIFIED**. Community post confirms the 5 MB limit on Free — [Make community](https://community.make.com/t/gmail-max-file-size-exceeded-error-on-watch/19714).
- Minimum schedule interval is 15 minutes on Free and 1 minute on paid; polling runs that find nothing are "Check runs" — [Make help](https://help.make.com/schedule-a-scenario). Official credit docs do not say whether a check run costs a credit — [Make credits](https://help.make.com/credits). One third-party analysis says 5-minute polling burns about 8,640 credits/month — [Costbench](https://www.costbench.com/software/ai-automation/make/hidden-costs/).
- **UNVERIFIED** Core price (10,000 credits/month): Jet Admin says $9 annual or $10.59 monthly — [Jet Admin](https://www.jetadmin.io/blog/make-pricing/); Zapier's competitor blog says $12 billed annually — [Zapier blog](https://zapier.com/blog/make-com-pricing/). Official prices did not load.

**n8n**
- Cloud: Starter €20/month (annual billing), 2.5K executions, 5-minute maximum execution; Pro €50/month, 10K executions, 40 minutes. An execution is a whole workflow run regardless of steps. Self-hosted Business is €667/month — [n8n pricing](https://n8n.io/pricing/).
- Self-hosted Community: licence allows use "for your own internal business purposes or for non-commercial or personal use", royalty-free — [n8n licence](https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md).
- n8n warns that self-hosting "requires technical knowledge" and recommends it for expert users. Docker Desktop is available for Windows; the built-in tunnel is not safe for production — [n8n Docker docs](https://docs.n8n.io/hosting/installation/docker/).
- Near-match templates: Drive → Whisper → GPT → Notion — [template 6139](https://n8n.io/workflows/6139-transcribe-and-summarize-audio-with-whisper-and-gpt-from-google-drive-to-notion/); transcript → Notion notes and tasks — [template 9929](https://n8n.io/workflows/9929-process-meeting-transcripts-into-notion-notes-and-tasks-with-ai-and-google-drive/). No Claude-specific full template was found.
- VPS reference: Hetzner from €6.49/month ex VAT for an available plan; specs not extracted — [Hetzner](https://www.hetzner.com/cloud/).

**Google Apps Script**
- Consumer account limits: 6 min per execution; triggers 90 min/day total; 20,000 URL Fetch calls/day; 50 MB POST and 50 MB response per call. Workspace gets 6 h/day of trigger runtime and 100,000 calls — [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas).

### Inferences

| Flow | Steps | Usage at 20 meetings | Platform cost | Total with AssemblyAI U-3.5 Pro + Sonnet 5.5 ($6.00) |
|---|---|---|---|---|
| Zapier | Zoom New Cloud Recording → AssemblyAI Transcribe → Delay → Get Transcript → Claude Send Message → Notion page | 4 tasks × 20 = 80 tasks | Pro $19.99 annual or $29.99 monthly (Free cannot do multi-step) | $25.99 to $35.99 |
| Make | Watch Drive or Zoom → HTTP to STT by URL → Claude → Notion | About 5 credits × 20 = 100, plus polling; hourly polling could add up to 720 if check runs bill | Free possible but tight; Core about $9 to $12 **UNVERIFIED** | $6.00 to about $18 |
| n8n self-hosted | Drive Trigger → STT HTTP → Anthropic node → Notion node | 20 executions | €0 on own PC (must stay on), or VPS from €6.49 | $6.00 + €0 to €6.49 |
| n8n Cloud | Same | 20 of 2,500 executions | €20 | $6.00 + €20 |
| Apps Script, using Meet Docs transcript | Time trigger → read new Doc → UrlFetch Claude → UrlFetch Notion | Far under quota | $0 | $1.40 (no STT needed) |
| Apps Script, using STT by URL | Time trigger → pass link to STT → poll → Claude → Notion | Far under quota | $0 | $6.00 |
| Claude + Zapier MCP | Claude calls Zapier tools when you ask | 2 tasks per call | Free plan: about 50 calls/month | Not push automation |

- These flows are assembled from the listed building blocks. I did not build or run any of them, as instructed.
- Key limit: a one-hour MP4 will likely exceed Apps Script's 50 MB and Make Free's 5 MB limits. So do not move bytes through the automation: give STT a link, or use a platform transcript. But URL-based STT needs a link the provider can reach, such as a temporary public Drive share, which is a privacy trade-off.
- Best free path for non-developers: if the plan includes Meet transcripts in Spanish, Apps Script (written by Claude) reading Docs → Claude → Notion. That skips STT and bots.
- Windows 11 Home is no obstacle for Zapier, Make or Apps Script because they run in the browser. n8n needs Docker Desktop and a PC that stays on, or a VPS.
- Zapier MCP is not a trigger: it acts only when Claude is asked. It suits "send this summary to app X" for apps Claude has no connector for, rather than replacing the automation.

### Gaps
- Official Make plan prices did not load, in either the fetch tool or the browser.
- Whether Make check runs consume credits is stated only by third parties.
- Whether Anthropic, AssemblyAI or Notion count as premium on Zapier: the pages do not say, but Pro includes unlimited premium apps either way.
- Zapier payload or file-size limits for long transcripts were not checked.
- Docker Desktop on Windows 11 Home (WSL 2) was not confirmed in the n8n page read.

## Claude's side: API pricing, summarizing a one-hour transcript, audio input, Batch and caching

### Takeaway
Summarizing a 10,000-word transcript costs an estimated $0.35 or less on the current models listed below and about $0.07 on Sonnet 5.5, so Claude is the smallest line in the budget. The API has no audio input, so an STT step is always needed. Batch halves the cost, and caching helps only when you re-ask about the same transcript.

### Cited Findings

**Current prices per million tokens — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing); matches [claude.com/pricing](https://claude.com/pricing)**

| Model (API ID per local claude-api skill, cached 2026-10-06) | Input | Output | 5-min cache write | Cache read | Batch in / out |
|---|---|---|---|---|---|
| Fable 5.1 (`claude-fable-5-1`) | $10 | $50 | $12.50 | $0.25 | $5 / $25 |
| Opus 5.5 (`claude-opus-5-5`) | $4 | $20 | $5 | $0.20 | $2 / $10 |
| Sonnet 5.5 (`claude-sonnet-5-5`) | $2 | $10 | $2.50 | $0.10 | $1 / $5 |
| Haiku 5.5, prompts ≤100K tokens (`claude-haiku-5-5`) | $0.10 | $0.50 | $0.125 | $0.01 | $0.05 / $0.25 |

- Tokenizer: Claude 4.7 and later produce about 30% more tokens for the same text than earlier models — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).
- Audio: user content blocks are text, image, document, search_result, tool blocks and container_upload; no audio block was found in the portion read (first 100,000 of 143,289 characters) — [Messages API reference](https://platform.claude.com/docs/en/api/messages/create).
- The Files API file-type table lists PDF, plain text, images and `container_upload` datasets only — [Files API](https://platform.claude.com/docs/en/build-with-claude/files). The features overview lists Vision and PDF support but no audio — [Features overview](https://platform.claude.com/docs/en/build-with-claude/overview).
- Conflict: SEO-style blogs claim Claude "natively supports" audio, while a 2026 feature request says it cannot process audio — [tkmxai](https://tkmxai.it.com/claude-api-in-2026-2); [feature request](https://claudeissues.com/issue/73566-feature-allow-claude-to-hear-and-process-audio). Official docs support the second.
- Batch: 50% off input and output; most batches finish within 1 hour; they expire if not complete in 24 hours; results stay available 29 days — [Batch docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing). Caching multipliers stack with the Batch discount — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).
- Caching: 5-minute write is 1.25x input; hits are 0.05x on Opus 5.5 and Sonnet 5.5, 0.025x on Fable 5.1, 0.1x otherwise — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).
- Thinking: tokens are billed as output even when not shown; effort is the control, and medium is the default on Opus 5.5 and Haiku 5.5 — [Thinking docs](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost).
- Connectors: custom remote MCP connectors are available on Free, Pro, Max, Ultra, Team and Enterprise; Free is limited to one — [Claude support](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp).

### Inferences

**Cost per one-hour transcript.** Assumption, not a measurement: 10,000 Spanish words with speaker labels ≈ 20,000 input tokens; output ≈ 3,000 tokens (about 2,000 visible plus about 1,000 thinking).

| Model | Calculation | Per meeting | 20 meetings | With Batch |
|---|---|---|---|---|
| Haiku 5.5 | 20K × $0.10/M + 3K × $0.50/M = $0.0020 + $0.0015 | $0.0035 | $0.07 | $0.04 |
| Sonnet 5.5 | 20K × $2/M + 3K × $10/M = $0.04 + $0.03 | $0.07 | $1.40 | $0.70 |
| Opus 5.5 | 20K × $4/M + 3K × $20/M = $0.08 + $0.06 | $0.14 | $2.80 | $1.40 |
| Fable 5.1 | 20K × $10/M + 3K × $50/M = $0.20 + $0.15 | $0.35 | $7.00 | $3.50 |

- Sensitivity on Sonnet 5.5: 14K in / 1.5K out = $0.86/month; 30K in / 5K out = $2.20/month.
- Caching example, three questions on one transcript within 5 minutes on Sonnet 5.5. Without cache, input is 3 × 20K × $2/M = $0.12. With cache, $0.05 write + 2 × $0.002 reads = $0.054, which is 55% less on input. A single pass with caching costs more (the 1.25x write) and saves nothing.
- Batch fits a pipeline that does not need the summary within minutes, but it adds a polling step, which complicates no-code flows. For $0.70/month savings it is not worth the extra step at this volume.
- Model choice matters little in dollars at this volume: Sonnet 5.5 to Opus 5.5 adds $1.40/month. Choose on summary quality in Spanish.
- MCP use from Claude Desktop or Claude.ai runs on the subscription rather than per-token API billing, so no API key is needed for manual flows. It needs a person to prompt it unless scheduled tasks are used, which I did not research.

### Gaps
- Real token count for Spanish transcripts: the count_tokens endpoint needs an API key, so I did not run it. Measure on one real transcript.
- The last 43,289 characters of the Messages API reference were not read for audio; the other official pages also show none.
- Prompt caching minimum length per model was not confirmed on an official page (the local skill says it is model-dependent, 512 to 4,096 tokens).

## Worked monthly cost at 20 hours

### Takeaway
A functional self-built stack costs about $6/month with no bot and $10 to $14/month with a bot; Zapier adds $20 to $30, and Twilio phone recording starts around $29. These figures exclude the meeting platform plan and taxes.

### Cited Findings
Inputs are the prices cited in the sections above: [Recall](https://www.recall.ai/pricing), [MeetStream](https://meetstream.ai/pricing), [MeetingBaaS](https://www.meetingbaas.com/pricing), [Nylas](https://www.nylas.com/pricing/), [Skribby](https://skribby.io/pricing), [Vexa](https://vexa.ai/pricing), [Attendee](https://attendee.dev/pricing), [AssemblyAI](https://www.assemblyai.com/pricing), [Deepgram](https://deepgram.com/pricing), [Groq](https://console.groq.com/docs/speech-to-text), [Zapier](https://zapier.com/pricing), [n8n](https://n8n.io/pricing/), [Twilio Chile](https://www.twilio.com/en-us/voice/pricing/cl), [Claude](https://platform.claude.com/docs/en/about-claude/pricing).

Other cost context:
- USD/CLP: dólar observado was CLP 990.35 for 26 October 2026; a November value was not found — [Emol](https://www.emol.com/noticias/Economia/2026/10/24/1215091/dolar-1000-peso-tipo-cambio.html).
- IVA: digital services from foreign providers carry 19% IVA — [Nubox](https://blog.nubox.com/contadores/iva-a-los-servicios-digitales). For people who are not IVA taxpayers, card issuers apply a 19% surcharge in the "cambio de sujeto" mechanism for listed providers — [BCI](https://www.bci.cl/personas/iva-digital).

### Inferences

**Assumptions:** 20 one-hour meetings (1,200 minutes); Claude Sonnet 5.5, standard API, $0.07 per meeting = **$1.40/month**; all recording and transcripts pulled before retention ends; no tax, and no platform plan unless stated.

**A. No bot: platform recording or transcript (platform plan not included)**

| Stack | Calculation | USD/month |
|---|---|---|
| Platform Spanish transcript + Apps Script + Sonnet | $0 + $0 + $1.40 | **$1.40** |
| Recording + Deepgram on $200 credit + Sonnet + Apps Script | $0 credit (about 32 to 38 months) + $1.40 | **$1.40** while credit lasts |
| Recording + Groq turbo + Sonnet (no speaker labels) | 20 × $0.04 = $0.80; + $1.40 | **$2.20** |
| Recording + AssemblyAI U-3.5 Pro with diarization + Sonnet + Apps Script | 20 × $0.23 = $4.60; + $1.40 | **$6.00** |
| Same with Make | $6.00 + $0 Free, or about $9 to $12 Core **UNVERIFIED** | **$6 to about $18** |
| Same with n8n | $6.00 + €6.49 VPS, or + €20 Cloud | **$6 + €6.49 to €20** |
| Same with Zapier Pro | $6.00 + $19.99 annual, or + $29.99 monthly | **$25.99 to $35.99** |

**B. Bot API (works in meetings you do not host; no platform plan needed)**

| Stack | Calculation | Bot + STT | With Sonnet |
|---|---|---|---|
| Skribby + Groq turbo (no STT speaker labels) | 20 × $0.39 | $7.80 | **$9.20** |
| MeetStream + in-house STT | 20 × ($0.35 + $0.10) | $9.00 | **$10.40** |
| Vexa hosted pay-as-you-go | 20 × $0.50 | $10.00 | **$11.40** |
| Attendee hosted | 20 × $0.50 | $10.00 | **$11.40** |
| MeetingBaaS, own STT key (STT not included) | 20 × 1.05 tokens × $0.50 | $10.50 | **$11.90 + STT** |
| Skribby + AssemblyAI Universal | 20 × $0.55 | $11.00 | **$12.40** |
| Vexa Individual (unlimited meetings) | Flat $12 | $12.00 | **$13.40**, or $12 via MCP on a Claude plan |
| MeetingBaaS + Gladia | 20 × 1.25 tokens × $0.50 (pack minimum $50 = 4 months) | $12.50 | **$13.90** |
| Recall.ai + built-in STT | 20 × ($0.50 + $0.15) | $13.00 | **$14.40** |
| Nylas Essentials | $15 + 10 × $0.80 | $23.00 | **$24.40** |

First-month credit effects:
- Recall: 15 × $0.50 + 20 × $0.15 = $10.50.
- MeetStream: $9.00 − $5 = $4.00.
- Vexa: $10 − $2 = $8.00.
- Attendee: 15 × $0.50 = $7.50.

**C. Phone via Twilio Chile (1,200 min)**

| Scenario | Calculation | USD/month |
|---|---|---|
| Inbound local + external STT + Sonnet | $7.00 number + $12.84 + $3.00 recording + $0.60 storage + $4.60 + $1.40 | **$29.44** |
| Inbound + Twilio batch transcription | $7.00 + $12.84 + $3.00 + $0.60 + $28.80 + $1.40 | **$53.64** |
| Outbound to mobiles + external STT | $7.00 + $89.52 + $3.00 + $0.60 + $4.60 + $1.40 | **$106.12** |
| Outbound, bridged through your own mobile (two legs) | $7.00 + $179.04 + $3.00 + $0.60 + $4.60 + $1.40 | **$195.64** |

Recording storage accumulates each month if recordings are kept.

**Model swap, on any row:** Haiku 5.5 −$1.33; Opus 5.5 +$1.40; Fable 5.1 +$5.60; Batch halves the Claude line.

**CLP at 990.35, before IVA:** $1.40 ≈ CLP 1,390; $6.00 ≈ CLP 5,940; $10.40 ≈ CLP 10,300; $14.40 ≈ CLP 14,260; $25.99 ≈ CLP 25,740; $29.44 ≈ CLP 29,160. If the 19% surcharge applies, $10.40 becomes about CLP 12,260.

**Platform plans, if not already paid:** Google AI Plus 2 TB CLP 8,990; Zoom Pro CLP 12,742 to 15,291; Workspace Standard CLP 13,000.

### Gaps
- Actual tax treatment per vendor was not checked, including which are on the SII list.
- Card FX spread was not included.
- Setup and maintenance time is not priced in these tables. See the next section.

## When does building beat buying?

### Takeaway
For one non-developer, buying usually wins, because a good notetaker costs about the same as or less than the DIY stack and absorbs the breaking changes. Building makes sense for specific needs: calls, custom flows into Notion, control of data, or low per-user hours in a team. Cost alone rarely justifies it below roughly 20 or more seats.

### Cited Findings

**Off-the-shelf reference prices (details are covered by other researchers)**
- Fathom: Free "unlimited recordings + transcriptions"; Premium $20 monthly or $16 annual; Team $19 or $15 with a 2-user minimum. Month or annual labels were inferred from page layout — [Fathom pricing](https://www.fathom.ai/pricing).
- Otter: Basic free, 300 min/month; Pro $8.33/user/month (annual price) with 1,200 min (exactly 20 h) and 90 min per meeting; Business $19.99 unlimited (annual price); Spanish listed; "Otter MCP server" listed — [Otter pricing](https://otter.ai/pricing).
- tl;dv: Free with unlimited recordings and 30+ languages; Pro CLP 17,290/seat/month annual, including MCP server, API and webhooks — [tl;dv pricing](https://tldv.io/app/pricing/).

**Evidence of maintenance burden: changes from the last 12 months or so**
- Zoom OBF enforcement from 2 March 2026 — [Zoom FAQ](https://developers.zoom.us/docs/meeting-sdk/obf-faq/); anonymous bot joins failing in July 2026 — [Zoom forum](https://devforum.zoom.us/t/anonymous-join-exception/144677).
- Teams admin bot blocking, targeted for August 2026 — [MC1459141](https://mc.merill.net/message/MC1459141).
- OpenAI transcription models deprecated, with shutdown 26 February 2027 — [OpenAI guide](https://developers.openai.com/api/docs/guides/speech-to-text).
- ElevenLabs local MCP deprecated August 2026 — [changelog](https://elevenlabs.io/docs/changelog/2026/8/22).
- AssemblyAI's old docs MCP deprecated, scheduled to be disabled 16 July 2026 — [AssemblyAI changelog](https://www.assemblyai.com/changelog?3b7e7275_page=11&b942b364_page=2).
- Make moved billing to credits — [Make pricing](https://www.make.com/en/pricing).
- Zapier MCP billing changes on 1 December 2026 — [Zapier help](https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier).
- n8n itself warns that self-hosting mistakes can cause data loss, security issues and downtime — [n8n docs](https://docs.n8n.io/hosting/installation/docker/).

### Inferences

**Single non-developer, 20 h/month: honest judgment**
- Money: the cheapest good DIY ($6/month, or $1.40 with Deepgram credit or platform transcripts) does beat paid seats, but only by $2 to $15/month. A free notetaker tier beats it outright if the limits fit.
- Time: my estimate, not sourced, is 3 to 8 hours to set up with Claude's help, plus occasional fixes. At any reasonable value of your time, one breakage per year cancels the savings.
- Default: buy a notetaker with an MCP or connector, and connect Claude to it.
- This session's tool list already shows connectors for Fathom, Notion and Google Drive, plus Zapier and Twilio plugins. This comes from the session, not a web source. The buy route may already be partly connected.
- Build anyway if one of these applies:
  1. A plan already includes Spanish platform transcripts, so Apps Script → Claude → Notion is tiny and has few moving parts.
  2. You want a fixed Notion template with your own Spanish prompts and choice of model on every meeting.
  3. You want a bot-free flow for meetings you host.
  4. You want a bot under your control, cheaply: MeetStream or Vexa with MCP at about $9 to $12/month.
- Avoid as a non-developer: self-hosted Vexa or Attendee, RTMS, Graph application permissions, Meet REST with restricted scopes, and Twilio call flows.

**Small team of about 5, each 20 h/month (100 h)**
- API route: 100 × $0.45 (MeetStream with STT) + 100 × $0.07 (Sonnet 5.5) = $52/month.
- Seat route: Fathom Team $75 to $95; Otter Business about $100; tl;dv Pro CLP 86,450 (about $87).
- Savings of about $25 to $50/month do not pay for meaningful developer time. Build only if someone technical already exists and the custom flow itself has value, such as CRM, Notion tasks or client deliverables.

**Break-even per user**
- With a bot at $0.52/h all-in: $15 seat ÷ $0.52 ≈ 29 h/month; $19 seat ≈ 37 h/month; Otter Pro $8.33 ≈ 16 h/month.
- With no bot at $0.30/h (AssemblyAI + Sonnet): $15 seat = 50 h/month.
- So usage-based building favors many light users, and seats favor heavy users.
- At 20 seats × 20 h: $208 (400 × $0.52) against $300 to $380 for Fathom Team, so about $100 to $170/month saved. Worth considering only with existing technical capacity.

**Situations where building clearly wins regardless of price**
- Phone calls, which most notetakers do not cover as a pipeline.
- Data control, such as retention limits or your own storage.
- Real-time actions during meetings.
- Custom vocabulary or Chilean terminology through keyterms.
- Combining many sources into one Claude-driven workspace.

### Gaps
- No published data on how often self-built meeting pipelines break or what they cost to run was found, so the setup-time estimate is judgment only.
- Fireflies pricing did not load in the fetch tool. It is left to the consumer-app researchers.
- Chile's new data protection law (Ley 21.719) may matter for storing recordings with foreign vendors. I recall that it takes effect around December 2026, but I did not verify that. Check this before recommending a build for a company.
