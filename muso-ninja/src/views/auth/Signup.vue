<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input type="text" placeholder="Display name" v-model="displayName"/>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>loading</button>
    </form>
</template>

<script>
    import useSignup from '@/composables/useSignup'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    export default {
        name: 'Signup',
        setup() {
            const { signup, error, isPending } = useSignup()

            const displayName = ref('')
            const email = ref('')
            const password = ref('')
            const router = useRouter()

            const handleSubmit = async () => {
                const resp = await signup(email.value, password.value, displayName.value)

                if(error.value === null) {
                    console.log("user logged in:", resp.user.email)
                    router.push({ name: 'UserPlaylists' })
                }
            }

            return {
                displayName,
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