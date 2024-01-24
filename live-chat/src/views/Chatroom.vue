<template>
    <div class="container">
        <Navbar/>
        <ChatWindow/>
        <NewChatform/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import getUser from '@/composables/getUser'
import NewChatform from '@/components/NewChatform.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import { projectAuth } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

  export default {
    name: 'chatroom',
    components: {
        Navbar,
        NewChatform,
        ChatWindow,
    },
    setup () {
        const router = useRouter()
        const { user } = getUser()

        watch(user, (newUser) => {
            if (!user.value) {
                router.push({ name: 'welcome' })
            }
        })
        // projectAuth.onAuthStateChanged(user => {
        //     console.log('porjectAuth.onAuthStateChange: Current user is: ', user)
        //     if (!user) {
        //         router.push({ name: 'welcome' })
        //     }
        // })

        return {}
    }
  }
</script>

<style scoped>
</style>
