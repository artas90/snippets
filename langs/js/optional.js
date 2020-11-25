
function optional(obj, evalFunc, def) {
  const handler = {
    get: function(target, prop, receiver) {
      const res = Reflect.get(...arguments);
      return typeof res === "object" ? proxify(res) : res != null ? res : def;
    }
  };

  const proxify = target => {
    return new Proxy(target, handler);
  };

  return evalFunc(proxify(obj, handler));
}

const obj = {
  items: [{ hello: "Hello" }]
};

console.log(optional(obj, target => target.items[0].hello, "def")); // => Hello
console.log(optional(obj, target => target.items[0].hell, { a: 1 })); // => { a: 1 }