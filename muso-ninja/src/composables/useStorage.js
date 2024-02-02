import { projectStorage } from "@/firebase/config"
import { uploadBytes, getDownloadURL, ref as firebaseStorageRef, deleteObject } from "firebase/storage"
import getUser from "@/composables/getUser"
import { ref } from "vue"

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
    
    const uploadImage = async (file) => {
        if(file === null) {
            error.value = 'Please select an image'
            console.error("ERROR", error.value)
            return
        }
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = firebaseStorageRef(projectStorage, filePath.value)
    
        try {
            const res = await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(res.ref)
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }
    
    const deleteImage = async (path) => {
        const storageRef = firebaseStorageRef(projectStorage, path)
    
        try {
            await deleteObject(storageRef)
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }
    
    return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage
