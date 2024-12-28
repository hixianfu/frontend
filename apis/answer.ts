import axiosInstance from "@/utils/Request";
import { AnswerLog } from "@/types";
/**
 * 创建答题记录
 * @param data 
 * @returns 
 */
export const createAnswerLog = (answer: Omit<AnswerLog, 'id'>) => {
    return axiosInstance.post('/answer', answer);
}

/**
 * 获取答题记录
 * @param userId 
 * @returns 
 */
export const getAnswerLog = (userId: number) => {
    return axiosInstance.get(`/answer/user/${userId}`);
}

