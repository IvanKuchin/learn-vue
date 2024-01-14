<template>
    <div>
        <p>reaction time {{ score }} ms</p>
        <p class="rank">{{ rank }}</p>
    </div>
</template>

<script>
export default {
    name: 'ResultComponent',
    props: {
        score: Number,
    },
    data() {
        return {
            rank: null,
        }
    },
    mounted() {
        console.log('mounted hook: score is ' + this.score)
        if (this.score < 250) {
            this.rank = 'Ninja fingers'
        } else if (this.score < 400) {
            this.rank = 'Rapid reflexes...'
        } else {
            this.rank = 'Snail pace . . .'
        }
    },
}
</script>

<style scoped>
.rank {
    font-size: 2em;
    color:darkgreen;

}
</style>
