import axios from '@/utils/Request'
import { UserLoginDTO, UserRegisterDTO } from './types'
import { User } from '../types'

/**
 * 登录
 * @param data: UserLoginDTO
 * @returns { access_token: string , user: User }
 */
export const login = (data: UserLoginDTO): Promise<{ access_token: string }> => {
    return axios.post('/auth/login', data)
}

/**
 * 注册
 * @param data: UserRegisterDTO
 * @returns { access_token: string , user: User }
 */
export const register = (data: UserRegisterDTO): Promise<User> => {
    return axios.post('/user/register', data)
}

/**
 * 获取用户信息
 * @returns 
 */
export const fetchProfile = (): Promise<User> => {
    return axios.get('/auth/profile')
}

/**
 * 修改用户头像
 */
export const updateUserAvatar = ({ id, file}: {
    id: number,
    file: FormData
}) => {
    return axios.post(`/upload/uploadAvatar/${id}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
