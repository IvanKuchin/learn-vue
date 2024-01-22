<template>
    <div class="Home">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="!post.id"><Spinner/></div>
        <div v-if="post.id" class="post">
            <h1>Details</h1>
            <h2>{{ post.title }}</h2>
            <p class="pre">{{ post.body }}</p>
            <button @click="handleClick">delete post</button>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import getPost from '@/composables/getPost'
import { projectFirestore } from '@/firebase/config'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default {
    name: 'DetailsView',
    components: {
        getPost,
        Spinner,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        
        const router = useRouter()
        const route = useRoute()
        // const {post, error, load} = getPost(props.id)
        const {post, error, load} = getPost(route.params.id)

        console.log(router)
        
        load()


        const handleClick = async () => {
            await projectFirestore.collection('posts').doc(route.params.id).delete()
            router.push({ name: 'app2' })
        }

        return { post, error, handleClick }
    },
}
</script>

<style scoped>
.post {
    margin: 0 auto;
    max-width: 600px;
}
.post p {
    color: #333;
    line-height: 1.5em;
    margin-top: 40px;
}
.pre {
    white-space: pre-wrap;
}
button.delete {
    margin: 10px auto;
}
</style>
