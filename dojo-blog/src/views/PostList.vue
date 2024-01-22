<template>
    <div v-for="post in posts" :key="post.id"> 
      <SinglePostView :post="post" />
    </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import SinglePostView from './SinglePost.vue';

export default {
    name: 'PostListView',
    components: { SinglePostView, },
    props: ['posts'],
    components: {
        SinglePostView,
    },
    setup(props) {
        onMounted(() => {
            console.log("component mounted")
        })

        onUnmounted(() => {
            console.log("component unmounted")
        })

        onUpdated(() => {
            console.log("component updated")
        })
    },
}
</script>

<style scoped>
</style>
