import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import { Decimal } from 'decimal.js';
import App from '@/App'

describe('App.vue', () => {
  const wrapper = shallowMount(App, {
  })

  it('testing contractFraction', () => {
    // const msg = 'new message'
    
    expect(wrapper.vm.contractFraction(2, 4)).to.eql({numerator: 1, denominator: 2});
    expect(wrapper.vm.contractFraction(4, 2)).to.eql({numerator: 2, denominator: 1});
    expect(wrapper.vm.contractFraction(3, 5)).to.eql({numerator: 3, denominator: 5});
    expect(wrapper.vm.contractFraction(6, 10)).to.eql({numerator: 3, denominator: 5});
  });

  it('testing generateCalculableFractionNumbers', () => {
    let result = wrapper.vm.generateCalculableFractionNumbers(
      {numerator: 1, denominator: 2}, 
      {numerator: 1, denominator: 4}  
    );

    expect(result).to.deep.eq({
      firstCalculableFraction: { numerator: 2, denominator: 4 },
      secondCalculableFraction: { numerator: 1, denominator: 4 }
    });

    result = wrapper.vm.generateCalculableFractionNumbers(
      {numerator: 5, denominator: 9}, 
      {numerator: 1, denominator: 10}  
    );

    expect(result).to.deep.eq({
      firstCalculableFraction: { numerator: 50, denominator: 90 },
      secondCalculableFraction: { numerator: 9, denominator: 90 }
    });
  });

  it('getMinimumCommonMultiple', () => {
    expect(wrapper.vm.getMinimumCommonMultiple(2, 3)).to.eq(6);
    expect(wrapper.vm.getMinimumCommonMultiple(2, 4)).to.eq(4);
    expect(wrapper.vm.getMinimumCommonMultiple(4, 6)).to.eq(12);
  });

  it('test areFractionsEqual', () => {
    let firstFraction = 3/3 ;
    let secondFraction = 2/3;

    let answer = eval('5/3'.replace(/[^0-9/]/g, ''));
    let actual = firstFraction + secondFraction;

    expect(wrapper.vm.areFractionsEqual(actual, answer)).to.be.true;
    expect(wrapper.vm.areFractionsEqual(5/6 + 1/6, 6/6)).to.be.true;
    expect(wrapper.vm.areFractionsEqual(5/11 + 3/11, 8/11)).to.be.true;
  });

})
