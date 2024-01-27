<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>loading</button>
    </form>
</template>

<script>
    import useLogin from '@/composables/useLogin'
    import { ref } from 'vue'

    export default {
        name: 'Login',
        setup() {
            const { login, error, isPending } = useLogin()

            const email = ref('')
            const password = ref('')

            const handleSubmit = async () => {
                const resp = await login(email.value, password.value)

                if(!error.value) {
                    console.log("user logged in:", resp.user.email)
                }
            }

            return {
                email,
                password,
                error,
                handleSubmit,
                isPending,
            }
        },
    }
</script>

<style scoped>
</style>