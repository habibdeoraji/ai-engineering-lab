import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-haiku-4-5");
const inputs = [
  {
    name: "clear",
    text: `Meeting Notes - Product Roadmap Review
Date: June 25, 2026
Attendees: Sarah Chen (PM), James Okafor (Engineering Lead), Priya Nair (Design)

We reviewed Q3 priorities. The team agreed to push the analytics dashboard to Q4 due to backend dependencies. James flagged that the API refactor needs two more sprints. Priya will deliver final mockups for the onboarding redesign by July 3rd. Action items: Sarah to update the roadmap doc, James to schedule a technical spec review next week.`,
  },
  {
    name: "messy",
    text: `jun 27 client call - mark was there, tobi, lisa maybe someone else?? 
talked abt timeline - aug 15 is the date i think or maybe 14th
gdpr thing came up again lisa said she'd send something by friday (which friday??)
tobi doing mondays 10am calls - budget ok for now phase 2 tbd board thing in july
note to self: follow up on the eu data stuff its important!!!
also mark mentioned something about the API but i didnt catch all of it`,
  },
  {
    name: "ambiguous",
    text: `Retro meeting, last Friday.
Team discussed the sprint. Some things went well, some didn't. People had thoughts about the tickets. The pipeline stuff was brought up and everyone seemed happy about it. There was some confusion during the sprint that we want to avoid next time. A few decisions were made about process going forward. Times are changing. Overall good meeting, team is in a good place.`,
  },
];

const task = "Extract action items from teh meeting";

const naive = `Extract action items form the meeting notes and return a bullet list`;
const fewShot = `
Extract action items from meeting notes.

Return each item with:
- owner
- task
- due date, or "unspecified"

Example 1:
Meeting note: Sarah will send the invoice by Friday.
Output:
- Owner: Sarah | Task: Send the invoice | Due: Friday

Example 2:
Meeting note: We should review the contract. Mark said he can do it.
Output:
- Owner: Mark | Task: Review the contract | Due: unspecified
`;
const reasoning = `
Extract action items from the meeting note.
Think carefully about implied owners and deadlines, but return only the final action items.

Return each item with:
- owner
- task
- due date, or "unspecified"
`;

const prompts = [
  { name: "naive", system: naive },
  { name: "few-shot", system: fewShot },
  { name: "reasoning", system: reasoning },
];

for (const promptVersion of prompts) {
  for (const input of inputs) {
    const result = await generateText({
      model,
      system: promptVersion.system,
      prompt: input.text,
    });

    console.log("\n==============================");
    console.log(`PROMPT: ${promptVersion.name}`);
    console.log(`INPUT: ${input.name}`);
    console.log("------------------------------");
    console.log("OUTPUT:");
    console.log(result.text);
    console.log("------------------------------");
    console.log("USAGE:");
    console.log(result.usage);
  }
}
