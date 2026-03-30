# 📚 Course Recommender Agent

An AI agent that recommends online courses based on your topic, skill level, and budget.

Built to demonstrate the difference between **Function Calling** and **MCP (Model Context Protocol)** in real-world AI agent development.

---

## What This Project Does

You tell the agent what you want to learn, your skill level, and your budget.  
The agent searches courses, fetches details, reads reviews, and recommends the best option — all autonomously.

**Example:**
```
You: I want to learn machine learning, I am a beginner, budget ₹1000
Agent: Based on my research, I recommend Machine Learning A-Z on Udemy...
```

---

## Two Versions — Same Agent, Different Architecture

| | Function Calling | MCP Version |
|---|---|---|
| Tools defined | Inside the agent | Independent server |
| Tool routing | Manual switch statement | Auto discovery |
| Swap LLM | Rewrite agent.ts | Just reconnect client |
| Share tools | Copy paste | Any agent can connect |

---

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **LLM:** Mistral AI (`mistral-large-latest`)
- **Protocol:** Model Context Protocol (MCP) SDK
- **Validation:** Zod

---

## Project Structure
```
course-recommender-agent/
├── function-calling/
│   ├── toolHandlers.ts   ← tool logic + mock data
│   ├── tools.ts          ← JSON schemas for Mistral
│   └── agent.ts          ← Mistral client + agentic loop
│
├── mcp-version/
│   ├── mcp-server/       ← independent MCP tool server
│   └── mcp-agent/        ← agent that connects to MCP
│
├── .env.example          ← environment variable template
└── README.md
```

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/abirbhab-dasgupta/CourseFinderAgent.git
cd CourseFinderAgent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Add your Mistral API key to `.env`:
```
MISTRAL_API_KEY=your_key_here
```

### 4. Run the Function Calling version
```bash
npm run function-calling
```

### 5. Run the MCP version *(coming soon)*
```bash
# Terminal 1 — start the MCP server
npm run mcp-server

# Terminal 2 — start the agent
npm run mcp-agent
```

---

## Blog Post

This project is the companion code for the blog post:  
**"From Function Calling to MCP: Building Your First Standardized AI Agent"**

*Link coming soon*

---

## License

MIT
```

---

## Fix 3 — Add `.env.example`

Create `.env.example` in your root folder:
```
MISTRAL_API_KEY=your_mistral_api_key_here