import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collection_name) => {

    const error = ref(null)

    const addDocument = async(doc) => {
        error.value = null

        try {
            const myCollection = collection(projectFirestore, collection_name)
            const newDocRef = await addDoc(myCollection, doc)
            
            console.log('new doc ref id', newDocRef.id)
        } catch (err) {
            console.log("addDocument ERROR:", err.message)
            error.value = 'Could not send the message'
        }
    }

    return { error, addDocument }
}

export default useCollection