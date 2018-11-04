import {
  eq,
  all,
  any,
  not,
} from 'flagify';
import assign from '../polyfill/assign';

export const install = (Vue, { prefix = '$', types = {} }) => {
  assign(Vue.prototype, {
    ...types,
    [`${prefix}eq`]: eq,
    [`${prefix}all`]: all,
    [`${prefix}any`]: any,
    [`${prefix}not`]: not,
  });
};

export * from 'flagify';
