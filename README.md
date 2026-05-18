# Machine Learning Andrew Ng YouTube Notes

This repository contains a simple workflow for extracting YouTube transcripts and generating structured Markdown lecture notes using an LLM.

## Repository structure

- `yt-video-notes-taker/` - TypeScript utility that downloads a YouTube transcript, sends it to an LLM, and writes formatted notes.
- `lec-1/` - Example lecture notes output folder created by the tool.
  - `main.ipynb` - Notebook for lecture notes or experiments.
  - `notes.md` - Generated lecture notes for lecture 1.

## Purpose

The main goal is to take a YouTube lecture URL and automatically generate clean, readable Markdown notes in a lecture folder like `lec-1/`.

This project is also a personal learning tool for studying lecture content and capturing key ideas from the videos.

## Setup

1. Install Node dependencies:

```bash
cd yt-video-notes-taker
npm install
```

2. Add a `.env` file inside `yt-video-notes-taker/` with your NVIDIA API credentials:

```env
NVIDIA_API_KEY="your_api_key_here"
NVIDIA_INVOKE_URL="https://integrate.api.nvidia.com/v1/chat/completions"
```

## Usage

From the `yt-video-notes-taker` folder, run:

```bash
npm install
node .\index.ts "https://youtu.be/jGwO_UgTS7I" 1
```

The script expects:

- A YouTube video URL
- A lecture number

It saves notes to `../lec-<number>/notes.md`, for example `lec-1/notes.md`.

## How it works

- `yt_transcript_get.ts` fetches the YouTube transcript.
- `index.ts` sends the transcript to `llm.ts`.
- `llm.ts` calls the NVIDIA LLM endpoint and streams the generated Markdown.
- `prompt.ts` defines the note-taking prompt used by the model.

## Notes

- The output folder is created automatically if it does not exist.
- The generated note structure includes a title, summary, headings, lists, and takeaways.
- You can update the model, prompt, or LLM settings in `yt-video-notes-taker/index.ts`.

## Example

```bash
cd yt-video-notes-taker
npm install
node .\index.ts "https://www.youtube.com/watch?v=jGwO_UgTS7I" 1
```

Then open `../lec-1/notes.md` to view the generated notes.
