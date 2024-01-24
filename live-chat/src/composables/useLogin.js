import { signInWithEmailAndPassword, updateProfile } from '@firebase/auth'
import { projectAuth } from '@/firebase/config'
import { ref } from 'vue'

const error = ref(null)

const login = async (email, password) => {
    error.value = null

    try {
        const res = await signInWithEmailAndPassword(projectAuth, email, password)
        
        console.log("login response: ", res)

        error.value = null
        return res

    } catch (err) {
        console.log(err.message)
        error.value = "Incorrect login credentials"
    }
}

const useLogin = () => {
    return { login, error }
}

export default useLogin
