import { Quiz } from "@/types";
import axiosInstance from "@/utils/Request";


/**
 * 获取单词测试题目
 * @param count 题目数量
 * @param type 题目类型
 * @param courseId 课程id
 * @returns 
 */
export const fetchQuizList = async (count: number, type: string, courseId: number): Promise<Quiz[]> => {
    return axiosInstance.get('/question/daily', { params: { count, type, courseId } })
}
