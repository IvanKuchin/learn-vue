<template>
  <div class="home">
    <p>Homepage</p>
    <div v-if="documents">
      <ListView :playlists="documents"/>
    </div> 
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue';
import getCollection from '@/composables/getCollection'

export default {
  name: 'HomeView',
  components: {
    ListView
},
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents }
  }
}
</script>

<style scoped>
</style>