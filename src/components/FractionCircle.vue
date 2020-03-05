<template>
  <div>
    <canvas class="circle" ref="circle" :width="width" :height="height"></canvas>
  </div>    
</template>

<script>
export default {
  name: 'FractionCircle',
  data() {
    return {
      width: 200,
      height: 200,
    }
  },
  props: {
    denominator: Number,
    numerator: Number,
  },

  methods: {
    setupCanvasEnv: function() {
      this.c = this.$refs['circle'];
      this.ctx = this.c.getContext('2d');
      this.drawBackgroud();
    },

    drawBackgroud() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const readius = this.width / 2 - 1;
      this.ctx.strokeStyle = "#FF0000";
      this.ctx.strokeRect(20, 20, 150, 100);
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, readius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  },

  created: function() {

  },

  mounted: function() {
    this.setupCanvasEnv();
    console.log('vue', this.$refs['circle']);
    
  },

  updated: function() {

  },

  destroyed: function() {

  },
}
</script>

<style scoped>
  .circle {
    width: 200;
    height: 200;
  }
</style>