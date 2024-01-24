<template>
    <form >
        <textarea @keypress.enter.prevent="handleSubmit" placeholder="Type a message and hit enter to send ..." v-model="message"></textarea>
    </form>
    <div class="error" v-if="error">
        <p>{{ error }}</p>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { ref } from 'vue'

export default {
  name: 'NewChatform',
  setup () {
    const message = ref('')
    const { user }= getUser()
    const { addDocument, error } = useCollection('messages')

    const handleSubmit = async() => {
        const chat = {
            name: user.value.displayName,
            message: message.value,
            createdAt: timestamp(),
            userId: user.value.uid
        }

        debugger
    
        await addDocument(chat)
        if(!error.value) {
          message.value = ''
        } 
    }
    
    return { message, handleSubmit }
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
  </style>