import {
  eq,
  all,
  any,
  not,
} from 'flagify';

export const install = (Vue, { prefix = '$', types = {} }) => {
  Object.assign(Vue.prototype, {
    ...types,
    [`${prefix}eq`]: eq,
    [`${prefix}all`]: all,
    [`${prefix}any`]: any,
    [`${prefix}not`]: not,
  });
};

export * from 'flagify';
