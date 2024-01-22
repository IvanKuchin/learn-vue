<template>
    <div v-if="job !== null">
        <h1>Job Details</h1>
        <p>Job ID: {{ id }}</p>
        <p>Job Title: {{ job.title }}</p>
        <p>Job Description: {{ job.description }}</p>
        <p>Job Company: {{ job.company }}</p>
        <p>Job Location: {{ job.location }}</p>
        <p>Job Salary: {{ job.salary }}</p>
    </div>
    <div v-else>
        <h1>Job Details</h1>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            job: null,
        }
    },
    mounted() {
        setTimeout(() => {
            this.fetchJob()
        }, 1000)
    },
    methods: {
        fetchJob() {
            fetch(`http://localhost:3000/jobs/${this.id}`)
                .then((response) => response.json())
                .then((data) => {
                    this.job = data
                })
                .catch((error) => console.log(error))
        },
    },
}
</script>

<style scoped>
</style>
