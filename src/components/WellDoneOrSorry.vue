<template>
  <div class="overlay">
    <div>
      <div v-if="msg.length > 0" class="message">
        {{msg}}
      </div>
      <div class="img-container">        
        <img src="@/assets/welldone.gif" v-if="isWellDone"/>
        <img src="@/assets/sorry2.gif" v-else/>
      </div>

      <div class="center">
        <button class="btn" @click="handleClick" ref="nextBtn">Next</button>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'WellDoneOrSorry',
  props: {
    isWellDone: Boolean,
    msg: String,
  },
  methods: {
    handleClick() {
      this.$emit('next');
    }
  },
  mounted() {
    console.log('popup mounted');
  },

  created() {
    console.log('popup created');
  },

  updated() {
    console.log('popup updated');
    const nextBtn = this.$refs['nextBtn'];

    if (nextBtn) {
      nextBtn.focus();
    }
  }
}
</script>

<style lang="scss" scoped>
  .message {
    color: white;
    margin-bottom: 10px;
    text-align: center;
  }
  .img-container {
    text-align: center;
    img {
      max-height: 50vh;
      max-width: 100vw;
    }
  }
</style>