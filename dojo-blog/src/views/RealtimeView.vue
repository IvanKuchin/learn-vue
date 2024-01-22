<template>
    <h1>RealTime</h1>
    <div>
        <PostList :posts="posts" />
    </div>
</template>

<script>
import { projectFirestore } from '@/firebase/config'
import { ref } from 'vue'
import PostList from './PostList.vue'

export default {
    name: 'RealtimeView',
    setup() {
        const posts = ref([]);
        projectFirestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot((snap) => {
            posts.value = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });
        });
        return { posts };
    },
    components: { PostList }
}
</script>

<style scoped>

</style>