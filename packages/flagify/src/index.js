export const createTypes = (names, mergeLists = {}) => Object.keys(mergeLists)
  .reduce((types, name) => ({
    ...types,
    [name]: mergeLists[name].reduce((flag, key) => flag | types[key], 0),
  }),
  names.reduce((types, name, i) => ({
    ...types,
    [name]: 1 << i,
  }), {}));

export const upFlag = (flag, type) => flag | type;

export const downFlag = (flag, type) => flag & ~type;

export const eq = (flag, type) => flag === type;

export const all = (flag, type) => (flag & type) === type;

export const any = (flag, type) => (flag & type) > 0;

export const notOne = (flag, type) => (flag & type) === 0;

export const notAll = (flag, type) => (flag & type) !== type;
