
export interface UserLoginDTO {
    username: string,
    password: string
}

export interface UserRegisterDTO {
    name: string
    username: string,
    email: string,
    password: string,
}

export enum WordProgressStatus {
    FORGET = 0,
    FAMILIAR = 1,
    LEARNED = 2
}
