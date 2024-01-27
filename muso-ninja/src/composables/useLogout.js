import { signOut } from '@firebase/auth'
import { projectAuth } from '@/firebase/config'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    
    try {
        isPending.value = true
        await signOut(projectAuth)
        isPending.value = false
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useLogout = () => {
    return { logout, error, isPending }
}

export default useLogout