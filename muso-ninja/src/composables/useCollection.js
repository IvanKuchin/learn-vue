import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collection_name) => {

    const error = ref(null)
    const isPending = ref(false)
    
    const addDocument = async(doc) => {
        error.value = null
        isPending.value = true
        
        try {
            const myCollection = collection(projectFirestore, collection_name)
            const newDocRef = await addDoc(myCollection, doc)
            
            console.log('new doc ref id', newDocRef.id)

            isPending.value = false

            return newDocRef
        } catch (err) {
            console.log("addDocument ERROR:", err.message)
            error.value = 'Could not send the message'
            isPending.value = false
        }
    }

    return { error, addDocument, isPending }
}

export default useCollection