<template>
    <div class="welcome container">
            <h1>Welcome to the Vue.js SPA!</h1>
            <div v-if="showLogin">
                <h2>Login</h2>
                <LoginForm @login="enterChat"/>
                <p>No account yet ? <span @click="showLogin = !showLogin">sign up</span></p>
            </div>
            <div v-else>
                <h2>Signup</h2>
                <SignupForm @signup="enterChat"/>
                <p>Already registered <span @click="showLogin = !showLogin">login</span></p>
            </div>
    </div> 
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'welcome',
    components: {
        SignupForm,
        LoginForm
    },
    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        const enterChat = () => {
            router.push({ name: 'Chatroom' })
        }

        return {
            showLogin ,
            enterChat
        }
    }
}
</script>

<style>
.welcome {
    text-align: center;
    padding: 20px 0;
}
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome button {
    margin: 20px auto;
  }
</style>