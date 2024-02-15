<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>
    <div v-if="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '@/composables/useLogin'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const { login, error } = useLogin()
    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        router.push({ name: 'Home' })
      } else {
        console.log('ERROR:', error.value)
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>