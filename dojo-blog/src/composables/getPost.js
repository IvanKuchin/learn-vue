import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getPost = (id) => {
    const post = ref([]);
    const error = ref(null);
    
    const load = async () => {
        try {
            // simulate delay
            // await new Promise((resolve) => {
            //     setTimeout(resolve, 900);
            // });
        
            // fetch data
            // let data = await fetch("http://localhost:3000/posts/" + id);
            // if (!data.ok) {
            //     throw Error("post doesn't exists");
            // }
            // post.value = await data.json();


            let resp = await projectFirestore.collection('posts').doc(id).get()
            if (!resp.exists) {
                throw Error("post doesn't exists");
            }

            post.value = { id: resp.id, ...resp.data() }
        } catch (err) {
            error.value = err.message;
        }
    };
    
    return { post, error, load };
}

export default getPost;