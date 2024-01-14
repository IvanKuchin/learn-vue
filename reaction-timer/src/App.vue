<template>
  <button @click="startTheGame" :disabled="isPlaying">play</button>
  <Block v-if="isPlaying" :delay="delay" @endGame="endGame"></Block>
  <Result v-if="showResults" :score="score"></Result>
</template>

<script>
import BlockComponent  from './components/Block.vue'
import ResultComponent from './components/Result.vue'

export default {
  name: 'App',
  components: {
    Block: BlockComponent,
    Result: ResultComponent,
  },
  data() {
    return {
      isPlaying: false,
      delay: null,
      score: 0,
      showResults: false,
    }
  },
  methods: {
    startTheGame() {
      this.isPlaying = true
      this.delay = 1000 + Math.random() * 2000
      this.showResults = false
    },
    endGame(reactionTime) {
      this.isPlaying = false
      this.score = reactionTime
      this.showResults = true
      console.log('endGame: reaction time is ' + reactionTime + 'ms')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  display: block;
  font-size: 2em;
  border-radius: 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 20px;
  width: 200px;
  margin: 0 auto;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
