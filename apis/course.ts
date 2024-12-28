import { Course, CourseLevel } from "@/types";
import axiosInstance from "@/utils/Request";

/**
 * 获取课程列表
 * @returns 
 */
export const fetchCourseList = (level?: CourseLevel): Promise<Course[]> => {
    return axiosInstance.get('/course', { params: { level } });
}