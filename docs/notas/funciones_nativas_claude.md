# Native Claude capabilities for recording, capturing and transcribing meetings (state as of 2026-11-02)

Evidence labels: **[Official]** = read on an Anthropic page on 2026-11-02 (most help articles only say "Updated this week", with no calendar date). **[Official, older]** = Anthropic page with an older date. **[Observed here]** = read directly in this Claude Code environment (v2.1.309 skill bundle, contract 0.2.96), read-only. **[Third-party]** = blog, vendor or community claim, not confirmed by Anthropic. **[Leak]** = reverse engineering, unconfirmed by Anthropic. Help-center text reached me through an extraction step, so short quotes should be spot-checked before they are reused verbatim. The code.claude.com and platform.claude.com pages came back as full text. Nothing was installed, connected, signed in to, published or purchased, and no feature was tested hands-on.

## 1. Does any Claude surface natively record, capture or take notes on meetings? Was anything launched in 2026? Can Claude join a call?

### Takeaway
**No. As of 2 Nov 2026, no Anthropic surface on any plan records a meeting, joins a call as a participant, or passively transcribes other people.** Claude works on meeting text after the fact. The only native audio features are voice mode and dictation, both built for one person's speech through a microphone. The only sign of a native recorder is "Parka", an unreleased, Mac-first feature known from a leak; Anthropic has not confirmed it, and it is disabled in public builds, including on Windows.

### Cited Findings

