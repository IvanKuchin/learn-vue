<template>
    <div class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ snippet }}</p>
        <router-link :to="{ name: 'Details', params: { id: post.id } }">Read More</router-link>
        <p>
            <span v-for="tag in post.tags" :key="tag" class="tag">
                <router-link :to="{ name: 'Tag', params: { tag: tag } }">
                    #{{ tag }}
                </router-link>
            </span> 
        </p>
    </div>
</template>

<script>
import router from '@/router';
import { computed } from 'vue';

export default {
    name: 'SinglePostView',
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const snippet = computed(() => {
            return props.post.body.slice(0, 50) + ' ...';
        });
        return { snippet };
    },
    components: { router }
}
</script>

<style scoped>
.tag {
        background-color: #eee;
        border-radius: 10px;
        padding: 2px 4px;
        margin-right: 4px;
    }
    .post {
    margin: 0 40px 30px;
    padding-bottom: 30px;
    border-bottom: 1px dashed #e7e7e7;
  }
  .post h3 {
    display: inline-block;
    position: relative;
    font-size: 26px;
    color: white;
    margin-bottom: 10px;
    max-width: 400px;
  }
  .post h3::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1deg);
  }
</style>