<template>
  <div class="progress-bar-container">
    <div class="bar" v-bind:class="{
      'bar-green': remainTime >= warningTime,
      'bar-orange': remainTime >= dangerTime && remainTime < warningTime,
      'bar-red': remainTime < dangerTime
    }" v-bind:style="{width: remainTime / totalTime * 100 + '%'}"></div>
  </div>  
</template>

<script>
export default {
  name: 'ProgressBar',
  data: () => {
    return {
      totalTime: 30,
      remainTime: 30,
      warningTime: 20,
      dangerTime: 10
    }
  },
  methods: {
    startTick() {
      if (this.remainTime > 0) {
        this.remainTime--;

        if (this.remainTime < this.dangerTime) {
          this.$emit('danger');
        }

        this.t = setTimeout(this.startTick.bind(this), 1000);
      } else {
        this.remainTime = this.totalTime;
        this.stop();
        this.$emit('timeOut');
      }
    },

    reset() {
      this.remainTime = this.totalTime;
      this.stop();
    },
    
    stop() {
      clearTimeout(this.t);
    }
  },
  created() {
    // this.startTick();
  },

  destroyed() {
    this.stop();
  }
}

</script>

<style lang="scss" scoped>
  .progress-bar-container {
    width: 100%;
    height: 16px;
    border-radius: 5px;
    border: solid 1px grey;

    .bar {
      height: 100%;

      &.bar-green {
        background-color: green;
      }

      &.bar-red {
        background-color: red;
      }

      &.bar-orange {
        background-color: orange;
      }
    }
  }
</style>