<template>
  <div class="tag">
    <h1>Tag: {{ tag }}</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="filteredPosts.length === 0"><Spinner/></div>
    <div v-else class="layout">
      <div>
        <PostList :posts="filteredPosts" />
      </div>
      <div>
        <TagCloud :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import Spinner from '@/components/Spinner.vue'
  // import { getPosts } from '@/composables/getPosts.js'
  import getPosts from '@/composables/getPosts.js'
  import PostList from '@/views/PostList.vue'
  import TagCloud from '@/components/TagCloud.vue'
  import { useRoute } from 'vue-router'
  
  export default {
    name: 'TagView',
    components: {Spinner, PostList, TagCloud},
    props: {
      tag: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { posts, error, load } = getPosts()
      const tag = ref(props.tag)
      const route = useRoute()

      
      const filteredPosts = computed(() => {
        
        console.log("Update TagView with tag ", route.params.tag, " tag.value", props.tag)
        return posts.value.filter(post => post.tags.includes(props.tag))
        // return posts.value.filter(post => post.tags.includes(route.params.tag))
      })

      load()



      return {
        posts,
        error,
        filteredPosts,
      }
    },
  }
</script>

<style scoped>
.error {
  color: red;
}
.tag {
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
