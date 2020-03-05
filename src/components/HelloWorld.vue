<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{ msg1 }}</h3>
    <input v-model="msg1"/>
    <button v-on:click="changeMe">Change Me</button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      msg1: 'this is message 1',
    }
  }, 
  props: {
    msg: String
  },
  methods: {
    changeMe: function() {
      this.msg1 = 'msg1 changed!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
