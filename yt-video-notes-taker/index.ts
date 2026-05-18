import dotenv from "dotenv";
import fs from "fs";
import path from "path";


dotenv.config();

import { llm } from "./llm.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";
import yt_transcript from "./yt_transcript_get.ts";


async function main(url: string, lecture_num: number) {
  console.log("Extracting transcript");

  const transcript = await yt_transcript(url);
  console.log("--Making Notes--");
  console.log("Wait for a second");

  const outputDir = path.resolve(import.meta.dirname, `../lec-${lecture_num}`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.resolve(outputDir, `notes.md`);

  const writeStream = fs.createWriteStream(filePath, { encoding: "utf8" });

  try {
    const response = await llm({
      systemPrompt: SYSTEM_PROMPT,
      query: transcript,
      model: "moonshotai/kimi-k2.6",
      stream: true,
      temperature: 0.15,
      maxTokens: 10000,
    });
    for await (const chunk of response) {
      writeStream.write(chunk);
      process.stdout.write(chunk);
    }
  } catch (error) {
    console.error("An error occurred during LLM stream:", error);
  } finally {
    writeStream.end();
  }
  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

async function run() {
  const ytRegex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?(?:.*&)?v=))([a-zA-Z0-9_-]{11})(?:\S+)?$/;
  const args = process.argv.slice(2);

  if (args.length < 2 || args.length > 2) {
    console.log(`Error: Please provide exactly 2 inputs.
<url> <lecture number>
        `);
    return;
  }

  const [url, lec_no] = args;

  if (!ytRegex.test(url)) {
    console.log("Please enter youtube video url.");
    return;
  }

  try {
    const lec = Number(lec_no);
    if (url && lec) {
      console.log("--Started--");

      await main(url, lec);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

run();
