<template>
  <div class="home">
    <h3>Names</h3>
    <div v-for="name in names" :key="name">{{ name }}</div>
    <br><br>
    <input v-model="search" type="text" placeholder="search..."/>
    <div>typing: {{ search }}</div>
    <h3>Computed ames</h3>
    <div v-for="name in matchingNmaes" :key="name">{{ name }}</div>

    <p>
      <button @click="stopWatching">stop watching</button>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, reactive, computed, watch, watchEffect } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const search = ref('')
    const names = ref(['shaun', 'yoshi', 'mario', 'luigi', 'peach'])

    const stopWatch = watch(search, () => {
      console.log('watching1...' + search.value)
    })

    const stopWatchingEffect = watchEffect(() => {
      console.log('watchEffect1...' + search.value)
    })


    const stopWatching = () => {
      stopWatch()
      stopWatchingEffect()
    }

    const matchingNmaes = computed(() => {
      return names.value.filter(name => name.toLowerCase().includes(search.value.toLowerCase()))
    })

    return { names, search, matchingNmaes, stopWatching }
  },

}
</script>
