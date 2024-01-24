<template>
    <div class="chat-window">
        <div v-if="error">{{ error }}</div>
        <div v-if="documents" class="messages" ref="refMessages">
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message">{{ doc.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated, ref } from 'vue'

export default {
  name: 'ChatWindow',
  props: {},
  setup () {
    const { documents, error } = getCollection('messages')

    const formattedDocuments = computed(() => {
        if(!documents.value) return

        return documents.value.map(doc => {
            return {
                ...doc,
                createdAt: formatDistanceToNow(doc.createdAt.toDate())
            }
        })
    })

    const refMessages = ref(null)

    onUpdated(() => {
        console.log('onUpdated: refMessages: ', refMessages.value)
        if(refMessages.value) {
            refMessages.value.scrollTop = refMessages.value.scrollHeight
        }
    })

    return { refMessages, formattedDocuments, documents, error }
  }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
    scroll-behavior: smooth;
  }
</style>