import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

import { llm } from "./llm.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";
import yt_transcript from "./yt_transcript_get.ts";

async function run(url: string) {
  const outputDir = path.resolve(__dirname, "./output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.resolve(outputDir, "lec-1.md");

  const writeStream = fs.createWriteStream(filePath, { encoding: "utf8" });
  try {
    const response = await llm({
      systemPrompt: "you are helpful assistant",
      query: "Hello, who are you.", 
      model: "moonshotai/kimi-k2.6",
      stream: true,
      temperature: 0.15,
      maxTokens: 10000,
    });
    for await (const chunk of response) {
      writeStream.write(chunk);
      process.stdout.write(chunk)
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

await run("https://youtu.be/jGwO_UgTS7I?si=GYJjut2i_NCY6WD1");
