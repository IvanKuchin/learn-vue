import { ref, watchEffect } from 'vue'

import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getCollection = (collectionName, queryString) => {
    const documents = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let collectionRef = collection(db, collectionName)


    if (queryString) {
        collectionRef = query(collectionRef, where(...queryString))
    }

    const unsub = onSnapshot(collectionRef, (snap) => {
        let results = []
        snap.docs.forEach(doc => {
            // must wait for the server to create the timestamp & send it back
            // doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
            results.push({ ...doc.data(), id: doc.id })
        })
        // update values
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection