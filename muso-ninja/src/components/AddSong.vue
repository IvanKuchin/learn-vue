<template>
    <div class="add-class">
        <button v-if="!showForm" @click="showForm = !showForm">Add song</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <input type="text" placeholder="Song title" required v-model="title" />
            <input type="text" placeholder="Artist" required v-model="artist" />
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import useDocument from '@/composables/useDocument';
import { timestamp } from '@/firebase/config';
import { ref } from 'vue';

export default {
    name: 'AddSong',
    components: {
    },
    props: ['playlist'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const { updateDocument } = useDocument('playlists', props.playlist.id)

        let showForm = ref(false)

        const handleSubmit = async () => {
            const newSong = {
                id: Math.random().toString(36),
                title: title.value,
                artist: artist.value,
                playlistId: props.playlist.id,
                createdAt: new Date().toISOString()
            }
            console.log('submit new song', newSong)

            await updateDocument({ songs: [...props.playlist.songs, newSong] })
            title.value = ''
            artist.value = ''
            showForm.value = false
        }

        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
.add-song {
    text-align:center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
}
</style>