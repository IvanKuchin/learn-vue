<template>
    <div>
        <h1>User Playlists</h1>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
    components: {
        ListView
    },
    setup() {

        const { user } = getUser()
        const { documents: playlists } = getCollection('playlists', [ "userId", "==", user.value.uid ])

        console.log("playlists: ", playlists, user.value.uid)

        return {
            playlists
        }
    }
};
</script>

<style scoped>
</style>