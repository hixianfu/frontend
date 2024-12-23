import axios from '@/utils/Request'
import { UserLoginDTO } from './types'
import { User } from '../types/user'

/**
 * 登录
 * @param data: UserLoginDTO
 * @returns { access_token: string , user: User }
 */
export const login = (data: UserLoginDTO): Promise<{ access_token: string }> => {
    return axios.post('/auth/login', data)
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
