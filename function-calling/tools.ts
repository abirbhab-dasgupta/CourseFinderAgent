export const tools = [
    {
        type: "function",
        function: {
            name: "search_courses",
            description:
                "Search for online courses based on a topic, skill level, and budget. Returns a list of matching courses with their platform and price. Always call this tool first before getting details or reviews.",
            parameters: {
                type: "object",
                properties: {
                    topic: {
                        type: "string",
                        description:
                            "The subject or technology to search for. Examples: 'machine learning', 'javascript', 'react', 'data science'",
                    },
                    skill_level: {
                        type: "string",
                        enum: ["beginner", "intermediate", "advanced"],
                        description:
                            "The learner's current skill level. Must be one of: beginner, intermediate, or advanced.",
                    },
                    budget: {
                        type: "number",
                        description:
                            "Maximum budget in INR. Use 0 for free courses only. Example: 500 means courses up to ₹500.",
                    },
                },
                required: ["topic", "skill_level", "budget"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_course_details",
            description:
                "Get detailed information about a specific course including instructor name, total duration, platform, and exact price. Call this after search_courses to get more information about a course.",
            parameters: {
                type: "object",
                properties: {
                    course_name: {
                        type: "string",
                        description:
                            "The exact name of the course as returned by search_courses. Example: 'Machine Learning A-Z'",
                    },
                },
                required: ["course_name"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_course_reviews",
            description:
                "Get ratings, total students, pros, cons, and an expert summary for a specific course. Call this to help the user make a final decision between courses.",
            parameters: {
                type: "object",
                properties: {
                    course_name: {
                        type: "string",
                        description:
                            "The exact name of the course to get reviews for. Example: 'Deep Learning Specialization'",
                    },
                },
                required: ["course_name"],
            },
        },
    },
];