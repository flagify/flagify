import {
  createTypes,
  upFlag,
  downFlag,
  eq,
  has,
  is,
  not,
} from '../src/index';

describe('types', () => {
  test('basic types', () => {
    // given
    const fruitNames = [
      'APPLE',
      'CHERRY',
      'BANANA',
      'GRAPE',
    ];

    const basket = {
      hasApple: true,
      hasBanana: true,
      hasGrape: true,
    };

    const cancelList = ['BANANA'];

    // when
    const fruitTypes = createTypes(fruitNames);

    const createFlag = (data, types, cancels) => {
      let flag = 0;
      flag = data.hasApple ? upFlag(flag, types.APPLE) : flag;
      flag = data.hasCherry ? upFlag(flag, types.CHERRY) : flag;
      flag = data.hasBanana ? upFlag(flag, types.BANANA) : flag;
      flag = data.hasGrape ? upFlag(flag, types.GRAPE) : flag;
      flag = cancels.reduce((result, type) => downFlag(result, types[type]), flag);
      return flag;
    };

    const flag = createFlag(basket, fruitTypes, cancelList);

    // then
    expect(has(flag, fruitTypes.APPLE)).toBe(true);
    expect(has(flag, fruitTypes.CHERRY)).toBe(false);
    expect(has(flag, fruitTypes.BANANA)).toBe(false);
    expect(has(flag, fruitTypes.GRAPE)).toBe(true);
  });

  test('merged types', () => {
    // given
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

    // when
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

    // then
    expect(has(flag, foodTypes.APPLE)).toBe(true);
    expect(is(flag, foodTypes.FRUIT)).toBe(true);
    expect(not(flag, foodTypes.VEGE)).toBe(true);
    expect(eq(flag, foodTypes.APPLE_BANANA)).toBe(true);
  });
});
