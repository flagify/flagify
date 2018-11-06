import {
  eq,
  all,
  any,
  notOne,
  notAll,
} from 'flagify';
import assign from '../polyfill/assign';

export default {
  install(Vue, { prefix = '$', types = {} }) {
    assign(Vue.prototype, {
      ...types,
      [`${prefix}eq`]: eq,
      [`${prefix}all`]: all,
      [`${prefix}any`]: any,
      [`${prefix}notOne`]: notOne,
      [`${prefix}notAll`]: notAll,
    });
  },
};

export * from 'flagify';
