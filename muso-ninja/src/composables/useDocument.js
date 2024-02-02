import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { doc, deleteDoc, collection, addDoc, updateDoc } from 'firebase/firestore'

const useDocument = (collection_name, doc_id) => {

    const error = ref(null)
    const isPending = ref(false)
    const documentRef = doc(projectFirestore, `${collection_name}/${doc_id}`)
    
    const deleteDocument = async() => {
        error.value = null
        isPending.value = true
        
        try {
            const res = await deleteDoc(documentRef)

            isPending.value = false
            return res
        } catch (err) {
            console.log("deleteDocument ERROR:", err.message)
            error.value = 'Could not delete the document'
            isPending.value = false
        }
    }

    const updateDocument = async(updates) => {
        error.value = null
        isPending.value = true
        
        try {
            const res = await updateDoc(documentRef, updates)

            isPending.value = false
            return res
        } catch (err) {
            console.log("deleteDocument ERROR:", err.message)
            error.value = 'Could not update the document'
            isPending.value = false
        }
    }

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

    return { error, addDocument, deleteDocument, updateDocument, isPending }
}

export default useDocument