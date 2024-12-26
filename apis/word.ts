import { Word } from "@/types";
import axiosInstance from "@/utils/Request";
import { WordProgressStatus } from "./types";
import { storeUserId } from "@/hooks/useSecureStore";

/**
 * 获取每日单词
 * @returns 
 */
export const fetchDailyWords = (): Promise<Word[]> => {
    return axiosInstance.get('/word/cet4/daily', { params: { id: storeUserId() } });
}

/**
 * 获取单词音频
 * @param type 0:美音 1:英音
 * @param audio 单词
 * @returns 
 */
export const audioUrl = (type: number, audio: string) => {
    return `https://dict.youdao.com/dictvoice?type=${type}&audio=${audio}`
}

/**
 * 更新单词进度
 * @param wordId 单词id
 * @param status 进度 0:忘记 1:熟悉 2:已学
 * @returns 
 */
export const updateWordProgress = (wordId: number, status: WordProgressStatus) => {
    return axiosInstance.patch('/progress', { wordId, status, userId: storeUserId() });
}
