import {
  eq,
  has,
  is,
  not,
} from 'flagify';

export const install = (Vue, { prefix = '$' }) => {
  Object.assign(Vue.prototype, {
    [`${prefix}eq`]: eq,
    [`${prefix}has`]: has,
    [`${prefix}is`]: is,
    [`${prefix}not`]: not,
  });
};

export * from 'flagify';
