import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, getDocs, orderBy, query, onSnapshot, where, or } from 'firebase/firestore'

const getCollection = (collection_name, collection_query) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = collection(projectFirestore, collection_name)
    let query_constaints = [orderBy("createdAt")]

    if (collection_query) {
        query_constaints.push(where(...collection_query))
    }

    const unsub = onSnapshot(query(collectionRef, ...query_constaints), snap => {
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