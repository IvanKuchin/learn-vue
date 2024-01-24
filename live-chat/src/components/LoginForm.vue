<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="Email" required v-model="email"/>
        <input type="password" placeholder="Password" required v-model="password"/>
        <div class="error" v-if="error">
            <p>{{ error }}</p>
        </div>
        <button>Log in</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'

  export default {
    name: 'login-form',
    setup (props, context) {
        const email = ref('')
        const password = ref('')

        const { login, error } = useLogin()

        const handleSubmit = async () => {
            await login(email.value, password.value)

            if (!error.value) {
                context.emit('login')
            }
        }

      return {
        email,
        password,
        error,
        handleSubmit
      }
    }
  }
</script>

<style scoped>
</style>
