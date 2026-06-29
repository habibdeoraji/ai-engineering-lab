import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const model = anthropic("claude-haiku-4-5");

const terminal = createInterface({ input, output });
let messages = [];

console.log("----messages-", messages);

try {
  while (true) {
    // messages = []; to check sttaelessnes of model calling
    const userInput = await terminal.question("You: ");

    if (userInput.trim().toLowerCase() === "exit") {
      break;
    }

    messages.push({
      role: "user",
      content: userInput,
    });

    console.log("after user:", messages);

    const result = await generateText({
      model,
      messages,
    });

    console.log(`Assistant: ${result.text}`);

    messages.push({
      role: "assistant",
      content: result.text,
    });

    console.log("Tell assistant:", messages);
  }
} finally {
  terminal.close();
}
