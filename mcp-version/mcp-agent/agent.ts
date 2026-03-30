

import { Mistral } from "@mistralai/mistralai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from "dotenv";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


async function connectToServer() {

    const serverPath = path.resolve(
        __dirname,
        "../mcp-server/index.ts"
    );


    const transport = new StdioClientTransport({
        command: "npx",
        args: ["tsx", serverPath],
    });


    const client = new Client({
        name: "course-recommender-agent",
        version: "1.0.0",
    });


    await client.connect(transport);
    console.error("✅ Connected to MCP server\n");

    return client;
}


function convertMCPToolsToMistralTools(mcpTools: any[]) {
    return mcpTools.map((tool) => ({
        type: "function" as const,
        function: {
            name: tool.name,
            description: tool.description,
            parameters: {
                type: "object",
                properties: tool.inputSchema.properties ?? {},
                required: tool.inputSchema.required ?? [],
            },
        },
    }));
}


async function processTurn(
    messages: any[],
    mistralTools: any[],
    mcpClient: any
): Promise<string> {
    while (true) {
        const response = await mistral.chat.complete({
            model: "mistral-large-latest",
            messages: messages,
            tools: mistralTools,
            toolChoice: "auto",
        });

        const choice = response.choices?.[0];
        if (!choice) return "No response received from Mistral.";

        const message = choice.message;
        messages.push(message);

        // Case 1 — Mistral wants to call a tool
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


                const toolResult = await mcpClient.callTool({
                    name: toolName,
                    arguments: toolArgs,
                });


                const resultText =
                    toolResult.content?.[0]?.text ?? "No result";

                console.log(`   Result        : ${resultText}`);


                messages.push({
                    role: "tool",
                    name: toolName,
                    content: resultText,
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
    console.log("   (MCP Version)");
    console.log("─".repeat(50));

    // Step 1 — Connect to MCP server
    console.log("⏳ Connecting to MCP server...");
    const mcpClient = await connectToServer();

    const { tools: mcpTools } = await mcpClient.listTools();
    console.log(
        `🔍 Discovered ${mcpTools.length} tools from MCP server:`
    );
    mcpTools.forEach((tool: any) => {
        console.log(`   → ${tool.name}`);
    });
    console.log();

    // Step 3 — Convert MCP tools to Mistral format
    const mistralTools = convertMCPToolsToMistralTools(mcpTools);

    console.log("💡 Type 'exit' or 'quit' to end the session\n");
    console.log("─".repeat(50) + "\n");

    // Conversation history — persists across all turns
    const messages: any[] = [];

    while (true) {
        const userInput = await askUser("You: ");
        const trimmed = userInput.trim();

        if (
            trimmed.toLowerCase() === "exit" ||
            trimmed.toLowerCase() === "quit"
        ) {
            console.log("\n👋 Session ended. Happy learning!\n");
            await mcpClient.close();
            rl.close();
            break;
        }

        if (!trimmed) continue;

        messages.push({ role: "user", content: trimmed });
        console.log("\n⏳ Agent is thinking...\n");

        const agentReply = await processTurn(
            messages,
            mistralTools,
            mcpClient
        );

        console.log("\n" + "─".repeat(50));
        console.log("\n🤖 Agent:\n");
        console.log(agentReply);
        console.log("\n" + "─".repeat(50) + "\n");
    }
}

startConversation();
