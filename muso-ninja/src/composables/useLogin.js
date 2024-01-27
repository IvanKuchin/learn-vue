import { signInWithEmailAndPassword, updateProfile } from '@firebase/auth'
import { projectAuth } from '@/firebase/config'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    
    try {
        const res = await signInWithEmailAndPassword(projectAuth, email, password)
        
        console.log("login response: ", res)
        
        error.value = null
        isPending.value = false
        return res
        
    } catch (err) {
        console.log(err.message)
        error.value = "Incorrect login credentials"
        isPending.value = false
    }
}

const useLogin = () => {
    return { login, error, isPending }
}

export default useLogin
