import { z } from "zod";

interface CourseDetails {
    name: string;
    platform: string;
    instructor: string;
    duration: string;
    price: number;
    currency: string;
    skillLevel: string;
    language: string;
    lastUpdated: string;
}

const courseDetailsMap: Record<string, CourseDetails> = {
    "Machine Learning A-Z": {
        name: "Machine Learning A-Z",
        platform: "Udemy",
        instructor: "Kirill Eremenko & Hadelin de Ponteves",
        duration: "44 hours",
        price: 499,
        currency: "INR",
        skillLevel: "beginner",
        language: "English",
        lastUpdated: "November 2024",
    },
    "Machine Learning Crash Course": {
        name: "Machine Learning Crash Course",
        platform: "Google",
        instructor: "Google Engineers",
        duration: "15 hours",
        price: 0,
        currency: "INR",
        skillLevel: "beginner",
        language: "English",
        lastUpdated: "January 2025",
    },
    "Deep Learning Specialization": {
        name: "Deep Learning Specialization",
        platform: "Coursera",
        instructor: "Andrew Ng",
        duration: "3 months",
        price: 4500,
        currency: "INR",
        skillLevel: "intermediate",
        language: "English",
        lastUpdated: "October 2024",
    },
    "Python for Data Science": {
        name: "Python for Data Science",
        platform: "Udemy",
        instructor: "Jose Portilla",
        duration: "25 hours",
        price: 399,
        currency: "INR",
        skillLevel: "beginner",
        language: "English",
        lastUpdated: "December 2024",
    },
    "The Complete JavaScript Course": {
        name: "The Complete JavaScript Course",
        platform: "Udemy",
        instructor: "Jonas Schmedtmann",
        duration: "69 hours",
        price: 499,
        currency: "INR",
        skillLevel: "beginner",
        language: "English",
        lastUpdated: "March 2025",
    },
    "React - The Complete Guide": {
        name: "React - The Complete Guide",
        platform: "Udemy",
        instructor: "Maximilian Schwarzmüller",
        duration: "68 hours",
        price: 599,
        currency: "INR",
        skillLevel: "intermediate",
        language: "English",
        lastUpdated: "February 2025",
    },
    "TypeScript: The Complete Developer's Guide": {
        name: "TypeScript: The Complete Developer's Guide",
        platform: "Udemy",
        instructor: "Stephen Grider",
        duration: "27 hours",
        price: 499,
        currency: "INR",
        skillLevel: "intermediate",
        language: "English",
        lastUpdated: "January 2025",
    },
    "CS50: Introduction to Computer Science": {
        name: "CS50: Introduction to Computer Science",
        platform: "edX",
        instructor: "David J. Malan",
        duration: "12 weeks",
        price: 0,
        currency: "INR",
        skillLevel: "beginner",
        language: "English",
        lastUpdated: "September 2024",
    },
};

export const getCourseDetailsSchema = {
    course_name: z.string().describe(
        "The exact name of the course. Example: 'Machine Learning A-Z'"
    ),
};

export async function getCourseDetailsHandler({
    course_name,
}: {
    course_name: string;
}) {
    const details = courseDetailsMap[course_name];

    if (!details) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `No details found for course: ${course_name}`,
                },
            ],
        };
    }

    return {
        content: [
            {
                type: "text" as const,
                text: JSON.stringify(details),
            },
        ],
    };
}