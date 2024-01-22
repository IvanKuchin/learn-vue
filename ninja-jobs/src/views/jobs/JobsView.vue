<template>
    <h1>We are hiring</h1>
    <div v-if="jobs.length > 0">
        <ul class="job">
            <li v-for="job in jobs" :key="job.id">
                <router-link :to="{ name: 'job-details', params: { id: job.id } }">{{ job.title }}</router-link>
            </li>
        </ul>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            jobs: [],
        }
    },
    mounted() {
        fetch("http://localhost:3000/jobs")
            .then((response) => response.json())
            .then((data) => {
                this.jobs = data
            })
            .catch((error) => console.log(error))
    },
}
</script>

<style scoped>
.job li {
    list-style: none;
    margin-bottom: 20px;
    padding: 20px 50px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f5f5f5;
}

.job li:hover {
    background-color: #e5e5e5;
}

.job li a {
    text-decoration: none;
    color: #333;
}
</style>