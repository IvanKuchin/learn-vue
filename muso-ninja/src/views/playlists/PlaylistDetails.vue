<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" alt="playlist cover" />
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete</button>
        </div>
        
        <!-- song list  -->
        
        <div class="song-list">
            <div v-if="playlist.songs.length == 0">There are no songs in this playlist</div>
            <div v-else>
                <div class="single-song" v-for="song in playlist.songs" :key="song.id">
                  <div>

                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }}</p>
                  </div>
                  <button v-if="ownership" @click="handleDeleteSong(song.id)">Delete</button>
                </div>
            </div>
            <AddSong v-if="ownership" :playlist="playlist"/>
        </div>
    </div>
        
</template>

<script>
import AddSong from '@/components/AddSong.vue'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'PlaylistDetails',
  components: {
    AddSong,
  },
  props: ['id'],
  setup(props) {
    const { document: playlist, error } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDocument, updateDocument } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const handleDelete = async() => {
      deleteImage(playlist.value.filePath)
      deleteDocument()

      router.push({ name: 'home' })
    }

    const ownership = computed(() => {
      return playlist.value && user.value && playlist.value.userId == user.value.uid
    })

    const handleDeleteSong = async(id) => {
      const songs = playlist.value.songs.filter(song => song.id !== id)
      await updateDocument({ songs })
    }

    return { playlist, error, ownership, handleDelete, handleDeleteSong }
  }
}
</script>

<style scoped>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>