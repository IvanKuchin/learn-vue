<template>
  <nav v-if="user !== null">
    <div>
        <p>Hey there {{ user.displayName }}</p>
        <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'

  export default {
    name: 'chatroom',
    components: {
    },
    setup () {
        const { logout, error } = useLogout()
        const { user } = getUser()

        const handleClick = async () => {
            await logout()

            if (!error.value) {
                // redirect to login
                console.log("user logged out")
            }
        }

        return { user, handleClick, error }
    }
  }
</script>

<style scoped>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>