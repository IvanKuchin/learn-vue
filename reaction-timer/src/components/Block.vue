<template>
<button class="big_button" v-if="showBlock" @click="stopTimer">click me</button>
</template>

<script>
export default {
    name: 'BlockComponent',
    props: {
        delay: Number,
    },
    data() {
        return {
            showBlock: false,
            timer: null,
            reactionTime: 0,
        }
    },
    mounted() {
        console.log('mounted hook: delay is ' + this.delay)
        setTimeout(() => {
            this.showBlock = true
            this.startTimer()
        }, this.delay)
    },
    updated() {
        console.log('updated hook: delay is ' + this.delay)
        debugger
    },
    unmounted() {
        console.log('unmounted hook')
    },

    methods: {
        startTimer() {
            console.log('startTimer')
            this.timer = setInterval(() => {
                this.reactionTime += 10
                // console.log("timer ticking: ", this.reactionTime)
            }, 10)
                
        },
        stopTimer() {
            console.log('stopTimer (reaction time is ' + this.reactionTime + 'ms)')
            // console.log('this: ' + this)
            debugger
            clearInterval(this.timer)
            this.$emit('endGame', this.reactionTime)
        }, 
    }
}
</script>

<style scoped>
.big_button {
  display: block;
  font-size: 2em;
  border-radius: 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 70px 100px;
  margin: 30px auto;
  text-align: center;
  text-decoration: none;
}
</style>
