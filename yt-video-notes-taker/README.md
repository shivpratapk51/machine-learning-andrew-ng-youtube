# YouTube Video Notes Taker

A small TypeScript note-taking utility that fetches a YouTube transcript, sends it to an LLM, and writes clean Markdown lecture notes to a `lec-<number>/notes.md` folder.

## Features

- Downloads YouTube transcripts from a video URL
- Uses an LLM to convert transcript text into structured notes
- Outputs formatted Markdown with headings, bullets, summaries, and takeaways
- Saves notes into a lecture-specific folder

## Requirements

- Node.js (v18+ recommended)
- npm
- NVIDIA-compatible LLM API credentials

## Setup

1. Install dependencies:

```bash
cd yt-video-notes-taker
npm install
```

2. Create a `.env` file in the same folder with your NVIDIA API settings:

```env
NVIDIA_API_KEY="your_api_key_here"
NVIDIA_INVOKE_URL="https://integrate.api.nvidia.com/v1/chat/completions"
```

> The repository already includes a sample `.env` file with placeholder keys.

## Usage

Run the app with a YouTube video URL and a lecture number:

```bash
node .\index.ts "https://youtu.be/jGwO_UgTS7I" 1
```

Or with a full YouTube watch link:

```bash
node .\index.ts "https://www.youtube.com/watch?v=jGwO_UgTS7I" 1
```

### Arguments

- `<url>`: A valid YouTube video URL or shortened `youtu.be` link
- `<lecture number>`: A numeric lecture identifier used to name the output folder

## Output

The generated notes are saved to:

```text
../lec-<lecture_number>/notes.md
```

For example, with lecture number `1`, the notes will be written to:

```text
lec-1/notes.md
```

## How it works

1. The app downloads the YouTube transcript using `youtube-transcript`.
2. It sends the transcript to the LLM service configured in `.env`.
3. The LLM response is streamed and written to Markdown in the lecture folder.

## Customization

- Change the model used in `index.ts` by updating the `model` field passed to `llm()`.
- Modify the note formatting prompt in `prompt.ts`.
- Adjust LLM settings such as `temperature` and `maxTokens` in `index.ts`.

## Troubleshooting

- If transcript extraction fails, verify the video URL is valid and public.
- If the LLM request fails, check your `.env` values and API access.
- If the output folder is not created, ensure the script has filesystem permissions.

## Notes

- The app is designed to produce short, readable Markdown notes rather than raw transcripts.
- The `lec-<number>` folder is created automatically if it does not already exist.

## Example

```bash
cd yt-video-notes-taker
npm install
node .\index.ts "https://youtu.be/jGwO_UgTS7I" 1
```

Then open `../lec-1/notes.md` to view the generated lecture notes.


