<template>
  <div class="home">
    <ul>
      <li v-for="book in books" :key="book.id">
        <div class="details">
          <h3 @click="handleDeletes(book)">{{ book.title }}</h3>
          <p>By {{ book.author }}</p>
        </div>
        <div :class="{ icon: true, fav: book.isFav }" @click="handleFav(book)">
          <span class="material-icons">favorite</span>
        </div>
      </li>
    </ul>
    <CreateBookForm />
  </div>
</template>

<script>
import { ref } from 'vue'
import CreateBookForm from '@/components/CreateBookForm'
import getCollection from '@/composables/getCollection'

import { db } from '@/firebase/config'
import { deleteDoc, updateDoc, doc, collection } from 'firebase/firestore'
import getUser from '@/composables/getUser'

export default {
  name: 'Home',
  components: { CreateBookForm },
  setup() {

    const { user } = getUser()
    const { documents, error } = getCollection('books', ["userUid", "==", user.value.uid])

    const handleDeletes = async (book) => {
      const booksRef = collection(db, 'books')
      const bookRef = doc(booksRef, book.id)
      const deleteRef = await deleteDoc(bookRef)

      console.log('deleteRef', deleteRef)
    }

    const handleFav = (book) => {
      const booksRef = collection(db, 'books')
      const bookRef = doc(booksRef, book.id)
      const newDocRef = updateDoc(bookRef, {
        isFav: !book.isFav
      })
      
    }

    return {
      books: documents,
      error,
      handleDeletes,
      handleFav
    }

  }
}
</script>

<style>
.home ul {
  padding: 0;
}
.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}
.home li .details {
  margin-right: auto;
}
.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}
.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}
.home li p {
  margin: 0;
}
.icon {
  color: #bbbbbb;
  cursor: pointer;
}
.icon.fav {
  color: #ff0000;
}
</style>