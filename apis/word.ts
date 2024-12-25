import { Word } from "@/types";
import axiosInstance from "@/utils/Request";
import axios from "axios";


/**
 * 获取每日单词
 * @returns 
 */
export const fetchDailyWords = (): Promise<Word[]> => {
    return axiosInstance.get('/word/cet4/daily');
}


export const audioUrl = (type: number, audio: string) => {
    return `https://dict.youdao.com/dictvoice?type=${type}&audio=${audio}`
}
