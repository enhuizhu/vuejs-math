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

  watch:{
    'denominator'() {
      console.log('denominator', this.denominator);
      this.draw();
    },
    'numerator'() {
      console.log('numerator', this.numerator);
      this.draw();
    },
  },

  methods: {
    setupCanvasEnv() {
      this.c = this.$refs['circle'];
      this.ctx = this.c.getContext('2d');
    },
    
    draw() {
      this.clear();
      this.drawBackgroud();
      this.drawSections();
    },

    drawBackgroud() {
      this.ctx.save();
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
      this.readius = this.width / 2 - 1;
      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, this.readius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();

      this.drawSections();
    },

    clear() {
      try {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
      } catch(e) {
        console.log('clear error', e);
      }
    },

    drawSections() {
      this.ctx.save();
      const totoalAngles = Math.PI * 2 / this.denominator;
      this.ctx.strokeStyle = "#000000";

      for (let i = 0; i < this.numerator; i++) {
        const startAngles = i * totoalAngles;
        const endAngles = startAngles + totoalAngles;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, this.readius, startAngles, endAngles);
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.closePath();
        this.ctx.fillStyle='green';
        this.ctx.fill();
        this.ctx.stroke();
      }

      this.ctx.restore();
    }
  },

  created: function() {
    console.log('created');
  },

  mounted: function() {
    console.log('mounted');
    this.setupCanvasEnv();
    this.draw();
  },

  updated: function() {
    console.log('updated');
  },

  destroyed: function() {
    console.log('destroyed');
  },
}
</script>

<style scoped>
  .circle {
    width: 100px;
    height: 100px;
  }
</style>