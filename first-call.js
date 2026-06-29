import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const { text, usage } = await generateText({
  model: anthropic("claude-haiku-4-5"),
  system: "You are consise",
  messages: [
    {
      role: "user",
      content: "Explain token in one sentence",
    },
  ],
});

console.log("text--------", text);
console.log("usage------", usage);
