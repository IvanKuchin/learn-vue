<template>
  <div>
    <nav>
      <h1>My Book List</h1>

      <!-- for logged in users -->
      <div v-if="user !== null">
        <router-link to="/">Home</router-link>
        <button  @click="handleLogout">Logout</button>
      </div>
      
      <!-- for logged out users -->
      <div v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>

      
    </nav>
    <div v-if="user">logged in as {{ user.email }}</div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'

export default {
  setup() {
    const { user } = getUser()
    const router = useRouter()

    const handleLogout = async () => {
      await signOut(auth)
    }

    watchEffect(() => {
      if (user.value === null) {
        router.push({ name: 'Login' })
      }
    })

    return { handleLogout, user }
  }
}
</script>

<style>
nav {
  display: flex;
  align-items: center;
}
nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}
nav a {
  margin-left: 16px;
  color: #2c3e50;
}
nav button {
  margin-left: 16px;
}
nav a.router-link-exact-active {
  color: #0ec58e;
}
nav + p {
  margin-top: 0;
  margin-bottom: 30px;
}
.email {
  margin-left: 16px;
} 
</style>