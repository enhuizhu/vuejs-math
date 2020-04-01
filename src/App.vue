<template>
  <div id="app">
    <div class="time-container">
      <ProgressBar ref="progressBar" @timeOut="initAll" @danger="playDanger"></ProgressBar>
    </div>
    <div class="result-container">
      <ul>
        <li class="error">
          <label>Wrong:</label>
          {{this.wrongAnswers}}
        </li>
        <li class="success">
          <label>Correct:</label>
          {{this.correctAnswers}}
        </li>
        <li>
          <label>Percentage:</label>
          {{this.getPercentage()}}
        </li>
      </ul>
      <div class="clear"></div>
    </div>
    <div class="fraction-container">
      <FractionCircle v-bind:denominator="firstFraction.denominator" v-bind:numerator="firstFraction.numerator"></FractionCircle>
      <span class="operator">+</span>
      <FractionCircle v-bind:denominator="secondFraction.denominator" v-bind:numerator="secondFraction.numerator"></FractionCircle>
    </div>

    <div class="fraction-container">
      <div class="text">{{`${firstFraction.numerator} / ${firstFraction.denominator}`}}</div>
      <span class="operator">+</span>
      <div class="text">{{`${secondFraction.numerator} / ${secondFraction.denominator}`}}</div>
    </div>

    <div class="answer-container">
      <form v-on:submit="handleSubmit">
        <div class="form-control-group center">
          <label>Answer:</label>
          <input type="text" v-model="answer" ref="answer">
        </div>
        <div class="form-control-group center" style="margin-top: 15px">
          <input type="submit" value="Check Answer" class="btn">
        </div>
      </form>
    </div>
    
    <div class="hint-container">
      <div class="show-hint" v-on:click="toggleHint">
        show hint?
      </div>
      <div class="hint-content" v-bind:class="{hide: !showHint}">
          <div class="fraction-container">
            <div class="text">{{`${firstFraction.numerator} / ${firstFraction.denominator}`}}</div>
            <span class="operator">+</span>
            <div class="text">{{`${secondFraction.numerator} / ${secondFraction.denominator}`}}</div>
          </div>

          <div class="center mt-10">is equal to:</div>
          
          <div class="fraction-container">
            <div class="text">{{`${hintFristFraction.numerator} / ${hintFristFraction.denominator}`}}</div>
            <span class="operator">+</span>
            <div class="text">{{`${hintSecondFraction.numerator} / ${hintSecondFraction.denominator}`}}</div>
          </div>

          <div class="center mt-10">and it can be represented by the images below:</div>
          
          <div class="fraction-container">
            <FractionCircle v-bind:denominator="hintFristFraction.denominator" v-bind:numerator="hintFristFraction.numerator"></FractionCircle>
            <span class="operator">+</span>
            <FractionCircle v-bind:denominator="hintSecondFraction.denominator" v-bind:numerator="hintSecondFraction.numerator"></FractionCircle>
          </div>
      </div>
    </div>
    
    <WellDoneOrSorry v-show="showWellDoneOrSorry" @next="initAll" :isWellDone="isWellDone" :msg="msgForPop"></WellDoneOrSorry>

    <audio ref="winAudio">
      <source src="@/assets/win.wav">
      <source src="@/assets/win.mp3">
    </audio>

    <audio ref="sadAudio">
      <source src="@/assets/sad.wav">
      <source src="@/assets/sad.mp3">
    </audio>

    <audio ref="tick" loop="true">
      <source src="@/assets/tick.wav">
      <source src="@/assets/tick.mp3">
    </audio>
    
  </div>
</template>

