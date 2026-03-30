

import { z } from "zod";

interface CourseReview {
    name: string;
    rating: number;
    totalStudents: number;
    pros: string[];
    cons: string[];
    summary: string;
}

const courseReviewsMap: Record<string, CourseReview> = {
    "Machine Learning A-Z": {
        name: "Machine Learning A-Z",
        rating: 4.5,
        totalStudents: 920000,
        pros: [
            "Covers both theory and practical coding",
            "Great visualizations",
            "Beginner friendly pace",
        ],
        cons: [
            "Some sections feel outdated",
            "Heavy on theory in the middle sections",
        ],
        summary:
            "One of the most popular ML courses for beginners. Best starting point if you want both theory and hands-on Python coding.",
    },
    "Machine Learning Crash Course": {
        name: "Machine Learning Crash Course",
        rating: 4.3,
        totalStudents: 500000,
        pros: [
            "Free and high quality",
            "Made by Google engineers",
            "Short and focused",
        ],
        cons: ["Moves fast", "Less depth than paid courses"],
        summary:
            "Best free option for ML beginners. Great for getting a solid foundation quickly without spending anything.",
    },
    "Deep Learning Specialization": {
        name: "Deep Learning Specialization",
        rating: 4.9,
        totalStudents: 750000,
        pros: [
            "Taught by Andrew Ng — world's best ML teacher",
            "Extremely deep coverage",
            "Assignments are very practical",
        ],
        cons: ["Expensive", "Requires strong math background"],
        summary:
            "The gold standard for deep learning education. Worth every rupee if you are serious about AI.",
    },
    "The Complete JavaScript Course": {
        name: "The Complete JavaScript Course",
        rating: 4.7,
        totalStudents: 1100000,
        pros: [
            "Most comprehensive JS course available",
            "Real world projects",
            "Excellent teaching style",
        ],
        cons: ["Very long", "Some early sections are basic"],
        summary:
            "The best JavaScript course for beginners who want to go from zero to job-ready.",
    },
    "React - The Complete Guide": {
        name: "React - The Complete Guide",
        rating: 4.6,
        totalStudents: 850000,
        pros: [
            "Covers latest React features including hooks",
            "Many projects included",
            "Regularly updated",
        ],
        cons: ["Long course", "Some projects feel repetitive"],
        summary:
            "The go-to React course for intermediate developers. Covers everything from basics to advanced patterns.",
    },
    "TypeScript: The Complete Developer's Guide": {
        name: "TypeScript: The Complete Developer's Guide",
        rating: 4.6,
        totalStudents: 280000,
        pros: [
            "Unique approach to teaching TypeScript internals",
            "Excellent project based learning",
            "Great for experienced JS devs",
        ],
        cons: [
            "Assumes JavaScript knowledge",
            "Slightly older UI in some parts",
        ],
        summary:
            "Best TypeScript course for developers who already know JavaScript and want to level up.",
    },
    "CS50: Introduction to Computer Science": {
        name: "CS50: Introduction to Computer Science",
        rating: 4.9,
        totalStudents: 4000000,
        pros: [
            "World class teaching from Harvard",
            "Completely free",
            "Builds strong fundamentals",
        ],
        cons: [
            "Challenging for absolute beginners",
            "Time intensive",
        ],
        summary:
            "The most legendary free CS course in the world. If you are serious about programming fundamentals, this is unmissable.",
    },
    "Python for Data Science": {
        name: "Python for Data Science",
        rating: 4.4,
        totalStudents: 450000,
        pros: [
            "Practical and project focused",
            "Great for Python beginners",
            "Covers real data science libraries",
        ],
        cons: [
            "Not enough statistics depth",
            "Some videos feel rushed",
        ],
        summary:
            "Solid entry point for data science with Python. Good balance of theory and hands-on practice.",
    },
};

// ============================================================
// ZOD SCHEMA
// One parameter — the exact course name.
// ============================================================
export const getCourseReviewsSchema = {
    course_name: z.string().describe(
        "The exact name of the course to get reviews for. Example: 'Deep Learning Specialization'"
    ),
};

// ============================================================
// TOOL HANDLER
// Looks up reviews for the given course name.
// Returns rating, pros, cons, and summary.
// ============================================================
export async function getCourseReviewsHandler({
    course_name,
}: {
    course_name: string;
}) {
    const review = courseReviewsMap[course_name];

    if (!review) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `No reviews found for course: ${course_name}`,
                },
            ],
        };
    }

    return {
        content: [
            {
                type: "text" as const,
                text: JSON.stringify(review),
            },
        ],
    };
}
