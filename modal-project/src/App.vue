<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{  title }}</h1>
  <input type="text" ref="title">
  <button @click="handleClick">click me</button>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <teleport to=".modals" v-if="showModal">
    <Modal theme="sale" @close="toggleModal">
      <template v-slot:links>
        <a href="#" class="actions" data-v-701ac82d>Home</a> 
        <a href="#" class="actions" data-v-701ac82d>About</a>
      </template>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </Modal>
  </teleport>
  <button @click="toggleModal">toggle modal</button>

  <teleport to=".modals" v-if="showModal2">
    <Modal theme="sale" @close="toggleModal2">
      <template v-slot:links>
        <a href="#" class="actions" data-v-701ac82d>Home</a> 
        <a href="#" class="actions" data-v-701ac82d>About</a>
      </template>
      <h1>{{ title }}2</h1>
      <p>{{ content }}2</p>
    </Modal>
  </teleport>
  <button @click="toggleModal2">toggle modal 2</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Modal,
  },

  data() {
    return {
      title: 'Buy and save',
      content: "Get your ninja swag for the half-price",
      showModal: false,
      showModal2: false,
    }
  },

  methods: {
    handleClick() {
      this.$refs.title.value = 'Hello World!'
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2
    },
  }
}
</script>

<style>
#app, .modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  border-bottom: 1px solid #dadada;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
