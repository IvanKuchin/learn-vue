import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore'

const getCollection = (collection_name) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = collection(projectFirestore, collection_name)

    const unsub = onSnapshot(query(collectionRef, orderBy("createdAt")), snap => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, err => {
        console.log(err.message)
        documents.value = null
        error.value = 'Could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection