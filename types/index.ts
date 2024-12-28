
export interface User {
    id: number
    name: string
    email: string
    avatar: string
    phone: string
    username: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface Vocabulary {
    id: number
    name: string
    cover: string
    description: string
    createdAt: string
    updatedAt: string
}

export interface Word {
    id: number
    cet4_word: string
    cet4_phonetic: string
    cet4_translate: string
    cet4_distortion: string
    cet4_phrase: string
    cet4_samples: string
}

export interface Quiz {
    id: number
    type: string
    question: string
    options: string[]
    correct_answer: string
    courseId: number
}

export enum CourseLevel {
    ALL = -1,
    ZERO = 0, // 零基础
    BEGINNER = 1, // 初级
    INTERMEDIATE = 2, // 中级
    ADVANCED = 3 // 高级
}
export interface Course {
    id: number
    title: string
    cover: string
    level: CourseLevel
    quizCount: number
    description: string
}

export interface AnswerLog {
    id: number
    userId: number
    questionId: number
    courseId: number
    userAnswer: string
    correctAnswer: string
    isCorrect: '0' | '1' // 0: 错误; 1: 正确
}
