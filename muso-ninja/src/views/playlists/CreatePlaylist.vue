<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" placeholder="Playlist name" required v-model="title"/>
        <textarea placeholder="Description" v-model="description"></textarea>
        <label for="image">Playlist cover image</label>
        <input type="file" name="image" accept="image/*" required @change="handleChange" />
        <div class="error">{{ fileError }}</div>
        <button>Create</button>
        <div class="error" v-if="error">{{ error }}</div>
    </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";

export default {
    name: "CreatePlaylist",
    setup() {
        const title = ref("");
        const description = ref("");
        const file = ref(null);
        const fileError = ref(null);

        const { url, filePath, error, uploadImage, deleteImage } = useStorage();

        const handleSubmit = async () => {
            console.log(title.value, description.value, file.value);

            await uploadImage(file.value);

            console.log("file uploaded: ", url.value, filePath.value);
        };

        const allowedTypes = ["image/png", "image/jpeg"];

        const handleChange = (e) => {
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
