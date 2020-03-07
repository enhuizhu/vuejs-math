<template>
  <div id="app">
    <div class="result-container">
      <ul>
        <li>
          <label>Wrong:</label>
          {{this.wrongAnswers}}
        </li>
        <li>
          <label>Correct:</label>
          {{this.correctAnswers}}
        </li>
        <li>
          <label>Percentage:</label>
          {{this.getPercentage()}}
        </li>
      </ul>
    </div>
    <div class="fraction-container">
      <FractionCircle v-bind:denominator="firstFraction.denominator" v-bind:numerator="firstFraction.numerator"></FractionCircle>
      <span class="operator">+</span>
      <FractionCircle v-bind:denominator="secondFraction.denominator" v-bind:numerator="secondFraction.numerator"></FractionCircle>
      <!-- <span class="operator">=</span> -->
    </div>

    <div class="fraction-container">
      <div class="text">{{`${firstFraction.numerator} / ${firstFraction.denominator}`}}</div>
      <span class="operator">+</span>
      <div class="text">{{`${secondFraction.numerator} / ${secondFraction.denominator}`}}</div>
      <!-- <span class="operator">=</span> -->
    </div>

    <div class="answer-container">
      <form v-on:submit="handleSubmit">
        <div class="form-control-group center">
          <label>Answer:</label>
          <input type="text" v-model="answer">
        </div>
        <div class="form-control-group center" style="margin-top: 15px">
          <input type="submit" value="next" class="btn">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FractionCircle from './components/FractionCircle';

export default {
  name: 'App',
  
  data: () => {
    return {
      answer: '',
      percentage: '0%',
      wrongAnswers: 0,
      correctAnswers: 0,
      firstFraction: {},
      secondFraction: {},
    }
  },
  
  methods: {
    handleSubmit(event) {
      event.preventDefault();

      let firstFraction = this.firstFraction.numerator / this.firstFraction.denominator;
      let secondFraction = this.secondFraction.numerator / this.secondFraction.denominator;

      if (firstFraction + secondFraction === eval(this.answer.replace(/[^0-9/]/g), '')) {
        this.correctAnswers++;
      } else {  
        this.wrongAnswers++;
      }

      this.generateNewFractionNumbers();
    },

    generateFractionObjcet() {
      // generate value from 1 - 10
      let denominator = Math.round(Math.random() * 9) + 1;
      // generate value from 0 - 10
      let numerator = Math.round(Math.random() * denominator);

      return {
        denominator,
        numerator
      }
    },

    getPercentage() {
      if (this.correctAnswers + this.wrongAnswers === 0) {
        return '0.00%';
      }

      return `${(this.correctAnswers / (this.wrongAnswers + this.correctAnswers) * 100).toFixed(2)} %`;
    },

    generateNewFractionNumbers() {
      this.firstFraction = this.generateFractionObjcet();
      this.secondFraction = this.generateFractionObjcet();
    }
  },

  components: {
    FractionCircle,
  },

  created: function() {
    this.generateNewFractionNumbers();
  }
}
</script>

<style lang="scss" scoped>
  .fraction-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      width: 100px;
      text-align: center;
    }

    .operator {
      margin: 0 10px;
    }
  }
</style>
