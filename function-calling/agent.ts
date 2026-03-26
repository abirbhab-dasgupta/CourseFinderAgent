import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";
import readline from "readline";
import { tools } from "./tools.js";
import {
    searchCourses,
    getCourseDetails,
    getCourseReviews,
} from "./toolHandler.js";

dotenv.config();

const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY!,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askUser(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

function runTool(
    toolName: string,
    args: Record<string, unknown>
): string {
    switch (toolName) {
        case "search_courses":
            return JSON.stringify(
                searchCourses(
                    args.topic as string,
                    args.skill_level as string,
                    args.budget as number
                )
            );

        case "get_course_details":
            return JSON.stringify(
                getCourseDetails(args.course_name as string)
            );

        case "get_course_reviews":
            return JSON.stringify(
                getCourseReviews(args.course_name as string)
            );

        default:
            return JSON.stringify({
                error: `Unknown tool: ${toolName}`,
            });
    }
}

async function processTurn(messages: any[]): Promise<string> {
    while (true) {
        const response = await mistral.chat.complete({
            model: "mistral-large-latest",
            messages: messages,
            tools: tools as any,
            toolChoice: "auto",
        });

        const choice = response.choices?.[0];

        if (!choice) {
            return "No response received from Mistral.";
        }

        const message = choice.message;
        messages.push(message);

        if (
            choice.finishReason === "tool_calls" &&
            message.toolCalls
        ) {
            for (const toolCall of message.toolCalls) {
                const toolName = toolCall.function.name;
                const toolArgs = JSON.parse(
                    toolCall.function.arguments as string
                );

                console.log(`\n🔧 Calling tool : ${toolName}`);
                console.log(
                    `   Arguments     : ${JSON.stringify(toolArgs)}`
                );

                const toolResult = runTool(toolName, toolArgs);
                console.log(`   Result        : ${toolResult}`);

                messages.push({
                    role: "tool",
                    name: toolName,
                    content: toolResult,
                    toolCallId: toolCall.id,
                });
            }

            continue;
        }

        if (choice.finishReason === "stop") {
            return message.content as string;
        }

        return `Unexpected finish reason: ${choice.finishReason}`;
    }
}

async function startConversation() {
    console.log("\n📚 Course Recommender Agent");
    console.log("   (Function Calling Version)");
    console.log("─".repeat(50));
    console.log("💡 Type 'exit' or 'quit' to end the session\n");

    const messages: any[] = [];

    while (true) {
        const userInput = await askUser("You: ");
        const trimmed = userInput.trim();

        if (
            trimmed.toLowerCase() === "exit" ||
            trimmed.toLowerCase() === "quit"
        ) {
            console.log("\n👋 Session ended. Happy learning!\n");
            rl.close();
            break;
        }

        if (!trimmed) continue;

        messages.push({
            role: "user",
            content: trimmed,
        });

        console.log("\n⏳ Agent is thinking...\n");

        const agentReply = await processTurn(messages);

        console.log("\n─".repeat(50));
        console.log("\n🤖 Agent:\n");
        console.log(agentReply);
        console.log("\n" + "─".repeat(50) + "\n");
    }
}

startConversation();