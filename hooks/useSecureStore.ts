import { User } from "@/types";
import { getItem } from "expo-secure-store";

const storeUser = (): User | null => {
    const user = getItem('user')
    return user ? JSON.parse(user) : null
}

const storeUserId = (): number => {
    const user = storeUser()
    return user?.id || 0
}

export { storeUser, storeUserId }
