var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var createTypes = function createTypes(names) {
  var mergeLists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(mergeLists).reduce(function (types, name) {
    return _extends({}, types, defineProperty({}, name, mergeLists[name].reduce(function (flag, key) {
      return flag | types[key];
    }, 0)));
  }, names.reduce(function (types, name, i) {
    return _extends({}, types, defineProperty({}, name, 1 << i));
  }, {}));
};

var upFlag = function upFlag(flag, type) {
  return flag | type;
};

var downFlag = function downFlag(flag, type) {
  return flag & ~type;
};

var eq = function eq(flag, type) {
  return flag === type;
};

var has = function has(flag, type) {
  return (flag & type) === type;
};

var is = function is(flag, type) {
  return (flag & type) > 0;
};

var not = function not(flag, type) {
  return (flag & type) === 0;
};

export { createTypes, upFlag, downFlag, eq, has, is, not };
