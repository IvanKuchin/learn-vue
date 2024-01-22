<template>
    <div class="home">
        <h1>App2</h1>
        <div v-if="error" class="error">{{ error }}</div>
        <button @click="toggleShowPosts">Toggle Show Posts</button>
        <button @click="posts.pop()">Remove Last Post</button>
        <div v-if="posts.length === 0"><Spinner/></div>
        <div v-else-if="!showPosts">Posts are hidden</div>
        <div v-else class="layout">
            <div>
                <PostList v-if="showPosts" :posts="posts" />
            </div>
            <div>
                <TagCloud v-if="showPosts" :posts="posts" />
            </div>
        </div>
    </div>
</template>


<script>
import PostList from '@/views/PostList.vue'
import getPosts from '@/composables/getPosts'
import Spinner from '@/components/Spinner.vue'
import { ref } from 'vue'
import TagCloud from '@/components/TagCloud.vue'

export default {
    name: 'App2View',
    components: {
    PostList,
    Spinner,
    TagCloud
},
    setup() {
        const {posts, error, load} = getPosts()

        load()

        const showPosts = ref(true)

        const toggleShowPosts = () => {
            showPosts.value = !showPosts.value
        }

        return {posts, showPosts, toggleShowPosts, error}
    },
}

</script>

<style scoped>
.error {
    color: red;
}
.home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
</style>