<script>
import FractionCircle from './components/FractionCircle';
import WellDoneOrSorry from './components/WellDoneOrSorry';
import ProgressBar from './components/ProgressBar';
import { Decimal } from 'decimal.js';
import { isEqual } from 'lodash';

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
      hintFristFraction: {},
      hintSecondFraction: {},
      showWellDoneOrSorry: false,
      showEncourage: false,
      msgForPop: '',
      isWellDone: false,
      showHint: false,
    }
  },
  
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      let sanitizedAnswer = this.answer.replace(/[^0-9/]/g, '');

      if (sanitizedAnswer.length <= 0) {
        alert('Please input a valid fraction!');
        return false;
      }

      if (sanitizedAnswer == 0) {
        sanitizedAnswer = 0;
      }

      let firstFraction = this.firstFraction.numerator / this.firstFraction.denominator;
      let secondFraction = this.secondFraction.numerator / this.secondFraction.denominator;
      
      this.showWellDoneOrSorry = true;

      // need blur the input
      this.$refs['answer'].blur();
      
      if (this.areFractionsEqual(firstFraction + secondFraction, eval(sanitizedAnswer))) {
        this.correctAnswers++;
        this.isWellDone = true;
        this.playWin();
      } else {  
        this.wrongAnswers++;
        this.isWellDone = false;
        this.playSad();
        const result = this.getFractionsResult();
        this.msgForPop = `${this.firstFraction.numerator} / ${this.firstFraction.denominator} + ${this.secondFraction.numerator} / ${this.secondFraction.denominator}  =  ${result.numerator} / ${result.denominator}`
      }

      this.stopPlayDanger();
      this.$refs['progressBar'].reset();
    },
    initAll() {
      this.showHint = false;
      this.answer = '';
      this.msgForPop = '';
      this.showWellDoneOrSorry = false;
      this.$refs['answer'].focus();
      this.generateNewFractionNumbers();
      this.changeBackground();
      this.stopPlayDanger();
      this.$refs['progressBar'].startTick()
    },

    changeBackground() {
      const classNames = ['bg1', 'bg2', 'bg3', ''];
      const randomIndex = Math.round(Math.random() * (classNames.length - 1));

      document.querySelector('body').className = classNames[randomIndex];
    },

    areFractionsEqual(num1, num2) {
      const firstNum = (new Decimal(num1)).toFraction(1000);
      const secondNum = (new Decimal(num2)).toFraction(1000);

      return isEqual(firstNum, secondNum);
    },

    playWin() {
      this.$refs['winAudio'].play();
    },

    playSad() {
      this.$refs['sadAudio'].play();
    },

    playDanger() {
      if (this.$refs['tick'].paused) {
        this.$refs['tick'].play();
      }
    },

    stopPlayDanger() {
      this.$refs['tick'].pause();
    },

    generateFractionObjcet() {
      // generate value from 1 - 10
      let denominator = Math.round(Math.random() * 9) + 1;
      // generate value from 0 - 10
      let numerator = Math.round(Math.random() * denominator);

      return this.contractFraction(numerator, denominator);
    },

    contractFraction(numerator, denominator) {
      for(let i = numerator; i > 1; i--) {
        if (numerator % i === 0 && denominator % i === 0) {
          numerator = numerator / i;
          denominator = denominator / i;

          if (i > numerator) {
            i = numerator;
          }
        }
      }

      return {
        numerator,
        denominator,
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

      const result = this.generateCalculableFractionNumbers(this.firstFraction, this.secondFraction);
      
      this.hintFristFraction = result.firstCalculableFraction;
      this.hintSecondFraction = result.secondCalculableFraction;
    },

    generateCalculableFractionNumbers(firstFraction, secondFraction) {
      const minimumCommonMultiple = this.getMinimumCommonMultiple(firstFraction.denominator, secondFraction.denominator);
      const numberOfTimesForFristFraction = minimumCommonMultiple / firstFraction.denominator;
      const numberOfTimesForSecondFraction = minimumCommonMultiple / secondFraction.denominator;


      return {
        firstCalculableFraction: {
          numerator: firstFraction.numerator * numberOfTimesForFristFraction,
          denominator: minimumCommonMultiple,
        },

        secondCalculableFraction: {
          numerator: secondFraction.numerator * numberOfTimesForSecondFraction,
          denominator: minimumCommonMultiple,
        },
      }
    },

    getMinimumCommonMultiple(num1, num2) {
      const max = Math.max(num1, num2);
      const min = Math.min(num1, num2);

      if (max % min === 0) {
        return max;
      }

      for (let i = 2; i <= min; i++) {
        let minimumCommonMultiple = max * i;

        if (minimumCommonMultiple % min === 0) {
          return minimumCommonMultiple;
        }
      }

      return max * min;
    },

    toggleHint() {
      this.showHint = !this.showHint;
    },

    getFractionsResult() {
      const numerator = this.hintFristFraction.numerator + this.hintSecondFraction.numerator;
      const denominator = this.hintFristFraction.denominator;

      return {
        numerator,
        denominator
      }
    }
  },

  components: {
    FractionCircle,
    WellDoneOrSorry,
    ProgressBar,
  },

  created: function() {
    
  },
  mounted() {
    console.log('audio', this.$refs['winAudio']);
    this.initAll();
  }
}
</script>

<style lang="scss">
  body {
    background-image: url("./assets/bg3.png");
    background-size: cover;
    padding: 0;
    margin: 0;

    &.bg1 {
      background-image: url("./assets/bg2.png");
    }

    &.bg2 {
      background-image: url("./assets/bg.jpg");
    }

    &.bg3 {
      background-image: url("./assets/bg4.jpg");
    }

    &.bg4 {
      background-image: url("./assets/bg5.webp");
    }

     &.bg5 {
      background-image: url("./assets/bg6.jpeg");
    }
  }

  #app {
    width: 320px;
    margin: 0 auto;
    background: white;
    height: 100vh;
    overflow: auto;
  }

  .time-container {
    padding: 10px;
  }

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

  .result-container {
    text-align: center;
    font-size: 14px;
    ul {
      list-style: none;
      padding-left: 0px;
      display: inline-block;
      li {
        float: left;
        margin-right: 10px;
      }
    }
  }

  .hint-container {
    margin-top: 20px;
    padding-left: 21px;

    
    .show-hint {
      cursor: pointer;
    }
  }

</style>
