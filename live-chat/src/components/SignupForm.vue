<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Username" required v-model="displayName"/>
        <input type="email" placeholder="Email" required v-model="email"/>
        <input type="password" placeholder="Password" required v-model="password"/>
        <div class="error" v-if="error">
            <p>{{ error }}</p>
        </div>
        <button>Sign up</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'

  export default {
    name: 'signup-form',
    setup (props, context) {
        const { signup, error } = useSignup()
        
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)

            if (!error.value) {
                context.emit('signup')
            }
        }

      return {
        displayName,
        email,
        password,
        handleSubmit,
        error
      }
    }
  }
</script>

<style scoped>
</style>
