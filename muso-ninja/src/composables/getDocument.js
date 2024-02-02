import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { doc, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore'

const getDocument = (collection_name, doc_id) => {
    const document = ref(null)
    const error = ref(null)

    let documentRef = doc(projectFirestore, `${collection_name}/${doc_id}`)

    const unsub = onSnapshot(documentRef, doc => {
        if(doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = 'That document does not exist'
        }
    }, err => {
        console.log(err.message)
        error.value = 'Could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument