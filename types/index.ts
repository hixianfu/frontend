
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