**Audit of Anthropic's own logs**
- [Official] A keyword pass over the Claude release notes (latest entry Oct 21, 2026) found no 2026 entry on meeting, record, transcribe, dictation, voice, audio, video, microphone or camera — [Release notes](https://support.claude.com/en/articles/12138966-release-notes)
- [Official] The Claude Desktop changelog was read end to end (v4.4212.0 of 2026-10-29 back to v1.11187.4 of 2026-06-05). "parka" has no hits. "meeting" appears once, in a third-party-deployment note that admins can grant Microsoft 365 read scopes "such as Teams channel messages and meeting transcripts" (v1.12603.1, 2026-06-11). "audio" appears only as inline playback in the Code file viewer (v1.13576.0, 2026-06-16) — [Desktop changelog](https://claude.com/docs/cowork/changelog.md)
- [Official] The audio-adjacent desktop entries are small UI items: a microphone chevron switching between dictation and voice mode (v1.25927.0, 2026-08-04), Esc to end voice mode (v1.26832.0, 2026-08-06), dictation in the Claude in Chrome side panel (v1.37937.0, 2026-08-25), and dictation fixes (v2.31226.0, 2026-10-08; v3.6556.1, 2026-10-22) — [Desktop changelog](https://claude.com/docs/cowork/changelog.md)
- [Official] Claude Platform release notes (latest Oct 30, 2026; visible entries back to Feb 17, 2026) show no audio, speech or transcription input. The only audio mention is C2PA credentials on audio files Claude *produces* via code execution (Sep 1, 2026) — [Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)
- [Official] The claude.com docs index has no pages on voice, meetings or recording as topics; only dictation pages appear (Office add-ins, Claude Science) — [Docs index](https://claude.com/docs/llms.txt)
- [Official] Claude Duet (Oct 21, 2026) accepts voice messages, but it is not a meeting tool (details below) — [Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- [Official, Jul 23 2026] Hands-free voice conversation was added "earlier this year"; no meeting use is claimed — [Voice mode article](https://claude.com/resources/articles/think-through-hard-problems-in-voice-mode)

**Surface by surface**
- **claude.ai web:** voice mode (beta) and dictation only; no recorder is described — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode); [Claude Academy](https://academy.claude.com/tutorials/how-to-choose-between-voice-mode-and-dictation)
- **Claude Desktop (Windows, macOS, Linux beta):** same voice and dictation through the composer microphone — [Desktop changelog](https://claude.com/docs/cowork/changelog.md). Quick entry (Caps Lock dictation, drag-to-screenshot) is macOS only: "Quick entry is currently only available for macOS users" — [Quick entry](https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac)
- **Mobile (iOS, Android):** voice mode is "built to work best from your phone", plus dictation — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode); [Dictation on mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile)
- **Claude Code (CLI, VS Code, Desktop Code tab):** `/voice` dictates into the prompt and is "tuned for coding vocabulary"; no meeting function — [Voice dictation docs](https://code.claude.com/docs/en/voice-dictation)
- **Cowork:** dictation yes, voice mode no — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode). Its help page lists "Transcript analysis: Extract themes, key points, and action items from meeting notes, interviews, or lecture recordings" and "Turn voice memos and scattered notes into polished documents", yet never mentions audio handling. These read as text-input use cases, not capture — [Get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
- **Claude in Chrome:** the help page does not mention audio, video, meetings, Meet or Zoom. "Record workflows" means recording your own browser steps for replay (classic side panel only) — [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome). "Session recording" in the Claude Code integration means GIFs of browser interactions — [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- **Claude Tag (Slack; public beta, Team and Enterprise):** the user guide covers threads, files and connectors, with no huddle or audio feature, and states it cannot read a Slack canvas — [Claude Tag get started](https://claude.com/docs/claude-tag/users/getting-started.md). Slack's own AI huddle notes are stored in a canvas — [Slack help](https://slack.com/help/articles/31377193680019-Use-AI-to-take-huddle-notes-in-Slack)
- **Claude for M365 add-ins (Excel, PowerPoint, Word, Outlook):** dictation of prompts only, on desktop Office only — [Dictation in M365](https://claude.com/docs/office-agents/dictation.md)
- **Microsoft 365 connector:** reads what Microsoft already holds. "Teams Calendar: Review meeting information, summaries, and attendance" (no write) — [M365 connector](https://claude.com/docs/connectors/microsoft/365.md). The security guide lists `OnlineMeetingTranscript.Read.All`, `OnlineMeetingRecording.Read.All` and `OnlineMeetingAiInsight.Read`, but no listed tool is described as reading them — [Security guide](https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide)
- **Claude Duet (research preview):** "Type a message or record a voice message", US only, and "It doesn't make phone calls or send text messages to other people". No meeting features are described — [Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- **API:** "All current models support text and image input" — [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- **Claude Science:** a composer dictation button only — [Troubleshooting](https://claude.com/docs/claude-science/troubleshooting.md)

**Anthropic's own meeting-notes guidance assumes an outside recorder**
- [Official] The Academy use case reads "each transcript the call recorder posts" to a Slack channel; Claude only reads transcripts and writes tickets and pages — [Create meeting notes from a call transcript](https://academy.claude.com/use-cases/meeting-notes-and-filed-tasks-from-a-call-transcript)
- [Official marketplace listing, connector built by Zoom] Zoom for Claude retrieves existing summaries, recordings and transcripts; the page does not say it joins or records — [Zoom for Claude](https://claude.com/marketplace/connectors/zoom-for-claude)

**"Parka": the only native recorder signal (unreleased)**
- [Leak] RuntimeWire (Aug 19, 2026) reverse-engineered Claude Desktop 1.32885.1 and found a Mac-first recorder contract: "system and microphone audio capture", live speaker-attributed transcripts, summaries, notes, and follow-up actions routed to Cowork, Code or manual. It says public builds "keep the feature disabled and ship without its working native implementation or user interface" — [RuntimeWire](https://runtimewire.com/article/anthropic-s-project-parka-sits-through-meetings-and-assigns-claude-agents-the-ho)
- [Leak] On Windows, the packaged app reported the feature unavailable and the native loader was the same empty stub. Forcing bootstrap values to "supported" showed no meetings UI. A Deepgram link is explicitly "unconfirmed", no plan gating is mentioned, and the company "was not contacted before publication" — [RuntimeWire](https://runtimewire.com/article/anthropic-s-project-parka-sits-through-meetings-and-assigns-claude-agents-the-ho)
- [Third-party] Reworked (Aug 25, 2026): "The feature isn't public and Anthropic has yet to confirm it", "Anthropic did not respond to a request for comment", requires macOS 13 or newer, and the name may change — [Reworked](https://www.reworked.co/digital-workplace/anthropic-explores-meeting-recorder-that-assigns-tasks-to-claude-agents/)
- [Third-party, conflicting outlier] One AI digest (Aug 22, 2026) says "Anthropic ships Project Parka", but its only source is the RuntimeWire link and it cites no Anthropic announcement. I treat this as a misreading — [Daniel Keller tracker](https://danielkeller.com/ai-tracker/2026-08-22/)

**Joining a call**
- [Official, by absence] I found no Anthropic page describing a bot or participant mode for Zoom, Meet, Teams or Slack huddles. This rests on the pages cited above, not on an explicit denial
- [Third-party, vendors] "It can't join a call, listen to one or transcribe a recording" (Scribbl, checked against the help center Oct 6, 2026; sells a recorder) — [Scribbl](https://scribbl.co/post/claude-meeting-notes). Carly agrees and also sells a meeting tool — [Carly](https://www.usecarly.com/blog/claude-transcribe-meetings/). Alarcon re-checked Oct 28, 2026 and promotes affiliate tools — [Alarcon](https://christopheralarcon.com/blog/claude-vs-chatgpt-for-meeting-notes)

### Inferences
- "Recording with Claude" today means capture happens elsewhere and Claude receives text. Third-party statements agree with the official silence, but those authors have commercial interests, so the official logs are the stronger evidence.
- Parka suggests Anthropic may be building this, but a Windows user should not plan around it: it is unconfirmed, Mac-first, has no date, and could be renamed or dropped.
- Claude can only "attend" in the weak sense that Chrome or computer use could click a Join button (section 6). It would not hear anything or appear as a participant with its own audio.

### Gaps
- No Anthropic page explicitly says "Claude cannot record meetings"; the conclusion is built from absence across logs and docs.
- The desktop changelog starts at 2026-06-05, and platform notes before Feb 17, 2026 were not visible in the excerpt, so earlier 2026 entries are not audited there. The general release notes do list entries from Jan 12, 2026.
- Whether Parka has progressed since August: no public report after Aug 25 was found, and no plan or Windows information exists.

## 2. What do voice mode and dictation actually do, on which surfaces and plans? Could they capture a room? Is a transcript kept? Are there session limits?

### Takeaway
Voice mode is a two-way spoken conversation where Claude replies and interrupts at pauses; it keeps a text transcript and has no documented time limit, but it is designed for a single voice. Dictation turns your speech into prompt text and discards the audio; its only published time limit is 2 minutes in Claude Code. Every page describes microphone input only, and no native page describes system-audio capture or speaker labels.

### Cited Findings

**Voice mode**
- [Official] "A beta feature available to all plans", on mobile, desktop and web; Cowork and Claude Code excluded: "In Claude Cowork and Claude Code, dictation is available but voice mode isn't" — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official, Jul 23 2026] "On the Free plan, you get Claude Haiku, one connected tool, and all available languages"; "Paid plans can access expanded models and all your connected tools" — [Voice mode article](https://claude.com/resources/articles/think-through-hard-problems-in-voice-mode). Fable is not available in voice — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official] Voice "count[s] toward your regular usage limits". Session end: "Claude will remain in voice mode until you click the 'Stop' button". No time limit is stated — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official] Room capture signal: "Hands-free mode works best when Claude can detect only one voice"; push-to-talk is recommended in noisy or crowded settings, and background noise can cause false interruptions. Hands-free "listens continuously and responds to natural pauses" — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official] Transcript: "Textual transcripts of your audio conversations are saved in your chat history just like text conversations". Raw-audio handling is not stated — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode). Search excerpts of the privacy page say deleted chats leave back-end storage within 30 days, with de-identified retention up to 5 years if you allow training — [How long do you store my data?](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)
- [Official] The closest meeting use Anthropic suggests is a personal debrief: "Talk through what happened in a meeting as it comes back to you" — [Claude Academy](https://academy.claude.com/tutorials/how-to-choose-between-voice-mode-and-dictation)

**Dictation**
- [Official] Mobile: all plans; 12 languages including Spanish (non-English in beta); "After converting your speech input to text, we will delete your audio recording"; no maximum length given — [Dictation on mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile)
- [Official] Web, mobile and desktop per Academy, with the mic as the Cowork dictation button; no plan differences or time limit given — [Claude Academy](https://academy.claude.com/tutorials/how-to-choose-between-voice-mode-and-dictation). The mobile help article covers only iOS and Android, so it is narrower than Academy; the desktop changelog supports Academy — [Desktop changelog](https://claude.com/docs/cowork/changelog.md)
- [Official] Claude Code (paid plans, claude.ai login only): audio streams to Anthropic, "Audio is not processed locally"; "Transcription does not consume Claude messages or tokens"; needs a local microphone, so no cloud or SSH sessions; works on Windows through a native module; "Recording also stops automatically after 15 seconds of silence or two minutes total" (stated in the tap-mode section); VS Code: ends after 15 seconds without recognized words or two minutes after start — [Voice dictation docs](https://code.claude.com/docs/en/voice-dictation)
- [Official] M365 add-ins: desktop Office only, because "browser-hosted add-ins cannot access the microphone"; "Nothing is transcribed on your device"; a "contracted speech-to-text subprocessor" generates the transcript; "Audio is not retained after transcription" — [Dictation in M365](https://claude.com/docs/office-agents/dictation.md)
- [Official + community bug report] Chrome side-panel dictation was added on 2026-08-25, with one microphone allow in the extension's settings — [Desktop changelog](https://claude.com/docs/cowork/changelog.md). An earlier report (extension v1.0.85, opened Aug 19, 2026, macOS) said it was always blocked by a missing iframe `microphone` allow; a stale bot closed it as "not planned" on Sep 22 with no maintainer comment — [GitHub #87905](https://github.com/anthropics/claude-code/issues/87905)

### Inferences
- **Online meeting on a PC:** both features only hear the microphone, so with headphones the other participants would not be captured at all.
- **In-person meeting, phone on the table in voice mode:** you might get partial text in chat history, but Claude would speak back at pauses, the feature is designed for one voice, no speaker labels are documented, and each turn draws on usage limits. This is a poor and unreliable recorder, and Free would run on Haiku.
- **Dictation for a whole meeting:** ruled out in Claude Code by the 2-minute cap, and undocumented for long use elsewhere, so it should not be trusted.
- The realistic native uses are a spoken debrief right after the meeting and dictating your own notes.

### Gaps
- Not documented: voice mode with the screen off or in the background, raw voice audio retention, speaker labels, any export of voice transcripts, and a maximum dictation length on web, desktop and mobile.
- I found no measured accuracy for Chilean Spanish.

## 3. Can Claude take audio or video files, or only text? What are the size and usage limits? How far does a one-hour transcript go on Free versus Pro?

### Takeaway
Officially, only documents and images: audio and video are not on the upload list, and the API takes text and images and rejects audio in its OpenAI-compatible layer. So the practical intake is a text transcript. A one-hour transcript is about 15,000-25,000 tokens, which fits comfortably in context. Anthropic publishes no allowances, so my rough estimate is 1-2 transcript passes with a few follow-ups per 5-hour window on Free, and several times that on Pro.

### Cited Findings

**Apps**
- [Official, updated Jul 23 2026] Upload list: PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON, XLSX (code execution required), and JPEG, PNG, GIF, WebP. Audio and video are not mentioned. Chat limits: 500 MB per file, 20 files per chat, 1,000-page PDFs. Project files: 30 MB per file. No plan or surface differences are listed — [Upload files](https://support.claude.com/en/articles/8241126-upload-files-to-claude)
- [Official, conflict] The code-execution article gives "30MB per file for uploads and downloads", and says it accepts "CSV, TSV, and other files" — [Create and edit files](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude). This conflicts with 500 MB per chat file above; I could not resolve it, though the 500 MB page has the most recent explicit date.
- [Official] Claude Tag limits: images about 3.75 MB, PDFs 5 MB, other files 100 MB, 5 files per message; other file types go to "working files" — [Claude Tag get started](https://claude.com/docs/claude-tag/users/getting-started.md)
- [Official] The Google Drive connector reads Docs, Sheets, Slides, PDF, Office, OpenDocument, PNG and JPEG; no audio or video is listed, and Google caps Docs exports at about 10 MB — [Drive connector](https://claude.com/docs/connectors/google/drive.md)
- [Official] The Desktop Code file viewer plays video and audio inline; this is playback for a person, not understanding by Claude (v1.13576.0) — [Desktop changelog](https://claude.com/docs/cowork/changelog.md)
- [Third-party, vendors] "Does not accept audio or video files at all" — [Alarcon](https://christopheralarcon.com/blog/claude-vs-chatgpt-for-meeting-notes). Same conclusion in [Scribbl](https://scribbl.co/post/claude-meeting-notes). Carly says .txt, .vtt and .docx can be uploaded — [Carly](https://www.usecarly.com/blog/claude-transcribe-meetings/). VTT is not on the official list.

**API**
- [Official] "All current models support text and image input, text output..." — [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Official] "Audio and file inputs are not supported. A request that includes an `input_audio` or `file` content part returns a 400 error" (OpenAI-compatibility layer) — [OpenAI SDK compatibility](https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/openai-sdk)
- [Official] Files API: 500 MB per file, 1 TB per organization; PDF, text and images, plus "Datasets, others" via `container_upload` — [Files API](https://platform.claude.com/docs/en/build-with-claude/files)
- [Official] API code-execution container: 5 GiB RAM, 5 GiB disk, 1 CPU, "Internet access: Completely disabled". The listed libraries include no ffmpeg, Whisper or audio library, and packages can't be installed at runtime — [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)
- [Official] Anthropic's own voice cookbook uses ElevenLabs for speech-to-text, then sends text to Claude — [Cookbook](https://platform.claude.com/cookbook/third-party-elevenlabs-low-latency-stt-claude-tts)

**Unofficial route (flag clearly)**
- [Official] The chat sandbox differs from the API one: Free, Pro, Max and Ultra have network access on by default, with package hosts such as pypi.org allowed; audio, ffmpeg and Whisper are not mentioned — [Create and edit files](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)
- [Third-party, community] A Cowork skill claims attached `.m4a` files can be transcribed with faster-whisper in the sandbox. It targets a third-party Cowork gateway, uses English-only models, cites a 45-second bash timeout and about 3.9 GB RAM, and its 90-minute claim is hard to reconcile with that timeout — [GitHub skill](https://github.com/GarisonLotus/m4a-audio-meeting-transcription)

**Usage limits**
- [Official] No numeric allowances exist for any plan. Usage depends on conversation length, features, model and effort; claude.ai, Claude Code and Desktop share one limit; "Tools and connectors are token-intensive"; the paid-plan context is "up to a 1M token context window, while others support 500K or 200K" — [Usage and length limits](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits)
- [Official] Pricing shows "Limited usage" every 5 hours *and every week* on Free, and "Context window: Up to 1M, varies by model" on all plans. Free has Sonnet and Haiku, no Opus or Fable, and up to 5 Projects — [Pricing](https://claude.com/pricing). A search snippet showing 200k per plan looks like a stale snapshot, and the usage page speaks only of paid plans, so Free's real window is unclear.
- [Official] Pro: "More usage per session than the Free plan", with no multiplier or message count — [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan). Max is 5x Pro; Ultra is 10x Pro weekly with no 5-hour limit for verified accounts — [Pricing](https://claude.com/pricing). Team Standard is 1.25x and Premium 6.25x Pro per session — [Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)
- [Official] "Content in projects is cached and counts less against your limits when reused", but a first message after a long break counts in full — [Usage best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)
- [Third-party, older] Free: "roughly 15-40 messages per rolling 5-hour window" (observed, not official); a "single 40-page PDF with a detailed-summary request can drain the whole window in 5-8 turns" (anecdotal, Jul 8, 2026) — [heyuan110](https://www.heyuan110.com/posts/ai/2026-07-08-claude-free-tier-limits/)
- [Third-party] A Sep 3, 2026 version of Pro's page reportedly said "at least five times" Free; by Oct 8 that wording was gone. "About 45 messages" per session is called an unreliable observation — [LaoZhang](https://blog.laozhang.ai/en/posts/claude-daily-limit.md)
- [Conflict] The same blog describes Pro as adding a weekly limit on top of Free's session limit, while the official pricing card shows a weekly limit on Free too. I follow the pricing page — [LaoZhang](https://blog.laozhang.ai/en/posts/claude-daily-limit.md); [Pricing](https://claude.com/pricing)
- [Official] Tokenizer anchor: "1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer" — [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)

### Inferences
- **Token size of a transcript (my arithmetic):** 555k words per 1M tokens is about 1.8 tokens per word, so 8,000-10,000 words is about 14,400-18,000 tokens. Using characters instead, and assuming about 6 characters per Spanish word including spaces, gives 48,000-60,000 characters, or 19,000-24,000 tokens. Working range: **15,000-25,000 tokens**, which is 1.5-2.5% of a 1M window or 7.5-12.5% of a 200K window. Context is not the constraint; the usage allowance is.
- **Free (rough, built on a third-party anecdote):** 10,000 words is about 20 pages at 500 words per page, or half that 40-page PDF. That points to **about 1-2 transcripts per 5-hour window, with a handful of follow-ups**, varying with demand, plus an undisclosed weekly limit. Treat this as an order of magnitude only.
- **Pro (rough):** if the old "at least 5x" ratio still roughly holds, about **5-10 transcript passes per 5-hour window**, subject to a weekly cap. Anthropic no longer promises this ratio.
- Staying economical: one fresh chat per transcript, removing unused connectors, and Projects for repeated reference material. VTT or SRT files should be pasted or saved as .txt, since those formats are not on the upload list.
- **API price for comparison (my arithmetic):** a 20,000-token transcript plus a 2,000-token summary costs about $0.06 on Sonnet 5.5 ($2 in, $10 out per MTok) and about $0.12 on Opus 5.5 ($4 in, $20 out). API use needs separate Console setup and still needs text input — [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview); [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)
- An audio file might be reachable by Cowork or by a sandbox script, but no Anthropic page offers transcription, so any such route is an unsupported workaround using open-source tools.

### Gaps
- I did not test uploading an audio file in claude.ai, so the actual UI behavior (rejection or passing it to the sandbox) is unverified. The official statement is silence, not an explicit ban.
- No official Free or Pro token budget, and no official figure for how attachments count.
- The 500 MB versus 30 MB conflict, and the Free-plan context window.

## 4. What do plans cost, and which plans get connectors, custom MCP, skills, plugins, Claude Code, Cowork and desktop extensions? What can a Free user do?

### Takeaway
No plan buys a recorder. Paid plans add surfaces that can process transcripts or drive other apps. Free already includes voice, dictation, directory connectors, one custom connector, skills, desktop extensions and artifacts, but excludes Claude Code, Cowork, Chrome, computer use, M365 add-ins and Research. Note that a plan the brief did not list, Ultra, now exists, and that computer use excludes Team and Enterprise.

### Cited Findings

| Capability | Free | Pro | Max | Ultra | Team | Enterprise |
|---|---|---|---|---|---|---|
| Price (USD, excl. tax) | $0 | $20/mo, or $17/mo annual ($200 up front) | $100/mo | $200/mo | Standard $25/mo or $20 annual; Premium $125/mo or $100 annual; 2-150 seats | $20/seat annual, 20-seat minimum, plus usage at API rates |
| Usage | Limited, 5-hour and weekly | 1x | 5x Pro | 10x Pro weekly, no 5-hour limit if verified | Std 1.25x, Prem 6.25x Pro per session | Usage billed at API rates on top of the seat |
| Native meeting recording | No | No | No | No | No | No |
| Voice mode | Yes (Haiku, 1 tool) | Yes | Yes | Yes | Yes | Yes (admin can disable) |
| Directory connectors | Yes | Yes | Yes | Yes | Yes (Owner adds) | Yes (Owner adds) |
| Custom remote MCP connector | 1 | Yes | Yes | Yes | Yes (Owner adds) | Yes (Owner adds) |
| Desktop extensions | Yes | Yes | Yes | Yes | Yes | Yes |
| Skills | Yes, including uploading custom ZIPs | Yes | Yes | Yes | Yes, with sharing | Yes, with groups |
| Plugins | Directory not offered; other paths undocumented | Yes | Yes | Yes | Yes | Yes |
| Artifacts | Yes | Yes | Yes | Yes | Yes | Yes |
| Claude Code | No | Yes | Yes | Yes | Yes | Yes |
| Cowork | No | Yes | Yes | Yes | Yes | Yes (Owner enables web/mobile) |
| Claude in Chrome | No | Yes | Yes | Yes | Yes | Yes (Owner enables) |
| Computer use (beta) | No | Yes | Yes | Yes | No | No |
| M365 add-ins | No | Yes | Yes | Yes | Yes | Yes |
| Claude Tag (Slack) | No | No | No | No | Yes | Yes |
| Claude Duet (US only) | No | Waitlist | Waitlist | Waitlist | No | No |

- [Official] Prices, usage multiples, and the voice, connectors, skills, desktop extensions, artifacts, Claude Code, Chrome, M365 and Tag rows; "Prices shown don't include applicable tax" — [Pricing](https://claude.com/pricing). Seat limits and per-session ratios — [Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)
- [Official] Cowork: "available on paid plans (Pro, Max, Ultra, Team, and Enterprise)" — [Get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork). Merged into every conversation from Sep 16, 2026, rolling out gradually to Pro and Max — [Release notes](https://support.claude.com/en/articles/12138966-release-notes)
- [Official] Computer use: "Team and Enterprise plans don't have access to computer use at this time" — [Computer use help](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [Official] Claude Duet: Pro, Max and Ultra, "isn't available on Team or Enterprise plans yet", US only — [Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet). The release note names Pro and Max only — [Release notes](https://support.claude.com/en/articles/12138966-release-notes)
- [Official] Max, Ultra and Team include monthly API credits ($100, $200, and up to $500 pooled) — [Pricing](https://claude.com/pricing)

**What a Free user can do with connectors and skills**
- [Official] Directory connectors are available to Free, with no numeric limit stated; Free is "limited to one custom connector". Custom connectors run from Anthropic's cloud, so the MCP server must be reachable over the public internet. Desktop extensions are available to all users on Claude Desktop — [Use connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [Official] Voice mode on Free can use one connected tool — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official] Skills on Free: turn built-ins (Excel, Word, PowerPoint, PDF) on or off, use example skills, upload custom skills as ZIPs, delete them. No sharing or publishing, and code execution must be enabled — [Use skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude). "Record a skill" is not on Free and is Mac only — [Custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [Official, conflicting] "Custom skills require a Pro, Max, Ultra, Team, or Enterprise plan with code execution enabled" (dated Nov 19, 2025, but naming Ultra, so it has been edited since). This contradicts the help article above. I lean to the help article because it is specific about Free, but the conflict is unresolved — [Skills article](https://claude.com/resources/articles/how-to-create-skills-key-steps-limitations-and-examples)
- [Official] Plugins: "The directory's plugins appear on Pro, Max, Ultra, Team, and Enterprise plans"; add via Customize > Plugins; upload limit 200 MB — [Plugins](https://claude.com/docs/plugins/overview.md); [Platform support](https://claude.com/docs/plugins/platform-support.md)
- [Official] The M365 connector is on every plan including Free, but needs a work or school account and Entra Global Admin consent; personal outlook.com accounts aren't supported — [M365 connector](https://claude.com/docs/connectors/microsoft/365.md)
- [Official] Artifacts require "Cloud code execution and file creation" to be on — [What are artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

### Inferences
- On Free, the workable native flow is to get a transcript elsewhere, paste it or pull it through a connector, and let a built-in or uploaded skill format the minutes. No automation is available, since scheduled tasks are part of Cowork.
- A Free user can connect a third-party recorder's connector, but that recorder is the thing that records.
- Upgrading to Pro does not add recording. It adds capacity plus Cowork, Chrome and computer use, which could automate the surrounding steps.
- **Bottom line by plan.** Free: mic-only voice and dictation, plus text transcript processing. Pro, Max, Ultra: the same, plus `/voice`, Cowork automation, Chrome, computer use and more capacity. Team, Enterprise: the same minus computer use, plus Claude Tag and organization-wide connectors. No plan records a meeting.

### Gaps
- Whether a Free user can upload custom skills is contradicted between two Anthropic pages, as noted above.
- Whether a Free user can add plugins by upload or marketplace is not stated.
- Whether Free's one-custom-connector limit counts desktop extensions is not stated.
- Max annual pricing is not listed.

## 5. Published Artifacts: is the microphone, camera or screen capability documented, and could an Artifact realistically be a browser recorder?

### Takeaway
It is mentioned in one place only, the description line of the local `artifact-capabilities` skill, and this account's live roster does not include it. Public docs are silent on device access. **An Artifact is not a realistic recorder today.** Even if capture worked, Claude could not receive the audio from the page, and the page cannot send it to an outside service.

### Cited Findings
- [Observed here] The skill's description in this session's skill list says pages can use "the viewer's camera, microphone, location, screen or device motion", and that the skill "Serves this user's live capability roster" — Local skill folder (archivo local, no publicado)
- [Observed here] The roster served to this account (contract 0.2.96): `artifact, assets, comments, db, downloads, files, mcp, room, sample, self, user`, plus built-in `permissions`. "Anything not listed is unavailable to this user." — Local skill folder (archivo local, no publicado)
- [Observed here] A case-insensitive search of all 13 type-definition files found no microphone, camera, `getUserMedia`, `getDisplayMedia`, `MediaRecorder` or audio definition. An undeclared or unavailable capability answers "unavailable" — permissions.d.ts (archivo local, no publicado)
- [Official] Public pages do not mention microphone, camera, screen or device access — [What are artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them); [Publish and share](https://support.claude.com/en/articles/9547008-publish-and-share-artifacts); [Claude Code artifacts](https://code.claude.com/docs/en/artifacts)
- [Official] Network: "lets `fetch`, XHR, and WebSocket calls reach only the page's own origin and the Google Fonts hosts"; no backend; 16 MiB rendered page; served from a sandboxed `*.claudeusercontent.com` origin. Runtime capabilities are enabled "per account" — [Claude Code artifacts](https://code.claude.com/docs/en/artifacts)
- [Observed here] `sample` (asking Claude from the page) takes text and optionally images, with no audio input — sample.d.ts (archivo local, no publicado)
- [Observed here] `assets.upload` accepts png, jpeg, gif, webp, svg, mp4, webm, pdf, fonts and text types, capped at 20 MiB, with no audio types — assets.d.ts (archivo local, no publicado)
- [Observed here] `downloads.save` allows gif, png, jpg, jpeg, webp, mp4, webm, mov, txt, json, md, docx, pptx, epub, csv, ttf, html, svg, pdf, xlsx, zip and fig, not mp3, wav or m4a. Ordinary saves have no size limit, except 200 MiB in the Android app — downloads.d.ts (archivo local, no publicado)
- [Observed here] `mcp` can call the viewer's connectors, or a local MCP server when opened in the Claude app — mcp.d.ts (archivo local, no publicado)
- [Official] Storage is limited to 20 MB per artifact — [What are artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)
- [Official] Plans: artifacts on all plans. Publishing a legacy chat artifact: Free, Pro, Max, Ultra. New Share menu: "Only you" or "Anyone with the link" is described for Pro, Max and Ultra, and "Everyone needs a Claude account" except for legacy published artifacts — [Publish and share](https://support.claude.com/en/articles/9547008-publish-and-share-artifacts). Publishing from Claude Code and connector calls from artifacts: Pro and up, and Claude Code artifacts can be shared by public link with no sign-in (differs from the help-center rule) — [Claude Code artifacts](https://code.claude.com/docs/en/artifacts)
- [Third-party, Mar 18 2026] A Chrome extension claims to strip Permissions-Policy and CSP so artifacts can use the microphone and camera, which implies they are blocked by default. It is unaffiliated, its developer is unidentified, and removing those protections is a security risk — [Chrome Web Store listing](https://chromewebstore.google.com/detail/claude-artifacts-unlocker/pmphjmnhhcoofaidfldpacnaojpiigoi)

### Inferences
- The description line suggests a device capability exists or is planned for some accounts, but it is not available to this one. It should be reported as "mentioned, not served, not publicly documented".
- If a future roster adds it, the best case would be capturing to `.webm` and saving locally through `downloads`. Transcription would still be missing, because `sample` is text and images only and the CSP blocks outside speech-to-text calls.
- What an Artifact can do natively is **manual** capture: a shared notes board using `db` and `room`, with `sample` summarizing typed notes and `downloads` saving .md or .txt. Subject to capabilities being enabled for the account.
- With `mcp`, a page could act as a front end for a separate recorder's connector, but that recorder is not Anthropic's.

### Gaps
- Whether `navigator.mediaDevices` works inside an artifact's sandboxed iframe was not tested, because publishing was out of scope. The default Permissions-Policy is undocumented officially.
- Which accounts or plans get a device capability, if any, is unknown. The roster seen here applies to this account only and says nothing about Free.
- Whether Free can use the new Share menu is unclear: the sources disagree and the extracted table was incomplete — [Share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts)

## 6. Can computer use and Claude in Chrome operate a third-party recorder or start a recording inside a meeting? What are the documented limits, including audio?

### Takeaway
Plausibly yes for the clicking, but no for the hearing. Computer use can control native desktop apps, and Claude in Chrome can drive web apps, so either could press a Record button. Neither is documented to access audio, neither is documented for this use, and the recording would belong to the other app. Reliability during a live meeting is unproven and should not be assumed.

### Cited Findings

**Computer use**
- [Official] Beta for Pro, Max and Ultra; macOS and Windows via Desktop; the computer must be awake and the Desktop app open; complex tasks may need a retry; per-app approval; investment and crypto apps blocked by default — [Computer use help](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [Official] Tool order: connectors, then browser, then screen interaction. Screen work uses screenshots, clicks, typing and opening apps. "Audio" is not addressed — [Computer use help](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [Official] Fixed tiers: view-only for browsers and trading platforms; click-only for terminals and IDEs; full control for "Everything else". "These tiers are fixed by app category and can't be changed." On Windows "the toggle takes effect immediately" — [Desktop docs](https://code.claude.com/docs/en/desktop)
- [Official] The CLI version is macOS only. One session at a time; other visible apps are hidden while Claude works (auto-unhide is optional on Desktop) — [CLI computer use](https://code.claude.com/docs/en/computer-use)
- [Official] Background-window operation is described only for macOS 15+. "Claude asks for your permission the first time a task needs the full screen in each session" — [Computer use help](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [Official] Claude "can see any information visible on your screen". It is trained to avoid "Gathering or scraping facial images", and the page advises against "Interacting with apps containing personal information of others" — [Computer use help](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [Official] The API toolset has 17 members: screenshot, zoom, clicks, drag, move, scroll, type, key, hold_key, wait and cursor_position. None is audio, and audio was not mentioned in the portion read (first 100k of 135k characters). "Claude sometimes acts as if its actions succeeded without explicitly checking their results" — [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- [Official] A bug where computer use on macOS refused clicks "while a screen recording was running" was fixed in v1.32352.0 (2026-08-17), which shows the two can interfere — [Desktop changelog](https://claude.com/docs/cowork/changelog.md)

**Claude in Chrome**
- [Official] Paid plans only; "not supported on other Chromium-based web browsers or mobile devices"; background work continues only "as long as Chrome is open" — [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome). Conflict: the Claude Code docs say the integration works with Chrome and Edge and detects others — [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- [Official] The permissions guide does not mention audio or tab capture. "Granting authorizations" needs explicit permission in every mode. Creating accounts and purchases are prohibited regardless of mode — [Permissions guide](https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide). The only sound item in the extension is an offscreen permission to play notification sounds — [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)
- [Official] It pauses at logins and CAPTCHAs; JavaScript dialogs block commands; the extension's service worker "can go idle during extended sessions, which breaks the connection" — [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- [Observed here] The `gif_creator` tool schema loaded in this session records "browser actions (clicks, scrolls, navigation)" and exports an animated GIF, using screenshots as first and last frames. It is an action log, not meeting video, and the same docs describe it as GIFs of browser interactions — [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- [Official] Admins can restrict sites on Team and Enterprise — [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)

### Inferences
- **Desktop meeting or recording app on Windows** (Zoom client, OBS, Windows Sound Recorder): falls under "Everything else", so full control after you approve it. No page names these apps, so this is my reading of the tier rule, not a documented use case.
- **Browser-based meeting:** computer use is view-only on browsers, so Claude in Chrome would be the tool. It could plausibly click a page's Record button, but the platform's own recording license and consent prompts still apply.
- **Live-meeting risks:** hidden windows, screen takeover, slow screenshot loops, connection idling, and no way for Claude to confirm that audio is actually being captured. It can only see a recording indicator. Faces and names on screen also run against the published guidance on others' personal data.
- This route falls outside "Anthropic alone" unless the recorder is something already on the OS. Starting a recorder by hand takes seconds and is more reliable than delegating it.
- **Claude Code as a builder:** it could write a local capture and transcription script, but the engine would be open-source software, not an Anthropic feature. Community skills of that kind exist and are unverified — [transcript-critic](https://github.com/jftuga/transcript-critic)

### Gaps
- I found no official statement on using these tools to control meeting apps, and none saying audio is excluded. The conclusion comes from tool lists and silence.
- Windows-specific behavior (foreground takeover, hidden apps on Desktop) is not spelled out. The portion of the desktop docs read mentions no audio, and the last 11k characters were not read.
- No hands-on test was run during a real meeting.

## 7. Regional, language and Windows 11 Home limits (assignment constraints)

### Takeaway
Chile is a supported region, and Spanish works in voice and dictation, generally labeled beta and selected manually. The main regional exclusion is Claude Duet (US only). On Windows, there is no quick entry, Parka is unavailable per the leak, and Cowork requires admin rights and the Virtual Machine Platform feature.

### Cited Findings
- [Official] Chile is listed; the policy covers Claude.ai, Claude Code, Cowork, the API and the developer platform — [Supported regions](https://www.anthropic.com/supported-countries)
- [Official] Voice languages: eleven, including "Spanish (Latin America and Spain)". "Claude doesn't automatically detect your language" — [Voice mode article](https://claude.com/resources/articles/think-through-hard-problems-in-voice-mode). Set under Settings > Capabilities > Voice > Spoken language; non-English is in beta — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- [Official] Mobile dictation includes Spanish, in beta — [Dictation on mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile). Claude Code supports `es`, but an empty `language` setting defaults to English, so it must be set — [Voice dictation docs](https://code.claude.com/docs/en/voice-dictation)
- [Official] Duet: "available in the US only during the research preview" — [Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- [Official] Pro is "$20 per month (US), with pricing in your local currency where supported" — [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan). The pricing page lists USD, excluding tax — [Pricing](https://claude.com/pricing). [Third-party] One comparison site's figure of about 19,000 CLP has no official backing — [gptprompts.ai](https://gptprompts.ai/es/precios-claude)
- [Official] Desktop requires "Windows 10 or higher" — [Install Desktop](https://support.claude.com/en/articles/10065433-install-claude-desktop). "Claude Desktop for Windows requires the Virtual Machine Platform to use Cowork", and without admin rights "Cowork on desktop will not be available". Neither page mentions the Home edition — [Deploy on Windows](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows)
- [Official] On Windows, `/voice` needs microphone access for desktop apps turned on under Settings > Privacy & security > Microphone — [Voice dictation docs](https://code.claude.com/docs/en/voice-dictation)
- [Observed here] This session's environment reports Windows 11 Home Single Language (10.0.26300), and its deferred tool list includes computer-use and Claude-in-Chrome tools. That suggests no Home-edition block at the tool-list level, but it does not prove they work; no source link applies because this is session metadata

### Inferences
- For Spanish meetings, the language setting is a required step, and "beta" means accuracy should be tested on a real Chilean Spanish sample before relying on it.
- A meeting-transcript workflow in Spanish is mainly a text task, so the beta label on speech features matters little once a transcript exists.

### Gaps
- No official price in CLP, and no confirmation of whether Chile gets local-currency billing; claude.ai/upgrade from Chile would settle it.
- No official statement on Windows 11 Home and Cowork specifically.
- The full list of eleven voice languages was only partly extracted, and the M365 dictation page gives no language list.
