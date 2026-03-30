import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
    searchCoursesSchema,
    searchCoursesHandler,
} from "./tools/searchCourses.js";

import {
    getCourseDetailsSchema,
    getCourseDetailsHandler,
} from "./tools/getCourseDetails.js";

import {
    getCourseReviewsSchema,
    getCourseReviewsHandler,
} from "./tools/getCourseReviews.js";



const server = new McpServer({
    name: "course-recommender-server",
    version: "1.0.0",
});

server.tool(
    "search_courses",
    "Search for online courses based on topic, skill level, and budget. Always call this first before getting details or reviews.",
    searchCoursesSchema,
    searchCoursesHandler
);


server.tool(
    "get_course_details",
    "Get detailed information about a specific course including instructor, duration, platform, and price. Call this after search_courses.",
    getCourseDetailsSchema,
    getCourseDetailsHandler
);


server.tool(
    "get_course_reviews",
    "Get ratings, total students, pros, cons, and a summary for a specific course. Call this to help make a final recommendation.",
    getCourseReviewsSchema,
    getCourseReviewsHandler
);

async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);


    console.error("Course Recommender MCP Server is running");
    console.error("   Waiting for agent to connect...\n");
}

startServer();