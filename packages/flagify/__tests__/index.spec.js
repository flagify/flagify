import {
  createTypes,
  upFlag,
  downFlag,
  eq,
  all,
  any,
  notOne,
  notAll,
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
    expect(all(flag, fruitTypes.APPLE)).toBe(true);
    expect(all(flag, fruitTypes.CHERRY)).toBe(false);
    expect(all(flag, fruitTypes.BANANA)).toBe(false);
    expect(all(flag, fruitTypes.GRAPE)).toBe(true);
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

    const fishNames = [
      'TUNA',
      'SALMON',
    ];

    const foodNames = [
      ...fruitNames,
      ...vegeNames,
      ...fishNames,
    ];

    const basket = {
      hasApple: true,
      hasBanana: true,
      hasPotato: false,
      hasOnion: false,
      hasTuna: true,
      hasSalmon: true,
    };

    // when
    const foodTypes = createTypes(foodNames, {
      APPLE_BANANA_TUNA_SALMON: ['APPLE', 'BANANA', 'TUNA', 'SALMON'],
      FRUIT: fruitNames,
      VEGE: vegeNames,
      FISH: fishNames,
    });

    const createFlag = (data, types) => {
      let flag = 0;
      flag = data.hasApple ? upFlag(flag, types.APPLE) : flag;
      flag = data.hasBanana ? upFlag(flag, types.BANANA) : flag;
      flag = data.hasPotato ? upFlag(flag, types.POTATO) : flag;
      flag = data.hasOnion ? upFlag(flag, types.ONION) : flag;
      flag = data.hasTuna ? upFlag(flag, types.TUNA) : flag;
      flag = data.hasSalmon ? upFlag(flag, types.SALMON) : flag;
      return flag;
    };

    const flag = createFlag(basket, foodTypes);

    // then
    expect(all(flag, foodTypes.APPLE)).toBe(true);
    expect(any(flag, foodTypes.FRUIT)).toBe(true);
    expect(notAll(flag, foodTypes.FRUIT)).toBe(true);
    expect(notAll(flag, foodTypes.VEGE)).toBe(true);
    expect(notAll(flag, foodTypes.FISH)).toBe(false);
    expect(notOne(flag, foodTypes.FRUIT)).toBe(false);
    expect(notOne(flag, foodTypes.VEGE)).toBe(true);
    expect(notOne(flag, foodTypes.FISH)).toBe(false);
    expect(eq(flag, foodTypes.APPLE_BANANA_TUNA_SALMON)).toBe(true);
  });
});
