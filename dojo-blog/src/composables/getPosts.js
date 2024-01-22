import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      // simulate delay
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 400);
      // });

      // let data = await fetch("http://localhost:3000/posts");
      // if (!data.ok) {
      //   throw Error("no data available");
      // }
      // posts.value = await data.json();

      const resp = await projectFirestore.collection('posts')
        .orderBy('createdAt', 'desc')
        .get()

      posts.value = resp.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })

    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, load };
}

export default getPosts;