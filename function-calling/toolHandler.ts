export interface Course {
    name: string;
    platform: string;
    skillLevel: string;
    price: number;
    topic: string;
}

export interface CourseDetails {
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


export interface CourseReview {
    name: string;
    rating: number;
    totalStudents: number;
    pros: string[];
    cons: string[];
    summary: string;
}


export function searchCourses(
    topic: string,
    skillLevel: string,
    budget: number
): Course[] {

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


    const topicLower = topic.toLowerCase();
    const skillLower = skillLevel.toLowerCase();

    return allCourses.filter((course) => {

        const matchesTopic =
            course.topic.includes(topicLower) ||
            course.name.toLowerCase().includes(topicLower);

        const matchesSkill = course.skillLevel === skillLower;

        const withinBudget = course.price <= budget;

        return matchesTopic && matchesSkill && withinBudget;
    });
}

// TOOL 2 — getCourseDetails
export function getCourseDetails(courseName: string): CourseDetails {

    const details: Record<string, CourseDetails> = {
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

    return (
        details[courseName] ?? {
            name: courseName,
            platform: "Unknown",
            instructor: "Unknown",
            duration: "Unknown",
            price: 0,
            currency: "INR",
            skillLevel: "Unknown",
            language: "Unknown",
            lastUpdated: "Unknown",
        }
    );
}

// TOOL 3 — getCourseReviews
export function getCourseReviews(courseName: string): CourseReview {
    const reviews: Record<string, CourseReview> = {
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
            cons: ["Assumes JavaScript knowledge", "Slightly older UI in some parts"],
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
            cons: ["Challenging for absolute beginners", "Time intensive"],
            summary:
                "The most legendary free CS course in the world. If you are serious about programming fundamentals, this is unmissable.",
        },
    };

    return (
        reviews[courseName] ?? {
            name: courseName,
            rating: 0,
            totalStudents: 0,
            pros: [],
            cons: [],
            summary: "No reviews found for this course.",
        }
    );
}


