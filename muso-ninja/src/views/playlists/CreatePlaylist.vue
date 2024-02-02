<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" placeholder="Playlist name" required v-model="title"/>
        <textarea placeholder="Description" v-model="description"></textarea>
        <label for="image">Playlist cover image</label>
        <input type="file" name="image" accept="image/*" required @change="handleChange" />
        <div class="error">{{ fileError }}</div>
        <button v-if="isPending" disabled>loading...</button>
        <button v-else>Create</button>
        <div class="error" v-if="error">{{ error }}</div>
    </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
    name: "CreatePlaylist",
    setup() {
        const title = ref("");
        const description = ref("");
        const file = ref(null);
        const fileError = ref(null);

        const { url, filePath, uploadImage, deleteImage } = useStorage();
        const { error, addDocument } = useCollection("playlists");
        const { user } = getUser()
        const isPending = ref(false)
        const router = useRouter();

        const handleSubmit = async () => {
            console.log("playlist is about to be created: ", title.value, description.value, file.value);

            isPending.value = true;
            await uploadImage(file.value);
            const newDocRefId = await addDocument({
                title: title.value,
                description: description.value,
                coverUrl: url.value,
                filePath: filePath.value,
                createdAt: timestamp(),
                userId: user.value.uid,
                userName: user.value.displayName,
                songs: [],
            });
            isPending.value = false;
            
            if (!error.value) {
                title.value = "";
                description.value = "";
                // file.value = null;
                console.log("Playlist created");

                router.push({ name: "PlaylistDetails", params: { id: newDocRefId.id } });
            }
        };

        const allowedTypes = ["image/png", "image/jpeg"];

        const handleChange = (e) => {
            console.log("file changed");
            const selected = e.target.files[0];

            if (selected && allowedTypes.includes(selected.type)) {
                file.value = selected;
                fileError.value = null;
            } else {
                file.value = null;
                fileError.value = "Please select an image file (png or jpeg)";
            }
        };

        return {
            title,
            description,
            handleSubmit,
            handleChange,
            fileError,
            isPending,
            // error,
        }
    }
};
</script>

<style scoped>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>
