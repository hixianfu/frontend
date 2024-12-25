import { Vocabulary } from "@/types";
import axiosInstance from "@/utils/Request";

/**
 * 获取词汇表
 * @returns 
 */
export const fetchVocabularyList = (): Promise<Vocabulary[]> => {
    return axiosInstance.get('/vocabulary')
}