import { z } from "zod";

interface Course {
    name: string;
    platform: string;
    skillLevel: string;
    price: number;
    topic: string;
}

const allCourses: Course[] = [
    {
        name: "Machine Learning A-Z",
        platform: "Udemy",
        skillLevel: "beginner",
        price: 499,
        topic: "machine learning",
    },
    {
        name: "Deep Learning Specialization",
        platform: "Coursera",
        skillLevel: "intermediate",
        price: 4500,
        topic: "machine learning",
    },
    {
        name: "Python for Data Science",
        platform: "Udemy",
        skillLevel: "beginner",
        price: 399,
        topic: "data science",
    },
    {
        name: "The Complete JavaScript Course",
        platform: "Udemy",
        skillLevel: "beginner",
        price: 499,
        topic: "javascript",
    },
    {
        name: "React - The Complete Guide",
        platform: "Udemy",
        skillLevel: "intermediate",
        price: 599,
        topic: "react",
    },
    {
        name: "Node.js Developer Course",
        platform: "Udemy",
        skillLevel: "intermediate",
        price: 499,
        topic: "nodejs",
    },
    {
        name: "CS50: Introduction to Computer Science",
        platform: "edX",
        skillLevel: "beginner",
        price: 0,
        topic: "computer science",
    },
    {
        name: "Machine Learning Crash Course",
        platform: "Google",
        skillLevel: "beginner",
        price: 0,
        topic: "machine learning",
    },
    {
        name: "Applied Data Science with Python",
        platform: "Coursera",
        skillLevel: "intermediate",
        price: 3999,
        topic: "data science",
    },
    {
        name: "TypeScript: The Complete Developer's Guide",
        platform: "Udemy",
        skillLevel: "intermediate",
        price: 499,
        topic: "typescript",
    },
];

const priceMap: Record<string, number> = {
    "Machine Learning A-Z": 499,
    "Deep Learning Specialization": 4500,
    "Python for Data Science": 399,
    "The Complete JavaScript Course": 499,
    "React - The Complete Guide": 599,
    "Node.js Developer Course": 499,
    "CS50: Introduction to Computer Science": 0,
    "Machine Learning Crash Course": 0,
    "Applied Data Science with Python": 3999,
    "TypeScript: The Complete Developer's Guide": 499,
};


export const searchCoursesSchema = {
    topic: z.string().describe(
        "The subject to search for. Examples: 'machine learning', 'javascript', 'react'"
    ),
    skill_level: z
        .enum(["beginner", "intermediate", "advanced"])
        .describe(
            "The learner's current skill level."
        ),
    budget: z.number().describe(
        "Maximum budget in INR. Use 0 for free courses only."
    ),
};

export async function searchCoursesHandler({
    topic,
    skill_level,
    budget,
}: {
    topic: string;
    skill_level: string;
    budget: number;
}) {
    // Normalize to lowercase for case-insensitive matching
    const topicLower = topic.toLowerCase();
    const skillLower = skill_level.toLowerCase();

    // Filter courses matching all three conditions
    const results = allCourses.filter((course) => {
        const matchesTopic =
            course.topic.includes(topicLower) ||
            course.name.toLowerCase().includes(topicLower);

        const matchesSkill = course.skillLevel === skillLower;

        const withinBudget =
            (priceMap[course.name] ?? course.price) <= budget;

        return matchesTopic && matchesSkill && withinBudget;
    });


    return {
        content: [
            {
                type: "text" as const,
                text:
                    results.length > 0
                        ? JSON.stringify(results)
                        : "No courses found matching your criteria.",
            },
        ],
    };
}