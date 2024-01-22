<template>
    <div class="create">
        <form @submit.prevent="submitForm">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title" required/>
            <label for="body">Content</label>
            <textarea id="body" v-model="body" required></textarea>
            <label>Tags (hit enter to add a tag)</label>
            <input type="text" v-model="tag" @keyup.enter="addTag" />
            <div v-if="tags.length > 0">
                <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
            <button>Add Post</button>
        </form>
    </div>
</template>

<script>
import { projectFirestore, timestamp } from '@/firebase/config'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'App2View',
    components: {},
    setup() {
        const title = ref('')
        const body = ref('')
        const tag = ref('')
        const tags = ref([])

        const router = useRouter()
        

        const addTag = () => {
            if (tags.value.includes(tag.value)) {
                tag.value = ''
                return
            }
            tag.value = tag.value.replace(/\s/g, '')
            tags.value.push(tag.value)
            tag.value = ''
        }

        const submitForm = async () => {
            // await fetch('http://localhost:3000/posts', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         title: title.value,
            //         body: body.value,
            //         tags: tags.value,
            //     }),
            // })

            const resp = projectFirestore.collection('posts').add({
                title: title.value,
                body: body.value,
                tags: tags.value,
                createdAt: timestamp(),
            })

            title.value = ''
            body.value = ''
            tags.value = []

            router.push({ name: 'app2' })
        }

        return {title, body, tag, tags, addTag, submitForm}
    },
}
</script>

<style scoped>
.tag {
    background-color: #eee;
    border-radius: 10px;
    padding: 2px 4px;
    margin-right: 4px;
}

form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
</style>
