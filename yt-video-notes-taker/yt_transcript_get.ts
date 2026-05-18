import { fetchTranscript } from "youtube-transcript";

export default async function yt_transcript(url: string) {
  const transcript = await getTranscript(url);
  const text = transcript.map(item => item.text).join(" ")
  return text
}

async function getTranscript(url: string) {
  const transcript = await fetchTranscript(url);
  return transcript;
}