function fn() {
  return {__proto__: []};
}

assertEqual(fn() instanceof Array, true);
test(fn);
