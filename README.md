# Flagify

Flagify is a JavaScript library for managing a lot of flags 

[![CircleCI (master branch)](https://circleci.com/gh/flagify/flagify/tree/master.svg?style=shield)](https://circleci.com/gh/flagify/flagify)
[![Tested with Jest](https://img.shields.io/badge/tested_with-Jest-99424f.svg)](https://github.com/facebook/jest)
[![Coveralls github](https://img.shields.io/codecov/c/github/flagify/flagify/master.svg)](https://codecov.io/gh/flagify/flagify)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Usage
``` bash
$ npm install flagify
```

``` javascript
const {
  createTypes,
  upFlag,
  eq,
  all,
  any,
  not,
} = require('flagify');

const fruitNames = [
  'APPLE',
  'CHERRY',
  'BANANA',
  'GRAPE',
];

const vegeNames = [
  'PUMPKIN',
  'CABBAGE',
  'POTATO',
  'RADISH',
  'ONION',
];

const foodNames = [
  ...fruitNames,
  ...vegeNames,
];

const basket = {
  hasApple: true,
  hasBanana: true,
  hasPotato: false,
  hasOnion: false,
};

const foodTypes = createTypes(foodNames, {
  APPLE_BANANA: ['APPLE', 'BANANA'],
  FRUIT: fruitNames,
  VEGE: vegeNames,
});

const createFlag = (data, types) => {
  let flag = 0;
  flag = data.hasApple ? upFlag(flag, types.APPLE) : flag;
  flag = data.hasBanana ? upFlag(flag, types.BANANA) : flag;
  flag = data.hasPotato ? upFlag(flag, types.POTATO) : flag;
  flag = data.hasOnion ? upFlag(flag, types.ONION) : flag;
  return flag;
};

const flag = createFlag(basket, foodTypes);

console.log(all(flag, foodTypes.APPLE)); // true
console.log(any(flag, foodTypes.FRUIT)); // true
console.log(not(flag, foodTypes.VEGE)); // true
console.log(eq(flag, foodTypes.APPLE_BANANA)); // true
```
